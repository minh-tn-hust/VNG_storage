
var UILayerController = cc.Class.extend({
    ctor:function(lobbyLayerController){
        this.lobbyLayerController = lobbyLayerController;
        this.currentTab=2;
        this.uiLayer = new UILayer(this);

    },

    getLayer: function(){
        return this.uiLayer;
    },

    updateBottomBar: function (){
        this.uiLayer.updateBottomBar();
    },

    changeTabLayer: function(){
        this.lobbyLayerController.scrollLayer(this.currentTab);
    },

    getCurrentTab: function (){
        return this.currentTab;
    },

    setCurrentTab: function(currentTab){
        this.currentTab = currentTab;
    },

    menuBarButtonClicked: function (index) {
        this.setCurrentTab(index);
        this.changeTabLayer();
    }
})