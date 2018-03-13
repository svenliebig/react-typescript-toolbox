import * as vscode from "vscode"
import * as Path from "path"

import Base from "../Base/Base"
import File from "../../Models/File/File"
import Options, { TestFolderOptions } from "../../Options/Options"
import BaseTest from "../BaseTest/BaseTest"

export default class ComponentTest extends BaseTest {
	static create(path: string, name: string): Promise<File | null> {
		return new Promise((resolve, reject) => {
			if (Options.test) {
				const file = new File()

				const pathObject = ComponentTest.getPathes(path, name).then(pathObject => {
					if (!pathObject) {
						resolve(null)
					}

					file.path = pathObject.path
					file.name = `${name}.test`
					file.content = ComponentTest.createContent(name, pathObject.import)
					file.type = "tsx"

					resolve(file)
				})

			}
		})
	}

	private static createContent(name: string, subPath: string): string {
		const s = ComponentTest.getSeparator()
		const semi = ComponentTest.getSemicolon()

		let result = ""
		result += this.createComment("Import React")
		result += `import * as React from "react"${semi}\n`
		result += `\n`
		result += this.createComment("Import Test Enviroment")
		result += `import { shallow, ShallowWrapper } from "enzyme"${semi}\n`
		result += `\n`
		result += this.createComment("Import Tested Component")
		result += `import ${name} from "${subPath}/${name}"${semi}\n`
		result += `\n`
		result += `describe(\`<\${${name}.name} />\`, () => {\n`
		result += `\n`
		result += `${s}describe("default", () => {\n`
		result += `${s}${s}let html: ShallowWrapper${semi}\n`
		result += `\n`
		result += `${s}${s}beforeAll(() => {\n`
		result += `${s}${s}${s}html = shallow(<${name} />)${semi}\n`
		result += `${s}${s}})${semi}\n`
		result += `\n`
		result += `${s}${s}it("should render a <div />", () => {\n`
		result += `${s}${s}${s}expect(html.contains(<div />)).toBe(true)${semi}\n`
		result += `${s}${s}})${semi}\n`
		result += `${s}})${semi}\n`
		result += `})${semi}\n`

		return result
	}
}