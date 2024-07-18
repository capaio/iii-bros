export class Obstacle {
    x: number;
    y: number;
    width: number = 50;
    height: number = 50;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    update() {
        // Update obstacle state if necessary
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
