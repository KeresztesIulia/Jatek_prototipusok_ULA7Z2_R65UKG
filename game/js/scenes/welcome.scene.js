/// <reference path="../types/index.d.ts" />

class WelcomeScene extends Phaser.Scene{
    constructor(title){
        super(title);
    }

    create(){
        const bg = this.add.sprite(0,0, 'menuBg');
        bg.setOrigin(0,0);

        const title = this.add.text(435, 90, 'Kristáybányász', { font: 'bold 40px Papyrus'}).setOrigin(0.5, 0.5);
        title.setColor("darkred");

        // Játék indítása
        const startGameBg = this.add.rectangle(
            330, 140,
            200, 40,
            0xFFE258
        ).setInteractive();
        startGameBg.setOrigin(0,0);
        startGameBg.on('pointerdown', () => this.scene.start('game'));
        const startGameText = this.add.text(0,0, 'Játék indítása', { font: 'bold 25px Papyrus'});
        startGameText.setColor("orange");
        Phaser.Display.Align.In.Center(startGameText, startGameBg);

        // Útmutató
        const instructionsTextBg = this.add.rectangle(
            330, 200,
            200, 40,
            0xFFE258
        ).setInteractive();
        instructionsTextBg.setOrigin(0, 0);
        instructionsTextBg.on('pointerdown', () => this.scene.start('instructions'));
        const instructionsText = this.add.text(0,0, 'Útmutató', { font: 'bold 25px Papyrus'});
        instructionsText.setColor("orange");
        Phaser.Display.Align.In.Center(instructionsText, instructionsTextBg);
    }
}