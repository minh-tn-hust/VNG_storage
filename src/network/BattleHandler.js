let BattleHandler = cc.Class.extend({
    _gameClient : null,
    getGameClient : function() {
        return this._gameClient
    },
    setGameClient : function(gameClient) {
        this._gameClient = gameClient
    },
    ctor : function(gameClient) {
        this.setGameClient(gameClient)
    },

    sendMatching: function (){
        cc.log("battle - sendMatching")
        var pk = this.getGameClient().getOutPacket(CmdMatching)
        pk.pack()
        this.getGameClient().sendPacket(pk)
    },
    // acceptMatching: function (){
    //     cc.
    // }
    sendAbortMatching: function (){
        cc.log("battle - sendMatching")
        var pk = this.getGameClient().getOutPacket(CmdAbortMatching)
        pk.pack()
        this.getGameClient().sendPacket(pk)
    }

})