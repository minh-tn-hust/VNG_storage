let TowerConfigRender = {
    BEAR_POLAR : {
        numberOfDirection: 8,
        asset : {
            plist : "res/tower_asset/polar_bear/polar_bear.plist",
            png : "res/tower_asset/polar_bear/polar_bear.png",
        },
        name : "PolarBear",
        hp: 400,
        speed: 0.125,
        hitRadius: 0.65,
        weight: 400,
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
        ],
        picPerDirection : 10,
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
    OWL_FIRECRACKER: {
        numberOfDirection: 8,
        asset : {
            plist : "res/tower_asset/cannon/cannon.plist",
            png : "res/tower_asset/cannon/cannon.png",
        },
        name : "Cannon",
        hp: 400,
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
        ],
        picPerDirection : 10,
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
    FROG_BUTCHER: {
        numberOfDirection: 8,
        asset : {
            plist : "res/tower_asset/boomerang/boomerang.plist",
            png : "res/tower_asset/boomerang/boomerang.png",
        },
        name : "boomerang",
        hp: 400,
        speed: 0.6,
        hitRadius: 1.5,
        weight: 400,
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
        ],
        idle : [
            {
                prefix: "tower_boomerang_idle_0_0",
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
        ],
        picPerDirection : 10,
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
    GOAT_LAUNCHER:{
        numberOfDirection: 1,
        asset : {
            plist : "res/tower_asset/damage/damage.plist",
            png : "res/tower_asset/damage/damage.png",
        },
        name : "damage",
        hp: 400,
        speed: 0.6,
        hitRadius: 1.5,
        weight: 400,
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
        ],
        picPerDirection : 10,
        A : {start : 0, end: 14},
    },
    CROW_SORCERER: {
        numberOfDirection: 8,
        asset : {
            plist : "res/tower_asset/wizard/wizard.plist",
            png : "res/tower_asset/wizard/wizard.png",
        },
        name : "wizard",
        hp: 400,
        speed: 0.6,
        hitRadius: 1.5,
        weight: 400,
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
        ],
        picPerDirection : 10,
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
    RABBIT_STICKY: {
        numberOfDirection: 8,
        asset : {
            plist : "res/tower_asset/oil_gun/oil_gun.plist",
            png : "res/tower_asset/oil_gun/oil_gun.png",
        },
        name : "oil_gun",
        hp: 400,
        speed: 0.6,
        hitRadius: 1.5,
        weight: 400,
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
        ],
        picPerDirection : 10,
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
    SNAKE_RED: {
        numberOfDirection : 1,
        asset : {
            plist : "res/tower_asset/attack_speed/attack_speed.plist",
            png : "res/tower_asset/attack_speed/attack_speed.png",
        },
        name : "attack_speed",
        hp: 400,
        speed: 0.6,
        hitRadius: 1.5,
        weight: 400,
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
        ],
        picPerDirection : 10,
        A : {start : 0, end: 15},
    },



    direction : ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
}

TowerConfigRender.FX = {
    Canon : {
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