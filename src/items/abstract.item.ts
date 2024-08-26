import {Player} from "../player";

export class AbstractItem {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;

    constructor(x: number, y: number, width: number, height: number, image: HTMLImageElement) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width
        this.height = height
    }

    update() {

    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
