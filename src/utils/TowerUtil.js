var TowerUtil = TowerUtil || {}

TowerUtil.TARGET_MODE = {
    NEAREST : 0,
    FARTHEST : 1,
    HIGHEST_BLOOD : 2,
    LOWEST_BLOOD : 3
}


TowerUtil.getMonsterForTower = function (targetMode, monsterPool
    , towerPosition, towerRange,who) {
    switch (targetMode){
        case TowerUtil.TARGET_MODE.NEAREST:
            return TowerUtil.getNearestMonster(
                monsterPool, towerPosition, towerRange,who);
        case TowerUtil.TARGET_MODE.FARTHEST:
            return TowerUtil.getFarthestMonster(
                monsterPool, towerPosition, towerRange,who);
        case TowerUtil.TARGET_MODE.HIGHEST_BLOOD:
            return TowerUtil.getHighestBloodMonster(
                monsterPool, towerPosition, towerRange,who)
        case TowerUtil.TARGET_MODE.LOWEST_BLOOD:
            return TowerUtil.getLowestBloodMonster(
                monsterPool, towerPosition, towerRange,who)
    }
}

/**
 * return the nearest monster from the monsterPool to a tower
 * @param {list}monsterPool
 * @param {cc.p}towerPosition
 * @param {number}towerRange
 * @param {BattleUtil.Who.Mine,BattleUtil.Who.Enemy} who
 */
TowerUtil.getNearestMonster = function (monsterPool, towerPosition
    , towerRange,who) {
    var nearest = {
        distance:towerRange+1,
        monster: null,
    };
    for (var i=0;i<monsterPool.length;i++){
        var distance = Util.distance(towerPosition,monsterPool[i].getPosition());
        if (distance<nearest.distance
            && monsterPool[i].getWho()=== who
            && monsterPool[i].getCanTarget()) {
            nearest.distance = distance;
            nearest.monster = monsterPool[i];
        }
    }
    return nearest.monster;
}


/**
 * return the farthest monster from the monsterPool to a tower
 * @param {list}monsterPool
 * @param {cc.p}towerPosition
 * @param {number}towerRange
 * @param {BattleUtil.Who.Mine,BattleUtil.Who.Enemy} who
 */
TowerUtil.getFarthestMonster = function (monsterPool, towerPosition
    , towerRange,who) {
    var farthest = {
        distance:-1,
        monster:null
    };
    for (var i=0;i<monsterPool.length;i++){
        var distance = Util.distance(towerPosition,monsterPool[i].getPosition());
        if (distance<=towerRange && distance>farthest.distance
            && monsterPool[i].getWho()=== who
            && monsterPool[i].getCanTarget()) {
            farthest.distance = distance;
            farthest.monster = monsterPool[i];
        }
    }
    return farthest.monster;
}

/**
 * return the highest blood monster from the monsterPool to a tower
 * @param {list}monsterPool
 * @param {cc.p}towerPosition
 * @param {number}towerRange
 * @param {BattleUtil.Who.Mine,BattleUtil.Who.Enemy} who
 */
TowerUtil.getHighestBloodMonster = function (monsterPool, towerPosition
    , towerRange,who) {
    var highestBlood = {
        blood:-1,
        monster:null
    };
    for (var i=0;i<monsterPool.length;i++){
        var distance = Util.distance(towerPosition,monsterPool[i].getPosition());
        if (distance<=towerRange && monsterPool[i].getHp()>highestBlood.blood
            && monsterPool[i].getWho()=== who
            && monsterPool[i].getCanTarget()){
            highestBlood.blood = monsterPool[i].getHp();
            highestBlood.monster = monsterPool[i];
        }
    }
    return highestBlood.monster;
}

/**
 * return the lowest blood monster from the monsterPool to a tower
 * @param {[]}monsterPool
 * @param {cc.p}towerPosition
 * @param {number}towerRange
 * @param {BattleUtil.Who.Mine,BattleUtil.Who.Enemy} who
 */
TowerUtil.getLowestBloodMonster = function (
    monsterPool, towerPosition,
    towerRange,who
) {
    var lowestBlood = {
        blood:0,
        monster:null
    };
    if (monsterPool.length>0){
        lowestBlood.blood = monsterPool[0].getHp();
        lowestBlood.monster = monsterPool[0];
        for (var i=1;i<monsterPool.length;i++){
            var distance = Util.distance(towerPosition,monsterPool[i].getPosition());
            if (distance<=towerRange && monsterPool[i].getHp()<lowestBlood.blood
                && monsterPool[i].getWho()=== who
                && monsterPool[i].getCanTarget()){
                lowestBlood.blood = monsterPool[i].getHp();
                lowestBlood.monster = monsterPool[i];
            }
        }
        return lowestBlood.monster;
    }
    return null;

}

TowerUtil.MAX_EVOL_LEVEL = {
    0:1,
    1:2,
    2:3,
    3:3
}
