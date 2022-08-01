let BuyItemPopup = PopupLayer.extend({
    _data : null,
    _layer : null,
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
    ctor : function(controller, data) {
        this._super(controller)
        this.setData(data)
        this.loadResource()
    },
    /**
     * Thực hiện load resource theo từng loại data mà người dùng đưa vào, có 2 loại data đưa vào popup này đó là
     * Item và Coin (xem trong file Excel)
     */
    loadResource : function() {
        let buyItemPopup = this.getLayer()
        let data = this.getData().data
        cc.log(JSON.stringify(data))
        let itemDisplay = Util.getChildByName(buyItemPopup, "ItemBackground")[0]
        let titlle = Util.getChildByName(buyItemPopup, "Title")[0]
        let itemTitle = itemDisplay.getChildByName("ItemTitle")
        let pieces = itemDisplay.getChildByName("Pieces")
        let contentImage = itemDisplay.getChildByName("ItemImage")
        let buyButton = Util.getChildByName(buyItemPopup, "BuyButton")[0]
        let priceTitle = Util.getChildByName(buyButton, "Title")[0]
        let priceIcon = Util.getChildByName(buyButton, "Icon")[0]
        let showInfoPopupButton = Util.getChildByName(buyItemPopup, "ItemBackground")[0]
        let toolTip = Util.getChildByName(buyItemPopup, "Tooltip")[0]
        toolTip.setVisible(false)

        if (data.coin) {
            titlle.setString("MUA ITEM")
            itemTitle.setVisible(false)
            pieces.setString("X" + data.pieces.toString())
            contentImage.setTexture(CardAssetConfig.assetImage[data.id])
            priceTitle.setString(data.coin.toString())
            priceIcon.setTexture(res.json.ShopUI.goldIcon)
            showInfoPopupButton.addTouchEventListener(function(button, event){
                Util.uiReact(button, event, function(){

                })
            }, this)
        } else {
            titlle.setString("MUA VÀNG")
            pieces.setVisible(false)
            itemTitle.setString(Util.numberToString(data.value))
            priceTitle.setString(data.gem)
            priceIcon.setTexture(res.json.ShopUI.gemIcon)
            cc.log(data.value)
            switch (data.value) {
                case 1000 :
                    contentImage.setTexture(res.json.ShopUI.goldIcons[0])
                    break
                case 2000 :
                    contentImage.setTexture(res.json.ShopUI.goldIcons[1])
                    break
                case 4000 :
                    contentImage.setTexture(res.json.ShopUI.goldIcons[2])
                    break
            }
            showInfoPopupButton.addTouchEventListener(function(button, event){
                Util.uiReact(button, event, function(){
                    toolTip.setVisible(!toolTip.isVisible())
                })
            }, this)
        }


        buyButton.addTouchEventListener(function(sender, eventType) {
            let self = this
            Util.uiReact(sender, eventType, function() {
                self.getData().callBack()
                self.closePopupLayer()
            })
        }, this)
    },



    initPopupLayer : function() {
        let buyItemPopup = ccs.load(res.json.Popup.buyItemNoti_json).node
        buyItemPopup.setContentSize(cc.winSize)
        ccui.Helper.doLayout(buyItemPopup)
        buyItemPopup.setPosition(0,0)
        this.addChild(buyItemPopup)
        this.setLayer(buyItemPopup)

        let exitButton = Util.getChildByName(buyItemPopup, "ExitButton")[0]
        this.initCloseButton(exitButton)
    }
})