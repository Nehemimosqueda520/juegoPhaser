import { Game } from "./game.js";
import { MainMenu } from "./components/mainMenu.js";


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
           
        }
    },
    scene: [MainMenu, Game],
    
};

var game = new Phaser.Game(config);