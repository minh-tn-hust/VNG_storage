var OneChestAtATimePopup = ConfirmChooseChestPopup.extend({
    ctor: function (controller,metadata) {
        this._super(controller,metadata);
    },

    setupButton: function () {
        // khởi tạo sự kiện bất kì
        let openButton = Util.getChildByName(this.getPopupLayer(), "OpenChest")[0]
        // openButton.addTouchEventListener(function(button, event) {
        //     Util.uiReact(button, event, function() {
        //         this.getTreasureLayerController().chooseTreasure(this.getIndex());
        //         this.closePopupLayer()
        //     }.bind(this));
        // }, this);

        var goldIcon = Util.getChildByName(this.getPopupLayer(),"ResourceIcon")[0];
        var oneChestAtAtTimeLabel = new ccui.Text();
        oneChestAtAtTimeLabel.setString("Mỗi thời điểm chỉ mở khóa 1 rương");
        oneChestAtAtTimeLabel.setFontName("SVN-SupercellMagic");
        oneChestAtAtTimeLabel.setFontSize(25);
        this.getPopupLayer().addChild(oneChestAtAtTimeLabel);
        oneChestAtAtTimeLabel.setPosition(openButton.getPosition());
        oneChestAtAtTimeLabel.x += 100;
        oneChestAtAtTimeLabel.y += 350;
        // openButton.addChild(oneChestAtAtTimeLabel);
        // oneChestAtAtTimeLabel.setPosition(94,85);
        // oneChestAtAtTimeLabel.setPosition(94,40);
        openButton.y-=10;
        openButton.setTouchEnabled(false);
        openButton.setOpacity(0);
    }
})