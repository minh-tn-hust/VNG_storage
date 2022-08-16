/**
 * Create By MinhTN
 * Các sự kiện gọi popup sẽ được gọi trực tiếp tại shoplayer luôn mà không nhờ tới
 * sự hỗ trợ của controller
 * File cocos : shop_ShopLayer
 */
var ShopLayer = cc.Layer.extend({
    _shopController : null,
    _dailyRoot : null,
    _paymentRoot : null,
    _countdownTime : null,
    _countDownLabel : null,

    getDailyRoot : function() {
        return this._dailyRoot
    },
    setDailyRoot : function(dailyRoot) {
        this._dailyRoot = dailyRoot
    },
    getPaymentRoot : function() {
        return this._paymentRoot
    },
    setPaymentRoot : function(paymentRoot) {
        this._paymentRoot = paymentRoot
    },

    getShopItems : function() {
        return UserInfo.getInstance().getShopItems()
    },

    getShopCoin : function() {
        return UserInfo.getInstance().getShopCoins()
    },

    getController : function() {
        return this._controller
    },
    getCountDownLabel : function() {
        return this._countDownLabel
    },

    setController : function(controller) {
        this._controller = controller
    },
    getCountDownTime : function(){
        return this._countdownTime
    },

    /**
     * @param {ShopControllerLayer} controller
     */
    ctor : function(shopController) {
        this._super()
        this.setController(shopController)
        this.createLayer()


        UserInfo.getInstance().addEventListener(UserInfo.Event.CHANGE_RESOURCE, function(){
            this.dailyUiProcess()
            this.paymentUiProcess()
            this.initCountDown()
        }.bind(this))
        cc.log(JSON.stringify(UserInfo.getInstance()))

        this.initCountDown()
        this.countDown()
        this.schedule(function() {
            this.countDown()
        }, 1)
    },

    initCountDown : function() {
        let serverTimestamp = UserInfo.getInstance().getTimestamp() * 1000
        cc.log(serverTimestamp)
        let serverDate = new Date(serverTimestamp)
        let nextDate = new Date()
        nextDate.setDate(serverDate.getDate() + 1)
        nextDate.setHours(0)
        nextDate.setMinutes(0)
        nextDate.setSeconds(0)
        this._countdownTime = ((nextDate - serverDate) / 1000)
    },

    countDown : function() {
        let label = this.getCountDownLabel()
        let countDownText = Util.getCountDownText(this.getCountDownTime())
        if (countDownText === "0h 0m 0s") {
            // UserInfo.getInstance().getLobbyHandler().getShopInfoRequest()
        }
        this._countdownTime-= 1
        label.setString(countDownText)
    },

    /**
     * khởi tạo và thực hiện gán các listener cho các nút liên quan tới layer
     * các nút chức năng nhỏ sẽ được khởi tạo ở phần khác
     */
    createLayer : function() {
        let shopLayer = ccs.load(res.json.ShopUI.shopUI_json).node
        this.setDailyRoot(Util.getChildByName(shopLayer, "Daily")[0])
        this.setPaymentRoot(Util.getChildByName(shopLayer, "Payment")[0])

        this.dailyUiProcess()
        this.paymentUiProcess()

        shopLayer.setContentSize(cc.winSize)
        ccui.Helper.doLayout(shopLayer)
        shopLayer.setPosition(0,0)
        this.addChild(shopLayer)

        this.schedule(function() { }, 1)
    },

    /**
     * thay đổi UI phần thường daily, sử dụng để update lại ui khi cần thiết, khi có sự thay đổi thông tin từ shop
     * @param {cc.Node} dailyRoot - node gốc của Daily
     */
    dailyUiProcess : function() {
        let dailyRoot = this.getDailyRoot()
        let title = dailyRoot.getChildByName("title")
        title.setString("VẬT PHẨM ĐĂNG NHẬP")

        let itemPack = this.getShopItems()
        let countDownTilte = Util.getChildByName(dailyRoot, "timer")[0]
        this._countDownLabel = countDownTilte


        let titles = Util.getChildByName(dailyRoot, "chestName")
        let images = Util.getChildByName(dailyRoot, "contentImage")
        let piecesLabels = Util.getChildByName(dailyRoot, "numberOfPieces")
        let childButton = Util.getChildByName(dailyRoot, "buyButton")
        let buttons = Util.getChildByName(dailyRoot, "CoverButton")
        let prices = Util.getChildByName(dailyRoot, "price")
        let cardImages = Util.getChildByName(dailyRoot, "cardImage")
        let disablePanel = Util.getChildByName(dailyRoot, "Disable")

        let currentGold = UserInfo.getInstance().getGold()
        for (let i = 0; i < itemPack.length; i++) {
            disablePanel[i].setVisible(false)
            switch (itemPack[i].id) {
                case -1 :
                    titles[i].setString("Rương vàng")
                    cardImages[i].setVisible(false)
                    piecesLabels[i].setVisible(false)
                    images[i].setTexture(res.json.ShopUI.goldChest)
                    images[i].setScale(0.45)
                    break
                case -2:
                    titles[i].setString("Rương bạc")
                    cardImages[i].setVisible(false)
                    piecesLabels[i].setVisible(false)
                    images[i].setTexture(res.json.ShopUI.silverChest)
                    break
                default :
                    images[i].setVisible(false)
                    titles[i].setVisible(false)
                    piecesLabels[i].setString("x" + itemPack[i].pieces)
                    let border = cardImages[i].getChildByName("border")
                    border.loadTexture(CardAssetConfig.assetBorder[CardAssetConfig.Level.S])
                    let background = cardImages[i].getChildByName("background")
                    background.loadTexture(CardAssetConfig.assetBackground[CardAssetConfig.Level.A])
                    let content = Util.getChildByName(cardImages[i], "content")
                    content[0].setTexture(CardAssetConfig.assetImage[itemPack[i].id])
                    break
            }

            if (currentGold < itemPack[i].coin) {
                prices[i].setTextColor(cc.color(240, 12, 23))
            } else {
                prices[i].setTextColor(cc.color(255, 255, 255))
            }
            prices[i].setString(Util.numberToString(itemPack[i].coin))
        }

        // khởi tạo sự kiện khi bấm vào các nút mua hàng
        for (let i = 0; i < buttons.length; i++) {
            if (itemPack[i].isBuyed !== 1) {
                // sủ dụng trường id của button để thực hiện lưu giá trị vị trí của pack
                buttons[i].id = i
                let self = this
                buttons[i].addTouchEventListener(function(button, type) {
                    Util.uiReact(button, type, function() {
                        let itemPack = self.getShopItems()
                        if (self.getController().isEnoughResource(itemPack[button.id])) {
                            let popupLayerController = PopupLayerController.getInstance()
                            if (itemPack[button.id].id < 0) {
                                popupLayerController.createPopup(PopupLayerController.TYPE.OPEN_CHEST, {index : button.id})
                            } else {
                                popupLayerController.createPopup(PopupLayerController.TYPE.BUY_ITEM_NOTI, {
                                    data : itemPack[button.id],
                                    callBack : () => {
                                        self.buyingItemPack(button.id)
                                    }
                                })
                            }
                        }
                    })
                }, this)
            } else {
                childButton[i].setVisible(false)
                buttons[i].setVisible(false)
                disablePanel[i].setVisible(true)
            }
        }
    },

    /**
     * thay đổi UI phần mua vàng, thực hiện bật và tắt các thành phần không cần thiết
     * @param {cc.Node} paymentRoot - node gốc của Payment
     */
    paymentUiProcess : function() {
        let paymentRoot = this.getPaymentRoot()
        let title = paymentRoot.getChildByName("title")
        title.setString("MUA VÀNG")

        let countdown = Util.getChildByName(paymentRoot, "count_down")[0]
        countdown.setVisible(false)

        let icons = Util.getChildByName(paymentRoot, "goldIcon")
        let titles = Util.getChildByName(paymentRoot, "chestName")
        let images = Util.getChildByName(paymentRoot, "contentImage")
        let piecesLabels = Util.getChildByName(paymentRoot, "numberOfPieces")
        let buttons = Util.getChildByName(paymentRoot, "CoverButton")
        let prices = Util.getChildByName(paymentRoot, "price")
        let cardImages = Util.getChildByName(paymentRoot, "cardImage")
        let disablePanel = Util.getChildByName(paymentRoot, "Disable")


        let paymentPack = this.getShopCoin()

        for (let i = 0; i < titles.length; i++) {
            disablePanel[i].setVisible(false)
            titles[i].setString(Util.numberToString(paymentPack[i].value))
            titles[i].color = cc.color(255, 215, 56, 255)
        }

        for (let icon of icons) {
            icon.setTexture(res.json.ShopUI.gemIcon)
        }

        for (let i = 0; i < images.length; i++) {
            images[i].setTexture(res.json.ShopUI.goldIcons[i])
        }

        for (let piecesLabel of piecesLabels) {
            piecesLabel.setVisible(false)
        }

        // Thêm sự kiện khi nhấp vào nút click buy
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].id = i + 3
            buttons[i].addTouchEventListener(function(button, type) {
                let self = this
                Util.uiReact(button, type, function() {
                    let coinPack = self.getShopCoin()
                    if (self.getController().isEnoughResource(coinPack[button.id - 3])) {
                        let popupLayerController = PopupLayerController.getInstance()
                        if (coinPack[button.id - 3].id < 0) {
                            popupLayerController.createPopup(PopupLayerController.TYPE.OPEN_CHEST)
                        } else {
                            popupLayerController.createPopup(PopupLayerController.TYPE.BUY_ITEM_NOTI, {
                                data : coinPack[button.id - 3],
                                callBack : () => {
                                    self.buyingPaymentPack(button.id)
                                }
                            })
                        }
                    }
                })
            }, this)
        }

        // Hiển thị màu nếu như không đủ gem / đủ gem
        let currentGem = UserInfo.getInstance().getGem()
        for (let i = 0; i < prices.length; i++) {
            prices[i].setString(paymentPack[i].gem)
            if (currentGem < paymentPack[i].gem) {
                prices[i].setTextColor(cc.color(240, 12, 23))
            } else {
                prices[i].setTextColor(cc.color(255, 255, 255))
            }
        }

        for (let cardImage of cardImages) {
            cardImage.setVisible(false)
        }

    },
    buyingItemPack : function(index) {
        this.getController().buyItemPack(index)
    },
    buyingPaymentPack : function(index) {
        this.getController().buyPaymentPack(index)
    }
})