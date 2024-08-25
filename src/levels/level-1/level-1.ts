import {clouds} from "./clouds";
import {bushes} from "./bushes";
import {beers} from "./beers";
import {npcs} from "./npcs";
import {LevelAbstract} from "../level.abstract";
import {GameLevel} from "../interfaces";


export class Level1 extends LevelAbstract implements GameLevel {

    castleImage: HTMLImageElement = new Image();
    castleWidth: number = 350; // Adjust the width of the castle as needed
    castleHeight: number = 300; // Adjust the height of the castle as needed

    constructor(floorHeight: number) {
        const levelWidth: number =  10 * window.innerWidth;
        super(floorHeight, levelWidth, clouds, bushes, beers, npcs);
        this.castleImage.src = 'castle.webp';
        document.body.style.backgroundColor = '#000006';

    }

}
