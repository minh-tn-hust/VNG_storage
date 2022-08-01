var TreasureUtil = TreasureUtil||{}

TreasureUtil.STATUS= {
    EMPTY : 0,
    WAITING_TO_COUNT : 1,
    COUNTING : 2,
    WAITING_TO_OPEN : 3
}

TreasureUtil.MAX_TREASURE = 4

TreasureUtil.treasureVisibleConfig =[
    {
        "FinishedImage": false,
        "OpeningImage":false,
        "TreasureImage":false,
        "TreasureName":false,
        "OpenWithGemText":false,
        "NumGemNode":false,
        "TimeBar":false,
        "waitingTimeLabel":false,
        "EmptyText":true
    },
    {
        "FinishedImage": false,
        "OpeningImage":false,
        "TreasureImage":true,
        "TreasureName":true,
        "OpenWithGemText":false,
        "NumGemNode":false,
        "TimeBar":false,
        "waitingTimeLabel":true,
        "EmptyText":false
    },
    {
        "FinishedImage": false,
        "OpeningImage":true,
        "TreasureImage":true,
        "TreasureName":false,
        "OpenWithGemText":true,
        "NumGemNode":true,
        "TimeBar":true,
        "waitingTimeLabel":false,
        "EmptyText":false
    },
    {
        "FinishedImage": true,
        "OpeningImage":false,
        "TreasureImage":true,
        "TreasureName":true,
        "OpenWithGemText":false,
        "NumGemNode":false,
        "TimeBar":false,
        "waitingTimeLabel":false,
        "EmptyText":false
    }]

/**
 * render treasure UI by treasureInfo
 * @param treasure: a ccui node
 * @param treasureInfo: info of treasure
 */
TreasureUtil.renderTreasureUI = function (treasure, treasureInfo){
    var waitingTimeLabel = Util.getChildByName(treasure,"waitingTimeLabel")[0];
    waitingTimeLabel.setString(Util.convertSecondToString(treasureInfo.getWaitingTime()));
    TreasureUtil.setTreasureVisibility(treasure,treasureInfo.getStatus());
}

/**
 * set visible value for each component in node treasure
 * @param treasure:  a ccui node
 * @param status: visible values depend on status of treasure
 */
TreasureUtil.setTreasureVisibility = function(treasure, status){
    var tempProperty;
    for (var proName of Object.keys(TreasureUtil.treasureVisibleConfig[status])){
        tempProperty = Util.getChildByName(treasure,proName);
        tempProperty[0].setVisible(TreasureUtil.treasureVisibleConfig[status][[proName]]);
    }
}