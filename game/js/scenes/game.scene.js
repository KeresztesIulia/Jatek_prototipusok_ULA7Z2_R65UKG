/// <reference path="../types/index.d.ts" />
 
class GameScene extends Phaser.Scene{
    constructor(title){
        super(title);
    }
 
    init(){
        this.gameData = {
            startTime:  6 * 60 * 1000,
            hammerDamage: 25,
            pickaxeDamage: 10,
            crystalCount: Math.floor(Math.random()*3)+1,
            paddings: {
                toolSpace: 60,
                timeSpace: 35,
                innerPadding: 50
            }
        }
 
        this.crystalData = {
            sizeVariance: 0.2,
            minDistance: 15
        }
 
        this.smallStoneData = {
            scale: 1,
            sizeVariance: 0.1,
            distance: 30,
            distanceVariance: 10
        }
 
        this.bigStoneData = {
            scale: 2,
            sizeVariance: 0.3,
            distance: 50,
            distanceVariance: 15
        }
 
        this.tool = 'h';
        this.overlap = true;
        this.remainingTime = this.gameData.startTime;
    }
 
    create(){
        const bg = this.add.sprite(0,0, 'gameBg');
        bg.setOrigin(0,0);
 
        this.createCrystals();
        this.createStones();
 
        this.time.addEvent({
            delay: 1000,
            repeat: -1,
            callback: () => {
                this.overlap = false;
                this.physics.overlap(this.crystals, this.stones, () => {
                    this.overlap = true;
                });
                if (!this.overlap){
                    this.win();
                }
            }
        });
 
        this.drawTools();
        this.initTime();
        this.initTexts();
    }
 
    createCrystals(){
        // kristály:
            // kristályok száma random
            // kristály group
            // kristályok random pozícióba (valamilyen padding-gel), 100% élettel
                // random pozíciónál megnézni a kristályok közötti távolságot
            // kristály setInteractive, on pointerdown this.tool-tól függően sérül
            // phaser physics collider
            // ha nincs overlap akkor win()
            // ha széttörnek a kristályok, gameOver();
 
        this.crystals = this.add.group();
        const { paddings, crystalCount } = this.gameData;
        const xInterval = this.sys.game.config.width - 2 * paddings.innerPadding - paddings.timeSpace;
        const yInterval = this.sys.game.config.height - 2 * paddings.innerPadding - paddings.toolSpace;
        for (var i = 0; i<crystalCount; i++){
            // esetleg minDistance-t nézni!
            let x = Math.random() * xInterval + paddings.innerPadding;
            let y = Math.random() * yInterval + paddings.innerPadding;
            const crystalSprite = this.add.sprite(x, y, 'crystal', 0).setInteractive(this.input.makePixelPerfect());
            crystalSprite.setData('state', 100);
            crystalSprite.on('pointerdown', (pointer) => {
                let damage;
                if (this.tool == 'h'){
                    damage = this.gameData.hammerDamage;
                }
                else{
                    damage = this.gameData.pickaxeDamage;
                }
                const state = crystalSprite.getData('state');
                crystalSprite.setData('state', state - damage);
                console.log(crystalSprite.getData('state'));
                // sérültségi kategóriák -> grafika változtatása
                if (crystalSprite.getData('state') <= 0){
                    // széttörés animáció
                    this.crystals.remove(crystalSprite, true, true);
                    if (this.crystals.getLength() == 0){
                        this.gameOver('brokenCrystals');
                    }
                }
            });
            const sizeChange = Math.random() * 2 * this.crystalData.sizeVariance - this.crystalData.sizeVariance;
            crystalSprite.setScale(1 + sizeChange, 1 + sizeChange);
            crystalSprite.angle = Math.random() * 360;
 
            this.physics.add.existing(crystalSprite, true);
            this.crystals.add(crystalSprite);
        }
    }
 
