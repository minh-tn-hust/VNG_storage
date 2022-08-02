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

    // GETTER
    getTick : function(){return this._tick;},

    /** @return {ActionQueue} */
    getActionQueue : function() {return this._actionQueue},

    getWho : function() {return this._who;},
    getTowerController : function() {return this._towerController},
    getMonsterController : function() {return this._monsterController},
    getMapController : function() {return this._mapController},
    isClone : function() {return this._isClone},

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
        this.setInitMap(initMap)
        this.setIsClone(isClone)
    },

    /**
     * Trong hàm này thực hiện tất cả các logic của game như là
     */
    update : function() {
        let currentTick = this.getTick()
        let isClone = this.isClone()

        let tickAction = this.getActionQueue().getListActionFromTick(currentTick)
        for (let i = 0; i < tickAction.length; i++) {
            this.fromEventToGameAction(tickAction[i], isClone)
        }

        // TODO : cập nhật lại các thay đổi cho quái vật
        this.getMonsterController().updateAllMonster()

        // TODO : cập nhật thay đổi cho trụ và các loại đạn (trúng quái, quái mất máu, làm chậm, ..., các sự kiện khác)

        this.setTick(currentTick + 1)
    },

    // TODO : thực hiện các UserEvent có trong tick này
    /** @param {UserEvent} userEvent
     * @param {boolean} isClone
     */
    fromEventToGameAction : function(userEvent, isClone) {
        switch (userEvent.getType()) {
            case UserEvent.Type.CREATE_MONSTER:
                // TODO : Thực hiện thả quái với thông tin đầu vào
                cc.log("CREATE MONSTER")
                this.getMonsterController().createMonster(MonsterConfig.Type.CROW_SKELETON, isClone)
                break
            case UserEvent.Type.PLACE_TOWER:
                // TODO : Thực hiện đặt trụ với thông tin đầu vào
                cc.log("PLACE TOWER")
                break
            case UserEvent.Type.REMOVE_TOWER:
                // TODO : Thực hiện hủy trụ với thông tin đầu vào
                cc.log("REMOVE TOWER")
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
    cloneTick : function(incommingTick) {
        // TODO : thực hiện khởi tạo gameLoop clone và thực hiện clone tới tick yêu cầu

        // TODO : xóa các hình ảnh đang hiển thị của gameState cũ

        // TODO : cập nhật hình ảnh và hiển thị của gameState vừa clone được

    },
})