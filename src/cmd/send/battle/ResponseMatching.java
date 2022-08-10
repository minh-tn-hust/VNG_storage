package cmd.send.battle;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import model.UserHandler.UInfoModel;
import model.battleHandler.card.CardBattle;

import java.nio.ByteBuffer;
import java.util.ArrayList;

public class ResponseMatching extends BaseMsg {
    private int ouid;
    private int zoomId;
    private int[][] mymap;
    private int[][] youmap;
    private int enemyFame;
    private int myID;
    private int myFame;
    ArrayList<CardBattle> listCard;
    public ResponseMatching(short error, int ouid, int zoomId, int[][] mymap, int[][] youmap, int myID, int myFame, int enemyFame, ArrayList<CardBattle> listCard) {
        super(CmdDefine.MATCHING, error);
        this.ouid = ouid;
        this.zoomId = zoomId;
        this.mymap = mymap;
        this.youmap = youmap;
        this.enemyFame = enemyFame;
        this.listCard = listCard;
        this.myID = myID;
        this.myFame = myFame;
        System.out.println(this.ouid+" "+this.zoomId);
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        bf.putInt(this.ouid);
        bf.putInt(this.zoomId);
        for(int i= 0; i<mymap.length; i++){
            for(int j=0; j< mymap[0].length; j++){
                bf.putInt(mymap[i][j]);
//                System.out.print(mymap[i][j]+" ");
            }
//            System.out.println();
        }
        for(int i= 0; i<mymap.length; i++){
            for(int j=0; j< mymap[0].length; j++){
                bf.putInt(youmap[i][j]);
//                System.out.print(mymap[i][j]+" ");
            }
//            System.out.println();
        }
        bf.putInt(myID);
        bf.putInt(myFame);
        bf.putInt(enemyFame);
        for(int i=0; i<8; i++){
            bf.putInt(listCard.get(i).getCid());
            bf.putInt(listCard.get(i).getRequire());
        }
        return packBuffer(bf);
    }
}
