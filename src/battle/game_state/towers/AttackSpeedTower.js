var AttackSpeedTower = SupportTower.extend({
    /**
     *
     * @param {number}attackSpeedUp
     */
    setAttackSpeedUp : function (attackSpeedUp) {
        this.attackSpeedUp = attackSpeedUp;
    },
    getAttackSpeedUp: function () {
        return this.attackSpeedUp;
    },
    setSpecialStat: function (level) {
        var stat = TowerConfig.TowerInfo[this.getID()];
        this.setAttackSpeedUp(stat[level]["attackSpeedUp"]);
    }
})