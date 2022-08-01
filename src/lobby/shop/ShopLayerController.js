let ShopLayerController = cc.Class.extend({
    _controller : null,
    _shopLayer : null,
    getController : function() {
        return this._controller

    },
    setController : function(controller) {
        this._controller = controller
    },
    getLayer : function() {
        return this._shopLayer
    },
    setLayer : function(shopLayer) {
        this._shopLayer = shopLayer
    },


    /**
     * khởi tạo controller dành cho ShopLayer
     * @param {LobbySceneController} controller
     */
    ctor : function(controller) {
        this.setController(controller)
        this.initShopLayer()
    },
    initShopLayer : function() {
        let shopLayer = new ShopLayer(this)
        this.setLayer(shopLayer)
    },
    /**
     * @param wantedPack
     */
    buyItemPack : function(index) {
        NetworkManger.Connector.getIntance().getLobbyHandler().buyItemRequest(index)
    },
    buyPaymentPack : function (index) {
        NetworkManger.Connector.getIntance().getLobbyHandler().buyCoinRequest(index - 3)
    },
    isEnoughResource : function(buyingPack) {
        if (buyingPack.coin) {
            let currentGold = UserInfo.getInstance().getGold()
            if (buyingPack.coin > currentGold) {
                let popupController = PopupLayerController.getInstance()
                popupController.createPopup(PopupLayerController.TYPE.RESOURCE_NOTIFICATION, {
                    type : ShopLayerController.Resource.GOLD
                })
            } else {
                return true
            }
        } else {
            let currentGem = UserInfo.getInstance().getGem()
            if (buyingPack.gem > currentGem) {
                let popupController = PopupLayerController.getInstance()
                popupController.createPopup(PopupLayerController.TYPE.RESOURCE_NOTIFICATION, {
                    type : ShopLayerController.Resource.GEM
                })
            } else {
                return true
            }
        }

    },

})
ShopLayerController.Resource = {
    GOLD : 0,
    GEM : 1,
    BUYED : 2,
    SUCCESS_BUY : 3,

}