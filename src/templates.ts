export class Component {
	static create(name: string, css: string): string {
		let result = '';
		result += `import * as React from "react"\n`;
		result += `\n`;
		
		if (css !== 'none') {
			result += `/** Stylesheet Imports */\n`;
			result += `import "./${name}.${css.toLowerCase()}"\n`;
			result += `\n`;
		}

		result += `export interface Props {\n`;
		result += `\tchildren?: React.ReactNode;\n`;
		result += `}\n`;
		result += `\n`;
		result += `export interface State {\n`;
		result += `}\n`;
		result += `\n`;
		result += `export default class ${name} extends React.Component<Props, State> {\n`;
		result += `\n`;
		// result += `\tpublic state: State\n\n
		result += `\tconstructor(public props: Props) {\n`;
		result += `\t\tsuper(props)\n\n`;
		result += `\t\tthis.state = {\n`;
		result += `\t\t}\n`;
		result += `\t}\n`;
		result += `\n`;
		result += `\trender() {\n`;
		result += `\t\treturn (\n`;
		result += `\t\t\t<div>{ this.props.children }</div>\n`;
		result += `\t\t)\n`;
		result += `\t}\n`;
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

export class Enum {
	static create(name: string) {
		let r = ''

		r += `enum ${name} {\n`
		r += `\tMyConstant = "MyConstantValue"\n`
		r += `}\n`
		r += `export default ${name}`

		return r
	}
}

export class Test {
	static create(name: string): string {
		let result = '';
		result += `/** Import React */\n`
		result += `import * as ReactDOM from 'react-dom';\n`
		result += `import * as React from 'react';\n`
		result += `\n`
		result += `/** Import Test Enviroment */\n`
		result += `import { shallow } from 'enzyme';\n`
		result += `import 'jest-enzyme';\n`
		result += `\n`
		result += `/** Import Tested Component */\n`
		result += `import ${name} from './${name.toLowerCase()}';\n`
		result += `\n`
		result += `const classUnderTest = ${name};\n`
		result += `\n`
		result += `it('renders without crashing', () => {\n`
		result += `\tconst div = document.createElement('div');\n`
		result += `\tReactDOM.render(<${name} />, div);\n`
		result += `});\n`
		result += `\n`
		result += `describe('render', () => {\n`
		result += `\n`
		result += `\tit('should render with props', () => {\n`
		result += `\t\t// preparation\n`
		result += `\t\tconst comp = new classUnderTest({ });\n`
		result += `\t\t\n`
		result += `\t\t// execution\n`
		result += `\t\tconst html = shallow(comp.render());\n`
		result += `\t\t\n`
		result += `\t\t// testing\n`
		result += `\t\texpect(html).toContainReact(<div />);\n`
		result += `\t});\n`
		result += `});\n`
		return result;
	}
}