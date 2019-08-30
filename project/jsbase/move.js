function getStyle(obj, name) {//两种方式是为了解决兼容问题
    if (obj.currentStyle) {//microsoft edge 不支持
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];

    }
}

function startMove(obj, attr, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        let curAttr = null;
        if (attr === 'opacity') {
            curAttr = Math.round(parseFloat(getStyle(obj, attr)) * 100);
        } else {
            curAttr = parseInt(getStyle(obj, attr));
        }

        let speed = (target - curAttr) / 20;
        speed > 0 ? speed = Math.ceil(speed) : speed = Math.floor(speed);
        if (curAttr === target) {
            clearInterval(obj.timer)
        } else {
            if (attr === 'opacity') {
                obj.style.filter = `alpha(opacity:${curAttr + speed})`;
                obj.style.opacity = (curAttr + speed) / 100;
            } else {
                obj.style[attr] = curAttr + speed + 'px';
            }


        }
    }, 30)
}
