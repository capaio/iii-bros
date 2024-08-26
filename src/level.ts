import { Player } from './player';
import {GameLevel, Hole,  Platform} from "./levels/interfaces";
import {Level1} from "./levels/level-1/level-1";
import {Item, NPC} from "./items/interface";

export class Level {
    beerItems: Item[] = [];
    clouds: Item[] = [];
    bushes: Item[] = [];
    floorHeight: number;
    levelWidth: number;
    endMarkerX: number;
    gameOver: boolean;
    platforms: Platform[] = [];
    holes: Hole[] = [];
    npcs: NPC[] = [];
    gameLevel: GameLevel

    currentScreenOffset: number = 0;

    constructor() {
        this.floorHeight = window.innerHeight - 40; // Adjusted floor height
        this.gameLevel = new Level1(this.floorHeight);


        document.body.style.backgroundColor = this.gameLevel.skyColor;

        this.levelWidth = this.gameLevel.width;
        this.endMarkerX = this.levelWidth - 50; // Position of the end marker

        this.gameOver = false;

        // Initialize enemies and design level
        [this.platforms, this.holes]  = this.gameLevel.createObstacles(this.levelWidth, this.floorHeight);

        // Initialize background items
        this.clouds = this.gameLevel.getClouds(this.levelWidth, this.floorHeight);
        this.bushes = this.gameLevel.getBushes(this.levelWidth, this.floorHeight);
        this.beerItems = this.gameLevel.getBeers(this.levelWidth, this.floorHeight);

        // Initialize npcs
        this.npcs = this.gameLevel.createNPCs(this.levelWidth, this.floorHeight);


    }

    update(player: Player) {
        if (this.gameOver) return;

        this.updateNPCs(player, this.currentScreenOffset);
        this.checkCollision(player, this.currentScreenOffset);

        //update items
        [...this.bushes, ...this.beerItems, ...this.clouds].forEach(item => {
            item.update();
        })

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

    updateNPCs(player: Player, screenOffset: number) {
        if (this.gameOver) return;

        this.npcs.forEach(enemy => {
            // Adjust the enemy position based on movement direction
            if (enemy.movingRight) {
                enemy.x += enemy.speed;
                if (enemy.x >= enemy.endX) {
                    enemy.x = enemy.endX;
                    enemy.movingRight = false; // Change direction to left
                }
            } else {
                enemy.x -= enemy.speed;
                if (enemy.x <= enemy.startX) {
                    enemy.x = enemy.startX;
                    enemy.movingRight = true; // Change direction to right
                }
            }

            const adjustedX = enemy.x - screenOffset;
            if (
                player.x < adjustedX + enemy.width &&
                player.x + player.width > adjustedX &&
                player.y < enemy.y + enemy.height &&
                player.y + player.height > enemy.y
            ) {
                // Player touches enemy
                player.showGameOver();
                this.gameOver = true;
            }
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

    updateBackgroundItems() {



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
        [...this.clouds, ...this.bushes, ...this.beerItems].forEach(item => {
            context.drawImage(item.image, item.x - offsetX, item.y, item.width, item.height);
        });

        // Draw platforms
        this.platforms.forEach(platform => {
            context.drawImage(platform.image, platform.x - offsetX, platform.y, platform.width, platform.height);
        });

        this.holes.forEach(hole => {
            this.drawHole(context, offsetX, hole.holeX, hole.holeWidth);
        });


        // Draw the castle at the end of the level
        const castleWidth = this.gameLevel.castleWidth; // Adjust the width of the castle as needed
        const castleHeight = this.gameLevel.castleHeight; // Adjust the height of the castle as needed
        context.drawImage(this.gameLevel.castleImage, this.endMarkerX - offsetX - castleWidth, this.floorHeight - castleHeight, castleWidth, castleHeight);

        // Draw enemies
        this.drawNPCs(context, offsetX);
    }

    drawNPCs(context: CanvasRenderingContext2D, offsetX: number) {
        this.npcs.forEach((npc) => {
            const adjustedX = npc.x - offsetX;

            context.save();

            if (npc.movingRight) {
                // Flip the image horizontally
                context.scale(-1, 1);
                context.drawImage(npc.image, -adjustedX - npc.width, npc.y, npc.width, npc.height);
            } else {
                // Draw normally
                context.drawImage(npc.image, adjustedX, npc.y, npc.width, npc.height);
            }

            context.restore();
        });
    }

    drawHole(context: CanvasRenderingContext2D, offsetX: number, holeX: number, holeWidth: number) {
        // Draw the hole
        context.fillStyle = this.gameLevel.holesColor;
        context.fillRect(holeX - offsetX, this.floorHeight, holeWidth, 40);
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
