let BattleScene = cc.Scene.extend({
    _myGameLoop: null,
    _enemyGameLoop: null,
    _objectLayer : null,
    _info : null,

    /** @returns {GameLoop} */
    getMyGameLoop : function() {
        return this._myGameLoop
    },

    /** @returns {GameLoop} */
    getEnemyGameLoop : function(){
        return this._enemyGameLoop
    },

    setObjectLayer : function(objectLayer) {
        this._objectLayer = objectLayer
    },
    getObjectLayer : function() {
        return this._objectLayer
    },

    /**
     * @param {Info} info
     */
    setInfo : function(info) {
        this._info = info
    },

    /** @returns {Info} */
    getInfo : function() {
        return this._info
    },

    /** @param {BattleInitiator} battleInitiator */
    ctor : function(battleInitiator) {
        cc.log(JSON.stringify(battleInitiator))
        this._super()
        this.initGameLoop(battleInitiator)
        this.setInfo(new Info(battleInitiator))
        this.initLayer()
    },

    initGameLoop : function(battleInitiator) {
        this._myGameLoop = new GameLoop(BattleUtil.Who.Mine, battleInitiator.myMap, false)
        this._enemyGameLoop = new GameLoop(BattleUtil.Who.Enemy, battleInitiator.eMap, false)

        // Lặp GameLoop của sân mình
        this.schedule(function() {
            this._myGameLoop.update()
        }.bind(this), BattleConfig.TICK_DURATION)

        // Lặp GameLoop của sân đối phương
        this.schedule(function() {
            this._enemyGameLoop.update()
        }.bind(this), BattleConfig.TICK_DURATION)
    },

    initLayer : function() {
        // Khởi tạo Background
        let backgroundDecorationLayer = new BackgroundDecorationLayer()
        this.addChild(backgroundDecorationLayer, BattleConfig.BackgroundLayer.zOrder, 0)

        // Khởi tạo Map
        let mapLayer = new MapLayer(this._myGameLoop.getMapController(), this._enemyGameLoop.getMapController())
        this.addChild(mapLayer,  BattleConfig.MapLayer.zOrder, 0)

        // Khởi tạo UI dành cho người dùng tương tác
        let battleUILayer = new BattleUILayer(this.getInfo(), this.getMyGameLoop().getMapController())
        this.addChild(battleUILayer, BattleConfig.UILayer.zOrder, 0)

        // Khởi tạo ObjectLayer chứa quái và trụ
        let objectLayer = new ObjectLayer()
        this.addChild(objectLayer, BattleConfig.ObjectLayer.zOrder, 0)
        this.setObjectLayer(objectLayer)
    },

    /**
     * @param {BattleUtil.Who.Enemy | BattleUtil.Who.Mine} who
     * @return {MapController}
     * */
    getMapController : function(who) {
        if (who === BattleUtil.Who.Mine){
            return this.getMyGameLoop().getMapController()
        } else {
            return this.getEnemyGameLoop().getMapController()
        }
    },
})
