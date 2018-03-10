import FileService from "../FileService/FileService"
import File from "../../Models/File/File"
import * as Path from "path"

export default class RemoveImportSemicolonsFromDoc {
    public static process(doc) {
        if (doc.languageId === "typescriptreact" || doc.languageId === "typescript") {
            const file = new File()
            const parsed = Path.parse(doc.fileName)
            file.name = parsed.name
            file.type = (parsed.ext.replace(".", "") as any)
            file.path = parsed.dir

            let changed: boolean = false
            const newContent = doc.getText().split("\n").map(value => {
                if (value.indexOf("import") === 0) {
                    if (value.charAt(value.length - 1) === ";") {
                        changed = true
                        return value.slice(0, value.length - 1)
                    } else if (value.charAt(value.length - 2) === ";") {
                        changed = true
                        return value.slice(0, value.length - 2)
                    }
                }
                return value
            })

            if (changed) {
                file.content = newContent.join("\n")
                FileService.write(file)
            }
        }
    }
}