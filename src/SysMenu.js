

var SysMenu = cc.Layer.extend({

    // ship sprite di chuyển lung tung cho đẹp
    _ship:null,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        cc.spriteFrameCache.addSpriteFrames(res.textureTransparentPack_plist);

        winSize = cc.director.getWinSize();

        this.initBackGround();

        // khởi tạo các UI sử dụng dành cho menu
        var singalHeight = MW.menuHeight;
        var singalWidth = MW.menuWidth;
        var newGameNormal = new cc.Sprite(res.menu_png, cc.rect(0, 0, singalWidth, singalHeight));
        var newGameSelected = new cc.Sprite(res.menu_png, cc.rect(0, singalHeight, singalWidth, singalHeight));
        var newGameDisabled = new cc.Sprite(res.menu_png, cc.rect(0, singalHeight * 2, singalWidth, singalHeight));

        var gameSettingsNormal = new cc.Sprite(res.menu_png, cc.rect(singalWidth, 0, singalWidth, singalHeight));
        var gameSettingsSelected = new cc.Sprite(res.menu_png, cc.rect(singalWidth, singalHeight, singalWidth, singalHeight));
        var gameSettingsDisabled = new cc.Sprite(res.menu_png, cc.rect(singalWidth, singalHeight * 2, singalWidth, singalHeight));

        var aboutNormal = new cc.Sprite(res.menu_png, cc.rect(singalWidth * 2, 0, singalWidth, singalHeight));
        var aboutSelected = new cc.Sprite(res.menu_png, cc.rect(singalWidth * 2, singalHeight, singalWidth, singalHeight));
        var aboutDisabled = new cc.Sprite(res.menu_png, cc.rect(singalWidth * 2, singalHeight * 2, singalWidth, singalHeight));

        var flare = new cc.Sprite(res.flare_jpg);
        this.addChild(flare, 15, 10);
        flare.visible = false;

        // tạo biến newGame, thực hiện callBack onNewGame
        var newGame = new cc.MenuItemSprite(newGameNormal, newGameSelected, newGameDisabled, function () {
            this.onButtonEffect();
            //this.onNewGame();
            flareEffect(flare, this, this.onNewGame);
        }.bind(this));

        // biến gameSettings nhận sự kiện khi bấm vào nút settings, thực hiện callBack onSettings
        var gameSettings = new cc.MenuItemSprite(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);

        // biến about nhận sự kiện khi bấm vào nút about, thực hiện callBack onAbout
        var about = new cc.MenuItemSprite(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

        // config menu UI
        newGame.scale = MW.SCALE;
        gameSettings.scale = MW.SCALE;
        about.scale = MW.SCALE;

        var menu = new cc.Menu(newGame, gameSettings, about);
        menu.alignItemsVerticallyWithPadding(15);
        this.addChild(menu, 1, 2);
        menu.x = winSize.width / 2;
        menu.y = winSize.height / 2 - 140;

        var label = new cc.LabelTTF("Power by Cocos2d-JS", "Arial", 21);
        label.setColor(cc.color(MW.FONTCOLOR));
        this.addChild(label, 1);
        label.x = winSize.width  / 2;
        label.y = 80;

        // hàm schedule nhận việc sẽ thực hiện một công việc gì đó trong một khoảng thời gian cho trước (interval)
        this.schedule(this.update, 0.1);

        // khởi tạo sprite ship chạy lung tung trên màn hình
        this._ship = new cc.Sprite("#ship03.png");
        this.addChild(this._ship, 0, 4);

        this._ship.x = Math.random() * winSize.width;
        this._ship.y = 0;
        this._ship.runAction(cc.moveBy(2, cc.p(Math.random() * winSize.width, this._ship.y + winSize.height + 100)));

        if (MW.SOUND) {
            cc.audioEngine.setMusicVolume(0.7);
            cc.audioEngine.playMusic(cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT ? res.mainMainMusic_wav : res.mainMainMusic_mp3, true);
        }

        return true;
    },
    initBackGround:function()
    {
        var winSize = cc.winSize
        var backgroundSprite = cc.Sprite.create(res.loading_png)
        backgroundSprite.setPosition(cc.p(winSize.width /2 , winSize.height / 2))
        backgroundSprite.setScale(1.5)

        var logoSprite = cc.Sprite.create(res.logo_png)
        logoSprite.setPosition(cc.p(winSize.width /2 , winSize.height / 2 + 200))

        var logoBackSprite = cc.Sprite.create(res.logoBack_png)
        logoBackSprite.setPosition(cc.p(winSize.width /2 , winSize.height / 2 + 200))
        logoBackSprite.setScale(1.3)

        this.addChild(backgroundSprite)
        this.addChild(logoSprite, 1)
        this.addChild(logoBackSprite, 0)
    },
    onNewGame:function (pSender) {
        //load resources, sau khi load xong thì thực hiện callBack
        // resources là một mảng string chứa đường dẫn tới res
        cc.LoaderScene.preload(g_maingame, function () {
            // tắt các âm thanh hiện tại
            cc.audioEngine.stopMusic();
            cc.audioEngine.stopAllEffects();

            // tạo scene mới, scene này chứa 2 layer, một layer gameplay, một layer là game menu
            var scene = new cc.Scene();
            scene.addChild(new GameLayer());
            scene.addChild(new GameControlMenu());

            // thực hiện load scene mới
	        cc.director.runScene(new cc.TransitionFade(1.2, scene));
        }, this);
    },
    onSettings:function (pSender) {
        this.onButtonEffect();

        var scene = new cc.Scene();
        scene.addChild(new SettingsLayer());

	    cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    onAbout:function (pSender) {
        this.onButtonEffect();
        var scene = new cc.Scene();
        scene.addChild(new AboutLayer());
	    cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },

    update:function () {
        if (this._ship.y > 750) {
            this._ship.x = Math.random() * winSize.width;
	        this._ship.y = 10;
            this._ship.runAction(cc.moveBy(
                parseInt(5 * Math.random(), 10),
                cc.p(Math.random() * winSize.width, this._ship.y + 750)
            ));
        }
    },
    onButtonEffect:function(){
        if (MW.SOUND) {
            var s = cc.audioEngine.playEffect(cc.sys.os == cc.sys.OS_WINDOWS || cc.sys.os == cc.sys.OS_WINRT ? res.buttonEffet_wav : res.buttonEffet_mp3);
        }
    }
});

SysMenu.scene = function () {
    var scene = new cc.Scene();
    var layer = new SysMenu();
    scene.addChild(layer);
    return scene;
};
