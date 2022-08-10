package cmd.receive.battle;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestMatching extends BaseCmd {
    public RequestMatching(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
