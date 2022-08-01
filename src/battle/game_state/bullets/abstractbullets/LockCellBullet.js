var LockCellBullet= Bullet.extend({
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

})