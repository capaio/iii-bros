import { Player } from './player';
import { Level } from './level';

window.onload = () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const splashScreen = document.getElementById('splashScreen') as HTMLDivElement;
    const playButton = document.getElementById('playButton') as HTMLButtonElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    playButton.addEventListener('click', () => {
        splashScreen.style.display = 'none';
        canvas.style.display = 'block';
        startGame();
    });

    const startGame = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const player = new Player();
        const level = new Level();
        let score = 0;

        const gameLoop = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            level.update(player);
            player.update(level.obstacles);

            level.draw(context);
            player.draw(context);

            // Update and draw score
            context.fillStyle = 'black';
            context.font = '20px Arial';
            context.fillText(`Score: ${score}`, canvas.width - 100, 30);

            requestAnimationFrame(gameLoop);
        };

        // Touch controls
        canvas.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            if (touch.clientX < canvas.width / 2) {
                player.moveLeft();
            } else {
                player.moveRight();
            }
        });

        canvas.addEventListener('touchend', () => {
            player.stop();
        });

        // Listen for item collection
        window.addEventListener('itemCollected', () => {
            score += 1;
        });

        gameLoop();
    };
};
