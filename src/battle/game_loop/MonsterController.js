let MonsterController = cc.Class.extend({
    _monsterPool : null,
    _who : null,
    _mapController : null,


    //GETTER
    /** @return {Monster[]} */
    getMonsterPool : function() {return this._monsterPool},
    getWho : function() { return this._who },
    getMapController : function() {return this._mapController},

    // SETTER
    setWho : function(who) { this._who = who },
    setMonsterPool : function(monsterPool) {this._monsterPool = monsterPool},
    addMonsterToPool : function(monster) {this.getMonsterPool().push(monster)},
    setMapController : function(mapController) {this._mapController = mapController},



    ctor : function(who, mapController) {
        this.setWho(who)
        this.setMonsterPool([])
        this.setMapController(mapController)
    },

    /**
     *
     * @param {MonsterConfigInfo} config
     * @param {BattleUtil.Who} who
     * @param {MonsterConfig.Type} type
     * @param {boolean} isClone
     */
    createMonsterWithConfig : function(config, who, type, isClone) {
        let mapController = this.getMapController()
        let pathToTower = mapController.getPath(cc.p(0,0))
        let monsterModel = new Monster(config, who, type, pathToTower)
        this.addMonsterToPool(monsterModel)
        if (isClone !== true) { // khác true tính cả null
            let monsterDisplay = new MonsterSprite(monsterModel)
            let battleScene = cc.director.getRunningScene()
            battleScene.getObjectLayer().addMonsterSprite(monsterDisplay, who)
        }
    },

    /**
     * Khởi tạo một con quái, biến isClone sử dụng để phân biệt mình có cập nhật lên màn
     * hình hay là chỉ tạo ra model
     * @param {MonsterConfig.Type} type
     * @param {boolean} isClone
     */
    createMonster : function(type, isClone) {
        let who = this.getWho()
        if (type === MonsterConfig.Type.CROW_SKELETON) {
            this.createMonsterWithConfig(MonsterConfig.CROW_SKELETON, who, MonsterConfig.Type.CROW_SKELETON, isClone)
        } else if (type === MonsterConfig.Type.EVIL_BAT) {
            this.createMonsterWithConfig(MonsterConfig.EVIL_BAT, who, MonsterConfig.Type.EVIL_BAT, isClone)
        } else if (type === MonsterConfig.Type.GIANT) {
            this.createMonsterWithConfig(MonsterConfig.GIANT, who, MonsterConfig.Type.GIANT, isClone)
        } else if (type === MonsterConfig.Type.DARK_GIANT) {
            this.createMonsterWithConfig(MonsterConfig.DARK_GIANT, who, MonsterConfig.Type.DARK_GIANT, isClone)
        } else if (type === MonsterConfig.Type.NINJA) {
            this.createMonsterWithConfig(MonsterConfig.NINJA, who, MonsterConfig.Type.NINJA, isClone)
        } else if (type === MonsterConfig.Type.GHOST_SWORDER) {
            this.createMonsterWithConfig(MonsterConfig.GHOST_SWORDER, who, MonsterConfig.Type.GHOST_SWORDER, isClone)
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
