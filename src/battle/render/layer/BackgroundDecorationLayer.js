let BackgroundDecorationLayer = cc.Layer.extend({
    _enemyFieldUI: null,
    _myFieldUI: null,

    // GETTER
    getEnemyFieldUI : function(){return this._enemyFieldUI},
    getMyFieldUI : function(){return this._myFieldUI},
    // SETTER
    setEnemyFieldUI : function(ui) {this._enemyFieldUI = ui},
    setMyFieldUI : function(ui) {this._myFieldUI = ui},
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
        this.setEnemyFieldUI(Util.getChildByName(backgroundLayer,"EnermyField")[0])
        this.setMyFieldUI(Util.getChildByName(backgroundLayer, "OurField")[0])
    },
})