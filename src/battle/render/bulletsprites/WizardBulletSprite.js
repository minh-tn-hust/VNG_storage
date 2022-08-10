var WizardBulletSprite = LockCellBulletSprite.extend({
    ctor: function (bullet) {
        this.setAsset(BulletConfigRender.WIZARD_BULLET);
        this.setAnimName("WizardBullet")
        this._super(bullet);
    },

    createAnimationCache: function (){
        var assetConfig = this.getAsset();
        cc.spriteFrameCache.addSpriteFrames(assetConfig.asset.plist);
        var frame = cc.spriteFrameCache.getSpriteFrame("tower_wizard_bullet_0000.png");
        var animFrame = new cc.AnimationFrame(frame,1);
        var animFrames = [];
        animFrames.push(animFrame);
        var animation = new cc.Animation(animFrames,0.05);
        cc.animationCache.addAnimation(animation,this.getAnimName());
    },

    runEffectOnCollision: function () {
        let effect = new sp.SkeletonAnimation(
            TowerConfigRender.FX.Wizard.json,
            TowerConfigRender.FX.Wizard.atlas);
        effect.setAnimation(0,"hit_target_eff",false);
        effect.setPosition(this.getPosition());
        cc.director.getRunningScene().getObjectLayer().addChild(effect,100);
    }

})