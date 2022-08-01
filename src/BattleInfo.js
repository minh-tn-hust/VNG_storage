let BattleInfo = cc.Class.extend({
    _myPoint : null,
    _enemyPoint : null,
    _onGame : null,
    _round : null,
    _eventListener : null,
    _energy : 300,
    _battleDeck : [
        {
            cid : 0,
            level : 1,
            pieces : 0,
            status : 0
        },
        {
            cid : 1,
            level : 1,
            pieces : 0,
            status : 0
        },
        {
            cid : 2,
            level : 1,
            pieces : 0,
            status : 0
        },
        {
            cid : 3,
            level : 1,
            pieces : 0,
            status : 0
        },
        {
            cid : 4,
            level : 1,
            pieces : 0,
            status : 0
        },
        {
            cid : 5,
            level : 1,
            pieces : 0,
            status : 0
        },
        {
            cid : 6,
            level : 1,
            pieces : 0,
            status : 0
        },
        {
            cid : 10,
            level : 1,
            pieces : 0,
            status : 0
        },
        {
            cid : 20,
            level : 1,
            pieces : 0,
            status : 0
        }
    ],
    _myMap : null,
    _enemyMap : null,

    // ctor : function() {
    //     this.setEventsListener([])
    //     this.setMyPoint(20)
    //     this.setEnemyPoint(20)
    //     this._onGame = true
    //     this.setRound(0)
    //     this.setEnemyMap()
    //     this.setMyMap()
    // },

    ctor: function (battleInfo){
        this.setEventsListener([])
        this.setMyPoint(20)
        this.setEnemyPoint(20)
        this._onGame = true
        this.setRound(0)
        this.setEnemyMap(battleInfo.eMap)
        this.setMyMap(battleInfo.myMap)
    },


    /**
     * Trả về danh sách các listener đang lắng nghe sự kiện của BattleInfo
     * @returns {({event : number, callBack : function})[]}
     */
    getEventsListener : function() {
        return this._eventListener

    },

    /**
     * Sử dụng để khởi tạo event Listener (chỉ dùng khi khởi tạo), listeners luôn là []
     * @param {({event : number, callBack : function})[]} listeners
     */
    setEventsListener : function(listeners) {
        this._eventListener = listeners
    },

    /**
     * @param {number} newRound
     */
    setRound : function(newRound) {
        this._round = newRound
    },

    /**
     * @returns {number}
     */
    getRound : function() {
        return this._round
    },

    /**
     * @returns {number}
     */
    getMyPoint : function() {
        return this._myPoint
    },

    /**
     * @param {number} myPoint
     */
    setMyPoint : function(myPoint) {
        this._myPoint = myPoint

    },

    /**
     * Chỉ sử dụng lúc khởi tạo, dùng để cập nhật map lấy được từ server
     * @param {number[][]} map
     */
    setMyMap : function(map) {
        for(var i =0; i<5; i++){
            for(var j= 0; j<7; j++){
                cc.log(map[i][j]+' ')
            }
            cc.log("\n")
        }
        this._myMap = map
    },

    /**
     * Chỉ sử dụng lúc khởi tạo, dùng để cập nhật map lấy được từ server
     * @param {number[][]} map
     */
    setEnemyMap : function(map) {
        // this._enemyMap = [
        //     [1005,  100,  100,  100,  100,  100,  100],
        //     [1005,  100,  110,  100,  100,  100,  100],
        //     [1005,  100,  101,  100,  100,  100,  100],
        //     [1005,  100,  111,  100,  112,  100,  100],
        //     [1005, 1005, 1005, 1005, 1005, 1005, 1005],
        // ]
        for(var i =0; i<5; i++){
            for(var j= 0; j<7; j++){
                cc.log(map[i][j]+' ')
            }
            cc.log("\n")
        }
        this._enemyMap = map

    },

    /**
     * @returns {number}
     */
    getEnemyPoint : function() {
        return this._enemyPoint
    },

    /**
     * @param {number} enemyPoint
     */
    setEnemyPoint : function(enemyPoint) {
        this._enemyPoint = enemyPoint
    },

    /**
     * @returns {number[][]}
     */
    getEnemyMap : function() {
        return this._enemyMap
    },
    /**
     * @returns {number[][]}
     */
    getMyMap : function() {
        return this._myMap
    },

    /**
     * @returns {number}
     */
    getEnergy : function() {
        return this._energy
    },

    /**
     * @param {number} newEnergy
     */
    setEnergy : function(newEnergy) {
        this._energy = newEnergy
    },

    /**
     * Thực hiện thông báo yêu cầu màn tiếp theo, có thể được gọi khi hết thời gian đếm ngược hoặc là do 1 trong 2 người yêu cầu gọi
     */
    nextRound : function() {
        this.setRound(this.getRound() + 1)
        this.notify(BattleInfo.Event.NEXT_TURN)
    },

    /**
     * Khởi tạo battleDeck, bộ bài mà người chơi sử dụng để mang theo khi tham gia chiến đấu
     * @param battleDeck
     */
    setBattleDeck : function(battleDeck){
        this._battleDeck = battleDeck
    },

    /**
     *
     * @returns {({pieces: number, level: number, cid: number, status: number})[]}
     */
    getBattleDeck : function() {
        // return this._battleDeck
        var battleDeck = []
        UserInfo.getInstance().getCards().forEach(
            (card) => {
                if(card.getStatus()===CardUtil.STATUS.BATTLE) {
                    battleDeck.push(card.toJSONObject());
                }
            }
        );
        cc.log("Battle Deck: ", JSON.stringify(battleDeck));
        return battleDeck;
    },

    /**
     * Thêm sự kiện lắng nghe khi BattleInfo thay đổi
     * @param {BattleInfo.Event} eventType
     * @param {function} callBack
     * @example
     * // nếu cần thiết thì bind thêm dữ liệu vào
     * BattleInfo.getInstance().addEventListener(
     *      BattleInfo.Event.CHANGE_RESOURCE,
     *      function() {
     *          // thêm sự kiện lắng nghe vào đây
     *      }.bind(this)
     * )
     */
    addEventListener : function(eventType, callBack) {
        let eventListener = this.getEventsListener()
        eventListener.push({
            event : eventType,
            callBack : callBack
        })
    },

    /**
     * Thông báo sự kiện tới các listener
     * @param {BattleInfo.Event} event
     */
    notify : function(event) {
        let eventListener = this.getEventsListener()
        for (let i = 0; i < eventListener.length; i++) {
            if (eventListener[i].event === event) {
                eventListener[i].callBack()
            }
        }
    },

    /**
     * Thay đổi điểm của người chơi, được gọi khi quái đi vào trụ
     * @param {number} amount
     * @param {BattleUtil.Who} who
     * @param {number} energyGain
     * @example
     * // thay đổi điểm của bên mình 9 điểm và cộng thêm vào energy 10
     * BattleInfo.getInstance().changePoint(9, Battle.Util.Mine, 10)
     */
    changePoint : function(amount, who, energyGain) {
        if (this._onGame) {
            if (who === BattleUtil.Who.Mine) {
                let myPoint = this.getMyPoint()
                myPoint -= amount
                this.setMyPoint(myPoint)
            } else {
                let enemyPoint = this.getEnemyPoint()
                enemyPoint -= amount
                this.setEnemyPoint(enemyPoint)
            }
            this.notify(BattleInfo.Event.CHANGE_RESOURCE)
            let currentEnergy = this.getEnergy()
            this.changeEnergy(currentEnergy + energyGain)
            this.endGame()
        }
    },

    endGame : function(required) {
        if (required === true && this._onGame === true) {
            if (this.getEnemyPoint() === this.getMyPoint()) {
                this._onGame = false
                MainController.getInstance()._battleSceneController.endGameAnimation(BattleConfig.Drawing)
                return
            } else if (this.getMyPoint() > this.getEnemyPoint()) {
                this._onGame = false
                MainController.getInstance()._battleSceneController.endGameAnimation(BattleConfig.Wining)
                return
            } else {
                this._onGame = false
                MainController.getInstance()._battleSceneController.endGameAnimation(BattleConfig.Losing)
                return
            }

        } else {
            if (this.getMyPoint() <= 0) {
                this._onGame = false
                MainController.getInstance()._battleSceneController.endGameAnimation(BattleConfig.Losing)
                return
            }
            if (this.getEnemyPoint() <= 0) {
                this._onGame = false
                MainController.getInstance()._battleSceneController.endGameAnimation(BattleConfig.Wining)
                return
            }
        }
    },

    /**
     * Thay đổi energy hiện tại của bên mình
     * @param {number} newEnergy
     */
    changeEnergy : function(newEnergy) {
        this.setEnergy(newEnergy)
        this.notify(BattleInfo.Event.CHANGE_RESOURCE)
    },

    /**
     * Tăng energy, trả về xem có thể tăng được tiếp hay không
     * @param {number} amount
     * @returns {boolean}
     */
    increaseEnergy : function(amount) {
        let currentEnergy = this.getEnergy()
        if (currentEnergy + amount <= BattleConfig.MAX_ENERGY)  {
            this.changeEnergy(currentEnergy + amount)
            return true
        } else {
            return false
        }
    },

    /**
     * kiểm tra xem energy hiện tại có thể trừ được nữa hay không
     * @param {number} amount
     * @returns {boolean}
     */
    decreaseEnergy : function(amount) {
        let currentEnergy = this.getEnergy()
        if (this.enoughEnergy(amount))  {
            this.changeEnergy(currentEnergy - amount)
            return true
        } else {
            return false
        }
    },

    enoughEnergy : function(amount) {
        let currentEnergy = this.getEnergy()
        if (currentEnergy - amount >= 0)  {
            return true
        } else {
            return false
        }
    },

    /**
     * Đã lắng nghe thì sẽ phải xóa lắng nghe đi
     */
    removeListener : function() {
        let listener = this.getEventListener()
        while(listener.length !== 0) {
            listener.shift()
        }
    }
})

BattleInfo._battleInfo = null

/**
 * @returns {BattleInfo}
 */
BattleInfo.getInstance = function() {
    return BattleInfo._battleInfo
}
BattleInfo.setInstance = function(battleInfoInstance) {
    BattleInfo._battleInfo = battleInfoInstance
}

BattleInfo.Event = {
    CHANGE_RESOURCE : 1,
    NEXT_TURN : 2,
    MATCH_DONE : 3,

}
