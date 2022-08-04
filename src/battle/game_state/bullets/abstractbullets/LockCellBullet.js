var LockCellBullet= Bullet.extend({
    setTargetPosition: function (monster) {
        this.targetPosition = BattleUtil.fromModelPositionToMatrixPosition(
            monster.getPosition(),this.getWho()
        );
        this.targetPosition = BattleUtil.fromMatrixToModelPosition(
            this.targetPosition,this.getWho()
        );
    },

    getTargetPosition: function () {
        return this.targetPosition;
    },

})