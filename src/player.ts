export class Player {
    x: number;
    y: number;
    width: number = 30;
    height: number = 50;
    velocityY: number = 0;
    velocityX: number = 0;
    speed: number = 5;
    gravity: number = 0.5;
    jumpStrength: number = 10;
    isOnGround: boolean = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    onKeyDown(e: KeyboardEvent) {
        if (e.code === 'ArrowLeft') {
            this.velocityX = -this.speed;
        } else if (e.code === 'ArrowRight') {
            this.velocityX = this.speed;
        } else if (e.code === 'Space') {
            this.jump();
        }
    }

    onKeyUp(e: KeyboardEvent) {
        if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
            this.velocityX = 0;
        }
    }

    jump() {
        if (this.isOnGround) {
            this.velocityY = -this.jumpStrength;
            this.isOnGround = false;
        }
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        if (this.y + this.height < 600) {
            this.velocityY += this.gravity;
            this.isOnGround = false;
        } else {
            this.y = 600 - this.height;
            this.velocityY = 0;
            this.isOnGround = true;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
