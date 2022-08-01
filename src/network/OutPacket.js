/*
Định nghĩa các gói tin gửi về cho server
 */
gv.CMD = gv.CMD ||{};

CmdSendHandshake = fr.OutPacket.extend({
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(gv.CONTROLLER_ID.SPECIAL_CONTROLLER);
            this.setCmdId(gv.CMD.HAND_SHAKE);
        },
        putData:function(){
            //pack
            this.packHeader();
            //update
            this.updateSize();
        }
    }
)


CmdSendLogin = fr.OutPacket.extend({
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_LOGIN);
        },
        pack:function(sessionKey, userID){
            this.packHeader();
            this.putString(sessionKey)
            this.putInt(userID);
            this.updateSize();
        }
    }
)

CmdGetUserInfo = fr.OutPacket.extend({
    ctor : function() {
        this._super()
        this.initData(100);
        this.setCmdId(gv.CMD.USER_INFO)
    },
    pack : function() {
        this.packHeader()
        this.updateSize()
    }
})

CmdBuyShopCoin = fr.OutPacket.extend({
    ctor : function() {
        this._super()
        this.initData(100)
        this.setCmdId(gv.CMD.BUY_SHOP_COIN)
    },
    pack : function(index) {
        this.packHeader()
        this.putInt(index)
        this.updateSize()
    }
})

CmdBuyShopItem = fr.OutPacket.extend({
    ctor : function() {
        this._super()
        this.initData(100)
        this.setCmdId(gv.CMD.BUY_SHOP_ITEM)
    },
    pack : function(index) {
        this.packHeader()
        this.putInt(index)
        this.updateSize()
    }
})

CmdGetShopInfo = fr.OutPacket.extend({
    ctor : function() {
        this._super()
        this.initData(100)
        this.setCmdId(gv.CMD.GET_SHOP_INFO)
    },
    pack : function() {
        this.packHeader()
        this.updateSize()
    }
})

CmdCheatResources = fr.OutPacket.extend({
    ctor : function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.CHEAT_RESOURCE);
    },
    pack: function(coin,gem,fame,exp,level,cid, cLevel,pieces,status){
        this.packHeader();
        this.putInt(coin);
        this.putInt(gem);
        this.putInt(fame);
        this.putInt(exp);
        this.putInt(level);
        this.putInt(cid);
        this.putInt(cLevel);
        this.putInt(pieces);
        this.putInt(status);
        this.updateSize();
    }
})

CmdCheatChest = fr.OutPacket.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.CHEAT_CHEST);
    },

    pack: function(index){
        this.packHeader();
        this.putInt(index);
        this.updateSize();
    }
})

CmdChooseChest = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.CHOOSE_CHEST);
    },
    
    pack: function (index) {
        this.packHeader();
        this.putInt(index);
        this.updateSize();
    }
})

CmdOpenChest = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.OPEN_CHEST);
    },

    pack: function (index) {
        cc.log("Sengding");
        this.packHeader();
        this.putInt(index);
        this.updateSize();
        cc.log("Send Done");
    }
})

CmdGetCoinGem = fr.OutPacket.extend({
    ctor : function() {
        this._super()
        this.initData(100)
        this.setCmdId(gv.CMD.GET_COIN_GEM)

    },
    pack : function() {
        this.packHeader()
        this.updateSize()
    },
})

CmdChangeCard = fr.OutPacket.extend({
    ctor : function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.CHANGE_CARD);

    },
    pack : function(cid1, cid2) {
        this.packHeader();
        this.putInt(cid1);
        this.putInt(cid2);
        this.updateSize();
    },
})

CmdUpgradeCard = fr.OutPacket.extend({
    ctor : function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.UPGRADE_CARD);

    },
    pack : function(cid) {
        this.packHeader();
        this.putInt(cid);
        this.updateSize();
    },
})

CmdGetCardInfo = fr.OutPacket.extend({
    ctor : function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.GET_CARD_INFO);

    },
    pack : function() {
        this.packHeader();
        this.updateSize();
    },
})

CmdBuyChestByGem = fr.OutPacket.extend({
    ctor : function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.BUY_CHEST_BY_GEM);

    },
    pack : function(index) {
        this.packHeader();
        this.putInt(index);
        this.updateSize();
    },
})

CmdGetTimestamp = fr.OutPacket.extend({
    ctor : function(){
        this._super()
        this.initData(100)
        this.setCmdId(gv.CMD.GET_TIMESTAMP)
    },
    pack : function() {
        this.packHeader()
        this.updateSize()

    },
})


CmdMatching = fr.OutPacket.extend({
    ctor: function (){
        this._super()
        this.initData(100)
        this.setCmdId(gv.CMD.MATCHING)
    },
    pack : function (){
        this.packHeader()
        this.updateSize()
    }
})

CmdAbortMatching = fr.OutPacket.extend({
    ctor: function (){
        this._super()
        this.initData(100)
        this.setCmdId(gv.CMD.ABORT_MATCHING)
    },
    pack : function (){
        this.packHeader()
        this.updateSize()
    }
})