import {AbstractItem} from "../abstract.item";
import {Item} from "../interface";

export class Bush extends AbstractItem  implements Item {

    constructor(x: number, y: number, width?: number, height?: number) {

        const image = new Image();
        image.src = 'bush.png';



        super(x, y, image.width * 0.1, image.height * 0.1, image);
    }


}
