import { Game } from "./game.js";
import { MainMenu } from "./components/mainMenu.js";
import  {GameOver} from './components/gameOver.js';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainMenu, Game, GameOver],
    
};

var game = new Phaser.Game(config);