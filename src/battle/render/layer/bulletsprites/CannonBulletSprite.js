var CannonBulletSprite = LockMonsterBulletSprite.extend({
    ctor: function (bullet) {
        this.setAsset(BulletConfigRender.CANNON_BULLET);
        this.setAnimName("CannonBullet")
        this._super(bullet);
    },

    createAnimationCache: function (){
        var assetConfig = this.getAsset();
        cc.log("assetConfig: ",JSON.stringify(assetConfig));
        cc.spriteFrameCache.addSpriteFrames(assetConfig.asset.plist);
        cc.log("DIT CON ME");
        var frame = cc.spriteFrameCache.getSpriteFrame("tower_cannon_bullet_0000.png");
        var animFrame = new cc.AnimationFrame(frame,1);
        var animFrames = [];
        animFrames.push(animFrame);
        var animation = new cc.Animation(animFrames,0.05);
        cc.animationCache.addAnimation(animation,this.getAnimName());
    },

    // runAnim: function () {
    //     this.stopAllActions();
    //     cc.log("Check Anim: ",cc.animationCache.getAnimation(this.getAnimName()));
    //     this.runAction(cc.repeatForever(cc.animate(
    //         cc.animationCache.getAnimation(this.getAnimName())
    //     )));
    // }
})