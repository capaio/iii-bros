const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

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
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed)
        }),
        new HtmlWebpackPlugin({
            template: './index.html', // Source HTML file
            filename: 'index.html' // Output HTML file
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: `./assets/cordova/${process.env.ICON}`, to: `${process.env.ICON}` },
                { from: `./assets/imgs/${process.env.COLLECTIBLE_IMAGE}`, to: `${process.env.COLLECTIBLE_IMAGE}` },
                { from: `./assets/imgs/${process.env.BUSH_IMAGE}`, to: `${process.env.BUSH_IMAGE}` },
                { from: `./assets/imgs/${process.env.CLOUD_IMAGE}`, to: `${process.env.CLOUD_IMAGE}` },
                { from: `./assets/imgs/${process.env.NPC_IMAGE}`, to: `${process.env.NPC_IMAGE}` },
                { from: `./assets/imgs/${process.env.LEVEL_1_CASTLE}`, to: `${process.env.LEVEL_1_CASTLE}` },
                { from: `./assets/imgs/${process.env.LEVEL_2_CASTLE}`, to: `${process.env.LEVEL_2_CASTLE}` },
                { from: `./assets/imgs/${process.env.PLAYER}`, to: `${process.env.PLAYER}` },
                { from: `./assets/imgs/${process.env.SPLASH_SCREEN}`, to: `${process.env.SPLASH_SCREEN}` },
                { from: `./assets/imgs/brick.png`, to: `brick.png` },
                { from: `./assets/music/coin.wav`, to: `coin.wav` },
                { from: `./assets/music/firework.wav`, to: `firework.wav` },
                { from: `./assets/music/jump.wav`, to: `jump.wav` },
                { from: `./assets/music/level-completed.wav`, to: `level-completed.wav` },
                { from: `./assets/music/splash-music.mp3`, to: `splash-music.mp3` },
                { from: `./assets/music/victory.mp3`, to: `victory.mp3` },
                { from: `./assets/music/game-music.mp3`, to: `game-music.mp3` },
                { from: `./assets/music/gameover.mp3`, to: `gameover.mp3` },
            ],
        }),
    ],
    devServer: {
        static: './cordova/www',
    },
    mode: 'production', // Can be 'development' or 'production'
};
