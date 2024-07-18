import { Item } from './item';
import { Obstacle } from './obstacle';
import { Player } from './player';

export class Level {
    items: Item[] = [];
    obstacles: Obstacle[] = [];
    floorHeight: number = window.innerHeight;

    constructor() {
        // Initialize items and obstacles here
        this.items.push(new Item(100, this.floorHeight - 60));
        this.obstacles.push(new Obstacle(300, this.floorHeight - 60));
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
        context.fillStyle = 'black';
        context.fillRect(0, this.floorHeight - 10, context.canvas.width, 10);

        // Draw items and obstacles
        this.items.forEach(item => item.draw(context));
        this.obstacles.forEach(obstacle => obstacle.draw(context));
    }
}
