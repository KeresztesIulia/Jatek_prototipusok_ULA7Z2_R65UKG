class FinalScene extends Phaser.Scene{
    constructor(title){
        super(title);
    }

    init(data){
        this.result = data.result;
        this.points = data.points;
        this.padding = {
            x: 200,
            y: 50
        };
        this.angleVariance = 30;
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
                this.add.text(300, 120, 'Nyertél!', {
                    font: 'bold 60px Arial',
                    fill: '#34deeb'
                }).setOrigin(0.5, 0.5);
                this.add.text(300, 170, 'Végső pontszám: ' + this.points, {
                    font: 'bold 60px Arial',
                    fill: '#34deeb'
                }).setOrigin(0.5, 0.5);
                break;
            case 'brokenCrystals':
                this.generateSymbols(3, 'sad');
                this.add.text(300, 120, 'Vesztettél!', {
                    font: 'bold 60px Arial',
                    fill: '#34deeb'
                }).setOrigin(0.5, 0.5);
                this.add.text(300, 170, 'Széttörted az összes kristályt!', {
                    font: 'bold 60px Arial',
                    fill: '#34deeb'
                }).setOrigin(0.5, 0.5);
                break;
            case 'timeEnd':
                this.generateSymbols(1, 'sad');
                this.add.text(320, 120, 'Vesztettél!', {
                    font: 'bold 60px Arial',
                    fill: '#34deeb'
                }).setOrigin(0.5, 0.5);
                this.add.text(320, 170, 'Lejárt az idő!', {
                    font: 'bold 60px Arial',
                    fill: '#34deeb'
                }).setOrigin(0.5, 0.5);
                break;
            default:
                throw Error('Result type not valid!');
        }
        
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
                this.add.sprite(x, y, 'loseSymbols', symbolIndex).setOrigin(0.5,0.5).angle = rotation;
            }
            console.log(x, y);
        }
    }
}