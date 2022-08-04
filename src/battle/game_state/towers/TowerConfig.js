var TowerConfig = {
    TowerInfo: {},
}

TowerConfig.loadInfo = function () {
    var towerInfo = Util.loadJSONFile("res/Tower.json")["tower"];
    cc.log("towerInfo: ",JSON.stringify(towerInfo));
    for (var id of Object.keys(towerInfo)){
        TowerConfig.TowerInfo[id] = towerInfo[id]["stat"];
        cc.log("towerInfo[id][stat]: ",JSON.stringify(towerInfo[id]["stat"]));
        cc.log("double check: ",JSON.stringify(TowerConfig.TowerInfo[id]));
    }
}

TowerConfig.getTowerInfo = function (cid) {
    if (TowerConfig.TowerInfo[cid]===null || TowerConfig.TowerInfo[cid]===undefined){
        TowerConfig.loadInfo();
    }
    cc.log("TowerInfo: ",JSON.stringify(TowerConfig.TowerInfo));
    return TowerConfig.TowerInfo[cid];
}
TowerConfig.PLACE_TOWER_OFFSET_TICK = 10
