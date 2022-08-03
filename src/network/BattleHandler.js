let BattleHandler = cc.Class.extend({
    _gameClient : null,
    getGameClient : function() {
        return this._gameClient
    },
    setGameClient : function(gameClient) {
        this._gameClient = gameClient
    },
    ctor : function(gameClient) {
        this.setGameClient(gameClient)
    },

    sendMatching: function (){
        cc.log("battle - sendMatching")
        var pk = this.getGameClient().getOutPacket(CmdMatching)
        pk.pack()
        this.getGameClient().sendPacket(pk)
    },
    // acceptMatching: function (){
    //     cc.
    // }
    sendAbortMatching: function (){
        cc.log("battle - sendMatching")
        var pk = this.getGameClient().getOutPacket(CmdAbortMatching)
        pk.pack()
        this.getGameClient().sendPacket(pk)
    },

    // RECEIVE PACKET HANDLER

    /** @param {DropMonsterTestInfo} dropMonsterTestPacket */
    receiveDropMonsterTest : function(dropMonsterTestPacket) {
        let currentServerTick = dropMonsterTestPacket.comingTick - 10
        cc.log("CURRENT SERVER TICK" + currentServerTick.toString())
        let myGameLoop = cc.director.getRunningScene().getMyGameLoop()
        cc.log("CURRENT MY GAME LOOP TICK" + myGameLoop.getTick().toString())
        myGameLoop.getActionQueue().addToActionList(new UserEvent(dropMonsterTestPacket.comingTick, {cardId : dropMonsterTestPacket.cardId}, UserEvent.Type.CREATE_MONSTER, myGameLoop.getWho()))
        if (myGameLoop.getTick() < currentServerTick) {
            let battlScene = cc.director.getRunningScene()
            battlScene.speedUpGameLoop(BattleUtil.Who.Mine, 0.02)
            battlScene.setServerTick(currentServerTick)
        } else {
            myGameLoop.cloneTick(currentServerTick)
        }


        let enemyGameLoop = cc.director.getRunningScene().getEnemyGameLoop()
        enemyGameLoop.getActionQueue().addToActionList(new UserEvent(dropMonsterTestPacket.comingTick, {cardId : dropMonsterTestPacket.cardId}, UserEvent.Type.CREATE_MONSTER, enemyGameLoop.getWho()))
        cc.log("CURRENT ENEMY GAME LOOP TICK" + enemyGameLoop.getTick().toString())
        if (enemyGameLoop.getTick() < currentServerTick) {
            let battlScene = cc.director.getRunningScene()
            battlScene.speedUpGameLoop(BattleUtil.Who.Enemy, 0.02)
            battlScene.setServerTick(currentServerTick)
        } else {
            enemyGameLoop.cloneTick(currentServerTick)
        }
    },
})