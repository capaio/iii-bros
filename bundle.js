/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/firework.ts":
/*!*************************!*\
  !*** ./src/firework.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Firework = void 0;\nvar Firework = /** @class */ (function () {\n    function Firework(x, y) {\n        this.x = x;\n        this.y = y;\n        this.vx = Math.random() * 2 - 1;\n        this.vy = Math.random() * 2 - 1;\n        this.alpha = 1;\n        this.color = \"hsl(\".concat(Math.random() * 360, \", 100%, 50%)\");\n    }\n    Firework.prototype.update = function () {\n        this.x += this.vx;\n        this.y += this.vy;\n        this.alpha -= 0.01;\n    };\n    Firework.prototype.draw = function (context) {\n        context.save();\n        context.globalAlpha = this.alpha;\n        context.fillStyle = this.color;\n        context.beginPath();\n        context.arc(this.x, this.y, 3, 0, Math.PI * 2);\n        context.fill();\n        context.restore();\n    };\n    Firework.prototype.isAlive = function () {\n        return this.alpha > 0;\n    };\n    return Firework;\n}());\nexports.Firework = Firework;\n\n\n//# sourceURL=webpack://super-iii-bros/./src/firework.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar player_1 = __webpack_require__(/*! ./player */ \"./src/player.ts\");\nvar level_1 = __webpack_require__(/*! ./level */ \"./src/level.ts\");\nvar firework_1 = __webpack_require__(/*! ./firework */ \"./src/firework.ts\");\nwindow.onload = function () {\n    var canvas = document.getElementById('gameCanvas');\n    var splashScreen = document.getElementById('splashScreen');\n    var playButton = document.getElementById('playButton');\n    var musicToggleButton = document.getElementById('musicToggleButton');\n    var musicIcon = document.getElementById('musicIcon');\n    var scoreDisplay = document.getElementById('score');\n    var splashMusic = document.getElementById('splashMusic');\n    var gameMusic = document.getElementById('gameMusic');\n    var victorySound = new Audio('victory.mp3');\n    var collectSoundSrc = 'coin.wav';\n    var fireworkSoundSrc = 'firework.wav'; // Firework sound source\n    var leftButton = document.getElementById('leftButton');\n    var rightButton = document.getElementById('rightButton');\n    var jumpButton = document.getElementById('jumpButton');\n    var context = canvas.getContext('2d');\n    var timerDisplay = document.createElement('div');\n    document.body.appendChild(timerDisplay);\n    timerDisplay.style.position = 'absolute';\n    timerDisplay.style.top = '20px';\n    timerDisplay.style.left = '50%';\n    timerDisplay.style.transform = 'translateX(-50%)';\n    timerDisplay.style.fontSize = '24px';\n    timerDisplay.style.fontFamily = '\"Press Start 2P\", cursive';\n    timerDisplay.style.color = 'black';\n    timerDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';\n    timerDisplay.style.border = '2px solid black';\n    timerDisplay.style.padding = '10px';\n    var isMusicPlaying = false;\n    var currentScreen = 'splash'; // Possible values: 'splash', 'game'\n    var screenOffset = 0;\n    var gameOver = false;\n    var victory = false;\n    var timeLeft = 50; // 10 seconds timer\n    splashMusic.play();\n    playButton.addEventListener('click', function () {\n        requestFullscreen(); // Request full screen mode on play button click\n        splashScreen.style.display = 'none';\n        canvas.style.display = 'block';\n        scoreDisplay.style.display = 'block';\n        leftButton.style.display = 'flex';\n        rightButton.style.display = 'flex';\n        jumpButton.style.display = 'flex';\n        splashMusic.pause();\n        currentScreen = 'game';\n        if (isMusicPlaying) {\n            gameMusic.play();\n        }\n        startGame();\n    });\n    musicToggleButton.addEventListener('click', function () {\n        if (currentScreen === 'splash') {\n            if (isMusicPlaying) {\n                splashMusic.pause();\n                musicIcon.classList.remove('fa-volume-up');\n                musicIcon.classList.add('fa-volume-mute');\n            }\n            else {\n                splashMusic.play();\n                musicIcon.classList.remove('fa-volume-mute');\n                musicIcon.classList.add('fa-volume-up');\n            }\n        }\n        else if (currentScreen === 'game') {\n            if (isMusicPlaying) {\n                gameMusic.pause();\n                musicIcon.classList.remove('fa-volume-up');\n                musicIcon.classList.add('fa-volume-mute');\n            }\n            else {\n                gameMusic.play();\n                musicIcon.classList.remove('fa-volume-mute');\n                musicIcon.classList.add('fa-volume-up');\n            }\n        }\n        isMusicPlaying = !isMusicPlaying;\n    });\n    var requestFullscreen = function () {\n        var element = document.documentElement; // Fullscreen the entire document\n        if (element.requestFullscreen) {\n            element.requestFullscreen();\n        }\n    };\n    var startGame = function () {\n        canvas.width = window.innerWidth;\n        canvas.height = window.innerHeight;\n        var player = new player_1.Player();\n        var level = new level_1.Level();\n        var score = 0;\n        var isMovingLeft = false;\n        var isMovingRight = false;\n        var gameLoop = function () {\n            context.clearRect(0, 0, canvas.width, canvas.height);\n            if (!gameOver && !victory) {\n                var maxScreenOffset = level.endMarkerX - canvas.width;\n                // Adjust offset based on movement direction\n                if (isMovingRight && screenOffset < maxScreenOffset) {\n                    screenOffset += player.speed;\n                }\n                // Ensure the screen offset does not go negative or beyond the end marker\n                if (screenOffset < 0) {\n                    screenOffset = 0;\n                }\n                else if (screenOffset > maxScreenOffset) {\n                    screenOffset = maxScreenOffset;\n                }\n                // Adjust player's maxX based on the screenOffset\n                if (screenOffset >= maxScreenOffset) {\n                    player.maxX = 0.7 * canvas.width;\n                }\n                else {\n                    player.maxX = 0.4 * canvas.width;\n                }\n                // Update the player's position\n                player.update(level.levelWidth);\n                // Ensure the player does not go back behind position 0\n                if (player.x < 0) {\n                    player.x = 0;\n                }\n                level.update(player, screenOffset);\n                // Check for victory condition\n                if (screenOffset >= maxScreenOffset && player.x >= player.maxX) {\n                    victory = true;\n                    showVictoryScreen();\n                }\n            }\n            // Pass screenOffset to level.draw\n            level.draw(context, screenOffset);\n            player.draw(context);\n            // Draw fireworks if victory\n            if (victory) {\n                for (var _i = 0, fireworks_1 = fireworks; _i < fireworks_1.length; _i++) {\n                    var firework = fireworks_1[_i];\n                    firework.update();\n                    firework.draw(context);\n                }\n                // Remove dead fireworks\n                fireworks = fireworks.filter(function (firework) { return firework.isAlive(); });\n            }\n            // Update and draw score\n            scoreDisplay.textContent = score.toString().padStart(3, '0');\n            requestAnimationFrame(gameLoop);\n        };\n        var updateTimer = function () {\n            if (!gameOver && !victory) {\n                timeLeft -= 1;\n                timerDisplay.textContent = \"Time: \".concat(timeLeft);\n                if (timeLeft <= 0) {\n                    gameOver = true;\n                    player.showGameOver();\n                }\n                else {\n                    setTimeout(updateTimer, 1000);\n                }\n            }\n        };\n        var fireworks = [];\n        var showVictoryScreen = function () {\n            var victoryText = document.createElement('div');\n            victoryText.innerText = 'VICTORY';\n            victoryText.style.position = 'absolute';\n            victoryText.style.top = '50%';\n            victoryText.style.left = '50%';\n            victoryText.style.transform = 'translate(-50%, -50%)';\n            victoryText.style.fontSize = '48px';\n            victoryText.style.color = 'black';\n            victoryText.style.fontFamily = '\"Press Start 2P\", cursive';\n            victoryText.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';\n            victoryText.style.border = '2px solid black';\n            victoryText.style.padding = '20px';\n            victoryText.style.textAlign = 'center';\n            var codeText = document.createElement('div');\n            codeText.innerText = 'Your code is 268';\n            codeText.style.fontSize = '24px';\n            codeText.style.marginTop = '10px';\n            victoryText.appendChild(codeText);\n            document.body.appendChild(victoryText);\n            // Stop all other music and play victory sound\n            splashMusic.pause();\n            gameMusic.pause();\n            victorySound.play();\n            // Create initial fireworks\n            createFirework();\n            window.dispatchEvent(new Event('victory'));\n        };\n        var countFireworksSound = 0;\n        var createFirework = function () {\n            countFireworksSound += 1;\n            var x = Math.random() * canvas.width;\n            var y = Math.random() * canvas.height;\n            for (var i = 0; i < 100; i++) {\n                fireworks.push(new firework_1.Firework(x, y));\n            }\n            // Play firework sound\n            if (countFireworksSound < 10) {\n                var fireworkSound = new Audio(fireworkSoundSrc);\n                fireworkSound.play();\n            }\n            // Schedule the next firework\n            var nextFireworkTime = Math.random() * 400 + 100; // Random time between 0.1 and 0.5 seconds\n            setTimeout(createFirework, nextFireworkTime);\n        };\n        // Touch controls for canvas\n        canvas.addEventListener('touchstart', function (e) {\n            var touch = e.touches[0];\n            if (touch.clientX < canvas.width / 2) {\n                isMovingLeft = true;\n                player.moveLeft();\n            }\n            else {\n                isMovingRight = true;\n                player.moveRight();\n            }\n        });\n        canvas.addEventListener('touchend', function () {\n            isMovingLeft = false;\n            isMovingRight = false;\n            player.stop();\n        });\n        // Button controls\n        leftButton.addEventListener('touchstart', function () {\n            isMovingLeft = true;\n            player.moveLeft();\n        });\n        leftButton.addEventListener('touchend', function () {\n            isMovingLeft = false;\n            player.stop();\n        });\n        rightButton.addEventListener('touchstart', function () {\n            isMovingRight = true;\n            player.moveRight();\n        });\n        rightButton.addEventListener('touchend', function () {\n            isMovingRight = false;\n            player.stop();\n        });\n        jumpButton.addEventListener('touchstart', function () {\n            player.jump();\n        });\n        // Listen for item collection\n        window.addEventListener('itemCollected', function () {\n            score += 1;\n            var collectSound = new Audio(collectSoundSrc);\n            collectSound.play();\n        });\n        // Listen for game over event\n        window.addEventListener('gameOver', function () {\n            gameOver = true;\n        });\n        // Listen for victory event\n        window.addEventListener('victory', function () {\n            victory = true;\n        });\n        gameLoop();\n        updateTimer();\n    };\n};\n\n\n//# sourceURL=webpack://super-iii-bros/./src/game.ts?");

/***/ }),

