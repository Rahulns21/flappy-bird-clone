import Phaser, { Physics } from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        // Arcade physics plugin, manage physics simulation
        default: 'arcade',
        arcade: {
            gravity: {
                y: 400
            },
            debug: true,
        }
    },
    scene: {
        preload,
        create,
        update,
    }
}

// Loading assets, such as images, music, animations...
function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
}

const VELOCITY = 200;

let bird = null;
let flapVelocity = 150
let totalDelta = null;

function create() {
    this.add.image(0, 0, 'sky').setOrigin(0);
    bird = this.physics.add.sprite(config.width / 10, config.height / 2, 'bird').setOrigin(0.5, 0);

    this.input.on('pointerdown', flap);

    this.input.keyboard.on('keydown_SPACE', flap);
}

function update(time, delta) {
    
}

function flap() {
    bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);