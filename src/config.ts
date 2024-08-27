const getVariable = <T extends string|number>(name: string): T => {
    if(process.env[name] === undefined) {
        throw new Error(`Variable ${name} is not defined`)
    }
    switch (typeof process.env[name]) {
        case 'string':
            return process.env[name].toString() as T
        case 'number':
            return parseFloat(process.env[name]) as unknown as T
        default:
            throw new Error(`Variable ${name} is not a string, number or boolean`)
    }
}

export const config = {
    victoryWrite: getVariable<string>('VICTORY_WRITE'),
    endLevelWrite: getVariable<string>('END_LEVEL_WRITE'),
    splashScreen: getVariable<string>('SPLASH_SCREEN'),
    player: getVariable<string>('PLAYER'),
    time: getVariable<number>('TIME_LEFT'),
    totalLevels: getVariable<number>('TOTAL_LEVELS'),
    level1: {
        background: getVariable<string>('LEVEL_1_BG'),//'turquoise',
        holesColor: getVariable<string>('LEVEL_1_HOLE'),//'black',
        castleImage: getVariable<string>('LEVEL_1_CASTLE'),//'castle.webp',
    },
    level2: {
        background: getVariable<string>('LEVEL_2_BG'),//'turquoise',
        holesColor: getVariable<string>('LEVEL_2_HOLE'),//'black',
        castleImage: getVariable<string>('LEVEL_2_CASTLE'),//'castle.webp',
    },
    items: {
        bush: {
            image: getVariable<string>('BUSH_IMAGE'), // 'bush.png',
            width: getVariable<number>('BUSH_WIDTH'), // 0.10,
            height: getVariable<number>('BUSH_HEIGHT'), // 0.20,
        },
        cloud: {
            image: getVariable<string>('CLOUD_IMAGE'), // 'cloud.png',
            width: getVariable<number>('CLOUD_WIDTH'), // 0.12,
            height: getVariable<number>('CLOUD_HEIGHT'), // 0.12,
        },
        collectible: {
            image: getVariable<string>('COLLECTIBLE_IMAGE'), // 'beer.png',
            width: getVariable<number>('COLLECTIBLE_WIDTH'), // 0.04,
            height: getVariable<number>('COLLECTIBLE_HEIGHT'), // 0.08,
        },
    },
    npcs: {
        turtle: {
            image: getVariable<string>('NPC_IMAGE'), //'enemy.png',
            width: getVariable<number>('NPC_WIDTH'), //0.10,
            height: getVariable<number>('NPC_HEIGHT'), //0.10,
        },

    },
}


