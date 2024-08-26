import {AbstractItem} from "../abstract.item";
import {Item} from "../interface";

export class Bush extends AbstractItem  implements Item {

    constructor(x: number, y: number, floorHeight: number, width?: number, height?: number) {

        const image = new Image();
        image.src = 'bush.png';

        const defaultWidth = 0.10 * window.innerWidth;
        const defaultHeight = 0.20 * window.innerHeight;

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
