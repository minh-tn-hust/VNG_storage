var SocialLayerController = cc.Class.extend({
    ctor: function(lobbyLayerController){
        this.lobbySceneController = lobbyLayerController;
        this.socialLayer = new SocialLayer(this);
    },

    getLayer: function(){
        return this.socialLayer;
    }
})