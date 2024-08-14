import { Player } from './player';
import { EnemiesManager } from './enemies';
import { PlatformsManager } from './platform';

export class Level {
    beerItems: { x: number, y: number, width: number, height: number, image: HTMLImageElement }[] = [];
    clouds: { x: number, y: number, width: number, height: number }[] = [];
    bushes: { x: number, y: number, width: number, height: number, image: HTMLImageElement }[] = [];
    floorHeight: number;
    levelWidth: number;
    endMarkerX: number;
    cloudImage: HTMLImageElement;
    bushImage: HTMLImageElement;
    gameOver: boolean;
    enemiesManager: EnemiesManager;
    platformsManager: PlatformsManager;

    constructor(context: CanvasRenderingContext2D) {
        this.floorHeight = window.innerHeight - 40; // Adjusted floor height
        this.levelWidth = 10 * window.innerWidth; // Level length 10x screen width
        this.endMarkerX = this.levelWidth - 50; // Position of the end marker

        this.cloudImage = new Image();
        this.cloudImage.src = 'cloud.png';

        this.bushImage = new Image();
        this.bushImage.src = 'bush.png';

        this.gameOver = false;

        // Initialize enemies and platforms managers
        this.enemiesManager = new EnemiesManager(this.levelWidth, this.floorHeight);
        this.platformsManager = new PlatformsManager(this.levelWidth, this.floorHeight);

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
    }

    update(player: Player, screenOffset: number) {
        if (this.gameOver) return;

        this.enemiesManager.update(player, screenOffset);
        this.platformsManager.update(player, screenOffset);

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
    }

    draw(context: CanvasRenderingContext2D, offsetX: number) {
        // Draw the floor
        context.fillStyle = '#954b0c';
        context.fillRect(-offsetX, this.floorHeight, this.levelWidth, 40);


        // Draw the end marker
        context.fillStyle = 'green';
        context.fillRect(this.endMarkerX - offsetX, this.floorHeight - 40, 50, 80);

        // Draw platforms
        this.platformsManager.draw(context, offsetX);

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
        this.enemiesManager.draw(context, offsetX);
    }
}
