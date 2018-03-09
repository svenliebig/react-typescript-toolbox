import * as vscode from "vscode"
import File from "./Models/File/File"
import Options, { StyleSheetOptions } from "./Options/Options"

class Base {
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

export class Component extends Base {
	static create(path: string, name: string): File {
		const file = new File()

		file.content = Component.createContent(name)
		file.type = "tsx"
		file.name = name
		file.path = path

		return file
	}

	private static createContent(name: string) {
		const style = Options.styleSheet
		const s = Component.getSeparator()

		let result = `import * as React from "react"\n`
		result += `\n`

		if (style !== StyleSheetOptions.None) {
			result += `/** Stylesheet Imports */\n`
			result += `import "./${name}.${style}"\n`
			result += `\n`
		}

		result += `export interface Props {\n`
		result += `${s}children?: React.ReactNode\n`
		result += `}\n`
		result += `\n`
		result += `export interface State {\n`
		result += `}\n`
		result += `\n`
		result += `export default class ${name} extends React.Component<Props, State> {\n`
		result += `\n`
		result += `${s}constructor(props: Props) {\n`
		result += `${s}${s}super(props)\n\n`
		result += `${s}${s}this.state = {\n`
		result += `${s}${s}}\n`
		result += `${s}}\n`
		result += `\n`
		result += `${s}render() {\n`
		result += `${s}${s}return (\n`
		result += `${s}${s}${s}<div>{ this.props.children }</div>\n`
		result += `${s}${s})\n`
		result += `${s}}\n`
		result += `}\n`
		return result
	}
}

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

export class Model extends Base {
	static create(path: string, name: string): File {
		const file = new File()

		file.name = name
		file.content = Model.createContent(name)
		file.path = path
		file.type = "ts"

		return file
	}

	static createContent(name: string): string {
		const s = Component.getSeparator()

		let r = ''
		r += `export default class ${name} {\n`
		r += `${s}constructor() {\n`
		r += `${s}}\n`
		r += `}`

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
		const separator = Component.getSeparator()

		let content = ''
		content += `enum ${name} {\n`
		content += `${separator}MyConstant = "MyConstantValue"\n`
		content += `}\n`
		content += `export default ${name}`

		return content
	}
}

export class ComponentTest extends Base {
	static create(path: string, name: string): File {
		if (Options.test) {
			const file = new File()

			file.name = name
			file.content = ComponentTest.createContent(name)
			file.type = "tsx"
			file.path = path

			return file
		}
		return null
	}

	private static createContent(name: string): string {
		const s = ComponentTest.getSeparator()
		const semi = ComponentTest.getSemicolon()

		let result = ''
		result += `/** Import React */\n`
		result += `import * as ReactDOM from 'react-dom'${semi}\n`
		result += `import * as React from 'react'${semi}\n`
		result += `\n`
		result += `/** Import Test Enviroment */\n`
		result += `import { shallow } from 'enzyme'${semi}\n`
		result += `import 'jest-enzyme'${semi}\n`
		result += `\n`
		result += `/** Import Tested Component */\n`
		result += `import ${name} from './${name}'${semi}\n`
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