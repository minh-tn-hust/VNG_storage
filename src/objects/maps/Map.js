/**
* Khởi tạo map với hai thuộc tính mapSize và numberOfObstacle
 * @param mapSize : object
 * @param numberOfObstacle : number
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

    /**
     * Thiết lập số lượng vật cản xuất hiện trong map
     * @param {number} number Số lượng vật cản xuất hiện trong map
     */
    setNumberOfObstacle : function(number) {
        this._numberOfObstacle = number
    },

    getMapSize : function() {
        return this._mapSize
    },

    /**
     * @param {cc.Point} mapSize Kích thước map cần set
     */
    setMapSize : function(mapSize) {
        this._mapSize = mapSize
    },

    /**
     * Sử dụng để lấy ra ma trận của mpa hiện tại
     * @returns {Object[][]}
     */
    getMap : function() {
        return this._map
    },

    /**
     * Set lại map hiện tại
     * @param {object[][]} map Ma trận chứa trạng thái của map cần được set
     * @example
     * Một ô trong ma trận sẽ bao gồm các trường
     * let mapCell = [{
     *     type : Map.CELL_TYPE,
     *     parent : [], // đường đi hiện tại từ ô đó tới ô kết thúc
     * }]
     */
    setMap : function(map) {
        this._map = map
    },

    ctor : function(mapSize, numberOfObstacle) {
        this.setMapSize(mapSize)
        this.setNumberOfObstacle(numberOfObstacle)
        this.initMap(mapSize)
    },

    /**
     * Hàm tạo map sử dụng tham số đầu vào mapSize, giá trị trả về là ma trận map, khởi tạo mộ map trống
     * @param {GAME_CONFIG.mapSize} mapSize
     * @returns {number[][]}
     */
    initMap : function(mapSize) {
        let maxWidth = mapSize.width
        let maxHeight = mapSize.height
        let map = []
        for (let i = 0; i < maxWidth; i++) {
            let row = []
            for (let j = 0; j < maxHeight; j ++) {
                row.push({
                    type : Map.CELL_TYPE.PATH,
                    weight : 0,
                    parent : []
                })
            }
            map.push(row);
        }
        map = this.randomObstacle(map)
        this.setMap(map)
        let pathMap = this.findingPathFromEnd()
        this.setMap(pathMap)
        return pathMap
    },

    /**
     * Hàm kiểm tra trạng thái của ô hiện tại có phải là vật cản hay không, nếu là vật cản, trả về true
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
     * Hàm sử dụng để check các ô có trong ma trận 2 chiều có đang kề ô chứa vật cản hay không, trả về nấu như
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
     * @param {Object[][]} [map] Ma trận 2 chiều chứa các trạng thái của các cell
     * @return {Object[][]}
     **/
    randomObstacle : function (map) {
            let mapSize = this.getMapSize()
            let numberOfObstacle = this.getNumberOfObstacle()
            map[0][0].type = Map.CELL_TYPE.BEGIN
            map[mapSize.width - 1][mapSize.height - 1].type = Map.CELL_TYPE.END

            let randomX
            let randomY
            for (let i = 0; i < numberOfObstacle; i++) {
                let maxSize = 0
                do {
                    randomX = Math.floor(Math.random() * 10000) % mapSize.width
                    randomY = Math.floor(Math.random() * 10000) % mapSize.width
                    maxSize++;
                    if (maxSize === GAME_CONFIG.mapSize.width * GAME_CONFIG.mapSize.height) {
                        break
                    }
                } while (this.checkValidCell(randomX, randomY, map))
                map[randomX][randomY].type = Map.CELL_TYPE.TREE

                if (this.findingPathTest(map)) {
                    map[Math.max(randomX - 1, 0)][randomY]["weight"] = 10
                    map[Math.min(randomX + 1, mapSize.width - 1)][randomY]["weight"] = 10
                    map[randomX][Math.max(0, randomY - 1)]["weight"] = 10
                    map[randomX][Math.min(randomY + 1, mapSize.height - 1)]["weight"] = 10
                } else {
                    i--;
                    map[randomX][randomY].type = Map.CELL_TYPE.PATH
                }

            }
        return map
    },

    /**
     * Tìm đường dựa trên vị trí hiện tại của quái
     * @param {cc.Point} cell
     * @return {cc.Point[]}
     */
    findingPathFromCell : function(cell) {
        let map = this.getMap()
        return map[cell.x][cell.y].parent
    },
    /**
     * Hàm tìm đường từ node end tới tất cả các node còn lại trong map, hàm này hỗ trợ cho việc tìm đường cho các Sprite
     * sau khi map được update, thực hiện tìm đường từ node End tới node Begin, đơn giản là BFS hết tất cả các nút
     * @return {Object[][]}
     */
    findingPathFromEnd : function() {
        let mapSize = GAME_CONFIG.mapSize
        let map = this.getMap()
        let visited;
        visited = [];
        for (let i = 0; i < mapSize.width; i++) {
            let visitedRow = []
            for (let j = 0; j < mapSize.height; j++) {
                visitedRow.push(false)
            }
            visited.push(visitedRow)
        }

        let queue;
        queue = [cc.p(mapSize.width - 1, mapSize.height - 1)];
        const FRONT = 0

        while(queue.length !== 0) {
            let currentNodeX = queue[FRONT].x
            let currentNodeY = queue[FRONT].y
            queue.shift()

            // nếu node hiện tại chưa được duyệt
            if (visited[currentNodeX][currentNodeY] === false) {
                visited[currentNodeX][currentNodeY] = true

                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        let nextNodeX = currentNodeX + i
                        let nextNodeY = currentNodeY + j
                        if (i * j === 0 && (i !== 0 || j !== 0)) {
                            if (nextNodeX !== mapSize.width && nextNodeX >= 0 && nextNodeY !== mapSize.height && nextNodeY >= 0) {
                                let nextNodeState = map[nextNodeX][nextNodeY].type
                                if (visited[nextNodeX][nextNodeY] === false){
                                    if (nextNodeState === Map.CELL_TYPE.BEGIN || nextNodeState === Map.CELL_TYPE.PATH){
                                        queue.push(cc.p(nextNodeX, nextNodeY))
                                    }
                                    let currentNodePath = map[currentNodeX][currentNodeY].parent
                                    map[nextNodeX][nextNodeY].parent = [...currentNodePath]
                                    map[nextNodeX][nextNodeY].parent.unshift(cc.p(currentNodeX, currentNodeY))
                                }
                            }
                        }
                    }
                }
            }
        }
        return map
    },
    findingPathTest : function(map) {
        let mapSize = GAME_CONFIG.mapSize
        let visited = []
        for (let i = 0; i < mapSize.width; i++) {
            let row = []
            for (let j = 0; j < mapSize.height; j++) {
                row.push(false)
            }
            visited.push(row)
        }

        let deque = [{x : 0, y : 0}]
        let FRONT = 0

        while(deque.length !== 0) {
            let currentNodeX = deque[FRONT].x
            let currentNodeY = deque[FRONT].y
            deque.shift()

            if (visited[currentNodeX][currentNodeY] === false) {
                visited[currentNodeX][currentNodeY] = true
                let leftCellState = map[Math.max(currentNodeX - 1, 0)][currentNodeY].type
                let rightCellState = map[Math.min(currentNodeX + 1, mapSize.width - 1)][currentNodeY].type
                let upCellState = map[currentNodeX][Math.max(0, currentNodeY - 1)].type
                let downCellState = map[currentNodeX][Math.min(currentNodeY + 1, mapSize.height - 1)].type


                if (leftCellState === Map.CELL_TYPE.END) {
                    return true
                }
                if (rightCellState === Map.CELL_TYPE.END) {
                    return true
                }
                if (upCellState === Map.CELL_TYPE.END) {
                    return true
                }
                if (downCellState === Map.CELL_TYPE.END) {
                    return true
                }

                if (leftCellState === Map.CELL_TYPE.PATH) {
                    deque.push({
                        x : Math.max(currentNodeX - 1, 0),
                        y : currentNodeY
                    })
                }

                if (rightCellState === Map.CELL_TYPE.PATH) {
                    deque.push({
                        x : Math.min(currentNodeX + 1, mapSize.width - 1),
                        y : currentNodeY
                    })
                }

                if (upCellState === Map.CELL_TYPE.PATH) {
                    deque.push({
                        x : currentNodeX,
                        y : Math.max(0, currentNodeY - 1)
                    })
                }

                if (downCellState === Map.CELL_TYPE.PATH) {
                    deque.push({
                        x : currentNodeX,
                        y: Math.min(currentNodeY + 1, mapSize.height - 1)
                    })
                }
            }
        }
        return false
    },
    cellCanPlanTree : function(cell) {
        let cloneMap = this.getMap()
        let oldState = cloneMap[cell.x][cell.y].type
        if (this.isValidCell(oldState)) {
            return false
        }
        cloneMap[cell.x][cell.y].type = Map.CELL_TYPE.TREE
        if (this.findingPathTest(cloneMap)) {
            cloneMap[cell.x][cell.y].type = oldState
            return true
        } else {
            cloneMap[cell.x][cell.y].type = oldState
            return false
        }
    },
    planTreeAtCell : function(cell) {
        let map = this.getMap()
        map[cell.x][cell.y].type = Map.CELL_TYPE.TREE
    },
    resetParentPath : function() {
        let map = this.getMap()
        let mapSize = this.getMapSize()
        for (let i = 0; i < mapSize.width; i++) {
            for (let j = 0; j< mapSize.height; j++) {
                cc.log(i + " " + j)
                map[i][j].parent = []
            }
        }
    }

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