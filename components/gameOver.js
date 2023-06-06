export class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  preload() {
    this.load.image("background", "./assets/image/background.png");
    this.load.image("restart", "./assets/image/restart.png");
  }

  create(data) {
    //ADD BACKGROUND
    this.add.image(400, 300, "background");
    //add text gameover
    this.add
      .text(
        this.game.config.width / 2,
        this.game.config.height / 2 - 100,
        "JUEGO TERMINADO",
        { fontSize: "32px", fill: "#fff" }
      )
      .setOrigin(0.5, 0.5);
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
        "Presiona cualquier tecla para reiniciar",
        { fontSize: "20px", fill: "#fff" }
      )
      .setOrigin(0.5, 0.5);

    this.input.keyboard.on("keydown", this.restartGame, this);
  }

  restartGame() {
    this.scene.start("game");
  }

  update() {}
}
