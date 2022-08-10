package cmd.send.user;
import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.UserHandler.Chest;
import model.UserHandler.UInfoModel;

import java.nio.ByteBuffer;

public class ResponseChooseChest  extends BaseMsg {
    private UInfoModel uinfo;
    private short err;
    public ResponseChooseChest(short error, UInfoModel uinfo) {
        super(CmdDefine.CHOOSE_CHEST, error);
        this.uinfo = uinfo;
        this.err = error;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        if(this.err ==0){
            for(Chest ch: uinfo.getChest()){
                if(ch.getStatus()==2){
                    bf.putInt(ch.getIndex());
                    bf.putInt(ch.getStart_time());
                    bf.putInt(ch.getWaiting_time());
                    bf.putInt(ch.getStatus());
                    break;
                }
            }
        }
        return packBuffer(bf);
    }
}
