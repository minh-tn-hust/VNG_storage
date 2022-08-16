var BoomerangTower = AttackTower.extend({
    setID: function (){
        this._id = 2;
    },

    createBullet: function (target,id) {
        return new LockCellBullet(target, this,id);
    },

    createBulletUI: function (bullet) {
        let bulletUI = new BoomerangBulletSprite(bullet,this.getLevel());
        bulletUI.retain();
        return bulletUI;
    }
})