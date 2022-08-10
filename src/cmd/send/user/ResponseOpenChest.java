package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.UserHandler.Chest;
import model.UserHandler.UInfoModel;

import java.nio.ByteBuffer;

public class ResponseOpenChest  extends BaseMsg {
    public UInfoModel uinfo;
    short err;
    public ResponseOpenChest(short error, UInfoModel _info) {
        super(CmdDefine.OPEN_CHEST, error);
        uinfo = _info;
        err = error;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        if (err==8){
            for(Chest ch: uinfo.getChest()){
                if(ch.getStatus() == 2){
                    bf.putInt(ch.getRemainingTime());
                    break;
                }
            }
        }
        else if (err==0){
            bf.putInt(0);
            bf.putInt(uinfo.getReward().getCoin());
            bf.putInt(uinfo.getReward().getNumberCard());
            bf.putInt(uinfo.getReward().getCid1());
            bf.putInt(uinfo.getReward().getPieces1());
            bf.putInt(uinfo.getReward().getCid2());
            bf.putInt(uinfo.getReward().getPieces2());
        }
        return packBuffer(bf);
    }
}
