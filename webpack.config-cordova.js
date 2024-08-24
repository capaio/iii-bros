const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/game.ts', // Entry TypeScript file
    output: {
        filename: 'bundle.js', // Output bundle name
        path: path.resolve(__dirname, 'cordova/www'), // Output directory
        clean: true, // Clean the output directory before emit
    },
    resolve: {
        extensions: ['.ts', '.js'], // Add `.ts` and `.js` as resolvable extensions
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // For TypeScript files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i, // For image files
                type: 'asset/resource',
            },
            {
                test: /\.(mp3|wav)$/i, // For sound files
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // Source HTML file
            filename: 'index.html' // Output HTML file
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './assets/imgs/beer.png', to: 'beer.png' },
                { from: './assets/imgs/bush.png', to: 'bush.png' },
                { from: './assets/imgs/cloud.png', to: 'cloud.png' },
                { from: './assets/imgs/enemy.png', to: 'enemy.png' },
                { from: './assets/imgs/brick.png', to: 'brick.png' },
                { from: './assets/imgs/castle.webp', to: 'castle.webp' },
                { from: './assets/imgs/iii.png', to: 'iii.png' },
                { from: './assets/imgs/splash_screen.webp', to: 'splash_screen.webp' },
                { from: './assets/music/coin.wav', to: 'coin.wav' },
                { from: './assets/music/firework.wav', to: 'firework.wav' },
                { from: './assets/music/jump.wav', to: 'jump.wav' },
                { from: './assets/music/level-completed.wav', to: 'level-completed.wav' },
                { from: './assets/music/splash-music.mp3', to: 'splash-music.mp3' },
                { from: './assets/music/victory.mp3', to: 'victory.mp3' },
                { from: './assets/music/game-music.mp3', to: 'game-music.mp3' },
                { from: './assets/music/gameover.mp3', to: 'gameover.mp3' },
                { from: './assets/cordova/icon.jpeg', to: 'icon.jpeg' },
                { from: './assets/cordova/capaio-gaming-splash.png', to: 'capaio-gaming-splash.png' },
            ],
        }),
    ],
    devServer: {
        static: './cordova/www',
    },
    mode: 'development', // Can be 'development' or 'production'
};
