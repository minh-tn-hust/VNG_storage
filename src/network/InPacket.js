/*
Định nghĩa các gói tin nhận từ server
 */
gv.CMD = gv.CMD ||{};

NetworkManager = NetworkManger ||{};
NetworkManager.packetMap = {};

//Handshake
NetworkManager.packetMap[gv.CMD.HAND_SHAKE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.token = this.getString();
        }
    }
);

NetworkManager.packetMap[gv.CMD.USER_LOGIN] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
        }
    }
);

NetworkManager.packetMap[gv.CMD.RESET_MAP] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
        }
    }
);


NetworkManager.packetMap[gv.CMD.MOVE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.x = this.getInt();
            this.y = this.getInt();
        }
    }
);

NetworkManger.packetMap[gv.CMD.GET_USER_INFO] = fr.InPacket.extend(
    {
        ctor:function(){
            this._super();
        },

        readData:function(){
            this.gold = this.getInt()
            this.gem = this.getInt()
            this.trophy = this.getInt()
            this.exp = this.getInt()
            this.level = this.getInt()

            this.numCard = this.getInt()
            this.cards = []
            for(let i = 0; i < this.numCard; i++){
                let card = {}
                card.cid = this.getInt()
                card.level = this.getInt()
                card.pieces = this.getInt()
                card.status = this.getInt()
                this.cards.push(card)
            }
            this.chests = [];
            for(let i= 0; i< 4; i++){
                let chest = {};
                chest.index = this.getInt()
                chest.startTime = this.getInt()
                chest.waitingTime = this.getInt()
                chest.status = this.getInt()
                this.chests.push(chest);
            }

            this.shopItems =[];
            for(let i= 0; i < 3; i++){
                let shopItem = {}
                shopItem.isBuyed = this.getInt()
                shopItem.index = this.getInt()
                shopItem.coin = this.getInt()
                shopItem.id = this.getInt()
                shopItem.pieces = this.getInt()
                this.shopItems.push(shopItem)
            }

            this.shopCoins = [];
            for(let i= 0; i< 3; i++){
                let shopCoin = {}
                shopCoin.index = this.getInt()
                shopCoin.value = this.getInt()
                shopCoin.gem = this.getInt()
                this.shopCoins.push(shopCoin)
            }
            // this.initTime = this.getInt()
            // this.current = this.getInt()
        }
    }
);

NetworkManger.packetMap[gv.CMD.BUY_SHOP_COIN] = fr.InPacket.extend({
    ctor : function() {
        this._super()
    },
    readData : function() {
        this.coin = this.getInt()
        this.gem = this.getInt()
        this.error = this.getError()
    }
})

NetworkManger.packetMap[gv.CMD.BUY_SHOP_ITEM] = fr.InPacket.extend({
    ctor : function() {
        this._super()
    },
    readData : function() {
        this.err = this.getError();
        this.rewardCoin = 0;
        this.numCardReward = 0;
        this.listCardReward = [];
        if(this.err === 7){
            this.rewardCoin = this.getInt();
            this.numCardReward = this.getInt();
            this.listCardReward = []
            this.listCardReward.push({coin : this.rewardCoin})
            for(var i = 0; i <this.numCardReward; i++){
                var card = {};
                card.cid = this.getInt()
                card.pieces = this.getInt()
                this.listCardReward.push(card);
            }
        }
    }
})

NetworkManager.packetMap[gv.CMD.GET_SHOP_INFO] = fr.InPacket.extend({
    ctor : function() {
        this._super()
    },
    readData : function() {
        this.err = this.getError()
        this.shopItems =[];
        for(let i= 0; i < 3; i++){
            let shopItem = {}
            shopItem.isBuyed = this.getInt()
            shopItem.index = this.getInt()
            shopItem.coin = this.getInt()
            shopItem.id = this.getInt()
            shopItem.pieces = this.getInt()
            this.shopItems.push(shopItem)
        }

        this.shopCoins = [];
        for(let i= 0; i< 3; i++){
            let shopCoin = {}
            shopCoin.index = this.getInt()
            shopCoin.value = this.getInt()
            shopCoin.gem = this.getInt()
            this.shopCoins.push(shopCoin)
        }
    }
})

NetworkManager.packetMap[gv.CMD.CHEAT_RESOURCE] = fr.InPacket.extend({
    ctor: function() {
        this._super()
    },

    readData: function() {
        this.error = this.getError();
    }
})

NetworkManager.packetMap[gv.CMD.CHEAT_CHEST] = fr.InPacket.extend({
    ctor: function() {
        this._super()
    },

    readData: function() {
        this.error = this.getError();
    }
})

