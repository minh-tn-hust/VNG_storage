var OilGunBulletSprite = LockCellBulletSprite.extend({
    ctor: function (bullet) {
        this.setAsset(BulletConfigRender.OIL_GUN_BULLET);
        this.setAnimName("OilGunBullet")
        this._super(bullet);
    },

    createAnimationCache: function (){
        var assetConfig = this.getAsset();
        cc.spriteFrameCache.addSpriteFrames(assetConfig.asset.plist);
        var frame;// = cc.spriteFrameCache.getSpriteFrame("tower_oil_gun_bullet_0000.png");
        var animFrame;// = new cc.AnimationFrame(frame,1);
        var animFrames = [];
        // animFrames.push(animFrame);
        for (var i=0;i<assetConfig.picPerAnim;++i){
            frame = cc.spriteFrameCache.getSpriteFrame(
                assetConfig.prefix+i+".png");
            animFrame = new cc.AnimationFrame(frame,1);
            animFrames.push(animFrame)
        }
        var animation = new cc.Animation(animFrames,0.05);
        cc.animationCache.addAnimation(animation,this.getAnimName());
    },

    runEffectOnCollision: function () {
        let effect = new sp.SkeletonAnimation(
            TowerConfigRender.FX.Oil.json,TowerConfigRender.FX.Oil.atlas);
        effect.setAnimation(0,"hit_target_eff",false);
        effect.setPosition(this.getPosition());
        cc.director.getRunningScene().getObjectLayer().addChild(effect,100);
    }

})