/***/ "./src/level.ts":
/*!**********************!*\
  !*** ./src/level.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Level = void 0;\nvar Level = /** @class */ (function () {\n    function Level() {\n        var _this = this;\n        this.beerItems = [];\n        this.clouds = [];\n        this.bushes = [];\n        this.enemies = [];\n        this.holeWidth = 100; // Width of the hole\n        this.floorHeight = window.innerHeight - 40; // Adjusted floor height\n        this.levelWidth = 10 * window.innerWidth; // Level length 10x screen width\n        this.holeX = this.levelWidth - this.holeWidth - 100; // Position of the hole from the end\n        this.endMarkerX = this.levelWidth - 50; // Position of the end marker\n        this.cloudImage = new Image();\n        this.cloudImage.src = 'cloud.png';\n        this.bushImage = new Image();\n        this.bushImage.src = 'bush.png';\n        this.enemyImage = new Image();\n        this.enemyImage.src = 'enemy.png';\n        this.gameOver = false;\n        var _loop_1 = function (i) {\n            var beerImage = new Image();\n            beerImage.src = 'beer.png';\n            beerImage.onload = function () {\n                var width = beerImage.width * 0.05; // 50% smaller\n                var height = beerImage.height * 0.05;\n                _this.beerItems.push({\n                    x: Math.random() * (_this.levelWidth - width),\n                    y: Math.random() * (_this.floorHeight - height - 40), // Ensure it's above the floor\n                    width: width,\n                    height: height,\n                    image: beerImage\n                });\n            };\n        };\n        // Add 15 beer items\n        for (var i = 0; i < 15; i++) {\n            _loop_1(i);\n        }\n        // Add 20 clouds\n        for (var i = 0; i < 20; i++) {\n            this.clouds.push({\n                x: Math.random() * this.levelWidth,\n                y: Math.random() * (this.floorHeight / 2),\n                width: 100,\n                height: 50\n            });\n        }\n        // Add 15 bushes\n        this.bushImage.onload = function () {\n            for (var i = 0; i < 15; i++) {\n                var width = _this.bushImage.width * 0.1; // Adjust size as needed\n                var height = _this.bushImage.height * 0.1;\n                _this.bushes.push({\n                    x: Math.random() * _this.levelWidth,\n                    y: _this.floorHeight - height, // Place on the floor\n                    width: width,\n                    height: height,\n                    image: _this.bushImage\n                });\n            }\n        };\n        // Add 5 enemies\n        this.enemyImage.onload = function () {\n            for (var i = 0; i < 5; i++) {\n                var width = _this.enemyImage.width * 0.1; // Adjust size as needed\n                var height = _this.enemyImage.height * 0.1;\n                _this.enemies.push({\n                    x: window.innerWidth + Math.random(), // Spawn just outside the level on the right\n                    y: _this.floorHeight - height, // Place on the floor\n                    width: width,\n                    height: height,\n                    image: _this.enemyImage,\n                    speed: 4 // Adjust speed as needed\n                });\n            }\n        };\n    }\n    Level.prototype.update = function (player, screenOffset) {\n        var _this = this;\n        if (this.gameOver) {\n            return; // Do not update anything if the game is over\n        }\n        // Check if the player falls into the hole\n        if (player.x > this.holeX - screenOffset &&\n            player.x + player.width < this.holeX - screenOffset + this.holeWidth &&\n            player.y + player.height >= this.floorHeight) {\n            player.fall();\n        }\n        // Check for beer collection\n        this.beerItems = this.beerItems.filter(function (item) {\n            var adjustedX = item.x - screenOffset;\n            if (player.x < adjustedX + item.width &&\n                player.x + player.width > adjustedX &&\n                player.y < item.y + item.height &&\n                player.y + player.height > item.y) {\n                // Beer collected\n                window.dispatchEvent(new Event('itemCollected'));\n                return false; // Remove the item\n            }\n            return true; // Keep the item\n        });\n        // Update enemy positions and check for collisions with the player\n        this.enemies.forEach(function (enemy) {\n            enemy.x -= enemy.speed; // Move enemy left\n            var adjustedX = enemy.x - screenOffset;\n            if (player.x < adjustedX + enemy.width &&\n                player.x + player.width > adjustedX &&\n                player.y < enemy.y + enemy.height &&\n                player.y + player.height > enemy.y) {\n                // Player touches enemy\n                player.showGameOver();\n                _this.gameOver = true; // Set game over flag\n            }\n        });\n        // Remove enemies that have gone off the left side of the screen\n        this.enemies = this.enemies.filter(function (enemy) { return enemy.x + enemy.width > screenOffset; });\n    };\n    Level.prototype.draw = function (context, offsetX) {\n        var _this = this;\n        // Draw the floor\n        context.fillStyle = '#954b0c';\n        context.fillRect(-offsetX, this.floorHeight, this.levelWidth, 40);\n        // Draw the hole\n        context.fillStyle = 'black';\n        context.fillRect(this.holeX - offsetX, this.floorHeight, this.holeWidth, 40);\n        // Draw the end marker\n        context.fillStyle = 'green';\n        context.fillRect(this.endMarkerX - offsetX, this.floorHeight - 40, 50, 80);\n        // Draw beer items\n        this.beerItems.forEach(function (item) {\n            context.drawImage(item.image, item.x - offsetX, item.y, item.width, item.height);\n        });\n        // Draw clouds\n        this.clouds.forEach(function (cloud) {\n            context.drawImage(_this.cloudImage, cloud.x - offsetX, cloud.y, cloud.width, cloud.height);\n        });\n        // Draw bushes\n        this.bushes.forEach(function (bush) {\n            context.drawImage(bush.image, bush.x - offsetX, bush.y, bush.width, bush.height);\n        });\n        // Draw enemies\n        this.enemies.forEach(function (enemy) {\n            context.drawImage(enemy.image, enemy.x - offsetX, enemy.y, enemy.width, enemy.height);\n        });\n    };\n    return Level;\n}());\nexports.Level = Level;\n\n\n//# sourceURL=webpack://super-iii-bros/./src/level.ts?");

/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Player = void 0;\nvar Player = /** @class */ (function () {\n    function Player() {\n        var _this = this;\n        this.velocityY = 0;\n        this.velocityX = 0;\n        this.speed = 5;\n        this.gravity = 0.5;\n        this.isOnGround = false;\n        this.isMovingLeft = false;\n        this.isFalling = false;\n        this.gameOver = false;\n        this.image = new Image();\n        this.image.src = 'iii.png';\n        this.x = 0.05 * window.innerWidth; // Spawn 5% from the left\n        this.y = 0;\n        this.width = 0;\n        this.height = 0;\n        this.aspectRatio = 0;\n        this.image.onload = function () {\n            _this.aspectRatio = _this.image.width / _this.image.height;\n            _this.height = 0.25 * window.innerHeight; // 25% of the window height\n            _this.width = _this.height * _this.aspectRatio; // Maintain the aspect ratio\n            _this.adjustPosition();\n        };\n        this.jumpStrength = 18; // Jump height is twice the character height\n        this.jumpSound = document.getElementById('jumpSound');\n        this.maxX = 0.4 * window.innerWidth; // Initially, the player can move up to 40% of the screen width\n        window.addEventListener('keydown', function (e) { return _this.onKeyDown(e); });\n        window.addEventListener('keyup', function (e) { return _this.onKeyUp(e); });\n        window.addEventListener('resize', function () { return _this.onResize(); }); // Handle screen resize\n    }\n    Player.prototype.onKeyDown = function (e) {\n        if (this.isFalling || this.gameOver)\n            return; // Disable controls if falling or game over\n        if (e.code === 'ArrowLeft') {\n            this.moveLeft();\n        }\n        else if (e.code === 'ArrowRight') {\n            this.moveRight();\n        }\n        else if (e.code === 'Space') {\n            this.jump();\n        }\n    };\n    Player.prototype.onKeyUp = function (e) {\n        if (this.isFalling || this.gameOver)\n            return; // Disable controls if falling or game over\n        if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {\n            this.stop();\n        }\n    };\n    Player.prototype.moveLeft = function () {\n        if (this.isFalling || this.gameOver)\n            return; // Disable controls if falling or game over\n        this.velocityX = -this.speed;\n        this.isMovingLeft = true;\n    };\n    Player.prototype.moveRight = function () {\n        if (this.isFalling || this.gameOver)\n            return; // Disable controls if falling or game over\n        this.velocityX = this.speed;\n        this.isMovingLeft = false;\n    };\n    Player.prototype.stop = function () {\n        if (this.isFalling || this.gameOver)\n            return; // Disable controls if falling or game over\n        this.velocityX = 0;\n    };\n    Player.prototype.jump = function () {\n        if (this.isFalling || this.gameOver)\n            return; // Disable controls if falling or game over\n        if (this.isOnGround) {\n            this.velocityY = -this.jumpStrength;\n            this.isOnGround = false;\n            this.jumpSound.play();\n        }\n    };\n    Player.prototype.fall = function () {\n        this.isFalling = true;\n        this.velocityX = 0;\n        this.velocityY = 10; // Faster fall speed\n        this.isOnGround = false;\n    };\n    Player.prototype.update = function (levelWidth) {\n        if (this.isFalling) {\n            this.y += this.velocityY;\n            this.velocityY += this.gravity;\n            if (this.y > window.innerHeight) {\n                this.showGameOver();\n            }\n            return;\n        }\n        this.x += this.velocityX;\n        this.y += this.velocityY;\n        // Ensure player does not go beyond the left edge\n        if (this.x < 0) {\n            this.x = 0;\n        }\n        var floorHeight = window.innerHeight - 40; // Adjusted floor height\n        if (this.y + this.height < floorHeight) {\n            this.velocityY += this.gravity;\n            this.isOnGround = false;\n        }\n        else {\n            this.y = floorHeight - this.height;\n            this.velocityY = 0;\n            this.isOnGround = true;\n        }\n        // Ensure player does not go beyond the right edge of the level\n        if (this.x > levelWidth - this.width) {\n            this.x = levelWidth - this.width;\n        }\n        // Ensure player does not go beyond maxX\n        if (this.x > this.maxX) {\n            this.x = this.maxX;\n        }\n    };\n    Player.prototype.showGameOver = function () {\n        if (this.gameOver)\n            return; // Check if the game over screen is already shown\n        this.gameOver = true;\n        var gameOverText = document.createElement('div');\n        gameOverText.innerText = 'GAME OVER';\n        gameOverText.style.position = 'absolute';\n        gameOverText.style.top = '50%';\n        gameOverText.style.left = '50%';\n        gameOverText.style.transform = 'translate(-50%, -50%)';\n        gameOverText.style.fontSize = '42px';\n        gameOverText.style.color = 'black';\n        gameOverText.style.fontFamily = '\"Press Start 2P\", cursive';\n        gameOverText.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';\n        gameOverText.style.border = '2px solid black';\n        gameOverText.style.padding = '20px';\n        gameOverText.style.textAlign = 'center';\n        var restartButton = document.createElement('button');\n        restartButton.innerText = 'RESTART';\n        restartButton.style.marginTop = '20px';\n        restartButton.style.padding = '10px 20px';\n        restartButton.style.fontSize = '24px';\n        restartButton.style.cursor = 'pointer';\n        restartButton.style.backgroundColor = 'black';\n        restartButton.style.color = 'white';\n        restartButton.style.border = '2px solid white';\n        restartButton.style.fontFamily = '\"Press Start 2P\", cursive';\n        restartButton.onclick = function () {\n            window.location.reload();\n        };\n        gameOverText.appendChild(restartButton);\n        document.body.appendChild(gameOverText);\n        window.dispatchEvent(new Event('gameOver'));\n    };\n    Player.prototype.onResize = function () {\n        var oldHeight = this.height;\n        var oldWidth = this.width;\n        this.height = 0.25 * window.innerHeight; // 25% of the window height\n        this.width = this.height * this.aspectRatio; // Maintain the aspect ratio\n        // Adjust player position proportionally\n        this.x = this.x * (this.width / oldWidth);\n        this.y = this.y * (this.height / oldHeight);\n        this.maxX = 0.4 * window.innerWidth; // Update maxX based on new window width\n    };\n    Player.prototype.adjustPosition = function () {\n        this.height = 0.25 * window.innerHeight; // 25% of the window height\n        this.width = this.height * this.aspectRatio; // Maintain the aspect ratio\n        this.x = 0.05 * window.innerWidth; // Adjust x based on new width\n    };\n    Player.prototype.draw = function (context) {\n        if (this.isMovingLeft) {\n            context.save();\n            context.scale(-1, 1);\n            context.drawImage(this.image, -this.x - this.width, this.y, this.width, this.height);\n            context.restore();\n        }\n        else {\n            context.drawImage(this.image, this.x, this.y, this.width, this.height);\n        }\n    };\n    return Player;\n}());\nexports.Player = Player;\n\n\n//# sourceURL=webpack://super-iii-bros/./src/player.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game.ts");
/******/ 	
/******/ })()
;