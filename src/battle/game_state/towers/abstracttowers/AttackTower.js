let AttackTower = Tower.extend({
    ID_RANGE: 1000,
    count : null,
    bulletPool : null,
    damage : null,
    speed : null,
    minTickBetweenFire : null,
    bulletSpeed : null,
    bulletRadius : null,
    targetMode : null,
    lastFireTick : null,
    // SETTER
    /**
     * count bullet
     * use to id bullet
     * @param count
     */
    setCount: function (count) {this.count = count;},
    setBulletPool: function () {this.bulletPool = [];},
    /** @param {number} damage */
    setDamage: function (damage) {this.damage = damage;},
    /** @param {number} speed */
    setSpeed: function (speed) {
        this.speed = speed;
        this.setMinTickBetweenFire(speed/BattleConfig.TICK_DURATION);
    },
    setMinTickBetweenFire: function (minTickBetweenFire) {this.minTickBetweenFire = minTickBetweenFire;},
    /** @param {number} bulletRadius */
    setBulletRadius: function (bulletRadius) {this.bulletRadius = bulletRadius;},
    /** @param {number} bulletSpeed */
    setBulletSpeed: function (bulletSpeed) {this.bulletSpeed = bulletSpeed;},
    setBasicStat: function (level) {
        let stat = TowerConfig.getTowerInfo(this.getID());
        this.setDamage(CardUtil.upgradeFactorToLevel(
            stat[level]["damage"], this.getLevel(),CardUtil.upgradeDamagePercent
        ));
        this.setSpeed(stat[level]["attackSpeed"]/Tower.SPEED_UNIT);
        this.setRange(stat[level]["range"]);
        this.setBulletRadius(stat[level]["bulletRadius"]);
        this.setBulletSpeed(stat[level]["bulletSpeed"]/10);
    },
    /**
     * @param {TowerUtil.TARGET_MODE.NEAREST,
     * TowerUtil.TARGET_MODE.FARTHEST,
     * TowerUtil.TARGET_MODE.LOWEST_BLOOD,
     * TowerUtil.TARGET_MODE.HIGHEST_BLOOD} targetMode
     */
    setTargetMode: function (targetMode) {this.targetMode = targetMode;},
    /**
     * the last tick that this tower fired
     * @param {number} lastFireTick
     */
    setLastFireTick: function (lastFireTick) {this.lastFireTick = lastFireTick;},

    // GETTER
    getCount: function () {return this.count;},
    getBulletPool: function () {return this.bulletPool;},
    getDamage: function () {return this.damage;},
    getSpeed: function () {return this.speed;},
    getMinTickBetweenFire: function () {return this.minTickBetweenFire;},
    getBulletRadius: function () {return this.bulletRadius;},
    getBulletSpeed: function () {return this.bulletSpeed;},
    getTargetMode: function () {return this.targetMode;},
    getLastFireTick: function () {return this.lastFireTick;},

    hasWaitEnoughToFire: function (currentTick) {
        return currentTick - this.getLastFireTick() >= this.getMinTickBetweenFire();
    },

    createBullet: function (target,id) {},
    createBulletUI: function (bullet) {},

    calIDForBullet: function (count) {
        let id = this.getMatrixPosition().x*10+this.getMatrixPosition().y;
        id *= this.ID_RANGE;
        id += this.getCount();
        return id;
    },

    ctor: function (who,matrixPosition,isCloned) {
        this.setBulletPool();
        this.setTargetMode(TowerUtil.TARGET_MODE.NEAREST);
        this.setLastFireTick(-20);
        this._super(who,matrixPosition,isCloned);
    },

    fire: function (currentTick) {
        let target = this.getTarget();
        if (target !== null && target.getCanTarget()) {
            let bullet = this.createBullet(target);
            // cc.log("After bullet")
            bullet.setTarget(target);
            this.getBulletPool().push(bullet);
            this.setLastFireTick(currentTick);
            if (this.getIsCloned() !== true) {
                // TODO add bullet sprite to bullet pool
                let bulletDisplay = this.createBulletUI(bullet);
                let battleScene = cc.director.getRunningScene();
                battleScene.getObjectLayer().addBulletSprite(bulletDisplay, this.getWho());
            }
        }
    },

    update: function (currentTick) {
        if (this.hasWaitEnoughToFire(currentTick)) {
            this.fire(currentTick);
        }
        // this.fire(currentTick);
        let bulletPool = this.getBulletPool();
        for (let i=0;i<this.getBulletPool().length;++i){
            if (!bulletPool[i].getIsHit()){
                bulletPool[i].update(currentTick);
            } else {
                bulletPool.splice(i,1);
            }
        }
        let monster = this.getTarget();
        if(monster!==null){
            if (Util.distance(monster.getPosition(),this.getPosition())
                > this.getRangeSize()
                || !monster.getCanTarget()){
                this.setTarget(null);
            }
        }
    }
})