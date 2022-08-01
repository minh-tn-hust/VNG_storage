var BoomerangBulletSprite = LockCellBulletSprite.extend({
    ctor: function (who) {
        this.setAsset(BulletConfigRender.BOOMERANG_BULLET);
        this.setAnimName("BoomerangBullet")
        this._super(who);
    },

    createAnimationCache: function (){
        var assetConfig = this.getAsset();
        cc.log("assetConfig: ",JSON.stringify(assetConfig));
        cc.spriteFrameCache.addSpriteFrames(assetConfig.asset.plist);
        cc.log("DIT CON ME");
        var frame;// = cc.spriteFrameCache.getSpriteFrame("tower_oil_gun_bullet_0000.png");
        var animFrame;// = new cc.AnimationFrame(frame,1);
        var animFrames = [];
        // animFrames.push(animFrame);
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