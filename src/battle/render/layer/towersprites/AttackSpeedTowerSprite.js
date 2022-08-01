var AttackSpeedTowerSprite = SupportTowerSprite.extend({
    ctor : function(who) {
        this._super(who,TowerConfig["SNAKE_RED"]);
        this.initAnimation()
        this.setAsset(TowerConfig["SNAKE_RED"])
        this.setWho(who)
    },
})