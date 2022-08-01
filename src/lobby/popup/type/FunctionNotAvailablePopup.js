var FunctionNotAvailablePopup = PopupLayer.extend({
    initPopupLayer : function() {
        let functionNotAvailableLayer = ccs.load(res.json.Popup.functionNotAvailable_json).node;
        functionNotAvailableLayer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(functionNotAvailableLayer);
        functionNotAvailableLayer.setPosition(0,0);
        this.addChild(functionNotAvailableLayer);

        // khởi tạo sự kiện kich vào nút thoát
        let exitButton = Util.getChildByName(functionNotAvailableLayer, "ExitButton")[0];
        this.initCloseButton(exitButton);
    },

})