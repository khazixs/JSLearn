# fetchaddr
用于大量提取Bitcoin Core以及其他山寨币钱包的地址

# 运行环境
确保已安装node
## MacOS
下载Homerew
https://brew.sh/
安装node
```
brew install node
```
## Linux
查看这里
http://www.tiny-calf.com/node-jskuai-su-an-zhuang-chao-ji-kuai/

# 用法（以Bitcoin Core为例）

* 启动Bitcoin Core, 尽量使用默认的数据路径（Mac上只能使用默认路径）
* 关闭客户端，Bitcoin Core 开始下载区块链以后就可以关闭了
* 按需求修改run.js中的参数，尤其是数据路径（在run.js前30行有详细注释）
* 启动run.js，期间会提示你重新开启客户端。
```
./run.js
```
* 等待提取完毕，生成文件会保存在本项目根目录下的Bitcoin Addresses中
