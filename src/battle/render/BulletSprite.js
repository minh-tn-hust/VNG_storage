var BulletSprite = cc.Sprite.extend({
    /**
     *
     * @param {Monster}monster
     */
    setTarget: function (monster) {
        this.monster = monster;
        this.setTargetPosition(monster)
    },
    getTarget: function () {return this.monster;},

    /**
     *
     * @param {Monster}target
     */
    setTargetPosition: function (target) {},
    getTargetPosition: function () {},

    setAsset : function(asset) {this._assetConfig = asset},
    getAsset : function() {return this._assetConfig},

    /**
     * get speed of bullet, unit: cell/second
     * @returns {number}
     */
    getSpeed: function () {
        return this.speed;
    },

    /**
     * set speed for bullet, unit: cell/second
     * @param {number}speed
     */
    setSpeed: function (speed) {
        this.speed = speed;
        this.setStepSize(speed);
    },

    /**
     * step size = speed in pixel
     * unit: pixel/second
     * @param {number} speed
     */
    setStepSize: function (speed) {this.stepSize = speed * BattleConfig.Map.cellWidth;},
    getStepSize: function () {return this.stepSize;},

    setAnimName: function (animName) {this.animName = animName;},
    getAnimName : function () {return this.animName;},

    setWho: function (who) {this.who = who;},
    getWho: function () {return this.who;},

    setBullet: function (bullet) {this.bullet = bullet;},
    getBullet: function () {return this.bullet},

    setModelTickPosition: function (modelTickPosition) {this.modelTickPosition = modelTickPosition;},
    getModelTickPosition: function () {return this.modelTickPosition;},

    ctor: function (bullet) {
        this._super();
        this.setSpeed(bullet.getSpeed());

        this.setBullet(bullet);
        this.setWho(bullet.getWho());
        this.setTarget(bullet.getTarget());
        this.setModelTickPosition(JSON.parse(JSON.stringify(bullet.getScreenPosition())));
        this.setPosition(JSON.parse(JSON.stringify(bullet.getScreenPosition())));
        this.createAnimationCache();
        this.runAnim();
        this.scheduleUpdate();
    },

    onFire: function () {
        this.runAnim();
        this.scheduleUpdate();
    },

    /**
     * update position
     */
    update: function (dt) {
        var curPos = this.getPosition();
        var targetPos = this.getTargetPosition();
        var distance = Util.distance(curPos, targetPos);
        if (this.getBullet().getIsHit()){
            this.setPosition(this.getTargetPosition());
            this.onCollision();
        }
        if (distance < this.getStepSize() * dt) {
            this.setPosition(this.getTargetPosition());
        } else {
            var factor = this.getStepSize() * dt / distance;
            var delta = (targetPos.x - curPos.x) * factor; // change of x
            curPos.x = curPos.x + delta;
            delta = (targetPos.y - curPos.y) * factor; // change of y
            curPos.y = curPos.y + delta;
            this.setPosition(curPos);
        }
    },

    /**
     * animation when the bullet is flying
     */
    initAnimation: function () {

    },

    /**
     * method called when bullet and target collide
     */
    onCollision: function () {
        this.unscheduleUpdate();
        this.runEffectOnCollision();
        // TODO remove from bullet pool in object layer
        // this.runAction(cc.sequence(
        //     cc.delayTime(2),
        //     cc.callFunc(function () {
        //         cc.log("Now remove");
        //         cc.director.getRunningScene().
        //         getObjectLayer().removeBulletSprite(this);
        //     }.bind(this))
        // ))
        cc.director.getRunningScene().getObjectLayer().removeBulletSprite(this)
    },

    runEffectOnCollision: function () {

    },

    runAnim : function () {},

    createAnimationCache: function (){}
})