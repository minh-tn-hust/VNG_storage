let TowerInfoBattlePopup = PopupLayer.extend({
    setRequirementForUpdate: function (requirementForUpdate) {
        this.requirementForUpdate = requirementForUpdate;
    },

    getRequiredCoin: function () {
        return this.requirementForUpdate.coinRequired;
    },
    getRequiredCard: function () {
        return this.requirementForUpdate.cardRequired;
    },

    // TODO : cài các nút xem chế độ thể upgrade

    increaseCurrentDisplayLevel: function () {
        if (this.level===3){

        }  else {
            this.level++;
        }
    },

    decreaseCurrentDisplayLevel: function () {
        if (this.level===1){

        } else {
            this.level--;
        }
    },

    getCurrentDisplayLevel: function () {
        return this.level;
    },

    initStat: function () {
        this.stat= {
            1:{},
            2:{},
            3:{}
        };
    },

    initLevel: function () {
        this.level=1;
    },

    ctor: function(popupController,cardID){
        cc.log("Obtained card: ",cardID);
        this.cardID = cardID;
        this.initStat();
        this.initLevel();
        this._super(popupController);
        ErrorHandler.getInstance().addEventListener(
            ErrorHandler.ERROR.CANNOT_UPGRADE_CARD,
            this.cannotUpgradeCardPopup.bind(this)
        );

        ErrorHandler.getInstance().addEventListener(
            ErrorHandler.ERROR.CARD_UPGRADE_SUCCESS,
            this.upgradeSuccess.bind(this)
        );
    },


    initPopupLayer : function() {
        this.layer = this.getLayer();
        this.addLayer(this.layer);

        // khởi tạo sự kiện kich vào nút thoát
        let exitButton = Util.getChildByName(this.layer,"ExitButton")[0];
        this.initCloseButton(exitButton);

        var nodeCardIcon = Util.getChildByName(this.layer,"CardIcon")[0];
        var card = UserInfo.getInstance().getCardByID(this.cardID)
        CardUtil.setCardUI(nodeCardIcon,card);

        this.requirementForUpdate = CardUtil.getRequirementForLevel(card.getLevel()+1);

        this.setStatNode();
        this.setStat(card);
        this.displayStat(this.getCurrentDisplayLevel());
        this.setupButton();
    },

    setStatNode: function () {
        this.statNodes = Util.getChildByName(this.layer,"StatBackground");
    },

    /**
     *
     * @param {CardInfo}card
     */
    setStat: function (card){
        var jsStat;
        jsStat = Util.loadJSONFile("res/Tower.json")["tower"][this.cardID];
        for (var level=1;level<4;++level) {
            for (var statName of CardAssetConfig.DisplayPara[this.cardID]) {
                this.stat[level][statName] = jsStat.stat[level][statName];
            }
            if (this.stat[level]["bulletRadius"]!==undefined){
                this.stat[level]["bulletRadius"] =
                    this.stat[level]["bulletRadius"]===0?"Đơn":"Lan";
            }
            if(this.stat[level]["damage"]!==undefined){
                this.stat[level]["damage"] = CardUtil.upgradeFactorToLevel(
                    this.stat[level]["damage"],
                    card.getLevel(),
                    CardUtil.upgradeDamagePercent
                ).toFixed(2);
            }
        }
        cc.log("Stat: ",JSON.stringify(this.stat));
    },


    displayStat: function (level){
        var i=0;
        var configStat;
        var statImage, statName, statValue;
        for (var key of Object.keys(this.stat[level])){
            configStat = CardAssetConfig.STATS.STAT_CONFIG[
                CardAssetConfig.STATS.STAT_ID[key]
                ];
            this.statNodes[i].setVisible(true);
            statImage = this.statNodes[i].getChildByName("StatImage");
            statName = this.statNodes[i].getChildByName("StatName");
            statValue = this.statNodes[i].getChildByName("statValue");

            cc.log("statImage: ",statImage);
            statImage.loadTexture(configStat.image);
            statName.setString(configStat.name);
            statValue.setString(this.stat[level][key]+configStat.unit);
            i++;
        }
    },

    addLayer: function(layer){
        layer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(layer);
        layer.setPosition(0,0);
        this.addChild(layer);
    },

    getLayer: function(){
        return ccs.load(res.json.Popup.cardInfoBattle_json).node;
    },

    setupButton: function(){
        var upgradeButton = Util.getChildByName(this.layer,"UpgradeButton")[0];
        upgradeButton.addTouchEventListener(this.upgradeButtonClicked,this);
        var goldText = Util.getChildByName(upgradeButton,"GoldText")[0];
        goldText.setString(this.getRequiredCoin());
        if (UserInfo.getInstance().getGold()<this.getRequiredCoin()){
            // goldText.setTextColor(cc.Color.RED);
        }

        var skillButton = Util.getChildByName(this.layer,"SkillButton")[0];
        skillButton.addTouchEventListener(function (sender,type) {
            Util.uiReact(sender,type,function () {
                this.openAnotherPopup(PopupLayerController.TYPE.FUNCTION_NOT_AVAILABLE)
                // popupLayerController.createPopup();
            }.bind(this));
        },this)
    },

    upgradeButtonClicked: function (sender,type) {
        var card = UserInfo.getInstance().getCardByID(this.cardID);
        if (UserInfo.getInstance().getGold()<this.getRequiredCoin()){
            Util.uiReact(sender,type,function () {
                this.cannotUpgradeCardPopup(ShopLayerController.Resource.GOLD);
            }.bind(this))
        } else if (card.getPieces()<this.getRequiredCard()){
            Util.uiReact(sender,type,function () {
                this.cannotUpgradeCardPopup(-1);
            }.bind(this));
        } else {
            Util.uiReact(sender,type,function () {
                cc.log("request upgrade: ",this.cardID)
                NetworkManager.Connector.getIntance().getLobbyHandler().upgradeCard(this.cardID);
            }.bind(this));
        }
    },

    upgradeSuccess: function () {
        this.openAnotherPopup(PopupLayerController.TYPE.CARD_UPGRADE_SUCCESS);
    },

    cannotUpgradeCardPopup: function (status) {
        this.openAnotherPopup(PopupLayerController.TYPE.RESOURCE_NOTIFICATION,{type:status});
    },

    closePopupLayer: function () {
        ErrorHandler.getInstance().removeEventListener(
            ErrorHandler.ERROR.CANNOT_UPGRADE_CARD
        );

        ErrorHandler.getInstance().removeEventListener(
            ErrorHandler.ERROR.CARD_UPGRADE_SUCCESS
        );
        this._super();
    }
})