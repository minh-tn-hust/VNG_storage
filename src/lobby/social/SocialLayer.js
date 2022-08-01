var SocialLayer = cc.Layer.extend({
    ctor: function (socialLayerController){
        this._super();
        this.socialLayerController = socialLayerController;

        this.socialLayer = ccs.load("social_SocialLayer.json","").node;
        this.socialLayer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(this.socialLayer);
        this.addChild(this.socialLayer,1);
    }
})