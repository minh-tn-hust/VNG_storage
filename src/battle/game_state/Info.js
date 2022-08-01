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

    // SETTER
    setEnergy : function (energy) {this._energy = energy;},
    setCurrentRound : function (round) {this._currentRound = round;},
    setRemainingTime : function (time) {this._remainingTime = time;},
    setPoint : function (point) {this._point = point;},
    setInGameCard : function (cards) {this._inGameCard = cards},
    setCurrentDeck : function (deck) {this._currentDeck = deck;},
    setNextCard : function(newNextCard) {this._nextCard = newNextCard},
    setCardCounter : function(newCounter) {this._cardCounter = newCounter},
    setEnemyPoint : function(enemyPoint) {this._enemyPoint = enemyPoint},

    /** @param {BattleInitiator} battleInitiator*/
    ctor : function(battleInitiator) {
        this.setCurrentRound(BattleConfig.INIT_ROUND)
        this.setEnergy(BattleConfig.INIT_ENERGY)
        this.setInGameCard(battleInitiator.battleDeck)
        this.setPoint(BattleConfig.INIT_POINT)
        this.setEnemyPoint(BattleConfig.INIT_POINT)

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

    },

    generateNextCard : function() {
        let inGameCards = this.getInGameCard()
        let cardCounter = this.getCardCounter()
        cardCounter = (cardCounter + 1) % 8
        this.setCardCounter(cardCounter)
        this.setNextCard(...inGameCards[cardCounter])
    },
})