let Tower = cc.Class.extend({
    _matrixPosition : null,
    _position : null,
    _screenPosition : null,
    _who : null,
    _id :  null,
    _level : null,
    _maxEvoLevel : null,
    _range : null,
    _rangeSize : null,
    _target : null,
    _basicStat : null,
    _isClone : null,
    _count : null,
    /** @param {cc.Point} matrixPosition */
    setMatrixPosition: function (matrixPosition) {
        this._matrixPosition = matrixPosition;
        this.setPosition(
            BattleUtil.fromMatrixToModelPosition(matrixPosition,this.getWho())
        );
        this.setScreenPosition(
            BattleUtil.fromMaxtrixToPosition(matrixPosition,this.getWho())
        );
    },
    /** @param {cc.Point}position */
    setPosition: function (position) {this._position = position},
    /** @param {cc.Point}position */
    setScreenPosition: function (position) {this._screenPosition = position;},
    /** @param {BattleUtil.Who.Mine,BattleUtil.Who.Enemy} who */
    setWho: function (who) {this._who = who;},
    setID: function () {this._id = 1;},
    setLevel: function (level) {this._level = level;},
    setMaxEvoLevel: function () {
        // this._maxEvoLevel = TowerUtil.MAX_EVOL_LEVEL[UserInfo.getInstance().getCardByID(this.getID()).getLetterRank()];
        this._maxEvoLevel = 3
    },
    /** @param {number} range */
    setRange: function (range) {
        this._range = range;
        this.setRangeSize(range);
    },
    /** @param {number} range */
    setRangeSize: function (range) {this._rangeSize = range * BattleConfig.Map.cellWidth;},
    /** @param {Monster,Tower,[]}target */
    setTarget: function (target) {this._target = target;},
    /** @param {number}level */
    setBasicStat: function(level){},
    /** @param level */
    setSpecialStat: function (level){},
    /** @param {boolean} isCloned */
    setIsCloned: function (isCloned) {this._isCloned = isCloned;},
    setCount: function (count) {this.count = count;},

    // GETTER
    getMatrixPosition: function () {return this._matrixPosition;},
    getPosition: function () {return this._position;},
    getScreenPosition: function () {return this._screenPosition;},
    getWho: function(){return this._who;},
    getID: function () {return this._id;},
    /** @return {number} level (1-3) */
    getLevel: function () {return this._level;},
    getMaxEvoLevel: function () {
        return this._maxEvoLevel;
    },
    getRange: function () {return this._range;},
    getRangeSize: function () {return this._rangeSize;},
    getTarget: function () {return this._target;},
    getIsCloned : function () {return this._isCloned;},

    /**
     * @param {BattleUtil.Who.Enemy, BattleUtil.Who.Mine} who
     * @param {cc.Point} matrixPosition
     * @param {boolean} isCloned
     */
    ctor: function (who, matrixPosition, isCloned) {
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
        if (this.getLevel() <= this.getMaxEvoLevel()){
            this.setLevel(this.getLevel() + 1);
            this.setBasicStat(this.getLevel());
            this.setSpecialStat(this.getLevel());
            if (this.getIsCloned() !== false){

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