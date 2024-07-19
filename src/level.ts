import { Player } from './player';
import { Obstacle } from './obstacle';

export class Level {
    obstacles: Obstacle[] = [];
    beerItems: { x: number, y: number, width: number, height: number, image: HTMLImageElement }[] = [];
    holeX: number;
    holeWidth: number;
    floorHeight: number;

    constructor() {
        this.holeWidth = 100; // Width of the hole
        this.floorHeight = window.innerHeight - 40; // Adjusted floor height
        this.holeX = window.innerWidth - this.holeWidth - 50; // Position of the hole from the right

        // Add 5 beer items for testing
        for (let i = 0; i < 5; i++) {
            const beerImage = new Image();
            beerImage.src = 'beer.webp';
            beerImage.onload = () => {
                const width = beerImage.width * 0.05; // 50% smaller (0.05 is 50% of the 0.1 used earlier)
                const height = beerImage.height * 0.05;
                this.beerItems.push({
                    x: Math.random() * (window.innerWidth - width),
                    y: Math.random() * (this.floorHeight - height - 40), // Ensure it's above the floor
                    width: width,
                    height: height,
                    image: beerImage
                });
            };
        }
    }

    update(player: Player) {
        // Check if the player falls into the hole
        if (
            player.x > this.holeX &&
            player.x + player.width < this.holeX + this.holeWidth &&
            player.y + player.height >= this.floorHeight
        ) {
            player.fall();
        }

        // Check for beer collection
        this.beerItems = this.beerItems.filter(item => {
            if (
                player.x < item.x + item.width &&
                player.x + player.width > item.x &&
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

    draw(context: CanvasRenderingContext2D) {
        // Draw the floor
        context.fillStyle = '#954b0c';
        context.fillRect(0, this.floorHeight, window.innerWidth, 40);

        // Draw the hole
        context.fillStyle = 'black';
        context.fillRect(this.holeX, this.floorHeight, this.holeWidth, 40);

        // Draw obstacles
        this.obstacles.forEach(obstacle => {
            obstacle.draw(context);
        });

        // Draw beer items
        this.beerItems.forEach(item => {
            context.drawImage(item.image, item.x, item.y, item.width, item.height);
        });
    }
}
