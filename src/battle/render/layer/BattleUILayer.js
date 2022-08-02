let BattleUILayer = cc.Layer.extend({
    // các biến chứa các thuộc tính của trận đấu, lựu lại để sử dụng đối chiếu và tiến hành cập nhật
    _uiLayer : null,
    _info : null,
    _selectedIndex : null,
    _init : null,
    _canTouch : null,
    _myMapController : null,

    // GETTER
    getLayer : function() {return this._uiLayer},

    /**
     * Lấy ra thông tin của trận đấu hiện tại
     * @return {Info} */
    getInfo : function() {return this._info},

    /**
     * Lấy ra danh sách các thẻ bài đang được hiển thị hiện tại
     * @returns {CardInfo[]} */
    getCurrentDeck : function() {
        return this.getInfo().getCurrentDeck()
    },

    /**
     * Lấy ra thẻ bài tiếp theo sẽ được đưa lên bộ bài
     * @returns {Info._nextCard|null|*}
     */
    getNextCard : function(){
        return this.getInfo().getNextCard()
    },

    /**
     * Lấy ra thẻ bài đang được lựa chọn
     * @returns {null}
     */
    getSelectedIndex : function(){return this._selectedIndex},

    /**
     * Lấy ra biến để kiểm tra xem người dùng có được chạm vào thẻ bài hay không
     * (ngăn người dùng bấm liên tục mà animation hiển thị chưa thực hiện xong)
     * @returns {null}
     */
    getCanTouch : function() {return this._canTouch},
    getMyMapController : function() {return this._myMapController},

    // SETTER
    setMyMapController : function(myMapController) {this._myMapController = myMapController},
    setLayer : function(layer) {this._uiLayer = layer},
    setInfo : function(info) {this._info = info},
    setSelectedIndex : function(index)  {
        if (this._selectedIndex === index) {
            this._selectedIndex = -1
        } else {
            this._selectedIndex = index
        }
    },
    setCanTouch : function(canTouch) {
        this._canTouch = canTouch
    },



    // các biến chứa các thành phần UI
    _enemyPointLabel : null,
    _myPointLabel : null,
    _energyLabel : null,
    _energyBar : null,
    _showNoti : null,

    ctor : function(info, myMapController) {
        this._super()
        this.setInfo(info)
        this.setMyMapController(myMapController)

        // Load UI từ file JSON
        let uiLayer = ccs.load(res.battle.UILayer.json).node
        uiLayer.setContentSize(cc.winSize)
        ccui.Helper.doLayout(uiLayer)
        this.addChild(uiLayer)
        this.setLayer(uiLayer)

        this._init = true
        this.setCanTouch(true)

        // Cập nhật các hiển thị của UI từ thông tin trận đấu
        this._showNoti = false
        this.updateInfo()
        this.cheatPanel()

        // khởi tạo thoát khỏi battle scene
        let endButton = Util.getChildByName(uiLayer, "EndButton")
        endButton[0].addTouchEventListener(function (button,type){
            let self = this;
            Util.uiReact(button,type,function(){
                // MainController.getInstance().runLobbyScene()
                let resultLayer = new ResultLayer(self.getInfo())
                self.addChild(resultLayer, 100000, 1)
            });
        }, this)

    },

    /**
     * Hàm sử dụng để gọi mỗi khi thông tin của trận đấu được cập nhật
     */
    updateInfo : function() {
        let uiLayer = this.getLayer()
        let info = this.getInfo()
        // thực hiện đối chiếu với gameState hiện tại để cập nhật thông tin

        let enemyPointLabel = Util.getChildByName(uiLayer, "Our")[0]
        let myPointLabel = Util.getChildByName(uiLayer, "Enermy")[0]
        let energyBar = Util.getChildByName(uiLayer, "EnergyBar")[0]
        let energyLabel = Util.getChildByName(uiLayer, "EnergyNumber")[0]

        enemyPointLabel.setString(info.getEnemyPoint())
        myPointLabel.setString(info.getPoint())
        energyLabel.setString(info.getEnergy())
        energyBar.setPercent(info.getEnergy() / BattleConfig.MAX_ENERGY * 100)

        this.updateCardDeckUI()
    },

    updateCardDeckUI : function() {
        let uiLayer = this.getLayer()
        let readyCard = Util.getChildByName(uiLayer, "CardItem")
        let currentDeck = this.getCurrentDeck()
        for (let i = 0; i < readyCard.length; i++) {
            this.loadCardWithData(readyCard[i], currentDeck[i], i)
            this.addTouchListenerForCard(readyCard[i],i)
        }
        this.updateNextCardUI()
    },

    updateNextCardUI : function() {
        let uiLayer = this.getLayer()
        let nextCard = Util.getChildByName(uiLayer, "NextCard")[0]
        let nextCardData = this.getNextCard()
        this.loadNextCard(nextCard, nextCardData)
    },

    /**
     *
     * @param {cc.Node} nextCardNode
     * @param {CardInfo} cardData
     */
    loadNextCard : function(nextCardNode, cardData) {
        cc.log(JSON.stringify(cardData))
        let monsterSprite = Util.getChildByName(nextCardNode, "MonsterSprite")
        monsterSprite[0].setTexture(CardAssetConfig.assetImage[cardData.cardID])

        let cardBorder = Util.getChildByName(nextCardNode, "CardBorder")
        cardBorder[0].setTexture(CardAssetConfig.assetBorder[cardData.rank])

        let energyRequired = Util.getChildByName(nextCardNode, "EnergyRequired")
        energyRequired[0].setVisible(false)

        let cancelButton = Util.getChildByName(nextCardNode, "CancelButton")
        cancelButton[0].setVisible(false)

        if (this._init) {
            let cardBackground = Util.getChildByName(nextCardNode, "CardBackground")[0]
            let currentCardPosition = cardBackground.getPosition()
            currentCardPosition.y -= 60
            cardBackground.setPosition(currentCardPosition)
            this._init = false
        }
    },



    /**
     * Thực hiện load hình ảnh lên card hiển thị
     * @param {cc.Node} cardNode
     * @param {CardInfo} cardData
     * @param {number} index
     */
    loadCardWithData : function(cardNode, cardData, index) {
        let monsterSprite = Util.getChildByName(cardNode, "MonsterSprite")
        monsterSprite[0].setTexture(CardAssetConfig.assetImage[cardData.cardID])

        let cardBorder = Util.getChildByName(cardNode, "CardBorder")
        cardBorder[0].setTexture(CardAssetConfig.assetBorder[cardData.rank])

        let energyLabel = Util.getChildByName(cardNode, "EnergyLabel")
        energyLabel[0].setString(10)

        let cancelButton = Util.getChildByName(cardNode, "CancelButton")

        let cardBackground = Util.getChildByName(cardNode, "CardBackground")
        // TODO : Animation khi người chơi thực hiện fold card

        if (cancelButton[0].isVisible() !== (this.getSelectedIndex() === index)) {
            let currentCardPosition = cardBackground[0].getPosition()
            currentCardPosition.y += (this.getSelectedIndex() !== index) ? -60 : 60
            let animation
            if (this.getSelectedIndex() === index) {
                animation = cc.moveTo(0.15, currentCardPosition).easing(cc.easeBackOut(2))
            } else {
                animation = cc.moveTo(0.15, currentCardPosition).easing(cc.easeBackIn(2))
            }
            let self = this
            let callFunc =  cc.callFunc(function(){
                cancelButton[0].setVisible(self.getSelectedIndex() === index)
            })
            // Biến canTouch sử dụng để ngăn người dùng không bấm kích hoạt card trong khi animation
            // đang được thực hiện. Hàm resetFunction sử dụng để thiết lập lại biens canTouch
            let resetFunc = cc.callFunc(function() {
                self.setCanTouch(true)
            })
            if (this.getSelectedIndex() !== index) {
                cardBackground[0].runAction(cc.sequence([callFunc, animation, resetFunc]))
            } else {
                cardBackground[0].runAction(cc.sequence([animation, callFunc, resetFunc]))
            }
        }
    },

    /**
     * @param {cc.Node} cardNode
     * @param index
     */
    addTouchListenerForCard : function(cardNode, index) {
        let cardButton = Util.getChildByName(cardNode, "CardSelectButton")[0]
        cardButton.addTouchEventListener(function(button, eventType){
            cc.log("CALL")
            if (this.getCanTouch()) {
                switch (eventType) {
                    // bắt đầu sự kiện người dùng kéo thẻ
                    case ccui.Widget.TOUCH_BEGAN:
                        this.setCanTouch(false)
                        this.setSelectedIndex(index)
                        cc.log("TOUCH_BEGAN" + index.toString())
                        break

                    // sự kiện kéo thả kết thúc
                    case ccui.Widget.TOUCH_CANCELED:
                        this.setCanTouch(false)
                        this.setSelectedIndex(index)
                        break

                    // sự kiện người dùng kéo trở lại deck
                    case ccui.Widget.TOUCH_ENDED:
                        this.setCanTouch(false)
                        this.setSelectedIndex(index)
                        cc.log("TOUCH_ENDED" + index.toString())
                        break
                }
                this.updateCardDeckUI()
            }
        }, this)

        let cancelButton = Util.getChildByName(cardNode, "CancelButton")
        cancelButton[0].addTouchEventListener(function(node, eventType){
            switch (eventType) {
                // TODO : Card bị bay lên khi bấm liên tục nút hủy, để nghị chỉnh sửa
                case ccui.Widget.TOUCH_ENDED:
                    cc.log("FOLD CARD NOW")
                    if (this.getInfo().foldCard(index) === false) {
                        this.setSelectedIndex(index)
                        this.outOfEnergyNoti()
                        this.updateCardDeckUI()
                    } else {
                        this.setSelectedIndex(index)
                        this.updateInfo()
                    }
                    break
            }
        }, this)
    },

    outOfEnergyNoti : function() {
        if (this._showNoti === false) {
            let layer = this.getLayer()
            let noti = Util.getChildByName(layer, "OutOfEnergy")
            noti[0].setVisible(true)
            this._showNoti = true
            let moveToAppear = cc.moveBy(0.4, cc.p(428, 0)).easing(cc.easeBackIn(1.5))
            let moveToExist = cc.moveBy(1, cc.p(0, 0))
            let moveToDisapear = cc.moveBy(0.3, cc.p(-428, 0)).easing(cc.easeBackIn(2))
            let callFunc = cc.callFunc(function() {
                noti[0].setVisible(false)
                this._showNoti(false)
            }, this)
            let sequence = cc.sequence([moveToAppear, moveToExist, moveToDisapear, callFunc])
            noti[0].runAction(sequence)
        }
    },

    cheatPanel : function() {
        let self = this
        this.createTestButton("Clone Tick 705", function() {
            cc.director.getRunningScene().getMyGameLoop().cloneTick(705)
        }, 300)
    },

    createTestButton : function(title, callBack, position) {
        let changeDirection = ccui.Button("res/common_asset/common_btn_gray.png")
        changeDirection.setTitleText(title)
        changeDirection.setPosition(cc.p(cc.winSize.width / 10, cc.winSize.height / 2 + position))
        changeDirection.setScale(0.6)
        changeDirection.setTitleFontSize(20)
        changeDirection.addTouchEventListener(function(button, event) {
            switch (event) {
                case ccui.Widget.TOUCH_ENDED :
                    callBack()
            }
        }, this)
        this.addChild(changeDirection)
    }
})