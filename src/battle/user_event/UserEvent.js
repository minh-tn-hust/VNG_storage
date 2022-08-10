/**
 * @param {number} actionTick
 * @param {object} metaData
 * @param {number} type
 * @param {number} who
 */
let UserEvent = cc.Class.extend({
    _type : null,
    _actionTick : null,
    _metaData : null,
    _who : null,
    getType : function() {return this._type},

    /** @return {number} */
    getActionTick : function() {return this._actionTick},

    getMetaData : function() {return this._metaData},

    /** @return {BattleUtil.Who.Enemy | BattleUtil.Who.Mine} */
    getWho : function(){return this._who},

    ctor : function(actionTick, metaData, type, who) {
        this._actionTick = actionTick
        this._metaData = metaData
        this._type = type
        this.who = who
    },
})

UserEvent.Type = {
    PLANT_TOWER : 1,
    USE_SPELL : 2,
    UPDATE_TOWER : 3,
    REMOVE_TOWER : 4,
    CREATE_MONSTER : 5,
    ROLL_BACK : 6,
    SYSTEM_MONSTER : 7,
    SYSTEM_CREATE_MONSTER : 8,
    END_GAME : 9,
}