var TreasureLayerController = cc.Class.extend({
    homeLayerController:null,
    listTreasureInfo: null,
    treasureLayer:null,

    getTreasureLayer: function () {
        return this.treasureLayer;
    },

    ctor: function(homeLayerController, treasureLayer){
        this.listTreasureInfo = new Array(TreasureUtil.MAX_TREASURE);
        for (var i=0;i<TreasureUtil.MAX_TREASURE;++i){
            this.listTreasureInfo[i] = new TreasureInfo({
                index: i, startTime:0, waitingTime:0, status: 0
            });
        }

        this.treasureLayer = new TreasureLayer(this,treasureLayer,this.listTreasureInfo);
        UserInfo.getInstance().addEventListener(UserInfo.Event.COUNTDOWN_TREASURE,this.startCounting.bind(this));
        UserInfo.getInstance().addEventListener(UserInfo.Event.OPEN_TREASURE,this.renderNewTreasure.bind(this));
        UserInfo.getInstance().addEventListener(UserInfo.Event.UPDATED_CHEST,this.renderATreasure.bind(this))
        UserInfo.getInstance().addEventListener(UserInfo.Event.CHEST_OPEN_BY_GEM,this.startCounting.bind(this));
    },

    initTreasureLayer: function(){
        var treasures = UserInfo.getInstance().getChests();
        for (var i=0;i<TreasureUtil.MAX_TREASURE;++i){
            this.renderATreasure(treasures[i]);
        }
        this.getTreasureLayer().setupButton();
        for (i=0;i<TreasureUtil.MAX_TREASURE;++i){
            if (treasures[i].status===TreasureUtil.STATUS.COUNTING){
                cc.log("calling startCounting from Start")
                this.startCounting(i);
            }
        }
    },

    setRandomCardForTreasure: function (treasureInfo){

    },

    /**
     * render a treasure by treasureInfo
     * @param treasureInfo
     */
    renderATreasure: function(treasureInfo){
        cc.log("render treasure: ",JSON.stringify(treasureInfo));
        this.listTreasureInfo[treasureInfo.index].setTreasure(treasureInfo);
        cc.log("Check treasure info : ",JSON.stringify(treasureInfo));
        cc.log("Double check: ",JSON.stringify(this.listTreasureInfo[treasureInfo.index].toJSONObject()));
        this.getTreasureLayer().renderATreasure(treasureInfo.index);
    },

    /**
     * get a new treasure from server
     */
    newTreasure: function(){
        for(var i=0;i<this.listTreasureInfo.length;++i){
            if (this.listTreasureInfo[i].getStatus()===TreasureUtil.STATUS.EMPTY){
                cc.log("Adding chest at: ",i);
                TreasureLayerController.indexAddingChest=i;
                NetworkManager.Connector.getIntance().getLobbyHandler().cheatChest(i);
                break;
            }
        }
    },

    /**
     * render a treasure returned from server
     */
    renderNewTreasure: function(){
        var index =TreasureLayerController.indexAddingChest;
        cc.log("renderNewTreasure, index: ",index);
        if (this.listTreasureInfo[index].getStatus()===TreasureUtil.STATUS.EMPTY){
            cc.log("Can Render");
            this.listTreasureInfo[index].setStatus(TreasureUtil.STATUS.WAITING_TO_COUNT);
            this.listTreasureInfo[index].setWaitingTime(10800);
            this.renderATreasure(this.listTreasureInfo[index].toJSONObject());
        }
    },

    openATreasure: function(index){
        NetworkManger.Connector.getIntance().getLobbyHandler().openChest(index);
    },

    chooseTreasure: function (index) {
        this.getTreasureLayer().setCountingObj(index);
        NetworkManger.Connector.getIntance().getLobbyHandler().chooseChest(index);
    },

    startCounting: function (index) {
        if (UserInfo.getInstance().getTimestamp()===null){
            this.index = index;
            setTimeout(this.waitTimeStampToCountdown.bind(this),50)
        } else {
            cc.log("timeStamp: ", UserInfo.getInstance().getTimestamp())
            this.getTreasureLayer().setCountingObj(index);
            cc.log("Start counting at chest: ", index);
            // this.getTreasureLayer().touchDisableOtherButton(index);
            cc.log("waitingTime: ", this.listTreasureInfo[index].getWaitingTime())
            cc.log("timeStamp: ", UserInfo.getInstance().getTimestamp())
            cc.log("startTime: ", this.listTreasureInfo[index].getStartTime())
            var remainingTime = this.listTreasureInfo[index].getWaitingTime() -
                (UserInfo.getInstance().getTimestamp() - this.listTreasureInfo[index].getStartTime());
            this.listTreasureInfo[index].setRemainingTime(remainingTime);
            this.getTreasureLayer().startCountDown(index, this.listTreasureInfo[index].getRemainingTime());
        }
    },

    waitTimeStampToCountdown: function () {
        if (UserInfo.getInstance().getTimestamp()===null){
            setTimeout(this.waitTimeStampToCountdown.bind(this),50);
        } else {
            this.startCounting(this.index);
        }
    },

    requireUpdateCard: function(listCard){

    }
})

TreasureLayerController.indexAddingChest = -1;
TreasureLayerController.indexRequestedOpenChest = -1;
TreasureLayerController.TIME_TO_DISCOUNT_GEM = 10;