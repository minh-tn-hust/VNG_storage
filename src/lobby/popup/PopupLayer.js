let PopupLayer = cc.Layer.extend({
    _popupController : null,

    getController : function() {
        return this._popupController
    },

    setController : function(popupController) {
        this._popupController = popupController
    },

    ctor : function(popupController, needBlur) {
        this._super()
        this.setController(popupController)
        this.initPopupLayer()
        this.initAnimation()
        this._id = Date.now()

        if (needBlur !== false ) {
            let blur = new ccui.Layout()
            blur.setContentSize(this.getContentSize())
            blur.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID)
            blur.setColor(cc.color(0,0,0))
            blur.setOpacity(100)
            this.addChild(blur)
            blur.setZOrder(-1)
            blur.setTouchEnabled(true)
        }

    },


    /**
     * Hàm sử dụng để khởi tạo popup, tất cả các lớp con popup đề phải override lại hàm này
     */
    initPopupLayer : function() {

    },

    /**
     * Khởi tạo nút tắt màn hình popup cho tất cả các nút, mỗi popup sẽ có một nút close, hàm này
     * sẽ nhận Node chứa nút close và thực hiện add hành động cho nút đấy, tất cả các popup có thể sử dụng hàm này
     * @param buttonNode
     */
    initCloseButton : function(buttonNode) {
        let self = this
        buttonNode.addTouchEventListener(function(button, type) {
            Util.uiReact(button, type, function() {
                self.closePopupLayer()
            })
        }, this)

    },

    /**
     * Phương thức sử dụng để close popup hiện tại
     */
    closePopupLayer : function() {
        let self = this
        let closeCallBack = cc.callFunc(function() {
            cc.log("POPUP LAYER")
            cc.log(self._id)
            self.getController().removePopup(self._id)
        })

        try {
            this.runAction(cc.sequence([closeCallBack]))
        } catch (e) {
            cc.log("Error when close popup: ",e);
        }
    },

    /**
     * Mở một popup đè lên popup hiện tại
     * @param {PopupLayerController.TYPE} type
     * @param metadata
     */
    openAnotherPopup : function(type,metadata) {
        let popupController = this.getController()
        popupController.createPopup(type,metadata);
    },
    initAnimation : function() {
        // this.setScale(0.3)
        // let action = cc.scaleTo(0.3, 1).easing(cc.easeBounceOut(0.5))
        // this.runAction(action)
    },
})