class Beam extends Phaser.GameObjects.Sprite
{

    // reference the scene
    constructor(scene)
    {
        // get the pos of players ship using the scenes reference
        let x = scene.player.x;
        let y = scene.player.y;

        // pass the arguments to parent class
        super(scene, x, y, "beam");

        // add the game object to the scene
        scene.add.existing(this);

        this.play("beamAnim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -250;

        // add the beam to the projectiles group
        scene.projectiles.add(this);
    }

    update()
    {
        // self destruct after reaching the top of the screen 
        if(this.y < 32) this.destroy();
    }
}