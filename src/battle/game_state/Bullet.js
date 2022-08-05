let Bullet = cc.Class.extend({
    /** @param {number}id */
    setID: function (id) {this.id=id;},
    /** @param {Monster}monster */
    setTarget: function (monster) {
        this.monster = monster;
        this.setTargetPosition(monster)
    },
    /** @param {Monster}target */
    setTargetPosition: function (target) {},
    /** @param {cc.Point}position */
    setPosition: function (position) {
        this.position = position;
        this.setScreenPosition(
            BattleUtil.fromModelPositionToPosition(position,this.getWho())
        );
    },
    setScreenPosition: function (position) {this.screenPosition = position;},
    /** @param {BattleUtil.Who.Mine,BattleUtil.Who.Enemy}who */
    setWho: function (who) {this.who=who;},
    /** @param {number}radius */
    setRadius: function (radius) {this.radius = radius;},
    /** @param {number} speed */
    setSpeed: function (speed) {
        this.speed= speed;
        this.setStepSize(speed);
    },
    /** @param {number}damage */
    setDamage: function (damage) {this.damage=damage;},
    /** @param {number}speed */
    setStepSize: function (speed) {this.stepSize= speed*BattleConfig.Map.cellWidth;},
    /** @param {boolean} isHit */
    setIsHit: function (isHit) {this.isHit= isHit;},

    // GETTER
    getID: function () {return this.id;},
    getTarget: function () {return this.monster;},
    getTargetPosition: function () {},
    getPosition: function () {return this.position;},
    getScreenPosition: function () {return this.screenPosition;},
    getWho: function(){return this.who;},
    getRadius: function () {return this.radius;},
    getDamage: function () {return this.damage;},
    getSpeed: function () {return this.speed;},
    getStepSize: function () {return this.stepSize;},
    getIsHit: function () {return this.isHit;},

    /**
     * @param {Monster} monster
     * @param {number} dt
     */
    fire: function (monster,dt) {
        this.setTarget(monster);
        this.update(dt);
    },


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
        let curPos = this.getPosition();
        let targetPos = this.getTargetPosition();
        let distance = Util.distance(curPos,targetPos);
        // TODO dt -> currentTick ?
        if (distance < this.getStepSize() * BattleConfig.TICK_DURATION){
            this.setPosition(this.getTargetPosition());
            this.setIsHit(true);
            this.getTarget().changeHP(this.getDamage())
        } else {
            let factor = this.getStepSize() * BattleConfig.TICK_DURATION /distance;
            let delta = (targetPos.x - curPos.x) * factor; // change of x
            curPos.x = curPos.x+ delta;
            delta = (targetPos.y - curPos.y) * factor; // change of y
            curPos.y = curPos.y + delta;
            this.setPosition(curPos);
        }
    }
})