let BattleConfig = {
    ObjectLayer : {
        zOrder : 999,
    },
    MapLayer : {
        zOrder : 998
    },
    BackgroundLayer: {
        zOrder : -1000
    },
    UILayer : {
        zOrder : 1000,
    },
    MonsterLayer : {
        zOrder : 999
    },
    TowerLayer : {
        zOrder : 998
    },
    SpellLayer : {
        zOrder : 997
    },
    Map : {
        WIDTH : 7,
        HEIGHT : 5,
        cellWidth  : 77,
        cellHeight : 77,
        yDeltaCenter : {
            Mine : 244,
            Enemy: 238
        },
    },
    Cell : {
        PATH : 1005,
        NORMAL : 100,
        TREE : 101,
        HOLE : 102,
        DAMAGE_UP : 110,
        SPEED_UP : 112,
        RANGE_UP : 111,
        OWL_FIRECRACKER : 0,
        CROW_SORCERER : 1,
        FROG_BUTCHER : 2,
        RABBIT_STICKY : 3,
        BEAR_POLAR : 4,
        GOAT_LAUNCHER : 5,
        SNAKE_RED : 6,
    },
    Asset : {
        TREE : "res/map_asset/map_decoration_tree_0002.png",
        HOLE : "res/battle_asset/UI/ui_hole.png",
        DAMAGE_UP : "res/battle_asset/battle_item_damage.png",
        SPEED_UP : "res/battle_asset/battle_item_attack_speed.png",
        RANGE_UP : "res/battle_asset/battle_item_range.png",
    },
    Animation : [
        // Wining
        {
            atlas : "res/fx_result_win.atlas",
            json : "res/fx_result_win.json",
            init : "fx_result_win_init",
            idle : "fx_result_win_idle"
        },
        // Losing
        {
            atlas : "res/fx_result_lose.atlas",
            json : "res/fx_result_lose.json",
            init : "fx_result_lose_init",
            idle : "fx_result_lose_idle"
        },
        // Drawing
        {
            atlas : "res/fx_result_draw.atlas",
            json : "res/fx_result_draw.json",
            init : "fx_result_draw_init",
            idle : "fx_result_draw_idle"
        }
    ],

    BuildImage:{
        1 : "res/tower_asset/buildTower.png",
        2 : "res/tower_asset/buildTower.png",
        3 : "res/tower_asset/buildTower.png",
        4 : "res/tower_asset/buildTower.png",
        5 : "res/tower_asset/buildTower.png",
        6 : "res/tower_asset/buildTower.png",
        7 : "res/tower_asset/buildTower.png",
        10 : "res/tower_asset/buildTower.png",
        20 : "res/spell_asset/battle_potion_range.png",
    },
    PREPARE_TIME : 5,
    ROUND_TIME : 20,
    Wining : 0,
    Losing : 1,
    Drawing : 2,
    MAX_ENERGY : 200,
    TICK_DURATION : 0.1,
    INIT_ENERGY : 200,
    INIT_POINT : 20,
    INIT_ROUND : 0

}