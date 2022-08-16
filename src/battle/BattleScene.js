let BattleScene = cc.Scene.extend({
    _myGameLoop: null,
    _enemyGameLoop: null,
    _objectLayer : null,
    _info : null,
    _serverTick : null,
    _timeStamp : null,
    _mapLayer : null,
    _end : null,

    /** @returns {GameLoop} */
    getMyGameLoop : function() {return this._myGameLoop},
    getTimestamp : function() {return this._timeStamp},
    /** @returns {GameLoop} */
    getEnemyGameLoop : function(){return this._enemyGameLoop },
    getObjectLayer : function() { return this._objectLayer },
    getServerTick : function() {return this._serverTick},
    getMapLayer : function() {return this._mapLayer},
    /** @returns {Info} */
    getInfo : function() { return this._info },

    // SETTER
    setObjectLayer : function(objectLayer) { this._objectLayer = objectLayer },
    setServerTick : function(value) {this._serverTick = value},
    setTimeStamp : function(value) {this._timeStamp = value},
    setMapLayer : function(mapLayer) {this._mapLayer = mapLayer},
    /**
     * @param {Info} info
     */
    setInfo : function(info) { this._info = info },

    /** @param {BattleInitiator} battleInitiator */
    ctor : function(battleInitiator) {
        this._super()
        this.initGameLoop(battleInitiator)
        this.setInfo(new Info(battleInitiator))
        this.initLayer()
        this.scheduleUpdate()
        this.setServerTick(0)

        this.schedule(function(){
            this.setServerTick(this.getServerTick() + 1)
        }.bind(this), 0.1)

        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE,this.onGameHide.bind(this));
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW,this.onGameShow.bind(this));
    },

    onGameHide : function() {
        this.setTimeStamp(Date.now())
    },

    onGameShow : function() {
        if (this.getTimestamp() !== null) {
            cc.log("SHOW GAME")
            let deltaTimeStamp = Date.now() - this.getTimestamp()
            let deltaTick = Math.round((deltaTimeStamp / 1000) / BattleConfig.TICK_DURATION)
            this.setServerTick(this.getServerTick() + deltaTick)
            this.speedUpGameLoop(BattleUtil.Who.Enemy, BattleConfig.TICK_DURATION / 10)
            this.speedUpGameLoop(BattleUtil.Who.Mine, BattleConfig.TICK_DURATION / 10)
            this.setTimeStamp(null)
        }
    },

    initGameLoop : function(battleInitiator) {
        this._myGameLoop = new GameLoop(BattleUtil.Who.Mine, battleInitiator.myMap, false)
        this._enemyGameLoop = new GameLoop(BattleUtil.Who.Enemy, battleInitiator.eMap, false)

        // Lặp GameLoop của sân mình
        this.schedule(this.updateMyGameLoop, BattleConfig.TICK_DURATION)

        // Lặp GameLoop của sân đối phương
        this.schedule(this.updateEnemyGameLoop, BattleConfig.TICK_DURATION)
    },

    update : function() {
        if (this._enemyGameLoop.getTick() > this.getServerTick()) {
            this.speedUpGameLoop(BattleUtil.Who.Enemy, BattleConfig.TICK_DURATION)
        }
        if (this._myGameLoop.getTick() > this.getServerTick()) {
            this.speedUpGameLoop(BattleUtil.Who.Mine, BattleConfig.TICK_DURATION)
        }
    },

    showResult : function() {
        this.unschedule(this.updateMyGameLoop)
        this.unschedule(this.updateEnemyGameLoop)
        let scaleTo = cc.scaleTo(2, 0.8).easing(cc.easeBackOut(2))
        let objectLayer = this.getChildByTag(BattleScene.OBJ_TAG)
        let decorLayer = this.getChildByTag(BattleScene.DECOR_TAG)
        let mapLayer = this.getChildByTag(BattleScene.MAP_TAG)
        objectLayer.runAction(scaleTo)
        decorLayer.runAction(scaleTo.clone())
        let callFunc = cc.callFunc(function(){
            let resultLayer = new ResultLayer(this.getInfo())
            this.addChild(resultLayer, 100000, 1)
        }.bind(this))
        mapLayer.runAction(cc.sequence(scaleTo.clone(), callFunc))
    },

    updateMyGameLoop : function() {
        this._myGameLoop.update()
    },
    updateEnemyGameLoop : function() {
        this._enemyGameLoop.update()
    },


    speedUpGameLoop : function(who, speedDuration) {
        if (who === BattleUtil.Who.Mine) {
            this.unschedule(this.updateMyGameLoop)
            this.schedule(this.updateMyGameLoop, speedDuration)
        } else {
            this.unschedule(this.updateEnemyGameLoop)
            this.schedule(this.updateEnemyGameLoop, speedDuration)
        }
    },

    initLayer : function() {
        let backgroundImage = cc.Sprite("res/map_asset/map_background.png")
        backgroundImage.setScale(100)
        backgroundImage.setPosition(cc.winSize.width / 2, cc.winSize.height /2)
        this.addChild(backgroundImage, -1000, 0)
        // Khởi tạo Background
        let backgroundDecorationLayer = new BackgroundDecorationLayer()
        this.addChild(backgroundDecorationLayer, BattleConfig.BackgroundLayer.zOrder, BattleScene.DECOR_TAG)

        // Khởi tạo Map
        let mapLayer = new MapLayer(this._myGameLoop.getMapController(), this._enemyGameLoop.getMapController())
        this.setMapLayer(mapLayer)
        this.addChild(mapLayer,  BattleConfig.MapLayer.zOrder, BattleScene.MAP_TAG)

        // Khởi tạo UI dành cho người dùng tương tác
        let battleUILayer = new BattleUILayer(
            this.getInfo(),
            this.getMyGameLoop().getMapController(),
            this.getMyGameLoop().getTowerController(),
            backgroundDecorationLayer,
            this.getMyGameLoop()
        )

        this.addChild(battleUILayer, BattleConfig.UILayer.zOrder, 0)

        // Khởi tạo ObjectLayer chứa quái và trụ
        let objectLayer = new ObjectLayer()
        this.addChild(objectLayer, BattleConfig.ObjectLayer.zOrder, BattleScene.OBJ_TAG)
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

    /**
     * @param {BattleUtil.Who.Enemy | BattleUtil.Who.Mine} who
     * @return {GameLoop}
     * */
    getGameLoop: function (who) {
        if (who === BattleUtil.Who.Mine){
            return this.getMyGameLoop();
        } else {
            return this.getEnemyGameLoop();
        }
    }
})

BattleScene.UI_TAG = 1234452
BattleScene.DECOR_TAG = 8347593
BattleScene.MAP_TAG = 824358
BattleScene.OBJ_TAG = 1841338