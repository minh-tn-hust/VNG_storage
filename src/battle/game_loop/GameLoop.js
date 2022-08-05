/**
 * GameLoop
 * @param {BattleUtil.Who.Enemy | BattleUtil.Who.Mine} who
 * @param {BattleInitiator.myMap | BattleInitiator.eMap} initMap
 * @param {boolean} isClone
 */
let GameLoop = cc.Class.extend({
    _tick : null,
    _actionQueue : null,
    _who : null,
    _initMap : null,
    _isClone : null,

    _monsterController : null,
    _towerController : null,
    _mapController : null,
    _isRollBack : null,

    // GETTER
    getTick : function(){return this._tick;},

    /** @return {ActionQueue} */
    getActionQueue : function() {return this._actionQueue},

    getWho : function() {return this._who;},
    getTowerController : function() {return this._towerController},
    getMonsterController : function() {return this._monsterController},
    getMapController : function() {return this._mapController},
    isClone : function() {return this._isClone},
    isRollBack : function() {return this._rollBack},


    /** Trả về map khởi đầu của game đấu (trạng thái bắt đầu của map) */
    getInitMap : function() {return this._initMap},


    // SETTER
    setTick : function(newTick) {this._tick = newTick;},
    setActionQueue : function(newActionQueue) {this._actionQueue = newActionQueue;},
    setWho : function(who) {this._who = who },
    setTowerController : function(newTowerController) {this._towerController = newTowerController;},
    setMonsterController : function(newMonsterController) {this._monsterController = newMonsterController},
    setMapController : function(newMapController) {this._mapController = newMapController;},
    setInitMap : function(initMap) {this._initMap = initMap},
    setIsClone : function(value) {this._isClone = value},

    ctor : function(who, initMap, isClone) {
        this.setTick(0)
        this.setWho(who)
        this.setActionQueue(new ActionQueue(who))
        this.setMonsterController(new MonsterController(who))
        this.setMapController(new MapController(initMap))
        this.setTowerController(new TowerController(who));
        this.setInitMap(initMap);
        this.setIsClone(isClone);
        this.setInitMap(initMap)
        this.setIsClone(isClone)
    },

    /**
     * Trong hàm này thực hiện tất cả các logic của game như là
     */
    update : function() {
        let currentTick = this.getTick()
        let isClone = this.isClone()

        // if (this.getWho() === BattleUtil.Who.Mine) {
        //     cc.log(currentTick)
        // }

        let tickAction = this.getActionQueue().getListActionFromTick(currentTick)
        for (let i = 0; i < tickAction.length; i++) {
            this.fromEventToGameAction(tickAction[i], isClone)
        }

        // TODO : cập nhật lại các thay đổi cho quái vật
        this.getMonsterController().updateAllMonster()

        // TODO : cập nhật thay đổi cho trụ và các loại đạn (trúng quái, quái mất máu, làm chậm, ..., các sự kiện khác)
        this.getTowerController().updateAllTower(currentTick);

        this.setTick(currentTick + 1)
    },

    // TODO : thực hiện các UserEvent có trong tick này
    /** @param {UserEvent,PlaceTowerEvent} userEvent
     * @param {boolean} isClone
     */
    fromEventToGameAction : function(userEvent, isClone) {
        cc.log("UserEvent: ",JSON.stringify(userEvent));
        switch (userEvent.getType()) {
            case UserEvent.Type.CREATE_MONSTER:
                // TODO : Thực hiện thả quái với thông tin đầu vào
                this.getMonsterController().createMonster(userEvent.getMetaData().cardId, isClone)
                break
            case UserEvent.Type.PLACE_TOWER:
                // TODO : Thực hiện đặt trụ với thông tin đầu vào, kiểm tra các thông tin chính xác rồi mới thực hiện
                this.getTowerController().plantTower(
                    userEvent.getCID(),
                    userEvent.getPosition(),
                    isClone
                );
                this.getMapController().plantTowerWithPosition(userEvent.getPosition(),userEvent.getCID());
                break
            case UserEvent.Type.REMOVE_TOWER:
                // TODO : Thực hiện hủy trụ với thông tin đầu vào
                cc.log("REMOVE TOWER ")
                break
            case UserEvent.Type.UPDATE_TOWER:
                // TODO : Thực hiện nâng cấp trụ với thông tin đầu vào
                cc.log("UPDATE_TOWER")
                break
            case UserEvent.Type.USE_SPELL:
                // TODO : Thực hiện sử dụng spell với thông tin đầu vào
                cc.log("USE SPELL")
                break
        }
    },

    // TODO : thực hiện clone lại trạng thái từ initState rồi sau đó diễn lại các cảnh, các controller sẽ được tạo mới
    // TODO : khi thực hiện clone lại một thời điểm nào đó, buộc phải tạo ra một Info mới chỉ dùng riêng cho GameLoop mới đó
    // TODO : khi thực hiện clone lại một thời điểm nào đó, buộc phải dùng một map mới
    cloneTick : function(incomingTick) {
        // Thực hiện khởi tạo gameLoop clone và thực hiện clone tới tick yêu cầu
        let cloneGameLoop = new GameLoop(this.getWho(), this.getInitMap(), true)
        let cloneActionQueue = cloneGameLoop.getActionQueue()

        // Clone lại các hành động của người dùng và chạy lại các GameLoop
        let userEvents = this.getActionQueue().getActionList()
        for (let i  = 0; i < userEvents.length; i++) {
            cloneActionQueue.addToActionList(userEvents[i])
        }
        while(cloneGameLoop.getTick() !== incomingTick) {
            cloneGameLoop.update()
        }

        // TODO : Thực hiện gỡ các Sprite của GameState hiện tại khỏi Scene
        let objectLayer = cc.director.getRunningScene().getObjectLayer()
        objectLayer.removeMonsterSprites(this.getWho());
        objectLayer.removeTowerSprites(this.getWho());
        objectLayer.removeBulletSprites(this.getWho());


        // TODO :Thực hiện cập nhật lại trạng thái mới của cloneGameLoop vào gameLoop hiện tại
        this.setMonsterController(cloneGameLoop.getMonsterController())
        this.setMapController(cloneGameLoop.getMapController())
        this.setTowerController(cloneGameLoop.getTowerController());
        this.setTick(cloneGameLoop.getTick())


        // TODO : cập nhật hình ảnh và hiển thị của gameState vừa clone được
        let monsterController = this.getMonsterController()
        monsterController.recreateSprite();
        let towerController = this.getTowerController();
        towerController.recreateSprite();
    },
})