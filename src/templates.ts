import * as vscode from "vscode"
import File from "./Models/File/File"
import Options, { StyleSheetOptions, TestFolderOptions } from "./Options/Options"
import * as fs from "fs"
import * as Path from "path"
import Base from "./Templates/Base/Base";

export class ExportIndex {
	static create(path: string, name: string): File {
		const file = new File()

		file.content = ExportIndex.createContent(name)
		file.name = "index"
		file.type = "ts"
		file.path = path

		return file
	}

	private static createContent(name): string {
		const r = `export { default } from "./${name}"`
		return r
	}
}

export class Enum extends Base {
	static create(path: string, name: string): File {
		const file = new File()

		file.content = Enum.createContent(name)
		file.name = name
		file.type = "ts"
		file.path = path

		return file
	}

	private static createContent(name: string) {
		const separator = Enum.getSeparator()

		let content = ''
		content += `enum ${name} {\n`
		content += `${separator}MyConstant = "MyConstantValue"\n`
		content += `}\n`
		content += `export default ${name}`

		return content
	}
}

export class Stylesheet {
	public static create(path: string, name: string): File | null {
		const type = Options.styleSheet
		if (type !== StyleSheetOptions.None) {
			const file = new File()
			file.name = name
			file.content = ""
			file.path = path
			file.type = type
			return file
		}
		return null
	}
}