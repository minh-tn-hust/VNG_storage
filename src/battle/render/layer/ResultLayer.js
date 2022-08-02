let ResultLayer = cc.Layer.extend({
    _info : null,

    // GETTER
    getType: function () {return this._type},

    /**
     * Lấy thông tin trận đấu
     * @returns {Info}*/
    getInfo : function() {return this._info},

    // SETTER
    setType: function (type) {this._type = type},
    setInfo : function(info) {this._info = info},

    ctor: function (info) {
        this._super()
        this.setInfo(info)
        info.setPoint(1)
        if (info.getPoint() === info.getEnemyPoint()) {
            this.setType(BattleConfig.Drawing)
        } else if (info.getPoint() < info.getEnemyPoint()) {
            this.setType(BattleConfig.Losing)
        } else {
            this.setType(BattleConfig.Wining)
        }
        this.createAnimation()
    },

    updateInfoToUI : function(node, name, trophy, point) {
        let nameTitle = Util.getChildByName(node, "PlayerName")[0]
        nameTitle.setString(name)

        let trophyTitle = Util.getChildByName(node, "TrophyTitle")[0]
        trophyTitle.setString(trophy)

        let pointTitle = Util.getChildByName(node, "HealthTitle")[0]
        pointTitle.setString(point)
    },

    createAnimation: function () {
        // Hiển thị blur background
        let blurBackground = ccui.Layout()
        blurBackground.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID)
        blurBackground.setBackGroundColor(cc.color(0,0,0))
        blurBackground.setBackGroundColorOpacity(200)
        blurBackground.setContentSize(cc.size(cc.winSize.width,cc.winSize.height))
        blurBackground.setTouchEnabled(true)
        this.addChild(blurBackground)

        // Hiển thị thông tin của battle vừa rồi
        let battleInfo = ccs.load("battle_Result.json").node
        let info = this.getInfo()
        battleInfo.setAnchorPoint(0.5,0.5)
        battleInfo.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
        this.addChild(battleInfo, 100)
        battleInfo.setVisible(false)
        let playerUIInfo = Util.getChildByName(battleInfo, "Player")[0]
        let enemyUIInfo = Util.getChildByName(battleInfo, "Enemy")[0]
        this.updateInfoToUI(playerUIInfo, "DEFAULT NAME", 1, info.getPoint())
        this.updateInfoToUI(enemyUIInfo, info.getEnemyName(), info.getEnemyTrophy(), info.getEnemyPoint())

        // Thêm sự kiện cho nút trở về
        let backButton = Util.getChildByName(battleInfo, "BackButton")[0]
        backButton.setVisible(false)
        backButton.addTouchEventListener(function(button, event){
            Util.uiReact(button, event, function(){
                MainController.getInstance().runLobbyScene()
            })
        }, this)



        // hiển thị animation khi kết thúc trận đấu dựa vào chiến thắng của người chơi
        let type = this.getType()
        let resultAnimation = new sp.SkeletonAnimation(BattleConfig.Animation[type].json, BattleConfig.Animation[type].atlas)
        resultAnimation.setPosition(cc.winSize.width / 2, cc.winSize.height / 2)
        this.addChild(resultAnimation)
        resultAnimation.setAnimation(0, BattleConfig.Animation[type].init, false)
        isShow = true
        let isShow = false
        let self = this

        resultAnimation.setCompleteListener(function() {
            if (isShow === false) {
                isShow = true
                battleInfo.setPosition(cc.p(cc.winSize.width /2, -1000))
                let moveBy = cc.moveTo(0.3, cc.p(cc.winSize.width / 2, cc.winSize.height / 2)).easing(cc.easeBackIn(2))
                battleInfo.setVisible(true)
                battleInfo.runAction(moveBy)
                backButton.setVisible(true)
            }
            resultAnimation.setAnimation(0, BattleConfig.Animation[type].idle, true)
        })

    }
})