/**
 * Created by GSN on 7/9/2015.
 */
var Direction =
    {
        UP:1,
        DOWN:2,
        LEFT:3,
        RIGHT:4
    };

var MAP_SIZE = 8;
var TILE_SIZE = 64;
var LoginScene = cc.Layer.extend({
    ctor:function() {
        this._super();

        this.loginScene = ccs.load("login/MainScene.json", "").node;
        this.loginScene.setContentSize(cc.winSize)
        ccui.Helper.doLayout(this.loginScene)
        this.addChild(this.loginScene);
        this.btnLogin = this.loginScene.getChildByName("button_login")
        this.tip_id = this.loginScene.getChildByName("text_input_id")
        this.btnLogin.addClickEventListener(this.onSelectLogin.bind(this))

        this.labelInputText = this.loginScene.getChildByName("input_message")

        var size = cc.director.getVisibleSize();

        let warningLabel = ccui.Text()
        warningLabel.setFontName("SVN-Supercell Magic")
        warningLabel.setFontSize(28)
        warningLabel.setString("ID BẮT BUỘC PHẢI LÀ SỐ")
        warningLabel.setPosition(cc.p({
            x : cc.winSize.width / 2,
            y : cc.winSize.height * 50 / 100
        }))
        warningLabel.setVisible(false)
        this.warningText = warningLabel
        this.addChild(warningLabel)

        this.initGame();
        let digAnimation = new sp.SkeletonAnimation("res/fx_digging.json", "res/fx_digging.atlas")
        // let digAnimation = new sp.SkeletonAnimation(MonsterConfig.NINJA.skillAnimation.json, MonsterConfig.NINJA.skillAnimation.atlas)
        // digAnimation.setAnimation(0, "fx_dig_down", false)
        // digAnimation.setCompleteListener(function(){
        //     digAnimation.setAnimation(0, "fx_digging", false)
        // })
        digAnimation.setPosition(cc.winSize.width / 2, cc.winSize.height /2)
        this.addChild(digAnimation, 10000, 1)
    },

    initGame:function()
    {
        cc.log("Hello World")

    },

    checkInputIDBox: function (){
        var text = this.tip_id.getString();
        if (text.length === 0)
            return -1
        if (text.match(/^\d+$/) != null){
            return 1;
        }
        return 0;
    },


    onSelectLogin:function(sender)
    {
        var check = this.checkInputIDBox()
        if(check===1){
            this.labelInputText.setString("")
            gv.CONSTANT.USERID = this.tip_id.getString()
            gv.gameClient.connect();
        }
        else {
            if(check===-1){
                this.labelInputText.setString("ID không để trống")
            }
            else {
                this.labelInputText.setString("ID phải là số")
            }
            if (this.timeout !== null){
                clearTimeout(this.timeout)
            }
            this.timeout = setTimeout(() => {
                this.labelInputText.setString("")
            }, 3000)
        }
    },

    onConnectSuccess:function()
    {
        cc.log("Next scene");

    },
    onConnectFail:function(text)
    {
        this.lblLog.setString("Connect fail: " + text);
    },

    onFinishLogin:function()
    {
        cc.log("Login Succesfull");
        var mainController = new MainController();
        MainController.setInstance(mainController)

        mainController.runLobbyScene()
    },
});