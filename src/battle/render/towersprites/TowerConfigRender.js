let TowerConfigRender = {
    BEAR_POLAR : {
        numberOfDirection: 9,
        asset : {
            plist : [
                "res/tower_asset/polar_bear/polar_bear.plist",
                "res/tower_asset/polar_bear/polar_bear_2_3.plist"],
            png : "res/tower_asset/polar_bear/polar_bear.png",
        },
        name : "PolarBear",
        speed: 0.125,
        hitRadius: 0.65,
        ability: 3,
        gainEnergy: 15,
        attack : [
            {
                prefix: "tower_ice_gun_attack_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_ice_gun_attack_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_ice_gun_attack_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_ice_gun_attack_3_0",
                suffix: ".png"
            }
        ],
        idle : [
            {
                prefix: "tower_ice_gun_idle_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_ice_gun_idle_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_ice_gun_idle_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_ice_gun_idle_3_0",
                suffix: ".png",
            }
        ],
        // picPerDirection : 10,
        directionConfig: {
            attack:{
                A : {start : 0, end: 9},
                B : {start : 10, end: 19},
                C : {start : 20, end: 29},
                D : {start : 30, end: 39},
                E : {start : 40, end: 49},
                F : {start : 50, end: 59},
                G : {start : 60, end : 60},
                H : {start : 70, end : 79},
                I : {start : 80, end : 89},
            },
            idle: {
                A : {start : 0, end: 13},
                B : {start : 14, end: 27},
                C : {start : 28, end: 41},
                D : {start : 42, end: 55},
                E : {start : 56, end: 69},
                F : {start : 70, end: 83},
                G : {start : 84, end : 97},
                H : {start : 98, end : 111},
                I : {start : 112, end : 125},
            }
        }

    },
    OWL_FIRECRACKER: {
        numberOfDirection: 9,
        asset : {
            plist :[
                "res/tower_asset/cannon/cannon.plist",
                "res/tower_asset/cannon/cannon_3.plist"
            ],
            png : "res/tower_asset/cannon/cannon.png",
            png3 : "res/tower_asset/cannon/cannon_3.png"
        },
        name : "Cannon",
        speed: 0.6,
        hitRadius: 1.5,
        fireAnimPosition: cc.p(50,50),
        ability: 3,
        gainEnergy: 15,
        attack : [
            {
                prefix: "tower_cannon_attack_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_cannon_attack_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_cannon_attack_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_cannon_attack_3_0",
                suffix: ".png",
            }
        ],
        idle : [
            {
                prefix: "tower_cannon_idle_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_cannon_idle_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_cannon_idle_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_cannon_idle_3_0",
                suffix: ".png",
            },
        ],
        // picPerDirection : 10,
        directionConfig: {
            attack:{
                A : {start : 0, end: 8},
                B : {start : 9, end: 17},
                C : {start : 18, end: 26},
                D : {start : 27, end: 35},
                E : {start : 36, end: 44},
                F : {start : 45, end: 53},
                G : {start : 54, end : 62},
                H : {start : 63, end : 71},
                I : {start : 72, end : 80},
            },
            idle: {
                A : {start : 0, end: 14},
                B : {start : 15, end: 29},
                C : {start : 30, end: 44},
                D : {start : 45, end: 59},
                E : {start : 60, end: 74},
                F : {start : 75, end: 89},
                G : {start : 90, end : 104},
                H : {start : 105, end : 119},
                I : {start : 120, end : 134},
            }
        }
    },
    FROG_BUTCHER: {
        numberOfDirection: 9,
        asset : {
            plist : [
                "res/tower_asset/boomerang/boomerang.plist",
                "res/tower_asset/boomerang/boomerang_3.plist",],
            png : "res/tower_asset/boomerang/boomerang.png",
        },
        name : "boomerang",
        speed: 0.6,
        hitRadius: 1.5,
        ability: 3,
        gainEnergy: 15,
        attack : [
            {
                prefix: "tower_boomerang_attack_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_boomerang_attack_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_boomerang_attack_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_boomerang_attack_3_0",
                suffix: ".png",
            },
        ],
        idle : [
            {
                prefix: "tower_boomerang_idle_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_boomerang_idle_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_boomerang_idle_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_boomerang_idle_3_0",
                suffix: ".png",
            },
        ],
        directionConfig: {
            attack:{
                A : {start : 0, end: 10},
                B : {start : 11, end: 21},
                C : {start : 22, end: 32},
                D : {start : 33, end: 43},
                E : {start : 44, end: 54},
                F : {start : 55, end: 65},
                G : {start : 66, end : 76},
                H : {start : 77, end : 87},
                I : {start : 88, end : 98},
            },
            idle: {
                A : {start : 0, end: 13},
                B : {start : 14, end: 27},
                C : {start : 28, end: 41},
                D : {start : 42, end: 55},
                E : {start : 56, end: 69},
                F : {start : 70, end: 83},
                G : {start : 84, end : 97},
                H : {start : 98, end : 111},
                I : {start : 112, end : 125},
            }
        }

    },
    GOAT_LAUNCHER:{
        numberOfDirection: 1,
        asset : {
            plist : [
                "res/tower_asset/damage/damage.plist",],
            png : "res/tower_asset/damage/damage.png",
        },
        name : "damage",
        speed: 0.6,
        hitRadius: 1.5,
        ability: 3,
        gainEnergy: 15,
        attack : [
            {
                prefix: "tower_damage_attack_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_damage_attack_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_damage_attack_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_damage_attack_3_0",
                suffix: ".png",
            },
        ],
        idle : [
            {
                prefix: "tower_damage_idle_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_damage_idle_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_damage_idle_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_damage_idle_3_0",
                suffix: ".png",
            },
        ],
        directionConfig: {
            attack:{
                A : {start : 0, end: 14},
            },
            idle: {
                A : {start : 0, end: 14},
            }
        },
    },
    CROW_SORCERER: {
        numberOfDirection: 9,
        asset : {
            plist : [
                "res/tower_asset/wizard/wizard.plist",
                "res/tower_asset/wizard/wizard_3.plist"],
            png : "res/tower_asset/wizard/wizard.png",
        },
        name : "wizard",
        speed: 0.6,
        hitRadius: 1.5,
        ability: 3,
        gainEnergy: 15,
        attack : [
            {
                prefix: "tower_wizard_attack_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_wizard_attack_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_wizard_attack_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_wizard_attack_3_0",
                suffix: ".png",
            },
        ],
        idle : [
            {
                prefix: "tower_wizard_idle_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_wizard_idle_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_wizard_idle_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_wizard_idle_3_0",
                suffix: ".png",
            },
        ],
        directionConfig: {
            attack: {
                A : {start : 0, end: 8},
                B : {start : 9, end: 17},
                C : {start : 18, end: 26},
                D : {start : 27, end: 35},
                E : {start : 36, end: 44},
                F : {start : 45, end: 53},
                G : {start : 54, end : 62},
                H : {start : 63, end : 71},
                I : {start : 72, end : 80},
            },
            idle: {
                A : {start : 0, end: 14},
                B : {start : 15, end: 29},
                C : {start : 30, end: 44},
                D : {start : 45, end: 59},
                E : {start : 60, end: 74},
                F : {start : 75, end: 89},
                G : {start : 90, end : 104},
                H : {start : 105, end : 119},
                I : {start : 120, end : 134},
            }
        }
    },
    RABBIT_STICKY: {
        numberOfDirection: 9,
        asset : {
            plist : [
                "res/tower_asset/oil_gun/oil_gun.plist",
                "res/tower_asset/oil_gun/oil_gun_3.plist",],
            png : "res/tower_asset/oil_gun/oil_gun.png",
        },
        name : "oil_gun",
        speed: 0.6,
        hitRadius: 1.5,
        ability: 3,
        gainEnergy: 15,
        attack : [
            {
                prefix: "tower_oil_gun_attack_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_oil_gun_attack_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_oil_gun_attack_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_oil_gun_attack_3_0",
                suffix: ".png",
            },
        ],
        idle : [
            {
                prefix: "tower_oil_gun_idle_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_oil_gun_idle_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_oil_gun_idle_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_oil_gun_idle_3_0",
                suffix: ".png",
            },
        ],
        directionConfig: {
            attack: {
                A : {start : 0, end: 10},
                B : {start : 11, end: 21},
                C : {start : 22, end: 32},
                D : {start : 33, end: 43},
                E : {start : 44, end: 54},
                F : {start : 55, end: 65},
                G : {start : 66, end : 76},
                H : {start : 77, end : 87},
                I : {start : 88, end : 98},
            },
            idle: {
                A : {start : 0, end: 13},
                B : {start : 14, end: 27},
                C : {start : 28, end: 41},
                D : {start : 42, end: 55},
                E : {start : 56, end: 69},
                F : {start : 70, end: 83},
                G : {start : 84, end : 97},
                H : {start : 98, end : 111},
                I : {start : 112, end : 125},
            }
        }
    },
    SNAKE_RED: {
        numberOfDirection : 1,
        asset : {
            plist : [
                "res/tower_asset/attack_speed/attack_speed.plist",],
            png : "res/tower_asset/attack_speed/attack_speed.png",
        },
        name : "attack_speed",
        speed: 0.6,
        hitRadius: 1.5,
        ability: 3,
        gainEnergy: 15,
        attack : [
            {
                prefix: "tower_attack_speed_attack_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_attack_speed_attack_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_attack_speed_attack_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_attack_speed_attack_3_0",
                suffix: ".png",
            },
        ],
        idle : [
            {
                prefix: "tower_attack_speed_idle_0_0",
                suffix: ".png",
            },
            {
                prefix: "tower_attack_speed_idle_1_0",
                suffix: ".png",
            },
            {
                prefix: "tower_attack_speed_idle_2_0",
                suffix: ".png",
            },
            {
                prefix: "tower_attack_speed_idle_3_0",
                suffix: ".png",
            },
        ],
        directionConfig: {
            attack: {
                A : {start : 0, end: 15},
            },
            idle: {
                A : {start : 0, end: 15},
            }
        }
    },

    direction : ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
}

TowerConfigRender.FX = {
    Cannon : {
        atlas : "res/tower_asset/fx/tower_cannon_fx.atlas",
        json : "res/tower_asset/fx/tower_cannon_fx.json"
    },
    ICE : {
        atlas : "res/tower_asset/fx/tower_ice_fx.atlas",
        json : "res/tower_asset/fx/tower_ice_fx.json",
    },
    Oil : {
        atlas : "res/tower_asset/fx/tower_oil_fx.atlas",
        json: "res/tower_asset/fx/tower_oil_fx.json"
    },
    Speed : {
        atlas : "res/tower_asset/fx/tower_speed_fx.atlas",
        json : "res/tower_asset/fx/tower_speed_fx.json"
    },
    Strength : {
        atlas : "res/tower_asset/fx/tower_strength_fx.atlas",
        json : "res/tower_asset/fx/tower_strength_fx.json"
    },
    Wizard : {
        atlas : "res/tower_asset/fx/tower_wizard_fx.atlas",
        json : "res/tower_asset/fx/tower_wizard_fx.json"
    }
}