package cmd.receive.user;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestGetCardInfo  extends BaseCmd {
    public RequestGetCardInfo(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}