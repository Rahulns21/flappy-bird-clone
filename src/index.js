import Phaser, { Physics } from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        // Arcade physics plugin, manage physics simulation
        default: 'arcade'
    },
    scene: {
        preload,
        create
    }
}

// Loading assets, such as images, music, animations...
function preload() {
    // this context - scene
    // contains functions and properties we can use
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
}

let bird = null;

function create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    bird = this.physics.add.sprite(config.width / 10, config.height / 2, 'bird').setOrigin(0.5, 0);
}

new Phaser.Game(config);