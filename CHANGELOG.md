
# Change Log

All notable changes to the "react-typescript-toolbox" extension will be documented in this file.

## 1.3.0 - 10.03.2018


### Added

- Created new Feature that delete semicolons from import in ts and tsx files on save, this is still an experimental feature, it's disabled by default. You can activated it with the option: removeSemicolonsFromImportsOnSave.

## 1.2.0 - 10.03.2018


### Refactor

- Refactored Code to make this project a bit more maintainable

### Added

- Support for root/test folders, there are now 3 options to genereate tests: same | flat | structured, the "same" option has the same behauvior like in the previous versions, the test file is created in the same directory as the component file. The "flat" options will create the testfile in <workspaceroot>/test/* directly. The "structured" options will create the test file in the <workspaceroot>/test/<componentfileFolder>, like you create a new component in <workspaceroot>/src/Components/ called MyComponent, the Testfile for MyComponent will be created in <workspaceroot>/test/Components/*.

## 1.1.2 - 23.02.2018

### Added

- Support for editor.Tabsize Option by [Mika Andrianarijaona](https://github.com/mikaoelitiana) - Thanks. :)

## 1.1.1 - 22.02.2018

### Added

- Support the preferences for Tabs/Spaces as indent
- Implement Generate Model Class
- Update Readme

## 0.10.2 - 31.01.2018

### Fixed [PathIssue](https://github.com/Sly321/react-typescript-toolbox/issues/3) reported by [jimfilippou](https://github.com/jimfilippou)

- Linux filesystem wasn't supported, using path.resolve now for all path variables

## 0.10.1 - 11.01.2018

### Fixed

- empty rows after the layer declaration in index export files

## 0.10.0 - 09.01.2018

### Added

- generate export index for directory root

## 0.9.0 - 08.01.2018

### Added

- sort for root index
- categories for root index

### Fixed

- boolean options where not correct

## 0.8.1 - 07.01.2018

### Fixed

- single to double quotes
- some unnecessary code in the generation of the componen

## 0.8.0 - 06.01.2018

### Added

- Enum generator
- Index generator
- Root index appends the component

## 0.7.0 - 11.09.2017

### Added

- Regex Classname Check
- Regex Settings option

## 0.6.5 - 11.09.2017

### Added

- Fix Initial Settings
- NPM Dependencies for Mkdir and FS
- Badges

## 0.6.1 - 11.09.2017

### Added

- Updated readme

## 0.6.0 - 11.09.2017

### Added

- Configuration for stylesheet and test.

## 0.5.0 - 11.09.2017

### Added

- Less and Testfiles

## 0.1.2 - 11.09.2017

### Added

- Context Menu added
- Basic Error and Info handling added

## 0.0.1 - 10.09.2017

### Added

- Initial empty commit.

## [Unreleased]

- Initial release