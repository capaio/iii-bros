import {AbstractItem} from "../abstract.item";
import {Item} from "../interface";

export class Cloud extends AbstractItem  implements Item {

    constructor(x: number, y: number) {

        const image = new Image();
        image.src = 'cloud.png';

        super(x, y, 100, 50, image);
    }

    update(screenOffset: number) {
        this.x -= 0.2;
    }

}
