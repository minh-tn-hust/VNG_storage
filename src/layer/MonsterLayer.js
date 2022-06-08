/**
 * Lơp cha tổ chức việc sinh quái và thiết lập đường đi cho từng con quái, nó sẽ chứa thham chiếu tới bản đồ hiện tại
 * những việc liên quan tới bản đồ sẽ do tham chiếu bản đồ đảm nhận
 * lớp này chỉ thực hiện việc kiểm soát hành vi của quái tới bản đồ hiện tại
 */
const MonsterLayer = cc.Layer.extend({
    _spawnMonster : [],
    _map : null,
    _pathFindingMap : null,
    _numberOfMonster : 0,


    ctor : function(map) {
        this._super()
        this.setMap(map)
        cc.spriteFrameCache.addSpriteFrames(ASSET.MONSTER.ASSASSIN_RUN.assets.assassin_plist)
        cc.spriteFrameCache.addSpriteFrames(ASSET.MONSTER.BAT.assets.bat_plist)
        cc.spriteFrameCache.addSpriteFrames(ASSET.MONSTER.DARK_GIANT.assets.bat_plist)
        this.init()
    },

    decreaseNumberOfMonster : function(){
        this._numberOfMonster--
    },

    init : function() {
        this.schedule(function() {
            this.generateRandomMonster()
        }, 0.1)
        // this.generateRandomMonster()
        // this.generateBatMonster()
    },

    setMap : function(map) {
        this._map = map
    },

    /**
     * @returns {GameMap}
     */
    getMap : function() {
        return this._map
    },

    addMonster : function(monster) {
        this._spawnMonster.push(monster)
        this.addChild(monster, 20, 3)
    },

    setSpawnMonster : function(newSpawnMonster) {
        this._spawnMonster = newSpawnMonster
    },

    getSpawnMonster : function() {
        return this._spawnMonster
    },

    /**
     * cập nhật lại MonsterLayer và quái sau khi map thay đổi
     * @param {GameMap} newMap
     */
    updateMap : function(newMap) {
        this.setMap(newMap)
        let mapMatrix = newMap.getMap()
        let monsterSpawn = this.getSpawnMonster()
        for (let i = 0; i < monsterSpawn.length; i++) {
            if (monsterSpawn[i]) {
                let currentMatrixPos = Utils.mappingPositionToMatrix(monsterSpawn[i].getPosition())
                let path = newMap.findingPathFromCell(currentMatrixPos)
                if (monsterSpawn[i].needChangePath(mapMatrix)) {
                    monsterSpawn[i].setPath(path)
                    monsterSpawn[i].createNumberOfAction()
                    this.drawPath(path)
                }
            }
        }
    },
    drawPath : function(path) {
        if (path.length !== 0) {
            if (this.getChildByTag(MonsterLayer.drawNode)){
                this.removeChildByTag(MonsterLayer.drawNode)
            }
            let drawNode = new cc.DrawNode()
            drawNode.setDrawColor(cc.color(100,100,100,255))
            let prePoint = Utils.fromMatrixToPosition(path[0])
            for (let i = 0; i < path.length; i++) {
                if (path[i] === "") {
                    break
                } else {
                    drawNode.drawLine(prePoint, Utils.fromMatrixToPosition(path[i]), cc.color(255,0,0,255))
                    prePoint = Utils.fromMatrixToPosition(path[i])
                }
            }
            this.addChild(drawNode, 10, MonsterLayer.drawNode)
        }
    },
    generateRandomMonster : function() {
        cc.log(this._numberOfMonster)
        this._numberOfMonster++
        let randomValue = Math.floor(Math.random() * 1000) % 3
        switch (randomValue) {
            case 0 :
                this.generateBatMonster()
                break
            case 1 :
                this.generateAssassinMonster()
                break
            case 2:
                this.generateBossMonster()
                break
        }

    },
    generateBatMonster : function() {
        this._numberOfMonster++
        let newMap = this.getMap()
        let path = this.getMap().findingPathFromCell({
            x : 0,
            y : 0,
        })
        this.drawPath(path)
        let monster = new Monster( 10, 10, 77,ASSET.MONSTER.BAT, this.getMap())
        monster.setPosition(Utils.fromMatrixToPosition(cc.p(0, 0)))

        monster.setPath(path)
        monster.createNumberOfAction()
        this.addMonster(monster)
    },
    generateAssassinMonster : function() {
        let path = this.getMap().findingPathFromCell({
            x : 0,
            y : 0,
        })
        let monster = new Monster( 10, 10, 100, ASSET.MONSTER.ASSASSIN_RUN, this.getMap())
        monster.setPosition(Utils.fromMatrixToPosition(cc.p(0, 0)))
        monster.setPath(path)
        monster.createNumberOfAction()
        this.addMonster(monster)

    },
    generateBossMonster : function() {
        let path = this.getMap().findingPathFromCell({
            x : 0,
            y : 0,
        })
        let monster = new Monster( 10, 10, 30, ASSET.MONSTER.DARK_GIANT, this.getMap())
        monster.setPosition(Utils.fromMatrixToPosition(cc.p(0, 0)))
        monster.setPath(path)
        monster.createNumberOfAction()
        this.addMonster(monster)
    },

    /**
     * Xóa những con quái đã tới đích khỏi sự kiểm soát của MonsterLayer
     */
    removeInvisibleMonster : function() {
        this._numberOfMonster--
        let spawnMonster = this.getSpawnMonster()
        for (let i = 0; i < spawnMonster.length; i++) {
            if (!spawnMonster[i].isVisible()) {
                spawnMonster.splice(i, 1)
            }
        }
        this.setSpawnMonster(spawnMonster)
    },
})

MonsterLayer.drawNode = 102