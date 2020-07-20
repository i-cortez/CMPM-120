// Scene1.js
//
// Ismael Cortez
// 7-19-2020
// Parallel Scene Example
//
// Adapted from Phaser Examples:
//  https://phaser.io/examples/v3/view/scenes/launch-parallel-scene#
//

class Scene2 extends Phaser.Scene
{
    constructor()
    {
        super("child");

        // dialogue constants
        this.DBOX_X = 0; // dialogue box x-pos
        this.DBOX_Y = 400; // y-pos
        this.DBOX_FONT = "gem_font"; // font key

        this.TEXT_X = 50; // text w/in dialogue box x-pos
        this.TEXT_Y = 445; // text w/in dialogue box y-pos
        this.TEXT_SIZE = 24; // text font size (in pixels)
        this.TEXT_MAX_WIDTH = 715; // max width of text within box

        this.NEXT_TEXT = "[SPACE]"; // text to display for next prompt
        this.NEXT_X = 775; // next text prompt x-pos
        this.NEXT_Y = 574; // next text prompt y-pos

        this.LETTER_TIMER = 10; // num of ms each leter takes to write

        // dialogue variables
        this.dialogueConvo = 0; // current conversation
        this.dialogueLine = 0; // curent line of conversation
        this.dialogueSpeaker = null; // current speaker
        this.dialogueLastSpeaker = null; // former speaker
        this.dialogueTyping = false; // flag to lock player input while writing
        this.dialogueText = null; // the text to display
        this.nextText = null; // player prompt text to continue typing
        this.eof = false;
    }

    preload()
    {
        // load the JSON data (dialogue)
        this.load.json("dialogue", "Data/dialogue.json");

        // load the XML based bitmap font
        this.load.path = "./Assets/";
        this.load.bitmapFont("gem_font", "gem.png", "gem.xml");
        this.load.image("fog", "fog.png");
    }

    create()
    {
        // parse dialog from JSON file
        this.dialogue = this.cache.json.get("dialogue");

        this.add.image(0, 0, "fog").setOrigin(0).setAlpha(0.8);

        // initialize dialog text object (with no text)
        this.dialogueText = this.add.bitmapText
        (
            this.TEXT_X,
            this.TEXT_Y,
            this.DBOX_FONT,
            "",
            this.TEXT_SIZE
        );

        this.nextText = this.add.bitmapText
        (
            this.NEXT_X,
            this.NEXT_Y,
            this.DBOX_FONT,
            "",
            this.TEXT_SIZE
        );

        // input
        cursors = this.input.keyboard.createCursorKeys();

        this.input.once
        (
            "pointerdown",
            () => {this.scene.stop("child");},
            this
        );

        // start dialog
        this.typeText();
    }

    update()
    {
        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogueTyping && !this.eof)
        {
            // trigger dialogue
            this.typeText();
        }
    }

    typeText()
    {
        // lock input while typing
        this.dialogueTyping = true;

        // clear text
        this.dialogueText.text = "";
        this.nextText.text = "";

        if(this.dialogueLine > this.dialogue[this.dialogueConvo].length - 1)
        {
            this.dialogueLine = 0;

            // increment conversations here
            // can also create logic to exit the dialogue here
            this.dialogueConvo++;
        }

        if(this.dialogueConvo >= this.dialogue.length)
        {
            // simply exit the last speaker and remove the dialog box
            // can also build other logic to change game states here
            console.log("End of conversations");
            this.eof = true;
            return;
        }

        // build dialog (concatenate speaker + line of text)
        this.dialogueLines = this.dialogue[this.dialogueConvo][this.dialogueLine]["speaker"].toUpperCase() + ": " + this.dialogue[this.dialogueConvo][this.dialogueLine]["dialogue"];

        // create a timer to iterate through each letter in the dialog
        let currentChar = 0;
        this.textTimer = this.time.addEvent
        (
            {
                delay: this.LETTER_TIMER,
                repeat: this.dialogueLines.length - 1,
                callback: () =>
                {
                    // concatenate next letter from dialogLines
                    this.dialogueText.text += this.dialogueLines[currentChar];
                    // advance character position
                    currentChar++;

                    // check if timer has exhausetd its repeats
                    // necessary since Phaser 3 no longer seems to have an
                    // onComplete event
                    if(this.textTimer.getRepeatCount() == 0)
                    {
                        // show prompt for more text
                        this.nextText = this.add.bitmapText
                        (
                            this.NEXT_X,
                            this.NEXT_Y,
                            this.DBOX_FONT,
                            this.NEXT_TEXT,
                            this.TEXT_SIZE
                        ).setOrigin(1);
                        
                        // unlock input
                        this.dialogueTyping = false;
                        // destroy timer
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this // keep Scene context
            }
        );
        // set bounds on dialogue
        this.dialogueText.maxWidth = this.TEXT_MAX_WIDTH;

        // increment dialog line
        this.dialogueLine++;
        this.dialogueLastSpeaker = this.dialogueSpeaker;
    }
}

