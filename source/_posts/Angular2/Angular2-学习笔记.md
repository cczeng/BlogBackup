---
title: Angular2 学习笔记
date: 2017-07-28 17:36:18
tags:  ["Angular","笔记"]
comments: true
---

最近在学习Angular2的时候碰见很多不懂的知识点,此篇博文用来记录碰到的一些知识点,以及用法。
  

创建时间：2017-07-28 17:36:18   
  
最新更新时间：2017-08-24 18:05

<!-- more -->

### 列表：

1. 组件间通讯[跳转](#componentMess)


&nbsp;&nbsp;&nbsp;&nbsp; 1.1 借助Session进行通讯[跳转](#session)

&nbsp;&nbsp;&nbsp;&nbsp; 1.2 借助Cookie或者localstorage进行通讯[跳转](#localstorage)

&nbsp;&nbsp;&nbsp;&nbsp; 1.3 借助Angular2的服务进行通讯[跳转](#service)

&nbsp;&nbsp;&nbsp;&nbsp; 1.4 借助url参数进行通讯[跳转](#router)

2. 语法类[跳转](#yufa)

&nbsp;&nbsp;&nbsp;&nbsp; 2.1 路由守卫[跳转](#yufa)

&nbsp;&nbsp;&nbsp;&nbsp; 2.2 为组件添加事件监听器(监听键盘)[跳转](#HostListener)


<a name="componentMess"></a>
# 组件间通讯方式：   
   

### 任意两个组件间通讯的方法:
   
> 1. 借助于Session进行通讯&nbsp;&nbsp;&nbsp;[点击查看](#&session)
> 1. 借助与Cookie或者localstorage进行通讯&nbsp;&nbsp;&nbsp;[点击查看](#&localstorage)
> 1. 借助Angular2的服务进行通讯&nbsp;&nbsp;&nbsp;[点击查看](#&service)
> 1. 借助url参数进行通讯&nbsp;&nbsp;&nbsp;[点击查看](#&router)
   
   
<a name="session"></a>
##### 借助Session进行通讯
   

** [什么是Session](https://baike.baidu.com/item/session/479100?fr=aladdin)**   
   

** [Cookie/Session机制详解](http://blog.csdn.net/fangaoxin/article/details/6952954/)**
   
<a name="localstorage"></a>
##### 借助Cookie或者localstorage进行通讯
   

**这里建议使用localstorage进行本地存储**   
   

想要使用web存储非常简单,使用 `.` `点号` 运算符即可添加   

```JS
	localStorage.key="keyVaule"; //设置一个值,键为key，值为keyValue
	alert(localStorage.key);   // 输出一个值
```
非常方便的方法.   
   



   
<a name="service"></a>
##### 借助Angular2的服务进行通讯
   
通过服务进行通讯,只需要在两个组件的构造函数中注入同一个service即可。

```TS
  constructor(private service: HomeService) {}
```   

这里我注入的服务为HomeService组件,名称为service.   


<a name="router"></a>
##### 借助url参数进行通讯
   
在一个组件跳转到另一个组件的时候并携带参数进去即可.

```TS
	// 导入模块
	import { Router, ActivatedRoute } from '@angular/router';
	
	...
	
	constructor(private route: ctivatedRoute,
              private router: Router){}
	...
	
	// 第一个参数为路由名,第二个参数为要传递的值
    this.router.navigate(['/matching',category.routerL]);
```


<a name="yufa"></a>
# 语法类
#### 路由守卫

路由的守卫可以返回一个 `Observable<boolean>` 或 `Promise<boolean>` ，并且路由器会等待这个可观察对象被解析为true或false。   

 
路由器支持多种守卫：
> 1.用 `CanActivate` 来处理导航到某路由的情况。
> 2.用 `CanActivateChild` 处理导航到子路由的情况。
> 3.用 `CanDeactivate` 来处理从当前路由离开的情况。
> 4.用 `Resolve` 在路由激活之前获取路由数据。
> 5.用 `CanLoad` 来处理异步导航到某特性模块的情况。
  

<a name="HostListener"></a>

#### 为组件添加事件监听器(监听键盘)
  
```TypeScript
	@HostListener('document:keydown.escape', ['$event'])
	onKeydownHandler(evt: KeyboardEvent) {
		//触发之后需要执行的语句
	}
```

** 放于组件的类中,`document` 为监听对象, `keydown.escape` 为要监听的事件,`onKeydownHandler` 为触发之后执行的语句 ** 
  

