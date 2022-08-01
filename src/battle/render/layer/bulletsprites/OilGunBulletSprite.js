var OilGunBulletSprite = LockCellBulletSprite.extend({
    ctor: function (who) {
        this.setAsset(BulletConfigRender.OIL_GUN_BULLET);
        this.setAnimName("OilGunBullet")
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
            frame = cc.spriteFrameCache.getSpriteFrame(
                assetConfig.prefix+i+".png");
            animFrame = new cc.AnimationFrame(frame,1);
            animFrames.push(animFrame)
        }
        var animation = new cc.Animation(animFrames,0.05);
        cc.animationCache.addAnimation(animation,this.getAnimName());
    },


})