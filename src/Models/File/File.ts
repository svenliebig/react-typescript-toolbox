import * as Path from "path"

export default class File {
    content: string
    name: string
    type: "ts" | "tsx" | "less" | "sass" | "scss" | "css"
    path: string

    public get completePath(): string {
        const { path, name, type } = this
        return Path.resolve(path, `${name}.${type}`)
    }
}
