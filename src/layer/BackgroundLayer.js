/**
 * Lớp layer khởi tạo background cho sàn đấu
 */
const GameGroundLayer = cc.Layer.extend({
    _map : null,
    _mapSize : null,

    ctor : function() {
        this._super()
        this.init()
    },

    getMap : function() {
        return this._map

    },

    setMap : function(map) {
        this._map = map
    },

    init : function() {
        let map = new GameMap({width : 7, height : 7}, 7)
        this.setMap(map)
        this.fromMapToSprite()
    },

    initBackground : function() {
        let mapBorderTop = new cc.Sprite(ASSET.MAP.BACKGROUND_BORDER_TOP)
        let mapBorderBottom = new cc.Sprite(ASSET.MAP.BACKGROUND_BORDER_BOTTOM)

        mapBorderTop.setScaleX(1.1)
        mapBorderBottom.setScaleX(1.1)
        mapBorderTop.setPosition(cc.p({
            x : cc.winSize.width / 2,
            y : cc.winSize.height / 2 + 155
        }))
        mapBorderBottom.setPosition(cc.p({
            x : cc.winSize.width / 2 + 10,
            y : cc.winSize.height / 2 - 150
        }))
        this.addChild(mapBorderBottom, 10000)
        this.addChild(mapBorderTop)
    },

    fromMapToSprite : function() {
        this.initBackground()
        let mapMatrix = this.getMap().getMap()
        for (let i = 0; i < mapMatrix.length; i++) {
            for (let j = 0; j < mapMatrix.length; j++) {
                let land = new cc.Sprite(ASSET.MAP.LAND)
                let entity = cc.Sprite()

                if(Map.CELL_TYPE.TREE === mapMatrix[i][j].type){
                    entity = new cc.Sprite(ASSET.MAP.TREE)
                } else if (Map.CELL_TYPE.BEGIN === mapMatrix[i][j].type) {
                    entity = new cc.Sprite(ASSET.MAP.END)
                } else if (Map.CELL_TYPE.END === mapMatrix[i][j].type) {
                    entity = new cc.Sprite(ASSET.MAP.END)
                }

                land.setPosition(cc.p({
                    x :  cc.winSize.width / 2 - 77 * ( 4 - i - 1),
                    y : cc.winSize.height / 2 +  80 * (4 - j - 1),
                }))
                this.addChild(land, 1000 / (i + 1))

                if (entity !== null) {
                    entity.setScale(0.8)
                    entity.setAnchorPoint(cc.p({
                        x : 0.5,
                        y : 0.25
                    }))
                    entity.setPosition(cc.p({
                        x :  cc.winSize.width / 2 - 77 * ( 4 - i - 1),
                        y : cc.winSize.height / 2 +  80 * (4 - j - 1),
                    }))
                    this.addChild(entity, 1000000)
                }
            }
        }
    },

})