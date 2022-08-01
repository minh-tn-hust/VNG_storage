var TreasureInfo = cc.Class.extend({
    index:0,
    startTime: 0,
    remainingTime: 0,
    waitingTime:0,
    listCard:null,
    status: 0,


    ctor: function ({index, startTime,waitingTime,remainingTime,status}){
        this.setTreasure({index, startTime,waitingTime,remainingTime,status});
    },

    setTreasure: function ({index, startTime,waitingTime,remainingTime,status}) {
        this.setIndex(index);
        this.setStartTime(startTime);
        this.setWaitingTime(waitingTime);
        this.setRemainingTime(remainingTime);
        this.setStatus(status);
    },

    toJSONObject: function(){
        return {
            index: this.getIndex(),
            startTime: this.getStartTime(),
            waitingTime: this.getWaitingTime(),
            status : this.getStatus()
        }
    },

    getIndex: function(){
        return this.index;
    },

    getStartTime: function(){
        return this.startTime;
    },

    getRemainingTime: function(){
        return this.remainingTime;
    },

    getWaitingTime: function(){
        return this.waitingTime;
    },

    getListCard: function(){
        return this.listCard;
    },

    getStatus: function(){
        return this.status;
    },

    setIndex: function(index){
        if (index>-1&&index<TreasureUtil.MAX_TREASURE){
            this.index = index;
        }
    },

    setStartTime: function (startTime){
        this.startTime = startTime;
    },

    setWaitingTime: function (waitingTime){
        this.waitingTime =waitingTime;
    },

    setRemainingTime: function(remainingTime){
        this.remainingTime = remainingTime;
    },

    setListCard: function(listCard){
        this.listCard= listCard;
    },

    setStatus: function(status){
        this.status = status;
    }
})