let Monster = cc.Class.extend({
    _monsterConfig : null,
    _inUse : null,
    _direction :  null,
    _speed : null,
    _maxSpeed : null,
    _hp : null,
    _maxHp : null,
    _weight : null,
    _canDodge : null,
    _canTarget : null,
    _who : null,
    _effects : null,
    _type : null,
    _id : null,
    _pathToTower : null,
    _hitRadius : null,
    _gainEnergy : null,
    _dropPoint : null,


    // DEBUG
    _count : null,

    // Position này lấy ô đầu tiên của ma trận làm gốc tạo độ, từ đó các ô khác sẽ + / -
    // một lượng bằng với kích thước của một ô trong bản đồ (BattleConfig.Map.cellWidth | BattleConfig.Map.cellHeight)
    _position : null,


    // GETTER
    getInUse : function() { return this._inUse; },
    getSpeed : function() { return this._speed; },
    getMaxSpeed : function() {return this._maxSpeed},
    getHp : function() { return this._hp; },
    getWeight : function() { return this._weight; },
    getType : function() { return this._type; },
    getMaxHp : function() { return this._maxHp; },
    getCanTarget : function() { return this._canTarget; },
    getDodge : function() { return this._canDodge;},
    getEffects : function() { return this._effects; },
    getId : function() { return this._id;},
    getWho : function () {return this._who;},
    getPathToTower : function() { return this._pathToTower;},
    getPosition : function() {return this._position},
    /** @return {MonsterConfigInfo} */
    getConfig : function(){return this._monsterConfig},
    getDirection : function() {return this._direction},


    // SETTER
    setInUse : function (inUse) {this._inUse = inUse;},
    setSpeed : function (speed) {this._speed = speed;},
    setMaxSpeed : function(maxSpeed) {this._maxSpeed = maxSpeed},
    setHp : function (hp) {this._hp = hp;},
    setWeight : function (weight) {this._weight = weight;},
    setType : function(type) {this._type = type;},
    setMaxHp : function(maxHp) {this._maxHp = maxHp;},
    setCanTarget : function(canTarget) {this._canTarget = canTarget},
    setDodge : function(dodge) {this._canDodge = dodge},
    setEffects : function(effects) {this._effects = effects;},
    setId : function(id) {this._id = id;},
    setWho : function(who) {this._who = who;},
    setPathToTower : function(pathToTower) {this._pathToTower = pathToTower},
    setConfig : function(config) {this._monsterConfig = config},
    setPosition : function(newPosition) {this._position = newPosition},
    setDirection : function(direction) {this._direction = direction},

    /**
     * @param {MonsterConfigInfo} config
     * @param {BattleUtil.Who.Mine | BattleUtil.Who.Enemy} who
     */
    ctor : function(config, who) {
        this.setConfig(config)
        this.setHp(config.hp)
        this.setMaxHp(config.hp)
        this.setSpeed(config.speed)
        this.setMaxSpeed(config.speed)
        this.setWeight(config.weight)
        this.setPosition(MonsterConfig.INIT_POSITION)
        this.setDirection(MonsterConfig.INIT_DIRECTION)
        this.setWho(who)

        let mapController = cc.director.getRunningScene().getMapController(who)
        this.setPathToTower(mapController.getPath(cc.p(0, 0)))
        cc.log(JSON.stringify(this.getPathToTower()))

        //======================
        this._count = 0
    },

    changeHP : function(newHp){

    },


    addEffect : function(newEffect) {

    },

    reset : function() {

    },

    update : function() {
        this.updateAction()
    },

    updateAction : function() {
        let pathToTower = this.getPathToTower()
        let currentPos = this.getPosition()

        // thực hiện các bước di chuyển tới ô tiếp theo của đường đi
        if (pathToTower.length !== 0) {
            let checkNode = BattleUtil.fromMatrixToModelPosition(pathToTower[0], this.getWho())

            // kiểm tra xem quái vật đã đi tới ô chỉ định hay chưa
            if (Math.abs(currentPos.x - checkNode.x) <= 5 && Math.abs(currentPos.y - checkNode.y) <= 5 && this._speed !== 0) {
                pathToTower.shift()
                if (pathToTower.length !== 0) {
                    let nextNode = BattleUtil.fromMatrixToModelPosition(pathToTower[0], this.getWho())
                    let nextDirection = cc.p(nextNode.x - currentPos.x, nextNode.y - currentPos.y)
                    let dot = Math.sqrt(nextDirection.x * nextDirection.x + nextDirection.y * nextDirection.y)
                    nextDirection.x /= dot
                    nextDirection.y /= dot
                    this.setDirection(nextDirection)
                }
            }
            // thực hiện di chuyển
            this.moving()
        } else if(this.isVisible()) {
            cc.log("MONSTER DIE")
        }
    },

    /**
     * TODO : Hàm tính toán vị trí của vật thể sau mỗi tick của game, mỗi tick
     * sẽ được config thời gian cố định BattleConfig.TICK_DURATION
     */
    moving : function() {
        let currentPos = this.getPosition()
        let speed = this.getSpeed()
        let direction = this.getDirection()
        cc.log(JSON.stringify(direction))
        currentPos.x += speed * direction.x * BattleConfig.TICK_DURATION * BattleConfig.Map.cellWidth
        currentPos.y += speed * direction.y * BattleConfig.TICK_DURATION * BattleConfig.Map.cellHeight
        this.setPosition(currentPos)
    },
})