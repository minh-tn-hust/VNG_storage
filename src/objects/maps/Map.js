/**
* Khởi tạo map với hai thuộc tính mapSize và numberOfObstacle
 * @param mapSize : object
 * @param numberOfObstacle : number
 * @type {(mapSize : object, numberOfObstacle : number)}
**/
let GameMap = cc.Class.extend({

    _map : [],
    _mapSize : {
        width : null,
        height : null
    },
    _numberOfObstacle : null,

    getNumberOfObstacle : function() {
        return this._numberOfObstacle

    },

    setNumberOfObstacle : function(number) {
        this._numberOfObstacle = number
    },

    getMapSize : function() {
        return this._mapSize
    },

    setMapSize : function(mapSize) {
        this._mapSize = mapSize
    },

    getMap : function() {
        return this._map
    },

    setMap : function(map) {
        this._map = map
    },

    ctor : function(mapSize, numberOfObstacle) {
        this.setMapSize(mapSize)
        this.setNumberOfObstacle(numberOfObstacle)
        this.initMap(mapSize)
        this.init()
    },

    initMap : function(mapSize) {
        let maxWidth = mapSize.width
        let maxHeight = mapSize.height
        let map = []
        for (let i = 0; i < maxHeight; i++) {
            let row = []
            for (let j = 0; j < maxWidth; j ++) {
                row.push({
                    type : Map.CELL_TYPE.PATH
                })
            }
            map.push(row);
        }
        map = this.randomObstacle(map)
        this.setMap(map)
    },

    init : function() {
    },

    /**
     * Hàm kiểm tra trạng thái của ô hiện tại có phải là vật cản hay không
     * @param {Map.CELL_TYPE} [cellType] Trạng thái của ô hiện tại
     * @returns {boolean}
     */
    isValidCell : function(cellType) {
        if (cellType === Map.CELL_TYPE.TREE || cellType === Map.CELL_TYPE.BEGIN || cellType === Map.CELL_TYPE.END) {
            return true
        }
        return false
    },

    /**
     * Hàm sử dụng để check các ô có trong ma trận 2 chiều có thỏa đang kề ô chứa vật cản hay không
     * @param {number} randomX Vị trí theo cột của ô cần kiểm tra
     * @param {number} randomY Vị trí theo hàng của ô cần kiểm tra
     * @param {number[][]} map Bản đồ hiện tại của map
     * @returns {boolean}
     */
    checkValidCell : function(randomX, randomY, map) {
        let mapSize = this.getMapSize()

        let conditions  = [
            this.isValidCell(map[randomX][randomY].type),
            this.isValidCell(map[Math.max(randomX - 1, 0)][randomY].type),
            this.isValidCell(map[Math.min(randomX + 1, mapSize.width - 1)][randomY].type),
            this.isValidCell(map[randomX][Math.max(0, randomY - 1)].type),
            this.isValidCell(map[randomX][Math.min(randomY + 1, mapSize.height - 1)].type)
        ]
        for (let i = 0; i < conditions.length; i++) {
            if (conditions[i]) {
                return true
            }
        }
        return false
    },

    /**
     * Hàm sử dụng để random ra các đối tượng cản đường có trong map
     * @param {number[][]} [map] Ma trận 2 chiều chứa các trạng thái của các cell
     * @return {number[][]}
     **/
    randomObstacle : function (map) {
        let mapSize = this.getMapSize()
        let numberOfObstacle = this.getNumberOfObstacle()
        map[0][0].type = Map.CELL_TYPE.BEGIN
        map[mapSize.width - 1][mapSize.height - 1].type = Map.CELL_TYPE.END

        let randomX
        let randomY
        for (let i = 0; i < numberOfObstacle; i++) {
            do {
                randomX = Math.floor(Math.random() * 10000) % mapSize.width
                randomY = Math.floor(Math.random() * 10000) % mapSize.width
            } while (this.checkValidCell(randomX, randomY, map))
            map[randomX][randomY].type = Map.CELL_TYPE.TREE
        }
        return map
    },
})

Map.START_PLACE = 0
Map.MAP_SIZE = 7
Map.CELL_TYPE = {
    STONE : 1,
    TREE : 2,
    HOLE : 3,
    PATH : 4,
    BEGIN : 0,
    END : 100
}