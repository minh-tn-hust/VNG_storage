let RewardPopup = PopupLayer.extend({
    _layer : null,
    _data : null,
    hasChestInfo :null,
    getData : function() {
        return this._data
    },
    setData : function(data) {
        this._data = data
    },
    getLayer : function() {
        return this._layer
    },
    setLayer : function(layer) {
        this._layer = layer
    },
    isHasChestInfo: function () {
        return this.hasChestInfo;
    },
    setHasChestInfo: function (hasChestInfo) {
        this.hasChestInfo=hasChestInfo;
    },

    ctor : function(controller, metadata) {
        this._super(controller)
        this.setData(metadata.reward);
        this.setHasChestInfo(metadata.hasChestInfo);
        this.initFeature()
    },
    initFeature : function() {
        let rewardLayer = this.getLayer()
        let tes1Fx = new sp.SkeletonAnimation(ChestAssetConfig.Fx.Open.json, ChestAssetConfig.Fx.Open.alas)
        tes1Fx.setAnchorPoint(0.5, 0.5)
        tes1Fx.setPosition(cc.winSize.width / 2, 30)
        rewardLayer.addChild(tes1Fx, 0, 3)
        tes1Fx.setAnimation(0, "init", false)
        let self = this
        let count = 0
        let itemData = this.getData()
        tes1Fx.setCompleteListener(function() {
            self.createDisplayItem(itemData.listCardReward[count], count)
            if (count < itemData.listCardReward.length - 1) {
                count++
                tes1Fx.setAnimation(0, "opening", false)
            } else {
                let confirmButton = Util.getChildByName(rewardLayer, "ConfirmButton")[0]
                confirmButton.setScale(0.8)
                confirmButton.setVisible(true)
                let scaleTo = cc.scaleTo(0.3, 1).easing(cc.easeBackOut(2))
                confirmButton.runAction(scaleTo)
            }
        })
    },
    initPopupLayer : function() {
        let rewardLayer = ccs.load(res.json.Popup.rewardPopup_json).node
        rewardLayer.setContentSize(cc.winSize)
        ccui.Helper.doLayout(rewardLayer)
        rewardLayer.setPosition(0,0)
        this.addChild(rewardLayer)
        this.setLayer(rewardLayer)


        // khởi tạo sự kiện kich vào nút thoát
        let confirmButton = rewardLayer.getChildByName("ConfirmButton")
        confirmButton.setLocalZOrder(100000)
        confirmButton.addTouchEventListener(function(button, event) {
            Util.uiReact(button, event, function(){
                NetworkManager.Connector.getIntance().getLobbyHandler().getCoinGem()
                let popupController = PopupLayerController.getInstance()
                // close reward
                popupController.removePopup(null)
                //close chest info
                if (this.isHasChestInfo()) {
                    popupController.removePopup(null)
                }
            }.bind(this));
        }, this)
        confirmButton.setVisible(false)
    },
    createDisplayItem : function(itemInfo, index) {
        let layer = this.getLayer()
        let chestItem = ccs.load("reward_Item.json").node
        chestItem.setContentSize(cc.winSize)
        ccui.Helper.doLayout(chestItem)

        let appearPos = cc.p(cc.winSize.width / 2, cc.winSize.height / 5 * 4 - cc.winSize.height / 10)
        chestItem.setPosition(appearPos)
        chestItem.setScale(0.8)
        layer.addChild(chestItem, 2, index)
        let absolutePos = this.getPosiotionWithIndex(index)
        let scaleTo = cc.scaleTo(0.2, 1).easing(cc.easeBounceOut(1.5))
        let moveTo = cc.moveTo(0.3 , absolutePos)
        chestItem.runAction(cc.sequence([scaleTo, moveTo]))

        let itemImage = Util.getChildByName(chestItem, "ItemImage")[0]
        let itemTitle = Util.getChildByName(chestItem, "ItemTitle")[0]
        let pieces = Util.getChildByName(chestItem, "Pieces")[0]

        if (itemInfo.coin) {
            itemTitle.setString(itemInfo.coin)
            pieces.setVisible(false)
            itemImage.setTexture(res.json.ShopUI.goldIcons[1])
        } else {
            itemTitle.setVisible(false)
            itemImage.setTexture(CardAssetConfig.assetImage[itemInfo.cid])
            pieces.setString("X" + itemInfo.pieces)
        }
    },
    /**
     * @param index
     * @returns {cc.Point}
     */
    getPosiotionWithIndex : function(index){
        let deltaX = index % 3 - 1
        let deltaY = Math.round((index - 1) / 3)
        cc.log(index)
        cc.log(deltaX)
        cc.log(deltaY)
        let animationPos = cc.p(cc.winSize.width / 2 + deltaX * 640 / 4, cc.winSize.height / 5 * 4 - deltaY * 1134 / 4)
        return animationPos
    },
})