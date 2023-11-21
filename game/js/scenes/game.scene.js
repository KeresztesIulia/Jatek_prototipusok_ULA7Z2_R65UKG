class GameScene extends Phaser.Scene{
    constructor(title){
        super(title);
    }

    init(){

    }

    create(){

    }

    preload(){
        this.load.image('background', 'assets/background.png');
        this.load.image('pickaxe', 'assets/pickaxe.png');
        this.load.image('hammer', 'assets/hammer.png');
        this.load.image('crystal', 'assets/crystal.png');
        

        this.load.spritesheet('big','assets/big_stone.png',{
            frameWidth: 97,
            frameHeight: 83,
            margin: 1,
            spacing: 1
        });

        this.load.spritesheet('small','assets/small_stone.png',{
            frameWidth: 97,
            frameHeight: 83,
            margin: 1,
            spacing: 1
        });
    }

    gameOver(){
        
    }
}