var WizardTower = AttackTower.extend({
    setID: function () {
        this._id = 1;
    },

    createBullet: function (target,id) {
        return new LockCellBullet(target,this,id);
    },

    createBulletUI: function (bullet) {
        let bulletUI = new WizardBulletSprite(bullet);
        bulletUI.retain();
        return bulletUI;
    }
})