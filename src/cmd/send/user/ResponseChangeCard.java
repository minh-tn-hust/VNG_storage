package cmd.send.user;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;

public class ResponseChangeCard extends BaseMsg {
    public ResponseChangeCard(short error){
        super(CmdDefine.CHANGE_CARD, error);
    }
}
