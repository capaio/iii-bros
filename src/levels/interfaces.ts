import {Item, NPC as NPCo} from "../items/interface";


export interface GameLevel {
    width: number;
    castleImage: HTMLImageElement;
    castleWidth: number;
    castleHeight: number;
    skyColor: string;
    holesColor: string;
    getClouds(levelWidth: number, floorHeight: number): Item[];
    getBushes(levelWidth: number, floorHeight: number): Item[];
    getBeers(levelWidth: number, floorHeight: number): Item[];
    createObstacles(levelWidth: number, floorHeight: number): [Platform[], Hole[]];
    createNPCs(levelWidth: number, floorHeight: number): NPCo[];

}

export interface NPCData {
    x: number;
    y: number;
    speed: number;
    endX: number;
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
