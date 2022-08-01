var CardInfoPopupController = CardInfoPopupController||{}

CardInfoPopupController.createFormationPopupLayer = function (popupController,cardID) {
    if (cardID<10){
        return new TowerInfoBattlePopup(popupController,cardID);
    } else if (cardID<20){
        return new MonsterInfoBattlePopup(popupController,cardID);
    } else {
        return new SpellInfoBattlePopup(popupController,cardID);
    }
}

CardInfoPopupController.createCollectionPopupLayer = function (popupController,cardID) {
    if (cardID < 10) {
        return new TowerInfoCollectionPopup(popupController, cardID);
    } else if (cardID < 20) {
        return new MonsterInfoCollectionPopup(popupController, cardID);
    } else {
        return new SpellInfoCollectionPopup(popupController, cardID);
    }
}