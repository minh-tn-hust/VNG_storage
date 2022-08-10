package cmd.send.battle;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class DropMonster extends BaseMsg {
    private int tick;
    private int mid;
    public DropMonster(short error,int tick, int mid) {
        super(CmdDefine.DROP_MONSTER, error);
        this.tick = tick;
        this.mid = mid;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putInt(this.tick);
        bf.putInt(this.mid);
        return packBuffer(bf);
    }
}
