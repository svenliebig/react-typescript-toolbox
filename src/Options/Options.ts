import * as vscode from "vscode"

let config = vscode.workspace.getConfiguration("reactTypeScriptToolbox")

export enum StyleSheetOptions {
    None = "none",
    Less = "less",
    CSS = "css",
    Sass = "sass"
}

export default class Options {
    public static get regexCheck(): boolean {
        return config.get<boolean>('regexCheck', true)
    }

    public static get styleSheet(): StyleSheetOptions {
        const value = config.get<string>('stylesheet', 'none');
        switch (value) {
            case "none":
                return StyleSheetOptions.None
            case "css":
                return StyleSheetOptions.CSS
            case "less":
                return StyleSheetOptions.Less
            case "sass":
                return StyleSheetOptions.Sass
            default:
                return StyleSheetOptions.None
        }
    }

    public static get test(): boolean {
        return config.get<boolean>('test', false)
    }
}