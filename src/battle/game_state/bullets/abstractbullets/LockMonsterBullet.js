var LockMonsterBullet= Bullet.extend({
    getTargetPosition: function () {
        return this.getTarget().getPosition();
    }
})