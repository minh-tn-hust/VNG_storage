var TowerConfig = {
    TowerInfo: {}
}

TowerConfig.loadInfo = function () {
    var towerInfo = Util.loadJSONFile("res/tower.json")["tower"];
    for (var id of Object.keys(towerInfo)){
        TowerConfig[id] = towerInfo[id]["stat"];
    }
}