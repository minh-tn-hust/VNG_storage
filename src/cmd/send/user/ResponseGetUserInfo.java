package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.UserHandler.Chest;
import model.UserHandler.Coin;
import model.UserHandler.Item;
import model.UserHandler.UInfoModel;

import java.nio.ByteBuffer;

public class ResponseGetUserInfo extends BaseMsg {
    public UInfoModel uinfo;
    public ResponseGetUserInfo(UInfoModel _info) {
        super(CmdDefine.GET_USER_INFO);
        uinfo = _info;
    }
    
    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putInt(uinfo.getCoin());
        bf.putInt(uinfo.getGem());
        bf.putInt(uinfo.getFame());
        bf.putInt(uinfo.getExp());
        bf.putInt(uinfo.getLevel());
        bf.putInt(uinfo.getNumCard());
        for(int i = 0; i<uinfo.getNumCard(); i++){
            bf.putInt(uinfo.getCard().get(i).getCid());
            bf.putInt(uinfo.getCard().get(i).getLevel());
            bf.putInt(uinfo.getCard().get(i).getPieces());
            bf.putInt(uinfo.getCard().get(i).getStatus());
        }
        for(int i= 0; i< Chest.numberChest; i++){
            bf.putInt(uinfo.getChest()[i].getIndex());
            bf.putInt(uinfo.getChest()[i].getStart_time());
            bf.putInt(uinfo.getChest()[i].getWaiting_time());
            bf.putInt(uinfo.getChest()[i].getStatus());
        }
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
//        bf.putInt(uinfo.getShop().getInitDay());
//        bf.putInt(uinfo.getShop().getCurrentDay());
//        bf.putLong(28987654321L);
        return packBuffer(bf);
    }
}
