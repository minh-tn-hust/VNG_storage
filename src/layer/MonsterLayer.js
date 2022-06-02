const MonsterLayer = cc.Layer.extend({
    _spawnMonster : null,
    ctor : function() {
        this._super()
        this.init()
        cc.spriteFrameCache.addSpriteFrames(ASSET.MONSTER.ASSASSIN_RUN.assets.assassin_plist)

        let monster = new Monster( 10, 10, ASSET.MONSTER.ASSASSIN_RUN)
        let monsterSprite = new cc.Sprite()
        monsterSprite.runAction(monster.getAnimationDirection(Monster.BOTTOM_RIGHT))
        monsterSprite.setPosition(cc.p({
            x : cc.winSize.width / 2,
            y : cc.winSize.height / 2,
        }))
        this.addChild(monsterSprite)
    },
})