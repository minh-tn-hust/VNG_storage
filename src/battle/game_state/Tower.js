var Tower = cc.Class.extend({
    /**
     * logic Position
     * @param {cc.Point}matrixPosition
     */
    setMatrixPosition: function (matrixPosition) {
        this.matrixPosition = matrixPosition;
        this.setPosition(
            BattleUtil.fromMatrixToModelPosition(matrixPosition,this.getWho())
        );
        this.setScreenPosition(
            BattleUtil.fromMaxtrixToPosition(matrixPosition,this.getWho())
        );

    },
    getMatrixPosition: function () {return this.matrixPosition;},

    /**
     * model position (not on screen position)
     * @param {cc.Point}position
     */
    setPosition: function (position) {this.position = position},
    getPosition: function () {return this.position;},

    /**
     * position in pixel
     * @param {cc.Point}position
     */
    setScreenPosition: function (position) {this.screenPosition = position;},
    getScreenPosition: function () {return this.screenPosition;},
    /**
     *
     * @param {BattleUtil.Who.Mine,BattleUtil.Who.Enemy}who
     */
    setWho: function (who) {this.who=who;},
    getWho: function(){return this.who;},

    setID: function () {this.ID=1;},
    getID: function () {return this.ID;},
    /**
     *
     * @param {number} level (1-3)
     */
    setLevel: function (level) {this.level = level;},
    getLevel: function () {return this.level;},

    setMaxEvoLevel: function () {
        this.maxEvoLevel = TowerUtil.MAX_EVOL_LEVEL[
            UserInfo.getInstance().getCardByID(this.getID()).getLetterRank()
            ];
    },

    getMaxEvoLevel: function () {
        return this.maxEvoLevel;
    },

    /**
     *
     * @param {number} range
     * unit : cell
     */
    setRange: function (range) {
        this.range = range;
        this.setRangeSize(range);
    },
    getRange: function () {return this.range;},

    /**
     * rangeSize is range in pixel unit
     * @param {number}range
     */
    setRangeSize: function (range) {this.rangeSize = range*BattleConfig.Map.cellWidth;},
    getRangeSize: function () {return this.rangeSize;},

    /**
     *
     * @param {Monster,Tower,[]}target
     */
    setTarget: function (target) {this.target = target;},
    getTarget: function () {return this.target;},

    /**
     * set stat (damage, range, ...) for tower
     * @param {number}level
     */
    setBasicStat: function(level){},
    /**
     * set special (slow effect, freezing effect,... ) stat
     * @param level
     */
    setSpecialStat: function (level){},

    /**
     *
     * @param {boolean} isCloned
     */
    setIsCloned: function (isCloned) {this.isCloned = isCloned;},
    getIsCloned : function () {return this.isCloned;},

    ctor: function (who,matrixPosition,isCloned) {
        // this._super();
        this.setLevel(1);
        this.setID();
        this.setCount(0);
        this.setMaxEvoLevel();
        this.setWho(who);
        this.setTarget(null);
        this.setMatrixPosition(matrixPosition);
        this.setBasicStat(1);
        this.setSpecialStat(1);
        this.setIsCloned(isCloned);
    },

    canUpgrade: function () {
        return this.getLevel() <= this.getMaxEvoLevel();
    },

    /**
     * upgrade tower
     * @returns {boolean} true if success, false otherwise
     */
    upgrade: function () {
        if (this.getLevel()<=this.getMaxEvoLevel()){
            this.setLevel(this.getLevel()+1);
            this.setBasicStat(this.getLevel());
            this.setSpecialStat(this.getLevel());
            if (this.getIsCloned()!==false){

            }
            return true;
        } else {
            return false;
        }
    },
    
    update: function (currentTick) {}
})

Tower.SPEED_UNIT = 1000;

Tower.createTower = function (cid,who,matrixPosition,isCloned) {
    switch (cid) {
        case 0 :
            return new CannonTower(who,matrixPosition,isCloned);
        case 1:
            return new WizardTower(who,matrixPosition,isCloned);
        case 2:
            return new BoomerangTower(who,matrixPosition,isCloned);
        case 3:
            return new OilGunTower(who,matrixPosition,isCloned);
        case 4:
            return new IceGunTower(who,matrixPosition,isCloned);
        case 5:
        case 6:
            return new AttackSpeedTower(who,matrixPosition,isCloned);
    }
}