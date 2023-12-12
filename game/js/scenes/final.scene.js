class FinalScene extends Phaser.Scene{
    constructor(title){
        super(title);
    }

    init(data){
        this.result = data.result;
        this.points = data.points;
        this.padding = {
            x: 150,
            y: 50
        };
        this.angleVariance = 45;
        this.font = {
            font: 'bold 45px Papyrus',
            fill: '#ffd24d'
        }
    }


    create(){
        this.add.sprite(0,0, 'resultsBg').setOrigin(0,0);
        switch(this.result){
            case 'win':
                if (this.points < 35){
                    this.generateSymbols(1, 'happy');
                }
                else if (this.points > 80){
                    this.generateSymbols(3, 'happy');
                }
                else {
                    this.generateSymbols(2, 'happy');
                }
                this.add.text(320, 120, 'Nyertél!', this.font).setOrigin(0.5, 0.5);
                this.add.text(320, 170, 'Végső pontszám: ' + this.points, this.font).setOrigin(0.5, 0.5);
                break;
            case 'brokenCrystals':
                this.generateSymbols(3, 'sad');
                this.add.text(320, 120, 'Vesztettél!', this.font).setOrigin(0.5, 0.5);
                this.add.text(320, 170, 'Széttörted az összes kristályt!', this.font).setOrigin(0.5, 0.5);
                break;
            case 'timeEnd':
                this.generateSymbols(1, 'sad');
                this.add.text(320, 120, 'Vesztettél!', this.font).setOrigin(0.5, 0.5);
                this.add.text(320, 170, 'Lejárt az idő!', this.font).setOrigin(0.5, 0.5);
                break;
            default:
                throw Error('Result type not valid!');
        }

        const menuButton = this.add.rectangle(
            150, 280,
            200, 40,
            0xFFE258
        ).setInteractive();
        menuButton.on('pointerdown', () => this.scene.start('home'));
        const menuText = this.add.text(0,0, 'Vissza a menübe', { font: 'bold 25px Papyrus'});
        menuText.setColor("orange");
        Phaser.Display.Align.In.Center(menuText, menuButton);

        const restartButton = this.add.rectangle(
            480, 280,
            100, 40,
            0xFFE258
        ).setInteractive();
        restartButton.on('pointerdown', () => this.scene.start('game'));
        const restartText = this.add.text(0,0, 'Újra!', { font: 'bold 25px Papyrus'});
        restartText.setColor("orange");
        Phaser.Display.Align.In.Center(restartText, restartButton);
        
    }

    generateSymbols(symbolCount, type){
        for (var i = 0; i < symbolCount; i++){
            const symbolIndex = Math.round(Math.random() * 3);
            const x = Math.random() * (640 - 2 * this.padding.x) + this.padding.x;
            const y = Math.random() * (320 - 2 * this.padding.y) + this.padding.y;
            const rotation = Math.random() * 2 * this.angleVariance - this.angleVariance;
            if (type == 'happy'){
                this.add.sprite(x, y, 'winSymbols', symbolIndex).angle = rotation;
            }
            else if (type == 'sad'){
                this.add.sprite(x, y, 'loseSymbols', symbolIndex).angle = rotation;
            }
        }
    }
}