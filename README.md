![tool](images/logo.png)![plus](images/plus.png)![react](images/react.png)

# react-typescript-toolbox
![version](https://vsmarketplacebadge.apphb.com/version-short/svenliebig.react-typescript-toolbox.svg?style=flat-square)
![installs](https://vsmarketplacebadge.apphb.com/installs-short/svenliebig.react-typescript-toolbox.svg?style=flat-square)
![rating](https://vsmarketplacebadge.apphb.com/rating-short/svenliebig.react-typescript-toolbox.svg?style=flat-square)

Extension to create TypeScript React Components from Visual Studio Code explorer menu.

## Features

Create a React Component with a Test and a Less file from the Visual Studio Code Explorer Contextmenu.

![tool](images/showcase.gif)

> Tip: Rightclick in Visual Studio Code Explorer and > Generate Component.

> Tip: Use the settings.json to disable test generation or changing the stylesheet type.

## Requirements

This extension has no dependencies to other extensions. Maybe node.js installed ist required!

## Extension Settings

Available Settings:

* `reactTypeScriptToolbox.stylesheet`: `('none' | 'less' | 'css' | 'sass')`
* `reactTypeScriptToolbox.test`: `(true | false)`
* `reactTypeScriptToolbox.regexCheck`: `(true | false)`

## Known Issues

## Release Notes

###  0.7.0
Added Regex Classname Check and Regex Settings option

### 0.6.4

Fixed some bugs with the settings and the installation.

### 0.6.0

Add configuration for stylesheet and test.

### 0.5.0

Create a TypeScript React Component with Test and Less file from Contextmenu.

-----------------------------------------------------------------------

## Upcoming! Features

* Use UserConfiguration to:
  * use tabs or spaces for indentation
  * choose if folder and file are lowercase

### For more information

* [Github](https://github.com/Sly321/react-typescript-toolbox)
* Any ideas? Mail me: liebigs@gmail.com