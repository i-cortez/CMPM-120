// main.js
//
// Ismael Cortez
// 7-19-2020
// Parallel Scene Example
//
// Adapted from Phaser Examples:
//  https://phaser.io/examples/v3/view/scenes/launch-parallel-scene#
//

let config =
{
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [Scene1, Scene2]
};

var game = new Phaser.Game(config);

let cursors = null;