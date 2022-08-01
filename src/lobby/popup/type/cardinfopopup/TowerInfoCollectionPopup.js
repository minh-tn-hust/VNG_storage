var TowerInfoCollectionPopup = TowerInfoBattlePopup.extend({
    ctor: function (popupController,cardID){
        this._super(popupController,cardID);
    },

    getLayer: function () {
        return ccs.load(res.json.Popup.cardInfoDiscovery_json).node;
    },

    setupButton: function(){
        this._super();
        var selectButton = Util.getChildByName(this.layer,"SelectButton")[0];
        selectButton.addTouchEventListener(function (sender,type){
            var self = this;
            Util.uiReact(sender,type,function(){
                self.closePopupLayer();
                self.getController().getLobbyController().displaySwapCardLayer();
            });
        },this);
    }
})