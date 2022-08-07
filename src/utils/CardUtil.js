let CardUtil = CardUtil||{}

CardUtil.colorLetterRank ={
    "C" : "#008000",
    "B" : "#1E90FF",
    "A" : "#FFA500",
    "S" : "#971E97"
}

CardUtil.STATUS = {
    BATTLE:1,
    DISCOVER:0
}

CardUtil.Type = {
    TOWER:10,
    MONSTER:20,
    SPELL:30
}

CardUtil.categorize = function (cardID) {
    if (cardID<10){
        return CardUtil.Type.TOWER;
    } else if (cardID<20){
        return CardUtil.Type.MONSTER;
    } else {
        return CardUtil.Type.SPELL;
    }
}

CardUtil.buttonCardMode= {
    MANAGE_MODE_CARD:1,
    SWITCH_MODE_CARD:2,
}

CardUtil.idPopup={
    BTL_CARD_PU:3,
    DCV_CARD_PU:4
}

CardUtil.requiredEnergy = {
    0:8,
    1:12,
    2:10,
    3:12,
    4:10,
    5:12,
    6:12,

    10:1,
    11:1,
    12:3,
    13:2,
    14:1,

    20:8,
    21:8,
    22:12,
    23:12,
    24:6
}

CardUtil.CARRY = 1
CardUtil.NON_CARRY = 0

CardUtil.getNormalPictureButtonPath =  function(id){
    return CardAssetConfig.assetImage[id];
}

CardUtil.getBackgroundPathByLevel= function(level){
    return CardAssetConfig.assetBackground[level];
}

CardUtil.getBorderPathByLevel = function(level){
    return CardAssetConfig.assetBorder[level];
}

CardUtil.setCardUI =  function(card, cardInfo){
    var background = Util.getChildByName(card,"BackGround")[0];
    background.loadTexture(CardUtil.getBackgroundPathByLevel(cardInfo.getRank()));

    var border = Util.getChildByName(card,"Border")[0];
    border.loadTexture(CardUtil.getBorderPathByLevel(cardInfo.getRank()));

    var button = Util.getChildByName(card,"buttonCard")[0];
    button.loadTextureNormal(CardUtil.getNormalPictureButtonPath(cardInfo.getCardID()));
    button.loadTexturePressed(CardUtil.getNormalPictureButtonPath(cardInfo.getCardID()));
    // cc.log("pic: "+idToImage["prefix"]+idToImage[cardInfo.getCardID()]+idToImage["suffix"]);

    var energyLabel = Util.getChildByName(card,"eneryLabel")[0];
    energyLabel.setString(cardInfo.getRequiredEnergy());

    // var imageTypeView = Util.getChildByName(card, "imageTypeView");
    // imageTypeView.loadTexture()

    var levelLabel = Util.getChildByName(card,"levelLabel")[0];
    levelLabel.setString(cardInfo.getLetterRank());
    // levelLabel.enableGlow(CardUtil.colorLetterRank[cardInfo.getLetterRank()]);
    // levelLabel.setColor(CardUtil.colorLetterRank[cardInfo.getLetterRank()]);

    var stars = Util.getChildByName(card,"star");
    var nStar = cardInfo.getStar();
    var i;
    for (i=0;i<nStar;++i){
        stars[i].setVisible(true);
    }

    for (i=nStar;i<5;++i){
        stars[i].setVisible(false);
    }

    var requiredPiece = CardUtil.getRequirementForLevel(cardInfo.getLevel()+1)["cardRequired"];
    cc.log("requiredPiece: ",requiredPiece);
    var progressText = Util.getChildByName(card,"progressText")[0];
    var progressBar = Util.getChildByName(card,"progressBar")[0];
    progressText.setString(cardInfo.getPieces()+"/"+requiredPiece);
    cc.log("Check Percent: ",cardInfo.getPieces()*100/requiredPiece);
    progressBar.setPercent(cardInfo.getPieces()*100/requiredPiece);
}

CardUtil.swapCard = function(battleDeckCardID, discoverDeckCardID){
    var battleCard = UserInfo.getInstance().getCardByID(battleDeckCardID);
    var discoverCard = UserInfo.getInstance().getCardByID(discoverDeckCardID);
    var battleCardImage= battleCard.getCardImage();
    var discoverCardImage = discoverCard.getCardImage();

    battleCard.setStatus(CardUtil.STATUS.DISCOVER);
    discoverCard.setStatus(CardUtil.STATUS.BATTLE);

    battleCard.setCardImage(discoverCardImage);
    discoverCard.setCardImage(battleCardImage);

    battleCardImage.tag = discoverCard.getCardID();
    discoverCardImage.tag = battleCard.getCardID();
}

CardUtil.setupReplacingNodeUI = function (replaceNode,cardInfo) {
    replaceNode.setVisible(true);
    var replaceCardImage = Util.getChildByName(replaceNode,"ReplaceCard")[0];
    replaceCardImage.tag = cardInfo.getCardID();
    CardUtil.setCardUI(replaceCardImage,cardInfo);

    var progressBar = Util.getChildByName(replaceCardImage,"BackgroundProgress")[0];
    progressBar.setVisible(false);

    var scaleAction = cc.ScaleTo(0.7,0.8);
    var scaleAction2 = cc.ScaleTo(0.7,1);
    replaceCardImage.runAction(cc.RepeatForever(cc.sequence(scaleAction,scaleAction2)))

    var replaceArrow = Util.getChildByName(replaceNode,"ReplaceArrow")[0];
    replaceArrow.setUserData(replaceArrow.getPosition());
    var xReplaceArrow = replaceArrow.getPositionX();
    var yReplaceArrow = replaceArrow.getPositionY();
    var moveAction = cc.MoveTo(0.7,cc.p(xReplaceArrow,yReplaceArrow-20));
    var moveAction2 = cc.MoveTo(0.7,cc.p(xReplaceArrow,yReplaceArrow));
    replaceArrow.runAction(cc.RepeatForever(cc.sequence(moveAction,moveAction2)))
}

CardUtil.disableReplacingNodeUI = function (replaceNode) {
    replaceNode.setVisible(false);
    var replaceCardImage = Util.getChildByName(replaceNode,"ReplaceCard")[0];
    var replaceArrow = Util.getChildByName(replaceNode,"ReplaceArrow")[0];

    replaceCardImage.stopAllActions();
    replaceArrow.stopAllActions();
    replaceArrow.y = replaceArrow.getUserData().y;
}

CardUtil.requirementForUpdate = {
    level:1000,
    cardRequired: 1000,
    coinRequired: 1000,
}

/**
 *
 * @param {number}level 0-19
 * @returns {*|{level: number, cardRequired: number, coinRequired: number}}
 */
CardUtil.getRequirementForLevel = function (level) {
    if (CardUtil.requirementForUpdate.level!==level){
        var requireObject = Util.loadJSONFile("Card.json");
        CardUtil.requirementForUpdate.level = level;
        CardUtil.requirementForUpdate.cardRequired = requireObject["" + level]["card_require"];
        CardUtil.requirementForUpdate.coinRequired = requireObject["" + level]["coin_require"];
    }
    return CardUtil.requirementForUpdate;
}


CardUtil.upgradeDamagePercent = 0.1
CardUtil.upgradeHPPercent = 0.1
/**
 *
 * @param {number}damage
 * @param {number}level from 0-19
 * @param {number} percent
 * @returns {number}
 */
CardUtil.upgradeFactorToLevel = function (damage,level,percent) {
    return damage*Math.pow(1 + percent,level);
}