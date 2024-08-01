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
    let screenOffset = 0;
    let gameOver = false;

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
        let isMovingLeft = false;
        let isMovingRight = false;

        const gameLoop = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            if (!gameOver) {
                const maxScreenOffset = level.endMarkerX - canvas.width;

                // Adjust offset based on movement direction
                if (isMovingRight && screenOffset < maxScreenOffset) {
                    screenOffset += player.speed;
                }

                // Ensure the screen offset does not go negative or beyond the end marker
                if (screenOffset < 0) {
                    screenOffset = 0;
                } else if (screenOffset > maxScreenOffset) {
                    screenOffset = maxScreenOffset;
                }

                // Adjust player's maxX based on the screenOffset
                if (screenOffset >= maxScreenOffset) {
                    player.maxX = 0.7 * canvas.width;
                } else {
                    player.maxX = 0.4 * canvas.width;
                }

                // Update the player's position
                player.update(level.levelWidth);

                // Ensure the player does not go back behind position 0
                if (player.x < 0) {
                    player.x = 0;
                }

                level.update(player, screenOffset);
            }

            // Pass screenOffset to level.draw
            level.draw(context, screenOffset);
            player.draw(context);

            // Update and draw score
            scoreDisplay.textContent = score.toString().padStart(3, '0');

            requestAnimationFrame(gameLoop);
        };

        // Touch controls for canvas
        canvas.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            if (touch.clientX < canvas.width / 2) {
                isMovingLeft = true;
                player.moveLeft();
            } else {
                isMovingRight = true;
                player.moveRight();
            }
        });

        canvas.addEventListener('touchend', () => {
            isMovingLeft = false;
            isMovingRight = false;
            player.stop();
        });

        // Button controls
        leftButton.addEventListener('touchstart', () => {
            isMovingLeft = true;
            player.moveLeft();
        });

        leftButton.addEventListener('touchend', () => {
            isMovingLeft = false;
            player.stop();
        });

        rightButton.addEventListener('touchstart', () => {
            isMovingRight = true;
            player.moveRight();
        });

        rightButton.addEventListener('touchend', () => {
            isMovingRight = false;
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

        // Listen for game over event
        window.addEventListener('gameOver', () => {
            gameOver = true;
        });

        gameLoop();
    };
};
