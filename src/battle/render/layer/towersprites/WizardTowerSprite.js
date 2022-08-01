var WizardTowerSprite = TowerSprite.extend({
    createBullet: function () {
        var bullet = new WizardBulletSprite(this.getWho());
        bullet.retain();
        bullet.setPosition(this.getPosition());
        return bullet;
    },

    ctor : function(who) {
        this._super(who,TowerConfig["CROW_SORCERER"])
        this.initAnimation()
        this.setAsset(TowerConfig["CROW_SORCERER"])
        this.setWho(who)
        // this.init(this.getAsset());
        this.schedule(this.fire, 0.6)
    },
})