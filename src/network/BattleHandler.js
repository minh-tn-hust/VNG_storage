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
    sendDropMonster : function(comingTick, cardId) {
        cc.log("Battle - Request Drop Monster")
        var pk = this.getGameClient().getOutPacket(CmdDropMonster)
        pk.pack(comingTick, cardId)
        this.getGameClient().sendPacket(pk)
    },
    sendPlantTower : function(comingTick, cardId, position, level) {
        cc.log("Battle - Request Plant Tower")
        var pk = this.getGameClient().getOutPacket(CmdPlantTower)
        pk.pack(comingTick, cardId, position, level)
        this.getGameClient().sendPacket(pk)
    },

    // RECEIVE PACKET HANDLER
    recoveryGameState : function(who,comingTick) {

    },

    /** @param {DropMonsterTestInfo} dropMonsterTestPacket */
    receiveDropMonsterTest : function(dropMonsterTestPacket) {
        let currentServerTick = dropMonsterTestPacket.comingTick - 10
        let myGameLoop = cc.director.getRunningScene().getMyGameLoop()
        let battlScene = cc.director.getRunningScene()
        if (myGameLoop.getTick() < currentServerTick) {
            battlScene.speedUpGameLoop(BattleUtil.Who.Mine, 0.02)
        } else {
            myGameLoop.cloneTick(currentServerTick)
        }

        let enemyGameLoop = cc.director.getRunningScene().getEnemyGameLoop()
        if (enemyGameLoop.getTick() < currentServerTick) {
            battlScene.speedUpGameLoop(BattleUtil.Who.Enemy, 0.02)
        } else {
            enemyGameLoop.cloneTick(currentServerTick)
        }
        battlScene.setServerTick(currentServerTick)
    },
    /**
     * @param {PlantTowerInfo} plantTowerPacket
     */
    receivePlantTower : function(plantTowerPacket) {
        cc.log("BATTLE HANDLER")
        cc.log(JSON.stringify(plantTowerPacket))
        let error = plantTowerPacket.error
        let cardId = plantTowerPacket.cardId
        let position = plantTowerPacket.position
        let cardLevel = plantTowerPacket.level
        if (error === 10) {
            let enemyGameLoop = cc.director.getRunningScene().getEnemyGameLoop()
            enemyGameLoop.getActionQueue().addToActionList(
                new UserEvent(plantTowerPacket.comingTick,
                    {cardId : cardId, position: position,cardLevel:cardLevel},
                    UserEvent.Type.PLANT_TOWER, enemyGameLoop.getWho()
                )
            )
        }
    },
    receiveDropMonster : function(dropMonsterPacket) {
        cc.log("CALLING CREATE MONSTER")
        let error = dropMonsterPacket.error
        let cardId = dropMonsterPacket.cardId
        if (error === 10) {
            let myGameLoop = cc.director.getRunningScene().getMyGameLoop()
            myGameLoop.getActionQueue().addToActionList(new UserEvent(dropMonsterPacket.comingTick, {cardId : dropMonsterPacket.cardId}, UserEvent.Type.CREATE_MONSTER, myGameLoop.getWho()))
        }
    },
})