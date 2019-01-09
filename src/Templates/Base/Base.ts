import * as vscode from "vscode"
import Options from "../../Options"
import { Quotemarks } from "../../Options/Options"

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
		return ""
	}

	static getQuotemark(): string {
		const quotemark = Options.quotemarksString
		switch(quotemark) {
			case Quotemarks.Single:
				return "'"
			case Quotemarks.Backtick:
				return "`"
			default:
				return "\""
		}
	}
	
	static getImportExportQuotemarks(): string {
		const quotemark = Options.importExportQuotemark
		switch(quotemark) {
			case Quotemarks.Single:
				return "'"
			default:
				return "\""
		}
	}
}