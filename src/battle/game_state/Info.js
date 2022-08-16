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
    _needUpdate : false,
    _endGame : false,
    _incommingEnergy : null,

    // GETTER
    getEndGame : function() {return this._endGame},
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
    getNeedUpdate : function() {return this._needUpdate},
    getIncommingEnergy : function() {return this._incommingEnergy},

    // SETTER
    setEndGame : function(value) {this._endGame = value},
    setEnergy : function (energy) {this._energy = energy;},
    setCurrentRound : function (round) {this._currentRound = round;},
    setRemainingTime : function (time) {this._remainingTime = time;},
    setPoint : function (point) {this._point = Math.max(0,point);},
    setInGameCard : function (cards) {this._inGameCard = cards;},
    setCurrentDeck : function (deck) {this._currentDeck = deck;},
    setNextCard : function(newNextCard) {this._nextCard = newNextCard;},
    setCardCounter : function(newCounter) {this._cardCounter = newCounter;},
    setEnemyPoint : function(enemyPoint) {this._enemyPoint = Math.max(0,enemyPoint);},
    setEnemyName : function(enemyName) {this._enemyName = enemyName},
    setEnemyTrophy : function(  enemyTrophy) {this._enemyTrophy = enemyTrophy},
    setNeedUpdate : function(value) {this._needUpdate = value},
    setIncommingEnergy : function(value) {this._incommingEnergy = value},

    /** @param {BattleInitiator} battleInitiator*/
    ctor : function(battleInitiator) {
        this.setCurrentRound(BattleConfig.INIT_ROUND)
        this.setEnergy(BattleConfig.INIT_ENERGY)
        this.setIncommingEnergy(BattleConfig.INIT_ENERGY)
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
        // if (energy < 0) {
        //     return false
        // } else {
            this.setEnergy(energy - 0)
            let currentDeck = this.getCurrentDeck()
            currentDeck[index] = this.getNextCard()
            this.generateNextCard()
            this.setIncommingEnergy(energy)
            return true
        // }
    },

    dropPoint : function(amount, who, gainEnergy) {
        if (who === BattleUtil.Who.Enemy) {
            this.setEnemyPoint(this.getEnemyPoint() - amount)
        } else {
            this.setPoint(this.getPoint() - amount)
            this.setEnergy(this.getEnergy() + gainEnergy)
        }
        this._needUpdate = true
    },

    useCard : function(index) {
        let currentDeck = this.getCurrentDeck()
        let usedCard = currentDeck[index]
        let minimumEnergy = Util.getPlantEnergy(usedCard.cardID)
        if (this.getEnergy() >= minimumEnergy) {
            currentDeck[index] = this.getNextCard()
            this.generateNextCard()
            this.setEnergy(this.getEnergy() - minimumEnergy)
            return true
        } else {
            return false
        }
    },

    generateNextCard : function() {
        let inGameCards = this.getInGameCard()
        let cardCounter = this.getCardCounter() + 1
        this.setCardCounter(cardCounter % 8)
        this.setNextCard(JSON.parse(JSON.stringify(inGameCards[cardCounter % 8])))
    },

    nextRound : function() {
        this.setCurrentRound(this.getCurrentRound() + 1)
    },
})
