var TowerSprite = cc.Sprite.extend({

    initProperty: function () {
        this._assetConfig=null;
        this._direction = cc.p(-1,0);
        this._who = null;
        this._effect = null;
        this._type = null;
        this._inUse = null;
        this._target = null;
        this._gunSprite = null;
    },

    /**
     * @param {TowerUtil.TARGET_MODE.NEAREST,
     * TowerUtil.TARGET_MODE.FARTHEST,
     * TowerUtil.TARGET_MODE.HIGHEST_BLOOD,
     * TowerUtil.TARGET_MODE.LOWEST_BLOOD} targetMode
     */
    setTargetMode: function (targetMode) { this.targetMode = targetMode; },
    setTarget : function(target) { this._target = target },
    setAsset : function(asset) { this._assetConfig = asset },
    setDirection : function(direction) { this._direction = direction },
    setWho : function(who) { this._who = who },
    /** @param {number} towerRange */
    setTowerRange: function (towerRange) { this.towerRange = towerRange; },
    setSpeed: function () { this.speed = 0.6; },
    setTower: function (tower) {this.tower= tower;},

    getTarget : function() { return this._target },
    getAsset : function() { return this._assetConfig },
    getDirection : function() { return this._direction },
    getWho : function() { return this._who },
    getTowerRange: function () { return this.towerRange; },
    getTargetMode: function () { return this.targetMode; },
    getSpeed: function () { return this.speed; },
    getTower: function () {return this.tower;},

    ctor : function(tower,assetConfig) {
        this._super()
        this.initProperty();
        this.initAnimation()
        this.setAsset(assetConfig);
        this.setTower(tower);
        this.setWho(tower.getWho());
        this.setPosition(tower.getScreenPosition());
        this.init(assetConfig);

        this.setTargetMode(TowerUtil.TARGET_MODE.NEAREST);
        this.setTowerRange(tower.getRangeSize());
        this.setSpeed();
    },

    initAnimation: function (){

    },



    /**
     * Khởi tạo trụ sử dụng asset config được tạo ở TowerConfig
     * @param assetConfig
     */
    init : function(assetConfig) {
        // thực hiện khởi tạo cách cho animtion
        this.createAnimationCache()
        this._gunSprite = new cc.Sprite()
        this._gunSprite.setPosition(165, 165)
        this.addChild(this._gunSprite)

        // khởi tạo Animation default cho trụ
        let aDirection = cc.animationCache.getAnimation("A" + assetConfig.name)
        this.flippedX = true
        let aDirectionAnim = cc.animate(aDirection)
        this.runAction(cc.repeatForever(aDirectionAnim))

        // khởi tạo Animation default cho súng
        let a1Direction = cc.animationCache.getAnimation("A" + assetConfig.name + "1")
        this.flippedX = true
        let a1DirectionAnim = cc.animate(a1Direction)
        this._gunSprite.flippedX = true
        this._gunSprite.runAction(cc.repeatForever(a1DirectionAnim))

        // gọi hàm update để kiểm tra và loại bỏ các target ngoài taamf
        this.scheduleUpdate()
    },

    update : function(dt) {
        let target = this.getTower().getTarget()
        if (target !== null && this.getAsset().numberOfDirection!==1 ) {
            let targetPosition = BattleUtil.fromModelPositionToPosition(
                target.getPosition(),this.getWho());
            let towerPosition = this.getPosition();

            // cập nhất hướng quay hiện tại cho trụ
            let newDirection = cc.p(targetPosition.x - towerPosition.x, targetPosition.y - towerPosition.y)
            this.changeDirection(newDirection)

            // kiểm tra những target nếu như khoảng cách tới trụ > 100 thì thực hiện loại bỏ
            if (Math.sqrt(newDirection.x * newDirection.x + newDirection.y * newDirection.y) > 100){
                this.setTarget(null)
            }
        }
    },

    /**
     * Khởi tạo cache animation để sử dụng
     */
    createAnimationCache : function() {
        let assetConfig = this.getAsset()
        if(cc.animationCache.getAnimation("A" + assetConfig.name) === null) {
            cc.spriteFrameCache.addSpriteFrames(assetConfig.asset.plist)

            // khởi tạo các animation khác dành cho base trụ
            for (let j = 0; j < assetConfig.numberOfDirection; j++){
                let animFrames = []
                let frame, animFrame
                let str = ""

                // load default hiệu ứng tấn công
                for (let i = assetConfig[TowerConfigRender.direction[j]].start; i <= assetConfig[TowerConfigRender.direction[j]].end; i++) {
                    str = assetConfig.attack[0].prefix + Util.get3DigitNumber(i) + assetConfig.attack[0].suffix
                    frame = cc.spriteFrameCache.getSpriteFrame(str)
                    animFrame = new cc.AnimationFrame(frame, 1)
                    animFrames.push(animFrame)
                }

                let animation = new cc.Animation(animFrames, 0.05)
                cc.animationCache.addAnimation(animation, TowerConfigRender.direction[j] + assetConfig.name)
            }

            // khởi tạo các animation khác dành cho súng
            for (let j = 0; j < assetConfig.numberOfDirection ; j++){
                let animFrames = []
                let frame, animFrame
                let str = ""

                // load default hiệu ứng tấn công
                for (let i = assetConfig[TowerConfigRender.direction[j]].start; i <= assetConfig[TowerConfigRender.direction[j]].end; i++) {
                    str = assetConfig.attack[1].prefix + Util.get3DigitNumber(i) + assetConfig.attack[1].suffix
                    frame = cc.spriteFrameCache.getSpriteFrame(str)
                    animFrame = new cc.AnimationFrame(frame, 1)
                    animFrames.push(animFrame)

                }
                let animation = new cc.Animation(animFrames, 0.05)
                cc.animationCache.addAnimation(animation, TowerConfigRender.direction[j] + assetConfig.name + "1")
            }
        }
    },

    /**
     * Thực hiện thay đổi hướng bắn của trụ, nếu như hướng mới trùng với hướng hiện tại thì
     * không thực hiện thay đội
     * @param newDigitalDirection
     */
    changeDirection : function(newDigitalDirection) {
        let oldDigitalDirection = this.getDirection()
        this.setDirection(newDigitalDirection)
        let oldDirection = Util.fromTowerDigitalToDirection(oldDigitalDirection)
        let newDirection = Util.fromTowerDigitalToDirection(newDigitalDirection)
        this.runAnimationByDirection(!(oldDirection === newDirection))
    },

    /**
     * Chạy animation dựa vào hướng hiện tại của quái,
     * sử dụng biến needToChangeAnimation để kiểm tra xem có cần cập nhật lài
     * animation hay không
     * @param {boolean} needToChangeAnimation
     */
    runAnimationByDirection : function(needToChangeAnimation) {
        if (needToChangeAnimation) {
            let assetConfig = this.getAsset()
            this.stopAllActions()
            this._gunSprite.stopAllActions()
            let digitalDirection = this._direction
            let direction = Util.fromTowerDigitalToDirection(digitalDirection)

            if (direction.length === 2) {
                this.flippedX = true
                this._gunSprite.flippedX = true
            } else {
                this.flippedX = false
                this._gunSprite.flippedX = false
            }
            let animDirection = cc.animationCache.getAnimation(direction[0] + assetConfig.name)
            let animDirection1 = cc.animationCache.getAnimation(direction[0] + assetConfig.name + "1")
            animDirection.setDelayPerUnit(0.05)
            animDirection1.setDelayPerUnit(0.05)
            this.runAction(cc.repeatForever(cc.animate(animDirection)))
            this._gunSprite.runAction(cc.repeatForever(cc.animate(animDirection1)))
        }
    },

    clearAnimationCache : function(){
        let assetConfig = this.getAsset()
        for (let i = 0; i < TowerSprite.direction.length; i++) {
            cc.animationCache.removeAnimation( TowerConfigRender.direction[i] + assetConfig.name)
        }
    },
})

TowerSprite.createTowerSprite = function (cid,tower) {
    switch (cid) {
        case 0:
            return new CannonTowerSprite(tower);
        case 1:
            return new WizardTowerSprite(tower);
        case 2:
            return new BoomerangTowerSprite(tower);
        case 3:
            return new OilGunTowerSprite(tower);
        case 4:
            return new IceGunTowerSprite(tower);
        case 5:
        case 6:
            return new AttackSpeedTowerSprite(tower);
    }
}