let ActionQueue = cc.Class.extend({
    _actionList : null,
    ctor : function(who) {
        this._actionList = []
        this._usedList = []
    },

    /** @returns {UserEvent[]}*/
    getActionList : function() {
        return this._actionList
    },

    /** @returns {UserEvent[]}*/
    getUsedList : function() {
        return this._usedList
    },

    /** @param {UserEvent} event */
    addToUsedList : function(event) {
        this.getUsedList().push(event)
    },

    /** @param {UserEvent} event */
    addToActionList : function(event)  {
        cc.log("ADD TO ACTION QUEUE " +  JSON.stringify(event))
        this.getActionList().push(event)
    },

    /**
     *  Lấy ra action tương ứng với queue hiện tại
     * @param {number} currentTick
     * @return {UserEvent[]}
     */
    getListActionFromTick : function(currentTick) {
        // TODO : Thực hiện lấy và trả về các sự kiện có thời gian thực hiện trong currentTick
        let actionList = this.getActionList()
        let comingAction = []
        for (let i = 0; i < actionList.length; i++) {
            if (actionList[i].getActionTick() === currentTick ) {
                comingAction.push(actionList[i])
            }
        }
        return comingAction
    },

    /**
     * Tick đầu vào cần đươc lấy ra
     * @param {number} tick
     */
    getListCloneActionFromTick : function(tick) {
        // TODO : Thực hiện lấy ra các sự kiện (kể cả đã dùng rồi) có tick thực hiện === tick
    },

    /**
     * @param {UserEvent,PlaceTowerEvent} userEvent
     */
    addEvent : function(userEvent) {
        this.getActionList().push(userEvent)
    },

})
