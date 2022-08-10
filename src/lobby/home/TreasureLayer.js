var TreasureLayer = cc.Layer.extend({
    listTreasureButton:null,

    countingObject : {
        button: null,
        timeLabel:null,
        nGem:null,
        idx: -1,
    },

    resetCountingObj: function (){
        // var status = (this.countingObject.button.getUserData().getStatus()+1)%4;
        // cc.log("move forward status to: ",status)
        cc.log("move forward status to: ",TreasureUtil.STATUS.WAITING_TO_OPEN)
        this.countingObject.button.getUserData().setStatus(TreasureUtil.STATUS.WAITING_TO_OPEN);
        TreasureUtil.setTreasureVisibility(this.countingObject.button,TreasureUtil.STATUS.WAITING_TO_OPEN);
        // TreasureUtil.setTreasureVisibility(this.countingObject.button,status);

        this.countingObject.button = null;
        this.countingObject.timeLabel = null;
        this.countingObject.nGem = null;
        this.countingObject.idx = -1;
        cc.log("Inside reset done");
    },

    startCountDown: function (index,time) {
        cc.log("Counting Down: ", time, this.treasureLayer.schedule);
        this.treasureLayer.schedule(this.countDownTime.bind(this), 1);
    },

    countDownTime:function () {
        if (!this.decreasingTime(1)){
            this.treasureLayer.unscheduleAllCallbacks();
            // this.touchEnableAllPossibleButton();
            this.resetCountingObj();
        }
    },

    decreasingTime: function (second) {
        var time = this.countingObject.button.getUserData().getRemainingTime();
        if (time>0){
            time -=second;
            this.countingObject.button.getUserData().setRemainingTime(time);
            // cc.log("Cross Check: ",this.getTreasureLayerController().listTreasureInfo[1])
            this.countingObject.timeLabel.ignoreContentAdaptWithSize(true);
            this.countingObject.timeLabel.setString(Util.convertSecondToString(time));
            this.countingObject.nGem.setString(Math.ceil(
                time/(TreasureLayerController.TIME_TO_DISCOUNT_GEM*60)));
            cc.log("counting: ",time);
            return true;
        } else {
            cc.log("End of time: ",time)
            return false;
        }
    },

    isAnyTreasureCounting: function () {
        return this.countingObject.button!==null
    },

    updateFinishedCountingButton: function (button) {
        button.getUserData().setStatus(TreasureUtil.STATUS.WAITING_TO_OPEN);
        TreasureUtil.setTreasureVisibility(button,TreasureUtil.STATUS.WAITING_TO_OPEN);
    },


    setCountingObj: function (index) {
        // this.countingObject.treasureInfo= button.getUserData();
        this.countingObject.button = this.listTreasureButton[index];
        cc.log("countingObj at index: "+index+", "+this.countingObject.button);
        this.countingObject.timeLabel = Util.getChildByName(this.countingObject.button,"remainingTimeLabel")[0];
        this.countingObject.nGem = Util.getChildByName(this.countingObject.button,"nGem")[0];
        this.countingObject.idx= this.countingObject.button.getUserData().getIndex();
    },

    getIdxCountingTreasure: function(){
        return this.countingObject.idx;
    },

    getTreasureLayerController: function () {
        return this.treasureLayerController;
    },

    ctor: function(treasureLayerController, treasureLayer, listTreasureInfo){
        this._super();
        this.treasureLayerController = treasureLayerController;
        this.setTreasureLayer(treasureLayer);
        this.listTreasureButton = Util.getChildByName(this.treasureLayer,"TreasureButton");
        for (var i=0;i<TreasureUtil.MAX_TREASURE;++i){
            this.listTreasureButton[i].setUserData(listTreasureInfo[i]);
        }
    },

    setTreasureLayer: function (treasureLayer){
        this.treasureLayer = treasureLayer;
    },
    setupButton: function(){
        for (var i=0;i<this.listTreasureButton.length;++i){
            this.listTreasureButton[i].addTouchEventListener(this.treasureButtonFunction,this);
        }
        // this.touchEnableAllPossibleButton();
    },

    treasureButtonFunction: function(sender,type){
        Util.uiReact(sender,type,function () {
            var status =sender.getUserData().getStatus();
            let popupLayerController=PopupLayerController.getInstance();
            switch (status) {
                case TreasureUtil.STATUS.WAITING_TO_COUNT:
                    if (this.isAnyTreasureCounting()){
                        popupLayerController.createPopup(
                            PopupLayerController.TYPE.ONE_CHEST_AT_A_TIME,
                            {
                                index: sender.getUserData().getIndex(),
                                treasureLayerController: this.getTreasureLayerController()
                            })
                    } else {
                        cc.log("request to open treasure: ", sender.getUserData().getIndex());
                        // open popup cardInfo
                        popupLayerController.createPopup(
                            PopupLayerController.TYPE.CONFIRM_CHOOSE_CHEST,
                            {
                                index: sender.getUserData().getIndex(),
                                treasureLayerController: this.getTreasureLayerController()
                            });
                    }
                    break;
                case TreasureUtil.STATUS.COUNTING:
                    popupLayerController.createPopup(PopupLayerController.TYPE.BUY_CHEST_BY_GEM,
                        {
                            index: sender.getUserData().getIndex(),
                            requiredGem : Math.ceil(sender.getUserData().getRemainingTime()
                            /(TreasureLayerController.TIME_TO_DISCOUNT_GEM*60)),
                        });
                    break;
                case TreasureUtil.STATUS.WAITING_TO_OPEN:
                    TreasureLayerController.indexRequestedOpenChest=sender.getUserData().getIndex();
                    cc.log("Press to open index: ",sender.getUserData().getIndex());
                    this.getTreasureLayerController().openATreasure(sender.getUserData().getIndex());
                    break;
            }
        }.bind(this));
    },

    setTreasureStatus: function(idx,status){
        this.listTreasureButton[idx].getUserData().setStatus(status);
        TreasureUtil.setTreasureVisibility(this.listTreasureButton[idx],status);
    },

   /**
     * disable touch of other waiting-to-count button
     * @param idx index of button that is calling this function
     */
   touchDisableOtherButton: function (idx) {
       for (var i=0;i<idx;++i){
           if (this.listTreasureButton[i].getUserData().getStatus()!==TreasureUtil.STATUS.WAITING_TO_OPEN) {
               this.listTreasureButton[i].setTouchEnabled(false);
           }
       }

       for (i=idx+1;i<this.listTreasureButton.length;++i){
           if (this.listTreasureButton[i].getUserData().getStatus()!==TreasureUtil.STATUS.WAITING_TO_OPEN) {
               this.listTreasureButton[i].setTouchEnabled(false);
           }
       }
   },

    /**
     * enable touch of all non-empty treasure
     */
    touchEnableAllPossibleButton: function(){
        for (var i=0;i<this.listTreasureButton.length;++i){
            if (this.listTreasureButton[i].getUserData().getStatus()!==TreasureUtil.STATUS.EMPTY){
                this.listTreasureButton[i].setTouchEnabled(true);
            } else {
                this.listTreasureButton[i].setTouchEnabled(false);
            }
        }
    },


    renderATreasure: function(idx){
    TreasureUtil.renderTreasureUI(this.listTreasureButton[idx],this.listTreasureButton[idx].getUserData());
    if (this.listTreasureButton[idx].getUserData().getStatus()
        ===TreasureUtil.STATUS.EMPTY){
        cc.log("Disabling: ",idx);
        this.listTreasureButton[idx].setTouchEnabled(false);
        } else {
        this.listTreasureButton[idx].setTouchEnabled(true);
        }
    },
})