var BoomerangBulletSprite = LockCellBulletSprite.extend({
    ctor: function (bullet) {
        this.setAsset(BulletConfigRender.BOOMERANG_BULLET);
        this.setAnimName("BoomerangBullet")
        this._super(bullet);
    },

    createAnimationCache: function (){
        var assetConfig = this.getAsset();
        cc.spriteFrameCache.addSpriteFrames(assetConfig.asset.plist);
        var frame;
        var animFrame;
        var animFrames = [];
        for (var i=0;i<assetConfig.picPerAnim;++i){
            cc.log("Pushing pic: ", assetConfig.prefix+"1_000"+i+".png");
            frame = cc.spriteFrameCache.getSpriteFrame(
                assetConfig.prefix+"1_000"+i+".png");
            animFrame = new cc.AnimationFrame(frame,1);
            animFrames.push(animFrame)
        }
        var animation = new cc.Animation(animFrames,0.05);
        cc.animationCache.addAnimation(animation,this.getAnimName());
    },

})