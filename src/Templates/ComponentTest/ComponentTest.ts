import * as vscode from "vscode"
import * as Path from "path"

import Base from "../Base/Base"
import File from "../../Models/File/File"
import Options, { TestFolderOptions } from "../../Options/Options"

export default class ComponentTest extends Base {
	static create(path: string, name: string): File {
		if (Options.test) {
			const file = new File()

			const folder = Options.testFolder
			let subPath = "."

			if (folder === TestFolderOptions.Same) {
				file.path = path
			} else if (folder === TestFolderOptions.Flat) {
				const root = vscode.workspace.workspaceFolders[0].uri.fsPath
				const structure = path.replace(root, "").replace(/\\/g, "/")
				subPath = ".." + structure
				file.path = Path.resolve(root, "test")
			} else if (folder === TestFolderOptions.Structured) {
				const root = vscode.workspace.workspaceFolders[0].uri.fsPath
				const structure = path.replace(root, "").replace(/\\/g, "/")

				const testFolderStr = ComponentTest.createTestFolderStructure(structure, name)
				file.path = Path.resolve(root, "test", Path.join.apply(Path, testFolderStr))


				const up = ("/..".repeat(testFolderStr.length))
				subPath = ".." + up + path.replace(root, "").replace(/\\/g, "/")
			}

			file.name = `${name}.test`
			file.content = ComponentTest.createContent(name, subPath)
			file.type = "tsx"

			return file
		}
		return null
	}

	private static createTestFolderStructure(src, className) {
		const splitted = src.split("/").filter(e => e !== "" && e !== className)
		return splitted.splice(1)
	}

	private static createContent(name: string, subPath: string): string {
		const s = ComponentTest.getSeparator()
		const semi = ComponentTest.getSemicolon()

		let result = ""
		result += `/** Import React */\n`
		result += `import * as ReactDOM from 'react-dom'${semi}\n`
		result += `import * as React from 'react'${semi}\n`
		result += `\n`
		result += `/** Import Test Enviroment */\n`
		result += `import { shallow } from 'enzyme'${semi}\n`
		result += `import 'jest-enzyme'${semi}\n`
		result += `\n`
		result += `/** Import Tested Component */\n`
		result += `import ${name} from '${subPath}/${name}'${semi}\n`
		result += `\n`
		result += `const classUnderTest = ${name}${semi}\n`
		result += `\n`
		result += `it('renders without crashing', () => {\n`
		result += `${s}const div = document.createElement('div')${semi}\n`
		result += `${s}ReactDOM.render(<${name} />, div)${semi}\n`
		result += `})${semi}\n`
		result += `\n`
		result += `describe('render', () => {\n`
		result += `\n`
		result += `${s}it('should render with props', () => {\n`
		result += `${s}${s}// preparation\n`
		result += `${s}${s}const comp = new classUnderTest({ })${semi}\n`
		result += `${s}${s}\n`
		result += `${s}${s}// execution\n`
		result += `${s}${s}const html = shallow(comp.render())${semi}\n`
		result += `${s}${s}\n`
		result += `${s}${s}// testing\n`
		result += `${s}${s}expect(html).toContainReact(<div />)${semi}\n`
		result += `${s}})${semi}\n`
		result += `})${semi}\n`

		return result
	}
}