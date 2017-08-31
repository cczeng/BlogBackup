---
title: 初识Angular2
date: 2017-07-25 11:21:59
tags:  ["Angular","笔记"]
comments: true
---
已经好久没有写博客了，一直提不起劲来写。最近正在研究Angular2，就此写一篇关于Angular2环境的配置，以及一些问题。
<!-- more -->

# 起步

[Angular中文官网](https://angular.cn/)   

> AngularJS2 是一款开源JavaScript库，由Google维护，用来协助单一页面应用程序运行。    

也是最近才接触SPA(单页面应用程序)，以前还没有这个概念也没有这方面的资料了解。在国内用Angular2开发的还比较少，所以资料也难找。在搭建环境的路上就走了好多弯路，后面环境搭建好之后，就可以根据官方文档来学习（暂时没发现更全面的教学）[Angular-快速起步](https://angular.cn/docs/ts/latest/quickstart.html)  

# Angular 架构

想要使用angular,就先了解其原理和架构，俗话说：`工欲善其事，必先利其器。` 

![Angular架构概览](/img/angular/overview.png)   
此图来自[Angular官网](https://angular.cn/docs/ts/latest/guide/architecture.html)   

Angular2应用程序主要由以下8个部分组成：   

1. 模块（Modules）
2. 组件（Component）
3. 模板（Templates）
4. 元数据（Metadata）
5. 数据绑定（Data Binding）
6. 指令（Directives）
7. 服务（Services）
8. 依赖注入（Dependecy Injection）

先大概了解一下架构，等后面跟着官方文档写之后，就能慢慢理解了。

#  环境搭建   

Angular的开发环境主要依赖：node、npm、cnpm、angular-cli、typescript

### 1、NodeJS   

[下载Node.js](https://nodejs.org/en/download/)   
参考:[安装Node.js](http://www.runoob.com/nodejs/nodejs-install-setup.html)   
   
### 2、安装需要的环境   

安装好node之后，默认就安装好了npm，所以接下来就按下面的步骤安装：

```
	//添加淘宝源(国外源可能会很慢)
	npm install -g cnpm --registry=https://registry.npm.taobao.org
	//安装Angular-cli脚手架
	cnpm install -g @angular/cli      //国内源,也可以使用国外源，将cnpm替换为npm即可，下面也是一样
	//安装TypeScript(一个JavaScript的超集,用于编写Angular)
	cnpm install -g typescript
	//检查版本(是否安装)
	node -v //检查node版本,尽量使用最新版
	npm -v //检查npm版本,使用最新版
	cnpm -v //检查cnpm版本
	ng -v //检查angular版本
	tsc -v //检查typescript版本
```

如果都正常显示版本，则说明环境已经安装完成。   

#  创建第一个Angular应用程序

搭建好前面的依赖环境之后，则可开始创建Angular应用程序了，推荐使用[WebStorm IDE](http://www.jetbrains.com/webstorm/)开发。   


```
	//先进入你需要创建的工程文件夹
	cd angular
	//创建一个项目
	ng new demo //demo为项目名
	//进入项目文件夹
	cd demo
	//安装依赖
	cnpm install
	//此时你的第一个angular项目已经准备好了,接下来就启动它
	ng serve
	//这时候打开浏览器输入：http://localhost:4200 即可看到你的第一个angular应用程序了
```

这个时候打开浏览器输入 `http://localhost:4200` ,即可看到你的第一个angular应用程序。


# 发布

到此为止，你只是创建好了你的angular项目，但是还没有一个可以应用在服务器上的文件，也就是我们平时编写的index.html等文件，这时候就需要进行发布。   

```
	ng build --prod
```

执行： `ng build --prod` 即可进行编译出发布版本，这里的prod参数为使用AOT编译器进行编译，加了这个参数`编译出的文件更小`    


好了，至此为止，你的第一个angular应用程序终于算是搭建出来了。如果想了解angular的目录文件介绍，这次推荐[《angular2项目之目录结构》](http://blog.csdn.net/yxf15732625262/article/details/71375052)  

