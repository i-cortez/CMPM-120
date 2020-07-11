// main.js
//
// Ismael Cortez
// 7-10-2020
// Secret of the Ooze
// Elementary state machine with liquid/solid/gas states & transitions
//
// Adapted from Nathan Altice:
//  https://github.com/nathanaltice/SecretoftheOoze/blob/master/src/main.js
//

"use strict"; // Big Brain Debugging

const config =
{
    parent: "phaser-game", // for info text
    type: Phaser.Auto, // defalut is WebGL
    width: 640,
    height: 480,
    scene: [Ooze]
};

// define game
const game = new Phaser.Game(config);

// globals
let cursors;

