import {AbstractItem} from "../abstract.item";
import {Item} from "../interface";
import {config} from "../../config";

export class Collectible extends AbstractItem  implements Item {

    constructor(x: number, y: number, width?: number, height?: number) {

        const image = new Image();
        image.src = config.items.collectible.image;

        super(x, y, width?? config.items.collectible.width * window.innerWidth, height ?? config.items.collectible.height * window.innerHeight, image);

    }

}
