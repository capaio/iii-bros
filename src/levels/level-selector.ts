import {GameLevel} from "./interfaces";
import {Level as Level1} from "./level-1/level";
import {Level as Level2} from "./level-2/level";

export class LevelSelector {

    levels: GameLevel[];


    constructor(floorHeight: number) {
        this.levels = [
            new Level1(floorHeight),
            new Level2(floorHeight)
        ]
    }

    getLevel(levelNumber: number): GameLevel {
        return this.levels[levelNumber];
    }

}
