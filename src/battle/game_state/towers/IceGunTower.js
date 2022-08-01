var IceGunTower = AttackTower.extend({
    // TODO json file let damage = 0, needs to recheck
    setID: function () {
        this.ID = 4;
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
    }
})