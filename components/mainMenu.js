export class MainMenu extends Phaser.Scene {
    
    constructor(){
    super({key: 'main-menu'})
    }

    init() {
    

    }
    
    preload ()
    {
        this.load.image('botonJugar', './assets/image/play.png');
        this.load.image('character', './assets/image/character.png');
        this.load.image('background', './assets/image/background.png');
        this.load.image('enemy', './assets/image/enemy.png');
        this.load.image('weapon', './assets/image/weapon.png');
    
    }
    create() {
        this.add.image(400, 300, 'background');
    
        this.startButton = this.add.sprite(400, 400, 'botonJugar').setScale(0.5).setInteractive();
    
        this.startButton.on('pointerdown', () => {
            this.scene.start('game'); // Agrega esta línea
        });
    }
    

    update ()
    {
    

        
    }
}