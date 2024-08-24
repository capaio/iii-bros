import { Player } from "./player";

export interface Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    speed: number;
    startX: number;
    endX: number;
    movingRight: boolean;
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
            // Define specific enemies with their own ranges
            this.enemies.push(
                this.createEnemy(0.09 * levelWidth, 0.13 * levelWidth),
                this.createEnemy(0.4 * levelWidth, 0.5 * levelWidth),
                this.createEnemy(0.6 * levelWidth, 0.7 * levelWidth),
                this.createEnemy(0.8 * levelWidth, 0.9 * levelWidth),
                this.createEnemy(0.85 * levelWidth, 0.95 * levelWidth)
            );
        };
    }

    createEnemy(startX: number, endX: number): Enemy {
        const width = this.enemyImage.width * 0.1;
        const height = this.enemyImage.height * 0.1;
        return {
            x: startX,
            y: this.floorHeight - height,
            width: width,
            height: height,
            image: this.enemyImage,
            speed: 2,
            startX: startX,
            endX: endX,
            movingRight: true
        };
    }

    update(player: Player, screenOffset: number) {
        if (this.gameOver) return;

        this.enemies.forEach(enemy => {
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

    draw(context: CanvasRenderingContext2D, offsetX: number) {
        this.enemies.forEach(enemy => {
            const adjustedX = enemy.x - offsetX;

            context.save();

            if (enemy.movingRight) {
                // Flip the image horizontally
                context.scale(-1, 1);
                context.drawImage(enemy.image, -adjustedX - enemy.width, enemy.y, enemy.width, enemy.height);
            } else {
                // Draw normally
                context.drawImage(enemy.image, adjustedX, enemy.y, enemy.width, enemy.height);
            }

            context.restore();
        });
    }
}
