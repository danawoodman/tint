# ![](http://cl.ly/dqu3/tint@2x%206.10.01%20PM.png) Tint

**NOTE: This is currently in beta and may break! If it does, please create an issue!**

A not-so-sucky color picker status bar for OSX, Windows and Linux.

![](http://cl.ly/drFw/Screen%20Shot%202015-11-18%20at%201.56.51%20PM.png)

A global shortcut to open the color picker is set to `Shift + Command + c` on Mac and `Shift + Control + c` on Windows.


## Download

**[Download the latest release here](https://github.com/danawoodman/tint/releases)**


## Features

- Support opacity and hue.
- Global shortcut (`ctrl+alt+super+c`).

Something else you'd like to see? Create an issue!


## Development

> Want to help make Tint even better?

Tint is developed using [Electron](http://electron.atom.io/) which enables writing native applications using JavaScript.

Pre-reqs:

- Node v5.0.x:

```shell
# On a mac with Homebrew:
brew install nvm

nvm install
nvm use
npm install
```

- Electron:

```shell
# Install electron
npm install --global electron-prebuilt
```


### Run

Run without compiling a new app:

```shell
npm start
```


### Build

Build a `Tint.app` file:

```shell
npm run build
```

### Regenerate the Icon

Create a new `Tint.icns` file by running the following script:

```shell
./scripts/make-icon
```


## Credits

Created by Dana Woodman 2015. Released under an MIT license.

Icon "tint" by useiconic.com from the Noun Project.
