var gv = gv || {};

var DESIGN_RESOLUTION_WIDTH = 640;
var DESIGN_RESOLUTION_HEIGHT = 1136;

cc.game.onStart = function () {
    jsb.fileUtils.addSearchPath(fr.NativeService.getFolderUpdateAssets() + "/res", true);
    if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, disabled by default to improve performance
    cc.view.enableRetina(true);

    // Adjust viewport meta
    cc.view.adjustViewPort(true);
    cc.loader.resPath = "res";
    cc.LoaderScene.preload([], function () {
        //hide fps
        cc.director.setDisplayStats(false);

        // Setup the resolution policy and design resolution size
        var frameSize = cc.view.getFrameSize();
        var ratio = frameSize.width/frameSize.height;
        var reverseRatio = frameSize.height / frameSize.width
        cc.log(ratio)
        cc.log(reverseRatio)
        if (ratio >= 2 || reverseRatio >= 2) {
            cc.log("+++++++++++++++++++++++++++++++++++++++")
            cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH,DESIGN_RESOLUTION_HEIGHT, cc.ResolutionPolicy.FIXED_WIDTH);
        } else {
            if(frameSize.width <= 640){
                cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH,DESIGN_RESOLUTION_HEIGHT, cc.ResolutionPolicy.FIXED_WIDTH);
            } else {
                cc.view.setDesignResolutionSize(DESIGN_RESOLUTION_WIDTH,DESIGN_RESOLUTION_HEIGHT, cc.ResolutionPolicy.FIXED_HEIGHT);
            }
        }

        // The game will be resized when browser size change
        cc.view.resizeWithBrowserSize(true);

        //socket
        gv.gameClient = new GameClient();
        gv.poolObjects = new PoolObject();

        //modules
        NetworkManger.connector = new NetworkManger.Connector(gv.gameClient);

        fr.view(LoginScene);
    }, this);
};
cc.game.run();