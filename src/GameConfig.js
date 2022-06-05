const GAME_CONFIG = {
    mapSize : {
        width : 7,
        height : 7,
    },
    cellSize : {
        width : 77,
        height : 80,
    },
    numberOfObstacle : 10,
}

const ASSET = {
    MONSTER: {
        ASSASSIN_RUN : {
            directionFrame : 10,
            assets : {
                assassin_plist : "res/monsters/assassin/asassin.plist",
                assassin_png : "res/monsters/assassin/assasin.png"
            },
            prefixFile : "monster_assassin_run_00",
            suffixFile : ".png",
            bottomFrameList : {start : 0, end: 9},
            bottomRightFrameList : {start : 10, end: 19},
            rightFrameList : {start : 20, end: 29},
            topRightFrameList : {start : 30, end: 39},
            topFrameList : {start : 40, end: 49},
            speed : 10,
        },
        BAT : {
            directionFrame : 8,
            assets : {
                bat_plist : "res/monsters/bat/bat.plist",
                bat_png : "res/monsters/bat/bat.png"
            },
            prefixFile : "monster_bat_run_00",
            suffixFile : ".png",
            bottomFrameList : {start : 0, end: 7},
            bottomRightFrameList : {start : 8, end: 15},
            rightFrameList : {start : 16, end: 23},
            topRightFrameList : {start : 24, end: 31},
            topFrameList : {start : 32, end: 39},
            speed : 20,
        },
        DARK_GIANT : {
            directionFrame : 14,
            assets : {
                bat_plist : "res/monsters/dark_giant/dark_giant.plist",
                bat_png : "res/monsters/dark_giant/dark_giant.png"
            },
            prefixFile : "monster_dark_giant_run_00",
            suffixFile : ".png",
            bottomFrameList : {start : 0, end: 13},
            bottomRightFrameList : {start : 14, end: 27},
            rightFrameList : {start : 28, end: 41},
            topRightFrameList : {start : 42, end: 55},
            topFrameList : {start : 56, end: 69},
            speed : 5
        },
    },
    MAP : {
        LAND : "res/map/map_cell.png",
        TREE : "res/map/map_decoration_tree.png",
        BACKGROUND : "res/map/map_background.png",
        BACKGROUND_BORDER_TOP : "res/map/background_border_top.png",
        BACKGROUND_BORDER_BOTTOM : "res/map/background_border_bottom.png",
        BEGIN : "res/map/spawn.png",
        END : "res/map/base.png"
    }
}


