let MainController = cc.Class.extend({
    _lobbySceneController : null,
    _battleSceneController : null,
    ctor: function(){
    },

    runLobbyScene: function (){
        this.setLobbyController(new LobbySceneController(this))
        this.getLobbyController().runScene()
    },

    /**
     * @param {BattleInitiator} battleInitiator
     */
    runBattleScene : function(battleInitiator) {
        UserInfo.getInstance().removeListener()
        cc.director.runScene(new cc.TransitionFade(0.5, new BattleScene(battleInitiator)))
    },

    /**
     * @param {LobbySceneController} controller
     */
    setLobbyController : function(controller) {
        this._lobbySceneController = controller
    },

    /**
     * @return {LobbySceneController}
     */
    getLobbyController : function() {
        return this._lobbySceneController
    },

    /**
     * @return {BattleSceneController}
     */
    getBattleController : function() {
        return this._battleSceneController
    },

    /**
     * @param {BattleSceneController} controller
     */
    setBattleController : function(controller) {
        this._battleSceneController = controller
    },

    /**
     * @returns {MapLayerController}
     */

    getB_MapController : function() {
        return this.getBattleController().getMapController()
    },

    /**
     * @return {MonsterLayerController}
     */
    getB_MonsterController : function() {
        return this.getBattleController().getMonsterController()
    },

    /**
     * @return {BattleUILayerController}
     */
    getB_UIController : function() {
        return this.getBattleController().getUIController()
    },

    /**
     * @return  {TowerLayerController}
     */
    getB_TowerController : function() {
        this.getBattleController().getTowerController()
    },
})

MainController._controller = null
/**
 * @returns {null|MainController}
 */
MainController.getInstance = function() {
    return MainController._controller
}

MainController.setInstance = function(mainController) {
    MainController._controller = mainController
}