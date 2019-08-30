#!/usr/bin/env node

var RPC = require('bitcoind-rpc');
var express = require("express");
var app = express();
var http = require('http');
var fs = require('fs');
var path = require('path');
var readline = require('readline');

/*参数*/

//数据目录路径，配置文件bitcoin.conf将会覆盖这里 （这个必须要改,用户名和币的名称都在路径中）
//MacOS下(Tcash等山寨比币)默认为      /Users/XXX/Library/Application\ Support/Tcash/
//MacOS下(比特币)默认为              /Users/XXX/Library/Application\ Support/Bitcoin/
//Linux默认为                      /home/XXX/.tcash/
var DATA_PATH = "/Users/gannicus/Library/Application\ Support/Tcash/";

//要获取的地址数量（10000个差不多）
var NUM_TO_FETCH = 10000;

//提取时使用的线程数量，不要设太大
var THR_NUM = 4;

//本地比特比rpc接口(不用改)
var mrpc = new RPC({
	protocol:"http",
	host:'127.0.0.1',
	port:'10001',
	user:'123',
	pass:'123',
});

/*函数 */

//获取比特币帐号新地址
var getBTCNewAddress = function(callback){
	mrpc.getNewAddress(function (err ,ret){
		if (err) {
			callback(err,err.message);
			return;
		} else {
			var btcAddr= ret.result;
			callback(null,btcAddr);
			return;
		}
	});
};

//复制文件
var copyFile = function (sourceFile, destPath , callback){
  var readStream = fs.createReadStream(sourceFile);
  var writeStream = fs.createWriteStream(destPath);
  readStream.pipe(writeStream);
  callback(null,null);
};

//用户输入
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var main = function(){
  //1.复制conf文件到数据目录
  var fileName = "bitcoin.conf";
  var sourceFile = path.join(__dirname, fileName);
  var destPath = path.join(DATA_PATH, fileName);
  copyFile(sourceFile,destPath,function(err,ret){
    console.log("RPC配置加载完成...");
    //2.等待用户重启客户端
    rl.question('请手动打开Bitcoin Core客户端，或重启客户端，然后按任意键继续...', (answer) => {
      //console.log(`多谢的反馈：${answer}`);
      rl.close();
      //3.开始请求地址
      var count = 0;
      var filename = "./Bitcoin Addresses "+ Date() +".txt";
      //多个线程提取
      for(var i = 0 ; i < THR_NUM ; i ++ ) {
        var getAddressThr = function (){
          getBTCNewAddress(function(err,ret){
            if(err){
              console.log(ret);
              return;
            }
            console.log("get address "+ count +": " + ret);
            //4.写入文件
            fs.appendFile(filename,ret + "\n",null,function(){
              //判断当前行数是否达到指定数量
              count++;
              if(count >= NUM_TO_FETCH){
                console.log("已完成!" + count + "个地址已提取到./Bitcoin Addresses.txt中");
              }else{
                getAddressThr();
              }
            });
          });
        }
        getAddressThr();
      }
    });
  });
}();
