/**
 * Lớp cha chứa việc khởi tạo các lớp con cơ bản, khởi tạo các animation ở các hướng
 * @param {number} [health] Số lượng máu cúa quái
 * @param {number} [damage] Lượng damage lên trụ của quái
 * @param {number} [speed] chir số tốc độ set cho quái hiện tại, được tính bằng thời gian đi từ trung tâm ô này tới trung tâm của ô trong hàng / cốt
 * @param {object} [monsterAsset] một object chứa config về animation của quái
 **/
let Monster = cc.Sprite.extend({
    _monsterAsset : null,
    _damage : null,
    _speed : null,
    _health : null,
    _direction : cc.p(),
    _path : [],

    /**
     * Trả về đường đi hiện tại mà quái đang thực hiện
     * @returns {object[]}
     */
    getPath : function() {
        return this._path

    },
    setPath : function(path) {
        this._path = [...path]
    },

    ctor : function(health, damage, speed, monsterAsset) {
        this._super()
        this.setHealth(health)
        this.setDamage(damage)
        this.setSpeed(speed)
        this.setPath([])
        this.setMonsterAsset(monsterAsset)
        this.runAction(this.createDirectionAnimationFromDirection("RIGHT", 1))
        let spriteFrame = cc.spriteFrameCache.getSpriteFrame("monster_assassin_run_0000.png")
        this.setSpriteFrame(spriteFrame)
    },

    /**
     * Convert từ tọa độ sang hướng di chuyển
     * @param {cc.Point} digitalDirection
     * @returns {string}
     */
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
     * Kiểm tra xem đường đi trước khi map update có phù hợp với nó hay không, nếu một ô trong đường đi hiện tại
     * bị thay đổi thành vật cản thì sẽ trả về true
     * @param {object[][]} newMap bản đồ hiện tại đang có trên map
     * @return {boolean}
     */
    needChangePath : function(newMap){
        let path = this.getPath()
        let beginCheck = false
        let currentMatrixPos = Utils.mappingPositionToMatrix(this.getPosition())
        for (let i = 0; i < path.length; i++) {
            let node = path[i]
            if (currentMatrixPos.x === node.x && currentMatrixPos.y === node.y) {
                beginCheck = true
            }

            if (beginCheck) {
                if (newMap[node.x][node.y].type === Map.CELL_TYPE.TREE) {
                    return true
                }
            }
        }
        return false
    },

    removeFirstThreePath : function() {
        let path = this.getPath()
        path.shift()
        path.shift()
    },

    createFirstThreePath : function() {
        this.stopAllActions()
        let path = [...this.getPath()]
        let nextThreeNode = []
        const FRONT = 0
        let counter = 2

        while(counter !== 0 && path.length !== 0) {
            let node = path[FRONT]
            path.shift()
            nextThreeNode.push(node)
            counter--
        }

        let animation = []

        if (nextThreeNode.length !== 0) {
            animation = this.generate3MovingAction(nextThreeNode)
        }

        let callBack
        if (path.length !== 0) {
            callBack = cc.CallFunc(function(){
                this.removeFirstThreePath()
                this.createFirstThreePath()
            }, this)
        } else {
            callBack = cc.CallFunc(function() {
                this.removeFirstThreePath()
                this.setVisible(false)
            }, this)
        }

        animation.push(callBack)
        let animate = cc.sequence(animation)
        this.runAction(animate)
    },

    generate3MovingAction : function(path) {
        let animationSequence;
        animationSequence = [];

        if (path.length === 0) {
        } else {
            // di chuyển về tâm của ô nếu như vị trí tiếp theo không di chuyển tiếp được
            // animationSequence.push(...this.needToMoveToCenter(path[0]))

            // xử lý cho chuỗi đường đi đã được cấp sẵn
            try {
                this.stopAllActions()
                for (let i = 0; i < path.length; i++) {
                    let subSequenceAnimation
                    if (i ===0) {
                        subSequenceAnimation = this.generateMovingFromNodeToNode(this.getPosition(), Utils.fromMatrixToPosition(path[0]))
                    } else {
                        subSequenceAnimation = this.generateMovingFromNodeToNode(Utils.fromMatrixToPosition(path[i - 1]), Utils.fromMatrixToPosition(path[i]))
                    }
                    animationSequence.push(...subSequenceAnimation)
                }
                return animationSequence
            } catch (error) {
                cc.log(JSON.stringify(error))
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
        // let spawn = cc.spawn(moving)
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
     * Kiểm tra xem lần di chuyển hiện tại có cần phải đi về trung tâm của cell hay không
     * @param {cc.Point} nextNode
     * @returns {[]}
     */
    needToMoveToCenter : function(nextNode) {
        let animationSequence = []
        let path = this.getPath()
        let firstNodePosition = Utils.fromMatrixToPosition(nextNode)
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
        return animationSequence
    },
    /**
     * Khởi tạo animation từ đường đi có sẵn của quái
     * @param {cc.Point[]} path
     */
    generateMovingActionByPath : function(path) {
        this.setPath(path)
        let animationSequence;
        animationSequence = [];

        if (path.length === 0) {
        } else {
            // di chuyển về tâm của ô nếu như vị trí tiếp theo không di chuyển tiếp được
            animationSequence.push(...this.needToMoveToCenter(path[0]))

            // xử lý cho chuỗi đường đi đã được cấp sẵn
            try {
                this.stopAllActions()
                for (let i = 1; i < path.length; i++) {
                    let subSequenceAnimation = this.generateMovingFromNodeToNode(Utils.fromMatrixToPosition(path[i - 1]), Utils.fromMatrixToPosition(path[i]))
                    animationSequence.push(...subSequenceAnimation)
                }
                animationSequence.push(cc.CallFunc(function() {
                    this.setVisible(false)
                    let parentLayer = this.getParent()
                    parentLayer.removeInvisibleMonster()
                }, this))
                let nextAction = cc.sequence(animationSequence)
                this.runAction(nextAction)
            } catch (error) {
                cc.log(JSON.stringify(error))
            }
        }
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
        animation.setLoops(2 * timing)
        animation.setDelayPerUnit(0.5 / monsterAsset.directionFrame)
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