// main.js
//
// Ismael Cortez
// 7-16-2020
// Game dialogue example
//
// Adapted from Nathan Altice:
//  https://github.com/nathanaltice/Dialogging/blob/master/index.html
//

let config =
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Title, Talking]
};

const game = new Phaser.Game(config);

// global
const centerX = game.config.width / 2;
const centerY = game.config.width / 2;
let cursors = null;

