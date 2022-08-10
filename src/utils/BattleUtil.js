let BattleUtil = BattleUtil || {}

/** Chuyển đổi từ vị trí ma trận tới vị trí trên màn hình
* @param {cc.Point} matrixPos
* @param {number}  who
* @return {cc.Point}
*/
BattleUtil.fromMaxtrixToPosition = function(matrixPos, who) {
    let centerPoint = cc.p({
        x : cc.winSize.width / 2,
        y : cc.winSize.height / 100 * 56
    })
    if (who === BattleUtil.Who.Mine) {
        centerPoint.y -= BattleConfig.Map.yDeltaCenter.Mine
    } else {
        centerPoint.y += BattleConfig.Map.yDeltaCenter.Enemy
    }

    if (who === BattleUtil.Who.Mine) {
        centerPoint.x += (matrixPos.x - 3) * BattleConfig.Map.cellWidth
        centerPoint.y += (2 - matrixPos.y) * BattleConfig.Map.cellHeight
    } else {
        centerPoint.x -= (matrixPos.x - 3) * BattleConfig.Map.cellWidth
        centerPoint.y -= (2 - matrixPos.y) * BattleConfig.Map.cellHeight
    }
    return centerPoint
}


/** Chuyển đổi từ vị trí màn hình sang vị trí trong ma trận
* @param {cc.Point} position
* @param {BattleUtil.Who} who
* @return {cc.Point}
*/
BattleUtil.fromPositionToMatrix = function(position, who) {
    let centerPoint = cc.p({
        x : cc.winSize.width / 2,
        y : cc.winSize.height / 100 * 56
    })
    if (who === BattleUtil.Who.Mine) {
        centerPoint.y -= BattleConfig.Map.yDeltaCenter.Mine
    } else {
        centerPoint.y += BattleConfig.Map.yDeltaCenter.Enemy
    }
    let deltaX = (position.x - centerPoint.x + BattleConfig.Map.cellWidth / 2) / BattleConfig.Map.cellWidth
    let deltaY = (position.y - centerPoint.y + BattleConfig.Map.cellHeight / 2) / BattleConfig.Map.cellHeight
    if (who === BattleUtil.Who.Mine) {
        return cc.p({
            x : Math.floor(deltaX) + 3,
            y : 2 - Math.floor(deltaY)
        })
    } else {
        return cc.p({
            x : - Math.floor(deltaX) + 3,
            y : 2 + Math.floor(deltaY)
        })
    }
}

/**
 * Chuyển đối vị trí trên màn hình về vị trí mà client và server thống nhất
 * @param {cc.Point} position
 * @param {BattleUtil.Who.Mine | BattleUtil.Who.Enemy} who
 */
BattleUtil.fromPositionToModelPosition = function(position, who) {
    let primitivePos = BattleUtil.fromMaxtrixToPosition(cc.p(0,0), who)
    let paramX = (who === BattleUtil.Who.Enemy) ? -1 : 1
    let paramY = (who === BattleUtil.Who.Enemy) ? 1 : -1
    return cc.p({
        x: (position.x - primitivePos.x) * paramX,
        y: (position.y - primitivePos.y) * paramY
    })
}

/**
 * Chuyển đổi vị trí client + server về vị trí trên màn hình
 * @param {cc.Point} modelPosition
 * @param {BattleUtil.Who.Mine | BattleUtil.Who.Enemy} who
 */
BattleUtil.fromModelPositionToPosition = function(modelPosition, who) {
    let primitivePos = BattleUtil.fromMaxtrixToPosition(cc.p(0,0), who)
    let paramX = (who === BattleUtil.Who.Enemy) ? -1 : +1
    let paramY = (who === BattleUtil.Who.Enemy) ? +1 : -1
    return cc.p({
        x : primitivePos.x + modelPosition.x * paramX,
        y : primitivePos.y + modelPosition.y * paramY
    })
}

/**
 * Chuyển đổi vị trí giữa trong ma trạn thành vị trí của model
 */
BattleUtil.fromMatrixToModelPosition = function(matrixPos, who) {
    let modelPos = cc.p(0,0)
    modelPos.x += matrixPos.x * BattleConfig.Map.cellWidth
    modelPos.y += matrixPos.y * BattleConfig.Map.cellHeight
    return modelPos
}

/**
 * Chuyển đổi vị trí của Model thành vị trí trong ma trận
 */
BattleUtil.fromModelPositionToMatrixPosition= function(modelPos, who) {
    let matrixPos = BattleUtil.fromMaxtrixToPosition(cc.p(0, 0), who)
    matrixPos.x = Math.round(modelPos.x / BattleConfig.Map.cellWidth)
    matrixPos.y = Math.round(modelPos.y / BattleConfig.Map.cellHeight)
    return matrixPos
}

BattleUtil.getImageOnSelectingCard = function (cardJSObject) {
    let cardImage =  cc.Sprite("tower_asset/frame/wizard_1_2/tower_wizard_attack_0_0000.png");
    cardImage.setScale(1.5);
    cardImage.retain();
    return cardImage;
}

BattleUtil.fromTowerLevelToMultiple = function(towerLevel) {
    if (towerLevel < 5) {
        return 1;
    } else if (towerLevel < 10) {
        return 2;
    } else if (towerLevel < 20) {
        return 3;
    } else if (towerLevel < 30) {
        return 4;
    } else {
        return 5;
    }
}

BattleUtil.Who = {
    Mine : 0,
    Enemy : 1
}

BattleUtil.NUM_CELL_WIDTH=7;
BattleUtil.NUM_CELL_HEIGHT=5;