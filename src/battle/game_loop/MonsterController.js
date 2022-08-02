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

    /**
     * Khởi tạo một con quái, biến isClone sử dụng để phân biệt mình có cập nhật lên màn
     * hình hay là chỉ tạo ra model
     * @param {MonsterConfig.Type} type
     * @param {boolean} isClone
     */
    createMonster : function(type, isClone) {
        let who = this.getWho()
        switch (type) {
            case MonsterConfig.Type.CROW_SKELETON:
                let monsterModel = new Monster(MonsterConfig.CROW_SKELETON, who, MonsterConfig.Type.CROW_SKELETON)
                this.addMonsterToPool(monsterModel)
                if (isClone !== true) {
                    let monsterDisplay = new MonsterSprite(monsterModel)
                    let battleScene = cc.director.getRunningScene()
                    battleScene.getObjectLayer().addMonsterSprite(monsterDisplay, who)
                }
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

    /**
     * Thực hiện khởi tạo lại các sprite tương ứng với trạng thái hiện tại của các con quái
     */
    recreateSprite : function() {
        let who = this.getWho()
        let monsterPool = this.getMonsterPool()
        for (let i = 0; i < monsterPool.length; i++) {
            let monsterType = monsterPool[i].getType()
            switch (monsterType) {
                case MonsterConfig.Type.CROW_SKELETON:
                    cc.log("RECREATE MONSTER")
                    let monsterDisplay = new MonsterSprite(monsterPool[i])
                    let battleScene = cc.director.getRunningScene()
                    battleScene.getObjectLayer().addMonsterSprite(monsterDisplay, who)
                    break
            }
        }
    }

})