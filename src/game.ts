import { Player } from './player';
import { Level } from './level';
import { Firework } from './firework';
import {config} from "./config";

window.onload = () => {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const splashScreen = document.getElementById('splashScreen') as HTMLDivElement;
    splashScreen.style.backgroundImage = `url(${config.splashScreen})`;
    const playButton = document.getElementById('playButton') as HTMLButtonElement;
    const musicToggleButton = document.getElementById('musicToggleButton') as HTMLButtonElement;
    const musicIcon = document.getElementById('musicIcon') as HTMLElement;
    const scoreDisplay = document.getElementById('score') as HTMLDivElement;
    const splashMusic = document.getElementById('splashMusic') as HTMLAudioElement;
    const gameMusic = document.getElementById('gameMusic') as HTMLAudioElement;
    const victoryMusic = new Audio('victory.mp3');
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

    let isMusicPlaying = true;
    let currentScreen = 'splash'; // Possible values: 'splash', 'game'
    let screenOffset = 0;
    let gameOver = false;
    let victory = false;
    let timeLeft = config.time;

    splashMusic.play();

    playButton.addEventListener('click', () => {
        splashScreen.style.display = 'none';
        canvas.style.display = 'block';
        scoreDisplay.style.display = 'block';
        leftButton.style.display = 'flex';
        rightButton.style.display = 'flex';
        jumpButton.style.display = 'flex';
        musicStop(splashMusic);
        currentScreen = 'game';

        startGame();
    });

    musicToggleButton.addEventListener('click', () => {
        if (currentScreen === 'splash') {
            if (isMusicPlaying) {
                splashMusic.volume = 0;
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
            } else {
                splashMusic.volume = 1;
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            }
        } else if (currentScreen === 'game') {
            if (isMusicPlaying) {
                gameMusic.volume = 0;
                victoryMusic.volume = 0;
                musicIcon.classList.remove('fa-volume-up');
                musicIcon.classList.add('fa-volume-mute');
            } else {
                gameMusic.volume = 1;
                victoryMusic.volume = 1;
                musicIcon.classList.remove('fa-volume-mute');
                musicIcon.classList.add('fa-volume-up');
            }
        }
        isMusicPlaying = !isMusicPlaying;
    });

    const startGame = (currentLevel: number = 0) => {

        if (isMusicPlaying) {
            musicPlay(gameMusic);
        }

        let officialTimer: NodeJS.Timeout;

        screenOffset = 0;
        timeLeft = config.time;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const totalLevels: number = config.totalLevels

        const player = new Player(gameMusic);
        let level = new Level(currentLevel);
        let score = 0;
        let isMovingLeft = false;
        let isMovingRight = false;

        let levelCompleted = false

        const gameLoop = () => {

            if(levelCompleted) {
                showLevelCompletedScreen();
                timeLeft = config.time;
                setTimeout(() => {
                    musicStop(victoryMusic);
                    hideLevelCompletedScreen();
                    clearTimeout(officialTimer);
                    return startGame(currentLevel + 1)
                }, 3000);
            } else {

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

                    level.update(player);

                    // Check for victory condition
                    if (screenOffset >= maxScreenOffset && player.x >= player.maxX) {
                        if (currentLevel < totalLevels - 1) {
                            levelCompleted = true
                        } else {
                            victory = true;
                            showVictoryScreen();
                        }
                    }
                }

                // Pass screenOffset to level.draw
                level.draw(context);
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
            }
        };

        const updateTimer = () => {
            if (!gameOver && !victory && !levelCompleted) {
                timeLeft -= 1;
                timerDisplay.textContent = `Time: ${timeLeft}`;
                if (timeLeft <= 0) {
                    gameOver = true;
                    player.showGameOver();
                } else {
                    officialTimer = setTimeout(updateTimer, 1000);
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

            const restartButton = document.createElement('button');
            restartButton.innerText = 'RESTART';
            restartButton.style.marginTop = '20px';
            restartButton.style.padding = '10px 20px';
            restartButton.style.fontSize = '24px';
            restartButton.style.cursor = 'pointer';
            restartButton.style.backgroundColor = 'black';
            restartButton.style.color = 'white';
            restartButton.style.border = '2px solid white';
            restartButton.style.fontFamily = '"Press Start 2P", cursive';
            restartButton.onclick = () => {
                window.location.reload(); // Reload the page to restart the game
            };
            victoryText.appendChild(restartButton);

            document.body.appendChild(victoryText);

            // Stop all other music and play victory sound
            musicStop(splashMusic);
            musicStop(gameMusic);
            musicPlay(victoryMusic);

            // Create initial fireworks
            createFirework();

            window.dispatchEvent(new Event('victory'));
        };

        const hideLevelCompletedScreen = () => {
            const levelCompletedScreen = document.getElementById('levelcompleted');
            if (levelCompletedScreen) {
                levelCompletedScreen.remove();
            }
        }

        const showLevelCompletedScreen = () => {
            const victoryText = document.createElement('div');
            victoryText.id = 'levelcompleted'
            victoryText.innerText = 'LEVEL COMPLETED';
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
            codeText.innerText = 'But your journey is not over yet!';
            codeText.style.fontSize = '24px';
            codeText.style.marginTop = '10px';
            victoryText.appendChild(codeText);

            document.body.appendChild(victoryText);

            // Stop all other music and play victory sound
            musicStop(splashMusic);
            musicStop(gameMusic);
            musicPlay(victoryMusic);

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

        window.addEventListener('keydown', (e) => onKeyDown(e));
        window.addEventListener('keyup', (e) => onKeyUp(e));

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'ArrowLeft') {
                isMovingLeft = true;
                isMovingRight = false;
                player.moveLeft();
            } else if (e.code === 'ArrowRight') {
                isMovingLeft = false;
                isMovingRight = true;
                player.moveRight();
            } else if (e.code === 'Space') {
                player.jump();
            }
        }

        const onKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'ArrowLeft') {
                isMovingLeft = false;
                player.stop();
            } else if (e.code === 'ArrowRight') {
                isMovingRight = false;
                player.stop();
            }
        }

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

    const musicStop = (audio: HTMLAudioElement) => {
        audio.pause()
        audio.currentTime = 0
    }

    const musicPlay = (audio: HTMLAudioElement) => {
        if(isMusicPlaying) {
            audio.play()
        }
    }

    const musicPause = (audio: HTMLAudioElement) => {
        audio.pause()
    }
};
