import File from "../../Models/File/File"
import Base from "../Base/Base"

export default class Provider extends Base {
    static create(path: string, name: string): File {
        const file = new File()

        file.content = Provider.createContent(name)
        file.type = "tsx"
        file.name = `${name}Provider`
        file.path = path

        return file
    }

    private static createContent(name: string) {
		const qi = Provider.getImportExportQuotemarks()
		const q = Provider.getQuotemark()
        const s = Provider.getSeparator()
		const semi = Provider.getSemicolon()

        let result = `import React, { ReactNode } from ${qi}react${qi}${semi}\n`
        result += `import { Context, ${name}Context } from './${name}Context'\n`
        result += `\n`

        result += `export interface ${name}ProviderProps {\n`
        result += `${s}children: ReactNode\n`
        result += `}\n`
        result += `\n`
		result += `export function ${name}Provider({ children }: ${name}ProviderProps) {\n`
		result += `${s}let helloWorldvalue = ""\n`
		result += `\n`
		result += `${s}const value: ${name}Context = {\n`
        result += `${s}${s}helloWorld: helloWorldvalue,\n`
        result += `${s}${s}setHelloWorld: (str: string) => {\n`
        result += `${s}${s}${s}helloWorldvalue = str\n`
        result += `${s}${s}}\n`
        result += `${s}}\n`
        result += `\n`
        result += `${s}return <Context.Provider value={value}>{children}</Context.Provider>\n`
        result += `}\n`
        result += `\n`
        return result
    }
}