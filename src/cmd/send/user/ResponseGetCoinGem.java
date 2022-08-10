package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.UserHandler.UInfoModel;

import java.nio.ByteBuffer;

public class ResponseGetCoinGem extends BaseMsg {
    public UInfoModel uinfo;
    public ResponseGetCoinGem(short error, UInfoModel _info) {
        super(CmdDefine.GET_COIN_GEM, error);
        uinfo = _info;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putInt(uinfo.getCoin());
        bf.putInt(uinfo.getGem());
        return packBuffer(bf);
    }
}