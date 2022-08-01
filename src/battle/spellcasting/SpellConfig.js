let SpellConfig = {
    IDToName : {
        20: "FireBall",
        21: "Freeze",
        22: "Heal",
        23: "SpeedUp"
    },
    FireBall : {
        name : "FireBall",
        // displayPara :["damage","effectRange"],
        effectRange: {
            C: 0.8,
            B: 1,
            A: 1.2,
            S: 1.4
        },
        damage: [50,55,61,67,73,81,90,101,113,127,142,162,184,210,240,273,317,368,427,495],
        FX :{
            json: "res/spell_asset/fx/effect_atk_fire.json",
            atlas: "res/spell_asset/fx/effect_atk_fire.atlas",
            animationName: "animation_top"
        }
    },

    Freeze : {
        name : "Freeze",
        // displayPara :["damage","effectRange","effectDuration"],
        effectRange: {
            C: 0.8,
            B: 1,
            A: 1.2,
            S: 1.4
        },
        damage: [10,11,12,13,15,16,18,20,23,25,28,32,37,42,48,55,63,74,85,99],
        effectDuration: 5,
        FX :{
            json: "res/spell_asset/fx/effect_atk_ice.json",
            atlas: "res/spell_asset/fx/effect_atk_ice.atlas",
            animationName: "animation_fireball"
        }
    },

    Heal : {
        name : "Heal",
        // displayPara :["healthUp","effectRange","effectDuration"],
        effectRange: {
            C: 0.8,
            B: 1,
            A: 1.2,
            S: 1.4
        },
        healthUp: [2,2.2,2.4,2.7,2.9,3.2,3.5,3.9,4.3,4.7,5.2,5.7,6.3,6.9,7.6,8.4,9.2,10.1,11.1,12.2],
        effectDuration: 4,
        FX :{
            json: "res/spell_asset/fx/effect_buff_heal.json",
            atlas: "res/spell_asset/fx/effect_buff_heal.atlas",
            animationName: "animation_fireball"
        }
    },

    SpeedUp : {
        name : "SpeedUp",
        // displayPara :["effectRange","effectDuration"],
        effectRange: {
            C: 0.8,
            B: 1,
            A: 1.2,
            S: 1.4
        },
        effectDuration: 4,
        FX :{
            json: "res/spell_asset/fx/effect_buff_speed.json",
            atlas: "res/spell_asset/fx/effect_buff_speed.atlas",
            animationName: "animation_fireball"
        }
    }
}
