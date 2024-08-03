import { Player } from './player';
import { Level } from './level';
import { Firework } from './firework';

window.onload = () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const splashScreen = document.getElementById('splashScreen') as HTMLDivElement;
    const playButton = document.getElementById('playButton') as HTMLButtonElement;
    const musicToggleButton = document.getElementById('musicToggleButton') as HTMLButtonElement;
    const musicIcon = document.getElementById('musicIcon') as HTMLElement;
    const scoreDisplay = document.getElementById('score') as HTMLDivElement;
    const splashMusic = document.getElementById('splashMusic') as HTMLAudioElement;
    const gameMusic = document.getElementById('gameMusic') as HTMLAudioElement;
    const victorySound = new Audio('victory.mp3');
    const collectSoundSrc = 'coin.wav';
    const fireworkSoundSrc = 'firework.wav'; // Firework sound source
    const leftButton = document.getElementById('leftButton') as HTMLButtonElement;
    const rightButton = document.getElementById('rightButton') as HTMLButtonElement;
    const jumpButton = document.getElementById('jumpButton') as HTMLButtonElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const timerDisplay = document.createElement('div');
    document.body.appendChild(timerDisplay);

    timerDisplay.style.position = 'absolute';
    timerDisplay.style.top = '20px';
    timerDisplay.style.left = '50%';
    timerDisplay.style.transform = 'translateX(-50%)';
    timerDisplay.style.fontSize = '24px';
    timerDisplay.style.fontFamily = '"Press Start 2P", cursive';
    timerDisplay.style.color = 'black';
    timerDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    timerDisplay.style.border = '2px solid black';
    timerDisplay.style.padding = '10px';

    let isMusicPlaying = false;
    let currentScreen = 'splash'; // Possible values: 'splash', 'game'
    let screenOffset = 0;
    let gameOver = false;
    let victory = false;
    let timeLeft = 50; // 10 seconds timer

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

            if (!gameOver && !victory) {
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

                // Check for victory condition
                if (screenOffset >= maxScreenOffset && player.x >= player.maxX) {
                    victory = true;
                    showVictoryScreen();
                }
            }

            // Pass screenOffset to level.draw
            level.draw(context, screenOffset);
            player.draw(context);

            // Draw fireworks if victory
            if (victory) {
                for (const firework of fireworks) {
                    firework.update();
                    firework.draw(context);
                }

                // Remove dead fireworks
                fireworks = fireworks.filter(firework => firework.isAlive());
            }

            // Update and draw score
            scoreDisplay.textContent = score.toString().padStart(3, '0');

            requestAnimationFrame(gameLoop);
        };

        const updateTimer = () => {
            if (!gameOver && !victory) {
                timeLeft -= 1;
                timerDisplay.textContent = `Time: ${timeLeft}`;
                if (timeLeft <= 0) {
                    gameOver = true;
                    player.showGameOver();
                } else {
                    setTimeout(updateTimer, 1000);
                }
            }
        };

        let fireworks: Firework[] = [];
        const showVictoryScreen = () => {
            const victoryText = document.createElement('div');
            victoryText.innerText = 'VICTORY';
            victoryText.style.position = 'absolute';
            victoryText.style.top = '50%';
            victoryText.style.left = '50%';
            victoryText.style.transform = 'translate(-50%, -50%)';
            victoryText.style.fontSize = '48px';
            victoryText.style.color = 'black';
            victoryText.style.fontFamily = '"Press Start 2P", cursive';
            victoryText.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            victoryText.style.border = '2px solid black';
            victoryText.style.padding = '20px';
            victoryText.style.textAlign = 'center';

            const codeText = document.createElement('div');
            codeText.innerText = 'Your code is 268';
            codeText.style.fontSize = '24px';
            codeText.style.marginTop = '10px';
            victoryText.appendChild(codeText);

            document.body.appendChild(victoryText);

            // Stop all other music and play victory sound
            splashMusic.pause();
            gameMusic.pause();
            victorySound.play();

            // Create initial fireworks
            createFirework();

            window.dispatchEvent(new Event('victory'));
        };

        let countFireworksSound = 0

        const createFirework = () => {
            countFireworksSound += 1
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            for (let i = 0; i < 100; i++) {
                fireworks.push(new Firework(x, y));
            }

            // Play firework sound
            if(countFireworksSound < 10) {
                const fireworkSound = new Audio(fireworkSoundSrc);
                fireworkSound.play();
            }

            // Schedule the next firework
            const nextFireworkTime = Math.random() * 400 + 100; // Random time between 0.1 and 0.5 seconds
            setTimeout(createFirework, nextFireworkTime);
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

        // Listen for victory event
        window.addEventListener('victory', () => {
            victory = true;
        });

        gameLoop();
        updateTimer();
    };
};
