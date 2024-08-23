import { Player } from "./player";

export interface Platform {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Hole {
    holeX: number;
    holeWidth: number;
}

export class PlatformsManager {
    platforms: Platform[] = [];
    holes: Hole[] = [];

    moduleWidth: number;
    moduleHeight: number;
    floorHeight: number;
    levelWidth: number;
    brickImage: HTMLImageElement;

    constructor(levelWidth: number, floorHeight: number) {
        this.moduleWidth = 0.05 * window.innerWidth; // Each module is 5% of screen width
        this.moduleHeight = 0.1 * window.innerHeight; // Module height is 10% of screen height
        this.floorHeight = floorHeight;
        this.levelWidth = levelWidth;

        this.brickImage = new Image();
        this.brickImage.src = 'brick.png'; // Path to your brick image

        this.createObstacles();
    }

    update(player: Player, screenOffset: number) {
        this.platforms.forEach(platform => {
            const adjustedX = platform.x - screenOffset;

            // Check if the player is landing on top of the platform
            if (
                player.velocityY > 0 && // Falling down
                player.x + player.width > adjustedX && // Player's right side passes platform's left side
                player.x < adjustedX + platform.width && // Player's left side is before platform's right side
                player.y + player.height <= platform.y && // Player's feet are above platform
                player.y + player.height + player.velocityY >= platform.y // Player's feet will be on or below platform
            ) {
                // Land on the platform
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.isOnGround = true;
            }

            // Check if the player hits the left side of the platform
            if (
                player.velocityX > 0 && // Moving right
                player.x + player.width > adjustedX && // Player's right side is to the right of the platform's left side
                player.x < adjustedX + platform.width && // Player's left side is to the left of the platform's right side
                player.y + player.height > platform.y && // Player's bottom is below the platform's top
                player.y < platform.y + platform.height // Player's top is above the platform's bottom
            ) {
                // Collide with the left side
                player.x = adjustedX - player.width; // Set player position to the left edge of the platform
                player.velocityX = 0; // Stop the player's horizontal movement
            }

            // Check if the player hits the right side of the platform
            if (
                player.velocityX < 0 && // Moving left
                player.x < adjustedX + platform.width && // Player's left side touches platform's right side
                player.x - player.velocityX >= adjustedX + platform.width && // Player's left side was to the right of platform's right side
                player.y + player.height > platform.y && // Player is not above the platform
                player.y < platform.y + platform.height // Player is not below the platform
            ) {
                // Collide with the right side
                player.x = adjustedX + platform.width;
                player.velocityX = 0;
            }

            // Check if the player hits the bottom of the platform
            if (
                player.velocityY < 0 && // Moving up
                player.x + player.width > adjustedX && // Player's right side is past platform's left side
                player.x < adjustedX + platform.width && // Player's left side is before platform's right side
                player.y <= platform.y + platform.height && // Player's head is below the platform's bottom edge
                player.y > platform.y // Player's head is above the platform's top edge (meaning within the platform's height)
            ) {
                // Collide with the bottom
                player.y = platform.y + platform.height;
                player.velocityY = 0;
            }
        });

        this.holes.forEach(hole => {
            if (
                player.x > hole.holeX - screenOffset &&
                player.x + player.width < hole.holeX - screenOffset + hole.holeWidth &&
                player.y + player.height >= this.floorHeight
            ) {
                player.fall();
            }
        });
    }

        draw(context: CanvasRenderingContext2D, offsetX: number) {
        this.platforms.forEach(platform => {
            context.drawImage(this.brickImage, platform.x - offsetX, platform.y, platform.width, platform.height);
        });

        this.holes.forEach(hole => {
            this.drawHole(context, offsetX, hole.holeX, hole.holeWidth);
        });
    }

    drawHole(context: CanvasRenderingContext2D, offsetX: number, holeX: number, holeWidth: number) {
        // Draw the hole
        context.fillStyle = 'black';
        context.fillRect(holeX - offsetX, this.floorHeight, holeWidth, 40);
    }

    platform(lenght: number, startPercentage: number, heightFromFloor: number) {
        for (let i = 0; i < lenght; i++) {
            this.platforms.push({
                x: startPercentage + i * this.moduleWidth,
                y: heightFromFloor,
                width: this.moduleWidth,
                height: this.moduleHeight,
            });
        }
    }

    upwardStaircase(lenght: number, startPercentage: number) {
        for (let i = 1; i <= lenght; i++) {
            for (let j = 0; j < i; j++) {
                this.platforms.push({
                    x: startPercentage + (i * this.moduleWidth), // Each module moves to the right
                    y: (this.floorHeight - this.moduleHeight) - (j * this.moduleHeight), // Each row starts higher as i increases
                    width: this.moduleWidth,
                    height: this.moduleHeight,
                });
            }
        }
    }

    downwardStaircase(length: number, startPercentage: number) {
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - i; j++) {
                this.platforms.push({
                    x: startPercentage + (i * this.moduleWidth), // Each module moves to the right
                    y: (this.floorHeight - this.moduleHeight) - (j * this.moduleHeight), // Each row is lower as i increases
                    width: this.moduleWidth,
                    height: this.moduleHeight,
                });
            }
        }
    }

    hole(x: number, width: number) {
        this.holes.push({
            holeX: x,
            holeWidth: width
        });
    }

    createObstacles() {
        this.upwardStaircase(4, 0.03 * this.levelWidth);
        let start = 0.03 * this.levelWidth + 5 * this.moduleWidth;
        this.hole(start, 100);
        this.downwardStaircase(4, start + 100);

        this.hole(0.15 * this.levelWidth - 100, (7*this.moduleWidth) + 100)
        this.platform(6, 0.15 * this.levelWidth, this.floorHeight - (0.4 * window.innerHeight));

        this.platform(4, 0.2 * this.levelWidth, this.floorHeight - (0.2 * window.innerHeight));
        this.platform(4, 0.22 * this.levelWidth, this.floorHeight - (0.3 * window.innerHeight));
        this.platform(4, 0.24 * this.levelWidth, this.floorHeight - (0.4 * window.innerHeight));

        this.hole(0.26 * this.levelWidth - 50, (7*this.moduleWidth) )

        this.upwardStaircase(4, 0.29 * this.levelWidth);
        start = 0.29 * this.levelWidth + 5 * this.moduleWidth;
        this.hole(start, 100);


        this.hole(0.42 * this.levelWidth, 850);
        this.platform(2, 0.44 * this.levelWidth, this.floorHeight - (0.2 * window.innerHeight));
        this.platform(2, 0.46 * this.levelWidth, this.floorHeight - (0.4 * window.innerHeight));
        this.platform(2, 0.48 * this.levelWidth, this.floorHeight - (0.4 * window.innerHeight));
        this.platform(2, 0.50 * this.levelWidth, this.floorHeight - (0.4 * window.innerHeight));


        this.upwardStaircase(6, 0.52 * this.levelWidth);
        start = 0.52 * this.levelWidth + 6 * this.moduleWidth;
        this.platform(6, start + 200, this.floorHeight - (0.6 * window.innerHeight));
        this.platform(6, 0.62 * this.levelWidth, this.floorHeight - (0.6 * window.innerHeight));
        this.platform(6, (0.65 * this.levelWidth) + 200, this.floorHeight - (0.6 * window.innerHeight));


        this.upwardStaircase(4, 0.73 * this.levelWidth);
        start = 0.73 * this.levelWidth + 5 * this.moduleWidth;
        this.hole(start, 150);
        this.downwardStaircase(4, start + 150);


    }
}
