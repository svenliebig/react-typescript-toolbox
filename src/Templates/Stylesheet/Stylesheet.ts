import File from "../../Models/File/File"
import Options, { StyleSheetOptions } from "../../Options/Options"

export default class Stylesheet {
    public static create(path: string, name: string): File | null {
        const type = Options.styleSheet
        if (type !== StyleSheetOptions.None) {
            const file = new File()
            file.name = name
            file.content = ""
            file.path = path
            file.type = type
            return file
        }
        return null
    }
}