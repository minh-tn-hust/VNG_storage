let Util = Util || {}
/**
 * Thực hiện lấy ra chuỗi các con có cùng tên với name
 * @param {cc.Layer.getInstance()} root gốc của cây layer / cây scene được tạo từ file json
 * @param {string} name tên của node cần lấy ra
 * @return {cc.Node[]} danh sách các node có cùng tên
 */
Util.getChildByName = function(root, name) {
    let children = root.getChildren()
    let nodes = []
    for (let i = 0; i < children.length; i++) {
        if (children[i].getName() === name) {
            nodes.push(children[i])
        }
        let travels = this.getChildByName(children[i], name)
        nodes.push(...travels)
    }
    return nodes
}

/**
 *
 * @param {ccui} ui - nút người dùng click
 * @param event - sự kiện người dùng click (TOUCH_BEGAN, TOUCH_CANCELED, TOUCH_ENDED)
 * @param callBack - callBack khi người dùng thực hiện bấm button
 * @example
 * let self = this
 * buttons[i].addTouchEventListener(function(button, type) {
 *      Util.uiReact(button, type, function() {
 *          self.buyingPack(button.id)
 *      })
 * }, this)
 */
Util.uiReact = function(ui, event, callBack) {
    switch (event) {
        case ccui.Widget.TOUCH_BEGAN :
            let scaleDown = cc.scaleTo(0.1, 0.9)
            ui.runAction(scaleDown)
            break
        case ccui.Widget.TOUCH_CANCELED :
            let CscaleUp = cc.scaleTo(0.1, 1)
            ui.runAction(CscaleUp)
            break
        case ccui.Widget.TOUCH_ENDED:
            let EscaleUp = cc.scaleTo(0.1, 1)
            ui.runAction(EscaleUp)
            callBack()
            break
    }
}

Util.get3DigitNumber = function(number) {
    if (number < 10)  {
        return "00" + number
    } else if (number < 100) {
        return "0" + number
    } else {
        return "" + number
    }
}

Util.PI = 3.14159265359

Util.fromTowerDigitalToDirection = function(digitalDirection) {
    let direction = ""
    let angle
    if (digitalDirection.x === 0) {
        if (digitalDirection.y >= 0) {
            direction = "I"
        } else {
            direction = "A"
        }
    } else {
        if (digitalDirection.x < 0) {
            angle = Math.atan(- digitalDirection.y / digitalDirection.x)
        } else {
            angle = Math.atan(digitalDirection.y / digitalDirection.x)
        }

        if (angle >= -Util.PI / 2 && angle <= Util.PI * (-1/2 + 1/16)) {
            direction = "A"
        } else if (angle > Util.PI * (-1/2 + 1/16) && angle <= Util.PI * (-1/2 + 1/16 + 1/8)) {
            direction = "B"
        } else if (angle > Util.PI * (-1/2 + 1/16 + 1/8) && angle <= Util.PI * (-1/2 + 1/16 + 1/8 * 2)) {
            direction = "C"
        } else if (angle > Util.PI * (-1/2 + 1/16 + 1/8 * 2) && angle <= Util.PI * (-1/2 + 1/16 + 1/8 * 3)) {
            direction = "D"
        } else if (angle > Util.PI * (-1/2 + 1/16 + 1/8 * 3) && angle <= Util.PI * (-1/2 + 1/16 + 1/8 * 4)) {
            direction = "E"
        } else if (angle > Util.PI * (-1/2 + 1/16 + 1/8 * 4) && angle <= Util.PI * (-1/2 + 1/16 + 1/8 * 5)) {
            direction = "F"
        } else if (angle > Util.PI * (-1/2 + 1/16 + 1/8 * 5) && angle <= Util.PI * (-1/2 + 1/16 + 1/8 * 6)) {
            direction = "G"
        }  else if (angle > Util.PI * (-1/2 + 1/16 + 1/8 * 6) && angle <= Util.PI * (-1/2 + 1/16 + 1/8 * 7)) {
            direction = "H"
        } else if (angle > Util.PI * (-1/2 + 1/16 + 1/8 * 7) && angle <= Util.PI * (-1/2 + 1/16 * 2 + 1/8 * 7)) {
            direction = "I"
        }
    }
    if (digitalDirection.x < 0) {
        direction += "-"
    }
    return direction
}

Util.fromMonsterDigitalToDirection = function(digitalDirection) {
    let direction = ""
    let angle
    if (digitalDirection.x === 0) {
        if (digitalDirection.y >= 0) {
            direction = "E"
        } else {
            direction = "A"
        }
    } else {
        if (digitalDirection.x < 0) {
            angle = Math.atan(- digitalDirection.y / digitalDirection.x)
        } else {
            angle = Math.atan(digitalDirection.y / digitalDirection.x)
        }

        if (angle >= -Util.PI / 2 && angle <= Util.PI * (-1/2 + 1/8)) {
            direction =  "A"
        } else if (angle > Util.PI * (-1/2 + 1/8) && angle <= Util.PI * (-1/2 + 1/8 + 1/4)) {
            direction =  "B"
        } else if (angle > Util.PI * (-1/2 + 1/8 + 1/4) && angle <= Util.PI * (-1/2 + 1/8 + 1/4 * 2)) {
            direction =  "C"
        } else if (angle > Util.PI * (-1/2 + 1/8 + 1/4 * 2) && angle <= Util.PI * (-1/2 + 1/8 + 1/4 * 3)) {
            direction =  "D"
        } else if (angle > Util.PI * (-1/2 + 1/8 + 1/4 * 3) && angle <= Util.PI * (-1/2 + 1/8 + 1/4 * 3 + 1/8)) {
            direction = "E"
        }
    }

    if (digitalDirection.x < 0) {
        direction += "-"
    }

    return direction
}

Util.distance = function(pointA, pointB) {
    let square = (pointA.x - pointB.x) * (pointA.x - pointB.x) + (pointA.y - pointB.y)*(pointA.y - pointB.y)
    return Math.sqrt(square)
}

Util.convertSecondToString = function(second){
    var hrs = Math.floor(second/3600);
    var minute = Math.floor((second - (hrs * 3600)) / 60);
    second = second - (hrs * 3600) - (minute * 60);
    if (hrs>0){
        return hrs+"h "+minute+"m ";
    } else if (minute>0) {
        return minute+"m "+second+"s";
    } else {
       return second+"s";
    }
}

Util.getCountDownText = function(countDownSecond) {
    if (countDownSecond <= 0) {
        return "0h 0m 0s"
    }
    let second = Math.floor(countDownSecond % 60)
    let minute = Math.floor((countDownSecond - second) / 60) % 60
    let hours= Math.floor(countDownSecond / 60 / 60)
    return (hours + "h " + minute + "m " +  second + "s")
}

Util.numberToString = function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/**
 *  read json file
 * @param {string} filename
 * @returns jsonObj
 */
Util.loadJSONFile = function (filename) {
    var jsonObj = null;
    cc.loader.loadJson(filename,function (err,data) {
        if (err){
            cc.log("Error when read JSON file");
        } else {
            jsonObj = data;
        }
    });
    return jsonObj;
}

/**
 * @param {cc.Point} position1
 * @param {cc.Point} position2
 */
Util.getEuclideDistance = function(position1 , position2) {
    return Math.sqrt((position1.x - position2.x) * (position1.x - position2.x) + (position1.y - position2.y) * (position1.y - position2.y))

}