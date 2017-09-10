class Component {
	static create(name: string): string {
		let result = '';
		result += `/** Import React */\n`;
		result += `import * as React from 'react';\n`;
		result += `\n`;
		result += `/** Stylesheet Imports */\n`;
		result += `import './${name.toLowerCase()}.css';\n`;
		result += `\n`;
		result += `interface Props {\n`;
		result += `\tchildren?: React.ReactNode;\n`;
		result += `}\n`;
		result += `\n`;
		result += `interface State {\n`;
		result += `}\n`;
		result += `\n`;
		result += `class ${name} extends React.Component<Props> {\n`;
		result += `\tpublic state: State;\n`;
		result += `\tconstructor(public props: Props) {\n`;
		result += `\t\tsuper(props);\n`;
		result += `\t\tthis.state = {\n`;
		result += `\t\t};\n`;
		result += `\t}\n`;
		result += `\n`;
		result += `\trender() {\n`;
		result += `\t\treturn (\n`;
		result += `\t\t\t<div>{ this.props.children }</div>\n`;
		result += `\t\t);\n`;
		result += `\t}\n`;
		result += `}\n`;
		result += `\n`;
		result += `export default ${name};`;
		return result;
	}
}

class Test {
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

export { Component as Component };
export { Test as Test };