class Scene2 extends Phaser.Scene
{
    constructor()
    {
        // inherits characteristics of parent class
        // argument is the identifier for this scene
        super("playGame");
    }

    // Phaser scenes are controlled by the following flow of functions
    // first the init() function is used to prepare data
    // the preload() function is used to load music and images
    // the create() function is used to add objects to the game
    // the update() is a loop that runs constantly
    // 

    create()
    {
        // add background image with the add image function
        // arguments: x-coord, y-coord, key
        // set class variable for backround
        this.background = this.add.tileSprite
        (
            0,
            0,
            config.width,
            config.height,
            "background"
        );
        // set pivot to be in the top left of image instead of center
        this.background.setOrigin(0, 0);

        // add the ships to the game
        this.ship = this.add.sprite
        (
            config.width / 2 - 50,
            config.height / 2,
            "shipAnim"
        );

        this.ship2 = this.add.sprite
        (
            config.width / 2,
            config.height / 2,
            "ship2Anim"
        );

        this.ship3 = this.add.sprite
        (
            config.width / 2 + 50,
            config.height / 2,
            "ship3Anim"
        );

        // place all ships into a group and enable it for physics
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);


        // group for power ups
        this.powerUps = this.physics.add.group();

        // create a maximum number of power ups
        let maxObjects = 4;
        for(let i = 0; i <= maxObjects; ++i)
        {
            let powerUp = this.physics.add.sprite(16, 16, "powerUp");
            // add to the powerUps group
            this.powerUps.add(powerUp);
            // place at a random pos    
            powerUp.setRandomPosition
            (
                0,
                0,
                game.config.width,
                game.config.height
            );

            // a 50-50 chance to play either red or gray 
            if(Math.random() > 0.5) powerUp.play("red");
            else powerUp.play("grey");

            // set the velocity of physics body
            powerUp.setVelocity(100, 100);
            // collide with the boundaries of the canvas
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        // play the animations
        this.ship.play("sAnim1");
        this.ship2.play("sAnim2");
        this.ship3.play("sAnim3");

        // enable ship objects to receive input
        this.ship.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        // gameobjectdown defines that the event triggers when object is clicked
        // arguments: event, callback, scope
        this.input.on("gameobjectdown", this.destroyShip, this);

        this.player = this.physics.add.sprite
        (
            config.width / 2 - 8,
            config.height - 64,
            "player"
        );

        this.player.play("thrust");

        // get the input from the keyboard
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.player.setCollideWorldBounds(true);

        // assign a key so that the player can shoot
        this.spacebar = this.input.keyboard.addKey
        (
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        // create a group that holds all the Beam instances
        this.projectiles = this.add.group();

        // enable collisions between projectiles and powerUps
        this.physics.add.collider
        (
            this.projectiles,
            this.powerUps,
            // callback when collision occurs
            (projectile, powerUp) =>
            {
                projectile.destroy();
            }
        );

        // the overlap function only calculates when two objects are touching
        // but does not simulate its physics
        this.physics.add.overlap
        (
            this.player, // first object
            this.powerUps, // second object
            this.pickPowerUp, // callback function
            null, // arguments
            this // scope
        );

        // overlap between the player and enemies group
        this.physics.add.overlap
        (
            this.player,
            this.enemies,
            this.hurtPlayer,
            null,
            this
        );

        // overlap between the projectiles and enemies group
        this.physics.add.overlap
        (
            this.projectiles,
            this.enemies,
            this.hitEnemy,
            null,
            this
        );

        // add a hud background behind our score label
        let graphics = this.add.graphics();
        // add a shape with solid black fill
        graphics.fillStyle(0x000000, 1);
        // draw the polygon lines with coordinates
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        // close the path and fill the shape
        graphics.closePath();
        graphics.fillPath();

        // keep trac of score points
        this.score = 0;

        // add a score label variable with the add bitmap text function
        this.scoreLabel = this.add.bitmapText
        (
            10, // x-coord
            5, // y-coord
            "pixelFont", // bitmap font
            "SCORE: ", // text to display
            16 // font size
        );

        // create the objects for the sounds
        this.beamSound = this.sound.add("audioBeam");
        this.explosionSound = this.sound.add("audioExplosion");
        this.pickupSound = this.sound.add("audioPickup");

        this.music = this.sound.add("music");
        // define the audio properties
        let musicConfig =
        {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };
        this.music.play(musicConfig);
    }

    update()
    {

        // move the ships downward
        this.moveShip(this.ship, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);

        // decrease the position of the texture of the background
        this.background.tilePositionY -= 0.5;

        // call the function that will control the player's ship
        this.movePlayerManager();

        if(Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            if(this.player.active) this.shootBeam();
        }

        // iterate through each element of the projectile group
        for(let i = 0; i < this.projectiles.getChildren().length; ++i)
        {
            let beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }

    // has 2 parameters: ship object, movement speed
    moveShip(ship, speed)
    {
        ship.y += speed;
        // reset if y-pos exceeds game canvas height
        if(ship.y > config.height) this.resetShipPos(ship);
    }

    // has single parameter: ship object
    resetShipPos(ship)
    {
        // set y-pos to zero
        ship.y = 0;
        // create a random value between zero and game canvas width
        let randX = Phaser.Math.Between(0, config.width);
        // assign random value to x-pos
        ship.x = randX;
    }

    // has 2 parameters: mouse pointer, clicked object
    destroyShip(pointer, gameObject)
    {
        gameObject.setTexture("explosion");
        gameObject.play("explode");
    }

    movePlayerManager()
    {
        if(this.cursorKeys.left.isDown)
        {
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.right.isDown)
        {
            this.player.setVelocityX(gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.up.isDown)
        {
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }
        else if(this.cursorKeys.down.isDown)
        {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
        else this.player.setVelocity(0);
    }

    shootBeam()
    {
        let beam = new Beam(this);
        this.beamSound.play();
    }

    pickPowerUp(player, powerUp)
    {
        powerUp.disableBody(true, true);
        this.pickupSound.play();
    }

    hurtPlayer(player, enemy)
    {
        this.resetShipPos(enemy); // reset the position of the enemy ship
        if(this.player.alpha < 1) return;
        let explosion = new Explosion(this, player.x, player.y);
        // disable the ship and hide it after it explodes
        player.disableBody(true, true);

        // add the timer event to respawn the ship
        this.time.addEvent
        (
            {
                delay: 1000, // ms
                callback: this.resetPlayer,
                callbackScope: this,
                loop: false
            }
        );

        // this.resetPlayer();
        // player.x = config.width / 2 - 8; // reset the position of the player
        // player.y = config.height - 64;
    }

    hitEnemy(projectile, enemy)
    {
        // add new instance of the explosion class when enemy is hit
        let explosion = new Explosion(this, enemy.x, enemy.y);
        projectile.destroy();
        this.resetShipPos(enemy);
        this.score += 15;
        let scoreForm = this.zeroPad(this.score, 6);
        this.scoreLabel.text = "SCORE: " + scoreForm;
        this.explosionSound.play();
    }

    // take a number and return it as a padded string
    zeroPad(number, size)
    {
        let stringNum = String(number);
        while(stringNum.length < (size || 2)) stringNum = "0" + stringNum;
        return stringNum;
    }

    resetPlayer()
    {
        let x = config.width / 2 - 8;
        let y = config.height + 64;
        // enable the player again
        this.player.enableBody(true, x, y, true, true);

        // make the player transparent
        this.player.alpha = 0.5;

        let tween = this.tweens.add
        (
            {
                targets: this.player, // add a tween that will target the ship
                y: config.height - 64, // move the ship
                ease: "Power1",
                duration: 1500, // ms
                repeat: 0,
                // remove ship transparency
                onComplete: () =>
                {
                    this.player.alpha = 1;
                },
                callbackScope: this
            }
        );
    }
}

