//用来导出txt中的数据导出
var iconv = require('iconv-lite');
var fs = require('fs');
var fileStr = fs.readFileSync('F:\\直流偏移大数据\\res\\变压器中性点电流.txt', {
  encoding: 'binary'
});
var buf = new Buffer(fileStr, 'binary');
var str = iconv.decode(buf, 'GBK');
//console.log(str);
let temp = '';
temp = str.split('\r');
// console.log(temp);
str = temp.join('');
temp = str.split('\n');
console.log(temp);
let data = [
  []
];
let k = 0;
for (let k = 0; k < 20; k++) {
  for (let i = 7200 * k; i < 7200 * (k + 1); i++) {
    data[0].push(temp[i]);
  }
  fs.writeFile(`./now/${k+1}.js`, data);
}

//console.log(str);
// str = temp.join('');
// console.log(str);

//

// temp =str.split('\t');
// console.log(temp);
// let data = [];
// // console.log(str);
// for(k in temp){
//     if(temp[k].length !== 0){
//         data.push(temp[k])
//     }
// }
// console.log(data);
// let nameArray = [];
// let gpsArray = [];
// let currentArray = [];
// let json = [];
// for(let i=0;i<data.length;i+=9){
//     nameArray.push(data[i]);
//     let arr = [];
//     arr[0] = data[i+2];
//     arr[1] = data[i+3];
//     gpsArray.push(arr);
//     currentArray.push(data[i+6])
// }
// //console.log(nameArray);
// //console.log(gpsArray);
// //console.log(currentArray);
// for(k in nameArray){
//     let obj = new Object;
//     obj.name = nameArray[k];
//     obj.gps = gpsArray[k];
//     obj.earthCurrent = currentArray[k];
//     json.push(obj)
// }
// console.log(json.length)
