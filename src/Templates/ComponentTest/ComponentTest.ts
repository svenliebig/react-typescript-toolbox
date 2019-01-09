import File from "../../Models/File/File"
import Options from "../../Options/Options"
import BaseTest from "../BaseTest/BaseTest"

export default class ComponentTest extends BaseTest {
	static create(path: string, name: string): Promise<File | null> {
		return new Promise((resolve, reject) => {
			if (Options.test) {
				const file = new File()

				ComponentTest.getPathes(path, name).then(pathObject => {
					if (!pathObject) {
						resolve(null)
					}

					file.path = pathObject.path
					file.name = `${name}.test`
					file.content = ComponentTest.createContent(name, pathObject.import)
					file.type = "tsx"

					resolve(file)
				})
			} else {
				resolve(null)
			}
		})
	}

	private static createContent(name: string, subPath: string): string {
		const s = ComponentTest.getSeparator()
        const q = ComponentTest.getQuotemark()
        const qi = ComponentTest.getImportExportQuotemarks()
		const semi = ComponentTest.getSemicolon()

		let result = ""
		result += this.createComment("Import React")
		result += `import * as React from ${qi}react${qi}${semi}\n`
		result += `\n`
		result += this.createComment("Import Test Enviroment")
		result += `import { shallow, ShallowWrapper } from ${qi}enzyme${qi}${semi}\n`
		result += `\n`
		result += this.createComment("Import Tested Component")
		result += `import ${name} from ${qi}${subPath}/${name}${qi}${semi}\n`
		result += `\n`
		result += `describe(${q}<${q === "`" ? `\${${name}.name}` : name} />${q}, () => {\n`
		result += `\n`
		result += `${s}describe(${q}default${q}, () => {\n`
		result += `${s}${s}let html: ShallowWrapper${semi}\n`
		result += `\n`
		result += `${s}${s}beforeAll(() => {\n`
		result += `${s}${s}${s}html = shallow(<${name} />)${semi}\n`
		result += `${s}${s}})${semi}\n`
		result += `\n`
		result += `${s}${s}it(${q}should render a <div />${q}, () => {\n`
		result += `${s}${s}${s}expect(html.contains(<div />)).toBe(true)${semi}\n`
		result += `${s}${s}})${semi}\n`
		result += `${s}})${semi}\n`
		result += `})${semi}\n`

		return result
	}
}