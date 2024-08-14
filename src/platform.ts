import {Player} from "./player";

export interface Platform {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class PlatformsManager {
    platforms: Platform[] = [];

    constructor(levelWidth: number, floorHeight: number) {
        const moduleWidth = 0.2 * window.innerWidth; // Each module is 20% of screen width
        const moduleHeight = 0.1 * window.innerHeight; // Module height is 10% of screen height
        const platformX = 0.1 * levelWidth; // Start at 10% of level width
        const platformY = floorHeight - (0.4 * window.innerHeight); // 40% above the floor

        for (let i = 0; i < 4; i++) {
            this.platforms.push({
                x: platformX + i * moduleWidth,
                y: platformY,
                width: moduleWidth,
                height: moduleHeight
            });
        }
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
                player.x + player.width > adjustedX && // Player's right side touches platform's left side
                player.x + player.width - player.velocityX <= adjustedX && // Player's right side was to the left of platform's left side
                player.y + player.height > platform.y && // Player is not above the platform
                player.y < platform.y + platform.height // Player is not below the platform
            ) {
                // Collide with the left side
                player.x = adjustedX - player.width;
                player.velocityX = 0;
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
                player.y < platform.y + platform.height && // Player's head is below the platform's bottom
                player.y - player.velocityY >= platform.y + platform.height // Player's head was above the platform's bottom
            ) {
                // Collide with the bottom
                player.y = platform.y + platform.height;
                player.velocityY = 0;
            }
        });
    }

    draw(context: CanvasRenderingContext2D, offsetX: number) {
        context.fillStyle = '#555555'; // Platform color
        this.platforms.forEach(platform => {
            context.fillRect(platform.x - offsetX, platform.y, platform.width, platform.height);
        });
    }
}
