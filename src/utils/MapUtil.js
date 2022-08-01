let MapUtil = MapUtil || {}
MapUtil.WIDTH = 6
MapUtil.HEIGHT = 4

/**
 * Kiểm tra xem vị trí hiện tại đã hợp lệ hay chưa
 * @param position
 * @param map
 * @returns {boolean}
 */
MapUtil.isValidCell = function(position) {
    if (position.x > BattleConfig.Map.WIDTH - 1 || position.x < 0) {
        return false
    }
    if (position.y > BattleConfig.Map.HEIGHT - 1 || position.y < 0) {
        return false
    }
    return true
}

/**
 * Kiểm tra xem một ô có phải là ô đặt được cây / ô đi được hay không
 * @param {BattleConfig.Cell} status
 * @returns {boolean}
 */
MapUtil.isNormalCell = function(status) {
    if (status !== BattleConfig.Cell.SPEED_UP &&
        status !== BattleConfig.Cell.DAMAGE_UP &&
        status !== BattleConfig.Cell.RANGE_UP &&
        status !== BattleConfig.Cell.NORMAL &&
        status !== BattleConfig.Cell.PATH
    ) {
        return false
    } else {
        return true
    }
}