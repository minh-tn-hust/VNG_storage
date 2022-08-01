let ChestInfoPopup = PopupLayer.extend({
    _index : null,
    getIndex : function() {
        return this._index
    },
    setIndex : function(index) {
        this._index = index
    },
    ctor : function(controller , metadata) {
        this._super(controller)
        this.setIndex(metadata.index)
    },

    initPopupLayer : function() {
        cc.log("CALL - 001")
        let chestInfoLayer = ccs.load(res.json.Popup.openChest_json).node
        chestInfoLayer.setContentSize(cc.winSize)
        ccui.Helper.doLayout(chestInfoLayer)
        chestInfoLayer.setPosition(0,0)
        this.addChild(chestInfoLayer)

        // thêm animation cho rương, rương bay bay
        let chestPedestal = Util.getChildByName(chestInfoLayer, "ChestPedestal")[0]
        let chestAnim = new sp.SkeletonAnimation(ChestAssetConfig.Fx.Open.json, ChestAssetConfig.Fx.Open.alas)
        let chestPedestalContentSize = chestPedestal.getContentSize()
        chestAnim.setPosition(chestPedestalContentSize.width / 2, 0)
        chestPedestal.addChild(chestAnim)
        chestAnim.setAnimation(0, "chest_idle_infor", true)


        // khởi tạo sự kiện kich vào nút thoát
        let exitButton = Util.getChildByName(chestInfoLayer, "ExitButton")[0]
        this.initCloseButton(exitButton)

        // khởi tạo sự kiện bất kì
        let openButton = Util.getChildByName(chestInfoLayer, "OpenChest")[0]
        openButton.addTouchEventListener(function(button, event) {
            let self = this
            Util.uiReact(button, event, function() {
                NetworkManager.Connector.getIntance().getLobbyHandler().buyItemRequest(self.getIndex())
            })
        }, this)
    },

    openChestLayer : function() {
        let controller = this.getController()
        this.openAnotherPopup(PopupLayerController.TYPE.REWARD)
    }
})