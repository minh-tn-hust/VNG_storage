package cmd.receive.user;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

import java.nio.ByteBuffer;

public class RequestUpgradeCard extends BaseCmd {
    public int cid;
    public RequestUpgradeCard(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }
    @Override
    public void unpackData() {
        ByteBuffer bf = makeBuffer();
        try {
            this.cid = readInt(bf);
        } catch (Exception e) {

        }
    }
}
