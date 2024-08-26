import {AbstractItem} from "../abstract.item";
import {Item} from "../interface";
import {Player} from "../../player";
import {config} from "../../config";

export class Cloud extends AbstractItem  implements Item {

    constructor(x: number, y: number, width?: number, height?: number) {

        const image = new Image();
        image.src = config.items.cloud.image;

        super(x, y, config.items.cloud.width* window.innerWidth, config.items.cloud.height*window.innerHeight, image);
    }

    update() {
        this.x -= 0.2;
    }

}
