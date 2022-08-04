let PlaceTowerEvent = UserEvent.extend({
    setCID: function (cid) {this.cid= cid;},
    setPosition: function (position) {this.position = position;},

    getCID: function () {return this.cid},
    getPosition: function () {return this.position},

    ctor : function(actionTick, metaData, type, who) {
        this._super(actionTick, metaData, type,who);
        this.setCID(metaData.cid);
        this.setPosition(metaData.position);
    },
})