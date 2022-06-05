/**
 * Lớp cha chứa việc khởi tạo các lớp con cơ bản, khởi tạo các animation ở các hướng
 * @param {number} [health] Số lượng máu cúa quái
 * @param {number} [damage] Lượng damage lên trụ của quái
 * @param {number} [speed] chir số tốc độ set cho quái hiện tại, được tính bằng thời gian đi từ trung tâm ô này tới trung tâm của ô trong hàng / cốt
 * @param {object} [monsterAsset] một object chứa config về animation của quái
 * @param {number[][]} [map] Ma trận map hiện tại
 **/
let Monster = cc.Sprite.extend({
    _monsterAsset : null,
    _damage : null,
    _speed : null,
    _health : null,
    _animationDirection : null,
    _direction : cc.p(),

    digitalDirectionToDirection : function(digitalDirection) {
        if (digitalDirection.x === 0) {
            if (digitalDirection.y > 0) {
                return "BOTTOM"
            } else {
                return "TOP"
            }
        } else {
            if (digitalDirection.x > 0) {
                return "RIGHT"
            } else {
                return "LEFT"
            }
        }
    },

    /**
     * Khởi tạo animation từ đường đi có sẵn của quái
     * @param {cc.Point[]} path
     */
    generateMovingActionByPath : function(path) {
        let animationSequence;
        animationSequence = [];

        if (path.length === 0) {
            let animation = this.createDirectionAnimationFromDirection("TOP")
            animationSequence.push(animation)
        } else {
            // xử lý trở lại node trước để không thực hiện hành động bay chéo
            let firstNodePosition = Utils.fromMatrixToPosition(path[0])
            let currentPosition = this.getPosition()
            let direction = Utils.directionFromTwoPosition(firstNodePosition, currentPosition)
            let animation = this.createDirectionAnimationFromDirection(this.digitalDirectionToDirection(direction))
            let moving = cc.moveTo(1, firstNodePosition)
            let spawn = cc.spawn(animation, moving)
            animationSequence.push(spawn)

            // xử lý cho chuỗi đường đi đã được cấp sẵn
            this.stopAllActions()
            for (let i = 1; i < path.length; i++) {
                let dx = path[i].x - path[i - 1].x
                let dy = path[i].y - path[i - 1].y
                let distance = Math.abs(dx + dy)
                let direction = cc.p({
                    x : dx / distance,
                    y : dy / distance
                })
                let animation = this.createDirectionAnimationFromDirection(this.digitalDirectionToDirection(direction))
                let moving = cc.moveTo(1, Utils.fromMatrixToPosition(path[i]))
                let spawn = cc.spawn(animation, moving)
                animationSequence.push(spawn)
            }
            animationSequence.push(cc.CallFunc(function() {
                this.setVisible(false)
            }, this))
        }
        this.runAction(cc.sequence(animationSequence))
    },

    ctor : function(health, damage, speed, monsterAsset, map) {
        this._animationDirection = []
        this._super()
        this.setHealth(health)
        this.setDamage(damage)
        this.setSpeed(speed)
        this.setMonsterAsset(monsterAsset)
        this.runAction(this.createDirectionAnimationFromDirection("RIGHT"))
        let spriteFrame = cc.spriteFrameCache.getSpriteFrame("monster_assassin_run_0000.png")
        this.setSpriteFrame(spriteFrame)
    },

    getDirection : function() {
        return this._direction
    },

    setDirection : function(direction) {
        this._direction = direction
    },

    setMonsterAsset : function(monsterAsset) {
        this._monsterAsset = monsterAsset
    },

    getMonsterAsset : function() {
        return this._monsterAsset
    },

    getDamage : function() {
        return this._damage
    },

    setDamage : function(damage) {
        this._damage = damage
    },

    getSpeed : function() {
        return this._speed
    },

    setSpeed : function(speed) {
        this._speed = speed
    },

    getHealth : function() {
        return this._health
    },

    setHealth : function(health) {
        this._health = health
    },

    addDirectionAnimation : function(newAnimation) {
        this._animationDirection.push(newAnimation)
    },

    /**
     * Lấy ra animation của hướng cần sử dụng
     * @param {Monster.BOTTOM || Monster.TOP || Monster.BOTTOM_LEFT || Monster.BOTTOM_RIGHT || Monster.TOP_LEFT || Monster.TOP_RIGHT} direction
     * @returns {cc.Animate}
     */
    getAnimationDirection : function(direction) {
        return this._animationDirection[direction]
    },

    /**
     *
     * @param {string} direction
     * @returns {cc.Animate}
     * @example
     * this.createDirectionAnimationFromDirection(Monster.LEFT)
     */
    createDirectionAnimationFromDirection : function(direction) {
        if (direction === "LEFT") {
            direction = "RIGHT"
        }
        let monsterAsset = this.getMonsterAsset()
        let sequenceIndex = monsterAsset[Monster.assetName[Monster[direction]]]
        return this.createAnimation(sequenceIndex.start, sequenceIndex.end)
    },

    /**
     * Tạo animation từ chuỗi các frame riêng lẻ
     * @param {number} startFrame Vị trí frame bắt đầu
     * @param {number} endFrame Vị trí frame kết thúc
     * @returns {cc.Animate}
     **/
    createAnimation : function(startFrame, endFrame) {
        let animation = new cc.Animation()
        let monsterAsset = this.getMonsterAsset()
        for (let i = startFrame; i <= endFrame; i++) {
            let frameName = monsterAsset.prefixFile + ((i <10) ? "0" : "") + i + monsterAsset.suffixFile
            let spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName)
            animation.addSpriteFrame(spriteFrame)
        }
        animation.setLoops(4)
        animation.setDelayPerUnit(0.25 / monsterAsset.directionFrame)
        return new cc.Animate(animation)
    },
})


Monster.NUMBER_ANIMATION_SPRITE = 10
Monster.BOTTOM = 0
Monster.BOTTOM_RIGHT = 1
Monster.RIGHT = 2
Monster.TOP_RIGHT = 3
Monster.TOP = 4
Monster.TOP_LEFT = 5
Monster.LEFT = 6
Monster.BOTTOM_LEFT = 7
Monster.assetName = [
    "bottomFrameList",
    "bottomRightFrameList",
    "rightFrameList",
    "topRightFrameList",
    "topFrameList"
]