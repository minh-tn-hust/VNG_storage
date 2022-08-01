let ObjectLayer = cc.Layer.extend({
    _myField : {
        _monsterSprites : null,
        _towerSprites : null,
    },
    _enemyField : {
        _monsterSprites : null,
        _towerSprites : null,
    },

    /**
     * @param {Monster} monster
     * @param {BattleUtil.Who.Enemy | BattleUtil.Who.Mine} who
     */
    addMonsterSprite : function(monster, who) {
        this.addChild(monster)
    },

    /**
     *
     * @param {Tower} tower
     * @param {BattleUtil.Who.Enemy | BattleUtil.Who.Mine} who
     */
    addTowerSprite : function(tower, who){
    },



    ctor : function() {
        this._super()
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