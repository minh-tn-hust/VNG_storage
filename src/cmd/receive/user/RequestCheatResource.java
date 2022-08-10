package cmd.receive.user;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;
import model.UserHandler.Card;

import java.nio.ByteBuffer;

public class RequestCheatResource extends BaseCmd {
    public int coin;
    public int gem;
    public int fame;
    public int exp;
    public int level;
    public Card card;
    public RequestCheatResource(DataCmd dataCmd) {
        super(dataCmd);
        unpackData();
    }

    @Override
    public void unpackData() {
        ByteBuffer bf = makeBuffer();
        try {
            coin = readInt(bf);
            gem = readInt(bf);
            fame = readInt(bf);
            exp = readInt(bf);
            level = readInt(bf);
            int cid = readInt(bf);
            int clevel = readInt(bf);
            int pieces = readInt(bf);
            int status = readInt(bf);
            card = new Card(cid, clevel, pieces, status);
        } catch (Exception e) {

        }
    }
}
