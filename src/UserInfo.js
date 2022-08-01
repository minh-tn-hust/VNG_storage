let UserInfo = cc.Class.extend({
    _gold : null,
    _gem : null,
    _cards : null,
    _chests : null,
    _trophy : null,
    _level : null,
    _exp : null,
    _shopItems : null,
    _shopCoins : null,
    _timestamp : null,

    setTimestamp : function(timestamp) {
        this._timestamp = timestamp
    },

    getTimestamp : function() {
        return this._timestamp
    },


    _eventListener : null,

    mapIDtoCardObj: {},

    getCardByID: function (id) {
        return this.mapIDtoCardObj[id];
    },

    getGold : function() {
        return this._gold
    },
    setGold : function(gold) {
        this._gold = gold
    },
    getGem : function() {
        return this._gem
    },
    setGem : function(gem) {
        this._gem = gem
    },
    getCards : function() {
        return this._cards
    },
    setCards : function(cards) {
        this._cards = new Array(cards.length);
        for (var i=0;i<cards.length;++i){
            this._cards[i]=new CardInfo(cards[i]);
            this.mapIDtoCardObj[this._cards[i].getCardID()] = this._cards[i];
        }
    },
    getChests : function() {
        return this._chests
    },
    setChests : function(chests) {
        this._chests = chests
    },
    getTrophy: function() {
        return this._trophy
    },
    setTrophy : function(trophy){
        this._trophy = trophy
    },
    getLevel : function() {
        return this._level
    },
    setLevel : function(level) {
        this._level = level
    },
    getExp : function() {
        return this._exp
    },
    setExp : function(exp) {
        this._exp = exp
    },
    getShopItems : function() {
        return this._shopItems
    },
    setShopItems : function(shopItems) {
        this._shopItems = shopItems

    },
    getShopCoins : function() {
        return this._shopCoins
    },
    setShopCoins : function(shopCoins) {
        this._shopCoins = shopCoins
    },
    getEventListener : function() {
        return this._eventListener
    },

    ctor: function({gold, gem, cards, chests, exp, trophy, level, shopItems, shopCoins}){
        this.setGold(gold)
        this.setGem(gem)
        this.setCards(cards)
        this.setChests(chests)
        this.setExp(exp)
        this.setTrophy(trophy)
        this.setLevel(level)
        this.setShopCoins(shopCoins)
        this.setShopItems(shopItems)

        this._eventListener = []
    },
    addEventListener : function(event, callBack) {
        this.getEventListener().push({
            event : event,
            callBack : callBack
        })
    },
    notify : function(event, metadata) {
        let listeners = this.getEventListener()
        for (let i = 0;i < listeners.length; i++) {
            if (listeners[i].event === event) {
                listeners[i].callBack(metadata)
            }
        }
    },

    changeGold : function(newGold) {
        this.setGold(newGold)
        this.notify(UserInfo.Event.CHANGE_RESOURCE)
    },
    changeGem : function(newGem) {
        cc.log("Set Gem: ",newGem);
        this.setGem(newGem)
        this.notify(UserInfo.Event.CHANGE_RESOURCE)
    },
    changeChest : function(newChests) {
        this.setChests(newChests)
        this.notify(UserInfo.Event.CHANGE_RESOURCE)
    },

    changeShopItem : function(newShopItem) {
        this.setShopItems(newShopItem)
        this.notify(UserInfo.Event.CHANGE_RESOURCE)
    },

    changeResource: function(newGold, newGem, newFame, newExp, newLevel){
        this.setGold(newGold);
        this.setGem(newGem);
        this.setTrophy(newFame);
        this.setExp(newExp);
        this.setLevel(newLevel);
        this.notify(UserInfo.Event.CHANGE_RESOURCE);
    },

    getBattleDeck : function() {
        let cardDeck = this.getCards()
        let battleDeck = []
        for (let i = 0; i < cardDeck.length; i++) {
            if (cardDeck[i].status === CardUtil.CARRY) {
                battleDeck.push(cardDeck[i])
            }
        }
        return battleDeck
    },

    earnReward: function (packet){
        this.changeGold(packet.rewardCoin);
        var cidUpdateCard;
        var updateCard;
        for (var i=0;i<packet.numCardReward;++i){
            cidUpdateCard = packet.listCardReward[i+1].cid;
            updateCard = this.getCardByID(cidUpdateCard);
            updateCard.setPieces(updateCard.getPieces()+packet.listCardReward[i+1].pieces);
            cc.log("set pieces for card: "+updateCard.getCardID()+" , #pieces: "+updateCard.getPieces());
            CardUtil.setCardUI(updateCard.getCardImage(),updateCard);
        }
    },

    changeCard: function(updatedCard){
        if (updatedCard!==null) {
            var card = this.getCardByID(updatedCard.getCardID());
            card.copyCard(updatedCard);
            CardUtil.setCardUI(card.getCardImage(),card);
        }
    },

    openTreasure: function(index){
        cc.log("openTreasure, index: ",index);
        if (this.getChests()[index].status===TreasureUtil.STATUS.EMPTY){
            this.getChests()[index].status= TreasureUtil.STATUS.WAITING_TO_COUNT;
        }
        this.notify(UserInfo.Event.OPEN_TREASURE);
    },

    updateChest: function (chest){
        for (var key of Object.keys(chest)){
            this.getChests()[chest.index][key] = chest[key];
        }

        cc.log("updating chest: ",JSON.stringify(chest));
        this.notify(UserInfo.Event.UPDATED_CHEST,this.getChests()[chest.index]);
        if (this.getChests()[chest.index].status===TreasureUtil.STATUS.COUNTING){
            cc.log("Calling from UserInfo treasure controller to counting");
            this.notify(UserInfo.Event.COUNTDOWN_TREASURE,chest.index);
        }
    },
    removeListener : function() {
        let listener = this.getEventListener()
        while(listener.length !== 0) {
            listener.shift()
        }
    }
})


UserInfo._userInfo = null

/**
 * @returns {UserInfo}
 */
UserInfo.getInstance = function() {
    return UserInfo._userInfo
}
UserInfo.setInstance = function(userInfoInstance) {
    UserInfo._userInfo = userInfoInstance
}

UserInfo.Event = {
    CHANGE_RESOURCE : 1,
    CHANGE_SHOP:2,
    CHANGE_CARD:3,
    COUNTDOWN_TREASURE:4,
    OPEN_TREASURE:5,
    UPDATED_CHEST:6,
    CHEST_OPEN_BY_GEM:8,
    MATCH_DONE: 9,
    ABORT_MATCH_DONE: 10,
}

UserInfo.UpdatedCard = null
UserInfo.indexUpdatedChest = -1;