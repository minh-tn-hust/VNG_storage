let gv = gv||{};
let NetworkManger = NetworkManger||{};

gv.CONSTANT = gv.CONSTANT ||{};
gv.CONSTANT.USERID = 1;
NetworkManger.Connector = cc.Class.extend({
    _gameClient : null,
    _lobbyHandler : null,
    _battlHandler : null,

    setGameClient : function(gameClient) {
        this._gameClient = gameClient
    },
    /**
     * @returns {GameClient}
     */
    getGameClient : function() {
        return this._gameClient
    },
    setLobbyHandler : function(lobbyHandler) {
        this._lobbyHandler = lobbyHandler
    },
    /**
     * @returns {LobbyHandler}
     */
    getLobbyHandler : function() {
        return this._lobbyHandler
    },
    setBattleHandler : function(battleHandler) {
        this._battlHandler = battleHandler
    },
    /**
     * @returns {BattleHandler}
     */
    getBattleHandler : function() {
        return this._battlHandler
    },

    ctor:function(gameClient)
    {
        this.setGameClient(gameClient)
        this.setBattleHandler(new BattleHandler(this.getGameClient()))
        this.setLobbyHandler(new LobbyHandler(this.getGameClient()))

        gameClient.packetFactory.addPacketMap(NetworkManger.packetMap)
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this)
        this._userId = 0
        NetworkManger.Connector.setInstance(this)
    },

    onReceivedPacket:function(cmd, packet)
    {
        cc.log("onReceivedPacket:", cmd)
        switch (cmd) {
            case gv.CMD.HAND_SHAKE:
                this.getLobbyHandler().sendLoginRequest()
                break
            case gv.CMD.USER_LOGIN:
                this.getLobbyHandler().getUserInfoRequest()
                this.getLobbyHandler().getTimestamp()
                break
            case gv.CMD.GET_USER_INFO:
                if (packet !== null){
                    let userInfo = new UserInfo(packet)
                    UserInfo.setInstance(userInfo)
                    fr.getCurrentScreen().onFinishLogin()
                }
                break
            case gv.CMD.BUY_SHOP_COIN:
                UserInfo.getInstance().changeGem(packet.gem)
                UserInfo.getInstance().changeGold(packet.coin)
                let popupController = PopupLayerController.getInstance()
                popupController.createPopup(PopupLayerController.TYPE.RESOURCE_ANIMATION, {resource : ResourceAnimtion.COIN })
                break
            case gv.CMD.BUY_SHOP_ITEM:
                cc.log("Buy shop item");
                if (packet.err === 7) {
                    let popupController = PopupLayerController.getInstance()
                    popupController.createPopup(PopupLayerController.TYPE.REWARD,
                        {reward : packet, hasChestInfo:true})
                    UserInfo.getInstance().earnReward(packet);
                }
                this.getLobbyHandler().getShopInfoRequest()
                this.getLobbyHandler().getCoinGem()
                this.getLobbyHandler().getCardInfo();
                if (packet.err !== 7) {
                    let popupController = PopupLayerController.getInstance()
                    popupController.createPopup(PopupLayerController.TYPE.RESOURCE_ANIMATION, {resource: ResourceAnimtion.CARD})
                }
                break
            case gv.CMD.GET_SHOP_INFO :
                let newShopItem = packet.shopItems
                UserInfo.getInstance().changeShopItem(newShopItem)
                break
            case gv.CMD.CHEAT_RESOURCE:
                if (packet !==null && packet.error ===NetworkManger.ERROR.SUCCESS){
                    cc.log("packet: ",packet );
                    UserInfo.getInstance().changeResource(
                        CheatResource.getInstance().getGold(),
                        CheatResource.getInstance().getGem(),
                        CheatResource.getInstance().getFame(),
                        CheatResource.getInstance().getExp(),
                        CheatResource.getInstance().getLevel()
                    );
                    UserInfo.getInstance().changeCard(CheatResource.getInstance().getCard());
                }
                break;
            case gv.CMD.CHEAT_CHEST:
                if (packet !==null && packet.error===NetworkManger.ERROR.SUCCESS){
                    UserInfo.getInstance().openTreasure(TreasureLayerController.indexAddingChest);
                }
                break;
            case gv.CMD.CHOOSE_CHEST:
                if (packet !==null && packet.error ===NetworkManger.ERROR.SUCCESS){
                    cc.log("Chosen Returned chest has status: ",packet.chest.status);
                    // UserInfo.getInstance().updateChest(packet.chest);
                    var chest = packet.chest;
                    this.getLobbyHandler().getTimestamp();
                    UserInfo.getInstance().updateChest({
                        index: chest.index,
                        startTime: chest.startTime,
                        waitingTime: chest.waitingTime,
                        status: chest.status
                    });

                } else if (packet.error === NetworkManger.ERROR.INVALID_PARAMETER){

                }
                break;
            case gv.CMD.OPEN_CHEST:
                cc.log("Receive to open chest");
                // var chest = UserInfo.getInstance().getChests()[TreasureLayerController.indexRequestedOpenChest];
                if (packet!==null && packet.error===NetworkManger.ERROR.SUCCESS){
                    cc.log("Allow to open chest");
                    let popupController = PopupLayerController.getInstance()
                    cc.log("open reward: ",JSON.stringify(packet));
                    popupController.createPopup(PopupLayerController.TYPE.REWARD,
                        {reward : packet, hasChestInfo: false})
                    UserInfo.getInstance().updateChest({
                        index: TreasureLayerController.indexRequestedOpenChest,
                        status: TreasureUtil.STATUS.EMPTY
                    })
                    UserInfo.getInstance().earnReward(packet);
                } else if (packet.error===NetworkManager.ERROR.TIME_REMAIN){
                    cc.log("Cannot open chest");
                    UserInfo.getInstance().updateChest(
                        {
                            index: TreasureLayerController.indexRequestedOpenChest,
                            waitingTime: packet.remainingTime
                        }
                    );
                }
                break;
            case gv.CMD.GET_COIN_GEM:
                cc.log("UPDATE UI UIUIUIUIUIUI")
                UserInfo.getInstance().changeGem(packet.gem)
                UserInfo.getInstance().changeGold(packet.coin)
                break;
            case gv.CMD.CHANGE_CARD:
                if(packet.err===NetworkManager.ERROR.INVALID_PARAMETER){
                    cc.log("Something wrong in the cid");
                    ErrorHandler.getInstance().notify(ErrorHandler.ERROR.CANNOT_SWAP);
                } else {
                    cc.log("Change Successfully");
                    ErrorHandler.getInstance().notify(ErrorHandler.ERROR.CAN_SWAP);
                }
                break;
            case gv.CMD.UPGRADE_CARD:
                if (packet.error===NetworkManager.ERROR.SUCCESS){
                    cc.log("UpgradeSuccess");
                    UserInfo.getInstance().changeGold(packet.coin);
                    UserInfo.getInstance().changeCard(new CardInfo({
                        cid: packet.cid,
                        level: packet.new_level,
                        pieces: packet.new_pieces,
                        status: UserInfo.getInstance().getCardByID(packet.cid).getStatus()
                    }));
                    // UserInfo.getInstance().notify(UserInfo.Event.CARD_UPGRADE_SUCCESS)
                    ErrorHandler.getInstance().notify(ErrorHandler.ERROR.CARD_UPGRADE_SUCCESS);
                } else {
                    cc.log("Not enough resource to upgrade");
                    ErrorHandler.getInstance().notify(ErrorHandler.ERROR.CANNOT_UPGRADE_CARD);
                }
                break;
            case gv.CMD.GET_CARD_INFO:
                if (packet!==null){
                    var numCard = packet.numCard;
                    for (var i=0;i<numCard;++i){
                        UserInfo.getInstance().changeCard(
                            new CardInfo(packet.cards[i])
                        );
                    }
                }
                break;
            case gv.CMD.BUY_CHEST_BY_GEM:
                if (packet.error===NetworkManager.ERROR.SUCCESS){
                    cc.log("Remaing Gem: ",packet.gem);
                    UserInfo.getInstance().changeGem(packet.gem);
                    ErrorHandler.getInstance().notify(ErrorHandler.ERROR.BUY_CHEST_BY_GEM_SUCCESS);
                } else if (packet.error===ErrorHandler.ERROR.NOT_ENOUGH_GEM){
                    ErrorHandler.getInstance().notify(ErrorHandler.ERROR.NOT_ENOUGH_GEM);
                }
                break
            case gv.CMD.GET_TIMESTAMP:
                cc.log("THIS IS TIMESTAMP")
                cc.log(packet.timestamp)
                UserInfo.getInstance().setTimestamp(packet.timestamp)
                UserInfo.getInstance().notify(UserInfo.Event.CHANGE_RESOURCE)
                break
            case gv.CMD.MATCHING:
                cc.log("MATCHING DONE")
                cc.log(JSON.stringify(packet))
                let battleDeck = UserInfo.getInstance().getBattleDeck()
                packet["battleDeck"] = battleDeck
                cc.log(JSON.stringify(UserInfo.getInstance()))
                MainController.getInstance().runBattleScene(packet)
                break
            case gv.CMD.ABORT_MATCHING:
                cc.log("abort matching ok")
                if (packet.err===0){
                    UserInfo.getInstance().notify(UserInfo.Event.ABORT_MATCH_DONE)
                }
                break
            case gv.CMD.DROP_MONSTER:
                cc.log("DROP MONSTER _ REAL")
                this.getBattleHandler().receiveDropMonster(packet)
                cc.log(JSON.stringify(packet))
                break
            case gv.CMD.PLANT_TOWER:
                cc.log("PLANT TOWER NOW")
                this.getBattleHandler().receivePlantTower(packet)
                cc.log(JSON.stringify(packet))

        }
    },
});
NetworkManger.Connector._instance = null
NetworkManger.Connector.setInstance = function(instance) {
    NetworkManger.Connector._instance = instance
}
/**
 * @returns {NetworkManger.Connector}
 */
NetworkManger.Connector.getIntance = function() {
    return NetworkManger.Connector._instance
}

NetworkManger.ERROR = {
    SUCCESS:0,
    INVALID_PARAMETER: 4,
    TIME_REMAIN:8,
}