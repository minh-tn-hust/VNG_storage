var CannonTowerSprite = TowerSprite.extend({
    createBullet: function () {
        var bullet = new CannonBulletSprite(this.getWho());
        bullet.retain();
        bullet.setPosition(this.getPosition());
        return bullet;
    },

    ctor : function(who) {
        this._super(who,TowerConfigRender["OWL_FIRECRACKER"])
        this.initAnimation()
        this.setWho(who)
        this.schedule(this.fire, 0.6)
    },

    animOnFire: function () {
        var test = new sp.SkeletonAnimation(TowerConfig.FX.Canon.json,TowerConfig.FX.Canon.atlas);
        test.setAnimation(0,"attack_1",false);
        var offset = TowerConfig.OWL_FIRECRACKER.fireAnimPosition;
        test.setPosition(
            this.x+offset.x,
            this.y+offset.y
        );
        // this.addChild(test,0,100);
    }
})