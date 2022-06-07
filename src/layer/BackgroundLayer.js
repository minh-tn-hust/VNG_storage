/**
 * Lớp layer khởi tạo background cho sàn đấu
 */
const GameGroundLayer = cc.Layer.extend({
    _map : null,
    _mapSize : null,
    _landSpriteMap : null,
    _entitySpriteMap : null,
    _canPlantTree : false,
    _treeSprite : null,


    ctor : function() {
        this._super()
        this.init()
    },

    init : function() {

        let map = new GameMap(GAME_CONFIG.mapSize, GAME_CONFIG.numberOfObstacle)

        this.initSpriteTree()
        this.setMap(map)
        this.fromMapToSprite()
        this.addActionListener()
    },

    /**
     * Khởi tạo hình ảnh di chuyển theo chuột khi chế độ trồng cây được bật
     */
    initSpriteTree : function() {
        let treeSprite = new cc.Sprite(ASSET.MAP.TREE)
        treeSprite.setVisible(false)
        treeSprite.setOpacity(400)
        treeSprite.setPosition(cc.p(
        cc.winSize.width / 2, cc.winSize.height /2
            ))
        treeSprite.setScale(0.8)
        treeSprite.setAnchorPoint(cc.p({
            x : 0.5,
            y : 0.25
        }))
        this._treeSprite = treeSprite
        this.addChild(treeSprite, 100000)
    },


    /**
     * @returns {GameMap}
     **/
    getMap : function() {
        return this._map
    },

    /**
     * @param {number[][]}map
     */
    setMap : function(map) {
        this._map = map
    },

    /**
     * @returns {cc.Sprite()}
     */
    getLandSpriteMap : function() {
        return this._landSpriteMap
    },

    setLandSpriteMap : function(landSpriteMap) {
        this._landSpriteMap = landSpriteMap
    },

    /**
     * Thực hiện lấy ra ma trận Entity Sprite - ma trận các thưc thể đang ở trên đất của
     * map hiện tại
     * @returns {cc.Sprite[][]}
     */
    getEntitySpriteMap : function() {
        return this._entitySpriteMap
    },

    /**
     * Thực hiện cập nhật các thực thể có trên map sau khi map thay đổi
     */
    updateEntitySprite : function() {
        let mapSize = GAME_CONFIG.mapSize
        let gameMap = this.getMap()
        let map = gameMap.getMap()
        let entitySpriteMap = this.getEntitySpriteMap()
        for (let i = 0; i < mapSize.width; i++) {
            for (let j = 0; j < mapSize.height; j++) {
                if (map[i][j].type === Map.CELL_TYPE.PATH) {
                    entitySpriteMap[i][j].setVisible(false)
                } else if (map[i][j].type === Map.CELL_TYPE.TREE) {
                    entitySpriteMap[i][j].setTexture(ASSET.MAP.TREE)
                    entitySpriteMap[i][j].setVisible(true)
                }
            }
        }
    },

    getTreeSprite : function() {
        return this._treeSprite
    },
    /**
     * Set hình ảnh cây dành cho việc trồng cây
     * @param {cc.Sprite} treeSprite
     */
    setTreeSprite : function(treeSprite) {
        this._treeSprite = treeSprite
    },
    getCanPlanTree : function() {
        return this._canPlantTree
    },
    /**
     * Bật tắt trạng thái trồng cây
     * @param {boolean} state thực hiện đặt trạng thái hiển thị cây hay không
     */
    setCanPlanTree: function(state) {
        this._canPlantTree = state

    },

    /**
     * Hàm sử dụng để tạo ra map mới cho game, sử dụng để giả lập thay đổi đường đi của quái
     */
    updateMap : function() {
        let mapSize = GAME_CONFIG.mapSize

        this.getMap().initMap(mapSize)
        this.updateEntitySprite()

        let monsterLayer = cc.director.getRunningScene().getChildByTag(OnGameScene.monsterLayer)
        monsterLayer.updateMap(this.getMap())
    },

    setEntitySpriteMap : function(entitySpriteMap) {
        this._entitySpriteMap = entitySpriteMap
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


    /**
     * Chuyển đổi từ ma trận vị trí sang ma trận sprite và lưu lại vị trí các ô đất +
     * các ô thực thể để sau này có thể thực hiện thay đổi bằng cách truy cập trực tiếp vào ma trận
     */
    fromMapToSprite : function() {
        this.initBackground()
        let landSpriteMap = []
        let entitySpriteMap = []
        let mapMatrix = this.getMap().getMap()
        let mapSize = this.getMap().getMapSize()
        for (let i = 0; i < mapSize.width; i++) {
            let landSpriteRow = []
            let entitySpriteRow = []
            for (let j = 0; j < mapSize.height; j++) {
                let land = new cc.Sprite(ASSET.MAP.LAND)
                let entity = cc.Sprite()

                if(Map.CELL_TYPE.TREE === mapMatrix[i][j].type){
                    entity = new cc.Sprite(ASSET.MAP.TREE)
                } else if (Map.CELL_TYPE.BEGIN === mapMatrix[i][j].type) {
                    entity = new cc.Sprite(ASSET.MAP.END)
                } else if (Map.CELL_TYPE.END === mapMatrix[i][j].type) {
                    entity = new cc.Sprite(ASSET.MAP.END)
                }
                let currentPosition = cc.p({
                    x :  cc.winSize.width / 2 - GAME_CONFIG.cellSize.width * ((GAME_CONFIG.mapSize.width + 1) / 2  - i - 1),
                    y : cc.winSize.height / 2 +  GAME_CONFIG.cellSize.height * ((GAME_CONFIG.mapSize.height + 1) / 2  - j - 1),
                })

                land.setPosition(currentPosition)
                this.addChild(land, 1000 / (i + 1))
                landSpriteRow.push(land)

                if (entity !== null) {
                    entity.setScale(0.8)
                    entity.setAnchorPoint(cc.p({
                        x : 0.5,
                        y : 0.25
                    }))
                    entity.setPosition(currentPosition)
                    this.addChild(entity, 1000000)
                    entitySpriteRow.push(entity)
                }
            }
            landSpriteMap.push(landSpriteRow)
            entitySpriteMap.push(entitySpriteRow)
        }
        this.setEntitySpriteMap(entitySpriteMap)
        this.setLandSpriteMap(landSpriteMap)
    },

    /**
     * THực hiện lắng nghe click của người dùng
     */
    addActionListener : function () {
        let self = this
        cc.eventManager.addListener({
            event : cc.EventListener.MOUSE,
            // thực hiện trồng cây tại vị trí được click
            onMouseDown : function(event) {
                if (self.getCanPlanTree()) {
                    let currentMatrixPos = Utils.mappingPositionToMatrix(event.getLocation())
                    let isValidCell = Utils.isValidMatrixPosition(currentMatrixPos)
                    if (isValidCell) {
                        let map = self.getMap()

                        // trồng cây và thực hiện cập nhật lại đường đi cho các ô hiện tại
                        if (map.cellCanPlanTree(currentMatrixPos)) {
                            map.planTreeAtCell(currentMatrixPos)
                            map.resetParentPath()
                            map.findingPathFromEnd()

                            // update UI
                            self.updateEntitySprite()

                            // gọi monsterLayer và thực hiện cập nhật lại đường đi cho các con quái
                            let monsterLayer = cc.director.getRunningScene().getChildByTag(OnGameScene.monsterLayer)
                            monsterLayer.updateMap(self.getMap())
                        }
                    }
                }
            },
            onMouseMove : function (event) {
                if (self.getCanPlanTree()){
                    let treeSprite = self.getTreeSprite()
                    treeSprite.setVisible(true)
                    treeSprite.setPosition(event.getLocation())
                    let currentMatrixPos = Utils.mappingPositionToMatrix(event.getLocation())
                    let isValidCell = Utils.isValidMatrixPosition(currentMatrixPos)

                    if (isValidCell) {
                        let map = self.getMap()
                        if (map.cellCanPlanTree(currentMatrixPos)) {
                            treeSprite.setColor(cc.color(0,255 ,0))
                        } else {
                            treeSprite.setColor(cc.color(255,0 ,0))
                        }
                    } else {
                        treeSprite.setColor(cc.color(255,0 ,0))
                    }
                }
            }
        }, this)
    },

})