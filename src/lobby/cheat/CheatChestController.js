var CheatChestController = cc.Class.extend({
    ctor: function (treasureLayerController, cheatChestButton) {
        // this._super();
        this.treasureLayerController = treasureLayerController;
        this.cheatChestButton = cheatChestButton;
        this.cheatChestButton.addTouchEventListener(this.eventCheatChest,this);
    },

    eventCheatChest: function (sender,type) {
        Util.uiReact(sender,type,function () {
            this.treasureLayerController.newTreasure();
        }.bind(this));
    }
})