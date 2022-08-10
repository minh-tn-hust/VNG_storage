package cmd.receive.user;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestGetChestInfo extends BaseCmd {
    public RequestGetChestInfo(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}