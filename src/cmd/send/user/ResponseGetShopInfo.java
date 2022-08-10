package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.UserHandler.Coin;
import model.UserHandler.Item;
import model.UserHandler.UInfoModel;

import java.nio.ByteBuffer;

public class ResponseGetShopInfo extends BaseMsg {
    public UInfoModel uinfo;
    public ResponseGetShopInfo(UInfoModel _info) {
        super(CmdDefine.GET_SHOP_INFO);
        uinfo = _info;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();

        for(int i = 0; i< Item.numItem; i++){
            bf.putInt(uinfo.getShop().getItem()[i].getIsBuyed());
            bf.putInt(uinfo.getShop().getItem()[i].getIndex());
            bf.putInt(uinfo.getShop().getItem()[i].getCoin());
            bf.putInt(uinfo.getShop().getItem()[i].getId());
            bf.putInt(uinfo.getShop().getItem()[i].getPieces());
        }
        for(int i = 0; i< Coin.numCoin; i++){
            bf.putInt(uinfo.getShop().getCoin()[i].getIndex());
            bf.putInt(uinfo.getShop().getCoin()[i].getValue());
            bf.putInt(uinfo.getShop().getCoin()[i].getGem());
        }
        return packBuffer(bf);
    }
}
