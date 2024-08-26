import {AbstractItem} from "../abstract.item";
import {Item, NPC} from "../interface";
import {Player} from "../../player";
import {config} from "../../config";

export class Turtle extends AbstractItem  implements NPC {

    speed: number;
    endX: number;
    startX: number;
    movingRight: boolean;

    constructor(x: number, y: number, floorHeight: number, speed: number, startX: number, endX: number,movingRight: boolean, width?: number, height?: number ) {

        const image = new Image();
        image.src = config.npcs.turtle.image;

        const widthScaled = window.innerWidth * config.npcs.turtle.width;
        const heightScaled= window.innerHeight * config.npcs.turtle.height;

        super(
            x,
            (floorHeight - (y * window.innerHeight)) - heightScaled,
            widthScaled,
            heightScaled,
            image)
        ;

        this.speed = speed * window.innerWidth;
        this.endX = endX;
        this.startX = startX;
        this.movingRight = movingRight;


    }


}
