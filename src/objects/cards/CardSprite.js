const FeatureCard = cc.Node.extend({
    ctor : function(cardContentAsset, isSelected) {
        this._super()
        this.init(cardContentAsset, isSelected)
    },
    init : function(cardContentAsset, isSelected) {
        let battleCardBox = cc.Sprite("res/card/battle_card_box.png")
        battleCardBox.setScale(1.4)
        this.addChild(battleCardBox)

        let cardBackground = new cc.Sprite("res/card/card_background.png")
        this.addChild(cardBackground, 0, 1)

        let cardBorder = new cc.Sprite("res/card/card_border.png")
        this.addChild(cardBorder, 1, 1)

        let cardContent = new cc.Sprite("res/map/map_decoration_tree.png")
        this.addChild(cardContent, 2, 1)

        if (isSelected) {
            let label = cc.LabelTTF("Hủy", "SVN-Supercell Magic", 20)
            label.setPosition(cc.p(0,-120 ))
            this.addChild(label, 3, 1)

            let button = cc.Sprite("res/card/battle_btn_destroy.png")
            button.setPosition(cc.p(0,-123 ))
            this.addChild(button)
        }
    },
})