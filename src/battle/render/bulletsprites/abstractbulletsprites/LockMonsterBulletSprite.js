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
        cc.log("Check Anim: ",cc.animationCache.getAnimation(this.getAnimName()));
        this.runAction(cc.repeatForever(cc.animate(
            cc.animationCache.getAnimation(this.getAnimName())
        )));
    }
})