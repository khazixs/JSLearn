const http = require("http");
const fs = require("fs");
const urlLib = require("url");
const querystring = require("querystring");

var users = {};//{"blur":12345,"zhangsan",password:12311}

var server = http.createServer(function (req, res) {
        //解析数据
        var str = '';
        req.on('data', function () {
            str += data;
        });
        req.on('end', function () {
            var obj = urlLib.parse(req.url, true);
            const GET = obj.query;
            const url = obj.pathname;
            const POST = querystring.parse(str);
            //区分一下访问接口还是访问文件
            if (url == '/user') {
                //这种情况认定是请求接口
                switch (GET.act) {
                    case 'reg':
                        //1.检查用户名是否已存在
                        //2.插入users
                        if (user[GET.user] == null) {
                            res.write('{"ok":false,"msg":"用户名已存在“}')
                        } else {
                            user[GET.user] = GET.pass;
                            res.write('{"ok":ture,"msg":"注册成功"}');
                        }
                        break;
                    case 'login':
                        //1.检查用户名是否已存在

                        if (users[GET.name] == false) {
                            res.write('{"ok":false,"msg":"此用户不存在"}');
                        }
                        //2.检查密码对不对
                        else {
                            if (users[GET.pass] != GET.pass) {
                                res.write('{"ok":false,"msg":"用户名或密码错误"}')
                            } else {
                                res.write('{"ok":true,"msg":"登陆成功"}')

                            }
                        }
                        break;
                    default:
                        res.write('{"ok":false,"msg":"未知的act"}');
                }
            } else {
                //读取文件
                var file_name = './www' + url;
                fs.readFile(file_name, function (err, data) {
                    if (err) {
                        res.write('404');
                    } else {
                        res.write(data);
                    }
                    res.end(url);
                });
            };
        });
    });
server.listen(49999);
console.log('sever is running at http://127.0.0.1:49999');