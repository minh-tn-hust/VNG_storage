let Effect = cc.Class.extend({
    _duration : null,
    _config : null,
    _type : null,
    // GETTER
    getDuration : function() { return this._duration},
    getConfig : function() {return this._config},
    getType : function() {return this._type},

    // SETTER
    setDuration : function(duration) {this._duration = duration},
    setConfig : function(config) {this._config = JSON.parse(JSON.stringify(config))},
    setType : function(type) {this._type = type},

    ctor : function(duration, config) {
        this.setDuration(duration)
        this.setConfig(config)
    },
    effecting : function(target) {
        let duration = this.getDuration()
        if (duration === -1) {
            this.remove()
        } else {
            this.targetEffect(target)
        }
        this.setDuration(duration - 1)
    },

    // Các hiệu ứng bắt buộc phải Override lại hàm này
    targetEffect : function(target) {},

    // Các hiệu ứng lên quái buộc phải Override lại hàm này
    remove : function() {},

    // Các hiệu ứng lên quái buộc phải Override lại hàm này
    removeAnimation : function() {},

    // Các hiệu ứng lên quái buộc phải Override lại hàm này
    initAnimation : function(target) {},

})

let MonsterHeal = Effect.extend({
    // Các hiệu ứng bắt buộc phải Override lại hàm này
    healingCounter : null,
    animation : null,
    /**
     * @param {number} duration
     * @param {DefaultEffectConfig.HEAL} config
     */
    ctor : function(duration, config) {
        this._super(duration, config)
        this.healingCounter = config.delay
        this.setType(Effect.Type.HEALING)
    },

    /**
     * @param {Monster} target
     */
    targetEffect : function(target) {
        if (this.healingCounter !== 0) {
            this.healingCounter--
        } else {
            let config = this.getConfig()
            // thực hiện hiệu ứng
            target.changeHP(- config.value);
            this.healingCounter = config.delay
        }
    },

    // Các hiệu ứng lên quái buộc phải Override lại hàm này
    remove : function() {
        this.removeAnimation()
    },

    // Các hàm dành riêng cho UserInterface ================================================================
    // Các hiệu ứng lên quái buộc phải Override lại hàm này
    removeAnimation : function() {
        this.animation.removeFromParent(true)
    },

    // Các hiệu ứng lên quái buộc phải Override lại hàm này
    /** @param {MonsterSprite} target */
    initAnimation : function(target) {
        let contentSize = target.getContentSize()
        let config = this.getConfig()
        if (config.animation) {
            let healingAnimation = new sp.SkeletonAnimation(config.animation.json, config.animation.atlas)
            healingAnimation.setAnimation(0, config.animation.name, true)
            this.animation = healingAnimation
            healingAnimation.setPosition(cc.p(contentSize.width / 2, contentSize.height / 2))
            target.addChild(healingAnimation)
        }
    },
})

let MonsterSpeed = Effect.extend({
    _target : null,
    /**
     * @param {number} duration
     * @param {DefaultEffectConfig.HEAL} config
     */
    ctor : function(duration, config) {
        this._super(duration, config)
        this.setType(Effect.Type.SPEED)
        cc.log("SPEED ADDED")
    },

    // Các hiệu ứng bắt buộc phải Override lại hàm này
    /** @param {Monster} target */
    targetEffect : function(target) {
        if (!this.target || target.getSpeed() === target.getMaxSpeed()) {
            this.target = target
            let config = this.getConfig()
            target.setSpeed(config.value * target.getSpeed())
            target._needUpdateAnimation = true
        }
    },

    // Các hiệu ứng lên quái buộc phải Override lại hàm này
    remove : function() {
        this.target.setSpeed(this.target.getMaxSpeed())
        this.target._needUpdateAnimation = true
    },
})

let MonsterStun = MonsterSpeed.extend({
    _target : null,
    /**
     * @param {number} duration
     * @param {DefaultEffectConfig.HEAL} config
     */
    ctor : function(duration, config) {
        this._super(duration, config)
        this.setType(Effect.Type.STUN)
        cc.log("STUN ADDED")
    },

    // Các hiệu ứng lên quái buộc phải Override lại hàm này
    remove : function() {
        this.target.setSpeed(this.target.getMaxSpeed())
        this.target._needUpdateAnimation = true
        this.animation.removeFromParent(true)
    },
    initAnimation : function(target) {
        let contentSize = target.getContentSize()
        let config = this.getConfig()
        if (config.animation) {
            let healingAnimation = new sp.SkeletonAnimation(config.animation.json, config.animation.atlas)
            healingAnimation.setAnimation(0, config.animation.name, true)
            this.animation = healingAnimation
            healingAnimation.setScale(0.5)
            healingAnimation.setPosition(cc.p(contentSize.width / 2, contentSize.height / 2 + 25))
            target.addChild(healingAnimation)
        }
    },

})

let MonsterFreeze = MonsterSpeed.extend({
    _target : null,
    /**
     * @param {number} duration
     * @param {DefaultEffectConfig.HEAL} config
     */
    ctor : function(duration, config) {
        this._super(duration, config)
        this.setType(Effect.Type.FREEZE)
        cc.log("FREEZE ADDED")
    },

    // Các hiệu ứng lên quái buộc phải Override lại hàm này
    remove : function() {
        this.target.setSpeed(this.target.getMaxSpeed())
        this.target._needUpdateAnimation = true
        this.animation.removeFromParent(true)
    },
    initAnimation : function(sprite) {
        if (!this.animation) {
            let stencil = new cc.DrawNode();
            stencil.drawPoly([
                cc.p(3*10,0),
                cc.p(3*3.09, 3*9.51),
                cc.p(3*-8.09, 3*5.88),
                cc.p(3*-8.09, 3*-5.88),
                cc.p(3*3.09, 3*-9.51)
            ], cc.color.GREEN, 3 , cc.color.GREEN)
            stencil.setRotation(-90)
            let content = new cc.Sprite("res/effect_freeze.png")

            let clipping = new cc.ClippingNode
            clipping.stencil = stencil
            clipping.addChild(content)

            let contentSize = sprite.getContentSize()
            clipping.setPosition(contentSize.width / 2, contentSize.height / 2 + 15)
            clipping.setOpacity(200)
            clipping.setCascadeOpacityEnabled(true)
            sprite.addChild(clipping)
            this.animation = clipping
        }
    },
})



Effect.Type = {
    HEALING : 1,
    SPEED: 2,
    STUN: 3,
    FREEZE : 4,
}