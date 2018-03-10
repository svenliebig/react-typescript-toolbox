import * as assert from "assert"

import * as vscode from "vscode"
import File from "../../src/Models/File/File"
import * as Path from "path"
import ComponentTest from "../../src/Templates/ComponentTest"

suite("ComponentTest", () => {
    let componentTest: ComponentTest

    const editorConfig = vscode.workspace.getConfiguration("editor")
    const extenstionConfig = vscode.workspace.getConfiguration("reactTypeScriptToolbox")

    suite("", () => {


        suite("", () => {
            setup(() => {
            })

            test(`should return the concated path`, () => {
                assert.equal("", "")
            })
        })
    })
})