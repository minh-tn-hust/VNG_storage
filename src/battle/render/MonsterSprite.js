let MonsterSprite = cc.Sprite.extend({
    _monster : null,
    _monsterConfig : null,

    // lưu vị trí và hướng đi của con quái tại đầu mỗi tick, sử dụng nó để đối chiều với frame tiếp theo
    // xem có cần phải thay đổi hay không
    _modelTickPos : null,
    _modelTickDirection : null,

    // GETTER
    getMonster : function() {return this._monster},
    getMonsterConfig : function() {return this._monsterConfig},
    getDirection : function() {return this.getMonster().getDirection()},
    getSpeed : function() {return this.getMonster().getSpeed()},
    getConfig : function()  {return this.getMonster().getConfig()},
    getModelTickPos : function(){return this._modelTickPos},
    getModelTickDirection : function() {return this._modelTickDirection},

    // SETTER
    setMonsterConfig : function(monsterConfig){this._monsterConfig = monsterConfig},
    setMonster : function(monster) {this._monster = monster},
    setModelTickPos : function(modelTickPos) {this._modelTickPos = modelTickPos},
    setModelTickDirection : function(modelTickDirection) {this._modelTickDirection = modelTickDirection},

    /**
     * @param {Monster} monster
     */
    ctor : function(monster) {
        this._super();
        this.setMonster(monster)
        this.setModelTickPos(JSON.parse(JSON.stringify(monster.getPosition())))
        this.setModelTickDirection(JSON.parse(JSON.stringify(this.getMonster().getDirection())))
        this.setMonsterConfig(monster.getConfig())
        this.setPosition(BattleUtil.fromModelPositionToPosition(monster.getPosition(), monster.getWho()))

        this.createAnimationCache()
        this.initAnimation(monster.getConfig())
        this.scheduleUpdate()
    },

    // thực hiện cập nhật lại vị trí của con quái, được gọi frame by frame
    // quãng được đi ~ 1 / 6 quản đường mà Model di chuyển
    update : function(dt) {
        this.moving(dt)
    },

    /**
     * Lựa chọn animation phù hợp với hướng đi hiện tại của quái vật
     * @param {boolean} needToChangeAnimation
     */
    runAnimationByDirection : function(needToChangeAnimation) {
        if (needToChangeAnimation) {
            let assetConfig = this.getMonsterConfig()
            this.stopAllActions()
            let paramX = (this.getMonster().getWho() === BattleUtil.Who.Mine) ? +1 : -1
            let paramY = (this.getMonster().getWho() === BattleUtil.Who.Mine) ? -1 : +1
            let digitalDirection = JSON.parse(JSON.stringify(this.getDirection()))

            // chuyển đổi từ hướng của model sang hướng của sprite
            digitalDirection.x *= paramX
            digitalDirection.y *= paramY
            let direction = Util.fromMonsterDigitalToDirection(digitalDirection)

            this.flippedX = (direction.length === 2);

            let animDirection = cc.animationCache.getAnimation(direction[0] + assetConfig.name)
            animDirection.setDelayPerUnit(0.05 / assetConfig.picPerDirection * 10 / this.getSpeed())
            this.runAction(cc.repeatForever(cc.animate(animDirection)))
        }
    },

    createAnimationCache : function() {
        let assetConfig = this.getMonsterConfig()
        if(cc.animationCache.getAnimation("A" + assetConfig.name) === null) {
            cc.spriteFrameCache.addSpriteFrames(assetConfig.asset.plist)

            // khởi tạo các animation khác
            for (let j = 0; j < MonsterConfig.direction.length; j++){
                let animFrames = []
                let frame, animFrame
                let str = ""

                for (let i = assetConfig[MonsterConfig.direction[j]].start; i <= assetConfig[MonsterConfig.direction[j]].end; i++) {
                    str = assetConfig.prefix + Util.get3DigitNumber(i) + assetConfig.suffix
                    frame = cc.spriteFrameCache.getSpriteFrame(str)
                    animFrame = new cc.AnimationFrame(frame, 1)
                    animFrames.push(animFrame)
                }

                let animation = new cc.Animation(animFrames, 0.05)
                cc.animationCache.addAnimation(animation, MonsterConfig.direction[j] + assetConfig.name)
            }
        }
    },

    initAnimation : function(assetConfig) {
        let aDirection = cc.animationCache.getAnimation("C" + assetConfig.name)
        this.flippedX = true
        let aDirectionAnim = cc.animate(aDirection)
        this.runAction(cc.repeatForever(aDirectionAnim))
    },

    /**
     * Hàm di chuyển của MonsterSprite, thực hiện di chuyển một đoạn tương úng với, thực hiện cập nhật lại vị trí sau mỗi lần gamelogic update
     * speed * dt với dt là thời gian giữa 2 lần chờ update của game
     * @param dt
     */
    moving : function(dt) {
        if (this.getMonster().isDie()) {
            this.removeFromParent(true)
        } else {
            let modelTickPos =this.getModelTickPos()
            let modelTickDirection = this.getModelTickDirection()

            let currentModelPos = this.getMonster().getPosition()
            let currentModelDirection = this.getMonster().getDirection()

            let paramX = (this.getMonster().getWho() === BattleUtil.Who.Mine) ? +1 : -1
            let paramY = (this.getMonster().getWho() === BattleUtil.Who.Mine) ? -1 : +1

            // nếu như vị trí của Model thay đổi thì thực hiện set theo vị trí của Model
            if (modelTickPos.x !== currentModelPos.x || modelTickPos.y !== currentModelPos.y) {
                this.setModelTickPos(JSON.parse(JSON.stringify(currentModelPos)))
                this.setPosition(BattleUtil.fromModelPositionToPosition(currentModelPos, this.getMonster().getWho()))
            } else {
                // hệ số vector direction khác với hệ số vector của màn hình, vì vậy cần thêm paramX và paramY
                // để chuyển từ vector của Model -> vector của màn hình
                let currentPos = this.getPosition()
                let speed = this.getSpeed()
                let direction = this.getDirection()
                currentPos.x += speed * direction.x * dt * BattleConfig.Map.cellWidth * paramX
                currentPos.y += speed * direction.y * dt * BattleConfig.Map.cellHeight * paramY
                this.setPosition(currentPos)
            }

            if (Util.fromMonsterDigitalToDirection(currentModelDirection) !== Util.fromMonsterDigitalToDirection(modelTickDirection)) {
                this.setModelTickDirection(JSON.parse(JSON.stringify(currentModelDirection)))
                this.runAnimationByDirection(true)
            }
        }
    },
})