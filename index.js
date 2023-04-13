import { Game } from "./game.js";


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
        }
    },
    scene: [Game]
    
};

var game = new Phaser.Game(config);