let LobbyHandler = cc.Class.extend({
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

    sendLoginRequest: function () {
        cc.log("lobby - sendLoginRequest")
        var pk = this.getGameClient().getOutPacket(CmdSendLogin)
        pk.pack("",gv.CONSTANT.USERID) //sessionkey sử dụng khi làm login social, ở bản dev thì để trống
        this.getGameClient().sendPacket(pk)
    },

    getUserInfoRequest : function() {
        cc.log("lobbyHandler - getUserInfo")
        var pk = this.getGameClient().getOutPacket(CmdGetUserInfo)
        pk.pack()
        this.getGameClient().sendPacket(pk)
    },
    getCoinGem : function() {
        cc.log("lobby handler - get coin and gem")
        var pk = this.getGameClient().getOutPacket(CmdGetCoinGem)
        pk.pack()
        this.getGameClient().sendPacket(pk)
    },
    buyCoinRequest : function(index) {
        cc.log("lobbyHandler - buyCoinRequest")
        var pk = this.getGameClient().getOutPacket(CmdBuyShopCoin)
        pk.pack(index)
        this.getGameClient().sendPacket(pk)
    },

    buyItemRequest : function(index) {
        cc.log("lobbyHandler - buyItemRequest")
        var pk = this.getGameClient().getOutPacket(CmdBuyShopItem)
        pk.pack(index)
        this.getGameClient().sendPacket(pk)
    },
    getShopInfoRequest : function() {
        cc.log("Get shop info request")
        var pk = this.getGameClient().getOutPacket(CmdGetShopInfo)
        pk.pack()
        this.getGameClient().sendPacket(pk)
    },

    cheatResources: function(coin,gem,fame,exp,level,cid, cLevel,pieces,status){
        cc.log("lobbyHandler - cheatResources");
        var pk = this.getGameClient().getOutPacket(CmdCheatResources);
        pk.pack(coin,gem,fame,exp,level,cid, cLevel,pieces,status);
        this.getGameClient().sendPacket(pk);
    },

    cheatChest: function(index){
        cc.log("lobbyHandler - cheatChest");
        var pk = this.getGameClient().getOutPacket(CmdCheatChest);
        pk.pack(index);
        this.getGameClient().sendPacket(pk);
    },

    chooseChest: function (index) {
        cc.log("lobbyHandler - chooseChest");
        cc.log("Sending message to open: ",index);
        var pk = this.getGameClient().getOutPacket(CmdChooseChest);
        pk.pack(index);
        this.getGameClient().sendPacket(pk);
    },
    
    openChest: function (index) {
        cc.log("lobbyHandler - chooseChest");
        cc.log("Send packet to open chest index: ",index);
        var pk = this.getGameClient().getOutPacket(CmdOpenChest);
        pk.pack(index);
        this.getGameClient().sendPacket(pk);
    },

    changeCard: function (cid1,cid2) {
        cc.log("lobbyHandler - changeCard");
        var pk = this.getGameClient().getOutPacket(CmdChangeCard);
        pk.pack(cid1,cid2);
        this.getGameClient().sendPacket(pk);
    },

    upgradeCard: function (cid) {
        cc.log("lobbyHandler - upgradeCard");
        var pk = this.getGameClient().getOutPacket(CmdUpgradeCard);
        pk.pack(cid);
        this.getGameClient().sendPacket(pk);
    },

    getCardInfo: function () {
        cc.log("lobbyHandler - getCardInfo");
        var pk = this.getGameClient().getOutPacket(CmdGetCardInfo);
        pk.pack();
        this.getGameClient().sendPacket(pk);
    },

    buyChestByGem: function(index){
        cc.log("lobbyHandler - buyChestByGem");
        var pk = this.getGameClient().getOutPacket(CmdBuyChestByGem);
        pk.pack(index);
        this.getGameClient().sendPacket(pk);
    },
    getTimestamp : function() {
        cc.log("lobbyHandler - getTimestamp")
        var pk = this.getGameClient().getOutPacket(CmdGetTimestamp)
        pk.pack()
        this.getGameClient().sendPacket(pk)
    }

})