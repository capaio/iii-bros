import {PlatformDesigner} from "../designer/platform.designer";
import {Hole,  NPCData, ObjectPosition, ObjectPositionAndDimension, Platform} from "./interfaces";
import {Collectible} from "../items/items/collectible";
import {Bush} from "../items/items/bush";
import {Item, NPC} from "../items/interface";
import {Cloud} from "../items/items/cloud";
import {Turtle} from "../items/items/turtle";


export abstract class LevelAbstract {

    width: number =  10 * window.innerWidth;
    npcs: NPCData[] = [];
    clouds: ObjectPosition[] = [];
    bushes: ObjectPositionAndDimension[] = [];
    beers: ObjectPosition[] = [];
    floorHeight: number;
    levelWidth: number;

    protected constructor(floorHeight: number, levelWidth: number, clouds: ObjectPosition[], bushes: ObjectPositionAndDimension[], beers: ObjectPosition[], npcs: NPCData[]) {
        this.clouds = clouds;
        this.bushes = bushes;
        this.beers = beers;
        this.npcs = npcs;
        this.floorHeight = floorHeight;
        this.levelWidth = levelWidth
    }

    createNPCs(levelWidth: number, floorHeight: number): NPC[] {

        // const image = new Image();
        // image.src = 'enemy.png';
        //
        // const width = image.width * 0.1;
        // const height = image.height * 0.1;

        return this.npcs.map(npc => {
            return new Turtle(npc.x* levelWidth, npc.y, floorHeight, npc.speed, npc.x * levelWidth, npc.endX * levelWidth, true)
        });

        // return this.npcs.map(npc => {
        //     return {
        //         x: npc.x* levelWidth,
        //         y: (floorHeight - (npc.y * window.innerHeight)) - height,
        //         width: width,
        //         height: height,
        //         image: image,
        //         speed: 1.5,
        //         startX: npc.x * levelWidth,
        //         endX: npc.endX * levelWidth,
        //         movingRight: true
        //     };
        // })
    }

    getClouds(levelWidth: number, floorHeight: number): Item[] {
        // const image = new Image();
        // image.src = 'cloud.png';

        return this.clouds.map(cloud => {
            return new Cloud(cloud.x * levelWidth, cloud.y * (floorHeight / 2))
        })
    }

    getBushes(levelWidth: number, floorHeight: number): Item[] {
        return this.bushes.map(bush => {
            return new Bush(bush.x * levelWidth, bush.y, floorHeight, bush.width, bush.height );
        })
    }

    getBeers(levelWidth: number, floorHeight: number): Item[] {
        return this.beers.map(beer => {
            return new Collectible(beer.x * (levelWidth), beer.y * (floorHeight / 2));
        });
    }

    createObstacles(levelWidth: number, floorHeight: number): [Platform[], Hole[]]{

        const platformDesigner = new PlatformDesigner(levelWidth, floorHeight);
        const moduleWidth = platformDesigner.moduleWidth;

        let platforms = []
        let holes = []

        platforms.push(platformDesigner.upwardStaircase(4, 0.03 * levelWidth));
        let start = 0.03 * levelWidth + 5 * moduleWidth;
        holes.push(platformDesigner.hole(start, 0.015 * levelWidth))
        platforms.push(platformDesigner.downwardStaircase(4, start + 0.015 * levelWidth));

        holes.push(platformDesigner.hole(0.15 * levelWidth - 100, (7*moduleWidth) + 0.01 * levelWidth))
        platforms.push(platformDesigner.platform(6, 0.15 * levelWidth, floorHeight - (0.4 * window.innerHeight)));

        platforms.push(platformDesigner.platform(4, 0.2 * levelWidth, floorHeight - (0.2 * window.innerHeight)));
        platforms.push(platformDesigner.platform(4, 0.22 * levelWidth, floorHeight - (0.3 * window.innerHeight)));
        platforms.push(platformDesigner.platform(4, 0.24 * levelWidth, floorHeight - (0.4 * window.innerHeight)));

        holes.push(platformDesigner.hole(0.26 * levelWidth - 50, (6*moduleWidth) ))

        platforms.push(platformDesigner.upwardStaircase(4, 0.29 * levelWidth));
        start = 0.29 * levelWidth + 5 * moduleWidth;
        holes.push(platformDesigner.hole(start, 0.015 * levelWidth))


        holes.push(platformDesigner.hole(0.42 * levelWidth, 0.095 * levelWidth))
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
        holes.push(platformDesigner.hole(start, 0.015 * levelWidth))
        platforms.push(platformDesigner.downwardStaircase(4, start + 0.015 * levelWidth));


        holes.push(platformDesigner.hole(0.79 * levelWidth, (20*moduleWidth) ))
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
