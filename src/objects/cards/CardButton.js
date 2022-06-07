let CardButton = ccui.Button.extend({
    _normalSprite : null,
    _selectedSprite : null,
    _selected : false,

    getNormalSprite : function() {
        return this._normalSprite
    },
    /**
     *
     * @param {cc.Sprite} normalSprite
     */
    setNormalSprite : function(normalSprite) {
        this._normalSprite = normalSprite
    },
    getSelectedSprite : function() {
        return this._selectedSprite
    },
    /**
     *
     * @param {cc.Sprite} selectedSprite
     */
    setSelectedSprite : function(selectedSprite) {
        this._selectedSprite = selectedSprite
    },
    getSelected : function() {
        return this._selected
    },
    /**
     * Bật tắt trạng thái của 2 sprite
     * @param {boolean} state
     */
    setSelected : function(state) {
        this._selected = state
    },

    ctor : function() {
        this._super("res/card/battle_card_box.png")
        this.init()
    },
    init : function() {
        let size = this.getContentSize()
        let normalSprite = new FeatureCard()
        normalSprite.setVisible(true)
        normalSprite.setPosition(cc.p(size.width / 2, size.height/2))
        let selectedSprite = new FeatureCard("", true)
        selectedSprite.setVisible(false)
        selectedSprite.setPosition(cc.p(size.width / 2, size.height/2 + 50))

        this.addClickEventListener(this.onClick)

        this.setNormalSprite(normalSprite)
        this.setSelectedSprite(selectedSprite)


        this.addChild(normalSprite)
        this.addChild(selectedSprite)
    },
    onClick : function() {
        this.setSelected(!this.getSelected())
        let scene = cc.director.getRunningScene()
        let isSelected = this.getSelected()

        if (isSelected) {
            this._selectedSprite.setVisible(true)
            this._normalSprite.setVisible(false)
            let backgroundLayer = scene.getChildByTag(OnGameScene.backgroundLayer)
            backgroundLayer.setCanPlanTree(true)
            backgroundLayer.getTreeSprite().setVisible(true)
        } else {
            this._selectedSprite.setVisible(false)
            this._normalSprite.setVisible(true)
            let backgroundLayer = scene.getChildByTag(OnGameScene.backgroundLayer)
            backgroundLayer.setCanPlanTree(false)
            backgroundLayer.getTreeSprite().setVisible(false)
        }
    }
})