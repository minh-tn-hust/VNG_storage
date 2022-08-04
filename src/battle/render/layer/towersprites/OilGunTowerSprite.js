var OilGunTowerSprite = AttackTowerSprite.extend({
    createBullet: function () {
        var bullet = new OilGunBulletSprite(this.getWho());
        bullet.retain();
        bullet.setPosition(this.getPosition());
        return bullet;
    },

    ctor : function(tower) {
        this._super(tower,TowerConfigRender["RABBIT_STICKY"])
        this.initAnimation()
        // this.setWho(tower)
        // this.schedule(this.fire, 0.6)
    },
})