import File from "../../Models/File/File"
import Base from "../Base/Base"

export default class Consumer extends Base {
    static create(path: string, name: string): File {
        const file = new File()

        file.content = Consumer.createContent(name)
        file.type = "ts"
        file.name = `${name}Consumer`
        file.path = path

        return file
    }

    private static createContent(name: string) {
		const qi = Consumer.getImportExportQuotemarks()
		const q = Consumer.getQuotemark()
        const s = Consumer.getSeparator()
		const semi = Consumer.getSemicolon()
		const consumerInterfaceName = `${name}Context`

        let result = `import * as React from ${qi}react${qi}${semi}\n`
        result += `import { ${consumerInterfaceName}, Context } from './${consumerInterfaceName}'\n`
        result += `\n`
        result += `export const With${name} = Context.Consumer\n`
        result += `\n`
        result += `export function with${name}<P>(Component: React.ComponentType<P & ${consumerInterfaceName}>): React.ComponentType<P> {\n`
        result += `${s}return props => <With${name}>{context => <Component {...context} {...props} />}</With${name}>\n`
		result += `}\n`
		
        return result
    }
}