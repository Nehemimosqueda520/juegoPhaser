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

        this.add.text(400, 200, 'Spaceshot', { fontSize: '40px', fill: '#fff' }).setOrigin(0.5, 0.5);

        //text that say "press any key to start" 
        this.add.text(400, 300, 'Press any key to start', { fontSize: '20px', fill: '#fff' }).setOrigin(0.5, 0.5);

        this.input.keyboard.on('keydown', this.startGame, this);
    }
    
    startGame () {
        this.scene.start('game');
    }
    update ()
    {
    

        
    }
}