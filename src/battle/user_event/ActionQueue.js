let ActionQueue = cc.Class.extend({
    _actionList : null,
    _usedList : null,
    ctor : function(who) {
        this._actionList = [
            new UserEvent(20, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(60, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(100, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(140, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(180, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(220, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(260, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(300, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(340, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(380, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(420, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(460, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(500, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(540, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(580, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(620, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(660, {}, UserEvent.Type.CREATE_MONSTER, who),
            new UserEvent(700, {}, UserEvent.Type.CREATE_MONSTER, who),
        ]
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
            } else if (actionList[i].getActionTick() < currentTick) {
                this.addToUsedList(actionList[i])
                actionList.splice(i, 1)
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

    /** @param {UserEvent} userEvent */
    addEvent : function(userEvent) {
        this.getActionList().push(userEvent)
    },

})
