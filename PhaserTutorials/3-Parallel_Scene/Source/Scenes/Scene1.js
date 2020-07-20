// Scene1.js
//
// Ismael Cortez
// 7-19-2020
// Parallel Scene Example
//
// Adapted from Phaser Examples:
//  https://phaser.io/examples/v3/view/scenes/launch-parallel-scene#
//

class Scene1 extends Phaser.Scene
{
    constructor()
    {
        super("parent");
    }

    preload()
    {
        this.load.image('bg', 'Assets/background_1.png');
    }

    create()
    {
        this.add.image(0, 0, 'bg').setOrigin(0);

        this.input.once
        (
            "pointerdown",
            () => {this.scene.launch("child");},
            this
        );
    }
}

