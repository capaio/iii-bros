import {AbstractItem} from "../abstract.item";
import {Item} from "../interface";
import {config} from "../../config";

export class Bush extends AbstractItem  implements Item {

    constructor(x: number, y: number, floorHeight: number, width?: number, height?: number) {

        const image = new Image();
        image.src = config.items.bush.image;

        const defaultWidth = config.items.bush.width * window.innerWidth;
        const defaultHeight = config.items.bush.height * window.innerHeight;

        const newWidth = width ? width * defaultWidth : defaultWidth
        const newHeight = height ? height * defaultHeight : defaultHeight

        super(
            x,
            (floorHeight - y * newHeight),
            newWidth,
            newHeight,
            image)
        ;
    }


}
