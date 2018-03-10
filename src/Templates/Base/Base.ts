import * as vscode from "vscode"

export default class Base {
	static getSeparator() {
		const config = vscode.workspace.getConfiguration('reactTypeScriptToolbox')
		const indent = config.get<string>('indentation', 'spaces')

		if (indent === "spaces") {
			const editorConfig = vscode.workspace.getConfiguration('editor')
			const spaceCount = editorConfig.get<number>('tabSize', 4)
			return " ".repeat(spaceCount)
		} else {
			return "\t"
		}
	}

	static getSemicolon() {
		return ";"
	}
}