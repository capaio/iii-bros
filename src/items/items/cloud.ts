import {AbstractItem} from "../abstract.item";
import {Item} from "../interface";

export class Cloud extends AbstractItem  implements Item {

    constructor(x: number, y: number, width?: number, height?: number) {

        const image = new Image();
        image.src = 'cloud.png';

        super(x, y, 0.12* window.innerWidth, 0.12*window.innerHeight, image);
    }

    update(screenOffset: number) {
        this.x -= 0.2;
    }

}
