import * as Path from "path"
import * as assert from "assert"
import * as vscode from "vscode"

import File from "../../src/Models/File/File"
import Model from "../../src/Templates/Model"

suite("Model", () => {
    const editorConfig = vscode.workspace.getConfiguration("editor")
    const extenstionConfig = vscode.workspace.getConfiguration("reactTypeScriptToolbox")

    suite("create(path: string, name: string): File", () => {


        suite(`path = "/c", name = "myenum"`, () => {
            const path = "/c"
            const name = "myenum"

            let model: File
            setup(() => {
                model = Model.create(path, name)
            })

            test(`should return a File with complete path equal to /c/myenum.ts`, () => {
                assert.equal(model.completePath, Path.resolve(path, name + ".ts"))
            })
        })
    })
})