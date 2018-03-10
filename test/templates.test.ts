import * as assert from "assert"

import * as vscode from "vscode"
import Component from "../src/Templates/Component/Component"

suite("Templates tests", () => {
    const editorConfig = vscode.workspace.getConfiguration('editor')
    const extenstionConfig = vscode.workspace.getConfiguration('reactTypeScriptToolbox')

    test("Get component separator from configuration", () => {
        const spaceCount = editorConfig.get<number>('tabSize', 4)
        const indent = extenstionConfig.get<string>('indentation', 'spaces')

        if (indent === "spaces") {
            assert.equal(Component.getSeparator(), " ".repeat(spaceCount));
        } else {
            assert.equal(Component.getSeparator(), "\t")
        }
    })
})