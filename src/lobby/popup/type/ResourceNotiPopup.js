let ResourceNotiPopup = PopupLayer.extend({
    _type : null,
    _layer : null,

    getLayer : function() {
        return this._layer
    },

    setLayer : function(layer) {
        this._layer = layer
    },

    getType : function() {
        return this._type
    },

    setType : function(type) {
        this._type = type
    },

    ctor : function(controller, metadata) {
        this._super(controller)
        this.setType(metadata.type)
        this.initWithData()
    },

    initWithData : function() {
        let layer = this.getLayer()
        let type = this.getType()

        let title = Util.getChildByName(layer, "Title")[0]
        let icon = Util.getChildByName(layer, "ResourceIcon")[0]
        let resourceTitle = Util.getChildByName(layer, "Resource")[0]
        let content = Util.getChildByName(layer, "NotiContent")[0]
        let currentPosition = content.getPosition()
        let confirmButton = Util.getChildByName(layer, "ConfirmButton")[0]
        let confirmTitle = Util.getChildByName(layer, "ConfirmTitle")[0]

        switch (type) {
            case ShopLayerController.Resource.GOLD :
                title.setString("KHÔNG ĐỦ VÀNG")
                icon.setTexture(res.json.ShopUI.goldIcon)
                resourceTitle.setString("VÀNG")
                currentPosition.x += 25
                break
            case ShopLayerController.Resource.GEM:
                title.setString("KHÔNG ĐỦ NGỌC")
                icon.setTexture(res.json.ShopUI.gemIcon)
                resourceTitle.setString("NGỌC")
                currentPosition.x += 30
                break
            case ShopLayerController.Resource.BUYED:
                title.setString("ỦA MUA TIẾP HẢ")
                icon.setVisible(false)
                resourceTitle.setVisible(false)
                content.setVisible(false)
                let anotherContent = Util.getChildByName(layer, "AnotherContent")[0]
                anotherContent.setString("HÔM NAY MUA RỒI,\nMAI QUAY LẠI NHÁ")
                anotherContent.setVisible(true)
                confirmTitle.setString("BIẾT RÒI")
                this.initCloseButton(confirmButton)
                break
            case  ShopLayerController.Resource.SUCCESS_BUY:
                title.setString("CẢM ƠN BẠN ĐÃ HIẾN MÁU")
                icon.setVisible(false)
                resourceTitle.setVisible(false)
                content.setVisible(false)
                let successFull = Util.getChildByName(layer, "AnotherContent")[0]
                successFull.setString("MUA THÀNH CÔNG RỒI NHÓ\n CHECK RƯƠNG ĐỒ THOI")
                successFull.setVisible(true)
                confirmTitle.setString("BIẾT RÒI")
                this.initCloseButton(confirmButton)
                break
            default:
                title.setString("KHÔNG ĐỦ TÀI NGUYÊN");
                // icon.setTexture(res.json.ShopUI.goldIcon);
                resourceTitle.setString("TÀI NGUYÊN");
                currentPosition.x += 30;
                break;
        }
        content.setPosition(currentPosition)
    },

    initPopupLayer : function() {
        let resourceNotiLayer = ccs.load(res.json.Popup.resourceNotification).node
        resourceNotiLayer.setContentSize(cc.winSize)
        ccui.Helper.doLayout(resourceNotiLayer)
        resourceNotiLayer.setPosition(0,0)
        this.addChild(resourceNotiLayer)
        this.setLayer(resourceNotiLayer)

        let exitButton = Util.getChildByName(resourceNotiLayer, "ExitButton")[0]
        this.initCloseButton(exitButton)
    }
})