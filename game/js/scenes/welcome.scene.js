/// <reference path="../types/index.d.ts" />

class WelcomeScene extends Phaser.Scene{
    constructor(title){
        super(title);
    }

    create(){
        // háttér, startgame gomb -> megnyitja a játékot.
        const bg = this.add.sprite(0,0, 'menuBg');
        bg.setOrigin(0,0);

        const textBg = this.add.rectangle(
            0, 0,
            this.sys.game.config.width / 3, 50,
            0x445600 // majd változik
        ).setInteractive();
        textBg.on('pointerdown', () => this.scene.start('game'));
        Phaser.Display.Align.In.Center(textBg, bg);

        const text = this.add.text(0,0, 'Játék indítása', { font: '50px Arial'});
        Phaser.Display.Align.In.Center(text, textBg);
    }
}