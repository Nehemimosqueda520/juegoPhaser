export class Game extends Phaser.Scene {
    
    constructor(){
        super({key: 'game'})
    }

    init() {
        this.score = 0;

    }
    
    preload ()
    {
        this.load.image('character', './assets/image/character.png');
        this.load.image('background', './assets/image/background.png');
        this.load.image('enemy', './assets/image/enemy.png');
        this.load.image('weapon', './assets/image/weapon.png');
    }
    
    create ()
    {
        this.add.image(400, 300, 'background');


    
        this.objeto = this.physics.add.group();
        this.objeto.create(100, -10, 'enemy');
        this.objeto.create(200, -10, 'enemy');
        this.objeto.create(300, -10, 'enemy');
        this.objeto.create(400, -10, 'enemy');
        this.objeto.create(500, -10, 'enemy');
        this.objeto.create(600, -10, 'enemy');
        this.objeto.create(700, -10, 'enemy');

        this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { 
            fontSize: '20px', 
            fill: '#fff', 
            fontFamily: 'verdana, arial, sans-serif' 
          });
    
        this.platform = this.physics.add.sprite(400, 450, 'character');
        this.platform.body.allowGravity= false;
        this.platform.setCollideWorldBounds(true);
        
    
        this.physics.add.collider (this.objeto, this.platform, this.platformCrash.bind(this), null, );

        this.cursors = this.input.keyboard.createCursorKeys();
    
        // Establecer la velocidad máxima y la velocidad actual
        this.maxEnemySpeed = 12;
        this.enemySpeed = 4;
    }

    platformCrash() {

    }
    

    update ()
    {
        if (this.cursors.left.isDown) {
            this.platform.setAngle(-20);
            this.platform.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.platform.setAngle(20);
            this.platform.setVelocityX(300);
        } else {
            this.platform.setAngle(0);
            this.platform.setVelocityX(0);
        }
    
        // Hacer que los enemigos caigan hacia abajo y se teletransporten al inicio de la pantalla si salen de ella
        this.objeto.children.iterate(function(enemy) {
            if (enemy.y > 600) {
                // Generar una nueva posición aleatoria y establecerla como la nueva posición del enemigo
                enemy.x = Phaser.Math.Between(50, 750);
                enemy.y = -10;

                this.score += 1;
                this.scoreText.setText('PUNTOS: ' + this.score);
                
                // Limitar la velocidad máxima
                if (this.enemySpeed < this.maxEnemySpeed) {
                    // Aumentar la velocidad cada vez que un enemigo se teletransporta
                    this.enemySpeed += 0.04;
                }
            } else {
                enemy.y += this.enemySpeed;
            }
        }, this);// Pase 'this' como segundo parámetro para que funcione dentro de la función de iteración

        
        
    }
}