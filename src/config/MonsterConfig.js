let MonsterConfig = {


    // MONSTER =================================================

    GHOST_SWORDER : {
        asset : {
            plist : "res/monster_asset/swordman/swordman.plist",
            png : "res/monster_asset/swordman/swordman.png",
        },
        name : "SwordMan",
        hp: 30,
        speed: 0.8,
        hitRadius: 0.1,
        weight: 30,
        requireEnergy : 1, // năng lượng yêu cầu khi sử dụng thẻ bài
        gainEnergy: 1, // năng lượng được nhận khi quái đi vào trụ
        dropPoint : 1, // máu nhà chính mất khi quái đi vào trụ
        prefix : "monster_swordsman_run_0",
        suffix : ".png",
        picPerDirection : 11,
        hpPosition : cc.p(57, 110), // vị trí hiển thị thanh HP
        centroidPosition : cc.p(57, 70), // vị trí trung tâm của sprite
        A : {start : 0, end: 10},
        B : {start : 11, end: 21},
        C : {start : 22, end: 32},
        D : {start : 33, end: 43},
        E : {start : 44, end: 54},
    },

    CROW_SKELETON : {
        asset : {
            plist : "res/monster_asset/assassin/assassin.plist",
            png : "res/monster_asset/assassin/assassin.png",
        },
        name : "Assassin",
        hp: 15,
        speed: 1.4,
        hitRadius: 0.075,
        weight: 15,
        requireEnergy : 1, // năng lượng yêu cầu khi sử dụng thẻ bài
        gainEnergy: 1, // năng lượng được nhận khi quái đi vào trụ
        dropPoint : 1, // máu nhà chính mất khi quái đi vào trụ
        prefix : "monster_assassin_run_0",
        suffix : ".png",
        picPerDirection : 10,
        hpPosition : cc.p(50, 85), // vị trí hiển thị thanh HP
        centroidPosition : cc.p(48, 60), // vị trí trung tâm của sprite
        A : {start : 0, end: 9},
        B : {start : 10, end: 19},
        C : {start : 20, end: 29},
        D : {start : 30, end: 39},
        E : {start : 40, end: 49},
    },

    GIANT : {
        asset : {
            plist : "res/monster_asset/giant/giant.plist",
            png : "res/monster_asset/giant/giant.png",
        },
        name : "Giant",
        hp: 200,
        speed: 0.5,
        hitRadius: 0.25,
        weight: 200,
        requireEnergy : 3, // năng lượng yêu cầu khi sử dụng thẻ bài
        gainEnergy: 3, // năng lượng được nhận khi quái đi vào trụ
        dropPoint : 1, // máu nhà chính mất khi quái đi vào trụ
        prefix : "monster_giant_run_0",
        suffix : ".png",
        picPerDirection : 10,
        hpPosition : cc.p(60, 130), // vị trí hiển thị thanh HP
        centroidPosition : cc.p(58, 95), // vị trí trung tâm của sprite
        A : {start : 0, end: 13},
        B : {start : 14, end: 27},
        C : {start : 28, end: 41},
        D : {start : 42, end: 55},
        E : {start : 56, end: 69},
    },

    EVIL_BAT : {
        asset : {
            plist : "res/monster_asset/bat/bat.plist",
            png : "res/monster_asset/bat/bat.png",
        },
        name : "Bat",
        hp: 25,
        speed: 1,
        hitRadius: 0.1,
        weight: 25,
        requireEnergy : 2, // năng lượng yêu cầu khi sử dụng thẻ bài
        gainEnergy: 2, // năng lượng được nhận khi quái đi vào trụ
        dropPoint : 1, // máu nhà chính mất khi quái đi vào trụ
        prefix : "monster_bat_run_0",
        suffix : ".png",
        picPerDirection : 8,
        hpPosition : cc.p(30, 75), // vị trí hiển thị thanh HP
        centroidPosition : cc.p(28, 52), // vị trí trung tâm của sprite
        A : {start : 0, end: 7},
        B : {start : 8, end: 15},
        C : {start : 16, end: 23},
        D : {start : 24, end: 31},
        E : {start : 32, end: 39},
    },

    NINJA : {
        asset : {
            plist : "res/monster_asset/ninja/ninja.plist",
            png :   "res/monster_asset/ninja/ninja.png",
        },
        name : "Ninja",
        hp: 24,
        speed: 0.8,
        hitRadius: 0.1,
        weight: 400,
        ability: 3,
        gainEnergy: 1,
        dropPoint : 1,
        prefix : "monster_ninja_run_0",
        suffix : ".png",
        picPerDirection : 10,
        hpPosition : cc.p(50, 85), // vị trí hiển thị thanh HP
        centroidPosition : cc.p(47, 55), // vị trí trung tâm của sprite
        A : {start : 0, end: 9},
        B : {start : 10, end: 19},
        C : {start : 20, end: 29},
        D : {start : 30, end: 39},
        E : {start : 40, end: 49},
    },
    // BOSS =====================================================
    ICE_MAN : {
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
    },

    DARK_GIANT : {
        asset : {
            plist : "res/boss_asset/darkgiant/darkgiant.plist",
            png :   "res/boss_asset/darkgiant/darkgiant.png",
        },
        name : "DarkGiant",
        hp: 400,
        speed: 0.4,
        hitRadius: 0.325,
        weight: 400,
        ability: 3,
        gainEnergy: 15,
        dropPoint : 5,
        prefix : "monster_dark_giant_run_0",
        suffix : ".png",
        picPerDirection : 24,
        hpPosition : cc.p(65, 140), // vị trí hiển thị thanh HP
        centroidPosition : cc.p(53, 100), // vị trí trung tâm của sprite
        A : {start : 0, end: 13},
        B : {start : 14, end: 27},
        C : {start : 28, end: 41},
        D : {start : 42, end: 55},
        E : {start : 56, end: 69},
    },

    DESERT_KING : {
        asset : {
            plist : "res/boss_asset/desert_king/desert_king.plist",
            png : "res/boss_asset/desert_king/desert_king.",
        },
        name : "KingDesert",
        hp: 400,
        speed: 0.4,
        hitRadius: 0.325,
        weight: 400,
        ability: 3,
        gainEnergy: 15,
        dropPoint : 5,
        prefix : "monster_desert_king_run_0",
        suffix : ".png",
        picPerDirection : 24,
        hpPosition : cc.p(65, 140), // vị trí hiển thị thanh HP
        centroidPosition : cc.p(53, 100), // vị trí trung tâm của sprite
        A : {start : 0, end: 24},
        B : {start : 25, end: 49},
        C : {start : 50, end: 74},
        D : {start : 75, end: 99},
        E : {start : 100, end: 124},
        effectAround : {
            json : "res/boss_asset/desert_king/fx_boss_sand_king.json",
            atlas : "res/boss_asset/desert_king/fx_boss_sand_king.atlas",
            animationName : "fx_back",
        },
        skillRange : 1.0
    },
    direction : ["A", "B", "C", "D", "E"],

    buff : {
        heal : {
            atlas : "res/fx_heal.atlas",
            json : "res/fx_heal.json",
            animationName : "fx_heal",
        },
        stun : {
            atlas : "res/effect_stun.atlas",
            json: "res/effect_stun.json",
            animationName : "animation",
        },
    },
    BASE_RADIUS : 100,
    Type : {
        // monster
        GHOST_SWORDER : 10,
        CROW_SKELETON : 11,
        EVIL_BAT : 13,
        SKELETON_UNDERGROUND : 14,
        DRAGON : 15,
        GIANT : 12,
        NINJA : 16,

        // boss
        DARK_GIANT : 20,
        ICE_MAN : 21,
        DESERT_KING: 22,
    },
    INIT_DIRECTION : cc.p(0, 1),
    INIT_POSITION : cc.p(0,0)
}