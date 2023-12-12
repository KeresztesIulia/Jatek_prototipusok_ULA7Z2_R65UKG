/// <reference path="../types/index.d.ts" />

class InstuctionsScene extends Phaser.Scene{
    constructor(title){
        super(title);
    }

    create(){
        const bg = this.add.sprite(0,0,'instructionsBg').setOrigin(0,0);
        const backButton = this.add.rectangle(
            40, 25,
            65, 30,
            0xFFE258
        ).setInteractive();
        backButton.on('pointerdown', () => this.scene.start('home'));
        const backText = this.add.text(0,0, 'Vissza', { font: 'bold 15px Papyrus'});
        backText.setColor("orange");
        Phaser.Display.Align.In.Center(backText, backButton);

        const playButton = this.add.rectangle(
            550, 300,
            150, 30,
            0xFFE258
        ).setInteractive();
        playButton.on('pointerdown', () => this.scene.start('game'));
        const playText = this.add.text(0,0, 'Tovább a játékhoz!', { font: 'bold 15px Papyrus'});
        playText.setColor("orange");
        Phaser.Display.Align.In.Center(playText, playButton);
    }
}