var MonsterInfoBattlePopup = TowerInfoBattlePopup.extend({
    getCurrentDisplayLevel: function () {
        return 1;
    },

    initStat: function () {
        this.stat = {}
    },
    initLevel: function () {

    },


    // TODO: thiết lập stat, loại bỏ các nút chuyển cấp 1,2,3 trên UI
    // ctor: function(popupController,cardID){
    //     this._super(popupController,cardID);
    //     this.stat={};
    // },

    /**
     *
     * @param {CardInfo}card
     */
    setStat: function (card){
        var jsStat;
        jsStat = Util.loadJSONFile("res/Monster.json")["monster"][this.cardID-10];
        for (var statName of CardAssetConfig.DisplayPara[this.cardID]) {
            this.stat[statName] = jsStat[statName];
        }

        if(this.stat["hp"]!==undefined){
            this.stat["hp"] = CardUtil.upgradeFactorToLevel(
                this.stat["hp"],
                card.getLevel(),
                CardUtil.upgradeHPPercent
            ).toFixed(1);
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
            statName.setString(configStat.name);
            statValue.setString(this.stat[key]+configStat.unit);
            i++;
        }
    },
})