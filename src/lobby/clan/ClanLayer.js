var ClanLayer = cc.Layer.extend({
    ctor: function (clanLayerController){
        this._super();
        this.clanLayerController = clanLayerController;

        this.clanLayer = ccs.load("event_EventLayer.json","").node;
        this.clanLayer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(this.clanLayer);
        this.addChild(this.clanLayer,1);
    }
})