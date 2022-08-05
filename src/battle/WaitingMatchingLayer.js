let WaitingMatchingLayer = cc.Scene.extend({
    ctor:function (){
        this._super();
        this.watingMatchingLayer = ccs.load("waitingMatching.json", "").node;
        this.watingMatchingLayer.setContentSize(cc.winSize)
        ccui.Helper.doLayout(this.watingMatchingLayer)
        this.addChild(this.watingMatchingLayer);
        // thêm sự kiện cho nút Hủy bỏ
        let btnHuyBo = this.watingMatchingLayer.getChildByName("btnHuyBo")
        let glassSprite = this.watingMatchingLayer.getChildByName("glass")
        this.setupActionForGlass(glassSprite)
        btnHuyBo.addTouchEventListener(function(button, event){
            Util.uiReact(button, event, function(){
                NetworkManager.Connector.getIntance().getBattleHandler().sendAbortMatching()
            })
        }, this)

        UserInfo.getInstance().addEventListener(
            UserInfo.Event.ABORT_MATCH_DONE, this.runLobbyScene.bind(this)
        )
    },
    runLobbyScene: function (){
        MainController.getInstance().runLobbyScene()
    },

    setupActionForGlass: function (glassSprite) {
        var pos = glassSprite.getPosition();
        var a1 = cc.MoveTo(0.15,cc.p(pos.x +10, pos.y))
        var a2 = cc.MoveTo(0.3,cc.p(pos.x +10, pos.y+20))
        var a3 = cc.MoveTo(0.3,cc.p(pos.x-10 , pos.y +20))
        var a4 = cc.MoveTo(0.3,cc.p(pos.x-10 , pos.y))
        var a5 = cc.MoveTo(0.15,cc.p(pos.x , pos.y))
        glassSprite.runAction(cc.RepeatForever(cc.sequence(a1,a2,a3,a4,a5)));
    }
})