let BattleUILayer = cc.Layer.extend({
    // các biến chứa các thuộc tính của trận đấu, lựu lại để sử dụng đối chiếu và tiến hành cập nhật
    _uiLayer : null,
    _info : null,
    _selectedIndex : null,
    _init : null,
    _canTouch : null,
    _myMapController : null,
    _enemyFieldUI: null,
    _myFieldUI: null,
    _backgroundLayer : null,


    // GETTER
    getBackroundLayer : function() {return this._backgroundLayer},
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

    getMyMapController : function() {return this._myMapController},
    getMyTowerController: function () {return this.myTowerController;},

    // SETTER
    setBackgroundLayer : function(layer) {this._backgroundLayer = layer},
    setMyMapController : function(myMapController) {this._myMapController = myMapController},
    setMyTowerController: function (myTowerController) {this.myTowerController = myTowerController;},

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

    // SETTER
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


    initBuildImage: function () {
        this.buildImage= cc.Sprite();
        this.getBuildImage().retain();
    },
    getBuildImage: function () {
        return this.buildImage;
    },

    // các biến chứa các thành phần UI
    _enemyPointLabel : null,
    _myPointLabel : null,
    _energyLabel : null,
    _energyBar : null,
    _showNoti : null,

    ctor : function(info, myMapController,myTowerController, backgroundLayer) {
        this._super()
        this.setBackgroundLayer(backgroundLayer)
        this.setInfo(info)
        this.setMyMapController(myMapController);
        this.setMyTowerController(myTowerController);

        let uiLayer = ccs.load(res.battle.UILayer.json).node
        uiLayer.setContentSize(cc.winSize)
        ccui.Helper.doLayout(uiLayer)
        this.addChild(uiLayer)
        this.setLayer(uiLayer)
        this.initBuildImage();
        this.addChild(this.getBuildImage());

        this._init = true
        this.setCanTouch(true)

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

        this.scheduleUpdate()
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

    update : function(dt) {
        let info = this.getInfo()
        if (info.getNeedUpdate() === true && info.getEndGame() === false) {
            if (info.getPoint() * info.getEnemyPoint() === 0) {
                let resultLayer = new ResultLayer(this.getInfo())
                this.addChild(resultLayer, 100000, 1)
                info.setEndGame(true)
            }
            info.setNeedUpdate(false)
            this.updateInfo()
        }
    },

    updateCardDeckUI : function() {
        let uiLayer = this.getLayer()
        let readyCard = Util.getChildByName(uiLayer, "CardItem")
        let currentDeck = this.getCurrentDeck()
        for (let i = 0; i < readyCard.length; i++) {
            this.loadCardWithData(readyCard[i], currentDeck[i], i)
            this.addTouchListenerForCard(readyCard[i],currentDeck[i],i);
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
        let monsterSprite = Util.getChildByName(nextCardNode, "MonsterSprite")
        monsterSprite[0].setTexture(CardAssetConfig.assetImage[cardData.cardID])

        let cardBorder = Util.getChildByName(nextCardNode, "CardBorder")
        cardBorder[0].setTexture(CardAssetConfig.assetBorder[1])

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
     * @param {CardInfo} cardInfo
     * @param {number}index
     */
    addTouchListenerForCard : function(cardNode, cardInfo, index) {
        let cardButton = Util.getChildByName(cardNode, "CardSelectButton")[0]
        cardButton.addTouchEventListener(function(button, eventType){
            if (this.getCanTouch()) {
                switch (eventType) {
                    // bắt đầu sự kiện người dùng kéo thẻ
                    case ccui.Widget.TOUCH_BEGAN:
                        this.setCanTouch(false)
                        if (CardUtil.categorize(cardInfo.cardID) === CardUtil.Type.MONSTER) {
                            this.getBackroundLayer().getEnemyFieldUI().setColor(index === this.getSelectedIndex() ? cc.color.WHITE : cc.color("#09d8eb"))
                        } else {
                            this.getBackroundLayer().getMyFieldUI().setColor(index === this.getSelectedIndex() ? cc.color.WHITE : cc.color("#09d8eb"))
                        }
                        this.setSelectedIndex(index)
                        break

                    case ccui.Widget.TOUCH_MOVED:
                        if (CardUtil.categorize(cardInfo.cardID) === CardUtil.Type.TOWER) {
                            if (this.getSelectedIndex() !== -1) {
                                // cc.log("On Touch Moved");
                                let position = BattleUtil.fromPositionToMatrix(button.getTouchMovePosition(), BattleUtil.Who.Mine)
                                if (position.x > 6) {
                                    position.x = 6
                                }
                                if (position.x < 0) {
                                    position.x = 0
                                }
                                if (position.y > 4) {
                                    position.y = 4
                                }

                                this.setTextureForTower(cardInfo.cardID);
                                this.getBuildImage().setVisible(true);
                                this.getBuildImage().setPosition(BattleUtil.fromMaxtrixToPosition(position, BattleUtil.Who.Mine))

                                let doesMonsterPathExists = this.getMyMapController().doesMonsterPathExists(position,cardInfo.cardID);
                                if (doesMonsterPathExists) {
                                    this.getBuildImage().setColor(cc.color(38, 255, 0))
                                } else {
                                    this.getBuildImage().setColor(cc.color(255, 43, 50))
                                }
                            }
                        } else {
                            this.setTextureForTower(cardInfo.cardID);
                        }
                        break
                    // sự kiện kéo thả kết thúc (sự kiện người chơi hủy không đặt trụ nữa)
                    case ccui.Widget.TOUCH_ENDED:
                        this.setCanTouch(false)
                        this.setSelectedIndex(index);
                        this.getBuildImage().setVisible(false);
                        this.getBackroundLayer().getEnemyFieldUI().setColor(cc.color.WHITE)
                        this.getBackroundLayer().getMyFieldUI().setColor(cc.color.WHITE)
                        break

                    // sự kiện người dùng kéo trở lại deck
                    case ccui.Widget.TOUCH_CANCELED:
                        this.setCanTouch(false)
                        this.setSelectedIndex(index)
                        this.getBuildImage().setVisible(false);
                        switch (CardUtil.categorize(cardInfo.cardID)) {
                            case CardUtil.Type.TOWER:
                                let position = BattleUtil.fromPositionToMatrix(this.getBuildImage().getPosition(), BattleUtil.Who.Mine);
                                if (MapUtil.isValidCell(position)) {
                                    let doesMonsterPathExists = this.getMyMapController().doesMonsterPathExists(position, cardInfo.cardID);

                                    // TODO controller can be towerController, monsterController, spellController
                                    let controller = this.getMyTowerController();
                                    if (doesMonsterPathExists) {
                                        if (controller.canPlantTower(cardInfo.cardID,position)){
                                            // TODO : push to action queue, send a packet to server
                                            this.getInfo().useCard(index)
                                            let currentTick = cc.director.getRunningScene().getMyGameLoop().getTick()
                                            NetworkManger.Connector.getIntance().getBattleHandler().sendPlantTower(currentTick + 10, cardInfo.cardID, position)
                                            let myGameLoop = cc.director.getRunningScene().getMyGameLoop()
                                            myGameLoop.getActionQueue().addToActionList(
                                                new UserEvent(currentTick + 10, {cardId : cardInfo.cardID, position : position}, UserEvent.Type.PLANT_TOWER, myGameLoop.getWho()))
                                        }
                                    }
                                } else {
                                    this.outOfEnergyNoti("SAI VỊ TRÍ RỒI")
                                }
                                break
                            case CardUtil.Type.MONSTER:
                                let monsterPos = BattleUtil.fromPositionToMatrix(button.getTouchEndPosition(), BattleUtil.Who.Enemy);
                                if (MapUtil.isValidCell(monsterPos)) {
                                    this.getInfo().useCard(index)
                                    let myGameLoop = cc.director.getRunningScene().getMyGameLoop()
                                    let enemyGameLoop = cc.director.getRunningScene().getEnemyGameLoop()
                                    enemyGameLoop.getActionQueue().addToActionList(
                                        new UserEvent(myGameLoop.getTick() + 10, {cardId : cardInfo.cardID}, UserEvent.Type.CREATE_MONSTER, enemyGameLoop.getWho()))
                                    NetworkManger.Connector.getIntance().getBattleHandler().sendDropMonster(myGameLoop.getTick() + 10, cardInfo.cardID)
                                } else {
                                    this.outOfEnergyNoti("SAI VỊ TRÍ RỒI")
                                }
                                break
                        }
                        this.getBackroundLayer().getEnemyFieldUI().setColor(cc.color.WHITE)
                        this.getBackroundLayer().getMyFieldUI().setColor(cc.color.WHITE)
                        break
                }
                this.updateInfo()
            }
        }, this)

        let cancelButton = Util.getChildByName(cardNode, "CancelButton")
        cancelButton[0].addTouchEventListener(function(node, eventType){
            switch (eventType) {
                // TODO : Card bị bay lên khi bấm liên tục nút hủy, để nghị chỉnh sửa
                case ccui.Widget.TOUCH_ENDED:
                    if (this.getInfo().foldCard(index) === false) {
                        this.setSelectedIndex(index)
                        this.outOfEnergyNoti("HẾT NĂNG LƯỢNG RỒI")
                        this.updateCardDeckUI()
                    } else {
                        this.setSelectedIndex(index)
                        this.updateInfo()
                    }
                    this.getBackroundLayer().getEnemyFieldUI().setColor(cc.color.WHITE)
                    this.getBackroundLayer().getMyFieldUI().setColor(cc.color.WHITE)
                    break
            }
        }, this)
    },

    setTextureForTower: function (cid){
        this.getBuildImage().setTexture("res/tower_asset/buildTowerCID"+cid+".png")
    },


    outOfEnergyNoti : function(message) {
        if (this._showNoti === false) {
            let layer = this.getLayer()
            let noti = Util.getChildByName(layer, "OutOfEnergy")
            let label = Util.getChildByName(noti[0], "Label")[0]
            label.setString(message)
            noti[0].setVisible(true)
            this._showNoti = true
            let moveToAppear = cc.moveBy(0.4, cc.p(428, 0)).easing(cc.easeBackIn(1.5))
            let moveToExist = cc.moveBy(1, cc.p(0, 0))
            let moveToDisapear = cc.moveBy(0.3, cc.p(-428, 0)).easing(cc.easeBackIn(2))
            let callFunc = cc.callFunc(function() {
                noti[0].setVisible(false)
                this._showNoti =  false
            }, this)
            let sequence = cc.sequence([moveToAppear, moveToExist, moveToDisapear, callFunc])
            noti[0].runAction(sequence)
        }
    },

    cheatPanel : function() {
        let self = this
        this.createTestButton("Plant Tower", function() {

        }, 360)

        this.createTestButton("Clone Tick 200", function() {
            cc.director.getRunningScene().getMyGameLoop().cloneTick(200)
        }, 300)

        this.createTestButton("DROP QUẠ", function() {
            let currentTick = cc.director.getRunningScene().getMyGameLoop().getTick()
            NetworkManger.Connector.getIntance().getBattleHandler().sendDropMonster(currentTick + 10, MonsterConfig.Type.CROW_SKELETON)
            let enemyGameLoop = cc.director.getRunningScene().getEnemyGameLoop()
            enemyGameLoop.getActionQueue().addToActionList(
                new UserEvent(currentTick + 10, {cardId : MonsterConfig.Type.CROW_SKELETON}, UserEvent.Type.CREATE_MONSTER, enemyGameLoop.getWho()))
        }, 240)

        this.createTestButton("DROP DƠI", function() {
            let currentTick = cc.director.getRunningScene().getMyGameLoop().getTick()
            NetworkManger.Connector.getIntance().getBattleHandler().sendDropMonster(currentTick + 10, MonsterConfig.Type.EVIL_BAT)
            let enemyGameLoop = cc.director.getRunningScene().getEnemyGameLoop()
            enemyGameLoop.getActionQueue().addToActionList(
                new UserEvent(currentTick + 10, {cardId : MonsterConfig.Type.EVIL_BAT}, UserEvent.Type.CREATE_MONSTER, enemyGameLoop.getWho()))
        }, 180)

        this.createTestButton("DROP GIANT", function() {
            let currentTick = cc.director.getRunningScene().getMyGameLoop().getTick()
            NetworkManger.Connector.getIntance().getBattleHandler().sendDropMonster(currentTick + 10, MonsterConfig.Type.GIANT)
            let enemyGameLoop = cc.director.getRunningScene().getEnemyGameLoop()
            enemyGameLoop.getActionQueue().addToActionList(
                new UserEvent(currentTick + 10, {cardId : MonsterConfig.Type.GIANT}, UserEvent.Type.CREATE_MONSTER, enemyGameLoop.getWho()))

        }, 120)

        this.createTestButton("DROP NINJA", function() {
            let currentTick = cc.director.getRunningScene().getMyGameLoop().getTick()
            NetworkManger.Connector.getIntance().getBattleHandler().sendDropMonster(currentTick + 10, MonsterConfig.Type.NINJA)
            let enemyGameLoop = cc.director.getRunningScene().getEnemyGameLoop()
            enemyGameLoop.getActionQueue().addToActionList(
                new UserEvent(currentTick + 10, {cardId : MonsterConfig.Type.NINJA}, UserEvent.Type.CREATE_MONSTER, enemyGameLoop.getWho()))

        }, 60)
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