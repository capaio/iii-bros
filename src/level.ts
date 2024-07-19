import { Item } from './item';
import { Obstacle } from './obstacle';
import { Player } from './player';

export class Level {
    items: Item[] = [];
    obstacles: Obstacle[] = [];
    floorHeight: number = window.innerHeight - 40; // Adjust floor height

    constructor() {
        // Initialize obstacles here
        this.obstacles.push(new Obstacle(300, this.floorHeight - 60)); // Adjusted position

        // Spawn beer items in different locations
        this.spawnBeerItems(5); // Spawns 5 beer items
    }

    spawnBeerItems(count: number) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * (window.innerWidth - 100); // Random x position within the window
            const y = Math.random() * (this.floorHeight - 100); // Random y position above the floor
            this.items.push(new Item(x, y, 'beer.webp'));
        }
    }

    update(player: Player) {
        // Update items and obstacles
        this.items.forEach((item, index) => {
            item.update();
            if (this.checkCollision(player, item)) {
                this.items.splice(index, 1);
                this.dispatchItemCollected();
            }
        });
        this.obstacles.forEach(obstacle => obstacle.update());
    }

    checkCollision(player: Player, item: Item): boolean {
        return player.x < item.x + item.width &&
            player.x + player.width > item.x &&
            player.y < item.y + item.height &&
            player.y + player.height > item.y;
    }

    dispatchItemCollected() {
        const event = new Event('itemCollected');
        window.dispatchEvent(event);
    }

    draw(context: CanvasRenderingContext2D) {
        // Draw floor
        context.fillStyle = '#954b0c'; // New floor color
        context.fillRect(0, this.floorHeight, context.canvas.width, 40); // Adjusted floor height

        // Draw items and obstacles
        this.items.forEach(item => item.draw(context));
        this.obstacles.forEach(obstacle => obstacle.draw(context));
    }
}
