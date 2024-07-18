import { Player } from './player';
import { Level } from './level';

window.onload = () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const player = new Player(canvas.width / 2, canvas.height - 100);
    const level = new Level();

    const gameLoop = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        level.update();
        player.update();

        level.draw(context);
        player.draw(context);

        requestAnimationFrame(gameLoop);
    };

    gameLoop();
};
