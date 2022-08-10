package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;

import model.UserHandler.UInfoModel;

import java.nio.ByteBuffer;

public class ResponseBuyItem extends BaseMsg {
    public UInfoModel uinfo;
    short err;
    public ResponseBuyItem(short error, UInfoModel _info) {
        super(CmdDefine.BUY_ITEM, error);
        uinfo = _info;
        err = error;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        if (err==7){
            bf.putInt(uinfo.getReward().getCoin());
            bf.putInt(uinfo.getReward().getNumberCard());
            bf.putInt(uinfo.getReward().getCid1());
            bf.putInt(uinfo.getReward().getPieces1());
            bf.putInt(uinfo.getReward().getCid2());
            bf.putInt(uinfo.getReward().getPieces2());
        }
        return packBuffer(bf);
    }
}
