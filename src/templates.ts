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
		result += `export default ${name}`;
		return result;
	}
}

export { Component as Component };