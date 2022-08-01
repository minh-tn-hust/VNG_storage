var ErrorHandler = cc.Class.extend({
    _eventListener : null,
    getEventListener: function () {
        return this._eventListener;
    },
    ctor: function () {
        this._eventListener = {};
    },

    addEventListener : function(event, callBack) {
        try {
            this.getEventListener()[event].push(callBack);
        } catch (e) {
            this.getEventListener()[event] = [];
            this.getEventListener()[event].push(callBack);
        }
    },

    notify : function(event, metadata) {
        let listeners = this.getEventListener()
        for (let i = 0;i < listeners[event].length; i++) {
            listeners[event][i](metadata);
        }
    },

    removeEventListener: function (eventID) {
        let listener = this.getEventListener()[eventID];
        while(listener.length!==0){
            listener.shift();
        }
    }

})

ErrorHandler._errorHandler = null

ErrorHandler.getInstance = function () {
    if (this._errorHandler){
        return this._errorHandler;
    } else {
        this._errorHandler = new ErrorHandler();
        return this._errorHandler;
    }
}

ErrorHandler.setInstance = function (errorHandler) {
    ErrorHandler._errorHandler = errorHandler;
}

ErrorHandler.ERROR ={
    CAN_SWAP:0,
    CANNOT_SWAP:1,
    CANNOT_UPGRADE_CARD:2,
    CARD_UPGRADE_SUCCESS: 3,
    NOT_ENOUGH_GEM:5,
    BUY_CHEST_BY_GEM_SUCCESS:6,
}