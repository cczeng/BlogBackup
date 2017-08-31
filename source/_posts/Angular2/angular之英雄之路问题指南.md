---
title: angular之英雄之路问题指南
date: 2017-08-10 22:16:05
tags:  ["Angular","笔记"]
comments: true
---

本篇博文简单汇总一下根据angular官方[教程: 英雄指南](https://angular.cn/docs/ts/latest/tutorial/) 来学习的时候碰见的常见问题。    

创建时间：2017-07-25 12:32:05   
  
最新更新时间：2017-08-10 22:16:05

<!-- more -->

# 官方文档——英雄之路系列 

### 使用官方 快速起步种子 之后导致 ng build --prod 发布失败

在我们安装@angular/cli之后，使用官方的快速起步种子编写好之后，发现`ng serve` `ng build --prod` 等命令报错，这是因为官方的起步种子和你安装的@angular/cli里面引用的版本不一样，解决办法：   

> 使用 ng new demo 新建命令，而不使用快速起步种子即可解决，或者自行修改 package.json 文件   

### HTTP 模拟本地WebAPI 没有找到 angular-in-memory-web-api 错误   

> HttpModule并不是 Angular 的核心模块。 它是 Angular 用来进行 Web 访问的一种可选方式，并位于一个名叫 @angular/http 的独立附属模块中，并作为 Angular 的 npm 包之一而发布出来。

angular官方文档就已经说明了，这个模块并不是angular的核心模块，所以我们要自己引入这个模块：

> 在 `package.json` 文件里 `devDependencies` 中添加一句 ： `"angular-in-memory-web-api": "~0.1.13"` 
> 删除node_modules 文件，重新安装依赖：npm install即可解决


### 发布出来部署到服务器上之后刷新、复制URL导致404错误

这是因为当你刷新/复制URL进浏览器，浏览器会默认去寻找后台路由，而不是进入index.html由angular 的路由进行引导，所以就会出现404错误，解决办法：

1. 写一个渲染页面的后台路由，所有路由都返回一个页面，如index.html，然后页面就可以捕获路由自己处理了
2. 设置IIS的url rewrite
3. 给angular路由导航时添加一个`#` 号

第三个解决办法：   


**在 `app-module.ts`文件中 加入以下语句：**   

	import {HashLocationStrategy,LocationStrategy} from "@angular/common";
	providers: [
	    {
	      provide: LocationStrategy,
	      useClass: HashLocationStrategy
	    },
	],



这里我们使用第三种方法，不过这个方法可能会导致微信网页授权问题，这里参考[从Angular2路由引发的前后端路由浅谈](http://www.cnblogs.com/yitim/p/angular2-study-route-and-deploy.html) 文中：


> 配置给微信那边的回调地址应该是这样的格式：

> domain/#/url?code=xxxxx&state=xxxxx
> 但是至少目前的微信授权接口，会自作聪明处理#符号，导致其会回调到这样的路径： 

> domain/?code=xxxxx&state=xxxxx/#/url
> 也就是说微信这厮居然认为#后边的参数不再参与路由了，强行把回调参数提到#号之前，简直蛋疼。

所以尽量采用第一种方法。


### 高级文档——路由与导航——里程碑2 英雄特征区  

这里有一个错误,是把 `app.component.ts` 文件内容拷贝进刚刚创建的 `hero-list.component.ts` 文件中(可直接参考此章节最后的文件内容),进行下一步.   

![文件拷贝错误](/img/angular/error_1.png)    


### 高级文档——路由与导航——里程碑4 危机中心   

![angular2官方文档一不小心看错系列](/img/angular/warning_1.png)  
   

> 解决办法： 文档的意思是把整个 `app/heroes` 文件夹里面的所有文件拷贝至 `app/crisis-center` 之后,把 `文件名` && `文件内容中` 的 **hero** 替换为 **crisis** 并把 **heroes** 替换为 **crises**, **是所有文件内容**   




# 编译、发布、运行出错系列  


### 执行 ng build 没有报错,ng build --prod 报错

**执行 `ng build --prod` 出现下列这种错误: **    

 

	ERROR in ./src/main.ts
	Module not found: Error: Can't resolve './$$_gendir/app/app.module.ngfactory' in 'D:\angular2\router\src
	'
 	@ ./src/main.ts 1:0-74
 	@ multi ./src/main.ts
 

> 因为执行 `ng build --prod` 的时候,自动执行aot编译,在这里需要禁用。执行 ** `ng build --prod --aot false `** 即可   

	D:\angular2\router>ng build --prod
	Hash: 5c0f814406a8b9d0f2e8                                                              
	Time: 17789ms
	chunk    {0} polyfills.b8858ddd6c4bd49f3fdf.bundle.js (polyfills) 177 kB {4} [initial] [rendered]
	chunk    {1} main.80a10c4ad116096aaaaf.bundle.js (main) 421 bytes {3} [initial] [rendered]
	chunk    {2} styles.fd0e9b458fe0dc6cdf6a.bundle.css (styles) 69 bytes {4} [initial] [rendered]
	chunk    {3} vendor.ccededec441b60eb57ce.bundle.js (vendor) 849 kB [initial] [rendered]
	chunk    {4} inline.e873a66a192ef88965b4.bundle.js (inline) 0 bytes [entry] [rendered]
   


 
# 引入第三方库问题、出错系列
  
### 引入第三方库没有css样式：   
  
问题：在项目的根目录下.angular-cli.json中引入第三方库的css文件没有效果。  
  
	1. 是否使用 `npm install` 安装的 `node_module`,如果不是npm安装,请直接跳过第二点阅读第三点。  
	2. 检查 `.angular-cli.json` 文件中 `style:[]` 引用路径是否错误,正确路径以 `'../node_modules/'`开头,**不要省略 `../`**  
	3. 如果是 `cnpm install` 安装的(这个一个大坑,坑了一天时间找一个问题),请查找 `node_modules` 文件夹下你要引入的css样式文件目录在哪,并手动修改正确路径：
		> 范例： locate primeng.min.css //由于我用的是ubuntu所以使用locate命令,windwos直接搜索文件即可
		> 输出:  /home/zl/WebstormProjects/YDB-WeChat/node_modules/_primeng@4.1.2@primeng/resources/primeng.min.css
		> 这里显示路径为：/node_modules/_primeng@4.1.2@primeng/resources/primeng.min.css
		> **切记！cnpm安装的模块很可能加入版本号！！则路径那里也需要引入版本号**

这是cnpm的一个坑,所以可以的话尽量使用npm.   

