import * as vscode from 'vscode'

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
}

export class Component extends Base {
	static create(name: string, css: string): string {
		const s = Component.getSeparator()

		let result = '';
		result += `import * as React from "react"\n`;
		result += `\n`;

		if (css !== 'none') {
			result += `/** Stylesheet Imports */\n`;
			result += `import "./${name}.${css}"\n`;
			result += `\n`;
		}

		result += `export interface Props {\n`;
		result += `${s}children?: React.ReactNode\n`;
		result += `}\n`;
		result += `\n`;
		result += `export interface State {\n`;
		result += `}\n`;
		result += `\n`;
		result += `export default class ${name} extends React.Component<Props, State> {\n`;
		result += `\n`;
		result += `${s}constructor(props: Props) {\n`;
		result += `${s}${s}super(props)\n\n`;
		result += `${s}${s}this.state = {\n`;
		result += `${s}${s}}\n`;
		result += `${s}}\n`;
		result += `\n`;
		result += `${s}render() {\n`;
		result += `${s}${s}return (\n`;
		result += `${s}${s}${s}<div>{ this.props.children }</div>\n`;
		result += `${s}${s})\n`;
		result += `${s}}\n`;
		result += `}\n`;
		return result;
	}
}

export class ExportIndex {
	static create(name: string) {
		let r = ``

		r += `export { default } from "./${name}"`

		return r
	}
}

export class Model extends Base {
	static create(name: string) {
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
	static create(name: string) {
		const s = Component.getSeparator()

		let r = ''
		r += `enum ${name} {\n`
		r += `${s}MyConstant = "MyConstantValue"\n`
		r += `}\n`
		r += `export default ${name}`

		return r
	}
}

export class Test extends Base {
	static create(name: string): string {
		const s = Component.getSeparator()

		let result = ''
		result += `/** Import React */\n`
		result += `import * as ReactDOM from 'react-dom';\n`
		result += `import * as React from 'react';\n`
		result += `\n`
		result += `/** Import Test Enviroment */\n`
		result += `import { shallow } from 'enzyme';\n`
		result += `import 'jest-enzyme';\n`
		result += `\n`
		result += `/** Import Tested Component */\n`
		result += `import ${name} from './${name}';\n`
		result += `\n`
		result += `const classUnderTest = ${name};\n`
		result += `\n`
		result += `it('renders without crashing', () => {\n`
		result += `${s}const div = document.createElement('div');\n`
		result += `${s}ReactDOM.render(<${name} />, div);\n`
		result += `});\n`
		result += `\n`
		result += `describe('render', () => {\n`
		result += `\n`
		result += `${s}it('should render with props', () => {\n`
		result += `${s}${s}// preparation\n`
		result += `${s}${s}const comp = new classUnderTest({ });\n`
		result += `${s}${s}\n`
		result += `${s}${s}// execution\n`
		result += `${s}${s}const html = shallow(comp.render());\n`
		result += `${s}${s}\n`
		result += `${s}${s}// testing\n`
		result += `${s}${s}expect(html).toContainReact(<div />);\n`
		result += `${s}});\n`
		result += `});\n`
		return result;
	}
}