let CardAssetConfig = {
    assetBackground : [
        "res/card_asset/card_background_1.png",
        "res/card_asset/card_background_2.png",
        "res/card_asset/card_background_3.png",
        "res/card_asset/card_background_4.png",
    ],
    assetImage : [
        "res/card_asset/card_tower_cannon.png",
        "res/card_asset/card_tower_wizard.png",
        "res/card_asset/card_tower_boomerang.png",
        "res/card_asset/card_tower_oil_gun.png",
        "res/card_asset/card_tower_ice_gun.png",
        "res/card_asset/card_tower_attack_speed.png",
        "res/card_asset/card_tower_damage.png",
        "",
        "",
        "",
        "res/card_asset/card_monster_swordsman.png",
        "res/card_asset/card_monster_assassin.png",
        "res/card_asset/card_monster_giant.png",
        "res/card_asset/card_monster_bat.png",
        "res/card_asset/card_monster_ninja.png",
        "",
        "",
        "",
        "",
        "",
        "res/card_asset/card_potion_fireball.png",
        "res/card_asset/card_potion_frozen.png",
        "res/card_asset/card_potion_heal.png",
        "res/card_asset/card_potion_speed_up.png",
        "res/card_asset/card_potion_trap.png",
        "res/card_asset/card_potion_power.png",
    ],
    assetBorder : [
        "res/card_asset/card_border_1.png",
        "res/card_asset/card_border_2.png",
        "res/card_asset/card_border_3.png",
        "res/card_asset/card_border_4.png",
    ]
}
CardAssetConfig.Level = {
    C : 0,
    B : 1,
    A : 2,
    S : 3
}
CardAssetConfig.Tower = {
    OWL_FIRECRACKER : 0,
    CROW_SORCERER : 1,
    FROG_BUTCHER : 2,
    RABBIT_STICKY : 3,
    BEAR_POLAR : 4,
    SNAKE_RED : 5,
    GOAT_LAUNCHER : 6
}

CardAssetConfig.TowerIdToName={
    0: "OWL_FIRECRACKER",
    1: "CROW_SORCERER",
    2: "FROG_BUTCHER",
    3: "RABBIT_STICKY",
    4: "BEAR_POLAR",
    5: "SNAKE_RED",
    6: "GOAT_LAUNCHER"
}



CardAssetConfig.Monster = {
   GHOST_SWORDER : 10,
   CROW_SKELETON : 11,
   GIANT : 12,
   EVIL_BAT : 13,
   SKELETON_UNDERGROUND : 14,
}

CardAssetConfig.Spell = {
    FIRE_BALL : 20,
    FREEZE_BALL : 21,
    HEALING : 22,
    SPEED_UP : 23,
    SPRING : 24,
    POWER_UP :25
}

CardAssetConfig.DisplayPara={
    0:["damage","attackSpeed","range","bulletRadius"],
    1:["damage","attackSpeed","range","bulletRadius"],
    2:["damage","attackSpeed","range","bulletRadius"],
    3:["effectSlowTime","attackSpeed","range","bulletRadius"],
    4:["effectFreezeTime","attackSpeed","range","bulletRadius"],
    5:["attackSpeedUp"],
    6:["attackSpeedUp"],

    10 : ["hp","speed","numberMonsters"],
    11 : ["hp","speed","numberMonsters"],
    12 : ["hp","speed","numberMonsters"],
    13 : ["hp","speed","numberMonsters"],
    14 : ["hp","speed","numberMonsters"],

    20 : ["damage","effectRange"],
    21 : ["damage","effectRange","effectDuration"],
    22 : ["healthUp","effectRange","effectDuration"],
    23 : ["effectRange","effectDuration"],
    24 : [],
    25 : []
}
CardAssetConfig.STATS={
    STAT_ID: {
        damage: 1,
        speed: 2,
        hp: 3,
        numberMonsters: 4,
        bulletRadius: 5,
        attackSpeed: 6,
        attackSpeedUp: 7,
        range: 8,
        rangeUp: 9,
        healthUp: 10,
        effectFreezeTime: 11,
        damageUp: 12,
        special: 13,
        effectRange: 14,
        effectDuration: 15,
        effectSlowTime: 16,
    },
    STAT_CONFIG : {
        1: {
            "prev": "",
            "name": "Sát thương",
            "image": "card_asset/stat_icon/stat_icon_damage.png",
            "unit": ""
        },
        2: {
            "prev": "",
            "name": "Tốc chạy",
            "image": "card_asset/stat_icon/stat_icon_speed.png",
            "unit": ""
        },
        3: {
            "prev": "",
            "name": "Máu",
            "image": "card_asset/stat_icon/stat_icon_hp.png",
            "unit": ""
        },
        4: {
            "prev": "",
            "name": "Số lượng",
            "image": "card_asset/stat_icon/stat_icon_number_monsters.png",
            "unit": ""
        },
        5: {
            "prev": "",
            "name": "Loại bắn",
            "image": "card_asset/stat_icon/stat_icon_bullet_radius.png",
            "unit": ""
        },
        6: {
            "prev": "",
            "name": "Tốc bắn",
            "image": "card_asset/stat_icon/stat_icon_attack_speed.png",
            "unit": ""
        },
        7: {
            "prev": "",
            "name": "Tăng tốc bắn",
            "image": "card_asset/stat_icon/stat_icon_attack_speed_up.png",
            "unit": "%"
        },
        8: {
            "prev": "",
            "name": "Tầm bắn",
            "image": "card_asset/stat_icon/stat_icon_range.png",
            "unit": ""
        },
        9: {
            "prev": "",
            "name": "Tăng tầm bắn",
            "image": "card_asset/stat_icon/stat_icon_range_up.png",
            "unit": ""
        },
        10: {
            "prev": "",
            "name": "Hồi máu",
            "image": "card_asset/stat_icon/stat_icon_heal.png",
            "unit": ""
        },
        11: {
            "prev": "",
            "name": "Đóng băng",
            "image": "card_asset/stat_icon/stat_icon_immobilize.png",
            "unit" : "s"
        },
        12: {
            "prev": "<",
            "name": "Tăng sát thương",
            "image": "card_asset/stat_icon/stat_icon_damage_up.png",
            "unit" : "%"
        },
        13: {
            "prev": "",
            "name": "Cấp thẻ tác dụng",
            "image": "card_asset/stat_icon/stat_icon_special.png",
            "unit": ""
        },
        14: {
            "prev": "",
            "name": "Khoảng tác dụng",
            "image": "card_asset/stat_icon/stat_icon_potion_range.png",
            "unit": ""
        },
        15: {
            "prev": "",
            "name": "Thời gian tác dụng",
            "image": "card_asset/stat_icon/stat_icon_time.png",
            "unit": ""
        },
        16: {
            "prev": "",
            "name": "Làm chậm",
            "image": "card_asset/stat_icon/stat_icon_immobilize.png",
            "unit": "s"
        },
    }
}



