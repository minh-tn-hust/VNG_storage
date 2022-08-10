package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.UserHandler.UInfoModel;

import java.nio.ByteBuffer;

public class ResponseBuyChestByGem extends BaseMsg {
    public int gem;
    short err;
    public ResponseBuyChestByGem(short error,UInfoModel _info) {
        super(CmdDefine.BUY_CHEST_BY_GEM, error);
        gem = _info.getGem();
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putInt(gem);
        return packBuffer(bf);
    }
}