var Bullet = cc.Class.extend({
    /**
     *
     * @param {number}id
     */
    setID: function (id) {this.id=id;},
    getID: function () {return this.id;},
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
    setPosition: function (position) {
        this.position = position;
        // cc.log("Init pos at bullet model");
        // cc.log("Pos: ",JSON.stringify(position));
        // cc.log("Screen Pos: ",JSON.stringify(BattleUtil.fromModelPositionToPosition(position,this.getWho())));
        this.setScreenPosition(
            BattleUtil.fromModelPositionToPosition(position,this.getWho())
        );
        // cc.log("Double Check: ",JSON.stringify(this.getScreenPosition()));
    },
    getPosition: function () {return this.position;},
    
    setScreenPosition: function (position) {this.screenPosition = position;},
    getScreenPosition: function () {return this.screenPosition;},

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
    setStepSize: function (speed) {this.stepSize= speed*BattleConfig.Map.cellWidth;},
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

    /**
     * whether this bullet has hit its target
     * @param {boolean} isHit
     */
    setIsHit: function (isHit) {this.isHit= isHit;},
    getIsHit: function () {return this.isHit;},

    // TODO: ctor of bullet
    ctor: function (target,tower,id) {
        this.setTarget(target);
        this.setWho(tower.getWho());
        this.setID(id);
        this.setPosition(JSON.parse(JSON.stringify(tower.getPosition())));
        this.setDamage(tower.getDamage());
        this.setSpeed(tower.getBulletSpeed());
        this.setRadius(tower.getBulletRadius());
    },

    /**
     * this is lock target implementation
     * @param currentTick
     */
    update: function (currentTick) {
        var curPos = this.getPosition();
        // cc.log("curPos: ",JSON.stringify(curPos));
        var targetPos = this.getTargetPosition();
        var distance = Util.distance(curPos,targetPos);
        // cc.log("distance: ",distance);
        // cc.log("StepSize: ",this.getStepSize());
        // cc.log("StepSize: ",this.getStepSize()*dt);
        // TODO dt -> currentTick ?
        if (distance<this.getStepSize()*BattleConfig.TICK_DURATION){
            // cc.log("Distance: ",distance);
            // cc.log("step at tick duration: ",this.getStepSize()*BattleConfig.TICK_DURATION)
            this.setPosition(this.getTargetPosition());
            // this.unscheduleUpdate();
            this.setIsHit(true);
        } else {
            // cc.log("Distance: ",distance);
            // cc.log("Step Size: ",this.getStepSize());
            var factor = this.getStepSize() * BattleConfig.TICK_DURATION /distance;
            // cc.log("factor: ",factor);
            var delta = (targetPos.x - curPos.x) * factor; // change of x
            // cc.log("delta: ",delta)
            // cc.log("deltaX: ",delta);
            curPos.x = curPos.x+ delta;
            delta = (targetPos.y - curPos.y) * factor; // change of y
            // cc.log("deltaY: ",delta);
            curPos.y = curPos.y + delta;
            // cc.log("x: ",curPos.x);
            // cc.log("y: ",curPos.y);
            // cc.log("PosMon: ",JSON.stringify(targetPos));
            // cc.log("PosBullet: ",JSON.stringify(curPos));
            this.setPosition(curPos);
        }
    }
})