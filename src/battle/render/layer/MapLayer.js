let MapLayer = cc.Layer.extend({
    _myMapController : null,
    _enemyMapController : null,

    getMyMapController : function() {
        return this._myMapController
    },
    getEnemyMapController : function() {
        return this._enemyMapController
    },

    ctor : function(myMapController, enemyMapController) {
        this._super()

        this._myMapController = myMapController
        this._enemyMapController = enemyMapController


        // cập nhật hiển thị các ô trên map của mình và đối phương
        this.updateMap(BattleUtil.Who.Mine)
        this.updateMap(BattleUtil.Who.Enemy)

        // cập nhật hiển thị đường đi
        this.updatePath(BattleUtil.Who.Mine)
    },

    drawNode : function(position, color, radius) {
        let drawNode = new cc.DrawNode()
        drawNode.drawCircle(position, radius, 1, 100 , false, 2, color)
        this.addChild(drawNode, 100, 1002)
    },

    /**
     * @param who
     * @returns {MapController}
     */
    getMapController : function(who) {
        if (who === BattleUtil.Who.Enemy) {
            return this._enemyMapController
        } else {
            return this._myMapController
        }
    },

    /**
     * Cập nhật lại hiển thị đường đi của map sau khi đường đi bị thay đổi, cập nhật cho enemy và mình
     * @param {BattleUtil.Who.Mine || BattleUtil.Who.Enemy} who
     */
    updatePath : function(who) {
        while(this.getChildByTag(1992)) {
            this.removeChildByTag(1992)
        }
        let path = this.getMapController(who).getPath(cc.p(0, 0))
        for (let i = 0; i < path.length - 1; i++) {
            let digitalDirection = cc.p(path[i + 1].x - path[i].x, path[i + 1].y - path[i].y)
            let direction = Util.fromMonsterDigitalToDirection(digitalDirection)
            let pathSprite = new cc.Sprite("res/ui_icon_arrow.png")
            pathSprite.setPosition(BattleUtil.fromMaxtrixToPosition(path[i], who))
            switch (direction) {
                case "E" :
                    pathSprite.setRotation(90)
                    break
                case "A" :
                    pathSprite.setRotation(-90)
                    break
                case "-C" :
                    pathSprite.setRotation(180)
                    break
            }
            this.addChild(pathSprite, 100, 1992)
        }
        let pathSprite = new cc.Sprite("res/ui_icon_arrow.png")
        pathSprite.setPosition(BattleUtil.fromMaxtrixToPosition(path[path.length - 1], who))
        this.addChild(pathSprite)
    },

    /**
     * Cập nhật hiển thị các ô trên map
     * @param {BattleUtil.Who} who
     */
    updateMap : function(who) {
        let map
        if (who === BattleUtil.Who.Mine) {
            map = this.getMyMapController().getMap()
        } else {
            map = this.getEnemyMapController().getMap()
        }
        let zOrder = 1000
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                let cellSprite = ccs.load("map_itemCell.json").node
                let itemSprite = Util.getChildByName(cellSprite, "Item")[0]
                switch (map[i][j]) {
                    case BattleConfig.Cell.TREE:
                        itemSprite.setTexture(BattleConfig.Asset.TREE)
                        let currentPosition = itemSprite.getPosition()
                        currentPosition.y += 25
                        itemSprite.setPosition(currentPosition)
                        break
                    case BattleConfig.Cell.SPEED_UP:
                        itemSprite.setTexture(BattleConfig.Asset.SPEED_UP)
                        break
                    case BattleConfig.Cell.RANGE_UP:
                        itemSprite.setTexture(BattleConfig.Asset.RANGE_UP)
                        break
                    case BattleConfig.Cell.DAMAGE_UP:
                        itemSprite.setTexture(BattleConfig.Asset.DAMAGE_UP)
                        break
                    case BattleConfig.Cell.HOLE:
                        itemSprite.setTexture(BattleConfig.Asset.HOLE)
                        break
                    default :
                        itemSprite.setVisible(false)
                }

                let position = BattleUtil.fromMaxtrixToPosition(cc.p(j, i), who)
                cellSprite.setPosition(position)
                if (map[i][j] !== BattleConfig.Cell.NORMAL && map[i][j] !== BattleConfig.Cell.PATH){
                    if (who === BattleUtil.Who.Mine){
                        this.addChild(cellSprite)
                    } else {
                        this.addChild(cellSprite, zOrder--, 1)
                    }
                }
            }
        }
    },
})