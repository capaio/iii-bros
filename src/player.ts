import { Obstacle } from './obstacle';

export class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    velocityY: number = 0;
    velocityX: number = 0;
    speed: number = 5;
    gravity: number = 0.5;
    jumpStrength: number = 10;
    isOnGround: boolean = false;

    constructor(x: number, y: number) {
        this.width = 0.1 * window.innerHeight; // Adjusted width for better proportions
        this.height = 0.25 * window.innerHeight; // 25% of the window height
        this.x = x;
        this.y = y;

        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    onKeyDown(e: KeyboardEvent) {
        if (e.code === 'ArrowLeft') {
            this.moveLeft();
        } else if (e.code === 'ArrowRight') {
            this.moveRight();
        } else if (e.code === 'Space') {
            this.jump();
        }
    }

    onKeyUp(e: KeyboardEvent) {
        if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
            this.stop();
        }
    }

    moveLeft() {
        this.velocityX = -this.speed;
    }

    moveRight() {
        this.velocityX = this.speed;
    }

    stop() {
        this.velocityX = 0;
    }

    jump() {
        if (this.isOnGround) {
            this.velocityY = -this.jumpStrength;
            this.isOnGround = false;
        }
    }

    update(obstacles: Obstacle[]) {
        this.x += this.velocityX;
        this.y += this.velocityY;

        this.checkCollisions(obstacles);

        if (this.y + this.height < window.innerHeight) {
            this.velocityY += this.gravity;
            this.isOnGround = false;
        } else {
            this.y = window.innerHeight - this.height;
            this.velocityY = 0;
            this.isOnGround = true;
        }
    }

    checkCollisions(obstacles: Obstacle[]) {
        obstacles.forEach(obstacle => {
            if (this.x < obstacle.x + obstacle.width &&
                this.x + this.width > obstacle.x &&
                this.y < obstacle.y + obstacle.height &&
                this.y + this.height > obstacle.y) {
                // Collision detected
                if (this.velocityY > 0 && this.y + this.height - this.velocityY <= obstacle.y) {
                    // Landed on top of obstacle
                    this.y = obstacle.y - this.height;
                    this.velocityY = 0;
                    this.isOnGround = true;
                } else {
                    // Horizontal collision
                    if (this.velocityX > 0) {
                        this.x = obstacle.x - this.width;
                    } else if (this.velocityX < 0) {
                        this.x = obstacle.x + obstacle.width;
                    }
                    this.velocityX = 0;
                }
            }
        });
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
