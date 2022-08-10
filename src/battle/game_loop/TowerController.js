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
    getTowerLevel : function() {
            let sumLevel=0;
            for (let i=0;i<BattleUtil.NUM_CELL_HEIGHT;++i) {
                for (let j = 0; j < BattleUtil.NUM_CELL_WIDTH; ++j) {
                    if (this.getTowers()[i][j]!==undefined){
                        sumLevel +=  this.getTowers()[i][j].getCardLevel()/5|0;
                    }
                }
            }
            return sumLevel;
        },


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
     * @param {number} cardLevel 1-20 // TODO or 0-19
     * @param {boolean} isCloned
     */
    plantTower: function (cid, position,cardLevel,isCloned) {
        cc.log("TOWER CONTROLLER - plantTower")
        let tower = this.getTowers()[position.y][position.x];
        // nếu như tại đó đã tồn tại trụ rồi
        if (tower !== undefined){
            cc.log("Tower Controller - Upgrade Tower")
            if (tower.getID()===cid){
                tower.upgrade();
            }
        } else {
            // Nếu như tại đó chưa tồn tại trụ
            this.getTowers()[position.y][position.x] = Tower.createTower(
                cid,this.getWho(),position,cardLevel,false);
            if (isCloned !== true) {
                var towerSprite = this.plantNewUITower(
                    cid,this.getTowers()[position.y][position.x],0
                );
                this.getTowers()[position.y][position.x].setTowerSprite(towerSprite);
            }
        }
    },

    // TODO : Tạch biệt phần UI ra khỏi Controller
    plantNewUITower: function (cid, tower, timeout) {
        let who = this.getWho();
        let towerSprite = TowerSprite.createTowerSprite(cid,tower);
        towerSprite.retain();
        let battleScene = cc.director.getRunningScene();
        setTimeout(function () {
            battleScene.getObjectLayer().addTowerSprite(towerSprite,who)
        },timeout);
        return towerSprite;
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
