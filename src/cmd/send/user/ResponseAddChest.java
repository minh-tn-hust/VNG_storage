package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class ResponseAddChest  extends BaseMsg {
    public ResponseAddChest(short error) {
        super(CmdDefine.ADD_CHEST, error);
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        return packBuffer(bf);
    }
}
