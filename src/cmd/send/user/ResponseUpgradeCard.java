package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import cmd.receive.user.RequestUpgradeCard;
import model.UserHandler.Card;
import model.UserHandler.UInfoModel;

import java.nio.ByteBuffer;

public class ResponseUpgradeCard  extends BaseMsg {
    public UInfoModel uinfo;
    public int cid;
    public short err;
    public ResponseUpgradeCard(short error, UInfoModel _info, RequestUpgradeCard requestUpgradeCard) {
        super(CmdDefine.UPGRADE_CARD, error);
        uinfo = _info;
        cid = requestUpgradeCard.cid;
        err = error;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        if(err ==0 || err== 5){
            Card c = uinfo.getCardManager().getCardByCID(cid);
            bf.putInt(cid);
            bf.putInt(c.getLevel());
            bf.putInt(c.getPieces());
            bf.putInt(uinfo.getCoin());
        }
        return packBuffer(bf);
    }
}