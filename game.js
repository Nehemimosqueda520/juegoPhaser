

export class Game extends Phaser.Scene {

    constructor(){
        super({key: 'game'})
    }
    
    init() {
        this.score = 0;
    
    }
    
    preload ()
    {
        this.load.image('ship', './assets/image/ship.png');
        this.load.image('background', './assets/image/background.png');
        this.load.image('asteroid', './assets/image/asteroid.png');
    }
    
    create ()
    {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'background');
    
    
    
        this.asteroid = this.physics.add.group();
        this.asteroid.create(100, -10, 'asteroid');
        this.asteroid.create(200, -10, 'asteroid');
        this.asteroid.create(300, -10, 'asteroid');
        this.asteroid.create(400, -10, 'asteroid');
        this.asteroid.create(500, -10, 'asteroid');
        this.asteroid.create(600, -10, 'asteroid');
        this.asteroid.create(700, -10, 'asteroid');
        this.asteroid.create(450, -10, 'asteroid');
        this.asteroid.create(550, -10, 'asteroid');
        this.asteroid.create(650, -10, 'asteroid');
    
        this.scoreText = this.add.text(16, 16, 'Points: 0', { 
            fontSize: '20px', 
            fill: '#fff', 
            fontFamily: 'verdana, arial, sans-serif' 
        });
    
        this.ship = this.physics.add.sprite(400, 450, 'ship');
        this.ship.body.allowGravity= false;
        this.ship.setCollideWorldBounds(true);
        
    
        this.physics.add.collider (this.asteroid, this.ship, this.shipCrash.bind(this), null, );
    
        this.cursors = this.input.keyboard.createCursorKeys();
    
        // Establecer la velocidad máxima y la velocidad actual
        
        this.asteroidSpeed = 4;
    }
    
    shipCrash() {
        this.scene.start('gameover', { score: this.score });
    }
    
    
    update ()
    {
        if (this.cursors.left.isDown) {
            this.ship.setAngle(-20);
            this.ship.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.ship.setAngle(20);
            this.ship.setVelocityX(300);
        } else {
            this.ship.setAngle(0);
            this.ship.setVelocityX(0);
        }
    
        // Hacer que los asteroides caigan hacia abajo y se teletransporten al inicio de la pantalla si salen de ella
        this.asteroid.children.iterate(function(asteroid) {
            if (asteroid.y > 600) {
                // Generar una nueva posición aleatoria y establecerla como la nueva posición del asteroide
                asteroid.x = Phaser.Math.Between(0, 800);
                asteroid.y = -10;
    
                this.score = this.score + 1 ;
                this.scoreText.setText('Points: ' + this.score);
                
                    // Aumentar la velocidad cada vez que un asteroide se teletransporta
                    this.asteroidSpeed += 0.04;
            
            } else {
                asteroid.y += this.asteroidSpeed;
            }
        }, this);// Pase 'this' como segundo parámetro para que funcione dentro de la función de iteración
    
        
        
    }
}    
