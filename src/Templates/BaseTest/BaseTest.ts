import * as vscode from "vscode"
import * as Path from "path"

import Base from "../Base/Base"
import { File } from "../../Models"
import Options from "../../Options"
import { TestFolderOptions } from "../../Options/Options"

type Pathes = { path: string, import: string }

export default abstract class BaseTest extends Base {
    protected static getPathes(path: string, name: string): Promise<{ path: string, import: string }> {
        return new Promise((resolve, reject) => {
            const folder = Options.testFolder
            let importPath = "."
            let resPath = ""

            if (folder === TestFolderOptions.Same) {
                resPath = path
                resolve({ path: resPath, import: importPath })
            } else if (folder === TestFolderOptions.Flat) {
                BaseTest.getRootWithPackageJsonInPath(path).then(root => {

                    const structure = path.replace(root, "").replace(/\\/g, "/")
                    importPath = ".." + structure
                    resPath = Path.resolve(root, "test")

                    resolve({ path: resPath, import: importPath })
                })
            } else if (folder === TestFolderOptions.Structured) {
                BaseTest.getRootWithPackageJsonInPath(path).then(root => {
                    const structure = path.replace(root, "").replace(/\\/g, "/")
                    const testFolderStr = BaseTest.createTestFolderStructure(structure, name)
                    resPath = Path.resolve(root, "test", Path.join.apply(Path, testFolderStr))
                    const up = ("/..".repeat(testFolderStr.length))
                    importPath = ".." + up + path.replace(root, "").replace(/\\/g, "/")

                    resolve({ path: resPath, import: importPath })
                })
            } else {
                resolve(null)
            }
        })
    }

    private static getRootWithPackageJsonInPath(path): Promise<string> {
        return new Promise((resolve, reject) => {
            vscode.workspace.findFiles("**/package.json", "**/node_modules/**", 1).then(val => {
                val.forEach(file => {
                    const filePath = Path.parse(file.fsPath).dir
                    const { dir, name } = Path.parse(path)
                    path = Path.resolve(dir, name)
                    if (BaseTest.isSubPathOf(path, filePath))
                        return resolve(filePath)
                })
                reject("")
            })
        })
    }

    private static isSubPathOf(path, subPath): boolean {
        return path.indexOf(subPath.replace("package.json", "")) >= 0
    }

    protected static createTestFolderStructure(src, className) {
        const splitted = src.split("/").filter(e => e !== "" && e !== className)
        return splitted.splice(1)
    }

    protected static createComment(str: string) {
        return `/** ${str} */\n`
    }
}