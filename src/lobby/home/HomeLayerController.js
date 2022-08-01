
let HomeLayerController = cc.Class.extend({
    ctor: function (lobbySceneController){
        // this._super();
        this.lobbySceneController = lobbySceneController;
        var homeLayer =  ccs.load("home_HomeLayer.json", "").node;
        var treasureLayer = homeLayer.getChildByName("TreasureListNode");
        this.treasureLayerController = new TreasureLayerController(this,treasureLayer);
        this.homeLayer = new HomeLayer(this,homeLayer);

        this.treasureLayerController.initTreasureLayer();
        this.cheatCardLayerController = new CheatCardLayerController(this,
            Util.getChildByName(homeLayer,"CheatButton")[0]);
        this.cheatChestController = new CheatChestController(this.treasureLayerController,
            Util.getChildByName(homeLayer,"AddChestButton")[0]);
    },

    getLayer: function(){
        return this.homeLayer;
    }
})