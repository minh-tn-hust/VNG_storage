var LockCellBulletSprite = BulletSprite.extend({
    setTargetPosition: function (monster) {
        this.targetPosition = BattleUtil.fromModelPositionToMatrixPosition(
            monster.getPosition(),this.getWho()
        );
        this.targetPosition = BattleUtil.fromMaxtrixToPosition(
            this.targetPosition,this.getWho()
        );
    },

    getTargetPosition: function () {
        return this.targetPosition;
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