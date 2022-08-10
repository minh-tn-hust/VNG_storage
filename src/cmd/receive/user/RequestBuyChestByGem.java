package cmd.receive.user;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

import java.nio.ByteBuffer;

public class RequestBuyChestByGem extends BaseCmd {
    public int index;
    public RequestBuyChestByGem(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }

    @Override
    public void unpackData() {
        ByteBuffer bf = makeBuffer();
        try {
            index = readInt(bf);
        } catch (Exception e) {

        }
    }
}
