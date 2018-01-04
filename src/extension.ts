'use strict'

import { error, info } from './error-codes'
import { Component, Test, ExportIndex, Enum } from './templates'
import * as vscode from 'vscode'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'

let config = vscode.workspace.getConfiguration('reactTypeScriptToolbox');

export function activate(context: vscode.ExtensionContext) {

    /**
     * Creates a react component on a directory root.
     */
    let disposable = vscode.commands.registerCommand('reactTypeScriptToolbox.generateComponent', (evt) => {
        if (evt == undefined) {
            vscode.window.showInformationMessage(info.PLEASE_CONTEXT);
            return;
        } else if (fs == undefined) {
            vscode.window.showInformationMessage(info.FILE_SYSTEM_UNDEFINED);
        } else if (mkdirp == undefined) {
            vscode.window.showInformationMessage(info.MKDIR_UNDEFINED);
        } else if (!hasPackageJson()) {
            return;
        }

        handleEvent(evt);
    });

    /**
     * Creates a typescript enum on a directory root.
     */
    let disEnum = vscode.commands.registerCommand('reactTypeScriptToolbox.generateEnum', (evt) => {
        if (evt == undefined) {
            vscode.window.showInformationMessage(info.PLEASE_CONTEXT);
            return;
        } else if (fs == undefined) {
            vscode.window.showInformationMessage(info.FILE_SYSTEM_UNDEFINED);
        } else if (mkdirp == undefined) {
            vscode.window.showInformationMessage(info.MKDIR_UNDEFINED);
        } else if (!hasPackageJson()) {
            return;
        }

        handleEventEnum(evt);
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(disEnum);
}

function createComponent(path: string, className: string): void {
    const regex = /(^[A-Z][A-Za-z]*$)/;

    if (!className.match(regex) && config.get<boolean>('regexCheck', true)) {
        vscode.window.showErrorMessage(error.REGEX_ERROR);
        return;
    }

    /** Folder Path */
    const folder = `${path}\\${className}\\`

    /** Options */
    const stylesheet = config.get<string>('stylesheet', 'less');

    /** Component */
    const componentData = Component.create(className, stylesheet);
    const componentPath = `${folder}${className}.tsx`;

    /** Export TS */
    const exportData = ExportIndex.create(className)
    const exportPath = `${folder}index.ts`

    /** Test */
    const testData = Test.create(className);
    const testPath = `${folder}${className}.test.tsx`;
    const generateTests = config.get<boolean>('test', true);

    /** Stylesheet */
    const stylesheetData = '';
    let stylesheetPath = `${folder}${className}.`;

    if (stylesheet !== 'none') {
        stylesheetPath += stylesheet;
    }

    appendToRootIndex(path, className)

    mkdirp(folder, (err) => {
        fs.writeFile(componentPath, componentData);
        fs.writeFile(exportPath, exportData)

        if (generateTests) {
            fs.writeFile(testPath, testData);
        }

        if (stylesheet !== 'none') {
            fs.writeFile(stylesheetPath, stylesheetData);
        }

        vscode.window.showInformationMessage(`Component '${className}' created!`);
    });
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
    
    appendToRootIndex(path, className)

    mkdirp(`${path}\\${className}`, (err) => {
        fs.writeFile(enumPath, enumData);
        fs.writeFile(exportPath, exportData)

        vscode.window.showInformationMessage(`Enum '${className}' created!`);
    });
}

function handleEvent(evt: any) {
    fs.lstat(`${evt.fsPath}`, (err, stats) => {
        if (err) {
            vscode.window.showErrorMessage(error.UNHANDLED_ERROR);
            return;
        }
        if (stats.isDirectory()) {
            vscode.window.showInputBox(inputBoxOptions).then((value: string) => {
                if (value !== undefined && value !== '') {
                    createComponent(evt.fsPath, value);
                }
            });
        } else if (stats.isFile()) {
            vscode.window.showInformationMessage(info.SELECT_DIRECTORY);
        }
    });
}

function handleEventEnum(evt: any) {
    fs.lstat(`${evt.fsPath}`, (err, stats) => {
        if (err) {
            vscode.window.showErrorMessage(error.UNHANDLED_ERROR);
            return;
        }
        if (stats.isDirectory()) {
            vscode.window.showInputBox(inputBoxOptionsEnum).then((value: string) => {
                if (value !== undefined && value !== '') {
                    createEnum(evt.fsPath, value);
                }
            });
        } else if (stats.isFile()) {
            vscode.window.showInformationMessage(info.SELECT_DIRECTORY);
        }
    });
}

/**
 * 
 */
const inputBoxOptions = {
    value: "",
    placeHolder: "component name",
    prompt: "Creates a directory, testclass, component class and an export index."
};

/**
 * 
 */
const inputBoxOptionsEnum = {
    value: "",
    placeHolder: "enum name",
    prompt: "Creates a directory, an enum class and an export index."
};

/**
 * Returns true if package json exists, false if not.
 */
const hasPackageJson = () => {
    let isPackageJson = false;

    for (let x = 0; x < vscode.workspace.workspaceFolders.length; x++) {
        let element = vscode.workspace.workspaceFolders[x];
        const packagePath = `${element.uri.fsPath}\\package.json`;
        let stats = fs.statSync(`${packagePath}`);

        if (stats.isFile()) {
            isPackageJson = true;
        }
    }

    if (!isPackageJson) {
        vscode.window.showErrorMessage(error.NO_PACKAGE_JSON);
        return false;
    } else {
        return true;
    }
}

function appendToRootIndex(path, className) {
    const indexRootPath: string = `${path}\\index.ts`;
    if (fs.existsSync(indexRootPath)) {
        fs.appendFile(indexRootPath, `\nexport { ${className} } from './${className}'`, (err) => {
            if (err)
                throw err
        })
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}
