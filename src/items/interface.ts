import {Player} from "../player";

export interface Item {
    image: HTMLImageElement;
    x: number;
    y: number;
    width: number;
    height: number;
    draw(context: CanvasRenderingContext2D): void;
    update(): void;
}

export interface NPC extends Item {
    speed: number;
    endX: number;
    startX: number;
    movingRight: boolean;
}
