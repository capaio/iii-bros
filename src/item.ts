export class Item {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;

    constructor(x: number, y: number, imagePath: string = 'beer.png') {
        this.width = 0.05 * window.innerWidth; // Scale width based on window size
        this.height = 0.05 * window.innerWidth; // Scale height based on window size
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = imagePath;
    }

    update() {
        // Update item state if necessary
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
