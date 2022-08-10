package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.UserHandler.Chest;
import model.UserHandler.UInfoModel;

import java.nio.ByteBuffer;

public class ResponseGetChestInfo extends BaseMsg {
    public UInfoModel uinfo;
    public ResponseGetChestInfo(short error, UInfoModel _info) {
        super(CmdDefine.GET_CHEST_INFO, error);
        uinfo = _info;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        for(int i = 0; i< Chest.numberChest; i++){
            bf.putInt(uinfo.getChest()[i].getIndex());
            bf.putInt(uinfo.getChest()[i].getStart_time());
            bf.putInt(uinfo.getChest()[i].getWaiting_time());
            bf.putInt(uinfo.getChest()[i].getStatus());
        }
        return packBuffer(bf);
    }
}
