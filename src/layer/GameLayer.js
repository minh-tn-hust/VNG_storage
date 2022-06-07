const LEFT = 1
const RIGHT = -1
const UP = 2
const DOWN = -2

let GameLayer = cc.Layer.extend({
    _snake : null,

    getSnake : function () {
        return this._snake
    },

    getSnakeHeadSprite : function() {
        return this._snake.getSnakeHead().sprite
    },

    setSnake : function ( newSnake) {
        this._snake =  newSnake
    },

    _score : 0,

    getScore : function () {
        return this._apple._count
    },

    _apple : null,

    getAppleSprite : function() {
        return this._apple.getAppleSprite()
    },

    _scene : null,


    ctor : function (scene) {
        this._scene = scene
        this._super()
        this.init()
    },

    init : function () {
        this.removeAllChildren()

        this.initBackground()

        this.setSnake(new Snake(this._scene))
        this._apple = new Apple()
        this.addChild(this._apple.getAppleSprite())
        let snakeSprites = this.getSnake().getSnakeSprite()
        for (let part of snakeSprites) {
            if (part.isHead) {
                this.addChild(part.sprite , 100)
            } else {
                this.addChild(part.sprite)
            }
        }
        this.scheduleUpdate()
        this.keyboardHandle()
        let score = new cc.LabelTTF("0", "Ethnocentric Rg", 20)
        score.x = 100;
        score.y = WIN_SIZE.height - 50;
        score.color = cc.color(255, 255, 255);
        this._score = score
        this.addChild(score, 1000);
    },

    initBackground : function() {
        let winSize = cc.winSize
        let backgroundSprite = new cc.Sprite(BACK_GROUND)
        backgroundSprite.setPosition(cc.p({
            x: winSize.width / 2,
            y: winSize.height / 2 - 210
        }))
        backgroundSprite.setContentSize(winSize.height, winSize.height)
        this.addChild(backgroundSprite, -1)
    },






    update : function() {
        this.getSnake().moveFrameByFrame()
        if (cc.director.isPaused()) {
            let gameOverLayer = this._scene.getChildByTag(4)
            gameOverLayer._scoreSprite.setString(this._apple._count.toString())
        }
        if (Utils.spriteCollision(this.getAppleSprite(), this.getSnakeHeadSprite())) {
            this._apple.randomPosition()
            let newSnakeNode = this.getSnake().eatAppleHandle()
            this._score.setString("" + this._apple._count.toString())
            this.addChild(newSnakeNode.sprite)
            Utils.runEatingSoundEffect()
        }
    },


    keyboardHandle : function() {
        let self = this
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (key, event) {
                if (!cc.Director.getInstance().isPaused()) {
                    switch (key) {
                        case KEYPRESS.UP:
                            self._snake.moveUp()
                            break
                        case KEYPRESS.DOWN:
                            self._snake.moveDown()
                            break
                        case KEYPRESS.LEFT:
                            self._snake.moveLeft()
                            break
                        case KEYPRESS.RIGHT:
                            self._snake.moveRight()
                            break
                    }
                }
            }
        }, this)
    }
});

GameLayer.scene = function () {
    let scene = new cc.Scene()
    let gameLayer = new GameLayer(scene)
    let menuLayer = new GameMenuLayer(scene)
    let pauseLayer = new PauseGameLayer(scene)
    let gameoverLayer = new GameOverLayer(scene)
    pauseLayer.setVisible(false)
    gameoverLayer.setVisible(false)
    scene.addChild(gameLayer, 0, 1)
    scene.addChild(menuLayer, 1, 2)
    scene.addChild(pauseLayer, 2, 3)
    scene.addChild(gameoverLayer, 2, 4)
    return scene;
};

