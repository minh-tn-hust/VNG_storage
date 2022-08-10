package cmd.receive.user;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestGetUserInfo extends BaseCmd {
    public RequestGetUserInfo(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}
