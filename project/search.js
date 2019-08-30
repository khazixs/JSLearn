//用来导出txt中的数据导出
var iconv = require('iconv-lite');
var fs = require('fs');
var fileStr = fs.readFileSync('F:\\直流偏移大数据\\res\\观测点坐标.txt', {
	encoding: 'binary'
});
var buf = new Buffer(fileStr, 'binary');
var str = iconv.decode(buf, 'GBK');
var fileStr1 = fs.readFileSync('F:\\直流偏移大数据\\res\\地表电位.txt', {
	encoding: 'binary'
});
var buf1 = new Buffer(fileStr1, 'binary');
var str1 = iconv.decode(buf1, 'GBK');

let temp = '';
let temp1 = [];
let data = [];
temp = str.split('\r');
str = temp.join('');
temp = str.split('\n');

console.log(temp)

// str = temp.join('');
// temp = str.split(',');
// for(let i =0;i<temp.length;i++){
//     temp[i] = parseFloat(temp[i])
// }
// for(let i =0;i<temp.length;i++){
//     if(temp[i]>0){
//         temp1.push(temp[i])
//     }
// }
// console.log(temp1);
// let a = [];
// a =str1.split('\r');
// str1 = a.join('');
// a = str1.split('\n');
// a =str1.split('[');
// str1 = a.join('');
// a = str1.split(']');
// str1 = a.join('');
// a =str1.split('\r');
// str1 = a.join('');
// a = str1.split('\n');
// let b = []
// for(let i = 0;i<a.length;i++){
//     a[i] = parseFloat(a[i])
// }
// for(let i = 0;i<a.length;i++){
//     if(a[i]>0)
//     b.push(a[i])
// }
// console.log(b);
// for(let i = 0;i<b.length;i++){
//     let obj = new Object();
// }

// console.log(temp);
// temp  = str.split('\r');
// console.log(temp);
// str = temp.join('');
// temp =str.split('\n');
// str = temp.join('');
// temp =str.split('\t');
// // console.log(temp);

// for (let i = 0;i<1500;i++){
//     let obj = new Object;
//         obj.v1 = temp[i*4];
//         obj.v2 = temp[i*4+1];
//     obj.v3 = temp[i*4+2];
//     obj.v4 = temp[i*4+3];
//        json.push(obj);
// }
// fs.writeFileSync('./dashBoard.js',JSON.stringify(json));
// console.log(json)
// let a = [0,1,2,3,4,5,6];
// let c = [];
// let v = ['220kV威灵变电站','220kV楠竹塘变电站','220kV延农变电站','220kV天顶变电站','220kV秀峰变电站','220kV学士桥变电站','220kV浦沅变电站'];
// for(k in a){
//     let obj ={};
//     obj.name = v[k];
//     obj.current = [];
//     for(let i = 3000*k;i<3000*(k+1);i++){
//         obj.current.push(temp[i]);
//     }
//     c.push(obj);
// }
// // console.log(c)

// fs.writeFileSync('./subway_current.js',JSON.stringify(c));


// console.log(temp);
// for(k in temp){
//     if(temp[k].length !== 0){
//         data.push(temp[k])
//     }
// }
//
// let nameArray = [];
// let gpsArray = [];
// let currentArray = [];
// let voltageArray = [];
// let json = [];
// for(let i=0;i<data.length;i+=9){
//     nameArray.push(data[i]);
//     let arr = [];
//     arr[0] = data[i+2];
//     arr[1] = data[i+3];
//     gpsArray.push(arr);
//     currentArray.push(data[i+6]);
//     voltageArray.push(data[i+7]);
// }
//console.log(nameArray);
//console.log(gpsArray);
//console.log(currentArray);
// console.log(voltageArray);
// for(k in nameArray){
//     let obj = new Object;
//     obj.name = nameArray[k];
//     obj.gps = gpsArray[k];
//     obj.earthCurrent = currentArray[k];
//     obj.earthVoltage = voltageArray[k];
//     json.push(obj)
// }

// fs.writeFileSync('./subway_current.js',JSON.stringify(json));
// for(let i = (json.length/2 - 1);i< json.length;i++){
//     console.log(json[i])
// }



var dis = {
	distance: [
		[],
		[],
		[]
	],
	value: [
		[],
		[],
		[]
	]
};