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

    setAsset : function(asset) {
        this._assetConfig = asset
    },

    getAsset : function() {
        return this._assetConfig
    },

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
    setStepSize: function (speed) {
        this.stepSize = speed*BattleUtil.cellWidth;
    },

    getStepSize: function () {
        return this.stepSize;
    },

    setAnimName: function (animName) {
        this.animName = animName;
    },

    getAnimName : function () {
        return this.animName;
    },

    setWho: function (who) {
        this.who = who;
    },

    getWho: function () {
        return this.who;
    },

    ctor: function (who) {
        this._super();
        this.setSpeed(5);
        this.setWho(who);
        this.createAnimationCache();
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
        // cc.log("curPos: ",JSON.stringify(curPos));
        var targetPos = this.getTargetPosition();
        var distance = Util.distance(curPos,targetPos);
        // cc.log("distance: ",distance);
        // cc.log("StepSize: ",this.getStepSize());
        // cc.log("StepSize: ",this.getStepSize()*dt);
        if (distance<this.getStepSize()*dt){
            this.setPosition(this.getTargetPosition());
            this.onCollision();
            // this.unscheduleUpdate();
        } else {
            var factor = this.getStepSize() * dt /distance;
            var delta = (targetPos.x - curPos.x) * factor; // change of x
            // cc.log("deltaX: ",delta);
            curPos.x = curPos.x+ delta;
            delta = (targetPos.y - curPos.y) * factor; // change of y
            // cc.log("deltaY: ",delta);
            curPos.y = curPos.y + delta;
            // cc.log("PosMon: ",JSON.stringify(targetPos));
            // cc.log("PosBullet: ",JSON.stringify(curPos));
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

    },

    runAnim : function () {},

    createAnimationCache: function (){}
})