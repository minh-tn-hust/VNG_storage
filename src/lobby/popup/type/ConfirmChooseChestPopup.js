var ConfirmChooseChestPopup = ChestInfoPopup.extend({
    treasureLayerController: null,
    popupLayer:null,
    getTreasureLayerController: function () {
        return this.treasureLayerController;
    },
    setTreasureLayerController: function (treasureLayerController) {
        this.treasureLayerController = treasureLayerController;
    },
    getPopupLayer: function () {
        return this.popupLayer;
    },
    setPopupLayer: function (popupLayer) {
        this.popupLayer = popupLayer;
    },
    ctor: function (controller,metadata) {
        this._super(controller,metadata);
        this.setTreasureLayerController(metadata.treasureLayerController);
    },

    initPopupLayer : function() {
        let popupLayer = ccs.load(res.json.Popup.openChest_json).node;
        this.setPopupLayer(popupLayer);
        popupLayer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(popupLayer);
        popupLayer.setPosition(0,0);
        this.addChild(popupLayer);

        // thêm animation cho rương, rương bay bay
        let chestPedestal = Util.getChildByName(popupLayer, "ChestPedestal")[0];
        let chestAnim = new sp.SkeletonAnimation(ChestAssetConfig.Fx.Open.json, ChestAssetConfig.Fx.Open.alas);
        let chestPedestalContentSize = chestPedestal.getContentSize();
        chestAnim.setPosition(chestPedestalContentSize.width / 2, 0);
        chestPedestal.addChild(chestAnim);
        chestAnim.setAnimation(0, "chest_idle_infor", true);


        // khởi tạo sự kiện kich vào nút thoát
        let exitButton = Util.getChildByName(popupLayer, "ExitButton")[0];
        this.initCloseButton(exitButton);

        this.setupButton();
    },

    setupButton: function () {
        // khởi tạo sự kiện bất kì
        let openButton = Util.getChildByName(this.getPopupLayer(), "OpenChest")[0]
        openButton.addTouchEventListener(function(button, event) {
            Util.uiReact(button, event, function() {
                this.getTreasureLayerController().chooseTreasure(this.getIndex());
                this.closePopupLayer()
            }.bind(this));
        }, this);

        var goldIcon = Util.getChildByName(this.getPopupLayer(),"ResourceIcon")[0];
        var chooseChestLabel = new ccui.Text();
        chooseChestLabel.setString("Mở rương");
        chooseChestLabel.setFontName("SVN-SupercellMagic");
        chooseChestLabel.setFontSize(25);
        openButton.addChild(chooseChestLabel);
        chooseChestLabel.setPosition(goldIcon.getPosition());
        chooseChestLabel.x+=30;
        goldIcon.setOpacity(0);
    }
})