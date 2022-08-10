var TowerSprite = cc.Sprite.extend({

    initProperty: function () {
        this._assetConfig=null;
        this._direction = cc.p(1,0);
        this._who = null;
        this._effect = null;
        this._type = null;
        this._inUse = null;
        this._target = null;
        this._gunSprite = null;
        this._pedestalSprite = null;
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
    setPedestalSprite : function (pedestalSprite) {
        this._pedestalSprite = pedestalSprite;
        this._pedestalSprite.retain();
    },

    getTarget : function() { return this._target },
    getAsset : function() { return this._assetConfig },
    getDirection : function() { return this._direction },
    getWho : function() { return this._who },
    getTowerRange: function () { return this.towerRange; },
    getTargetMode: function () { return this.targetMode; },
    getSpeed: function () { return this.speed; },
    getTower: function () {return this.tower;},
    getPedestalSprite: function () {return this._pedestalSprite;},
    getLevel: function () {return this.getTower().getLevel();},

    ctor : function(tower,assetConfig) {
        this._super()
        this.initProperty();
        // this.initAnimation()
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
        this.createAnimationCache(this.getLevel());

        this.setPedestalSprite(new cc.Sprite("res/battle_asset/battle_tower_pedestal_wood.png"));
        this.getPedestalSprite().setPosition(165,165);
        this.addChild(this.getPedestalSprite(),-100);

        this._gunSprite = new cc.Sprite()
        this._gunSprite.setPosition(165, 165)
        this.addChild(this._gunSprite);



        let defaultDirection = Util.fromTowerDigitalToDirection(this.getDirection());
        // cc.log("Default direction: ",defaultDirection);
        // khởi tạo Animation default cho trụ
        // let aDirection = cc.animationCache.getAnimation("A" + assetConfig.name)
        defaultDirection = "A";
        let aDirection = cc.animationCache.getAnimation(
            this.getTowerAnimString(defaultDirection,"idle"));
        this.flippedX = true
        let aDirectionAnim = cc.animate(aDirection)
        this.runAction(cc.repeatForever(aDirectionAnim))

        // khởi tạo Animation default cho súng
        // let a1Direction = cc.animationCache.getAnimation("A" + assetConfig.name + "1")
        let a1Direction = cc.animationCache.getAnimation(
            this.getGunAnimString(defaultDirection,"idle",this.getLevel()));
        this.flippedX = true
        let a1DirectionAnim = cc.animate(a1Direction)
        this._gunSprite.flippedX = true
        this._gunSprite.runAction(cc.repeatForever(a1DirectionAnim))

        // gọi hàm update để kiểm tra và loại bỏ các target ngoài taamf
        this.scheduleUpdate()
    },

    update : function(dt) {
        let target = this.getTower().getTarget()
        // cc.log("Direction: ",Util.fromTowerDigitalToDirection(this.getDirection()))
        if (target !== null && this.getAsset().numberOfDirection!==1 ) {
            let targetPosition = BattleUtil.fromModelPositionToPosition(
                target.getPosition(),this.getWho());
            let towerPosition = this.getPosition();

            // cập nhất hướng quay hiện tại cho trụ
            let newDirection = cc.p(targetPosition.x - towerPosition.x, targetPosition.y - towerPosition.y)
            this.changeDirection(newDirection)

            // kiểm tra những target nếu như khoảng cách tới trụ > 100 thì thực hiện loại bỏ
            if (Math.sqrt(
                newDirection.x * newDirection.x
                + newDirection.y * newDirection.y) > this.getTower().getRangeSize()){
                this.setTarget(null)
            }
        }
    },

    upgrade: function(){
        this.createAnimationCache(this.getLevel());
        this.runAnimationByDirection(true);
    },

    /**
     * Khởi tạo cache animation để sử dụng
     * @param {number} level (from 1-3)
     */
    createAnimationCache : function(level) {
        let assetConfig = this.getAsset();
        let modes= ["attack","idle"];
        for (let mode of modes) {
            if (cc.animationCache.getAnimation("A" + assetConfig.name) === null) {
                for (var plist of assetConfig.asset.plist) {
                    cc.spriteFrameCache.addSpriteFrames(plist);
                }
                // cc.spriteFrameCache.addSpriteFrames(assetConfig.asset.plist)

                // khởi tạo các animation khác dành cho base trụ
                for (let j = 0; j < assetConfig.numberOfDirection; j++) {
                    let animFrames = []
                    let frame, animFrame
                    let str = ""

                    // load default hiệu ứng
                    for (let i = assetConfig["directionConfig"][mode][TowerConfigRender.direction[j]].start;
                         i <= assetConfig["directionConfig"][mode][TowerConfigRender.direction[j]].end;
                         i++) {
                        // str = assetConfig.attack[0].prefix + Util.get3DigitNumber(i) + assetConfig.attack[0].suffix
                        str = assetConfig[mode][0].prefix + Util.get3DigitNumber(i) + assetConfig[mode][0].suffix
                        frame = cc.spriteFrameCache.getSpriteFrame(str)
                        animFrame = new cc.AnimationFrame(frame, 1)
                        animFrames.push(animFrame)
                    }

                    let animation = new cc.Animation(animFrames, 0.05)
                    cc.animationCache.addAnimation(animation, TowerConfigRender.direction[j] + assetConfig.name+mode)
                }
            }
            if (cc.animationCache.getAnimation("A" + assetConfig.name+mode+level) === null) {
                // khởi tạo các animation khác dành cho súng
                // cc.log("add animation: animDirection",level);
                for (let j = 0; j < assetConfig.numberOfDirection; j++) {
                    let animFrames = []
                    let frame, animFrame
                    let str = ""

                    // load default hiệu ứng tấn công
                    for (let i = assetConfig["directionConfig"][mode][TowerConfigRender.direction[j]].start;
                         i <= assetConfig["directionConfig"][mode][TowerConfigRender.direction[j]].end;
                         i++) {
                        // str = assetConfig.attack[level].prefix + Util.get3DigitNumber(i) + assetConfig.attack[level].suffix
                        str = assetConfig[mode][level].prefix + Util.get3DigitNumber(i) + assetConfig[mode][level].suffix
                        // cc.log("anim string name: ",str);
                        frame = cc.spriteFrameCache.getSpriteFrame(str)
                        // cc.log("FRAME:", frame);
                        animFrame = new cc.AnimationFrame(frame, 1)
                        animFrames.push(animFrame)

                    }
                    let animation = new cc.Animation(animFrames, 0.05)
                    cc.animationCache.addAnimation(animation, TowerConfigRender.direction[j] + assetConfig.name+mode+level);
                }
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
            // let assetConfig = this.getAsset()
            // this.stopAllActions()
            // this._gunSprite.stopAllActions()
            // let digitalDirection = this._direction
            // let direction = Util.fromTowerDigitalToDirection(digitalDirection)
            //
            // if (direction.length === 2) {
            //     this.flippedX = true
            //     this._gunSprite.flippedX = true
            // } else {
            //     this.flippedX = false
            //     this._gunSprite.flippedX = false
            // }
            // // let animDirection = cc.animationCache.getAnimation(direction[0] + assetConfig.name)
            // // let animDirection1 = cc.animationCache.getAnimation(direction[0] + assetConfig.name + this.getLevel());
            // let animDirection = cc.animationCache.getAnimation(
            //     this.getTowerAnimString(direction[0],"idle"))
            // let animDirection1 = cc.animationCache.getAnimation(
            //     this.getGunAnimString(direction[0],"idle",this.getLevel()));
            let newAnim = this.getAnimToChangeDirection("idle");
            let animDirection = newAnim[0];
            let animDirection1 = newAnim[1];
            animDirection.setDelayPerUnit(0.05);
            animDirection1.setDelayPerUnit(0.05);
            this.stopTowerAndGunActions();
            this.runAction(cc.repeatForever(cc.animate(animDirection)))
            this._gunSprite.runAction(cc.repeatForever(cc.animate(animDirection1)))
        }
    },

    runAttackAnimation: function () {
        // this.stopAllActions();
        // this._gunSprite.stopAllActions();
        // let digitalDirection = this._direction;
        // let direction = Util.fromTowerDigitalToDirection(digitalDirection);
        //
        // if (direction.length === 2) {
        //     this.flippedX = true;
        //     this._gunSprite.flippedX = true;
        // } else {
        //     this.flippedX = false;
        //     this._gunSprite.flippedX = false;
        // }
        let attackAnim = this.getAnimToChangeDirection("attack");
        let attackTowerAnim = attackAnim[0];
        let attackGunAnim = attackAnim[1];

        let idleAnim = this.getAnimToChangeDirection("idle");
        let idleTowerAnim = idleAnim[0];
        let idleGunAnim = idleAnim[1];

        attackTowerAnim.setDelayPerUnit(0.05);
        attackGunAnim.setDelayPerUnit(0.05);
        idleTowerAnim.setDelayPerUnit(0.05);
        idleGunAnim.setDelayPerUnit(0.05);

        this.stopTowerAndGunActions();
        this.runAction(cc.sequence(
            cc.animate(attackTowerAnim),
            cc.callFunc(function(){
                 this.runAction(cc.repeatForever(cc.animate(idleTowerAnim)))
            }.bind(this))
            )
        );
        this._gunSprite.runAction(cc.sequence(
            cc.animate(attackGunAnim),
            cc.callFunc(function(){
                this._gunSprite.runAction(cc.repeatForever(cc.animate(idleGunAnim)))
            }.bind(this))
            )
        );
    },

    stopTowerAndGunActions: function () {
        this.stopAllActions();
        this._gunSprite.stopAllActions();
    },

    getAnimToChangeDirection: function (mode) {
        let digitalDirection = this._direction;
        let direction = Util.fromTowerDigitalToDirection(digitalDirection);

        // cc.log("Direction in prepare: ",direction);
        if (direction.length === 2) {
            this.flippedX = true;
            this._gunSprite.flippedX = true;
        } else {
            this.flippedX = false;
            this._gunSprite.flippedX = false;
        }
        let animDirection = cc.animationCache.getAnimation(
            this.getTowerAnimString(direction[0],mode));
        let animDirection1 = cc.animationCache.getAnimation(
            this.getGunAnimString(direction[0],mode,this.getLevel()));
        return [animDirection,animDirection1];
    },

    /**
     *
     * @param direction
     * @param {"idle","attack"}mode
     * @returns {string}
     */
    getTowerAnimString: function (direction,mode) {
        return direction+this.getAsset().name+mode;
    },

    /**
     *
     * @param direction
     * @param {"idle","attack"}mode
     * @param {number}level 1-3
     * @returns {string}
     */
    getGunAnimString: function (direction,mode,level) {
        return direction+this.getAsset().name+mode+level;
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