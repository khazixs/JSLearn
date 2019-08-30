let json = {width:100,height:100};
let json1 = ['a','b','c','d','e'];
let a = [];
let b = [];



for(let i in json1){//for in 遍历键名key 可以遍历对象
    a.push(i);

}
for(let i of json1){//for of 遍历键值value 不能遍历对象
    b.push(i);

}
let [c,...d] = a;
console.log('a:',a);
console.log('b:'+ b);
console.log('c:',c);
console.log('d:'+ d);
