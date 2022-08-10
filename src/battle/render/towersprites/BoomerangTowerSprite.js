var BoomerangTowerSprite = AttackTowerSprite.extend({
    createBullet: function () {
        var bullet = new BoomerangBulletSprite(this.getWho());
        bullet.retain();
        bullet.setPosition(this.getPosition());
        return bullet;
    },

    ctor : function(tower) {
        this._super(tower,TowerConfigRender["FROG_BUTCHER"])
        this.initAnimation()
        // this.setWho(tower)
        // this.init(this.getAsset());
        // this.schedule(this.fire, 0.6)
    },
})