let ObjectLayer = cc.Layer.extend({
    _myField : {
        _monsterSprites : null,
        _towerSprites : null,
        _bulletSprites : null,
    },
    _enemyField : {
        _monsterSprites : null,
        _towerSprites : null,
        _bulletSprites: null,
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
        this.addChild(monster, 100, ObjectLayer.MONSTER_TAG)
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
            this.removeChild(monsterSprites[i], true)
        }
        this.resetMonsterSprites(who)
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


    /**
     *
     * @param {Tower} tower
     * @param {BattleUtil.Who.Enemy | BattleUtil.Who.Mine} who
     */
    addTowerSprite : function(tower, who){
        if (who === BattleUtil.Who.Mine) {
            this._myField._towerSprites.push(tower);
        } else {
            this._enemyField._towerSprites.push(tower);
        }
        this.addChild(tower, 99, ObjectLayer.TOWER_TAG)
    },

    getTowerSprites : function(who) {
        if (who === BattleUtil.Who.Mine) {
            return this._myField._towerSprites
        } else {
            return this._enemyField._towerSprites
        }
    },

    addBulletSprite: function (bullet,who){
        this.addChild(bullet);
    },

    resetTowerSprites : function (who) {
        if (who === BattleUtil.Who.Mine) {
            this._myField._towerSprites = []
        } else {
            this._enemyField._towerSprites = []
        }
    },

    removeTowerSprites : function(who) {
        let towerSprites = this.getTowerSprites(who)
        for (let i = 0; i < towerSprites.length; i++) {
            this.removeChild(towerSprites[i])
        }
        this.resetTowerSprites(who)
    },



    removeTowerSprite : function(towerSprite) {
        let towerSpriteList = this.getTowerSprites(towerSprite.getWho())
        for (let i = 0; i < towerSpriteList.length; i++) {
            let matrixPos = towerSpriteList[i].getTower().getMatrixPosition();
            let matrixPosOfTowerSprite = towerSprite.getTower().getMatrixPosition();
            if (matrixPos.x === matrixPosOfTowerSprite.x
                && matrixPos.y ===matrixPosOfTowerSprite.y) {
                towerSpriteList.splice(i, 1);
                break;
            }
        }
        this.removeChild(towerSprite, true);
    },


    addBulletSprite: function (bullet,who){
        if (who === BattleUtil.Who.Mine) {
            this._myField._bulletSprites.push(bullet);
        } else {
            this._enemyField._bulletSprites.push(bullet);
        }
        this.addChild(bullet, 0, ObjectLayer.BULLET_TAG);
    },

    getBulletSprites : function(who) {
        if (who === BattleUtil.Who.Mine) {
            return this._myField._bulletSprites
        } else {
            return this._enemyField._bulletSprites
        }
    },


    resetBulletSprites : function (who) {
        if (who === BattleUtil.Who.Mine) {
            this._myField._bulletSprites = []
        } else {
            this._enemyField._bulletSprites = []
        }
    },

    removeBulletSprites : function(who) {
        let bulletSprites = this.getBulletSprites(who)
        for (let i = 0; i < bulletSprites.length; i++) {
            this.removeChild(bulletSprites[i])
        }
        this.resetBulletSprites(who)
    },

    removeBulletSprite : function(bulletSprite) {
        let bulletSpriteList = this.getBulletSprites(bulletSprite.getWho())
        for (let i = 0; i < bulletSpriteList.length; i++) {
            if (bulletSpriteList[i].getBullet().getID()
                ===bulletSprite.getBullet().getID()) {
                bulletSpriteList.splice(i, 1);
                break;
            }
        }
        this.removeChild(bulletSprite, true)
    },

    ctor : function() {
        this._super()
        this.initSpritePool()
        this.scheduleUpdate()
    },

    initSpritePool : function() {
        this._myField._monsterSprites = []
        this._myField._towerSprites = []
        this._myField._bulletSprites = []
        this._enemyField._monsterSprites = []
        this._enemyField._towerSprites = []
        this._enemyField._bulletSprites = []
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
ObjectLayer.TOWER_TAG = 23112000
ObjectLayer.BULLET_TAG = 19081945