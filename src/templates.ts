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

	private static createContent(name: string): string {
		const qi = ExportIndex.getImportExportQuotemarks()
		const semi = ExportIndex.getSemicolon()
		return `export { default } from ${qi}./${name}${qi}${semi}`
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
		const semi = Enum.getSemicolon()

		let content = ''
		content += `enum ${name} {\n`
		content += `${s}MyConstant = ${q}MyConstantValue${q}\n`
		content += `}\n`
		content += `export default ${name}${semi}`

		return content
	}
}