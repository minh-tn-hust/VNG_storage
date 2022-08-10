package cmd.receive.user;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public class RequestGetCoinGem extends BaseCmd {
    public RequestGetCoinGem(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
}