import * as vscode from "vscode"

let config = vscode.workspace.getConfiguration("reactTypeScriptToolbox")

export enum StyleSheetOptions {
    None = "none",
    Less = "less",
    CSS = "css",
    Sass = "sass"
}

export enum TestFolderOptions {
    Same = "same",
    Flat = "flat",
    Structured = "structured"
}

export enum Quotemarks {
    Double = "double",
    Single = "single",
    Backtick = "back-tick"
}

export default class Options {
    private static reloadConfiguration(): void {
        config = vscode.workspace.getConfiguration("reactTypeScriptToolbox")
    }

    public static get regexCheck(): boolean {
        Options.reloadConfiguration()
        return config.get<boolean>('regexCheck', true)
    }

    public static get styleSheet(): StyleSheetOptions {
        Options.reloadConfiguration()
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

    public static get removeSemicolonsFromImportsOnSave() {
        Options.reloadConfiguration()
        return config.get<boolean>('removeSemicolonsFromImportsOnSave', false)
    }

    public static get semicolons() {
        Options.reloadConfiguration()
        return config.get<boolean>('semicolons', false)
    }

    public static get test(): boolean {
        Options.reloadConfiguration()
        return config.get<boolean>('test', false)
    }

    public static get quotemarksString(): Quotemarks {
        Options.reloadConfiguration()
        return config.get<Quotemarks>('quotemarksString', Quotemarks.Double)
    }

    public static get importExportQuotemark(): Exclude<Quotemarks, Quotemarks.Backtick> {
        Options.reloadConfiguration()
        return config.get<Exclude<Quotemarks, Quotemarks.Backtick>>('quotemarksImportExport', Quotemarks.Double)
    }

    public static get testFolder(): TestFolderOptions {
        Options.reloadConfiguration()
        const value = config.get<string>("testFolder", "same")

        switch (value) {
            case "same":
                return TestFolderOptions.Same
            case "flat":
                return TestFolderOptions.Flat
            case "structured":
                return TestFolderOptions.Structured
            default:
                return TestFolderOptions.Same
        }
    }
}