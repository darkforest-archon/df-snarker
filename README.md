# df-snarker

Hi there! :wave: this is the [Dark Forest v6 Round 3](https://zkga.me) Remote Snarking Plug-in Server.

This server should be used in conjunction with https://github.com/darkforest-eth/plugins/blob/master/content/productivity/remote-snarker/plugin.js


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

When adding the server address to your remote snarking plugin be sure to add /move to the end of the url!

## Modify the Server for different version

Due to the different parameters and contracts for different rounds in Dark Forest.

1. Update the package version in `yarn.lock`

The version of `constants` and `contracts` needs update.

https://github.com/darkforest-archon/df-snarker/blob/f5524a540adb4854f79187a28e86a3b60c7ecb03/yarn.lock#L5

2. The parameters in `src/main.ts`

If you meet revert like `bad planethash mimc key`, the zk parameters need update.

https://github.com/darkforest-archon/df-snarker/blob/e9e3c1fef0c871ee24c4996cd8bd5822af985cae/src/main.ts#L26
