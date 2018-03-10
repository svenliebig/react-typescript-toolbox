import File from "../../Models/File/File"
import Base from "../Base/Base"

export default class Model extends Base {
    static create(path: string, name: string): File {
        const file = new File()

        file.name = name
        file.content = Model.createContent(name)
        file.path = path
        file.type = "ts"

        return file
    }

    static createContent(name: string): string {
        const s = Model.getSeparator()

        let r = `export default class ${name} {\n`
        r += `${s}constructor() {\n`
        r += `${s}}\n`
        r += `}`

        return r
    }
}