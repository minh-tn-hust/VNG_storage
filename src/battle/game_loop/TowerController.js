var TowerController = cc.Class.extend({
    setTowers: function () {
        this.towers = new Array(BattleUtil.NUM_CELL_HEIGHT);
        for (var i=0;i<BattleUtil.NUM_CELL_HEIGHT;++i){
            this.towers[i] = new Array(BattleUtil.NUM_CELL_WIDTH);
        }
    },
    getTowers: function (){return this.towers;},

    setWho: function (who) {this.who=who;},
    getWho: function () {return this.who},

    ctor: function (who) {
        this.setTowers();
        this.setWho(who);
    },

    canPlantTower: function (cid,position) {
        var tower = this.towers[position.y][position.x];
        if (tower!==undefined){
            return !!(tower.getID() === cid && tower.canUpgrade());
        } else {
            return true;
        }
    },

    /**
     * plant towers (cid) at position
     * @param {number}cid
     * @param {cc.Point}position
     * @param {boolean} isCloned
     */
    plantTower: function (cid, position,isCloned) {
        var tower = this.towers[position.y][position.x];
        if (tower!==undefined){
            return !!(tower.getID() === cid && tower.upgrade());
        } else {
            this.towers[position.y][position.x] = Tower.createTower(
                cid,this.getWho(),position,false);
            if (isCloned!==true){
                this.plantNewUITower(cid,this.towers[position.y][position.x],0);
                // TODO add ui to tower pool in ObjectLayer
            }
            return true;
        }
    },

    // TODO : Tạch biệt phần UI ra khỏi Controller
    plantNewUITower: function (cid,tower,timeout) {
        let who = this.getWho();
        setTimeout(function () {
            let towerSprite = TowerSprite.createTowerSprite(cid,tower);
            let battleScene = cc.director.getRunningScene();
            battleScene.getObjectLayer().addTowerSprite(towerSprite,who)
        },timeout);
    },

    /**
     *
     * @param {number}currentTick
     */
    updateAllTower: function (currentTick) {
        let towers= this.getTowers();
        let tower;
        let battleScene = cc.director.getRunningScene();
        try {
            let monsterController = battleScene.getGameLoop(this.getWho()).getMonsterController();
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
        for (let i=0;i<BattleUtil.NUM_CELL_HEIGHT;++i) {
            for (let j = 0; j < BattleUtil.NUM_CELL_WIDTH; ++j) {
                if (towers[i][j]!==null && towers[i][j]!== undefined){
                    cc.log("Recreate tower at: ",i+", "+j);
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