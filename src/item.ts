export class Item {
    x: number;
    y: number;
    width: number = 20;
    height: number = 20;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    update() {
        // Update item state if necessary
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
