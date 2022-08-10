package cmd.receive.user;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

import java.nio.ByteBuffer;

public class RequestChangeCard extends BaseCmd {
    public int cid1;
    public int cid2;
    public RequestChangeCard(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }

    @Override
    public void unpackData() {
        ByteBuffer bf = makeBuffer();
        try {
            cid1 = readInt(bf);
            cid2 = readInt(bf);
        } catch (Exception e) {

        }
    }
}