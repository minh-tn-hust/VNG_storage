let IceGunBulletSprite = LockMonsterBulletSprite.extend({
    ctor: function (bullet) {
        this.setAsset(BulletConfigRender.ICE_GUN_BULLET);
        this.setAnimName("IceGunBullet")
        this._super(bullet);
    },

    createAnimationCache: function (){
        let assetConfig = this.getAsset();
        cc.spriteFrameCache.addSpriteFrames(assetConfig.asset.plist);
        cc.log("DIT CON ME");
        let frame = cc.spriteFrameCache.getSpriteFrame("tower_ice_gun_bullet_0000.png");
        let animFrame = new cc.AnimationFrame(frame,1);
        let animFrames = [];
        animFrames.push(animFrame);
        let animation = new cc.Animation(animFrames,0.05);
        cc.animationCache.addAnimation(animation,this.getAnimName());
    },

    runEffectOnCollision: function () {
        let effect = new sp.SkeletonAnimation(
            TowerConfigRender.FX.ICE.json,TowerConfigRender.FX.ICE.atlas);
        effect.setAnimation(0,"attack_1",false);
        effect.setPosition(this.getPosition());
        cc.director.getRunningScene().getObjectLayer().addChild(effect,100);
    }

})