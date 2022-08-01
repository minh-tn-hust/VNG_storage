var CheatCardPopup = PopupLayer.extend({
    card:null,
    imageCard:null,
    nPieceText:null,
    levelText:null,
    textFieldCardID:null,
    textFieldLevel:null,
    textFieldNPieces:null,

    initPopupLayer : function() {
        this.layer = this.getLayer();
        this.addLayer(this.layer);

        // khởi tạo sự kiện kich vào nút thoát
        let exitButton = Util.getChildByName(this.layer,"ExitButton")[0];
        this.initCloseButton(exitButton);

        this.setupButton();
    },

    addLayer: function(layer){
        layer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(layer);
        layer.setPosition(0,0);
        this.addChild(layer);
    },

    getLayer: function(){
        return ccs.load(res.json.Popup.cheatCardPopup_json).node;
    },

    setupButton: function (){
        var user = UserInfo.getInstance();

        var textFieldGold =  Util.getChildByName(this.layer,"textFieldGold")[0];
        textFieldGold.setString(user.getGold());

        var textFieldGem = Util.getChildByName(this.layer,"textFieldGem")[0];
        textFieldGem.setString(user.getGem());

        var textFieldTrophy = Util.getChildByName(this.layer,"textFieldTrophy")[0];
        textFieldTrophy.setString(user.getTrophy());

        this.card = UserInfo.getInstance().getCardByID(0);

        this.imageCard = Util.getChildByName(this.layer,"imageCard")[0];

        this.textFieldCardID = Util.getChildByName(this.layer,"textFieldCardID")[0];
        this.textFieldCardID.addEventListener(this.textFieldCardListenEvent,this);

        this.textFieldLevel = Util.getChildByName(this.layer,"textFieldLevel")[0];
        this.textFieldNPieces = Util.getChildByName(this.layer,"textFieldNPieces")[0];
        this.levelText = Util.getChildByName(this.layer,"levelText")[0];
        this.nPieceText = Util.getChildByName(this.layer,"nPiecesText")[0];

        this.setDisplayCard(this.card);

        var sendButton = this.layer.getChildByName("SendButton");
        var self = this;
        sendButton.addTouchEventListener(function(button, type) {
            Util.uiReact(button, type, function() {
                self.sendEvent();
                self.closePopupLayer();
            })
        }, this);
    },

    textFieldCardListenEvent: function(sender,type){
        switch(type) {
            case ccui.TextField.EVENT_INSERT_TEXT:
                this.card = UserInfo.getInstance().getCardByID(parseInt(sender.getString()));
                if (this.card!==null) {
                    this.setDisplayCard(this.card);
                } else {
                    this.displayNullCard();
                }
        }
    },

    setDisplayCard: function(card){
        this.imageCard.loadTexture(CardUtil.getNormalPictureButtonPath(this.card.getCardID()));
        this.textFieldLevel.setString(card.level);
        this.textFieldNPieces.setString(card.getPieces());
        this.levelText.setString(card.level);
        this.nPieceText.setString(card.getPieces());
    },

    displayNullCard: function(){
        this.imageCard.loadTexture("lobby_asset/lobby_card_switch_glossy.png");
        this.textFieldLevel.setString("");
        this.textFieldNPieces.setString("");
        this.levelText.setString(0);
        this.nPieceText.setString(0);
    },

    sendEvent: function(){
        var textField =  Util.getChildByName(this.layer,"textFieldGold")[0];
        var gold=textField.getString();

        textField = Util.getChildByName(this.layer,"textFieldGem")[0];
        var gem = parseInt(textField.getString());

        textField = Util.getChildByName(this.layer,"textFieldTrophy")[0];
        var fame = parseInt(textField.getString());

        if (this.card!==null) {
            var cardID = this.card.getCardID();
            var cLevel = parseInt(this.textFieldLevel.getString());
            var pieces = parseInt(this.textFieldNPieces.getString());
            var status = this.card.getStatus();
            CheatResource.setInstance(gold,gem,fame,-1,-1,
                new CardInfo({
                    cid: cardID,
                    level: cLevel,
                    pieces: pieces,
                    status: status})
            );
            NetworkManger.Connector.getIntance().getLobbyHandler().cheatResources(
                gold,gem,fame,-1,-1,
                cardID,cLevel,pieces,status
            );
        } else {
            CheatResource.setInstance(gold,gem,fame,-1,-1,null);
            NetworkManger.Connector.getIntance().getLobbyHandler().cheatResources(
                gold,gem,fame,-1,-1,
                -1,-1,-1,-1
            );
        }

    }

})

var CheatResource = cc.Class.extend({
    setInfo: function(gold,gem,fame,exp,level,card){
        this.setGold(gold);
        this.setGem(gem);
        this.setFame(fame);
        this.setExp(exp);
        this.setLevel(level);
        this.setCard(card);
    },

    getGold: function(){
        return this.gold;
    },
    getGem: function(){
        return this.gem;
    },
    getFame: function(){
        return this.fame;
    },
    getExp: function(){
        return this.exp;
    },
    getLevel: function(){
        return this.level;
    },
    getCard: function(){
        return this.card;
    },
    setGold: function(gold){
        if (gold>=0) {
            this.gold = gold;
        } else {
            // this.setGold(UserInfo.getInstance().getGold());
            this.gold = UserInfo.getInstance().getGold();
        }
    },
    setGem: function (gem) {
        if (gem>=0) {
            this.gem = gem;
        } else {
            // this.setGem(UserInfo.getInstance().getGem());
            this.gem = UserInfo.getInstance().getGem();
        }
    },
    setFame: function(fame) {
        if (fame>=0) {
            this.fame = fame;
        } else {
            // this.setFame(UserInfo.getInstance().getTrophy());
            this.fame = UserInfo.getInstance().getTrophy();
        }
    },
    setExp: function(exp){
        if (exp>=0) {
            this.exp = exp;
        } else {
            // this.setExp(UserInfo.getInstance().getExp());
            this.exp = UserInfo.getInstance().getExp();
        }
    },
    setLevel: function(level){
        if (level>=0) {
            this.level = level;
        } else {
            // this.setLevel(UserInfo.getInstance().getLevel());
            this.level = UserInfo.getInstance().getLevel();
        }
    },
    setCard: function(card){
        this.card=card;
    }
})

CheatResource.cheatResources = new CheatResource();

/**
 * @returns {UserInfo}
 */
CheatResource.getInstance = function() {
    return CheatResource.cheatResources;
}
CheatResource.setInstance = function(gold,gem,fame,exp,level,card) {
    CheatResource.getInstance().setInfo(gold,gem,fame,exp,level,card);
}