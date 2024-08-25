import {AbstractItem} from "../abstract.item";
import {Item} from "../interface";

export class Collectible extends AbstractItem  implements Item {

    image: HTMLImageElement;
    x: number;
    y: number;
    width: number;
    height: number;


    constructor(x: number, y: number, width?: number, height?: number) {

        const image = new Image();
        image.src = 'beer.png';

        super(x, y, 0.04 * window.innerWidth, 0.04 * window.innerHeight, image);
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = 0.04 * window.innerWidth;
        this.height = 0.04 * window.innerHeight;
    }

}
