let res = res || {}

res.json = {
    ShopUI : {
        shopUI_json : "shop_ShopLayer.json",
        gemIcon : "shop_asset/common_icon_g_small.png",
        goldIcon : "shop_asset/common_icon_gold_small.png",
        goldIcons : [
            "shop_asset/lobby_shop_item_gold_1.png",
            "shop_asset/lobby_shop_item_gold_2.png",
            "shop_asset/lobby_shop_item_gold_3.png",
        ],
        goldChest : "common_asset/common_treasure.png",
        silverChest : "lobby_asset/treasure/common_treasure_tutorial.png"
    },
    Popup : {
        openChest_json : "popup_openchestOpenChestLayer.json",
        rewardPopup_json : "popup_Reward.json",
        cardInfoBattle_json: "popup_CardInfoBattle.json",
        cardInfoDiscovery_json: "popup_CardInfoDiscovery.json",
        cheatCardPopup_json: "popup_cheatLayer.json",
        buyItemNoti_json : "popup_BuyItemNoti.json",
        resourceNotification : "popup_ResourceNotification.json",
        functionNotAvailable_json: "popup_FunctionNotAvailable.json",
        upgradeCardSuccess_json: "popup_UpGradeCardSuccess.json",
    }
}

res.battle = {
    BackgroundLayer : {
        json : "battle_BattleBackground.json",
    },
    UILayer : {
        json : "battle_uiLayer.json",
    },
}