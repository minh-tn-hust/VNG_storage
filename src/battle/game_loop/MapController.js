let MapController = cc.Class.extend({
    _map : null,
    _pathMap : null,

    // GETTER
    getMap : function() {return this._map},
    getPathMap : function() {return this._pathMap},

    // SETTER
    setMap : function(newMap) {this._map = newMap},
    setPath : function(newPathMap) {this._pathMap = newPathMap},

    ctor : function(map) {
        cc.log(JSON.stringify(map))
        this.setMap(map)
        this.setPath(this.findingPath(this.getMap()))
    },

    /**
     * Lấy ra đường đi hiện tại từ vị trí position trên map tới vị trí đích
     * @param position
     * @returns {[]}
     */
    getPath : function(position) {
        let pathMap = this.getPathMap()
        let path = []
        path.push(position)
        while(position.x !== BattleConfig.Map.WIDTH - 1 || position.y !== BattleConfig.Map.HEIGHT - 1) {
            path.push(pathMap[position.y][position.x])
            position = pathMap[position.y][position.x]
        }
        return path
    },

    isValidCell : function() {

    },

    canPlantTower : function() {

    },

    findingPath : function(map) {
        let path= []
        let visitor = []

        for (let i = 0; i < 5; i++) {
            let row = []
            let pathRow = []
            for (let i = 0; i < 7; i++) {
                row.push(false)
                pathRow.push(cc.p({x : 0, y : 0}))
            }
            visitor.push(row)
            path.push(pathRow)
        }

        let queue = []
        queue.push(cc.p({x : 6, y : 4}))
        while (queue.length !== 0) {
            let currentNode = queue.shift()
            visitor[currentNode.y][currentNode.x] = true
            for (let i = - 1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i * j === 0 && (i !== 0 || j !== 0)) {
                        let nextNode = cc.p({
                            x : currentNode.x + i,
                            y : currentNode.y + j
                        })
                        if (MapUtil.isValidCell(nextNode, map) && visitor[nextNode.y][nextNode.x] === false) {
                            visitor[nextNode.y][nextNode.x] = true
                            path[nextNode.y][nextNode.x] = currentNode
                            if (MapUtil.isNormalCell(map[nextNode.y][nextNode.x])) {
                                queue.push(nextNode)
                            }
                        }
                    }
                }
            }
        }
        return path
    },
})