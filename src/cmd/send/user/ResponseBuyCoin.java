package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.UserHandler.UInfoModel;

import java.nio.ByteBuffer;

public class ResponseBuyCoin extends BaseMsg {
    public UInfoModel uinfo;
    short err;
    public ResponseBuyCoin(short error,UInfoModel _info) {
        super(CmdDefine.BUY_COIN, error);
        uinfo = _info;
        err = error;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        if (err ==5 || err == 0){
            bf.putInt(uinfo.getCoin());
            bf.putInt(uinfo.getGem());
        }
        return packBuffer(bf);
    }
}
