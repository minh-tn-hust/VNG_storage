var AttackTowerSprite=  TowerSprite.extend({

    ctor: function (tower,assetConfig) {
        this._super(tower,assetConfig);
        // this.setModelTargetTick(JSON.parse(JSON.stringify(tower.getTarget())));
        // this.schedule(this.fire,this.getSpeed());
    },

    /**
     * Hàm bắn của trụ, được gọi theo thời gian được thiết lập theo tốc độ bắn của trụ
     */
    fire : function() {
        let target = this.getTower().getTarget()
        if (target !== null && target.getCanTarget()) {

            // cc.log("Before bullet");
            var bullet = this.createBullet();
            // cc.log("After bullet")
            this.getParent().addChild(bullet,1,1000);
            bullet.setTarget(target);
            bullet.onFire();

            // this.animOnFire();
            let currentHP = target.getHp()
            target.changeHP(currentHP - 1)
            if (target.getHp() <= 0) {
                this.setTarget(null)
            }
        }
    },

    /**
     * return {BulletSprite} bullet
     */
    createBullet: function () {},

    /**
     * run animation when fires
     */
    animOnFire: function () {},
})