var UpgradeCardSuccess =  PopupLayer.extend({
    initPopupLayer : function() {
        let upgradeCardSuccessLayer = ccs.load(res.json.Popup.upgradeCardSuccess_json).node;
        upgradeCardSuccessLayer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(upgradeCardSuccessLayer);
        upgradeCardSuccessLayer.setPosition(0,0);
        this.addChild(upgradeCardSuccessLayer);
        this.layer = upgradeCardSuccessLayer;

        let exitButton = Util.getChildByName(upgradeCardSuccessLayer, "ExitButton")[0];
        this.initCloseButton(exitButton);
    }
})