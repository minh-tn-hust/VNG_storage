var CardInfoCollectionPopup = CardInfoInformationPopup.extend({
    ctor: function(popupController,card){
        this._super(popupController,card);
    },

    getLayer: function() {
        return ccs.load(res.json.Popup.cardInfoDiscovery_json).node;
    },

    setupButton: function(){
        var selectButton = Util.getChildByName(this.layer,"SelectButton")[0];
        selectButton.addTouchEventListener(function (sender,type){
            var self = this;
            Util.uiReact(sender,type,function(){
                self.closePopupLayer();
                self.getController().getLobbyController().displaySwapCardLayer(self.card);
            });
        },this);
    }
})