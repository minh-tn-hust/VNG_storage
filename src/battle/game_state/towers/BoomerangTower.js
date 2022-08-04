var BoomerangTower = AttackTower.extend({
    setID: function (){
        this.ID = 2;
    },

    createBullet: function (target,id) {
        return new LockCellBullet(target, this,id);
    },

    createBulletUI: function (bullet) {
        let bulletUI = new BoomerangBulletSprite(bullet);
        bulletUI.retain();
        return bulletUI;
    }
})