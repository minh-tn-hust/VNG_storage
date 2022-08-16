
var LobbySceneController = cc.Class.extend({
    lobbyScene : null,
    mainController : null,
    uiLayerController : null,
    shopLayerController : null,
    cardLayerController : null,
    homeLayerController : null,
    popupLayerController : null,
    socialLayerController : null,
    clanLayerController : null,

    /**
     * @returns {ClanLayerController}
     */
    getClanLayerController : function() {
        return this.clanLayerController
    },

    /**
     * @returns {SocialLayerController}
     */
    getSocialLayerController : function() {
        return this.socialLayerController
    },

    /**
     * @returns {HomeLayerController}
     */
    getHomeLayerController : function() {
        return this.homeLayerController
    },

    /**
     * @returns {CardManagerLayerController}
     */
    getCardLayerController : function() {
        return this.cardLayerController
    },

    /**
     * @returns {UILayerController}
     */
    getUILayerController : function() {
        return this.uiLayerController
    },

    /**
     * @returns {ShopLayerController}
     */
    getShopLayerController : function(){
        return this.shopLayerController
    },

    /**
     * @param {ClanLayerController} controller
     */
    setClanLayerController : function(controller) {
        this.clanLayerController = controller
    },

    /**
     * @param {SocialLayerController} controller
     */
    setSocialLayerController : function(controller) {
        this.socialLayerController = controller
    },

    /**
     * @param {HomeLayerController} controller
     */
    setHomeLayerController : function(controller) {
        this.homeLayerController = controller
    },

    /**
     * @param {CardManagerLayerController} controller
     */
    setCardLayerController : function(controller) {
        this.cardLayerController = controller
    },

    /**
     * @param {UILayerController} controller
     */
    setUILayerController : function(controller) {
        this.uiLayerController = controller
    },

    /**
     * @param {ShopLayerController} controller
     */
    setShopLayerController : function(controller){
        this.shopLayerController = controller
    },


    ctor:function (mainController){
        this.mainController = mainController;
        PopupLayerController._popupLayerController = new PopupLayerController(this)

        this.setUILayerController(new UILayerController(this));
        this.setShopLayerController(new ShopLayerController(this));
        this.setCardLayerController(new CardManagerLayerController(this));
        this.setHomeLayerController(new HomeLayerController(this));
        this.setSocialLayerController( new SocialLayerController(this));
        this.setClanLayerController(new ClanLayerController(this));

        // PopupController là static sau này nó được gọi từ mọi nới trong lobby, nên không cần get tại đây nữa
        this.popupLayerController = PopupLayerController._popupLayerController

        this.initScene();
    },

    /**
     * Khởi tạo Scene, thực hiện load các layer và PageView
     */
    initScene: function(){
        this.setLobbyScene(new LobbyScene(this))
        this.getLobbyScene().addLayer(this.getShopLayerController().getLayer())
        this.getLobbyScene().addLayer(this.getCardLayerController().getLayer())
        this.getLobbyScene().addLayer(this.getHomeLayerController().getLayer())
        this.getLobbyScene().addLayer(this.getSocialLayerController().getLayer())
        this.getLobbyScene().addLayer(this.getClanLayerController().getLayer())
        this.getLobbyScene().addUILayer(this.getUILayerController().getLayer())
        this.getLobbyScene().scrollToPage(2)
    },

    /**
     * @param {LobbyScene} lobbyScene
     */
    setLobbyScene : function(lobbyScene) {
        this.lobbyScene = lobbyScene
    },

    /**
     * @returns {LobbyScene}
     */
    getLobbyScene : function() {
        return this.lobbyScene
    },


    getCurrentTabIndex: function(){

    },

    /**
     * set value for currentTab var
     * @param currentTab
     */
    setCurrentTabIndex: function(currentTab){
        this.uiLayerController.setCurrentTab(currentTab);
    },

    /**
     * update UILayer corresponding to current layer
     */
    updateUILayer: function(){
        this.uiLayerController.updateBottomBar();
    },

    /**
     * scroll layer to current index
     * @param idxLayer
     */
    scrollLayer: function(idxLayer){
        this.getLobbyScene().scrollToPage(idxLayer);
    },

    /**
     * run lobby scene
     */
    runScene: function(){
        cc.director.runScene(this.getLobbyScene());
    },

    getMouseClickedCard: function(){
        return this.cardLayerController.getLayer().getMouseClickedCard();
    },

    displaySwapCardLayer: function(){
        this.cardLayerController.switchToReplaceMode();
    },

    getUserInfo: function(){}
})