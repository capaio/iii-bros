import {Hole, Platform} from "../levels/interfaces";


export class PlatformDesigner {

    moduleWidth: number;
    moduleHeight: number;
    floorHeight: number;
    levelWidth: number;
    image: HTMLImageElement = new Image();

    constructor(levelWidth: number, floorHeight: number) {
        this.moduleWidth = 0.05 * window.innerWidth; // Each module is 5% of screen width
        this.moduleHeight = 0.1 * window.innerHeight; // Module height is 10% of screen height
        this.floorHeight = floorHeight;
        this.levelWidth = levelWidth;
        this.image.src = 'brick.png';

    }

    platform(lenght: number, startPercentage: number, heightFromFloor: number): Platform[] {
        const buffer: Platform[] = []

        for (let i = 0; i < lenght; i++) {
            buffer.push({
                x: startPercentage + i * this.moduleWidth,
                y: heightFromFloor,
                width: this.moduleWidth,
                height: this.moduleHeight,
                image: this.image
            });
        }
        return buffer;
    }

    upwardStaircase(lenght: number, startPercentage: number): Platform[] {

        const buffer: Platform[] = []

        for (let i = 1; i <= lenght; i++) {
            for (let j = 0; j < i; j++) {
                buffer.push({
                    x: startPercentage + (i * this.moduleWidth), // Each module moves to the right
                    y: (this.floorHeight - this.moduleHeight) - (j * this.moduleHeight), // Each row starts higher as i increases
                    width: this.moduleWidth,
                    height: this.moduleHeight,
                    image: this.image
                });
            }
        }
        return buffer;
    }

    downwardStaircase(length: number, startPercentage: number): Platform[]  {

        const buffer: Platform[] = []

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - i; j++) {
                buffer.push({
                    x: startPercentage + (i * this.moduleWidth), // Each module moves to the right
                    y: (this.floorHeight - this.moduleHeight) - (j * this.moduleHeight), // Each row is lower as i increases
                    width: this.moduleWidth,
                    height: this.moduleHeight,
                    image: this.image
                });
            }
        }
        return buffer;
    }

    hole(x: number, width: number): Hole {
        return ({
            holeX: x,
            holeWidth: width
        });
    }

}
