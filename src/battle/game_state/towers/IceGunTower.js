var IceGunTower = AttackTower.extend({
    // TODO json file let damage = 0, needs to recheck
    setID: function () {
        this._id = 4;
    },

    /**
     *
     * @param {number}effectFreezeTime
     */
    setEffectFreezeTime: function (effectFreezeTime) {
        this.effectFreezeTime = effectFreezeTime;
    },

    setSpecialStat: function (level) {
        var stat = TowerConfig.TowerInfo[this.getID()];
        this.setEffectFreezeTime(stat[level]["effectFreezeTime"]);
    },

    createBullet: function (target,id) {
        return new LockMonsterBullet(target,this,id);
    },

    createBulletUI: function (bullet) {
        let bulletUI = new IceGunBulletSprite(bullet);
        bulletUI.retain();
        return bulletUI;
    }
})