package cmd.receive.battle;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestAbortMatching extends BaseCmd {
    public RequestAbortMatching(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
