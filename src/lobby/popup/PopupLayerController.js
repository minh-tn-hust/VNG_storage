let PopupLayerController = cc.Class.extend({
    _lobbyController : null,
    _popupLayers : [],
    _blurLayer : null,

    /**
     * thực hiện lấy ra lobby controller để có thể thực hiện giao tiêp với
     * các layer khác
     * @returns {LobbySceneController}
     */
    getLobbyController : function() {
        return this._lobbyController
    },
    setLobbyController : function(lobbyController) {
        this._lobbyController = lobbyController
    },
    getBlurLayer : function() {
        return this._blurLayer
    },
    setBlurLayer : function(blurLayer) {
        this._blurLayer = blurLayer
    },

    getPopupLayers : function() {
        return this._popupLayers
    },

    ctor : function(lobbyController) {
        this.init()
        this.setLobbyController(lobbyController)
        this._popupLayerController = this
    },

    init : function() {

    },

    closePopup : function() {
        let popupLayers = this.getBlurLayer()
        let topPopup = popupLayers[0]
        topPopup.closePopupLayer()
    },

    createPopup : function(type, metadata) {
        if (!this.getBlurLayer()) {
            let blurBackground = ccui.Layout()
            blurBackground.setVisible(false)
            blurBackground.setContentSize(cc.winSize)
            blurBackground.setPosition(0, 0)
            blurBackground.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID)
            blurBackground.setBackGroundColorOpacity(0.7 * 250)
            blurBackground.setBackGroundColor(cc.color(0, 0, 0))
            blurBackground.setTouchEnabled(true)
            this.setBlurLayer(blurBackground)
            this.getLobbyController().getLobbyScene().addChild(blurBackground)
        }
        switch (type) {
            case PopupLayerController.TYPE.FUNCTION_NOT_AVAILABLE:
                let functionNotAvailablePopup = new FunctionNotAvailablePopup(this);
                this.addPopup(functionNotAvailablePopup);
                break;
            case PopupLayerController.TYPE.OPEN_CHEST:
                let chestPopup = new ChestInfoPopup(this, metadata)
                this.addPopup(chestPopup)
                break
            case PopupLayerController.TYPE.BUY_ITEM_NOTI:
                let buyItemPopup = new BuyItemPopup(this, metadata)
                this.addPopup(buyItemPopup)
                break
            case PopupLayerController.TYPE.REWARD:
                let rewardPopup = new RewardPopup(this, metadata)
                this.addPopup(rewardPopup)
                break
            case PopupLayerController.TYPE.RESOURCE_NOTIFICATION :
                /**
                 * metadata : {
                 *     type : ShoplayerController.Resource
                 * }
                 */
                let resourceNotiPopup = new ResourceNotiPopup(this, metadata)
                this.addPopup(resourceNotiPopup)
                break

            case PopupLayerController.TYPE.BATTLE_CARD_INFO:
                // let cardInfoFormationPopup = new CardInfoInformationPopup(this, this.getLobbyController().getMouseClickedCard().tag);
                let cardInfoFormationPopup =
                    CardInfoPopupController.createFormationPopupLayer(
                        this,metadata.cardID)
                this.addPopup(cardInfoFormationPopup)
                break;
            case PopupLayerController.TYPE.DISCOVER_CARD_INFO:
                // let cardInfoCollectionPopup = new CardInfoCollectionPopup(this, this.getLobbyController().getMouseClickedCard().tag);
                let cardInfoCollectionPopup =
                    CardInfoPopupController.createCollectionPopupLayer(
                        this,metadata.cardID)
                this.addPopup(cardInfoCollectionPopup)
                break;
            case PopupLayerController.TYPE.CHEAT_CARD:
                let cheatCardPopup = new CheatCardPopup(this);
                this.addPopup(cheatCardPopup);
                break;
            case PopupLayerController.TYPE.CARD_UPGRADE_SUCCESS:
                let cardUpgradeSuccessPopup = new UpgradeCardSuccess(this,metadata);
                this.addPopup(cardUpgradeSuccessPopup);
                break;
            case PopupLayerController.TYPE.BUY_CHEST_BY_GEM:
                let buyChestByGemPopup = new OpenChestByGemPopup(this,metadata);
                this.addPopup(buyChestByGemPopup);
                break
            case PopupLayerController.TYPE.RESOURCE_ANIMATION :
                let resourceAnimation = new ResourceAnimtion(this, metadata)
                this.addPopup(resourceAnimation)
                break;
            case PopupLayerController.TYPE.CONFIRM_CHOOSE_CHEST:
                var confirmChooseChest = new ConfirmChooseChestPopup(this,metadata);
                this.addPopup(confirmChooseChest);
                break;
            case PopupLayerController.TYPE.ONE_CHEST_AT_A_TIME:
                var oneChestAtAtTime = new OneChestAtATimePopup(this,metadata);
                this.addPopup(oneChestAtAtTime);
                break;
        }
    },

    addPopup : function(popup) {
        // this.getBlurLayer().setVisible(true)
        this.getPopupLayers().unshift(popup)
        this.getLobbyController().getLobbyScene().addChild(popup)
    },

    removePopup : function(id) {
        cc.log("PopupLayerController - removePopup")
        cc.log(id)
        let popupLayers = this.getPopupLayers()
        if (id !== null) {
            for (let i = 0; i < popupLayers.length; i++) {
                if (popupLayers[i]._id === id) {
                    this.getLobbyController().getLobbyScene().removeChild(popupLayers[i])
                    popupLayers.splice(i, 1)
                }
            }
        } else {
            this.getLobbyController().getLobbyScene().removeChild(popupLayers[0])
            this.getPopupLayers().shift()
        }

        if (popupLayers.length == 0) {
            this.getBlurLayer().setVisible(false)
        }
    }
})

PopupLayerController._popupLayerController = null
PopupLayerController.getInstance = function() {
    if (this._popupLayerController) {
        return this._popupLayerController
    } else {
        let newPopupController = new PopupLayerController()
        this._popupLayerController = newPopupController
    }
}


PopupLayerController.TYPE = {
    FUNCTION_NOT_AVAILABLE:0,
    OPEN_CHEST : 1,
    REWARD : 2,
    BATTLE_CARD_INFO: 3,
    DISCOVER_CARD_INFO :4,
    RESOURCE_NOTIFICATION : 5,
    BUY_ITEM_NOTI : 6,
    CHEAT_CARD:7,
    CARD_UPGRADE_SUCCESS:8,
    BUY_CHEST_BY_GEM:9,
    RESOURCE_ANIMATION : 10,
    CONFIRM_CHOOSE_CHEST:11,
    ONE_CHEST_AT_A_TIME:12
}