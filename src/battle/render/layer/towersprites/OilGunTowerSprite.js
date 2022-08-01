var OilGunTowerSprite = TowerSprite.extend({
    createBullet: function () {
        var bullet = new OilGunBulletSprite(this.getWho());
        bullet.retain();
        bullet.setPosition(this.getPosition());
        return bullet;
    },

    ctor : function(who) {
        this._super(who,TowerConfig["RABBIT_STICKY"])
        this.initAnimation()
        this.setWho(who)
        this.schedule(this.fire, 0.6)
    },
})