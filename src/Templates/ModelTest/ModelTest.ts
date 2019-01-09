import File from "../../Models/File/File"
import Options from "../../Options/Options"
import BaseTest from "../BaseTest/BaseTest"

export default class ModelTest extends BaseTest {
    static create(path: string, name: string): Promise<File | null> {
        return new Promise((resolve) => {

            if (Options.test) {
                const file = new File()

                ModelTest.getPathes(path, name).then(pathObject => {
                    if (!pathObject) {
                        resolve(null)
                    }

                    file.path = pathObject.path
                    file.content = ModelTest.createContent(name, pathObject.import)
                    file.name = `${name}.test`
                    file.type = "ts"

                    resolve(file)
                })
            } else {
                resolve(null)
            }
        })
    }

    private static createContent(name: string, importStr: string) {
        const s = ModelTest.getSeparator()
        const q = ModelTest.getQuotemark()
        const qi = ModelTest.getImportExportQuotemarks()
        const semi = ModelTest.getSemicolon()

        let result = ""
        result += ModelTest.createComment("Import Tested Component")
        result += `import ${name} from ${qi}${importStr}/${name}${qi}${semi}\n`
        result += `\n`
        result += `describe(${q}\${${name}.name}${q}, () => {\n`
        result += `\n`
        result += `${s}describe(${q}constructor(): ${name}${q}, () => {\n`
        result += `${s}${s}let model: ${name}${semi}\n`
        result += `\n`
        result += `${s}${s}beforeAll(() => {\n`
        result += `${s}${s}${s}model = new ${name}()${semi}\n`
        result += `${s}${s}})${semi}\n`
        result += `\n`
        result += `${s}${s}it(${q}should return a model${q}, () => {\n`
        result += `${s}${s}${s}expect(model).toBeDefined()${semi}\n`
        result += `${s}${s}})${semi}\n`
        result += `\n`
        result += `${s}})${semi}\n`
        result += `})${semi}\n`

        return result
    }
}