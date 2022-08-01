var CardInfo = cc.Class.extend({
    cardID: 0,
    level: 0, // 0-19
    rank:0, // 0-3
    letterRank: ["C","B","A","S"],
    star:1,
    pieces: 0,
    requiredEnergy: 0,
    status:0, // 1 is in BattleDeck, 0 is DiscoverDeck
    cardImage: null,


    ctor: function({cid,level,pieces,status}){
        this.setCardID(cid);
        this.setLevel(level);
        this.setPieces(pieces);
        this.setStatus(status);
        this.setRequiredEnergy(CardUtil.requiredEnergy[cid]);
    },

    copyCard: function (cardInfo) {
        this.setCardID(cardInfo.getCardID());
        this.setLevel(cardInfo.getLevel());
        this.setPieces(cardInfo.getPieces());
        this.setStatus(cardInfo.getStatus());
        this.setRequiredEnergy(cardInfo.getRequiredEnergy());
    },
    /**
     * convert cardInfo to JSON object
     * @returns {{pieces: number, level: number, cid: number, status: number}}
     */
    toJSONObject: function () {
        return {
            cid : this.getCardID(),
            level : this.getLevel(),
            pieces : this.getPieces(),
            status : this.getStatus()
        }
    },

    /**
     *
     * @returns {number} cardID
     */
    getCardID: function(){
        return this.cardID;
    },

    /**
     *
     * @returns {number} level
     */
    getLevel: function(){
        return this.level;
    },

    /**
     * get rank of card
     * @returns {number} from 0-3 (corresponds C,B,A,S)
     */
    getRank: function(){
        return this.rank;
    },

    /**
     * get rank in letter
     * @returns {string} C,B,A,S
     */
    getLetterRank: function(){
        return this.letterRank[this.rank];
    },

    /**
     *
     * @returns {number} # of stars, from 1-5
     */
    getStar: function(){
        return this.star;
    },

    /**
     *
     * @returns {number} # of pieces
     */
    getPieces: function(){
        return this.pieces;
    },

    /**
     *
     * @returns {number} requiredEnergy
     */
    getRequiredEnergy: function(){
        return this.requiredEnergy;
    },

    /**
     *
     * @returns {number} status , 0 or 1
     */
    getStatus: function(){
        return this.status;
    },

    /**
     * convert {number} level (1-20) to {number} rank (0-3) and {number} star (1-5)
     */
    convertLevel: function(){
        this.setRank(this.level/5|0);
        this.setStar(this.level%5+1);
    },

    /**
     *
     * @param {number} cardID
     */
    setCardID: function(cardID){
        this.cardID=  cardID;
    },
    /**
     *
     * @param {number} level
     */
    setLevel: function(level){
        if (level>-1 && level<20) {
            this.level = level;
            this.convertLevel();
        }
    },

    /**
     *
     * @param {number} rank
     */
    setRank: function(rank){
        if(rank>-1 && rank<4) {
            this.rank = rank;
        }
    },

    /**
     *
     * @param {number} star
     */
    setStar: function (star){
        if (star>0 && star<6) {
            this.star = star;
        }
    },

    /**
     *
     * @param {number}pieces
     */
    setPieces: function(pieces){
        if (pieces>=0) {
            this.pieces = pieces;
        }
    },

    /**
     *
     * @param {number} requiredEnergy
     */
    setRequiredEnergy: function(requiredEnergy){
        if (requiredEnergy>0){
            this.requiredEnergy = requiredEnergy;
        }
    },

    /**
     *
     * @param {number} status (0 is collection card, 1 is battle card
     */
    setStatus: function(status){
        if (status===0 || status===1){
            this.status = status;
        }
    },

    /**
     *
     * @returns {ccui.ImageView} cardImage displays this cardInfo
     */
    getCardImage: function () {
        return this.cardImage;
    },

    /**
     *
     * @param {ccui.ImageView}cardImage
     */
    setCardImage: function (cardImage) {
        this.cardImage=cardImage;
        CardUtil.setCardUI(cardImage,this);
    },
})