import {AbstractItem} from "../abstract.item";
import {Item} from "../interface";

export class Collectible extends AbstractItem  implements Item {

    constructor(x: number, y: number, width?: number, height?: number) {

        const image = new Image();
        image.src = 'beer.png';

        super(x, y, width?? 0.04 * window.innerWidth, height ??0.08 * window.innerHeight, image);

    }

}
