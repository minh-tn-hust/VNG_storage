let Utils = ({
    fromMatrixToPosition : function(cellInMatrix) {
        return cc.p({
            x : cc.winSize.width / 2 - GAME_CONFIG.cellSize.width * ((GAME_CONFIG.mapSize.width + 1) / 2  - cellInMatrix.x - 1),
            y : cc.winSize.height / 2 +  GAME_CONFIG.cellSize.height * ((GAME_CONFIG.mapSize.height + 1) / 2  - cellInMatrix.y - 1),
        })
    },
    mappingPositionToMatrix : function(currentPosition) {
        let centerIndexX = GAME_CONFIG.mapSize.width / 2
        let centerIndexY = GAME_CONFIG.mapSize.height / 2
        let centerPoint = cc.p({
            x : cc.winSize.width / 2,
            y : cc.winSize.height / 2
        })

        let dx = (currentPosition.x - centerPoint.x) / GAME_CONFIG.cellSize.width
        let dy = (currentPosition.y - centerPoint.y) / GAME_CONFIG.cellSize.height

        return cc.p({
            x : Math.floor(centerIndexX + dx),
            y : Math.floor(centerIndexY - dy)
        })
    },
    directionFromTwoPosition : function(begin,end) {
        let dx = begin.x - end.x
        let dy = begin.y - end.y
        let distance = Math.abs(dx + dy)
        return cc.p({
            x: dx / distance,
            y: dy / distance
        })
    },
    isValidMatrixPosition : function(cellPosition) {
        let mapSize = GAME_CONFIG.mapSize
        if (cellPosition.x < 0 || cellPosition.y < 0) {
            return false
        }
        if (cellPosition.x >= mapSize.width) {
            return false
        }
        if (cellPosition.y >= mapSize.height) {
            return false
        }
        return true
    },


})