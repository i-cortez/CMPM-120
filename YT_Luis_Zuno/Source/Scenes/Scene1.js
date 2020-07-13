class Scene1 extends Phaser.Scene
{
    constructor()
    {
        // inherits characteristics of parent class
        // argument is the identifier for this scene
        super("bootGame");
    }

    // Phaser scenes are controlled by the following flow of functions
    // first the init() function is used to prepare data
    // the preload() function is used to load music and images
    // the create() function is used to add objects to the game
    // the update() is a loop that runs constantly
    // 

    preload()
    {
        // preload the background image with the load image function
        // arguments: key, path
        this.load.image("background", "Assets/Images/background.png");

        // preload the ship spritesheets
        this.load.spritesheet
        (
            "shipAnim",
            "Assets/Spritesheets/shipAnim.png",
            // define the size of the frame in pixels
            {frameWidth: 16, frameHeight: 16}
        );

        this.load.spritesheet
        (
            "ship2Anim",
            "Assets/Spritesheets/ship2Anim.png",
            {frameWidth: 32, frameHeight: 16}
        );

        this.load.spritesheet
        (
            "ship3Anim",
            "Assets/Spritesheets/ship3Anim.png",
            {frameWidth: 32, frameHeight: 32}
        );

        this.load.spritesheet
        (
            "explosion",
            "Assets/Spritesheets/explosion.png",
            {frameWidth: 16, frameHeight: 16}
        );

        this.load.spritesheet
        (
            "powerUp",
            "Assets/Spritesheets/powerUp.png",
            {frameWidth: 16, frameHeight: 16}
        );

        this.load.spritesheet
        (
            "player",
            "Assets/Spritesheets/player.png",
            {frameWidth: 16, frameHeight: 24}
        );

        this.load.spritesheet
        (
            "beam",
            "Assets/Spritesheets/beam.png",
            {frameWidth: 16, frameHeight: 16}
        );

        // load the bitmap font files
        this.load.bitmapFont
        (
            "pixelFont",
            "Assets/Fonts/font.png",
            "Assets/Fonts/font.xml"
        );

        this.load.audio("audioBeam", "Assets/Sounds/beam.mp3");
        this.load.audio("audioPickup", "Assets/Sounds/pickup.mp3");
        this.load.audio("audioExplosion", "Assets/Sounds/explosion.mp3");
        this.load.audio("music", "Assets/Sounds/sci-fi_platformer12.mp3");
    }

    create()
    {
        
        this.add.text(20, 20, "loading game...");
        // switch to Scene2 from this scene
        this.scene.start("playGame");
        
        // the create animation function defines the animation
        // what we define in one scene is passed on to other scenes
        // arguments: key, frames, frame rate, repeat
        this.anims.create
        (
            {
                key: "sAnim1",
                frames: this.anims.generateFrameNumbers("shipAnim"),
                frameRate: 20,
                repeat: -1 // for infinite loops use -1
            }
        );

        this.anims.create
        (
            {
                key: "sAnim2",
                frames: this.anims.generateFrameNumbers("ship2Anim"),
                frameRate: 20,
                repeat: -1
            }
        );

        this.anims.create
        (
            {
                key: "sAnim3",
                frames: this.anims.generateFrameNumbers("ship3Anim"),
                frameRate: 20,
                repeat: -1
            }
        );

        this.anims.create
        (
            {
                key: "explode",
                frames: this.anims.generateFrameNumbers("explosion"),
                frameRate: 20,
                repeat: 0, // will not repeat
                hideOnComplete: true
            }
        );

        this.anims.create
        (
            {
                key: "red",
                frames: this.anims.generateFrameNumbers
                (
                    "powerUp",
                    {start: 0, end: 1}
                ),
                frameRate: 20,
                repeat: -1
            }
        );

        this.anims.create
        (
            {
                key: "grey",
                frames: this.anims.generateFrameNumbers
                (
                    "powerUp",
                    {start: 2, end: 3}
                ),
                frameRate: 20,
                repeat: -1
            }
        );

        this.anims.create
        (
            {
                key: "thrust",
                frames: this.anims.generateFrameNumbers("player"),
                frameRate: 20,
                repeat: -1
            }
        );

        this.anims.create
        (
            {
                key: "beamAnim",
                frames: this.anims.generateFrameNumbers("beam"),
                frameRate: 20,
                repeat: -1
            }
        );
    }
}

