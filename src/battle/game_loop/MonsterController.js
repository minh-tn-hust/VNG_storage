let MonsterController = cc.Class.extend({
    _monsterPool : null,
    _who : null,

    setWho : function(who) {
        this._who = who
    },

    getWho : function() {
        return this._who
    },

    /** @return {Monster[]} */
    getMonsterPool : function() {return this._monsterPool},
    setMonsterPool : function(monsterPool) {this._monsterPool = monsterPool},
    addMonsterToPool : function(monster) {this.getMonsterPool().push(monster)},

    ctor : function(who) {
        this.setWho(who)
        this.setMonsterPool([])
    },

    createMonster : function(type) {
        let who = this.getWho()
        switch (type) {
            case MonsterConfig.Type.CROW_SKELETON:
                let monsterModel = new Monster(MonsterConfig.CROW_SKELETON, who)
                this.addMonsterToPool(monsterModel)
                let monsterDisplay = new MonsterSprite(monsterModel)
                let battleScene = cc.director.getRunningScene()
                battleScene.getObjectLayer().addMonsterSprite(monsterDisplay, who)
                cc.log("CALL")
                break
        }
    },

    getMonsterForTower : function(mode, position, range) {

    },

    // TODO : Thực hiện sinh ra các turn quái
    generateMonsterRound : function() {

    },

    /**
     * Thực hiện việc update quái và kiểm tra xem quái đã chết hay chưa
     * để thực hiện gỡ quái khỏi pool
     */
    updateAllMonster : function() {
        let monsterPool = this.getMonsterPool()
        for (let i = 0; i  < monsterPool.length; i++) {
            if (monsterPool[i].isDie()) {
                monsterPool.splice(i, 1)
            } else {
                monsterPool[i].update()
            }
        }
    },

})