export class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    velocityY: number = 0;
    velocityX: number = 0;
    speed: number = 5;
    gravity: number = 0.5;
    jumpStrength: number;
    isOnGround: boolean = false;
    image: HTMLImageElement;
    aspectRatio: number;
    isMovingLeft: boolean = false;
    jumpSound: HTMLAudioElement;
    isFalling: boolean = false;
    gameOver: boolean = false;
    maxX: number; // New property to handle the maximum X position dynamically
    gameOverSound: HTMLAudioElement; // Game over sound
    gameMusic: HTMLAudioElement; // Game over sound

    constructor(gameMusic: HTMLAudioElement) {
        this.gameMusic = gameMusic; // Initialize game music
        this.image = new Image();
        this.image.src = 'iii.png';
        this.x = 0.05 * window.innerWidth; // Spawn 5% from the left
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.aspectRatio = 0;
        this.image.onload = () => {
            this.aspectRatio = this.image.width / this.image.height;
            this.height = 0.25 * window.innerHeight; // 25% of the window height
            this.width = this.height * this.aspectRatio; // Maintain the aspect ratio
        };

        this.jumpStrength = 16; // Jump height is twice the character height

        this.jumpSound = document.getElementById('jumpSound') as HTMLAudioElement;
        this.gameOverSound = new Audio('gameover.mp3'); // Initialize game over sound

        this.maxX = 0.4 * window.innerWidth; // Initially, the player can move up to 40% of the screen width

        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    onKeyDown(e: KeyboardEvent) {
        if (this.isFalling || this.gameOver) return; // Disable controls if falling or game over

        if (e.code === 'ArrowLeft') {
            this.moveLeft();
        } else if (e.code === 'ArrowRight') {
            this.moveRight();
        } else if (e.code === 'Space') {
            this.jump();
        }
    }

    onKeyUp(e: KeyboardEvent) {
        if (this.isFalling || this.gameOver) return; // Disable controls if falling or game over

        if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
            this.stop();
        }
    }

    moveLeft() {
        if (this.isFalling || this.gameOver) return; // Disable controls if falling or game over
        this.velocityX = -this.speed;
        this.isMovingLeft = true;
    }

    moveRight() {
        if (this.isFalling || this.gameOver) return; // Disable controls if falling or game over
        this.velocityX = this.speed;
        this.isMovingLeft = false;
    }

    stop() {
        if (this.isFalling || this.gameOver) return; // Disable controls if falling or game over
        this.velocityX = 0;
    }

    jump() {
        if (this.isFalling || this.gameOver) return; // Disable controls if falling or game over
        if (this.isOnGround) {
            this.velocityY = -this.jumpStrength;
            this.isOnGround = false;
            this.jumpSound.play();
        }
    }

    fall() {
        this.isFalling = true;
        this.velocityX = 0;
        this.velocityY = 10; // Faster fall speed
        this.isOnGround = false;
    }

    update(levelWidth: number) {
        if (this.isFalling) {
            this.y += this.velocityY;
            this.velocityY += this.gravity;

            if (this.y > window.innerHeight) {
                this.showGameOver();
            }
            return;
        }

        this.x += this.velocityX;
        this.y += this.velocityY;

        // Ensure player does not go beyond the left edge
        if (this.x < 0) {
            this.x = 0;
        }

        const floorHeight = window.innerHeight - 40; // Adjusted floor height

        if (this.y + this.height < floorHeight) {
            this.velocityY += this.gravity;
            this.isOnGround = false;
        } else {
            this.y = floorHeight - this.height;
            this.velocityY = 0;
            this.isOnGround = true;
        }

        // Ensure player does not go beyond the right edge of the level
        if (this.x > levelWidth - this.width) {
            this.x = levelWidth - this.width;
        }

        // Ensure player does not go beyond maxX
        if (this.x > this.maxX) {
            this.x = this.maxX;
        }
    }

    showGameOver() {
        this.gameMusic.pause(); // Pause game music
        if (this.gameOver) return; // Check if the game over screen is already shown

        this.gameOver = true;
        this.gameOverSound.play(); // Play game over sound

        const gameOverText = document.createElement('div');
        gameOverText.innerText = 'GAME OVER';
        gameOverText.style.position = 'absolute';
        gameOverText.style.top = '50%';
        gameOverText.style.left = '50%';
        gameOverText.style.transform = 'translate(-50%, -50%)';
        gameOverText.style.fontSize = '42px';
        gameOverText.style.color = 'black';
        gameOverText.style.fontFamily = '"Press Start 2P", cursive';
        gameOverText.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        gameOverText.style.border = '2px solid black';
        gameOverText.style.padding = '20px';
        gameOverText.style.textAlign = 'center';

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
            window.location.reload();
        };

        gameOverText.appendChild(restartButton);
        document.body.appendChild(gameOverText);

        window.dispatchEvent(new Event('gameOver'));
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.isMovingLeft) {
            context.save();
            context.scale(-1, 1);
            context.drawImage(this.image, -this.x - this.width, this.y, this.width, this.height);
            context.restore();
        } else {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}
