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
        let gameLayer = new GameGroundLayer()
        this.addChild(gameLayer)


        let monsterLayer = new MonsterLayer()
        this.addChild(monsterLayer)
    }
})