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
        this.load.image('gameBg', 'assets/game_background.png');
        this.load.image('resultsBg', 'assets/results_background.png');

        this.load.image('crystal', 'assets/crystal.png');

        // gombok két állapota: kiválasztva, nem kiválasztva
        // this.load.image('pickaxe', 'assets/pickaxe.png',{
        //     frameWidth: 97,
        //     frameHeight: 83,
        //     margin: 1,
        //     spacing: 1
        // });
        // this.load.image('hammer', 'assets/hammer.png',{
        //     frameWidth: 97,
        //     frameHeight: 83,
        //     margin: 1,
        //     spacing: 1
        // });


        // this.load.spritesheet('crystals', 'assets/crystals.png',{
        //     frameWidth: 97,
        //     frameHeight: 83,
        //     margin: 1,
        //     spacing: 1
        // });
        
        // this.load.spritesheet('bigStone','assets/big_stone.png',{
        //     frameWidth: 97,
        //     frameHeight: 83,
        //     margin: 1,
        //     spacing: 1
        // });

        // this.load.spritesheet('smallStone','assets/small_stone.png',{
        //     frameWidth: 97,
        //     frameHeight: 83,
        //     margin: 1,
        //     spacing: 1
        // });

        this.tool = 'h';

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