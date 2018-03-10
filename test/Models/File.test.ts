import * as assert from "assert"

import * as vscode from "vscode"
import File from "../../src/Models/File/File"
import * as Path from "path"

suite("File", () => {
	let file

	const editorConfig = vscode.workspace.getConfiguration("editor")
	const extenstionConfig = vscode.workspace.getConfiguration("reactTypeScriptToolbox")

	suite("get completePath(): string", () => {


		suite("path = '/a/b/c', name = 'alphabet', type = 'sass'", () => {
			setup(() => {
				file = new File()
				file.path = "/a/b/c"
				file.name = "alphabet"
				file.type = "sass"
			})

			test(`should return the concated path`, () => {
				const expectedPath = Path.resolve("/a/b/c", "alphabet.sass")
				assert.equal(file.completePath, expectedPath)
			})
		})
	})
})