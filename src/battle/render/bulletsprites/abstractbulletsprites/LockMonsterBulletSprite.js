var LockMonsterBulletSprite = BulletSprite.extend({
    getTargetPosition: function () {
        return BattleUtil.fromModelPositionToPosition(
            this.getTarget().getPosition(),this.getWho()
        );
    },

    ctor: function (bullet) {
        this._super(bullet);
    },

    runAnim: function () {
        this.stopAllActions();
        this.runAction(cc.repeatForever(cc.animate(
            cc.animationCache.getAnimation(this.getAnimName())
        )));
    }
})