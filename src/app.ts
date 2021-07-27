import MyScene from './myScene';
window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    const game = new MyScene('renderCanvas');

    // Create the scene.
    game.createScene();

    // Start render loop.
    game.doRender();
});

// https://medium.com/the-innovation/babylon-js-typescript-project-setup-for-the-impatient-d8c71b4a57ad
