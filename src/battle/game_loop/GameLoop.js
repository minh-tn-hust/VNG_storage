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
    _isEndGame : null,

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
    getEndGame : function() {return this._isEndGame},


    /** Trả về map khởi đầu của game đấu (trạng thái bắt đầu của map) */
    getInitMap : function() {return this._initMap},


    // SETTER
    setEndGame : function(value) {this._isEndGame = value},
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

        this.setMapController(new MapController(initMap, who))
        this.setMonsterController(new MonsterController(who, this.getMapController()))
        this.getMapController().setMonsterController(this.getMonsterController())
        this.setTowerController(new TowerController(who, this.getMapController(), this.getMonsterController()), this);

        // Khởi tạo map khởi đầu, lưu lại sử dụng để clone
        this.setInitMap(initMap);

        this.setIsClone(isClone);

        this.setInitMap(initMap)
        this.setIsClone(isClone)
        if (isClone === false) {
            this.getActionQueue().initActionList()
        }
    },

    /**
     * Trong hàm này thực hiện tất cả các logic của game như là
     */
    update : function() {
        if (this.getEndGame() !== true) {
            let currentTick = this.getTick()
            let isClone = this.isClone()

            let tickAction = this.getActionQueue().getListActionFromTick(currentTick)
            for (let i = 0; i < tickAction.length; i++) {
                this.fromEventToGameAction(tickAction[i], isClone)
            }

            // TODO : cập nhật lại các thay đổi cho quái vật
            this.getMonsterController().updateAllMonster()

            // TODO : cập nhật thay đổi cho trụ và các loại đạn (trúng quái, quái mất máu, làm chậm, ..., các sự kiện khác)
            this.getTowerController().updateAllTower(currentTick);

            this.setTick(currentTick + 1)
        }
    },

    // TODO : thực hiện các UserEvent có trong tick này
    /** @param {UserEvent} userEvent
     * @param {boolean} isClone
     */
    fromEventToGameAction : function(userEvent, isClone) {
        switch (userEvent.getType()) {
            case UserEvent.Type.CREATE_MONSTER:
                // TODO : Thực hiện thả quái với thông tin đầu vào
                let towerLevel = this.getTowerController().getTowerLevel()
                this.getMonsterController().createMonster(userEvent.getMetaData().cardId, isClone, towerLevel)
                break
            case UserEvent.Type.PLANT_TOWER:
                // TODO : Thực hiện đặt trụ với thông tin đầu vào, kiểm tra các thông tin chính xác rồi mới thực hiện
                this.getTowerController().plantTower(
                    userEvent.getMetaData().cardId,
                    userEvent.getMetaData().position,
                    userEvent.getMetaData().cardLevel,
                    isClone
                );
                this.getMapController().plantTowerWithPosition(userEvent.getMetaData().position,userEvent.getMetaData().cardId);
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
            case UserEvent.Type.SYSTEM_MONSTER:
                let actionQueue = this.getActionQueue().getActionList()
                actionQueue.push(new UserEvent(this.getTick() + 1, {cardId : MonsterConfig.Type.CROW_SKELETON}, UserEvent.Type.CREATE_MONSTER, this.getWho()))
                actionQueue.push(new UserEvent(this.getTick() + 6, {cardId : MonsterConfig.Type.EVIL_BAT}, UserEvent.Type.CREATE_MONSTER, this.getWho()))
                actionQueue.push(new UserEvent(this.getTick() + 11, {cardId : MonsterConfig.Type.GIANT}, UserEvent.Type.CREATE_MONSTER, this.getWho()))
                actionQueue.push(new UserEvent(this.getTick() + 16, {cardId : MonsterConfig.Type.GHOST_SWORDER}, UserEvent.Type.CREATE_MONSTER, this.getWho()))
                break
            case UserEvent.Type.END_GAME:
                let info = cc.director.getRunningScene().getInfo()
                info.setEndGame(true)
                this.setEndGame(true)
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
