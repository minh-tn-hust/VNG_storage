var SupportTower = Tower.extend({

    setBasicStat: function (level) {
        var stat = TowerConfig.getTowerInfo(this.getID());
        this.setRange(stat[level]["range"]);
    }
})