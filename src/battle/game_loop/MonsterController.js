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
                let crowSkeletonModel = new Monster(MonsterConfig.CROW_SKELETON, who, MonsterConfig.Type.CROW_SKELETON)
                this.addMonsterToPool(crowSkeletonModel)
                if (isClone !== true) {
                    let monsterDisplay = new MonsterSprite(crowSkeletonModel)
                    let battleScene = cc.director.getRunningScene()
                    battleScene.getObjectLayer().addMonsterSprite(monsterDisplay, who)
                }
                break
            case MonsterConfig.Type.EVIL_BAT:
                let evilBatModel = new Monster(MonsterConfig.EVIL_BAT, who, MonsterConfig.Type.EVIL_BAT)
                this.addMonsterToPool(evilBatModel)
                if (isClone !== true) {
                    let monsterDisplay = new MonsterSprite(evilBatModel)
                    let battleScene = cc.director.getRunningScene()
                    battleScene.getObjectLayer().addMonsterSprite(monsterDisplay, who)
                }
                break
            case MonsterConfig.Type.GIANT:
                let giantModel = new Monster(MonsterConfig.GIANT, who, MonsterConfig.Type.GIANT)
                this.addMonsterToPool(giantModel)
                if (isClone !== true) {
                    let monsterDisplay = new MonsterSprite(giantModel)
                    let battleScene = cc.director.getRunningScene()
                    battleScene.getObjectLayer().addMonsterSprite(monsterDisplay, who)
                }
                break
            case MonsterConfig.Type.DARK_GIANT:
                let darkGiantModel = new Monster(MonsterConfig.DARK_GIANT, who, MonsterConfig.Type.DARK_GIANT)
                this.addMonsterToPool(darkGiantModel)
                if (isClone !== true) {
                    let monsterDisplay = new MonsterSprite(darkGiantModel)
                    let battleScene = cc.director.getRunningScene()
                    battleScene.getObjectLayer().addMonsterSprite(monsterDisplay, who)
                }
                break
            case MonsterConfig.Type.NINJA:
                let ninjaModel = new Monster(MonsterConfig.NINJA, who, MonsterConfig.Type.NINJA)
                this.addMonsterToPool(ninjaModel)
                if (isClone !== true) {
                    let monsterDisplay = new MonsterSprite(ninjaModel)
                    let battleScene = cc.director.getRunningScene()
                    battleScene.getObjectLayer().addMonsterSprite(monsterDisplay, who)
                }
                break
            case MonsterConfig.Type.GHOST_SWORDER:
                let swordModel = new Monster(MonsterConfig.GHOST_SWORDER, who, MonsterConfig.Type.GHOST_SWORDER)
                this.addMonsterToPool(swordModel)
                if (isClone !== true) {
                    let monsterDisplay = new MonsterSprite(swordModel)
                    let battleScene = cc.director.getRunningScene()
                    battleScene.getObjectLayer().addMonsterSprite(monsterDisplay, who)
                }
                break
        }
    },

    getMonsterForTower : function(mode, position, range, who) {
        return TowerUtil.getMonsterForTower(
            mode,
            this.getMonsterPool(),
            position,
            range,
            who);
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
                i--
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
    },
})