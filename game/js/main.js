const loadingScene = new WelcomeScene('loading');
const homeScene = new GameScene('home');
const gameScene = new FinalScene('game');

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    scene: [loadingScene, homeScene, gameScene]
});