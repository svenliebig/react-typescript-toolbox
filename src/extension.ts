'use strict'

import { error, info } from './error-codes'
import { Component, Test, ExportIndex, Enum } from './templates'
import * as vscode from 'vscode'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'

let config = vscode.workspace.getConfiguration('reactTypeScriptToolbox')

export function activate(context: vscode.ExtensionContext) {

    function contextFailed(evt) {
        if (evt == undefined)
            return vscode.window.showInformationMessage(info.PLEASE_CONTEXT)
        else if (fs == undefined)
            return vscode.window.showInformationMessage(info.FILE_SYSTEM_UNDEFINED)
        else if (mkdirp == undefined)
            return vscode.window.showInformationMessage(info.MKDIR_UNDEFINED)
        return null
    }
    /**
     * Creates a react component on a directory root.
     */
    let generateComponent = vscode.commands.registerCommand('reactTypeScriptToolbox.generateComponent', (evt) => {
        if (contextFailed(evt))
            return

        handleEvent(evt, createComponent)
    });

    /**
     * Creates a typescript enum on a directory root.
     */
    let generateEnum = vscode.commands.registerCommand('reactTypeScriptToolbox.generateEnum', (evt) => {
        if (contextFailed(evt))
            return

        handleEvent(evt, createEnum);
    });

    let generateIndex = vscode.commands.registerCommand('reactTypeScriptToolbox.generateIndex', (evt) => {
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
    });

    context.subscriptions.push(generateComponent);
    context.subscriptions.push(generateEnum);
    context.subscriptions.push(generateIndex);
}

// programmer uses confusion, how effective is it?
function createIndex(path: string): void {
    const directories: Array<string> = []
    
    function writeIndex() {
        fs.readdirSync(path).map(val => fs.lstatSync(`${path}/${val}`).isDirectory() && directories.push(val))
        const defaultExport = (val) => `export { default as ${val} } from "./${val}"\n`
        let indexFile = directories.reduce((val, next, i) => i === 1 ? `${defaultExport(val)}${defaultExport(next)}` : `${val}${defaultExport(next)}`)
        fs.writeFileSync(`${path}/index.ts`, indexFile);
    }
    
    const opt: vscode.QuickPickOptions = { placeHolder: "Want to override the existing index.ts file?" }
    if (fs.existsSync(`${path}/index.ts`))
        vscode.window.showQuickPick(["Yes", "No"], opt).then(val => val === "Yes" && writeIndex())
    else 
        writeIndex()
}

function createComponent(path: string, className: string): void {
    const regex = /(^[A-Z][A-Za-z]*$)/;

    if (!className.match(regex) && config.get<boolean>('regexCheck', true)) {
        vscode.window.showErrorMessage(error.REGEX_ERROR);
        return;
    }

    /** Folder Path */
    const folder = /^win/.test(process.platform) ? `${path}\\${className}\\` : `${path}/${className}/`;

    /** Options */
    const stylesheet = config.get<string>('stylesheet', 'none');

    /** Component */
    const componentData = Component.create(className, stylesheet);
    const componentPath = `${folder}${className}.tsx`;

    /** Export TS */
    const exportData = ExportIndex.create(className)
    const exportPath = `${folder}index.ts`

    /** Test */
    const testData = Test.create(className);
    const testPath = `${folder}${className}.test.tsx`;
    const generateTests = config.get<boolean>('test', false);

    /** Stylesheet */
    const stylesheetData = '';
    let stylesheetPath = `${folder}${className}.`;

    if (stylesheet !== 'none') {
        stylesheetPath += stylesheet;
    }

    mkdirp(folder, (err) => {
        fs.writeFile(componentPath, componentData);
        fs.writeFile(exportPath, exportData)

        if (generateTests) {
            fs.writeFile(testPath, testData);
        }

        if (stylesheet !== 'none') {
            fs.writeFile(stylesheetPath, stylesheetData);
        }
    });

    appendToRootIndex(path, className)
}

function createEnum(path: string, className: string): void {
    const regex = /(^[A-Z][A-Za-z]*$)/;

    if (!className.match(regex) && config.get<boolean>('regexCheck', true)) {
        vscode.window.showErrorMessage(error.REGEX_ERROR)
        return;
    }

    /** Folder Path */
    const folder = `${path}\\${className}\\`

    /** Enum */
    const enumData = Enum.create(className);
    const enumPath = `${folder}${className}.ts`
    const exportData = ExportIndex.create(className)
    const exportPath = `${folder}index.ts`

    mkdirp(`${path}\\${className}`, (err) => {
        fs.writeFile(enumPath, enumData);
        fs.writeFile(exportPath, exportData)
    });

    appendToRootIndex(path, className)
}

function handleEvent(evt: any, success: Function) {
    fs.lstat(`${evt.fsPath}`, (err, stats) => {
        if (err) {
            return vscode.window.showErrorMessage(error.UNHANDLED_ERROR)
        }
        if (stats.isDirectory()) {
            vscode.window.showInputBox(inputBoxOptions).then((value: string) => {
                if (value !== undefined && value !== '') {
                    success(evt.fsPath, value)
                }
            })
        } else if (stats.isFile()) {
            vscode.window.showInformationMessage(info.SELECT_DIRECTORY)
        }
    });
}

const inputBoxOptions: vscode.InputBoxOptions = {
    placeHolder: "component name",
    prompt: "Creates a directory, testclass, component class and an export index."
};

const inputBoxOptionsEnum: vscode.InputBoxOptions = {
    placeHolder: "enum name",
    prompt: "Creates a directory, an enum class and an export index."
};



function appendToRootIndex(path, className) {
    const indexRootPath: string = `${path}\\index.ts`
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
        if (layered && config.get<boolean>('sortIndex', true)) {
            vscode.window.showQuickPick(Object.getOwnPropertyNames(categories)).then((value: string) => {
                if (value !== undefined && value !== '') {

                    let newFile: string = ""

                    for (const key in categories) {
                        if (value == key)
                            categories[key].push(`export { default as ${className} } from "./${className}"`)
                        categories[key].sort((a, b) => a.localeCompare(b))

                        newFile += `${newFile == "" ? '' : '\n'}// ${key}\n`
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
