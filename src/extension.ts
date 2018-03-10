import { error, info } from "./error-codes"
import { ExportIndex, Enum, Stylesheet } from "./templates"
import * as vscode from "vscode"
import * as fs from "fs"
import * as Path from "path"

import Options, { StyleSheetOptions } from "./Options/Options"
import FileService from "./Services/FileService"
import File from "./Models/File"

// Templates
import Component from "./Templates/Component/Component"
import ComponentTest from "./Templates/ComponentTest/ComponentTest"
import Model from "./Templates/Model/Model";

let config = vscode.workspace.getConfiguration("reactTypeScriptToolbox")

export function activate(context: vscode.ExtensionContext) {

    function contextFailed(evt) {
        if (evt == undefined)
            return vscode.window.showInformationMessage(info.PLEASE_CONTEXT)
        else if (fs == undefined)
            return vscode.window.showInformationMessage(info.FILE_SYSTEM_UNDEFINED)
        return null
    }

    function reg(cmd: string, handler: Function): vscode.Disposable {
        return vscode.commands.registerCommand(`reactTypeScriptToolbox.${cmd}`, (evt) => {
            if (contextFailed(evt))
                return

            handleEvent(evt, handler)
        })
    }

    context.subscriptions.push(reg("generateComponent", createComponent));
    context.subscriptions.push(reg("generateModel", createModel));
    context.subscriptions.push(reg("generateEnum", createEnum));

    let generateIndex = vscode.commands.registerCommand("reactTypeScriptToolbox.generateIndex", (evt) => {
        if (contextFailed(evt))
            return

        fs.lstat(`${evt.fsPath}`, (err, stats) => {
            if (err) {
                return vscode.window.showErrorMessage(error.UNHANDLED_ERROR)
            }
            if (stats.isDirectory()) {
                createIndex(evt.fsPath)
            } else if (stats.isFile()) {
                vscode.window.showInformationMessage(info.SELECT_DIRECTORY)
            }
        })
    })

    context.subscriptions.push(generateIndex)
}

// programmer uses confusion, how effective is it?
function createIndex(path: string): void {
    const directories: Array<string> = []

    function writeIndex() {
        fs.readdirSync(path).map(val => fs.lstatSync(`${path}/${val}`).isDirectory() && directories.push(val))
        const defaultExport = (val) => `export { default as ${val} } from "./${val}"\n`
        let indexFile = directories.reduce((val, next, i) => i === 1 ? `${defaultExport(val)}${defaultExport(next)}` : `${val}${defaultExport(next)}`)
        fs.writeFileSync(Path.resolve(path, `index.ts`), indexFile);
    }

    const opt: vscode.QuickPickOptions = { placeHolder: "Want to override the existing index.ts file?" }
    if (fs.existsSync(Path.resolve(path, `index.ts`)))
        vscode.window.showQuickPick(["Yes", "No"], opt).then(val => val === "Yes" && writeIndex())
    else
        writeIndex()
}

function createComponent(path: string, className: string): void {
    creationWrapper(path, className, () => {
        const folder = Path.resolve(path, className)

        const componentFile: File = Component.create(folder, className)
        const exportFile: File = ExportIndex.create(folder, className)
        const stylesheetFile: File = Stylesheet.create(folder, className)
        const testFile: File = ComponentTest.create(folder, className)

        FileService.write(componentFile, exportFile, stylesheetFile, testFile)
    })
}


function creationWrapper(path: string, className: string, creation: Function): void {
    const regex = /(^[A-Z][A-Za-z]*$)/
    if (!className.match(regex) && Options.regexCheck) {
        vscode.window.showErrorMessage(error.REGEX_ERROR)
        return
    }
    creation(path, className)
    appendToRootIndex(path, className)
}

function createEnum(path: string, className: string): void {
    creationWrapper(path, className, () => {
        const folder = Path.resolve(path, className)
        const enumFile: File = Enum.create(folder, className)
        const exportFile: File = ExportIndex.create(folder, className)
        FileService.write(enumFile, exportFile)
    })
}

function createModel(path: string, className: string): void {
    creationWrapper(path, className, () => {
        const folder = Path.resolve(path, className)
        const modeFile: File = Model.create(folder, className)
        const exportFile = ExportIndex.create(folder, className)
        FileService.write(modeFile, exportFile)
    })
}

function handleEvent(evt: any, success: Function) {
    fs.lstat(`${evt.fsPath}`, (err, stats) => {
        if (err) {
            return vscode.window.showErrorMessage(error.UNHANDLED_ERROR)
        }
        if (stats.isDirectory()) {
            vscode.window.showInputBox(inputBoxOptions).then((value: string) => {
                if (value !== undefined && value !== "") {
                    success(evt.fsPath, value)
                }
            })
        } else if (stats.isFile()) {
            vscode.window.showInformationMessage(info.SELECT_DIRECTORY)
        }
    })
}

const inputBoxOptions: vscode.InputBoxOptions = {
    placeHolder: "component name",
    prompt: "Creates a directory, testclass, component class and an export index."
};

const inputBoxOptionsEnum: vscode.InputBoxOptions = {
    placeHolder: "enum name",
    prompt: "Creates a directory, an enum class and an export index."
}

function appendToRootIndex(path, className) {
    const indexRootPath: string = Path.resolve(path, "index.ts")
    if (fs.existsSync(indexRootPath)) {

        const indexContent: string = fs.readFileSync(indexRootPath, "utf8")

        const rows = indexContent.split("\n")

        let categories: { [x: string]: Array<string> } = {}
        let currentCategory: string = ""
        let layered: boolean = true

        rows.forEach(row => {
            const regex: RegExp = /\/\/\s([\w\s]*)/
            const res: RegExpExecArray = regex.exec(row)
            if (res) {
                let val: string = res[1]
                let exports: Array<string> = []
                categories[val] = exports
                currentCategory = val
            } else {
                if (currentCategory) {
                    categories[currentCategory].push(row)
                } else {
                    layered = false
                    return
                }
            }
        });

        // do cool stuff
        if (layered && config.get<boolean>("sortIndex", true)) {
            vscode.window.showQuickPick(Object.getOwnPropertyNames(categories)).then((value: string) => {
                if (value !== undefined && value !== '') {

                    let newFile: string = ""

                    for (const key in categories) {
                        if (value == key)
                            categories[key].push(`export { default as ${className} } from "./${className}"`)
                        categories[key].sort((a, b) => a.localeCompare(b))

                        newFile += `${newFile == "" ? "" : "\n"}// ${key}\n`
                        for (const iterator of categories[key]) {
                            if (iterator && iterator.trim() !== "")
                                newFile += `${iterator}\n`
                        }
                    }

                    fs.writeFile(indexRootPath, newFile, (err) => {
                        if (err)
                            throw err
                        vscode.window.showInformationMessage(`Component '${className}' created!`);
                    })
                }
            })

            const joined = rows.join("\n")

            // Append if not layered
        } else {

            fs.appendFile(indexRootPath, `\nexport { default as ${className} } from "./${className}"`, (err) => {
                if (err)
                    throw err
                vscode.window.showInformationMessage(`Component '${className}' created!`);
            })

        }
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}
