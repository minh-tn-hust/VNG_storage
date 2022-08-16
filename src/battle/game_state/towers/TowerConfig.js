var TowerConfig = {
    TowerInfo: {},
}

TowerConfig.loadInfo = function () {
    var towerInfo = Util.loadJSONFile("res/Tower.json")["tower"];
    // cc.log("towerInfo: ",JSON.stringify(towerInfo));
    for (var id of Object.keys(towerInfo)){
        TowerConfig.TowerInfo[id] = towerInfo[id]["stat"];
        TowerConfig.TowerInfo[id].energy = towerInfo[id].energy
        // cc.log("towerInfo[id][stat]: ",JSON.stringify(towerInfo[id]["stat"]));
        // cc.log("double check: ",JSON.stringify(TowerConfig.TowerInfo[id]));
    }
}

TowerConfig.getTowerInfo = function (cid) {
    if (TowerConfig.TowerInfo[cid]===null || TowerConfig.TowerInfo[cid]===undefined){
        TowerConfig.loadInfo();
    }
    // cc.log("TowerInfo: ",JSON.stringify(TowerConfig.TowerInfo));
    if (cid === BattleConfig.Cell.GOAT_LAUNCHER) {
        return TowerConfig.TowerInfo[BattleConfig.Cell.SNAKE_RED]
    } else if(cid === BattleConfig.Cell.SNAKE_RED) {
        return TowerConfig.TowerInfo[BattleConfig.Cell.GOAT_LAUNCHER]
    } else {
        return TowerConfig.TowerInfo[cid];
    }
}

TowerConfig.getPlantEnergy = function(cid) {
    let towerInfo = this.getTowerInfo(cid)
    return towerInfo.energy

}
TowerConfig.PLACE_TOWER_OFFSET_TICK = 10
