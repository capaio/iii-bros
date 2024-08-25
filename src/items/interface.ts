export interface Item {
    image: HTMLImageElement;
    x: number;
    y: number;
    width: number;
    height: number;
    draw(context: CanvasRenderingContext2D): void;
    update(screenOffset: number): void;
}
