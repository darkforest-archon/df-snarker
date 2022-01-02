# df-snarker

Hi there! :wave: this is the [Dark Forest dfdao Round](https://game.dfdao.xyz/play) Remote Snarking Plug-in Server.

This server should be used in conjunction with `plugin.js`


## Getting Started

`git clone https://github.com/Bind/df-snarker`

Enter the df-snarker repo

`cd df-snarker`

install with npm

`npm install`

build with npm

`npm run build`

start the snarker

`npm run start`


## Adding to your Plugin

The url are added by default.

## Modify the Server for different version

Due to the different parameters and contracts for different rounds in Dark Forest.

1. Update the package version in `yarn.lock`

The version of `constants` and `contracts` needs update.

https://github.com/darkforest-archon/df-snarker/blob/f5524a540adb4854f79187a28e86a3b60c7ecb03/yarn.lock#L5

2. The parameters in `src/main.ts`

The parameters are loaded from the contracts automatically.