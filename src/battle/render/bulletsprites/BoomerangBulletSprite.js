var BoomerangBulletSprite = LockCellBulletSprite.extend({
    setLevel: function (level){
        this._level = level;
    },
    getLevel: function (){
        return this._level;
    },

    ctor: function (bullet,level) {
        this.setAsset(BulletConfigRender.BOOMERANG_BULLET);
        this.setLevel(level);
        this.setAnimName("BoomerangBullet"+this.getLevel());
        this._super(bullet);
    },

    createAnimationCache: function (){
        var assetConfig = this.getAsset();
        cc.spriteFrameCache.addSpriteFrames(assetConfig.asset.plist);
        var frame;
        var animFrame;
        var animFrames = [];
        for (var i=0;i<assetConfig.picPerAnim;++i){
            frame = cc.spriteFrameCache.getSpriteFrame(
                assetConfig.prefix + this.getLevel()+ "_000" + i + ".png");
            animFrame = new cc.AnimationFrame(frame, 1);
            animFrames.push(animFrame)
        }

        var animation = new cc.Animation(animFrames,0.05);
        cc.animationCache.addAnimation(animation,this.getAnimName());
    },

})