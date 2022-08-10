let DefaultEffectConfig = {
    SLOW : {
        animation : null,
        duration : 20, // tính trên tick
        value : -0.5,
    },
    POISON : {
        animation : null,
        duration : 20, // tính trên tick
        value : 1,
    },
    HEAL : {
        animation : {
            json : "res/fx_heal.json",
            atlas : "res/fx_heal.atlas",
            name : "fx_heal",
        },
        duration : 50, // buff này tồn tại 50 tick ~ 5s
        value : 5, // hồi 5 máu
        delay : 5, // 5 tick ~ 0.5s hồi máu một lần
    },
    DIGGING : {
        animation : null,
        value : -0.3,
    },
    FROZEN : {
        animation : null,
        duration : 20,
        value : 0,
    },
    STUN : {
        animation : {
            json : "res/effect_stun.json",
            atlas : "res/effect_stun.atlas",
            name : "animation",
        },
        duration : 20,
        value : 0,

    },
    SPEED : {
        animation : null,
        duration : 20,
        value : 1.5,
    }

}