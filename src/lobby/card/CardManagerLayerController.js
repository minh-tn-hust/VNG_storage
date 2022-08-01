var CardManagerLayerController = cc.Class.extend({
    replaceCardLayer:null,
    swappingCardID: new Array(2),

    setSwappingCardID: function (battleDeckCardID, discoverDeckCardID) {
        this.swappingCardID[0]=battleDeckCardID;
        this.swappingCardID[1]=discoverDeckCardID;
    },

    ctor: function(lobbyLayerController){
        this.lobbySceneController = lobbyLayerController;
        this.cardLayer = new CardManagerLayer(this);

        ErrorHandler.getInstance().addEventListener(ErrorHandler.ERROR.CAN_SWAP,this.swapCard.bind(this));
        ErrorHandler.getInstance().addEventListener(ErrorHandler.ERROR.CANNOT_SWAP,this.switchToCardMode.bind(this));
    },

    getLayer: function(){
        return this.cardLayer;
    },

    display: function(){

    },

    canUpdateCard: function(cardInfo){

    },

    updateCardInfo: function(){
        CardUtil.updateCard(CardManagerLayerController.updatedCard);
        this.cardLayer.updateCard(CardManagerLayerController.updatedCard);
    },

    askToSwapCard: function (battleDeckCardID, discoverDeckCardID) {
        this.setSwappingCardID(battleDeckCardID,discoverDeckCardID);
        NetworkManager.Connector.getIntance().getLobbyHandler().changeCard(battleDeckCardID,discoverDeckCardID)
    },

    swapCard: function(){
        this.cardLayer.switchToCardMode();
        CardUtil.swapCard(this.swappingCardID[0],this.swappingCardID[1]);
    },

    switchToReplaceMode: function(){
        this.cardLayer.switchToReplaceMode();
    },

    switchToCardMode: function () {
        cc.log("switch call")
        this.cardLayer.switchToCardMode();
    }
})

CardManagerLayerController.UpdateCard = null