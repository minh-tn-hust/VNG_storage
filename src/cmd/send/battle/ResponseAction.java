package cmd.send.battle;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.battleHandler.action.Action;

import java.nio.ByteBuffer;

public class ResponseAction extends BaseMsg {
    private Action action;
    public ResponseAction(short error, Action action) {
        super((short) action.getACTION(), error);
        this.action = action;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        switch (action.getACTION()){
            case CmdDefine.DROP_MONSTER_TO_ENEMY:
                bf.putInt(action.getTick());
                bf.putInt((int)action.getPARAMS().get("cid"));
                break;
            case CmdDefine.PLANT_TOWER:
                bf.putInt(action.getTick());
                bf.putInt((int)action.getPARAMS().get("cid"));
                bf.putInt((int)action.getPARAMS().get("x"));
                bf.putInt((int)action.getPARAMS().get("y"));
                break;
        }
        return packBuffer(bf);
    }
}