let Info = cc.Class.extend({
    _energy : null,
    _currentRound : null,
    _remainingTime : null,
    _point : null,
    _enemyPoint : null,
    _inGameCard : null,
    _currentDeck : null,
    _nextCard : null,
    _cardCounter : null,
    _enemyTrophy : null,
    _enemyName : null,

    // GETTER
    getEnergy : function () {return this._energy},
    getCurrentRound : function () {return this._currentRound},
    getRemainingTime : function () {return this._remainingTime},
    getPoint : function () {return this._point},
    getEnemyPoint : function () {return this._enemyPoint},
    getInGameCard : function () {return this._inGameCard},
    /** @returns {CardInfo[]} */
    getCurrentDeck : function () {return this._currentDeck},
    getNextCard :function() {return this._nextCard},
    getCardCounter : function() {return this._cardCounter},
    getEnemyTrophy : function () {return this._enemyTrophy},
    getEnemyName : function () {return this._enemyName},

    // SETTER
    setEnergy : function (energy) {this._energy = energy;},
    setCurrentRound : function (round) {this._currentRound = round;},
    setRemainingTime : function (time) {this._remainingTime = time;},
    setPoint : function (point) {this._point = point;},
    setInGameCard : function (cards) {this._inGameCard = cards;},
    setCurrentDeck : function (deck) {this._currentDeck = deck;},
    setNextCard : function(newNextCard) {this._nextCard = newNextCard;},
    setCardCounter : function(newCounter) {this._cardCounter = newCounter;},
    setEnemyPoint : function(enemyPoint) {this._enemyPoint = enemyPoint;},
    setEnemyName : function(enemyName) {this._enemyName = enemyName},
    setEnemyTrophy : function(  enemyTrophy) {this._enemyTrophy = enemyTrophy},

    updateUI : function() {
        let uiLayer = cc.director.getRunningScene().getChildByTag(BattleScene.UI_TAG)
        uiLayer.updateInfo()
    },

    /** @param {BattleInitiator} battleInitiator*/
    ctor : function(battleInitiator) {
        this.setCurrentRound(BattleConfig.INIT_ROUND)
        this.setEnergy(BattleConfig.INIT_ENERGY)
        this.setInGameCard(battleInitiator.battleDeck)
        this.setPoint(BattleConfig.INIT_POINT)
        this.setEnemyPoint(BattleConfig.INIT_POINT)
        this.setEnemyName(battleInitiator.name)
        this.setEnemyTrophy(battleInitiator.trophy)

        // khởi tạo card
        this.initCardDeck()
    },

    initCardDeck : function() {
        let randomCards = []
        let inGameCard = this.getInGameCard()
        for (let i = 0; i <= 3; i++) {
            randomCards.push(JSON.parse(JSON.stringify(inGameCard[i])))
        }
        this.setCurrentDeck(randomCards)
        this.setNextCard(inGameCard[4])
        this.setCardCounter(4)
    },

    /**
     * TODO : Thực hiện hủy một card và trừ năng lượng
     * @param index
     */
    foldCard : function(index) {
        let energy = this.getEnergy()
        if (energy < 5) {
            return false
        } else {
            this.setEnergy(energy - 5)
            let currentDeck = this.getCurrentDeck()
            currentDeck[index] = this.getNextCard()
            this.generateNextCard()
            return true
        }
    },

    generateNextCard : function() {
        let inGameCards = this.getInGameCard()
        let cardCounter = this.getCardCounter()
        this.setCardCounter((cardCounter + 1) % 8)
        cc.log(this.getCardCounter())
        this.setNextCard(JSON.parse(JSON.stringify(inGameCards[cardCounter + 1])))
    },
})