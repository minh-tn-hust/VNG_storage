package cmd.send.user;
import bitzero.server.extensions.data.BaseMsg;

import cmd.CmdDefine;

import java.nio.ByteBuffer;


public class ResponseCheatResource extends BaseMsg{
    public ResponseCheatResource(short error){
        super(CmdDefine.CHEAT_RESOURCE, error);
    }
}
