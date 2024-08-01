import { Player } from './player';

export class Level {
    beerItems: { x: number, y: number, width: number, height: number, image: HTMLImageElement }[] = [];
    clouds: { x: number, y: number, width: number, height: number }[] = [];
    bushes: { x: number, y: number, width: number, height: number, image: HTMLImageElement }[] = [];
    enemies: { x: number, y: number, width: number, height: number, image: HTMLImageElement, speed: number }[] = [];
    holeX: number;
    holeWidth: number;
    floorHeight: number;
    levelWidth: number;
    endMarkerX: number;
    cloudImage: HTMLImageElement;
    bushImage: HTMLImageElement;
    enemyImage: HTMLImageElement;
    gameOver: boolean;

    constructor() {
        this.holeWidth = 100; // Width of the hole
        this.floorHeight = window.innerHeight - 40; // Adjusted floor height
        this.levelWidth = 10 * window.innerWidth; // Level length 10x screen width
        this.holeX = this.levelWidth - this.holeWidth - 100; // Position of the hole from the end
        this.endMarkerX = this.levelWidth - 50; // Position of the end marker

        this.cloudImage = new Image();
        this.cloudImage.src = 'cloud.png';

        this.bushImage = new Image();
        this.bushImage.src = 'bush.png';

        this.enemyImage = new Image();
        this.enemyImage.src = 'enemy.png';

        this.gameOver = false;

        // Add 15 beer items
        for (let i = 0; i < 15; i++) {
            const beerImage = new Image();
            beerImage.src = 'beer.png';
            beerImage.onload = () => {
                const width = beerImage.width * 0.05; // 50% smaller
                const height = beerImage.height * 0.05;
                this.beerItems.push({
                    x: Math.random() * (this.levelWidth - width),
                    y: Math.random() * (this.floorHeight - height - 40), // Ensure it's above the floor
                    width: width,
                    height: height,
                    image: beerImage
                });
            };
        }

        // Add 20 clouds
        for (let i = 0; i < 20; i++) {
            this.clouds.push({
                x: Math.random() * this.levelWidth,
                y: Math.random() * (this.floorHeight / 2),
                width: 100,
                height: 50
            });
        }

        // Add 15 bushes
        this.bushImage.onload = () => {
            for (let i = 0; i < 15; i++) {
                const width = this.bushImage.width * 0.1; // Adjust size as needed
                const height = this.bushImage.height * 0.1;
                this.bushes.push({
                    x: Math.random() * this.levelWidth,
                    y: this.floorHeight - height, // Place on the floor
                    width: width,
                    height: height,
                    image: this.bushImage
                });
            }
        };

        // Add 5 enemies
        this.enemyImage.onload = () => {
            for (let i = 0; i < 5; i++) {
                const width = this.enemyImage.width * 0.1; // Adjust size as needed
                const height = this.enemyImage.height * 0.1;
                this.enemies.push({
                    x: window.innerWidth + Math.random(), // Spawn just outside the level on the right
                    y: this.floorHeight - height, // Place on the floor
                    width: width,
                    height: height,
                    image: this.enemyImage,
                    speed: 4 // Adjust speed as needed
                });
            }
        };
    }

    update(player: Player, screenOffset: number) {
        if (this.gameOver) {
            return; // Do not update anything if the game is over
        }

        // Check if the player falls into the hole
        if (
            player.x > this.holeX - screenOffset &&
            player.x + player.width < this.holeX - screenOffset + this.holeWidth &&
            player.y + player.height >= this.floorHeight
        ) {
            player.fall();
        }

        // Check for beer collection
        this.beerItems = this.beerItems.filter(item => {
            const adjustedX = item.x - screenOffset;
            if (
                player.x < adjustedX + item.width &&
                player.x + player.width > adjustedX &&
                player.y < item.y + item.height &&
                player.y + player.height > item.y
            ) {
                // Beer collected
                window.dispatchEvent(new Event('itemCollected'));
                return false; // Remove the item
            }
            return true; // Keep the item
        });

        // Update enemy positions and check for collisions with the player
        this.enemies.forEach(enemy => {
            enemy.x -= enemy.speed; // Move enemy left

            const adjustedX = enemy.x - screenOffset;
            if (
                player.x < adjustedX + enemy.width &&
                player.x + player.width > adjustedX &&
                player.y < enemy.y + enemy.height &&
                player.y + player.height > enemy.y
            ) {
                // Player touches enemy
                player.showGameOver();
                this.gameOver = true; // Set game over flag
            }
        });

        // Remove enemies that have gone off the left side of the screen
        this.enemies = this.enemies.filter(enemy => enemy.x + enemy.width > screenOffset);
    }

    draw(context: CanvasRenderingContext2D, offsetX: number) {
        // Draw the floor
        context.fillStyle = '#954b0c';
        context.fillRect(-offsetX, this.floorHeight, this.levelWidth, 40);

        // Draw the hole
        context.fillStyle = 'black';
        context.fillRect(this.holeX - offsetX, this.floorHeight, this.holeWidth, 40);

        // Draw the end marker
        context.fillStyle = 'green';
        context.fillRect(this.endMarkerX - offsetX, this.floorHeight - 40, 50, 80);

        // Draw beer items
        this.beerItems.forEach(item => {
            context.drawImage(item.image, item.x - offsetX, item.y, item.width, item.height);
        });

        // Draw clouds
        this.clouds.forEach(cloud => {
            context.drawImage(this.cloudImage, cloud.x - offsetX, cloud.y, cloud.width, cloud.height);
        });

        // Draw bushes
        this.bushes.forEach(bush => {
            context.drawImage(bush.image, bush.x - offsetX, bush.y, bush.width, bush.height);
        });

        // Draw enemies
        this.enemies.forEach(enemy => {
            context.drawImage(enemy.image, enemy.x - offsetX, enemy.y, enemy.width, enemy.height);
        });
    }
}
