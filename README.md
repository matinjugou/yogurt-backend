# Yogurt-Backend
[![Build Status](https://travis-ci.com/matinjugou/yogurt-backend.svg?token=YWXDqp5MTARNnQYDB4E8&branch=master)](https://travis-ci.com/matinjugou/yogurt-backend)
#### 项目说明
Yogurt客服平台的后端部分。
#### 框架语言
ThinkJs 3.2.6
NodeJs 8.9.3
#### 运行方式
##### NPM
npm run start [port]
##### Nginx
将项目附带的yogurt.conf做适当修改后按照nginx规范部署
##### pm2
```
sudo npm install -g pm2
```
安装完成后，命令行下会有 pm2 命令。
修改名为pm2.json 的配置文件，内容类似如下：
```
{
  "apps": [{
    "name": "demo",
    "script": "production.js",
    "cwd": "/Users/welefen/Develop/git/thinkjs/demo",
    "max_memory_restart": "1G",
    "autorestart": true,
    "node_args": [],
    "args": [],
    "env": {}
  }]
}
```
将 name 字段改为项目名，cwd 字段改为线上项目的具体路径。
可以在项目根目录下执行 pm2 start pm2.json 来启动项目
#### 相关文档
https://mrjia1997.gitbooks.io/yogurt-document/content/
#### 开源协议
GPL 3.0
#### 版权信息
作者：黄超 杨璧菲  
单位：清华大学软件学院
