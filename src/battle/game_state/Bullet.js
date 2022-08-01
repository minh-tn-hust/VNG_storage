var Bullet = cc.Class.extend({
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

    /**
     * position in pixel
     * @param {cc.Point}position
     */
    setPosition: function (position) {this.position = position},
    getPosition: function () {return this.position;},

    /**
     *
     * @param {BattleUtil.Who.Mine,BattleUtil.Who.Enemy}who
     */
    setWho: function (who) {this.who=who;},
    getWho: function(){return this.who;},

    /**
     *
     * @param {number}radius
     */
    setRadius: function (radius) {this.radius = radius;},
    getRadius: function () {return this.radius;},

    /**
     *
     * @param {number}damage
     */
    setDamage: function (damage) {this.damage=damage;},
    getDamage: function () {return this.damage;},

    /**
     *
     * @param {number}speed
     * unit: cell/second
     */
    setSpeed: function (speed) {
        this.speed= speed;
        this.setStepSize(speed);
    },
    getSpeed: function () {return this.speed;},

    /**
     * stepSize is speed with pixel/second unit
     * @param {number}speed
     */
    setStepSize: function (speed) {this.stepSize= speed*BattleUtil.cellWidth;},
    getStepSize: function () {return this.stepSize;},

    /**
     *
     * @param {Monster}monster
     * @param dt
     */
    fire: function (monster,dt) {
        this.setTarget(monster);
        this.update(dt);
    },

    // TODO: ctor of bullet
    ctor: function () {

    },

    /**
     * this is lock target implementation
     * @param dt
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
    }
})