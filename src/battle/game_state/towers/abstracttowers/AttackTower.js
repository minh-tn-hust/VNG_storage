var AttackTower = Tower.extend({/**
     *
     * @param {number} damage
     */
    setDamage: function (damage) {this.damage = damage;},
    getDamage: function () {return this.damage;},

    /**
     *
     * @param {number} speed
     */
    setSpeed: function (speed) {this.speed = speed},
    getSpeed: function () {return this.speed;},

    /**
     *
     * @param {number} bulletRadius
     */
    setBulletRadius: function (bulletRadius) {this.bulletRadius = bulletRadius;},
    getBulletRadius: function () {return this.bulletRadius;},

    /**
     *
     * @param {number} bulletSpeed
     */
    setBulletSpeed: function (bulletSpeed) {this.bulletSpeed = bulletSpeed;},
    getBulletSpeed: function () {return this.bulletSpeed;},

    setBasicStat: function (level) {
        var stat = TowerConfig.TowerInfo[this.getID()];
        this.setDamage(CardUtil.upgradeFactorToLevel(
            stat[level]["damage"], this.getLevel(),CardUtil.upgradeDamagePercent
        ));
        this.setSpeed(stat[level]["attackSpeed"]/Tower.SPEED_UNIT);
        this.setRange(stat[level]["range"]);
        this.setBulletRadius(stat[level]["bulletRadius"]);
        this.setBulletSpeed(stat[level]["bulletSpeed"]);
    },

    /**
     *
     * @param {TowerUtil.TARGET_MODE.NEAREST,
     * TowerUtil.TARGET_MODE.FARTHEST,
     * TowerUtil.TARGET_MODE.LOWEST_BLOOD,
     * TowerUtil.TARGET_MODE.HIGHEST_BLOOD} targetMode
     */
    setTargetMode: function (targetMode) {this.targetMode = targetMode;},
    getTargetMode: function () {return this.targetMode;}
})