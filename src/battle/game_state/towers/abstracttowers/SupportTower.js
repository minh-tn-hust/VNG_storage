var SupportTower = Tower.extend({

    setBasicStat: function (level) {
        var stat = TowerConfig.TowerInfo[this.getID()];
        this.setRange(stat[level]["range"]);
    }
})