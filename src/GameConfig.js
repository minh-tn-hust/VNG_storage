const GAME_CONFIG = {
    mapSize : {
        width : 7,
        height : 7,
    },
    numberOfObstacle : 7,
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
        }
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


