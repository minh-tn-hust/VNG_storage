let OnGameScene = cc.Scene.extend({
    _gameLayer : null,
    getGameLayer : function() {
        return this._gameLayer
    },

    setGameLayer : function(gameLayer) {
        this._gameLayer = gameLayer
    },

    ctor : function () {
        this._super()
        this.init()
    },
    init : function() {
        let uiLayer = new UIGameLayer()
        this.addChild(uiLayer, 2, OnGameScene.uiLayer)

        let gameLayer = new GameGroundLayer()
        this.addChild(gameLayer, -1, OnGameScene.backgroundLayer)

        let gameMap = gameLayer.getMap()
        let monsterLayer = new MonsterLayer(gameMap)
        this.addChild(monsterLayer, 1, OnGameScene.monsterLayer)

    }
})

OnGameScene.backgroundLayer = 1
OnGameScene.monsterLayer = 2
OnGameScene.uiLayer = 3