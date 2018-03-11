import * as vscode from "vscode"
import * as Path from "path"

import Base from "../Base/Base"
import { File } from "../../Models"
import Options from "../../Options"
import { TestFolderOptions } from "../../Options/Options"

type Pathes = { path: string, import: string }

export default abstract class BaseTest extends Base {
    protected static getPathes(path: string, name: string): Pathes {
        const folder = Options.testFolder
        let importPath = "."
        let resPath = ""

        if (folder === TestFolderOptions.Same) {
            resPath = path
        } else if (folder === TestFolderOptions.Flat) {
            const root = vscode.workspace.workspaceFolders[0].uri.fsPath
            const structure = path.replace(root, "").replace(/\\/g, "/")
            importPath = ".." + structure
            resPath = Path.resolve(root, "test")
        } else if (folder === TestFolderOptions.Structured) {
            const root = vscode.workspace.workspaceFolders[0].uri.fsPath
            const structure = path.replace(root, "").replace(/\\/g, "/")

            const testFolderStr = BaseTest.createTestFolderStructure(structure, name)
            resPath = Path.resolve(root, "test", Path.join.apply(Path, testFolderStr))


            const up = ("/..".repeat(testFolderStr.length))
            importPath = ".." + up + path.replace(root, "").replace(/\\/g, "/")
        }

        return { path: resPath, import: importPath }
    }

    protected static createTestFolderStructure(src, className) {
        const splitted = src.split("/").filter(e => e !== "" && e !== className)
        return splitted.splice(1)
    }

    protected static createComment(str: string) {
        return `/** ${str} */\n`
    }
}