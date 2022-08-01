let ResourceAnimtion = PopupLayer.extend({
    _beginPosition : null,
    _resource : null,
    getBeginPosition : function() {
        return this._beginPosition

    },
    getResource : function() {
        return this._resource
    },
    setBeginPosition : function(position) {
        this._beginPosition = position
    },
    setResource : function(resource) {
        this._resource = resource
    },
    ctor : function(controller, metadata) {
        this._super(controller, false)
        cc.log("OIJGOIWEJGOIEWJG")
        cc.log(metadata.resource)
        this.setResource(metadata.resource)
        this.addAnimation()
    },
    addAnimation : function() {
        let center = cc.p(cc.winSize.width / 2, cc.winSize.height / 2)
        let destination
        if (this.getResource() === ResourceAnimtion.COIN) {
            destination = cc.p(320, 1100)
        } else {
            destination = cc.p(640, 1134 / 2)
        }

        for (let i = 0; i < 50; i++) {
            let randomX = Math.round(Math.random() * 10000) % 100 - Math.round(Math.random() * 10000) % 200
            let randomY = Math.round( Math.random() * 10000) % 100 - Math.round(Math.random() * 10000) % 200
            let newSprite
            cc.log(this.getResource())
            if (this.getResource() === ResourceAnimtion.COIN) {
                newSprite = new cc.Sprite("res/common_asset/common_icon_gold.png")
            } else {
                newSprite = new cc.Sprite("res/lobby_asset/treasure/common_icon_card_multiple_3.png")
            }

            newSprite.setScale(0.5)
            newSprite.setPosition(cc.p(center.x, center.y))
            let moveTo = cc.moveTo(0.5, cc.p(center.x + randomX, center.y + randomY)).easing(cc.easeBackOut(1))
            let moveTo1
            if (i !== 49) {
                moveTo1 = cc.moveTo(Math.random(), destination).easing(cc.easeBackIn(2))
            } else {
                moveTo1 = cc.moveTo(1, destination).easing(cc.easeBackIn(2))
            }
            let callFunc = cc.callFunc(function() {
                this.removeChild(newSprite)
            }.bind(this))
            if (i == 49) {
                callFunc1 = cc.callFunc(function(){
                    this.closePopupLayer()
                }.bind(this))
            }
            if (i !== 49) {
                newSprite.runAction(cc.sequence(moveTo, moveTo1, callFunc))
            } else {
                newSprite.runAction(cc.sequence(moveTo, moveTo1, callFunc, callFunc1))
            }
            this.addChild(newSprite)
        }
    },
    initPopupLayer : function(){},
    initAnimation : function() {

    },
})

ResourceAnimtion.COIN = 1
ResourceAnimtion.CARD = 2