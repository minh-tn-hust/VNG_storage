/**
 * Lớp cha chứa việc khởi tạo các lớp con cơ bản, khởi tạo các animation ở các hướng
 * @param {number} [health] Số lượng máu cúa quái
 * @param {number} [damage] Lượng damage lên trụ của quái
 * @param {object} [monsterAsset] một object chứa config về animation của quái
 **/
let Monster = cc.Class.extend({
    _monsterAsset : null,
    _damage : null,
    _speed : null,
    _health : null,
    _animationDirection : [],
    _direction : cc.p(),


    ctor : function(health, damage, monsterAsset) {
        this.setHealth(health)
        this.setDamage(damage)
        this.setMonsterAsset(monsterAsset)
        this.createDirectionAnimation()
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
     * Tạo animation cho 8 hướng mà quái có thể sẽ đi được
     */
    createDirectionAnimation : function () {
        let monsterAsset = this.getMonsterAsset()
        for (let direction = Monster.BOTTOM; direction <= Monster.TOP; direction++) {
            let sequenceIndex = monsterAsset[Monster.assetName[direction]]
            let directionAnimation = this.createAnimation(sequenceIndex.start, sequenceIndex.end)
            this.addDirectionAnimation(directionAnimation)
        }
        cc.Sprite()
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
        animation.setLoops(true)
        animation.setDelayPerUnit(0.2 / monsterAsset.directionFrame)
        return cc.RepeatForever(cc.animate(animation))
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