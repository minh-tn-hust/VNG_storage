var AttackSpeedTowerSprite = SupportTowerSprite.extend({
    ctor : function(tower) {
        this._super(tower,TowerConfigRender["SNAKE_RED"]);
        this.initAnimation()
        this.setWho(tower)
    },
})