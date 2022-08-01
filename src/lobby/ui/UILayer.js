
var UILayer = cc.Layer.extend({
    iconOffsetY: 20, // offset of Icon in MenuBar when it is pressed
    ctor: function(uILayerController){
        this._super();
        this.uILayerController = uILayerController;

        this.userInterfaceLayer = ccs.load("uilayer_UILayer.json", "").node;
        this.userInterfaceLayer.setContentSize(cc.winSize);
        ccui.Helper.doLayout(this.userInterfaceLayer)
        this.addChild(this.userInterfaceLayer,1);

        this.initBottomImageArray();

        this.topBar = this.userInterfaceLayer.getChildByName("UserInfoBar");
        this.bottomBar = this.userInterfaceLayer.getChildByName("MenuBar");

        this.initTopBar();
        this.createBottomBar();
    },

    /**
     * init array of strings which are path to the Image and Icon of each button at the bottom of ui layer
     * buttons are: shop, card, home, social, clan
     */
    initBottomImageArray: function (){
        var prefix = "lobby_asset/lobby_";
        this.imageBottomArray = new Array(5);
        this.imageBottomArray[0] =
            this.imageBottomArray[2] =
                this.imageBottomArray[4] = prefix+"page_btn_0.png";
        this.imageBottomArray[1] =
            this.imageBottomArray[3] = prefix+"page_btn_1.png";

        this.iconBottomArray =  new Array(5);
        this.iconBottomArray[0] = prefix+"page_icon_shop.png";
        this.iconBottomArray[1] = prefix+"page_icon_cards.png";
        this.iconBottomArray[2] = prefix+"page_icon_home.png";
        this.iconBottomArray[3] = prefix+"page_icon_social.png";
        this.iconBottomArray[4] = prefix+"page_icon_clan.png";

        this.pressedButtonImage = prefix+"page_btn_selecting.png";
    },

    /**
     * calculate the parameter for chosen button
     * offset: the size that proper buttons needing to move
     * scalingFactorX: the factor that chosen button needs to scale
     * @param widthPerButton
     */
    calParaOfChosenButton: function (widthPerButton){
        cc.log("widthPerButton: "+widthPerButton);
        this.offSet = cc.winSize.width-5*widthPerButton;
    },

    /**
     * crate the top bar
     * @param userInfo
     */
    initTopBar: function(){
        this.goldBar = this.topBar.getChildByName("GoldBar");
        this.gemBar = this.topBar.getChildByName("GemBar")
        this.trophyBar = this.topBar.getChildByName("TrophyBar")
        this.goldLabel = this.goldBar.getChildByName("LobbyBox").getChildByName("goldNumber");
        this.gemLabel = this.gemBar.getChildByName("LobbyBox").getChildByName("gemNumber");
        this.trophyLabel = this.trophyBar.getChildByName("LobbyBox").getChildByName("trophyNumber");

        this.setupResourcesEvent();

        this.updateTopBar();
        UserInfo.getInstance().addEventListener(UserInfo.Event.CHANGE_RESOURCE, this.updateTopBar.bind(this))
    },
    updateTopBar : function() {
        let userInfo = UserInfo.getInstance()
        this.goldLabel.setString(Util.numberToString(userInfo.getGold()))
        this.gemLabel.setString(Util.numberToString(userInfo.getGem()))
        this.trophyLabel.setString(Util.numberToString(userInfo.getTrophy().toString()));
    },

    setupResourcesEvent: function () {
        var upGoldIcon = this.goldBar.getChildByName("LobbyBox").getChildByName("UpGold");
        var upGemIcon = this.gemBar.getChildByName("LobbyBox").getChildByName("UpGem");

        upGoldIcon.addTouchEventListener(function (button,type) {
            Util.uiReact(button,type,function () {
                this.uILayerController.menuBarButtonClicked(0);
            }.bind(this));
        },this);
        
        upGemIcon.addTouchEventListener(function (button,type) {
            Util.uiReact(button,type,function () {
                let popupLayerController = PopupLayerController.getInstance();

                // open popup cardInfo
                popupLayerController.createPopup(PopupLayerController.TYPE.FUNCTION_NOT_AVAILABLE);
            })
        },this)
    },

    createBottomBar: function (){
        this.oldTab = this.uILayerController.getCurrentTab();
        this.buttons = Util.getChildByName(this.bottomBar,"MenuButton");
        for (let i=0;i<5;++i) {
            this.buttons[i].tag=i;
            this.buttons[i].addTouchEventListener(this.touchEventOfMenuBar,this);
        }

        var normalButtonSprite = new cc.Sprite(this.imageBottomArray[0]);

        this.calParaOfChosenButton(normalButtonSprite.width);


        var icons = Util.getChildByName(this.bottomBar,"SpriteOfButton");
        for (let i=0;i<5;++i){
            icons[i].setTexture(this.iconBottomArray[i]);
        }
        icons[this.oldTab].y += this.iconOffsetY;
        this.updateBottomBar();

        var texts = Util.getChildByName(this.bottomBar,"Text");
        texts[0].setString("Shop");
        texts[1].setString("Cards");
        texts[2].setString("Home");
        texts[3].setString("Social");
        texts[4].setString("Event");
        for (var i=0;i<5;++i){
            texts[i].setVisible(false);
        }
        texts[this.oldTab].setVisible(true);
    },

    touchEventOfMenuBar: function(sender, type){
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                this.uILayerController.menuBarButtonClicked(sender.tag);
                break;
            default:
                break;
        }
    },

    updateBottomBar: function(){
        var currentTab = this.uILayerController.getCurrentTab();

        this.buttons[this.oldTab].loadTextureNormal(this.imageBottomArray[this.oldTab]);
        var tempSelectingView = Util.getChildByName(this.buttons[this.oldTab],"SelectingView");
        var tempIcon = Util.getChildByName(this.buttons[this.oldTab],"SpriteOfButton");
        var tempText = Util.getChildByName(this.buttons[this.oldTab],"Text");

        tempSelectingView[0].setVisible(false);
        tempIcon[0].y-=this.iconOffsetY;
        tempText[0].setVisible(false);
        this.buttons[this.oldTab].setPositionX(0);

        for (let i=0;i<currentTab;++i) {
            this.buttons[i].setPositionX(0);
        }

        tempSelectingView = Util.getChildByName(this.buttons[currentTab],"SelectingView");
        tempIcon = Util.getChildByName(this.buttons[currentTab],"SpriteOfButton");
        tempText = Util.getChildByName(this.buttons[currentTab],"Text");

        tempSelectingView[0].setVisible(true);
        tempIcon[0].y+=this.iconOffsetY;
        tempText[0].setVisible(true);

        this.buttons[currentTab].setPositionX(this.offSet/2);
        for (var i=currentTab+1;i<5;++i) {
            this.buttons[i].setPositionX(this.offSet);
        }
        this.oldTab = currentTab;
    },

})