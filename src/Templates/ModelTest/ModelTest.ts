import Options, { TestFolderOptions } from "../../Options/Options"
import BaseTest from "../BaseTest/BaseTest"
import File from "../../Models/File/File"

export default class ModelTest extends BaseTest {
    static create(path: string, name: string): Promise<File | null> {
        return new Promise((resolve, reject) => {

            if (Options.test) {
                const file = new File()

                const pathObject = ModelTest.getPathes(path, name).then(pathObject => {
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
        const semi = ModelTest.getSemicolon()

        let result = ""
        result += ModelTest.createComment("Import Tested Component")
        result += `import ${name} from '${importStr}/${name}'${semi}\n`
        result += `\n`
        result += `describe(\`\${${name}.name}\`, () => {\n`
        result += `\n`
        result += `${s}describe(\`constructor(): ${name}\`, () => {\n`
        result += `${s}${s}let model: ${name}${semi}\n`
        result += `\n`
        result += `${s}${s}beforeAll(() => {\n`
        result += `${s}${s}${s}model = new ${name}()${semi}\n`
        result += `${s}${s}})${semi}\n`
        result += `\n`
        result += `${s}${s}it("should return a model", () => {\n`
        result += `${s}${s}${s}expect(model).toBeDefined()${semi}\n`
        result += `${s}${s}})${semi}\n`
        result += `\n`
        result += `${s}})${semi}\n`
        result += `})${semi}\n`

        return result
    }
}