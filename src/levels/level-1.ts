import {BackgroundItem} from "../background";
import {clouds} from "./level-1/clouds";
import {bushes} from "./level-1/bushes";
import {beers} from "./level-1/beers";
import {Hole, Platform, PlatformDesigner} from "../designer/platform.designer";

export interface GameLevel {

    getClouds(levelWidth: number, floorHeight: number): BackgroundItem[];
    getBushes(levelWidth: number, floorHeight: number, width: number, height: number): BackgroundItem[];
    getBeers(levelWidth: number, floorHeight: number, width: number, height: number): BackgroundItem[];
    createObstacles(levelWidth: number, floorHeight: number): void;
}


export class Level1 implements GameLevel {

    width: number =  10 * window.innerWidth;


    getClouds(levelWidth: number, floorHeight: number): BackgroundItem[] {
       return clouds.map(cloud => {
            return {
                x: cloud.x * levelWidth,
                y: cloud.y * (floorHeight / 2),
                width: 100,
                height: 50
            }
        })
    }

    getBushes(levelWidth: number, floorHeight: number, width: number, height: number): BackgroundItem[] {

        const newWidth = width * 0.1;
        const newHeight = height * 0.1;

        return bushes.map(bush => {
            return {
                x: bush.x * levelWidth,
                y: bush.y * (floorHeight - newHeight),
                width: bush.width*newWidth ,
                height: bush.height*newHeight
            }
        })
    }

    getBeers(levelWidth: number, floorHeight: number, width: number, height: number): BackgroundItem[] {

        const newWidth = width * 0.05; // 50% smaller
        const newHeight = height * 0.05;

        return beers.map(beer => {
            return {
                x: beer.x * (levelWidth - newWidth),
                y: beer.y * (floorHeight / 2),
                width: newWidth,
                height: newHeight
            }
        });
    }

    createObstacles(levelWidth: number, floorHeight: number): [Platform[], Hole[]]{

        const platformDesigner = new PlatformDesigner(levelWidth, floorHeight);
        const moduleWidth = platformDesigner.moduleWidth;

        let platforms = []
        let holes = []

        platforms.push(platformDesigner.upwardStaircase(4, 0.03 * levelWidth));
        let start = 0.03 * levelWidth + 5 * moduleWidth;
        holes.push(platformDesigner.hole(start, 100))
        platforms.push(platformDesigner.downwardStaircase(4, start + 100));

        holes.push(platformDesigner.hole(0.15 * levelWidth - 100, (7*moduleWidth) + 100))
        platforms.push(platformDesigner.platform(6, 0.15 * levelWidth, floorHeight - (0.4 * window.innerHeight)));

        platforms.push(platformDesigner.platform(4, 0.2 * levelWidth, floorHeight - (0.2 * window.innerHeight)));
        platforms.push(platformDesigner.platform(4, 0.22 * levelWidth, floorHeight - (0.3 * window.innerHeight)));
        platforms.push(platformDesigner.platform(4, 0.24 * levelWidth, floorHeight - (0.4 * window.innerHeight)));

        holes.push(platformDesigner.hole(0.26 * levelWidth - 50, (7*moduleWidth) ))

        platforms.push(platformDesigner.upwardStaircase(4, 0.29 * levelWidth));
        start = 0.29 * levelWidth + 5 * moduleWidth;
        holes.push(platformDesigner.hole(start, 100))


        holes.push(platformDesigner.hole(0.42 * levelWidth, 800))
        platforms.push(platformDesigner.platform(2, 0.44 * levelWidth, floorHeight - (0.2 * window.innerHeight)));
        platforms.push(platformDesigner.platform(2, 0.46 * levelWidth, floorHeight - (0.4 * window.innerHeight)));
        platforms.push(platformDesigner.platform(2, 0.48 * levelWidth, floorHeight - (0.4 * window.innerHeight)));
        platforms.push(platformDesigner.platform(2, 0.50 * levelWidth, floorHeight - (0.4 * window.innerHeight)));


        platforms.push(platformDesigner.upwardStaircase(6, 0.52 * levelWidth));
        start = 0.52 * levelWidth + 6 * moduleWidth;
        platforms.push(platformDesigner.platform(6, start + 200, floorHeight - (0.6 * window.innerHeight)));
        platforms.push(platformDesigner.platform(6, 0.62 * levelWidth, floorHeight - (0.6 * window.innerHeight)));
        platforms.push(platformDesigner.platform(6, (0.65 * levelWidth) + 200, floorHeight - (0.6 * window.innerHeight)));


        platforms.push(platformDesigner.upwardStaircase(4, 0.71 * levelWidth));
        start = 0.71 * levelWidth + 5 * moduleWidth;
        holes.push(platformDesigner.hole(start, 150))
        platforms.push(platformDesigner.downwardStaircase(4, start + 150));


        holes.push(platformDesigner.hole(0.79 * levelWidth, 900 ))
        platforms.push(platformDesigner.platform(1, (0.79 * levelWidth) + (2*moduleWidth), floorHeight - (0.1 * window.innerHeight)));
        platforms.push(platformDesigner.platform(1, (0.79 * levelWidth) + (5*moduleWidth), floorHeight - (0.1 * window.innerHeight)));
        platforms.push(platformDesigner.platform(1, (0.79 * levelWidth) + (8*moduleWidth), floorHeight - (0.1 * window.innerHeight)));
        platforms.push(platformDesigner.platform(1, (0.79 * levelWidth) + (11*moduleWidth), floorHeight - (0.1 * window.innerHeight)));
        platforms.push(platformDesigner.platform(1, (0.79 * levelWidth) + (14*moduleWidth), floorHeight - (0.1 * window.innerHeight)));
        platforms.push(platformDesigner.platform(1, (0.79 * levelWidth) + (17*moduleWidth), floorHeight - (0.1 * window.innerHeight)));


        platforms.push(platformDesigner.upwardStaircase(6, 0.90 * levelWidth));

        return [platforms.flat(), holes]

    }

}
