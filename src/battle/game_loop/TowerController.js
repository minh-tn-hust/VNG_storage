let TowerController = cc.Class.extend({
    _towers : null,
    _mapController : null,
    _monsterController : null,
    _gameLoop : null,
    _who : null,

    // GETTER
    /** @return {MapController} */
    getMapController : function() {return this._mapController},
    /** @return {MonsterController} */
    getMonsterController : function() {return this._monsterController},
    getTowers: function (){return this._towers;},
    getWho: function () {return this._who},
    getGameLoop : function() {return this._gameLoop},


    // SETTER
    /** @param {MapController} controller */
    setMapController : function(controller) {this._mapController = controller},
    /** @param {MonsterController} controller */
    setMonsterController : function(controller) {this._monsterController = controller},
    setTowers: function () {
        this._towers = new Array(BattleUtil.NUM_CELL_HEIGHT);
        for (let i = 0; i < BattleUtil.NUM_CELL_HEIGHT; ++i){
            this._towers[i] = new Array(BattleUtil.NUM_CELL_WIDTH);
        }
    },
    setWho: function (who) {this._who=who;},
    setGameLoop : function(gameLoop) {this._gameLoop = gameLoop},

    /**
     * @param {BattleUtil.Who} who
     * @param {MapController} mapController
     * @param {MonsterController} monsterController
     * @param {GameLoop} gameLoop
     */
    ctor: function (who, mapController, monsterController, gameLoop) {
        this.setTowers()
        this.setWho(who)
        this.setMapController(mapController)
        this.setMonsterController(monsterController)
        this.setGameLoop(gameLoop)
    },

    /**
     * @param {number} cid
     * @param {cc.Point} position
     * @returns {boolean}
     */
    canPlantTower: function (cid, position) {
        let tower = this.getTowers()[position.y][position.x];
        if (tower!==undefined){
            return !!(tower.getID() === cid && tower.canUpgrade());
        } else {
            return true;
        }
    },

    /**
     * plant towers (cid) at position
     * @param {number} cid
     * @param {cc.Point} position
     * @param {boolean} isCloned
     */
    plantTower: function (cid, position,isCloned) {
        cc.log("TOWER CONRTOLLER - plantTower")
        cc.log(cid)
        cc.log(JSON.stringify(position))
        let tower = this.getTowers()[position.y][position.x];
        if (tower!==undefined){
            return !!(tower.getID() === cid && tower.upgrade());
        } else {
            this.getTowers()[position.y][position.x] = Tower.createTower(
                cid,this.getWho(),position,false);
            if (isCloned !== true) {
                this.plantNewUITower(cid,this.getTowers()[position.y][position.x],0);
            }
            return true;
        }
    },

    // TODO : Tạch biệt phần UI ra khỏi Controller
    plantNewUITower: function (cid, tower, timeout) {
        let who = this.getWho();
        setTimeout(function () {
            let towerSprite = TowerSprite.createTowerSprite(cid,tower);
            let battleScene = cc.director.getRunningScene();
            battleScene.getObjectLayer().addTowerSprite(towerSprite,who)
        },timeout);
    },

    /**
     * @param {number} currentTick
     */
    updateAllTower: function (currentTick) {
        let towers= this.getTowers();
        let tower;
        try {
            let monsterController = this.getMonsterController()
            for (let i=0;i<BattleUtil.NUM_CELL_HEIGHT;++i){
                for (let j=0;j<BattleUtil.NUM_CELL_WIDTH;++j){
                    tower = towers[i][j];
                    if (tower!==null && tower!== undefined) {
                        tower.update(currentTick);
                        if (tower.getTarget() === null) {
                            tower.setTarget(monsterController.getMonsterForTower(
                                tower.getTargetMode(),
                                tower.getPosition(),
                                tower.getRangeSize(),
                                tower.getWho()
                            ));
                        }
                    }
                }
            }
        } catch (e) {
            // cc.log("Check Battle Scene: ",JSON.stringify(battleScene));
        }

    },

    recreateSprite: function () {
        let towers = this.getTowers();
        for (let i = 0; i < BattleUtil.NUM_CELL_HEIGHT; ++i) {
            for (let j = 0; j < BattleUtil.NUM_CELL_WIDTH; ++j) {
                if (towers[i][j] !== null && towers[i][j] !== undefined){
                    this.plantNewUITower(
                        towers[i][j].getID(),
                        towers[i][j],
                        0
                    );
                }
            }
        }
    }
})
