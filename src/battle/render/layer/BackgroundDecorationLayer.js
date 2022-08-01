let BackgroundDecorationLayer = cc.Layer.extend({
    ctor : function() {
        this._super()
        this.init()
    },
    init : function() {
        let backgroundLayer = ccs.load(res.battle.BackgroundLayer.json).node
        backgroundLayer.setContentSize(cc.winSize)
        ccui.Helper.doLayout(backgroundLayer)
        backgroundLayer.setPosition(0, 0)
        this.addChild(backgroundLayer)
    },
})