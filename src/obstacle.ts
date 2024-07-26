export class Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(context: CanvasRenderingContext2D, offsetX: number) {
        context.fillStyle = 'red';
        context.fillRect(this.x - offsetX, this.y, this.width, this.height);
    }
}
