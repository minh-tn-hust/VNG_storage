var SpellInfoBattlePopup = TowerInfoBattlePopup.extend({
    // TODO: thiết lập stat, loại bỏ các nút chuyển cấp 1,2,3 trên UI
    getCurrentDisplayLevel: function () {
        return 1;
    },
    initStat: function () {
        this.stat = {}
    },
    initLevel: function () {

    },

    /**
     *
     * @param {CardInfo}card
     */
    setStat: function (card){
        var jsStat;
        jsStat = SpellConfig[SpellConfig["IDToName"][this.cardID]]
        for (var statName of CardAssetConfig.DisplayPara[this.cardID]) {
            this.stat[statName] = jsStat[statName];
        }

        if(this.stat["damage"]!==undefined){
            this.stat["damage"] = jsStat["damage"][card.getLevel()].toFixed(1);
        }
        if (this.stat["effectRange"]!==undefined){
            this.stat["effectRange"] = jsStat["effectRange"][card.getLetterRank()];
        }
        if (this.stat["healthUp"]!==undefined){
            this.stat["healthUp"] = jsStat["healthUp"][card.getLevel()];
        }
        cc.log("Stat: ",JSON.stringify(this.stat));
    },


    displayStat: function (level){
        var i=0;
        var configStat;
        var statImage, statName, statValue;
        for (var key of Object.keys(this.stat)){
            cc.log("key: ",key);
            configStat = CardAssetConfig.STATS.STAT_CONFIG[
                CardAssetConfig.STATS.STAT_ID[key]
                ];
            this.statNodes[i].setVisible(true);
            statImage = this.statNodes[i].getChildByName("StatImage");
            statName = this.statNodes[i].getChildByName("StatName");
            statValue = this.statNodes[i].getChildByName("statValue");

            cc.log("statImage: ",statImage);
            statImage.loadTexture(configStat.image);
            statName.ignoreContentAdaptWithSize(true);
            statName.setString(configStat.name);
            statValue.setString(this.stat[key]+configStat.unit);
            i++;
        }
    },
})