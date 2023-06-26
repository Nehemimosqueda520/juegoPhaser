export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
    this.lastBatteryDecreaseTime = 0;
  }

  init() {
    this.score = 0;
    this.health = 10;
    this.battery = 100;
    this.batteryDecreaseInterval = 750;
  }

  preload() {
    // Images are loaded
    this.load.image("ship", "./public/assets/image/ship.png");
    this.load.image("background", "./public/assets/image/background.png");
    this.load.image("asteroid", "./public/assets/image/asteroid.png");
    this.load.image("battery", "./public/assets/image/battery.png");
    this.load.image ('ufo', './public/assets/image/ufo.png');
    this.load.image("heart", "./public/assets/image/heart.png");
    // Audio is loaded
    this.load.audio('PrincipalSong', './public/assets/audio/SpaceTripSong2.mp3');
    this.load.audio ("damage", "./public/assets/audio/damage.mp3");
    this.load.audio ("explosion", "./public/assets/audio/explosion.mp3");
    this.load.audio ( "energy", "./public/assets/audio/energySound.mp3");
    this.load.audio ("life", "./public/assets/audio/lifeSound.mp3");
  }

  create() {

    //add background
    this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "background"
    );
    
    //add principal song
    this.principalSong = this.sound.add('PrincipalSong');
    this.principalSong.play();
    this.principalSong.loop = true;

    this.energySound = this.sound.add('energy');

    this.lifeSound = this.sound.add('life');
    
    

    this.damage =this.sound.add('damage');

    this.batteryIcon = this.physics.add.group();

    this.heart = this.physics.add.group();

    this.explosion =this.sound.add('explosion');

    this.asteroid = this.physics.add.group();

    

    this.scoreText = this.add.text(16, 30, "Puntos: 0", {
      fontSize: "20px",
      fill: "#fff",
    });

    this.healthText = this.add.text(740, 30, "Vidas: 10", {
      fontSize: "20px",
      fill: "#fff",
    }).setOrigin(0.5);

    this.batteryText = this.add.text(this.game.config.width / 2, 30, "Batería: 100%", {
      fontSize: "20px",
      fill: "#fff",
    }).setOrigin(0.5);

    //add ship
    this.ship = this.physics.add.sprite(400, 450, "ship").setScale(0.35);
    this.ship.body.allowGravity = false;
    this.ship.setCollideWorldBounds(true);

    
    this.ufo = this.physics.add.group();

    //colliders
    this.physics.add.collider(
      this.asteroid,
      this.ship,
      this.shipCrash.bind(this),
      null
    );

    this.physics.add.collider(
      this.ufo,
      this.ship,
      this.ufoCrash.bind(this),
      null
    );

    this.physics.add.collider(
      this.batteryIcon,
      this.ship,
      this.batteryCrash.bind(this),
      null
    );

    this.physics.add.collider(
      this.heart,
      this.ship,
      this.heartCrash.bind(this),
      null
    );


    //input 
    this.cursors = this.input.keyboard.createCursorKeys();

    this.keyCtrl = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.CTRL
    );
    this.keyAlt = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ALT
    );

    //some parameters and data

    this.asteroidSpeed = 4;
    this.ufoSpeed = 4;
    this.batterySpeed = 4;
    this.heartSpeed = 4;

    this.lastAsteroidTime = 0;
    this.lastUfoTime = 500;
    this.lastBatteryTime = 500;
    this.lastHeartTime = 500;

    this.lastAsteroidTimeTarget = 1000;
    this.lastUfoTimeTarget = 500;
    this.lastBatteryTimeTarget = 20000;
    this.lastHeartTimeTarget = 40000;

    this.zone = "left";

    //event
    this.time.addEvent({
      delay: 5000,
      callback: this.updateTimmer,
      callbackScope: this,
      loop: true,
    });

    
  }

  shipCrash() {
    this.scene.start("gameover", { score: this.score });
    this.principalSong.loop = false
    this.principalSong.stop();
    this.damage.stop();
    this.explosion.play();
  }

  ufoCrash(ufo, ship) {
    this.damage.play();
    this.health -= 1 ;
   

    this.healthText.setText("Vidas: " + this.health);
    ship.disableBody(true, true);

    if (this.health <= 0) {
      this.shipCrash();
    }
  }

  batteryCrash(ship, batteryIcon) {
    this.battery += 10;
    batteryIcon.disableBody(true, true);
    this.batteryText.setText ("Batería: " + this.battery + "%");
    this.energySound.play();
  }

  heartCrash(ship, heart) {
    this.health += 1;
    this.healthText.setText ("Vidas: " + this.health);
    heart.disableBody(true, true);
    this.lifeSound.play();
  }

  update() {

    //ship controls
    if (this.cursors.left.isDown || this.keyCtrl.isDown) {
      this.ship.setAngle(-20);
      this.ship.setVelocity(-300, 0);
    } else if (this.cursors.right.isDown || this.keyAlt.isDown) {
      this.ship.setAngle(20);
      this.ship.setVelocity(300, 0);
    } else {
      this.ship.setAngle(0);
      this.ship.setVelocity(0, 0);
    }

     

    //create the objects
    this.asteroid.children.iterate(function (asteroid) {
      asteroid.y += this.asteroidSpeed;
    }, this);

    this.ufo.children.iterate(function (ufo) {
      ufo.y += this.ufoSpeed;
    }, this);

    this.batteryIcon.children.iterate(function (batteryIcon) {
      batteryIcon.y += this.batterySpeed;
    }, this);

    this.heart.children.iterate(function (heart) {
      heart.y += this.heartSpeed;
    }, this);
   
    const currentTime = this.time.now;

    if (currentTime - this.lastAsteroidTime >= this.lastAsteroidTimeTarget) {
      const randomX = this.getRandomX();
      const newAsteroid = this.asteroid.create(randomX, -10, "asteroid");
      newAsteroid.setVelocityY(this.asteroidSpeed);
      this.lastAsteroidTime = currentTime;
      this.score = this.score + 1475;
      this.scoreText.setText("Puntos: " + this.score);
    }

    if (currentTime - this.lastUfoTime >= this.lastUfoTimeTarget) {
      const randomX = this.getRandomX();
      const newUfo = this.ufo.create(randomX, -10, "ufo");
      newUfo.anims.play('ufoAnimation');
      newUfo.setVelocityY(this.ufoSpeed);
      this.lastUfoTime = currentTime;
    }

    if (currentTime - this.lastBatteryTime >= this.lastBatteryTimeTarget) {
      const randomX = this.getRandomX();
      const newBattery = this.batteryIcon.create(randomX, -10, "battery");
      newBattery.setVelocityY(this.batterySpeed);
      this.lastBatteryTime = currentTime;
    }

    if (currentTime - this.lastHeartTime >= this.lastHeartTimeTarget) {
      const randomX = this.getRandomX();
      const newHeart = this.heart.create(randomX, -10, "heart");
      newHeart.setVelocityY(this.heartSpeed);
      this.lastHeartTime = currentTime;
    }


    if (currentTime - this.lastBatteryDecreaseTime >= this.batteryDecreaseInterval) {
      this.battery -= 1;
      this.lastBatteryDecreaseTime = currentTime;
      this.batteryText.setText("Batería: " + this.battery + "%");
  }

    if (this.battery <= 0) {
      this.scene.start("gameover", { score: this.score });
      this.principalSong.stop();
      this.principalSong.loop = false;
    }

    if (this.battery > 100) {
      this.battery = 100;
      this.batteryText.setText("Batería: " + this.battery + "%");
    }
   
  }
  updateTimmer() {
    this.lastAsteroidTimeTarget = this.lastAsteroidTimeTarget * 0.9;
    this.lastUfoTimeTarget = this.lastUfoTimeTarget * 0.9;
    this.lastBatteryTimeTarget = this.lastBatteryTimeTarget * 0.9;
    this.lastHeartTimeTarget = this.lastHeartTimeTarget * 0.9;

  }

  getRandomX() {
    if (this.zone === "left") {
      const randomX = Phaser.Math.Between(0, this.game.config.width / 2);
      this.zone = "right";
      return randomX;
    } else {
      const randomX = Phaser.Math.Between(
        this.game.config.width / 2,
        this.game.config.width
      );
      this.zone = "left";
      return randomX;
    }
  }
}
