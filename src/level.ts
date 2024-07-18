import { Item } from './item';
import { Obstacle } from './obstacle';

export class Level {
    items: Item[] = [];
    obstacles: Obstacle[] = [];
    floorHeight: number = 600;

    constructor() {
        // Initialize items and obstacles here
        this.items.push(new Item(100, 500));
        this.obstacles.push(new Obstacle(300, 550));
    }

    update() {
        // Update items and obstacles
        this.items.forEach(item => item.update());
        this.obstacles.forEach(obstacle => obstacle.update());
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
