// Title.js
//
// Ismael Cortez
// 7-16-2020
// Game dialogue example
//
// Adapted from Nathan Altice:
//  https://github.com/nathanaltice/Dialogging/blob/master/index.html
//

class Title extends Phaser.Scene
{
    constructor()
    {
        super("titleScene");
    }

    preload()
    {
        // load JSON data (dialogue)
        this.load.json("dialog", "./Data/JSON/dialog.json");

        // load the images
        this.load.path = "./Assets/";
        this.load.image("dialogueBox", "./Images/dialogbox.png");
        this.load.image("homer", "./Images/homer.png");
        this.load.image("minerva", "./Images/minerva.png");
        this.load.image("jove", "./Images/jove.png");
        this.load.image("neptune", "./Images/neptune.png");

        // add the XML based bitmap font
        this.load.bitmapFont("gem_font", "./Font/gem.png", "./Font/gem.xml");
    }

    create()
    {
        // add the title text
        this.add.bitmapText
        (
            centerX, // x-pos
            centerY - 32, // y-pos
            "gem_font", // key of font
            "THE ODYSSEY", // content
            32, // size
            0 // alignment
        ).setOrigin(0.5);

        // create input
        cursors = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        // wait for player input
        if(Phaser.Input.Keyboard.JustDown(cursors.space))
        {
            this.scene.start("talkingScene");
        }
    }
}

