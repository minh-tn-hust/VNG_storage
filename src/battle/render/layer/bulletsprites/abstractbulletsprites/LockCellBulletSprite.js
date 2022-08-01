var LockCellBulletSprite = BulletSprite.extend({
    setTargetPosition: function (monster) {
        this.targetPosition = BattleUtil.fromPositionToMatrix(
            monster.getPosition(),this.getWho()
        );
        this.targetPosition = BattleUtil.fromMaxtrixToPosition(
            this.targetPosition,this.getWho()
        );
    },

    getTargetPosition: function () {
        return this.targetPosition;
    },

    ctor: function (who) {
        this._super(who);
    },

    runAnim: function () {
        this.stopAllActions();
        cc.log("Check Anim: ",cc.animationCache.getAnimation(this.getAnimName()));
        this.runAction(cc.repeatForever(cc.animate(
            cc.animationCache.getAnimation(this.getAnimName())
        )));
    }
})