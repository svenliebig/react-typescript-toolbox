
# Changelog

All notable changes to the "react-typescript-toolbox" extension will be documented in this file.

## 1.7.0 - 28.02.2019

### Add 1.7.0

- Create experimental feature to generate a context with provider and consumer

## 1.5.2 - 09.01.2019

### Fix 1.5.2

- Semicolon Support in generated files

## 1.5.1 - 09.01.2019

### Fix 1.5.1

- Typo in ComponentTest

## 1.5.0 - 09.01.2019

### Added 1.5.0

- add support for double, single quotemarks for imports and exports in files
- add support for double, single and back-tick quotemarks for strings

## 1.4.2 - 18.03.2018

### Fix 1.4.2

- Components and Models where not created when the test options was set to false

## 1.4.1 - 13.03.2018

### Fix 1.4.1

- Test Creation in Folder Structure didn't work when the test folder wasn't in the root directory. Now the extension is searching for all `package.json` files in the workspace and checks if the package json is in a subfolder of the created component. If `true` then the test will generated with this folder as root and generate the test in the /test folder.

- Test template structure update, no semicolons and double quotes until preferences are up for this

## 1.4.0 - 11.03.2018

### Added 1.4.0

- Test Creation for Model Classes

## 1.3.2 - 11.03.2018

### Fixed 1.3.2

- Updated the test file to work correctly with updated enzyme / jest configurations

## 1.3.0 - 10.03.2018

### Added 1.3.0

- Created new Feature that delete semicolons from import in ts and tsx files on save, this is still an experimental feature, it's disabled by default. You can activated it with the option: removeSemicolonsFromImportsOnSave.

## 1.2.0 - 10.03.2018

### Refactor 1.2.0

- Refactored Code to make this project a bit more maintainable

### Added 1.2.0

- Support for root/test folders, there are now 3 options to genereate tests: same | flat | structured, the "same" option has the same behauvior like in the previous versions, the test file is created in the same directory as the component file. The "flat" options will create the testfile in `workspaceroot/test/*` directly. The "structured" options will create the test file in the `workspaceroot/test/componentfileFolder`, like you create a new component in `workspaceroot/src/Components/` called MyComponent, the Testfile for MyComponent will be created in `workspaceroot/test/Components/*`.

## 1.1.2 - 23.02.2018

### Added 1.1.2

- Support for editor.Tabsize Option by [Mika Andrianarijaona](https://github.com/mikaoelitiana) - Thanks. :)

## 1.1.1 - 22.02.2018

### Added 1.1.1

- Support the preferences for Tabs/Spaces as indent
- Implement Generate Model Class
- Update Readme

## 0.10.2 - 31.01.2018

### Fixed 0.10.2 [PathIssue](https://github.com/Sly321/react-typescript-toolbox/issues/3) reported by [jimfilippou](https://github.com/jimfilippou)

- Linux filesystem wasn't supported, using path.resolve now for all path variables

## 0.10.1 - 11.01.2018

### Fixed 0.10.1

- empty rows after the layer declaration in index export files

## 0.10.0 - 09.01.2018

### Added 0.10.0

- generate export index for directory root

## 0.9.0 - 08.01.2018

### Added 0.9.0

- sort for root index
- categories for root index

### Fixed 0.9.0

- boolean options where not correct

## 0.8.1 - 07.01.2018

### Fixed 0.8.1

- single to double quotes
- some unnecessary code in the generation of the componen

## 0.8.0 - 06.01.2018

### Added 0.8.0

- Enum generator
- Index generator
- Root index appends the component

## 0.7.0 - 11.09.2017

### Added 0.7.0

- Regex Classname Check
- Regex Settings option

## 0.6.5 - 11.09.2017

### Added 0.6.5

- Fix Initial Settings
- NPM Dependencies for Mkdir and FS
- Badges

## 0.6.1 - 11.09.2017

### Added 0.6.1

- Updated readme

## 0.6.0 - 11.09.2017

### Added 0.6.0

- Configuration for stylesheet and test.

## 0.5.0 - 11.09.2017

### Added 0.5.0

- Less and Testfiles

## 0.1.2 - 11.09.2017

### Added 0.1.2

- Context Menu added
- Basic Error and Info handling added

## 0.0.1 - 10.09.2017

### Added 0.0.1

- Initial empty commit.

## [Unreleased]

- Initial release