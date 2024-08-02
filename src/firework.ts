export class Firework {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.alpha = 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.01;
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.globalAlpha = this.alpha;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, 3, 0, Math.PI * 2);
        context.fill();
        context.restore();
    }

    isAlive() {
        return this.alpha > 0;
    }
}
