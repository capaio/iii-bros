import { Player } from './player';

export class Level {
    beerItems: { x: number, y: number, width: number, height: number, image: HTMLImageElement }[] = [];
    clouds: { x: number, y: number, width: number, height: number }[] = [];
    bushes: { x: number, y: number, width: number, height: number, image: HTMLImageElement }[] = [];
    holeX: number;
    holeWidth: number;
    floorHeight: number;
    levelWidth: number;
    endMarkerX: number;
    cloudImage: HTMLImageElement;
    bushImage: HTMLImageElement;

    constructor() {
        this.holeWidth = 100; // Width of the hole
        this.floorHeight = window.innerHeight - 40; // Adjusted floor height
        this.levelWidth = 3 * window.innerWidth; // Level length 3x screen width
        this.holeX = this.levelWidth - this.holeWidth - 100; // Position of the hole from the end
        this.endMarkerX = this.levelWidth - 50; // Position of the end marker

        this.cloudImage = new Image();
        this.cloudImage.src = 'cloud.png';

        this.bushImage = new Image();
        this.bushImage.src = 'bush.png';

        // Add 5 beer items
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

        // Add clouds
        for (let i = 0; i < 20; i++) {
            this.clouds.push({
                x: Math.random() * this.levelWidth,
                y: Math.random() * (this.floorHeight / 2),
                width: 100,
                height: 50
            });
        }

        // Add bushes
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
        console.log('a')

    }

    update(player: Player, screenOffset: number) {
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
    }
}
