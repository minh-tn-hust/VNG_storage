let MapController = cc.Class.extend({
    _map : null,
    _pathMap : null,
    _monsterController : null,
    _who : null,

    // GETTER
    getMap : function() {return this._map},
    getPathMap : function() {return this._pathMap},
    getMonsterController : function() {return this._monsterController},
    getWho : function() {return this._who},

    // SETTER
    setMap : function(newMap) {this._map = newMap},
    setPath : function(newPathMap) {this._pathMap = newPathMap},
    setMonsterController : function(controller) {this._monsterController = controller},
    setWho : function(value) {this._who = value},

    ctor : function(map, who) {
        this.setMap(JSON.parse(JSON.stringify(map)))
        this.setPath(this.findingPath(this.getMap()))
        this.setWho(who)
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

    /**
     * check if a tower is put at position, all monster's path is blocked
     * @param position
     * @param {number} cardID
     */
    doesMonsterPathExists : function(position, cardID) {
        if (CardUtil.categorize(cardID) === CardUtil.Type.TOWER) {
            // Kiểm tra vị trí đầu vào quái và đầu ra quái
            if ((position.x === 0 && position.y === 0) || (position.x === 6 && position.y === 4)) {
                return false;
            } else if (position.y < 0) {
                return true;
            }

            let map = this.getMap();

            // Nếu như ô hiện tại là một ô bình thường
            if (MapUtil.isNormalCell(map[position.y][position.x])) {
                let tempCell = map[position.y][position.x];
                map[position.y][position.x] = cardID;
                let path = this.findingPath(map);
                if (path[0][0].x === 0 && path[0][0].y === 0) {
                    map[position.y][position.x] = tempCell;
                    return false;
                } else {
                    map[position.y][position.x] = tempCell;
                    return true;
                }
            } else {
                // TODO : Kiểm tra xem vị trí đó có trụ tùng với nó hay không
                let map = this.getMap()
                if (cardID === map[position.y][position.x]) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            return true;
        }
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
                        if (MapUtil.isValidCell(nextNode) && visitor[nextNode.y][nextNode.x] === false) {
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

    /**
     * Thực hiện đặt trụ vào một vị trí trên bản đồ và thực hiện cập nhật lại đường đi cho tất cả các con quái,
     * đối với những con quái chưa đi vào bản đồn sẽ được lấy đường đi từ ô (0,0)
     * @param {cc.Point} position Vị trí đặt ô trên bản đồn ((x, y) | 0 < x < 6, 0 < y < 4)
     * @param {number} cid
     *
     */
    plantTowerWithPosition : function(position, cid) {
        let map = this.getMap();
        map[position.y][position.x] = cid

        // Cập nhật lại đường đi mới cho bản đồ hiện tại
        this.setPath(this.findingPath(this.getMap()))
        let monsterController = this.getMonsterController()
        let monsterPool = monsterController.getMonsterPool()
        for (let i =  0; i < monsterPool.length; i++) {
            let currentPosition = monsterPool[i].getPosition()
            let currentMatrixPosition = BattleUtil.fromModelPositionToMatrixPosition(currentPosition)
            if (monsterPool[i].getType() !== MonsterConfig.Type.EVIL_BAT && MapUtil.isValidCell(BattleUtil.fromModelPositionToMatrixPosition(currentPosition))) {
                let newPath = this.getPath(currentMatrixPosition)
                monsterPool[i].setPathToTower(newPath)
                monsterPool[i].resetDirectionWithNewPath()
            }
        }
        // Cập nhật lại hiển thị
        if (this.getWho() === BattleUtil.Who.Mine) {
            cc.director.getRunningScene().getMapLayer().updatePath(this.getWho())
        }
        cc.log(Date.now())
    },

})