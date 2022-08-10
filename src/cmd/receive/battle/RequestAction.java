package cmd.receive.battle;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;
import cmd.CmdDefine;
import model.battleHandler.action.Action;

import java.nio.ByteBuffer;


public class RequestAction extends BaseCmd {
    private Action action;
    public RequestAction(DataCmd dataCmd, int uid) {
        super(dataCmd);
        this.action = new Action(uid, dataCmd.getId());
        unpackData();
    }
    @Override
    public void unpackData() {
        ByteBuffer bf = makeBuffer();
        switch (this.action.getACTION()){
            case CmdDefine.DROP_MONSTER_TO_ENEMY:
                this.action.setTick(readInt(bf));
                this.action.getPARAMS().put("cid", readInt(bf));
                break;

            case CmdDefine.PLANT_TOWER:
                this.action.setTick(readInt(bf));
                this.action.getPARAMS().put("cid", readInt(bf));
                this.action.getPARAMS().put("x", readInt(bf));
                this.action.getPARAMS().put("y", readInt(bf));
                break;
            default:
                break;
        }
    }

    public Action getAction() {
        return action;
    }
}