    createStones(){
        // kövek:
            // kis és nagy kövek group
            // kövek mérete és elforgatása random (adott határokon belül)
            // kövek pozíciója: rácspontok alapján, kis random eltérés.
                // kövek közötti távolság szerint valami
            // kő.requiredTool = 'h', 'p' (nagy kő, kis kő)
            // kő.széttöréshezSzükségesÜtésekSzáma = 1 vagy 2
            // setInteractive, on pointerdown ha kő.requiredTool = this.tool sérül a kő
            // phaser collider
            // ha ütésszámcucc = 0, eltűnésanimáció, majd destroy
                // this.time.addEvent -> repeat -1
            // this.input.makePixelPerfect()
 
        this.stones = this.add.group();
        const { paddings } = this.gameData;
        const width = this.sys.game.config.width - paddings.timeSpace;
        const height = this.sys.game.config.height - paddings.toolSpace;
        
        // kis kövek létrehozása
        let distance = this.smallStoneData.distance;
        let distanceVariance = this.smallStoneData.distanceVariance;
        let sizeVariance = this.smallStoneData.sizeVariance;
        for (let i = 0; i < width; i+=distance){
            for (let j = 0; j < height; j+=distance){
                const x = i + Math.random() * distanceVariance * 2 - distanceVariance;
                const y = j + Math.random() * distanceVariance * 2 - distanceVariance;
                const smallStoneSprite = this.add.sprite(x, y, 'stone').setInteractive(this.input.makePixelPerfect());
                smallStoneSprite.setData('hitpoints', Math.round(Math.random()) + 1);
                smallStoneSprite.on('pointerdown', () => {
                    console.log(this.tool);
                    if (this.tool == 'p'){
                        const hp = smallStoneSprite.getData('hitpoints');
                        smallStoneSprite.setData('hitpoints', hp - 1);
                        console.log(smallStoneSprite.getData('hitpoints') + " small");
                        if (smallStoneSprite.getData('hitpoints') <= 0){
                            this.stones.remove(smallStoneSprite, true, true);
                        }
                    }
                });
 
                smallStoneSprite.setScale(0.3 + Math.random() * 2 * sizeVariance - sizeVariance, 0.3 + Math.random() * 2 * sizeVariance - sizeVariance);
                smallStoneSprite.angle = Math.random() * 360;
                this.physics.add.existing(smallStoneSprite, true);
                this.stones.add(smallStoneSprite);
            }
        }
 
        // nagy kövek létrehozása
        distance = this.bigStoneData.distance;
        distanceVariance = this.bigStoneData.distanceVariance;
        sizeVariance = this.bigStoneData.sizeVariance;
        for (let i = 0; i < width; i+=distance){
            for (let j = 0; j < height; j+=distance){
                const x = i + Math.random() * distanceVariance * 2 - distanceVariance;
                const y = j + Math.random() * distanceVariance * 2 - distanceVariance;
                const bigStoneSprite = this.add.sprite(x, y, 'bigstone').setInteractive(this.input.makePixelPerfect());
                bigStoneSprite.setData('hitpoints', Math.round(Math.random()) + 2);
                bigStoneSprite.on('pointerdown', () => {
                    console.log(this.tool);
                    if (this.tool == 'h'){
                        const hp = bigStoneSprite.getData('hitpoints');
                        bigStoneSprite.setData('hitpoints', hp - 1);
                        console.log(bigStoneSprite.getData('hitpoints'));
                        if (bigStoneSprite.getData('hitpoints') <= 0){
                            this.stones.remove(bigStoneSprite, true, true);
                        }
                    }
                });
 
                bigStoneSprite.setScale(1 + Math.random() * 2 * sizeVariance - sizeVariance, 1 + Math.random() * 2 * sizeVariance - sizeVariance);
                bigStoneSprite.angle = Math.random() * 360;
                this.physics.add.existing(bigStoneSprite, true);
                this.stones.add(bigStoneSprite);
            }
        }
 
    }
 
    drawTools(){
        // gombok: kalapács és csákány
            // háttér!
            // kiválasztva: kalapács
            // interaktív, on pointerdown -> this.tool = 'h', 'p'
            // kiválasztott gomb körül keret
 
        // kijavítani: toolSpace-et használjon a magasság
        this.add.rectangle(0, 250, this.sys.game.config.width, this.sys.game.config.height - 250, 0x32538a).setOrigin(0,0);
        this.hammerButton = this.add.sprite(270, 285, 'button', 1).setInteractive(this.input.makePixelPerfect());
        const hammerIcon = this.add.sprite(270, 285, 'hammer');
        this.hammerButton.on('pointerdown', () => {
            if (this.tool = 'p'){
                this.tool = 'h';
                this.hammerButton.setFrame(1);
                this.pickaxeButton.setFrame(0);
            }
        });
        this.hammerButton.setScale(0.3, 0.3);
        hammerIcon.setScale(0.2, 0.2);
 
        this.pickaxeButton = this.add.sprite(360, 285, 'button', 0).setInteractive(this.input.makePixelPerfect());
        const pickaxeIcon = this.add.sprite(360, 285, 'pickaxe');
        this.pickaxeButton.on('pointerdown', () => {
            if (this.tool = 'h'){
                this.tool = 'p';
                this.hammerButton.setFrame(0);
                this.pickaxeButton.setFrame(1);
            }
        });
        this.pickaxeButton.setScale(0.3, 0.3);
        pickaxeIcon.setScale(0.3, 0.3);
    }
 
    initTime(){
        // idősáv
            // háttér!
            // változó a maradék időre
            // time.addEvent delay: 250, repeat: -1
            // callback: maradékTime -= 250, idősáv_grafikacucc kisebb lesz, ha < 0, akkor gameOver();
 
        this.add.rectangle(640 - this.gameData.paddings.timeSpace, 0, this.gameData.paddings.timeSpace, 320, 0x7961ab).setOrigin(0,0);
        this.remainingTimeRectangle = this.add.rectangle(640 - this.gameData.paddings.timeSpace, 320, this.gameData.paddings.timeSpace, 320, 0x4e328a);
        this.remainingTimeRectangle.setOrigin(0, 1);
        this.time.addEvent({
            delay: 250,
            repeat: -1,
            callback: () => {
                this.remainingTime -= 250;
                this.remainingTimeRectangle.setScale(1, this.remainingTime / this.gameData.startTime);
                if (this.remainingTime <= 0){
                    this.gameOver("timeEnd");
                }
            }
        });
    }
 
    initTexts(){
        // kiírjuk az ép kristályok számát
        // kiírjuk a pontszámot
        this.intactCrystals = this.gameData.crystalCount;
        this.points = 100;
        this.crystalCountText = this.add.text(50, 275, 'Ép kristályok: ' + this.intactCrystals);
        const pointsText = this.add.text(450, 275, 'Pontok: ' + this.points);
        this.time.addEvent({
            delay: 250,
            repeat: -1,
            callback: () => {
                let points = 0;
                for (var i = 0; i < this.crystals.getChildren().length; i++){
                    points += this.crystals.getChildren()[i].getData('state');
                }
                this.points = Math.round(points * this.remainingTime / (this.gameData.startTime * this.gameData.crystalCount) * 100) / 100;
                pointsText.text = 'Points: ' + this.points;
            }
        });
    }
 
    win(){
        // pontszám-számítás
        this.time.removeAllEvents();
        this.scene.start('result', {result: "win", points: this.points});
    }
 
    gameOver(loseReason){
        // loseReason = brokenCrystals, timeEnd
        this.time.removeAllEvents();
        this.scene.start('result', {result: loseReason, points: 0});
    }
}