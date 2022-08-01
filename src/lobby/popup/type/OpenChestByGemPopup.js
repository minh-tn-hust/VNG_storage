var OpenChestByGemPopup = ChestInfoPopup.extend({
    requiredGem: 18,
    ctor: function (controller,metadata) {
        this.requiredGem = metadata.requiredGem;
        this._super(controller,metadata);
        cc.log("gem: ",this.requiredGem);
        ErrorHandler.getInstance().addEventListener(
            ErrorHandler.ERROR.NOT_ENOUGH_GEM,
            this.notEnoughGem.bind(this)
        );
        ErrorHandler.getInstance().addEventListener(
            ErrorHandler.ERROR.BUY_CHEST_BY_GEM_SUCCESS,
            this.buySuccess.bind(this)
        );
    },

    initPopupLayer : function() {
        let chestInfoLayer = ccs.load(res.json.Popup.openChest_json).node;
        chestInfoLayer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(chestInfoLayer);
        chestInfoLayer.setPosition(0,0);
        this.addChild(chestInfoLayer);

        // thêm animation cho rương, rương bay bay
        let chestPedestal = Util.getChildByName(chestInfoLayer, "ChestPedestal")[0];
        let chestAnim = new sp.SkeletonAnimation(ChestAssetConfig.Fx.Open.json, ChestAssetConfig.Fx.Open.alas);
        let chestPedestalContentSize = chestPedestal.getContentSize();
        chestAnim.setPosition(chestPedestalContentSize.width / 2, 0);
        chestPedestal.addChild(chestAnim);
        chestAnim.setAnimation(0, "chest_idle_infor", true);

        var goldIcon = Util.getChildByName(chestInfoLayer,"ResourceIcon")[0];
        goldIcon.setTexture("common_asset/common_icon_g_small.png");
        var openChestTitle = Util.getChildByName(chestInfoLayer,"OpenChestTitle")[0];
        openChestTitle.setString(this.requiredGem);


        // khởi tạo sự kiện kich vào nút thoát
        let exitButton = Util.getChildByName(chestInfoLayer, "ExitButton")[0];
        this.initCloseButton(exitButton);

        // khởi tạo sự kiện bất kì
        let openButton = Util.getChildByName(chestInfoLayer, "OpenChest")[0]
        openButton.addTouchEventListener(function(button, event) {
            let self = this
            Util.uiReact(button, event, function() {
                if (UserInfo.getInstance().getGem()<self.requiredGem){
                    self.notEnoughGem();
                } else {
                    NetworkManager.Connector.getIntance().getLobbyHandler().buyChestByGem(self.getIndex())
                }
            })
        }, this)
    },

    notEnoughGem: function () {
        this.openAnotherPopup(
            PopupLayerController.TYPE.RESOURCE_NOTIFICATION,
            {type: ShopLayerController.Resource.GEM}
        )
    },

    buySuccess: function () {
        cc.log("Buy Success: ",this.getIndex());
        UserInfo.getInstance().updateChest({
            index: this.getIndex(),
            startTime:0,
            waitingTime: 0,
            remainingTime:0,
            status: TreasureUtil.STATUS.WAITING_TO_OPEN
        });
        UserInfo.getInstance().notify(UserInfo.Event.CHEST_OPEN_BY_GEM,this.getIndex());
        this.closePopupLayer();
    },

    /**
     * Phương thức sử dụng để close popup hiện tại
     */
    closePopupLayer : function() {
        ErrorHandler.getInstance().removeEventListener(ErrorHandler.ERROR.BUY_CHEST_BY_GEM_SUCCESS);
        ErrorHandler.getInstance().removeEventListener(ErrorHandler.ERROR.NOT_ENOUGH_GEM);
        this._super();
    }
})