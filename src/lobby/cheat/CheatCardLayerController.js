var CheatCardLayerController = cc.Class.extend({
    cheatCardButton:null,
    homeController: null,

    setCheatCardButton: function(cheatCardButton){
        this.cheatCardButton=cheatCardButton;
    },

    ctor: function(homeController,cheatCardButton){
        this.homeController = homeController;
        this.setCheatCardButton(cheatCardButton);
        this.cheatCardButton.addTouchEventListener(function(sender,type){
            Util.uiReact(sender,type,function(){
                let popupLayerController = PopupLayerController.getInstance();

                // open popup cardInfo
                popupLayerController.createPopup(PopupLayerController.TYPE.CHEAT_CARD);
            })
        },this)
    }
})