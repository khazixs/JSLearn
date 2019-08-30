const fs = require('fs');
const express = require('express');
const rootPath = 'C:\\Users\\洗衣机\\Desktop\\目录';

var server = express();
server.listen(49349);


server.get('/4', function (req, res) {
    let rootPath = req.query.rootPath;
    let filesList = getFileList(rootPath);
    function getFileList(path) {
        let filesList = new Set();//该数组用于存放文件对象
        readFile(path, filesList);//调用函数readFile扫描文件夹
        return filesList;
    }

    function readFile(path, filesList) {
        let files = fs.readdirSync(path);//需要用到同步读取，不然就会执行的很混乱
        for (let file of files) {
            let states = fs.statSync(path + '/' + file);
            if (states.isDirectory()) {
                readFile(path + '/' + file, filesList);
            } else {
                //创建一个对象保存信息
                let stat = fs.statSync(path + '/' + file);
                let obj = new Object();
                obj.name = file;//文件名
                obj.size = states.size;//文件大小，以字节为单位
                obj.path = path + '/' + file;//文件绝对路径
                obj.creat = stat.ctime;
                obj.modify = stat.mtime;
                filesList.add(obj);
            }
        }
    }

    //功能4 按照文件大小搜索文件

    let a = req.query.type;

    let max = req.query.max;

    let min = req.query.min;


    let searItBySize = searchBySize(min, max, a);
    console.log(searItBySize)

    function searchBySize(min, max, a) {
        let str = '';
        let type = new RegExp(`\.${a}`);
        for (let key of filesList.keys()) {
            let size = (key.size / 1024).toFixed(2);
            if (min <= size && size <= max) {
                if (type.test(key.name)) {
                    str += '文件名:' + key.name + "<br>" + '文件大小:' + (key.size / 1024).toFixed(2) + 'kb' + "<br>" + '文件路径:' + key.path + "<br>" + '创建时间:' + key.creat + "<br>" + '最后修改时间:' + key.modify + "<br>";
                }
            }
        }
        return str
    }
    if(searItBySize == ''){
        res.send('没有符合要求的文件')
    }else{
        res.send(searItBySize);
    }
    res.end('aaa');

})


server.get('/3', function (req, res) {
    let rootPath = req.query.rootPath;
    let filesList = getFileList(rootPath);

    function getFileList(path) {
        let filesList = new Set();//该数组用于存放文件对象
        readFile(path, filesList);//调用函数readFile扫描文件夹
        return filesList;
    }

    function readFile(path, filesList) {
        let files = fs.readdirSync(path);//需要用到同步读取，不然就会执行的很混乱
        for (let file of files) {
            let states = fs.statSync(path + '/' + file);
            if (states.isDirectory()) {
                readFile(path + '/' + file, filesList);
            } else {
                //创建一个对象保存信息
                let stat = fs.statSync(path + '/' + file);
                let obj = new Object();
                obj.name = file;//文件名
                obj.size = states.size;//文件大小，以字节为单位
                obj.path = path + '/' + file;//文件绝对路径
                obj.creat = stat.ctime;
                obj.modify = stat.mtime;
                filesList.add(obj);
            }
        }
    }

    //功能3 按类型搜索文件
    let a = req.query.type;
    let myRegex = new RegExp(`\.${a}`);
    console.log(myRegex);
    let searItByType = searchByType(myRegex);

    function searchByType(myRegex) {
        let str = '';
        let number = 0;
        for (let key of filesList.keys()) {
            if (myRegex.test(key.name)) {
                number++;
                str += '文件名:' + key.name + "<br>" + '绝对路径:' + key.path + "<br>";

            }
        }
        str += ('该类型文件有:' + number);
        res.send(str);
        res.end()
    }
})

server.get('/2', function (req, res) {
//功能2 输出所有的文件类型
    let rootPath = req.query.rootPath;
    let filesList = getFileList(rootPath);

    function getFileList(path) {
        let filesList = new Set();//该数组用于存放文件对象
        readFile(path, filesList);//调用函数readFile扫描文件夹
        return filesList;
    }

    function readFile(path, filesList) {
        let files = fs.readdirSync(path);//需要用到同步读取，不然就会执行的很混乱
        for (let file of files) {
            let states = fs.statSync(path + '/' + file);
            if (states.isDirectory()) {
                readFile(path + '/' + file, filesList);
            } else {
                //创建一个对象保存信息
                let stat = fs.statSync(path + '/' + file);
                let obj = new Object();
                obj.name = file;//文件名
                obj.size = states.size;//文件大小，以字节为单位
                obj.path = path + '/' + file;//文件绝对路径
                obj.creat = stat.ctime;
                obj.modify = stat.mtime;
                filesList.add(obj);
            }
        }
    }

    function typeSet() {
        console.log('该目录下所有文件类型如下');
        let arr = [];
        let str = '';
        for (let key of filesList.keys()) {
            let regex = /.*(\..*)/;
            let a = (regex.exec(key.name));
            arr.push(a[1]);
        }
        let set = new Set(arr);
        for (let k of set.keys()) {
            str += k + "<br>";
        }

        return str;
    }

    let alltype = typeSet();


    res.send(alltype);
    res.end();
})


server.get('/1', function (req, res) {
    let rootPath = req.query.rootPath;
    //功能1 输出目录结构
    var filesMap = new Map();
    var arrKey = [];
    let filesDir = getFileDir(rootPath);

    function getFileDir(path) {
        let filesDir = new Set();//该数组用于存放文件对象
        readFile2(path, filesDir);//调用函数readFile扫描文件夹
        arrKey.sort();
    }

    function readFile2(path, filesDir) {
        let files = fs.readdirSync(path);
        let arr = [];
        for (let file of files) {
            let p = path + '/' + file;
            states = fs.statSync(p);
            if (states.isDirectory()) {
                readFile2(p, filesDir);
            } else {
                arr.push(file);
            }
        }
        filesMap.set(path, arr)
        arrKey.push(path)
    }

    function catalogue() {
        let catalogue = '';
        for (let key of arrKey) {
            let regex1 = /.*\\(.*)/;
            let key1 = (regex1.exec(key))[1];
            catalogue += (key1 + "<br>");
            let array = filesMap.get(key);
            for (let x of array) {
                /*console.log(x);*/
                catalogue += (x + "<br>");
            }
        }
        return catalogue
    }

    let catalog = catalogue();
    res.send(catalog)
    res.end
})

