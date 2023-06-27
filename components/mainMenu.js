export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "main-menu" });
  }

  init() {}

  preload() {
    this.load.image("botonJugar", "./public/assets/image/play.png");
    this.load.image("character", "./public/assets/image/character.png");
    this.load.image("background", "./public/assets/image/background.png");
    this.load.image("portada", "./public/assets/image/portada.png");
  
    this.load.audio ("MainMenuSong", "./public/assets/audio/mainMenuSong.mp3");
  }
  create() {
    this.add.image(400, 300, "background");
    this.portrait = this.add.image(400, 210, "portada").setScale(0.4);

    this.mainMenuSong = this.sound.add("MainMenuSong");
    this.mainMenuSong.play();
    this.mainMenuSong.loop = true;

  

    //text that say "press any key to start"
    this.pressAnyKeyText = this.add.text(400, 450, "Presiona cualquier tecla para comenzar", {
      fontFamily: "Monserrat",
      fontSize: "25px",
      fill: "#fff",
    }).setOrigin(0.5, 0.5);
    this.add
      .text(650, 550, "Desarrollado, programado y creado por:", {
        fontFamily: "Monserrat",
        fontSize: "12px",
        fill: "#fff",
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(650, 570, "Nehemías Daniel Mosqueda", {
        fontFamily: "Monserrat",
        fontSize: "10px",
        fill: "#fff",
      })
      .setOrigin(0.5, 0.5);

    this.input.keyboard.on("keydown", this.startGame, this);

    this.tweens.add({
      targets: this.pressAnyKeyText,
      alpha: 0, // Configura la transparencia del texto a 0
      duration: 600, // Duración de la animación en milisegundos
      ease: "Power2", // Efecto de aceleración de la animación
      yoyo: true, // Hace que la animación se repita hacia adelante y hacia atrás
      repeat: -1 // Repetir la animación indefinidamente
    });
  }

  startGame() {
    this.scene.start("game");
    this.mainMenuSong.stop ();
    this.mainMenuSong.loop = false;
  }
  update() {}
}
