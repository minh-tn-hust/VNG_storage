let ObjectLayer = cc.Layer.extend({
    _myField : {
        _monsterSprites : null,
        _towerSprites : null,
    },
    _enemyField : {
        _monsterSprites : null,
        _towerSprites : null,
    },

    getMonsterSprites : function(who) {
        if (who === BattleUtil.Who.Mine) {
            return this._myField._monsterSprites
        } else {
            return this._enemyField._monsterSprites
        }
    },

    /**
     * @param {Monster} monster
     * @param {BattleUtil.Who.Enemy | BattleUtil.Who.Mine} who
     */
    addMonsterSprite : function(monster, who) {
        if (who === BattleUtil.Who.Mine) {
            this._myField._monsterSprites.push(monster)
        } else {
            this._enemyField._monsterSprites.push(monster)
        }
        this.addChild(monster, 0, ObjectLayer.MONSTER_TAG)
    },

    resetMonsterSprites : function (who) {
        if (who === BattleUtil.Who.Mine) {
            this._myField._monsterSprites = []
        } else {
            this._enemyField._monsterSprites = []
        }
    },

    removeMonsterSprites : function(who) {
        let monsterSprites = this.getMonsterSprites(who)
        for (let i = 0; i < monsterSprites.length; i++) {
            this.removeChild(monsterSprites[i])
        }
        this.resetMonsterSprites(who)
    },

    /**
     *
     * @param {Tower} tower
     * @param {BattleUtil.Who.Enemy | BattleUtil.Who.Mine} who
     */
    addTowerSprite : function(tower, who){
    },

    removeMonsterSprite : function(monsterSprite) {
        let monsterSpriteList = this.getMonsterSprites(monsterSprite.getWho())
        for (let i = 0; i < monsterSpriteList.length; i++) {
            if (monsterSpriteList[i]._id === monsterSprite._id) {
                monsterSpriteList.splice(i, 1)
                break
            }
        }
        this.removeChild(monsterSprite, true)
    },



    ctor : function() {
        this._super()
        this.initSpritePool()
        this.scheduleUpdate()
    },

    initSpritePool : function() {
        this._myField._monsterSprites = []
        this._myField._towerSprites = []
        this._enemyField._monsterSprites = []
        this._enemyField._towerSprites = []
    },

    /**
     * Sử dụng để cập nhật lại zOrder của quái và trụ, đối với trụ sẽ cố định zOrder và thực hiện thay đổi
     * đối với từng con quái để có thể đạt được hiệu ứng hình ảnh
     */
    update : function(dt) {
        this.updateMyField()
        this.updateEnemyField()
    },

    // Cập nhật lại trạng thái zOrder trên sân mình
    updateMyField : function() {

    },

    // Cập nhật lại trạng thái zOrder trên sân đối phương
    updateEnemyField : function() {

    },

})

ObjectLayer.MONSTER_TAG = 18928381