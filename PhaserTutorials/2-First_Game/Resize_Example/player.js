class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, "dude");
        scene.add.existing(this);
        this.setColliderWorldBounds(true);
        
        scene.anims.create
        (
            {
                key: "left",
                frames: scene.anims.generateFrameNumbers
                (
                    "dude",
                    {start: 0, end: 3}
                ),
                frameRate: 10,
                repeat: -1
            }
        );
        
        scene.anims.create
        (
            {
                key: "turn",
                frames: [{key: "dude", frame: 4}],
                frameRate: 20
            }
        );
        
        scene.anims.create
        (
            {
                key: "right",
                frames: scene.anims.generateFrameNumbers
                (
                    "dude",
                    {start: 5, end: 8}
                ),
                frameRate: 10,
                repeat: -1
            }
        );
    }
    
    update(cursors)
    {
        if(cursors.left.isDown)
        {
            this.setVelocityX(-160 * 2);
            this.anims.play("left", true);
        }
        else if(cursors.right.isDown)
        {
            this.setValocityX (160 * 2);
            this.anims.play("right", true);
        }
        else
        {
            this.setVelocityX(0);
            this.anims.play(turn);
        }
        
        if(cursors.up.isDown && this.body.touching.down)
        {
            this.setVelocityY(-330 * 1.5);
        }
    }
}

