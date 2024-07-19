import { Player } from './player';
import { Level } from './level';

window.onload = () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const splashScreen = document.getElementById('splashScreen') as HTMLDivElement;
    const playButton = document.getElementById('playButton') as HTMLButtonElement;
    const musicToggleButton = document.getElementById('musicToggleButton') as HTMLButtonElement;
    const musicIcon = document.getElementById('musicIcon') as HTMLElement;
    const scoreDisplay = document.getElementById('score') as HTMLDivElement;
    const splashMusic = document.getElementById('splashMusic') as HTMLAudioElement;
    const gameMusic = document.getElementById('gameMusic') as HTMLAudioElement;
    const collectSoundSrc = 'coin.wav';
    const leftButton = document.getElementById('leftButton') as HTMLButtonElement;
    const rightButton = document.getElementById('rightButton') as HTMLButtonElement;
    const jumpButton = document.getElementById('jumpButton') as HTMLButtonElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    let isMusicPlaying = false;
    let currentScreen = 'splash'; // Possible values: 'splash', 'game'

    splashMusic.play();

    playButton.addEventListener('click', () => {
        splashScreen.style.display = 'none';
        canvas.style.display = 'block';
        scoreDisplay.style.display = 'block';
        leftButton.style.display = 'flex';
        rightButton.style.display = 'flex';
        jumpButton.style.display = 'flex';
        splashMusic.pause();
        currentScreen = 'game';

        if (isMusicPlaying) {
            gameMusic.play();
        }

        startGame();
    });

    musicToggleButton.addEventListener('click', () => {
        if (currentScreen === 'splash') {
            if (isMusicPlaying) {
                splashMusic.pause();
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
            } else {
                splashMusic.play();
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            }
        } else if (currentScreen === 'game') {
            if (isMusicPlaying) {
                gameMusic.pause();
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
            } else {
                gameMusic.play();
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            }
        }
        isMusicPlaying = !isMusicPlaying;
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
            scoreDisplay.textContent = score.toString().padStart(3, '0');

            requestAnimationFrame(gameLoop);
        };

        // Touch controls for canvas
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

        // Button controls
        leftButton.addEventListener('touchstart', () => {
            player.moveLeft();
        });

        leftButton.addEventListener('touchend', () => {
            player.stop();
        });

        rightButton.addEventListener('touchstart', () => {
            player.moveRight();
        });

        rightButton.addEventListener('touchend', () => {
            player.stop();
        });

        jumpButton.addEventListener('touchstart', () => {
            player.jump();
        });

        // Listen for item collection
        window.addEventListener('itemCollected', () => {
            score += 1;
            const collectSound = new Audio(collectSoundSrc);
            collectSound.play();
        });

        gameLoop();
    };
};
