import {clouds} from "./clouds";
import {bushes} from "./bushes";
import {beers} from "./beers";
import {npcs} from "./npcs";
import {LevelAbstract} from "../level.abstract";
import {GameLevel} from "../interfaces";
import {config} from "../../config";


export class Level extends LevelAbstract implements GameLevel {

    castleImage: HTMLImageElement = new Image();
    castleWidth: number = 0.35 * window.innerWidth;
    castleHeight: number = 0.5 * window.innerHeight;
    skyColor: string = config.level1.background;
    holesColor: string = config.level1.holesColor;

    constructor(floorHeight: number) {
        const levelWidth: number =  10 * window.innerWidth;
        super(floorHeight, levelWidth, clouds, bushes, beers, npcs);
        this.castleImage.src = config.level1.castleImage;

    }

}
