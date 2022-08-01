/**
 * Gói tin trả về từ CMDID = gv.CMD.MATHING
 */
let CardInfo = cc.Class.extend({
    cardID:0,
    level:1,
    rank:0,
    star:2,
    pieces:0,
    status:1,
    requiredEnergy:8,
    cardImage:{}
})

let BattleInitiator = cc.Class.extend({
    eid: 1,
    name: "A KiΩn d?p choai",
    trophy: 1999,
    roomId: 165,
    myMap: [[1005,1005,100,100,101,100,102],[100,1005,1005,110,1005,1005,1005],[100,112,1005,1005,1005,111,1005],[100,100,101,100,100,100,1005],[100,100,100,100,100,100,1005]],
    battleDeck : [CardInfo(),CardInfo(),CardInfo(),CardInfo(), CardInfo(),CardInfo(),CardInfo(),CardInfo()]
})

let MonsterConfigInfo = cc.Class.extend({
    asset : {
        plist : "res/boss_asset/iceman/iceman.plist",
        png : "res/boss_asset/iceman/iceman.png",
    },
    name : "Iceman",
    hp: 400,
    speed: 0.4,
    hitRadius: 0.325,
    weight: 400,
    ability: 3,
    gainEnergy: 15,
    dropPoint : 5,
    prefix : "monster_iceman_run_0",
    suffix : ".png",
    picPerDirection : 24,
    hpPosition : cc.p(85, 140), // vị trí hiển thị thanh HP
    centroidPosition : cc.p(85, 100), // vị trí trung tâm của sprite
    A : {start : 0, end: 23},
    B : {start : 24, end: 47},
    C : {start : 48, end: 71},
    D : {start : 72, end: 95},
    E : {start : 96, end: 119},
})


