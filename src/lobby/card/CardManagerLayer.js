var CardManagerLayer = cc.Layer.extend({
    nCardBattle: 8,
    nCardDiscover:10,
    mouseClickedCard: null,
    scrollView: null,
    chosenCard: null, // card that is chosen to switched into battle deck
    replaceNode: null,
    cardMode: CardUtil.buttonCardMode.MANAGE_MODE_CARD,

    getMouseClickedCard: function(){
        return this.mouseClickedCard;
    },

    setMouseClickedCard: function(card){
        this.mouseClickedCard = card;
    },

    ctor: function (cardLayerController){
        this._super();
        this.cardLayerController = cardLayerController;

        this.cardLayer = ccs.load("card_CardLayer.json","").node;
        this.cardLayer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(this.cardLayer);
        this.addChild(this.cardLayer,1);

        this.scrollView = this.cardLayer.getChildByName("ScrollView");
        this.scrollView.setSwallowTouches(false);
        this.formationNode = Util.getChildByName(this.cardLayer,"FormationNode")[0];
        this.collectionNode = Util.getChildByName(this.cardLayer,"CollectionNode")[0];
        this.replaceNode = Util.getChildByName(this.cardLayer,"ReplaceNode")[0];
        this.chosenCard = Util.getChildByName(this.replaceNode,"ReplaceCard")[0];

        var cardInfos = UserInfo.getInstance().getCards();
        var battleDeck = [];
        var discoverDeck = [];
        for (var card of cardInfos){
            if (card.getStatus() ===CardUtil.STATUS.BATTLE){
                battleDeck.push(card);
            } else {
                discoverDeck.push(card);
            }
        }
        this.createBattleDeck(battleDeck);
        this.createDiscoverDeck(discoverDeck);
    },

    createBattleDeck: function(battleDeck){
        var cards = Util.getChildByName(this.formationNode,"card");
        var button;
        for (var i=0;i<this.nCardBattle;++i){
            battleDeck[i].setCardImage(cards[i]);
            cards[i].tag=battleDeck[i].getCardID();
            button = Util.getChildByName(cards[i],"buttonCard")[0];
            button.addTouchEventListener(function (sender,type) {
                if (this.cardMode === CardUtil.buttonCardMode.MANAGE_MODE_CARD) {
                    this.buttonOpenPopup(sender,type,CardUtil.idPopup.BTL_CARD_PU)
                } else if (this.cardMode === CardUtil.buttonCardMode.SWITCH_MODE_CARD){
                    Util.uiReact(sender, type, function () {
                        this.cardLayerController.askToSwapCard(sender.parent.tag, this.chosenCard.tag);
                        this.cardMode = CardUtil.buttonCardMode.MANAGE_MODE_CARD;
                    }.bind(this));
                }
            },this);
            button.setSwallowTouches(false);
        }
    },

    setCard: function(card, cardInfo){
        // card.setUserData([cardInfo.getCardID(),cardInfo.getRank()]);
        card.getUserData.copyCard(cardInfo);
        CardUtil.setCardUI(card,cardInfo);
    },

    createDiscoverDeck: function(discoverDeck){
        var cards = Util.getChildByName(this.collectionNode,"card");
        var button;
        for (var i=0;i<this.nCardDiscover;++i){

            discoverDeck[i].setCardImage(cards[i]);
            cards[i].tag=discoverDeck[i].getCardID();

            button = Util.getChildByName(cards[i],"buttonCard")[0];
            button.addTouchEventListener(function (sender,type) {
                this.buttonOpenPopup(sender,type,CardUtil.idPopup.DCV_CARD_PU);
            },this)
            button.setSwallowTouches(false);
        }
    },

    buttonOpenPopup: function(sender,type,idPopup){
        // this.scrollView.setSwallowTouches(true);
        Util.uiReact(sender,type,function (){
            this.setMouseClickedCard(sender.parent);
            let popupLayerController = PopupLayerController.getInstance();

            // open popup cardInfo
            popupLayerController.createPopup(idPopup,
                {cardID:sender.parent.tag});
            // this.scrollView.setSwallowTouches(false);
        }.bind(this));
    },

    updateCard: function(cardInfo){
        var deck;
        if (cardInfo.getStatus()===0){
            deck = this.collectionNode;
        } else {
            deck = this.formationNode;
        }

        var cards = Util.getChildByName(deck,"card");
        var tmpInfo;
        for (var i=0;i<cards.length;++i){
            tmpInfo = cards[i].getUserData();
            if (tmpInfo.getCardID() === cardInfo.getCardID()){
                this.setCard(cards[i],cardInfo);
                break;
            }
        }
    },

    switchToReplaceMode: function(){
        this.scrollView.jumpToPercentVertical(10);
        this.scrollView.setTouchEnabled(false);
        this.collectionNode.setVisible(false);
        this.cardMode = CardUtil.buttonCardMode.SWITCH_MODE_CARD;

        CardUtil.setupReplacingNodeUI(this.replaceNode,
            UserInfo.getInstance().getCardByID(this.getMouseClickedCard().tag));
        },

    switchToCardMode: function(){
        this.scrollView.setTouchEnabled(true);
        this.collectionNode.setVisible(true);
        CardUtil.disableReplacingNodeUI(this.replaceNode);
    },
})