/// <reference path="./types/index.d.ts" />

const loadingScene = new LoadingScene('loading');
const homeScene = new WelcomeScene('home');
const gameScene = new GameScene('game');
const finalScene = new FinalScene('result');

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 640,
    height: 320,
    scene: [loadingScene, homeScene, gameScene, finalScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 0
            }
        }
    }
});