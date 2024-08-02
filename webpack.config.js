const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/game.ts', // Entry TypeScript file
    output: {
        filename: 'bundle.js', // Output bundle name
        path: path.resolve(__dirname, 'dist'), // Output directory
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
                { from: './beer.png', to: 'beer.png' },
                { from: './bush.png', to: 'bush.png' },
                { from: './cloud.png', to: 'cloud.png' },
                { from: './enemy.png', to: 'enemy.png' },
                { from: './iii.png', to: 'iii.png' },
                { from: './splash_screen.webp', to: 'splash_screen.webp' },
                { from: './coin.wav', to: 'coin.wav' },
                { from: './firework.wav', to: 'firework.wav' },
                { from: './jump.wav', to: 'jump.wav' },
                { from: './level-completed.wav', to: 'level-completed.wav' },
                { from: './splash-music.mp3', to: 'splash-music.mp3' },
                { from: './victory.mp3', to: 'victory.mp3' },
                { from: './game-music.mp3', to: 'game-music.mp3' },
                { from: './_config.yml', to: '_config.yml' },
            ],
        }),
    ],
    devServer: {
        static: './dist',
    },
    mode: 'development', // Can be 'development' or 'production'
};
