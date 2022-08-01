var ClanLayerController = cc.Class.extend({
    ctor: function(lobbyLayerController){
        this.lobbySceneController = lobbyLayerController;
        this.clanLayer = new ClanLayer(this);
    },

    getLayer: function(){
        return this.clanLayer;
    }
})