package cmd.send.battle;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;

public class ResponseAbortMatching extends BaseMsg {
    public ResponseAbortMatching(short error) {
        super(CmdDefine.ABORT_MATCHING, error);
    }
}