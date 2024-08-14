import {Player} from "./player";

export interface Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    speed: number;
}

export class EnemiesManager {
    enemies: Enemy[] = [];
    enemyImage: HTMLImageElement;
    floorHeight: number;
    gameOver: boolean;

    constructor(levelWidth: number, floorHeight: number) {
        this.floorHeight = floorHeight;
        this.gameOver = false;

        this.enemyImage = new Image();
        this.enemyImage.src = 'enemy.png';

        this.enemyImage.onload = () => {
            for (let i = 0; i < 5; i++) {
                const width = this.enemyImage.width * 0.1; // Adjust size as needed
                const height = this.enemyImage.height * 0.1;
                this.enemies.push({
                    x: levelWidth + Math.random(), // Spawn just outside the level on the right
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
        if (this.gameOver) return;

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
                this.gameOver = true;
            }
        });

        // Remove enemies that have gone off the left side of the screen
        this.enemies = this.enemies.filter(enemy => enemy.x + enemy.width > screenOffset);
    }

    draw(context: CanvasRenderingContext2D, offsetX: number) {
        this.enemies.forEach(enemy => {
            context.drawImage(enemy.image, enemy.x - offsetX, enemy.y, enemy.width, enemy.height);
        });
    }
}