NetworkManger.packetMap[gv.CMD.CHOOSE_CHEST] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function() {
        this.error = this.getError();
        if (this.error ===NetworkManager.ERROR.SUCCESS) {
            this.chest = {};
            this.chest.index = this.getInt();
            this.chest.startTime = this.getInt();
            this.chest.waitingTime = this.getInt();
            this.chest.status = this.getInt();
            cc.log("Receive chests: ", JSON.stringify(this.chest));
        }
    }
})

NetworkManager.packetMap[gv.CMD.OPEN_CHEST] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        cc.log("Reading OPEN CHEST Res")

        this.error = this.getError();
        if (this.error === NetworkManager.ERROR.SUCCESS) {
            this.remainingTime = this.getInt();
            this.rewardCoin = this.getInt();
            this.numCardReward = this.getInt();
            this.listCardReward = []
            this.listCardReward.push({coin: this.rewardCoin})
            for (var i = 0; i < this.numCardReward; i++) {
                var card = {};
                card.cid = this.getInt()
                card.pieces = this.getInt()
                this.listCardReward.push(card);
            }
        } else if (this.error === NetworkManager.ERROR.TIME_REMAIN){
            cc.log("Error is 8, cannot open")
            this.remainingTime = this.getInt();
        } else {
            cc.log("Error is: ",this.error);
        }
        cc.log("READING DON");
    }
})

NetworkManager.packetMap[gv.CMD.GET_COIN_GEM] = fr.InPacket.extend({
    ctor : function () {
        this._super()
    },
    readData : function() {
        this.coin = this.getInt()
        this.gem = this.getInt()
    },
})

NetworkManager.packetMap[gv.CMD.CHANGE_CARD] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    readData: function () {
        this.error = this.getError();
    }
})

NetworkManager.packetMap[gv.CMD.UPGRADE_CARD] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    readData: function () {
        this.error = this.getError();
        if (this.error===NetworkManager.ERROR.SUCCESS){
            this.cid = this.getInt();
            this.new_level = this.getInt();
            this.new_pieces = this.getInt();
            this.coin = this.getInt();
        }
    }
})

NetworkManager.packetMap[gv.CMD.GET_CARD_INFO] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    
    readData: function () {
        this.error = this.getError();
        this.numCard = this.getInt();
        this.cards = [];
        for(let i = 0; i < this.numCard; i++){
            let card = {};
            card.cid = this.getInt();
            card.level = this.getInt();
            card.pieces = this.getInt();
            card.status = this.getInt();
            this.cards.push(card);
        }
    }
})

NetworkManager.packetMap[gv.CMD.BUY_CHEST_BY_GEM] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },

    readData: function () {
        this.error = this.getError();
        if (this.error === NetworkManager.ERROR.SUCCESS) {
            this.gem = this.getInt();
            cc.log("Read gem: ",this.gem);
        }
    }
})

NetworkManager.packetMap[gv.CMD.GET_TIMESTAMP] = fr.InPacket.extend({
    ctor : function(){
        this._super()
    },
    readData : function() {
        this.error = this.getError()
        this.timestamp = this.getInt()
    }
})

NetworkManager.packetMap[gv.CMD.MATCHING] = fr.InPacket.extend({
    ctor : function(){
        this._super()
    },
    readData : function() {
        this.eid = this.getInt()
        this.roomId = this.getInt()
        this.myMap = []
        for(var i= 0; i<5; i++){
            var tmp = []
            for(var j=0; j< 7; j++){
                tmp.push(this.getInt())
            }
            this.myMap.push(tmp)
        }
        this.eMap = []
        for(var i= 0; i<5; i++){
            var tmp = []
            for(var j=0; j< 7; j++){
                tmp.push(this.getInt())
            }
            this.eMap.push(tmp)
        }
        this.name = "HELLO TESTER"
        this.trophy = 1999
    }
})

NetworkManager.packetMap[gv.CMD.ABORT_MATCHING] = fr.InPacket.extend({
    ctor : function(){
        this._super()
    },
    readData : function() {
        this.err = this.getError()
    }
})

NetworkManager.packetMap[gv.CMD.DROP_MONSTER_TEST] =  fr.InPacket.extend({
    ctor : function() {
        this._super()
    },
    readData : function() {
        this.comingTick = this.getInt()
        this.cardId =  this.getInt()
    }
})

NetworkManger.packetMap[gv.CMD.DROP_MONSTER] = fr.InPacket.extend({
    ctor : function() {
        this._super()
    },
    readData : function() {
        this.comingTick = this.getInt()
        this.cardId = this.getInt()
        this.error = this.getError()
    }
})

NetworkManger.packetMap[gv.CMD.PLANT_TOWER] = fr.InPacket.extend({
    ctor : function() {
        this._super()
    },
    readData : function() {
        this.comingTick = this.getInt()
        this.cardId = this.getInt()
        let position = cc.p(0,0)
        position.x = this.getInt()
        position.y = this.getInt()
        this.position = position
        this.error = this.getError()
    }
})
