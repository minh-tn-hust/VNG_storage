package cmd.receive.battle;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;
import bitzero.util.common.business.CommonHandle;
import cmd.obj.demo.DemoDirection;

import java.nio.ByteBuffer;

public class RequestGetAllUser extends BaseCmd {
    private short direction;
    public RequestGetAllUser(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
