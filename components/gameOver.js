//create GameOver class for phaser game


export class GameOver extends Phaser.Scene {
constructor() {
    super("gameover");
}

preload() {
    this.load.image('botonJugar', './assets/image/play.png');
    this.load.image('character', './assets/image/character.png');
    this.load.image('background', './assets/image/background.png');
    this.load.image('enemy', './assets/image/enemy.png');
    this.load.image('weapon', './assets/image/weapon.png');
    this.load.image('restart', './assets/image/restart.png');
}

create(data) {

    //ADD BACKGROUND 
    this.add.image(400, 300, 'background');
    //add text gameover 
    this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 100, 'GAME OVER', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0.5);
    this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Your score:'+ data.score, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5, 0.5);

    //add restart button
    this.restartButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 100,'restart').setInteractive();
    this.restartButton.on('pointerdown', () => {
        this.scene.start('game');
    
    
    });


}

update() {

}
}