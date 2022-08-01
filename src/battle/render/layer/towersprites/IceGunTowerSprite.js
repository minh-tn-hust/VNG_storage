var IceGunTowerSprite = TowerSprite.extend({
    createBullet: function () {
        var bullet = new IceGunBulletSprite(this.getWho());
        bullet.retain();
        bullet.setPosition(this.getPosition());
        return bullet;
    },

    ctor : function(who) {
        this._super(who,TowerConfig["BEAR_POLAR"])
        this.initAnimation()
        this.setWho(who)
        // this.init(this.getAsset());
        this.schedule(this.fire, 0.6)
    },
})