export class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  preload() {
    this.load.image("background", "./public/assets/image/background.png");
    this.load.image("restart", "./public/assets/image/restart.png");
    this.load.audio ( "gameOverSong", "./public/assets/audio/gameOverSong.mp3");
  }

  create(data) {
    //ADD BACKGROUND
    this.add.image(400, 300, "background");
    //add text gameover

    this.gameOverSong = this.sound.add("gameOverSong");
    

    
      this.add
        .text(
          this.game.config.width / 2,
          this.game.config.height / 2 - 100,
          "JUEGO TERMINADO",
          { fontSize: "32px", fill: "#fff" }
        )
        .setOrigin(0.5, 0.5);

        this.gameOverSong.play();
    this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2,
        "Tus puntos:" + data.score,
        { fontSize: "32px", fill: "#fff" }
      )
      .setOrigin(0.5, 0.5);

    this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2 + 100,
        "Presiona la tecla R para reiniciar",
        { fontSize: "20px", fill: "#fff" }
      )
      .setOrigin(0.5, 0.5);

    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  }

  update() {
    if (this.keyR.isDown) {
      this.scene.start("game");
      this.gameOverSong.stop ()
    }
  }
}
