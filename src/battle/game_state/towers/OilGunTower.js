var OilGunTower = AttackTower.extend({
    setID: function () {
        this._id = 3;
    },

    /**
     *
     * @param {number}effectSlowTime
     */
    setEffectSlowTime: function (effectSlowTime) {
        this.effectSlowTime = effectSlowTime;
    },
    setSpecialStat: function (level) {
        var stat = TowerConfig.TowerInfo[this.getID()];
        this.setEffectSlowTime(stat[level]["effectSlowTime"]);
    },

    createBullet: function (target,id) {
        return new LockCellBullet(target, this,id);
    },

    createBulletUI: function (bullet) {
        let bulletUI = new OilGunBulletSprite(bullet);
        bulletUI.retain();
        return bulletUI;
    }
})