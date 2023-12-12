/// <reference path="../types/index.d.ts" />

class LoadingScene extends Phaser.Scene{
    constructor(title){
        super(title);
    }

    create(){
        this.scene.start('home');
    }

    preload(){
        this.load.image('menuBg', 'assets/menu_background.png');
        this.load.image('instructionsBg', 'assets/instructions_background.png');
        this.load.image('gameBg', 'assets/game_background.png');
        this.load.image('resultsBg', 'assets/results_background.png');

        for (let i = 1; i <= 5; i++){
            if (i == 3){
                this.load.spritesheet('crystal3', `assets/crystal3.png`, {
                    frameWidth: 100,
                    frameHeight: 100,
                    margin: 0,
                    spacing: 0
                });
            }
            const crystalType = 'crystal' + i;
            this.load.spritesheet(crystalType, `assets/${crystalType}.png`, {
                frameWidth: 200,
                frameHeight: 200,
                margin: 0,
                spacing: 0
            });
        }
        this.load.spritesheet('smallStone', 'assets/smallStone.png', {
            frameWidth: 200,
            frameHeight: 200,
            margin: 0,
            spacing: 0
        });
        this.load.spritesheet('bigStone', 'assets/bigStone.png', {
            frameWidth: 120,
            frameHeight: 120,
            margin: 0,
            spacing: 0
        });
        this.load.spritesheet('button', 'assets/button.png', {
            frameWidth: 200,
            frameHeight: 200,
            margin: 0,
            spacing: 0
        });
        this.load.image('hammer', 'assets/hammer.png');
        this.load.image('pickaxe', 'assets/pickaxe.png');
        this.load.spritesheet('hit', 'assets/hit.png', {
            frameWidth: 300,
            frameHeight: 300,
            margin: 0,
            spacing: 0
        });
        this.load.spritesheet('winSymbols', 'assets/symbolsHappy.png', {
            frameWidth: 200,
            frameHeight: 200,
            margin: 0,
            spacing: 0
        });
        this.load.spritesheet('loseSymbols', 'assets/symbolsSad.png', {
            frameWidth: 200,
            frameHeight: 200,
            margin: 0,
            spacing: 0
        });

        const bg = this.add.rectangle(
            0, 0,
            this.sys.game.config.width, this.sys.game.config.height,
            0x113311
            );
        bg.setOrigin(0,0);

        const bgBar = this.add.rectangle(
            0, 0,
            300, 20,
            0xddeedd, 0.1
        );
        Phaser.Display.Align.In.Center(bgBar, bg);

        const progressBar = this.add.rectangle(
            0, 0,
            0, 20,
            0xaaccaa
        );

        this.load.on('progress', (percentage) => {
           progressBar.setSize(percentage * 300, progressBar.height); 
           Phaser.Display.Align.In.TopLeft(progressBar, bgBar);
        });
    }
}