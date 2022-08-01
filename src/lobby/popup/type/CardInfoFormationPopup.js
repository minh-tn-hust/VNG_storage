let CardInfoInformationPopup = PopupLayer.extend({
    ctor: function(popupController,card){
        cc.log("Obtained card: ",card);
        this.card = card;
        this._super(popupController);
    },

    initPopupLayer : function() {
        this.layer = this.getLayer();
        this.addLayer(this.layer);

        // khởi tạo sự kiện kich vào nút thoát
        let exitButton = Util.getChildByName(this.layer,"ExitButton")[0];
        this.initCloseButton(exitButton);

        var nodeCardIcon = Util.getChildByName(this.layer,"CardIcon")[0];
        CardUtil.setCardUI(nodeCardIcon,this.card.getUserData());

        this.setupButton();
    },

    addLayer: function(layer){
        layer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(layer);
        layer.setPosition(0,0);
        this.addChild(layer);
    },

    getLayer: function(){
        return ccs.load(res.json.Popup.cardInfoBattle_json).node;
    },

    setupButton: function(){}
})