var HomeLayer = cc.Layer.extend({
    ctor:function (homeLayerController,homeLayer){
        this._super();
        this.homeLayerController = homeLayerController;
        // this.homeLayer = ccs.load("home_HomeLayer.json", "").node;
        this.homeLayer = homeLayer;
        this.homeLayer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(this.homeLayer);

        this.addChild(this.homeLayer);

        // thêm sự kiện cho nút fight
        let fightButton = Util.getChildByName(homeLayer, "Fight")
        fightButton[0].addTouchEventListener(function(button, eventType){
            // let self = this;
            switch (eventType) {
                case ccui.Widget.TOUCH_ENDED :
                    // cc.director.runScene( new WaitingMatchingLayer())
                    MainController.getInstance().runWaitingMatchingScene();
                    NetworkManager.Connector.getIntance().getBattleHandler().sendMatching()
            }
        }, this)

    },


})