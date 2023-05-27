export class GameOver extends Phaser.Scene {
    constructor() {
        super("gameover");
    }
    
    preload() {
        this.load.image('background', './assets/image/background.png');
        this.load.image('restart', './assets/image/restart.png');
        this.load.audio('gameOverSong', './assets/audio/GameOverSong.mp3');
    }
    
    create(data) {
    
        //ADD BACKGROUND 
        this.add.image(400, 300, 'background');
        //add text gameover 
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 100, 'GAME OVER', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0.5);
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Your score:'+ data.score, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0.5);
    
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 100, 'Press any key to restart', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5, 0.5);

        this.input.keyboard.on('keydown', this.restartGame, this);

        this.gameOverSong = this.sound.add('gameOverSong');
        this.gameOverSong.play();
    }
    
    restartGame () {
        this.scene.start('game');
        this.gameOverSong.stop();
    }

    update() {
    
    }
    }