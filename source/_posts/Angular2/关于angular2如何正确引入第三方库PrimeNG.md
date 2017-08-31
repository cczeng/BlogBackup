---
title: 关于angular2如何正确引入第三方库PrimeNG
date: 2017-08-10 22:18:15
tags:  ["Angular","笔记"]
comments: true
---
  
最近学习Angular2,需要使用PrimeNG库,结果死活按照官方教程和各种方法来发现出不来样式,但是功能却正常,整整花了有1天多一点时间排查错误和解决问题,今天终于给解决了。   
   
如果你也是这个问题,那不妨点进来看看。   

   

<!-- more -->


由于我使用的是Angular-cli脚手架创建的项目,所以按照官方的教程,应该是：   
   
1.在`package.json`添加：

	```JSON
		"dependencies": {
		  //...
		  "primeng": "^4.1.0",
		  "font-awesome": "^4.7.0"
		}
	```
   
2.在 `.angular-cli.json` 添加：
	   
	```JSON
		"styles": [
		  "../node_modules/font-awesome/css/font-awesome.min.css",
		  "../node_modules/primeng/resources/primeng.min.css",
		  "../node_modules/primeng/resources/themes/omega/theme.css",
		  //...
		]
	```
  

刚开始是发现报错,没有导入他的组件,后面有东西出现了,但是却没有样式。找来找去花了一天时间,人都快绝望了。   
   
最后终于发现了问题,我同学那边可以正常使用官方的种子启动,我这边却怎么也启动不起来。后来发现好像和npm有关,想起我自己使用的是cnpm,就问他的是什么,结果他的是npm就发现问题应该出在这(排除了好多问题),最后我试着去找 `node_modules` 目录下是否有css文件的时候答案就出现了。   

 

**由于使用cnpm安装的,cnpm会自动添加版本号** 导致 **文件路径错误**  

  
### 解决办法
  
请查找 `node_modules` 文件夹下你要引入的css样式文件目录在哪,并手动修改正确路径：
		> 范例： **locate primeng.min.css** //由于我用的是ubuntu所以使用locate命令,windwos直接搜索文件即可
		> 输出:  **/home/zl/WebstormProjects/YDB-WeChat/node_modules/_primeng@4.1.2@primeng/resources/primeng.min.css**
		> 这里显示路径为：**/node_modules/_primeng@4.1.2@primeng/resources/primeng.min.css**
		> 所以把 .angular-cli.json 引入css相应路径修改为你本机模块的路径。
		> **切记！cnpm安装的模块很可能加入版本号！！则路径那里也需要引入版本号**


这是cnpm的一个坑,所以可以的话尽量使用npm.   
