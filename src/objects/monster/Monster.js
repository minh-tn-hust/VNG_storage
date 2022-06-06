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
                return "TOP"
            } else {
                return "BOTTOM"
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
     * Hàm nhận vào vị trí bắt đầu của một node và vị trí kết thúc của một node, thực hiện sinh ra hành động và di chuyển đúng hướng,
     * vị trí truyền vào hàm này là vị trí tuyệt đối (vị trí trên màn hình) chứ không phải là vị trí trong ma trận
     * @param {cc.Point} currentNode
     * @param {cc.Point} nextNode
     * @return {cc.Action[]}
     */
    generateMovingFromNodeToNode : function(currentNode, nextNode) {
        let subSequenceAnimation
        subSequenceAnimation= []
        let dx = nextNode.x - currentNode.x
        let dy = nextNode.y - currentNode.y
        let distance = Math.abs(dx + dy)
        let direction = cc.p(dx / distance, dy / distance)
        let stringDirection = this.digitalDirectionToDirection(direction)
        let animation
        if (stringDirection === "LEFT") {
            animation = this.createDirectionAnimationFromDirection("RIGHT", distance / this.getSpeed())
        } else {
            animation = this.createDirectionAnimationFromDirection(stringDirection, distance / this.getSpeed())
        }
        let moving = cc.moveTo(distance / this.getSpeed(), nextNode)
        let spawn = cc.spawn(animation, moving)
        let flipAgain = cc.CallFunc(function() {
            this.flippedX = false
        }, this)

        if (stringDirection === "LEFT") {
            let flipCallFunc = cc.CallFunc(function(){
                this.flippedX = true
            }, this )
            subSequenceAnimation.push(flipCallFunc)
            subSequenceAnimation.push(spawn)
        } else {
            subSequenceAnimation.push(flipAgain)
            subSequenceAnimation.push(spawn)
        }
        return subSequenceAnimation
    },

    /**
     * Khởi tạo animation từ đường đi có sẵn của quái
     * @param {cc.Point[]} path
     */
    generateMovingActionByPath : function(path) {
        let animationSequence;
        animationSequence = [];

        let currentPosInMatrix = Utils.mappingPositionToMatrix(this.getPosition())
        if (path.length === 0) {
        } else {
            // kiểm tra xem vị trí hiện tại có cần thiết phải đi về trung tâm node hay không
            let firstNodePosition = Utils.fromMatrixToPosition(path[0])
            let currentNodePosition = Utils.fromMatrixToPosition(Utils.mappingPositionToMatrix(this.getPosition()))
            let currentPosition = this.getPosition()
            let internalVector = cc.p(currentPosition.x - currentNodePosition.x, currentPosition.y - currentNodePosition.y)
            let externalVector = cc.p(firstNodePosition.x - currentNodePosition.x, firstNodePosition.y - currentNodePosition.y)

            if (internalVector.x * externalVector.x + internalVector.y * externalVector.y > 0) {
                let subSequenceAnimation = this.generateMovingFromNodeToNode(currentPosition, firstNodePosition)
                animationSequence.push(...subSequenceAnimation)
            } else {
                let subSequenceAnimation = this.generateMovingFromNodeToNode(currentPosition, currentNodePosition)
                animationSequence.push(...subSequenceAnimation)
                path.unshift(Utils.mappingPositionToMatrix(this.getPosition()))
            }

            // xử lý cho chuỗi đường đi đã được cấp sẵn
            this.stopAllActions()
            for (let i = 1; i < path.length; i++) {
                let subSequenceAnimation = this.generateMovingFromNodeToNode(Utils.fromMatrixToPosition(path[i - 1]), Utils.fromMatrixToPosition(path[i]))
                animationSequence.push(...subSequenceAnimation)
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
        this.runAction(this.createDirectionAnimationFromDirection("RIGHT", 1))
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
     * Trả về chuỗi hành đồng theo đúng hướng và thời gian timing
     * @param {string} direction Hướng của animation
     * @param {number} timing Thời gian cần thiết để thực hiện animation
     * @returns {cc.Animate}
     * @example
     * this.createDirectionAnimationFromDirection(Monster.LEFT)
     */
    createDirectionAnimationFromDirection : function(direction, timing) {
        if (direction === "LEFT") {
            direction = "RIGHT"
        }
        let monsterAsset = this.getMonsterAsset()
        let sequenceIndex = monsterAsset[Monster.assetName[Monster[direction]]]
        return this.createAnimation(sequenceIndex.start, sequenceIndex.end, timing)
    },

    /**
     * Tạo animation từ chuỗi các frame riêng lẻ
     * @param {number} startFrame Vị trí frame bắt đầu
     * @param {number} endFrame Vị trí frame kết thúc
     * @param {number} timing Thời gian để thực hiện animation
     * @returns {cc.Animate}
     **/
    createAnimation : function(startFrame, endFrame, timing) {
        let animation = new cc.Animation()
        let monsterAsset = this.getMonsterAsset()
        for (let i = startFrame; i <= endFrame; i++) {
            let frameName = monsterAsset.prefixFile + ((i <10) ? "0" : "") + i + monsterAsset.suffixFile
            let spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName)
            animation.addSpriteFrame(spriteFrame)
        }
        animation.setLoops(4 * timing)
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