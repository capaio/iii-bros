
export interface BackgroundItem {
    x: number;
    y: number;
    width: number;
    height: number;
}


export const getClouds = (levelWidth: number, floorHeight: number):BackgroundItem[] => {
    return [
        {
            x: 0.01 * levelWidth,
            y: 0.1 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.03 * levelWidth,
            y: 0.2 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.07 * levelWidth,
            y: 0.22 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.09 * levelWidth,
            y: 0.5 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.12 * levelWidth,
            y: 0.7 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.18 * levelWidth,
            y: 0.2 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.26 * levelWidth,
            y: 0.8 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.29 * levelWidth,
            y: 0.1 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.33 * levelWidth,
            y: 0.2 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.37 * levelWidth,
            y: 0.3 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.42 * levelWidth,
            y: 0.15 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.45 * levelWidth,
            y: 0.1 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.46 * levelWidth,
            y: 0.5 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.47 * levelWidth,
            y: 0.2 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.50 * levelWidth,
            y: 0.7 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.53 * levelWidth,
            y: 0.1 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.58 * levelWidth,
            y: 0.2 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.66 * levelWidth,
            y: 0.4 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.71 * levelWidth,
            y: 0.4 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.72 * levelWidth,
            y: 0.1 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.77 * levelWidth,
            y: 0.3 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.82 * levelWidth,
            y: 0.1 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.83 * levelWidth,
            y: 0.5 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.85 * levelWidth,
            y: 0.2 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.88 * levelWidth,
            y: 0.3 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.92 * levelWidth,
            y: 0.1 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.91 * levelWidth,
            y: 0.3 * (floorHeight / 2),
            width: 100,
            height: 50
        },
        {
            x: 0.95 * levelWidth,
            y: 0.1 * (floorHeight / 2),
            width: 100,
            height: 50
        },
    ]
}

export const getBushes = (levelWidth: number, floorHeight: number, width: number, height: number):BackgroundItem[] => {

    const newWidth = width * 0.1; // Adjust size as needed
    const newHeight = height * 0.1;

    return [
        {
            x: 0.01 * levelWidth,
            y: floorHeight - newHeight, // Place on the floor
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.1 * levelWidth,
            y: floorHeight - newHeight *2, // Place on the floor
            width: newWidth *1.5,
            height: newHeight *2,
        },
        {
            x: 0.35 * levelWidth,
            y: floorHeight - newHeight, // Place on the floor
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.36 * levelWidth,
            y: floorHeight - newHeight *2, // Place on the floor
            width: newWidth * 1.5,
            height: newHeight * 2,
        },
        {
            x: 0.38 * levelWidth,
            y: floorHeight - newHeight, // Place on the floor
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.39 * levelWidth,
            y: floorHeight - newHeight, // Place on the floor
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.58 * levelWidth,
            y: floorHeight - newHeight, // Place on the floor
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.60 * levelWidth,
            y: floorHeight - newHeight, // Place on the floor
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.61 * levelWidth,
            y: floorHeight - newHeight, // Place on the floor
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.65 * levelWidth,
            y: floorHeight - newHeight *1.2, // Place on the floor
            width: newWidth*1.5,
            height: newHeight*1.2,
        },
        {
            x: 0.67 * levelWidth,
            y: floorHeight - newHeight *1.2, // Place on the floor
            width: newWidth*1.5,
            height: newHeight*1.2,
        },
        {
            x: 0.68 * levelWidth,
            y: floorHeight - newHeight *1.2, // Place on the floor
            width: newWidth*1.5,
            height: newHeight*1.2,
        },
        {
            x: 0.89 * levelWidth,
            y: floorHeight - newHeight , // Place on the floor
            width: newWidth,
            height: newHeight,
        },
    ]
}

export const getBeers = (levelWidth: number, floorHeight: number, width: number, height: number):BackgroundItem[] => {

    const newWidth = width * 0.05; // 50% smaller
    const newHeight = height * 0.05;
    return [
        {
            x: 0.06 * (levelWidth - newWidth),
            y: 0.6 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.152 * (levelWidth - newWidth),
            y: 0.8 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.16 * (levelWidth - newWidth),
            y: 0.8 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.168 * (levelWidth - newWidth),
            y: 0.8 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.176 * (levelWidth - newWidth),
            y: 0.8 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.205 * (levelWidth - newWidth),
            y: 0.9 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.209 * (levelWidth - newWidth),
            y: 0.9 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.225 * (levelWidth - newWidth),
            y: 0.8 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.229 * (levelWidth - newWidth),
            y: 0.8 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.245 * (levelWidth - newWidth),
            y: 0.7 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.249 * (levelWidth - newWidth),
            y: 0.7 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.32 * (levelWidth - newWidth),
            y: 0.7 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.35 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.355 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.360 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.365 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.370 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.375 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.380 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.385 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.390 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.395 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.400 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.405 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.445 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.465 * (levelWidth - newWidth),
            y: 0.85 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.485 * (levelWidth - newWidth),
            y: 0.85 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.505 * (levelWidth - newWidth),
            y: 0.85 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.585 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.590 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.595 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.600 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.625 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.630 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.635 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.640 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.685 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.690 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.695 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.700 * (levelWidth - newWidth),
            y: 0.3 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.804 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.819 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.834 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.849 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.864 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
        {
            x: 0.879 * (levelWidth - newWidth),
            y: 1.2 * (floorHeight / 2),
            width: newWidth,
            height: newHeight,
        },
    ]
}
