import File from "./Models/File/File"
import Base from "./Templates/Base/Base"

export class ExportIndex extends Base {
	static create(path: string, name: string): File {
		const file = new File()

		file.content = ExportIndex.createContent(name)
		file.name = "index"
		file.type = "ts"
		file.path = path

		return file
	}

	private static createContent(name): string {
		const qi = ExportIndex.getImportExportQuotemarks()
		const r = `export { default } from ${qi}./${name}${qi}`
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
		const s = Enum.getSeparator()
		const q = Enum.getQuotemark()

		let content = ''
		content += `enum ${name} {\n`
		content += `${s}MyConstant = ${q}MyConstantValue${q}\n`
		content += `}\n`
		content += `export default ${name}`

		return content
	}
}