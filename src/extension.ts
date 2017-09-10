'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { error, info } from './error-codes';
import * as vscode from 'vscode';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "react-typescript-toolbox" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('reactTypeScriptToolbox.generateComponent', (evt) => {
        // The code you place here will be executed every time your command is executed
        if (evt == undefined || !hasPackageJson()) {
            return;
        }

        handleEvent(evt);
    });

    context.subscriptions.push(disposable);
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

function handleEvent(evt: any) {
    fs.lstat(`${evt.fsPath}`, (err, stats) => {
        if (err) {
            vscode.window.showErrorMessage(error.UNHANDLED_ERROR);
            return;
        }
        if (stats.isDirectory()) {
            vscode.window.showInputBox(inputBoxOptions).then(createComponent());
        } else if (stats.isFile()) {
            vscode.window.showInformationMessage(info.SELECT_DIRECTORY);
        }
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}
function createComponent(): (value: string) => void | Thenable<void> {
    return (className: string) => {
        vscode.window.showInformationMessage(`Component '${className}' created!`);
    };
}

