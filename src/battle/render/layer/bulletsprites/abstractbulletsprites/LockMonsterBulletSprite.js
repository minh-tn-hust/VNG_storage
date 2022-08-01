var LockMonsterBulletSprite = BulletSprite.extend({
    getTargetPosition: function () {
        return this.getTarget().getPosition();
    },

    ctor: function (who) {
        this._super(who);
    },

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

    runAnim: function () {
        this.stopAllActions();
        cc.log("Check Anim: ",cc.animationCache.getAnimation(this.getAnimName()));
        this.runAction(cc.repeatForever(cc.animate(
            cc.animationCache.getAnimation(this.getAnimName())
        )));
    }
})