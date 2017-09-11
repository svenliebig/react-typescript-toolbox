'use strict';
import { error, info } from './error-codes';
import { Component, Test } from './templates';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

let config = vscode.workspace.getConfiguration('reactTypeScriptToolbox');

export function activate(context: vscode.ExtensionContext) {

    /**
     * Creates an react component on a directory root.
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

    context.subscriptions.push(disposable);
}

function createComponent(path: string, className: string): void {
    const regex = /(^[A-Z][A-Za-z]*$)/;

    if(!className.match(regex) && config.get<boolean>('regexCheck', true)) {
        vscode.window.showErrorMessage(error.REGEX_ERROR);
        return;
    }

    /** Component */
    const componentData = Component.create(className);
    const componentPath = `${path}\\${className.toLocaleLowerCase()}\\${className.toLocaleLowerCase()}.tsx`;

    /** Test */
    const testData = Test.create(className);
    const testPath = `${path}\\${className.toLocaleLowerCase()}\\${className.toLocaleLowerCase()}.test.tsx`;
    const generateTests = config.get<boolean>('test', true);

    /** Stylesheet */
    const stylesheetData = '';
    let stylesheetPath = `${path}\\${className.toLocaleLowerCase()}\\${className.toLocaleLowerCase()}.`;
    const generateStylesheet = config.get<string>('stylesheet', 'less');
    if (generateStylesheet !== 'none') {
        stylesheetPath += generateStylesheet;
    }

    mkdirp(`${path}\\${className}`, (err) => {
        fs.writeFile(componentPath, componentData);
        
        if (generateTests) {
            fs.writeFile(testPath, testData);
        }

        if (generateStylesheet !== 'none') {
            fs.writeFile(stylesheetPath, stylesheetData);
        }

        vscode.window.showInformationMessage(`Component '${className}' created!`);
    });
};

function handleEvent(evt: any) {
    fs.lstat(`${evt.fsPath}`, (err, stats) => {
        if (err) {
            vscode.window.showErrorMessage(error.UNHANDLED_ERROR);
            return;
        }
        if (stats.isDirectory()) {
            vscode.window.showInputBox(inputBoxOptions).then((value: string) => {
                if(value !== undefined && value !== '') {
                    createComponent(evt.fsPath, value);
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
    prompt: "Creates a directory, testclass and component class."
};

/**
 * Returns true if package json exists, false if not.
 */
const hasPackageJson = () => {
    let isPackageJson = false;

    for (let  x = 0; x < vscode.workspace.workspaceFolders.length; x++) {
        let  element = vscode.workspace.workspaceFolders[x];
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

// this method is called when your extension is deactivated
export function deactivate() {
}
