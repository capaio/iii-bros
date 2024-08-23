import { Player } from './player';
import { EnemiesManager } from './enemies';
import { PlatformsManager } from './platform';
import {BackgroundItem, getBeers, getBushes, getClouds} from "./background";

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
    platformsManager: PlatformsManager;

    constructor(context: CanvasRenderingContext2D) {
        this.floorHeight = window.innerHeight - 40; // Adjusted floor height
        this.levelWidth = 10 * window.innerWidth; // Level length 10x screen width
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

        // Initialize enemies and platforms managers
        this.enemiesManager = new EnemiesManager(this.levelWidth, this.floorHeight);
        this.platformsManager = new PlatformsManager(this.levelWidth, this.floorHeight);

        // Add 15 beer items
        // for (let i = 0; i < 15; i++) {
        //     const beerImage = new Image();
        //     beerImage.src = 'beer.png';
        //     beerImage.onload = () => {
        //         const width = beerImage.width * 0.05; // 50% smaller
        //         const height = beerImage.height * 0.05;
        //         this.beerItems.push({
        //             x: Math.random() * (this.levelWidth - width),
        //             y: Math.random() * (this.floorHeight - height - 40), // Ensure it's above the floor
        //             width: width,
        //             height: height,
        //             image: beerImage
        //         });
        //     };
        // }

        this.clouds = getClouds(this.levelWidth, this.floorHeight);

        this.bushImage.onload = () => {
            this.bushes = getBushes(this.levelWidth, this.floorHeight, this.bushImage.width, this.bushImage.height);
        };
        this.beerImage.onload = () => {
            this.beerItems = getBeers(this.levelWidth, this.floorHeight, this.beerImage.width, this.beerImage.height);
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

        // Draw bushes
        this.bushes.forEach(bush => {
            context.drawImage(this.bushImage, bush.x - offsetX, bush.y, bush.width, bush.height);
        });

        // Draw clouds
        this.clouds.forEach(cloud => {
            context.drawImage(this.cloudImage, cloud.x - offsetX, cloud.y, cloud.width, cloud.height);
        });

        // Draw platforms
        this.platformsManager.draw(context, offsetX);

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
}
