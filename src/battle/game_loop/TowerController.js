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

    /**
     * plant towers (cid) at position
     * @param {number}cid
     * @param {cc.Point}position
     */
    plantTower: function (cid, position) {
        var tower = this.towers[position.y][position.x];
        if (tower!==null){
            return !!(tower.getID() === cid && tower.upgrade());
        } else {
            this.towers[position.y][position.x] = Tower.createTower(
                cid,this.getWho(),position);
        }
    }

})