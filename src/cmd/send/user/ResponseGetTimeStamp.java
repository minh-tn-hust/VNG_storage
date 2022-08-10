package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.UserHandler.Chest;
import model.UserHandler.UInfoModel;
import util.Common;

import java.nio.ByteBuffer;

public class ResponseGetTimeStamp extends BaseMsg {
    public ResponseGetTimeStamp() {
        super(CmdDefine.GET_TIME_STAMP);
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putInt(Common.currentTimeInSecond());
        return packBuffer(bf);
    }
}
