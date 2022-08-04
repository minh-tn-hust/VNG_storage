var CannonTower = AttackTower.extend({
    setID: function () {this.ID=0;},

    createBullet: function (target,id) {
        return new LockMonsterBullet(target,this,id);
    },

    createBulletUI: function (bullet) {
        let bulletUI = new CannonBulletSprite(bullet);
        bulletUI.retain();
        return bulletUI;
    }
})