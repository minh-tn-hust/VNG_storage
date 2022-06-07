const UIGameLayer = cc.Layer.extend({
    ctor : function() {
        this._super()
        this.init()
    },
    init : function() {
        let battleDeck = cc.Sprite("res/map/battle_deck.png")
        battleDeck.setAnchorPoint(0.5, 0)
        battleDeck.setPosition({
            x : cc.winSize.width / 2,
            y : 0
        })
        this.addChild(battleDeck)

        let cardButton = new CardButton()
        cardButton.setPosition(cc.p({
            x : cc.winSize.width / 2,
            y : 120
        }))
        this.addChild(cardButton)

    },
})