function getByClass(oParent,sClass) {
    let aResult = [];
    let aEle = oParent.getElementsByTagName('*');

    for(let i = 0;i < aEle.length;i++){
        if(aEle[i].className === sClass){
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
