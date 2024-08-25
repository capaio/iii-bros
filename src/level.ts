import { Player } from './player';
import { EnemiesManager } from './enemies';

import { BackgroundItem } from './background';
import {Level1} from "./levels/level-1";
import {Hole, Platform} from "./designer/platform.designer";

export class Level {
    beerItems: BackgroundItem[] = [];
    clouds: BackgroundItem[] = [];
    bushes: BackgroundItem[] = [];
    floorHeight: number;
    levelWidth: number;
    endMarkerX: number;
    cloudImage: HTMLImageElement;
    bushImage: HTMLImageElement;
    castleImage: HTMLImageElement;
    beerImage: HTMLImageElement;
    gameOver: boolean;
    enemiesManager: EnemiesManager;
    platforms: Platform[] = [];
    holes: Hole[] = [];

    currentScreenOffset: number = 0;

    constructor() {

        const gameLevel = new Level1();

        this.floorHeight = window.innerHeight - 40; // Adjusted floor height
        this.levelWidth = gameLevel.width;
        this.endMarkerX = this.levelWidth - 50; // Position of the end marker

        this.cloudImage = new Image();
        this.cloudImage.src = 'cloud.png';

        this.bushImage = new Image();
        this.bushImage.src = 'bush.png';

        this.castleImage = new Image();
        this.castleImage.src = 'castle.webp'; // Load the castle image

        this.beerImage = new Image();
        this.beerImage.src = 'beer.png'; // Load the beer image

        this.gameOver = false;


        // Initialize enemies and design level
        this.enemiesManager = new EnemiesManager(this.levelWidth, this.floorHeight);
        [this.platforms, this.holes]  = gameLevel.createObstacles(this.levelWidth, this.floorHeight);

        // Initialize background items
        this.clouds = gameLevel.getClouds(this.levelWidth, this.floorHeight);
        this.bushImage.onload = () => {
            this.bushes = gameLevel.getBushes(this.levelWidth, this.floorHeight, this.bushImage.width, this.bushImage.height);
        };

        // Load beer image and initialize beer items
        this.beerImage.onload = () => {
            this.beerItems = gameLevel.getBeers(this.levelWidth, this.floorHeight, this.beerImage.width, this.beerImage.height);
        };
    }

    update(player: Player, screenOffset: number) {
        if (this.gameOver) return;

        this.enemiesManager.update(player, this.currentScreenOffset);
        this.checkCollision(player, this.currentScreenOffset);

        // Check if the player is actually able to move forward
        // Calculate the max screen offset to stop before the green rectangle (end marker)
        const buffer = 20; // The distance (in pixels) before the end marker where scrolling should stop
        const maxScreenOffset = this.endMarkerX - window.innerWidth - buffer;

        const playerCanMoveRight = player.velocityX > 0 && player.x + player.width < this.levelWidth;

        if (playerCanMoveRight) {
            // Only update screen offset if player is moving right and not blocked
            if (!this.isPlayerBlockedOnRight(player, this.currentScreenOffset)) {
                this.currentScreenOffset += player.speed;
            }
        }

        // Ensure screen offset does not exceed the bounds of the level
        if (this.currentScreenOffset < 0) {
            this.currentScreenOffset = 0;
        } else if (this.currentScreenOffset > maxScreenOffset) {
            this.currentScreenOffset = maxScreenOffset;
        }

        // Update background items and check for item collection
        this.updateBackgroundItems(player);

        // Check for beer collection
        this.beerItems = this.beerItems.filter(item => {
            const adjustedX = item.x - this.currentScreenOffset;
            if (
                player.x < adjustedX + item.width &&
                player.x + player.width > adjustedX &&
                player.y < item.y + item.height &&
                player.y + player.height > item.y
            ) {
                window.dispatchEvent(new Event('itemCollected'));
                return false; // Remove the item
            }
            return true; // Keep the item
        });
    }

    isPlayerBlockedOnRight(player: Player, screenOffset: number): boolean {
        return this.platforms.some(platform => {
            const adjustedX = platform.x - screenOffset;
            return (
                player.velocityX > 0 && // Player is moving to the right
                player.x + player.width <= adjustedX && // Player's right side is to the left of the platform's left side
                player.x + player.width + player.velocityX >= adjustedX && // Player's next position would intersect the platform
                player.y + player.height > platform.y && // Player's bottom is below the platform's top
                player.y < platform.y + platform.height // Player's top is above the platform's bottom
            );
        });
    }

    updateBackgroundItems(player: Player) {
        // This method updates background items like clouds and bushes
        this.clouds.forEach(cloud => {
            cloud.x -= 0.2; // Slightly move clouds to the left for a parallax effect
        });

        // Check if any bushes have scrolled off the screen and reset their position
        this.bushes.forEach(bush => {
            if (bush.x - this.currentScreenOffset < -bush.width) {
                bush.x += this.levelWidth; // Move bush to the end of the level
            }
        });
    }

    draw(context: CanvasRenderingContext2D) {
        const offsetX = this.currentScreenOffset;

        // Draw the floor
        context.fillStyle = '#954b0c';
        context.fillRect(-offsetX, this.floorHeight, this.levelWidth, 40);

        // Draw the end marker
        context.fillStyle = 'green';
        context.fillRect(this.endMarkerX - offsetX, this.floorHeight - 40, 50, 80);

        // Draw background items
        this.drawBackgroundItems(context, offsetX);

        // Draw platforms
        this.platforms.forEach(platform => {
            const brickImage = new Image();
            brickImage.src = 'brick.png'; // Path to your brick image

            context.drawImage(brickImage, platform.x - offsetX, platform.y, platform.width, platform.height);
        });

        this.holes.forEach(hole => {
            this.drawHole(context, offsetX, hole.holeX, hole.holeWidth);
        });

        // Draw beer items
        this.beerItems.forEach(item => {
            context.drawImage(this.beerImage, item.x - offsetX, item.y, item.width, item.height);
        });

        // Draw the castle at the end of the level
        const castleWidth = 350; // Adjust the width of the castle as needed
        const castleHeight = 300; // Adjust the height of the castle as needed
        context.drawImage(this.castleImage, this.endMarkerX - offsetX - castleWidth, this.floorHeight - castleHeight, castleWidth, castleHeight);

        // Draw enemies
        this.enemiesManager.draw(context, offsetX);
    }

    drawHole(context: CanvasRenderingContext2D, offsetX: number, holeX: number, holeWidth: number) {
        // Draw the hole
        context.fillStyle = 'black';
        context.fillRect(holeX - offsetX, this.floorHeight, holeWidth, 40);
    }

    drawBackgroundItems(context: CanvasRenderingContext2D, offsetX: number) {
        // Draw clouds
        this.clouds.forEach(cloud => {
            context.drawImage(this.cloudImage, cloud.x - offsetX, cloud.y, cloud.width, cloud.height);
        });

        // Draw bushes
        this.bushes.forEach(bush => {
            context.drawImage(this.bushImage, bush.x - offsetX, bush.y, bush.width, bush.height);
        });
    }

    checkCollision(player: Player, screenOffset: number) {
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
}
