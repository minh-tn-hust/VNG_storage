var OilGunTower = AttackTower.extend({
    setID: function () {
        this.ID = 3;
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
    }
})