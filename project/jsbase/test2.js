let str = "abbbkakdADADAFGGCVBBBBccddaaffg";
let str1 = "英文则按照字母顺序排排列";
//localeCompare英文则按照字母顺序排列，中文按照拼音首字母排序(不好用没用懂)，但是好像不可以混合使用
str = str.toLowerCase().split('').sort(function (a,b) {return a.localeCompare(b);}).join('');
console.log(str1.split('').sort(function (a,b) {return a.localeCompare(b);}));
console.log(str);
let reg = /(\w)\1+/ig;
console.log(reg);
let maxStr = '';
let maxLen = 0;
let i = 0;
str.replace(reg,function ($0,$1){
    i++;
    console.log(i);
    //Arguments是进行函数调用时，除了指定的参数外，还另外创建的一个隐藏对象。Arguments是一个类似 数组但不是数组的对象，说它类似数组是因为其具有数组一样的访问性质及方式，可以由arguments[n]来访问对应的单个参数的值，并拥有数组长度属 性length。还有就是arguments对象存储的是实际传递给函数的参数，而不局限于函数声明所定义的参数列表，而且不能显式创建 arguments 对象。arguments 对象只有函数开始时才可用js 代码
    console.log(arguments[1]);
    let regLen = $0.length;
    if(regLen>maxLen){
        maxLen = regLen;
        maxStr = $1;
    }else if(maxLen === regLen){
        maxStr += $1;
    }
});
console.log(`出现最多的字母是${maxStr},共出现了${maxLen}次`);
