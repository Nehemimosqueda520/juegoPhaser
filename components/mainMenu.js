export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "main-menu" });
  }

  init() {}

  preload() {
    this.load.image("botonJugar", "./public/assets/image/play.png");
    this.load.image("character", "./public/assets/image/character.png");
    this.load.image("background", "./public/assets/image/background.png");
    this.load.audio ("MainMenuSong", "./public/assets/audio/mainMenuSong.mp3");
  }
  create() {
    this.add.image(400, 300, "background");

    this.mainMenuSong = this.sound.add("MainMenuSong");
    this.mainMenuSong.play();
    this.mainMenuSong.loop = true;

    this.add
      .text(400, 200, "SpaceTrip", { fontSize: "40px", fill: "#fff" })
      .setOrigin(0.5, 0.5);

    //text that say "press any key to start"
    this.add
      .text(400, 450, "Presiona cualquier tecla para comenzar", {
        fontSize: "20px",
        fill: "#fff",
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(400, 300, "Desarrollado, programado y creado por:", {
        fontSize: "20px",
        fill: "#fff",
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(400, 350, "Nehemías Daniel Mosqueda", {
        fontSize: "20px",
        fill: "#fff",
      })
      .setOrigin(0.5, 0.5);

    this.input.keyboard.on("keydown", this.startGame, this);
  }

  startGame() {
    this.scene.start("game");
    this.mainMenuSong.stop ();
    this.mainMenuSong.loop = false;
  }
  update() {}
}
