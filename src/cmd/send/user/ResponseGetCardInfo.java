package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.UserHandler.UInfoModel;

import java.nio.ByteBuffer;

public class ResponseGetCardInfo extends BaseMsg {
    public UInfoModel uinfo;
    public ResponseGetCardInfo(short error, UInfoModel _info) {
        super(CmdDefine.GET_CARD_INFO, error);
        uinfo = _info;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putInt(uinfo.getNumCard());
        for(int i = 0; i<uinfo.getNumCard(); i++){
            bf.putInt(uinfo.getCard().get(i).getCid());
            bf.putInt(uinfo.getCard().get(i).getLevel());
            bf.putInt(uinfo.getCard().get(i).getPieces());
            bf.putInt(uinfo.getCard().get(i).getStatus());
        }
        return packBuffer(bf);
    }
}