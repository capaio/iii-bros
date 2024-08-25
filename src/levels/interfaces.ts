

export interface GameLevel {
    width: number;
    castleImage: HTMLImageElement;
    castleWidth: number;
    castleHeight: number;
    getClouds(levelWidth: number, floorHeight: number): BackgroundItem[];
    getBushes(levelWidth: number, floorHeight: number): BackgroundItem[];
    getBeers(levelWidth: number, floorHeight: number): BackgroundItem[];
    createObstacles(levelWidth: number, floorHeight: number): [Platform[], Hole[]];
    createNPCs(levelWidth: number, floorHeight: number): NPC[];
}

export interface NPCData {
    x: number;
    y: number;
    speed: number;
    endX: number;
}

export interface NPC extends NPCData {
    width: number;
    height: number;
    image: HTMLImageElement;
    startX: number;
    movingRight: boolean;
}

export interface BackgroundItem {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
}

export interface ObjectPosition {
    x: number;
    y: number;
}

export interface ObjectPositionAndDimension extends ObjectPosition{
    width: number;
    height: number;
}

export interface Platform {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
}

export interface Hole {
    holeX: number;
    holeWidth: number;
}
