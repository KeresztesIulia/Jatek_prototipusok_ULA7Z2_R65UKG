/// <reference path="../types/index.d.ts" />

class GameScene extends Phaser.Scene{
    constructor(title){
        super(title);
    }

    init(){
        this.gameData = {
            startTime: 5 * 60 * 1000,
            hammerDamage: 25,
            pickaxeDamage: 10,
        }

        this.crystalData = {
            sizeVariance: 0.05,
            minDistance: 15,
            paddings: {
                toolSpace: 60,
                timeSpace: 20,
                innerPadding: 50
            }
        }

        this.smallStoneData = {
            scale: 1,
            sizeVariance: 0.2,
            distance: 0.5,
            distanceVariance: 0.1,
        }

        this.bigStoneData = {
            scale: 2,
            sizeVariance: 0.2,
            distance: 1,
            distanceVariance: 0.2,
        }
    }

    create(){
        const bg = this.add.sprite(0,0, 'gameBg');
        bg.setOrigin(0,0);

        this.createCrystals();
        this.createStones();

        // overlap kristályok és kövek között

        this.drawTools();
        this.initTime();
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
        const { paddings } = this.crystalData;
        const crystalCount = Math.floor(Math.random()*3)+1;
        const xInterval = this.sys.game.config.width - 2 * paddings.innerPadding - paddings.timeSpace;
        const yInterval = this.sys.game.config.height - 2 * paddings.innerPadding - paddings.toolSpace;
        for (var i = 0; i<crystalCount; i++){
            // esetleg minDistance-t nézni!
            let x = Math.random() * xInterval + paddings.innerPadding;
            let y = Math.random() * yInterval + paddings.innerPadding;
            const crystalSprite = this.add.sprite(x, y, 'crystal', 0).setInteractive(this.input.makePixelPerfect());
            crystalSprite.on('pointerdown', (pointer) => {
                console.log(pointer.x, pointer.y);
            })
            const sizeChange = Math.random() * 2 * this.crystalData.sizeVariance - this.crystalData.sizeVariance;
            crystalSprite.setScale(1 + sizeChange, 1 + sizeChange);
            crystalSprite.angle = Math.random() * 360;

            // const crystal = {
            //     sprite: crystalSprite,
            //     health: 100
            // }

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
    }

    drawTools(){
        // gombok: kalapács és csákány
            // háttér!
            // kiválasztva: kalapács
            // interaktív, on pointerdown -> this.tool = 'h', 'p'
            // kiválasztott gomb körül keret
    }

    initTime(){
        // idősáv
            // háttér!
            // változó a maradék időre
            // time.addEvent delay: 250, repeat: -1
            // callback: maradékTime -= 250, idősáv_grafikacucc kisebb lesz, ha < 0, akkor gameOver();
    }

    win(){

    }

    gameOver(loseReason){
        
    }
}