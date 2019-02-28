import File from "../../Models/File/File"
import Base from "../Base/Base"

export default class Context extends Base {
    static create(path: string, name: string): File {
        const file = new File()

        file.content = Context.createContent(name)
        file.type = "ts"
        file.name = `${name}Context`
        file.path = path

        return file
    }

    private static createContent(name: string) {
		const qi = Context.getImportExportQuotemarks()
		const q = Context.getQuotemark()
        const s = Context.getSeparator()
		const semi = Context.getSemicolon()
		const contextInterfaceName = `${name}Context`

        let result = `import { createContext } from ${qi}react${qi}${semi}\n`
        result += `\n`

        result += `export interface ${contextInterfaceName} {\n`
        result += `${s}helloWorld: string\n`
        result += `${s}setHelloWorld(str: string): void\n`
        result += `}\n`
        result += `\n`
        result += `const default${contextInterfaceName}: ${contextInterfaceName} = {\n`
        result += `${s}get helloWorld(): string {\n`
        result += `${s}${s}throw new Error(${q}You need to wrap the Component into a ${name}Provider to provide the functionality of ${contextInterfaceName}.${q})\n`
        result += `${s}},\n`
        result += `${s}setHelloWorld: (str: string) => {\n`
        result += `${s}${s}throw new Error(${q}You need to wrap the Component into a ${name}Provider to provide the functionality of ${contextInterfaceName}.${q})\n`
        result += `${s}},\n`
        result += `}\n`
        result += `\n`
        result += `export const Context = createContext(default${contextInterfaceName})\n`
        return result
    }
}