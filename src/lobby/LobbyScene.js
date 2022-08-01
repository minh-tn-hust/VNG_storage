
var LobbyScene = cc.Scene.extend({
    _controller : null,
    getController : function() {
        return this._controller

    },
    setController : function(controller) {
        this._controller = controller
    },

    ctor: function(lobbySceneController){
        this._super();
        this.setController(lobbySceneController);
        this.initPageView();
        this.displayCurrentLayer = null;
    },

    /**
     * create a page view and add event listener to created page view
     */
    initPageView: function(){
        this.pageView = new ccui.PageView();
        this.pageView.setBackGroundImage("res/lobby_asset/lobby_background.png");
        this.pageView.setContentSize(cc.winSize);
        this.addChild(this.pageView);

        this.pageView.addEventListener(this.triggerSwitchedTab,this);
    },

    triggerSwitchedTab: function(sender, type){
         switch (type) {
             case ccui.PageView.EVENT_TURNING:
                 this._controller.setCurrentTabIndex(sender.getCurPageIndex());
                 this.displayUI();
                 break;
             default:
                 break;
         }
    },

    /**
     * Đưa Layer vào PageView
     * @param {cc.Layer} layer
     */
    addLayer: function(layer){
        var layOut = new ccui.Layout();
        layOut.addChild(layer);
        this.pageView.addPage(layOut);
    },

    /**
     * add UILayer
     * @param layer
     */
    addUILayer: function(layer){
        this.addChild(layer);
    },

    scrollToPage: function(idx){
        this.pageView.scrollToPage(idx);
    },

    displayUI: function (){
        this._controller.updateUILayer();
    }
})