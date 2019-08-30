function startMove(obj, json, fnEnd) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        let bStop = true;
        for (let attr in json) {//遍历json的键名key即属性名
            let curAttr = null;//用来存储该属性现在的值
            if (attr === 'opacity') {//输入opacity时要按照（alpha(opaciy:xx)这种样式，输入0-100的值）
                curAttr = Math.round(parseFloat(getStyle(obj, attr)) * 100);//为消除计算机的误差，比如7.00001这种
            } else {
                curAttr = parseInt(getStyle(obj, attr));
            }
            let speed = (json[attr] - curAttr) / 12;//变化速度阶级抵减
            speed > 0 ? speed = Math.ceil(speed) : speed = Math.floor(speed);//分别为向上取整ceil（返回大于等于参数的整数，如1.6→2；-5.1→-5；-5.9→-5）和向下取整 floor(返回小于等于参数的整数) -5.1→-6   往下这一小段是为了解决，无法准确到达目标值，所以在接近处会直接取到目标值已达到元素运动不会摇晃的目标
            if (curAttr !== json[attr]) {
                bStop = false;
            }
            if (attr === 'opacity') {
                obj.style.filter = `alpha(opacity:${curAttr + speed})`;
                obj.style.opacity = (curAttr + speed) / 100;
            } else {
                obj.style[attr] = curAttr + speed + 'px';
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (fnEnd) fnEnd()
        }
    }, 30)
}


function getStyle(obj, name) {//两种方式是为了解决兼容问题
    if (obj.currentStyle) {//microsoft edge 不支持
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];

    }
}
