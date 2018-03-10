import * as Path from "path"
import * as assert from "assert"
import * as vscode from "vscode"

import File from "../../src/Models/File/File"
import Stylesheet from "../../src/Templates/Stylesheet"

suite("Stylesheet", () => {
    const editorConfig = vscode.workspace.getConfiguration("editor")
    const extenstionConfig = vscode.workspace.getConfiguration("reactTypeScriptToolbox")

    suite("create(path: string, name: string): File", () => {


        suite(`path = "/c", name = "mystylesheet"`, () => {
            const path = "/c"
            const name = "mystylesheet"

            let model: File
            setup(() => {
                model = Stylesheet.create(path, name)
            })

            test(`should return null because stylesheet options is none`, () => {
                assert.equal(model, null)
            })
        })
    })
})