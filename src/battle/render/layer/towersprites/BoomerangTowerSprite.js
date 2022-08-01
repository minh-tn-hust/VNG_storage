var BoomerangTowerSprite = TowerSprite.extend({
    createBullet: function () {
        var bullet = new BoomerangBulletSprite(this.getWho());
        bullet.retain();
        bullet.setPosition(this.getPosition());
        return bullet;
    },

    ctor : function(who) {
        this._super(who,TowerConfig["FROG_BUTCHER"])
        this.initAnimation()
        this.setWho(who)
        // this.init(this.getAsset());
        this.schedule(this.fire, 0.6)
    },
})