export class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  init() {
    this.score = 0;
  }

  preload() {
    this.load.image("ship", "./assets/image/ship.png");
    this.load.image("background", "./assets/image/background.png");
    this.load.image("asteroid", "./assets/image/asteroid.png");
    this.load.image("ufo", "./assets/image/ufo.png");
  }

  create() {
    this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "background"
    );

    this.asteroid = this.physics.add.group();

    this.ufo = this.physics.add.group();

    this.scoreText = this.add.text(16, 16, "Puntos: 0", {
      fontSize: "20px",
      fill: "#fff",
    });

    this.ship = this.physics.add.sprite(400, 450, "ship").setScale(0.35);
    this.ship.body.allowGravity = false;
    this.ship.setCollideWorldBounds(true);

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

    this.cursors = this.input.keyboard.createCursorKeys();

    this.keyCtrl = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.CTRL
    );
    this.keyAlt = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ALT
    );

    // Establecer la velocidad máxima y la velocidad actual

    this.asteroidSpeed = 4;
    this.ufoSpeed = 4;

    this.lastAsteroidTime = 0;
    this.lastUfoTime = 500;

    this.coinTimee = 100;

    //create un evento
    this.lastAsteroidTimeTarget = 1000;
    this.lastUfoTimeTarget = 500;
    this.time.addEvent({
      delay: 5000,
      callback: this.updateTimmer,
      callbackScope: this,
      loop: true,
    });

    this.zone = "left";
  }

  shipCrash() {
    this.scene.start("gameover", { score: this.score });
  }

  ufoCrash(ufo, ship) {
    if (this.score < 10000) {
      this.score -= 1000;
    } else if (this.score >= 10000 && this.score < 50000) {
      this.score -= 20000;
    } else if (this.score >= 50000 && this.score < 100000) {
      this.score -= 50000;
    } else {
      this.score -= 100000;
    }

    if (this.score < 0) {
      this.score = 0;
    }

    this.scoreText.setText("Puntos: " + this.score);
    ship.disableBody(true, true);
  }

  update() {
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
    //hacer que un nuevo asteroide caiga cada un segundo
    this.asteroid.children.iterate(function (asteroid) {
      asteroid.y += this.asteroidSpeed;
    }, this);

    this.ufo.children.iterate(function (ufo) {
      ufo.y += this.ufoSpeed;
    }, this);

    //aqui empiezan los tiempos en los que caen los asteroides

    //cae un asteroide cada segundo hasta que se alcance los 50 puntos
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
      newUfo.setVelocityY(this.ufoSpeed);
      this.lastUfoTime = currentTime;
    }
  }

  updateTimmer() {
    this.lastAsteroidTimeTarget = this.lastAsteroidTimeTarget * 0.9;
    this.lastUfoTimeTaget = this.lastUfoTimeTaget * 0.9;
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
