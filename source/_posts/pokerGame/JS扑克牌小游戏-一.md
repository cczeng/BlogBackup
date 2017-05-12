---
title: JS扑克牌小游戏(一)
date: 2017-05-08 16:08:05
tags: ["JS"]
comments: true
---
# 一、前言
##### 今天上课的时候刚好老师布置了用js来做一个扑克牌的小游戏，起初老师只要求我们做一个简单的随机几张扑克牌做出翻牌效果。但是怎么能甘于做一个这么简单的呢，所以我在老师的要求之上给自己再加了一些要求：   
   
<!--more-->   

## 第一阶段(老师的基本要求)：   

1. 随机出3张牌
2. 实现鼠标经过开牌，鼠标离开盖牌   

## 第二阶段(自我要求——进阶):   

1. 实现用户指定n张牌
2. 在鼠标经过开牌、鼠标离开盖牌的基础上添加单击开牌(鼠标离开不再盖牌)
3. 在单张牌开牌盖牌的基础上添加一键全部开牌、盖牌   

有了要求以后就能进行下一步的展开了这里先放上效果&nbsp;&nbsp;&nbsp;&nbsp;[点击这里查看效果](/Subpage/pokerGame/index.html)   

![演示效果](/img/pokerGame/yanshi.gif)

# 二、如何设计？
这步其实很多人都会忽略，觉得我已经有要求了，可以不用设计直接上手撸代码了。但其实等你撸代码的时候你就会发现越来越多的问题，比如写着写着发现要添加一个功能很难，原因就在于你&nbsp;&nbsp;&nbsp;**没有在撸代码之前稍微花一点时间去思考这个程序大致的框架要怎样来搭建**.(经验多的大牛花在这上面的时间相对更少)   
   
### 1)&nbsp;&nbsp;怎样展示   
1. 考虑到之前要求用户输入发牌的数量，我们在设计的时候就应该使用js的动态创建元素，而不是直接在HTML里直接写入固定元素个数。
2. 1个输入框、1个提交按钮、1个翻全部牌按钮、1个盖上全部牌按钮
3. 把创建牌/添加牌写成一个函数以便后期扩展   

### 2)&nbsp;&nbsp;细节

1. 既然涉及到开牌和盖牌,那就需要改变img标签的src属性，在这怎么保存当前这张牌真正的牌呢？我用了index属性来保存以便取出，这个方法不是最完美的。
2. 在开牌和盖牌的时候是否能更形象呢？比如加入css3动画的Y轴翻转。   
   
**有了这些就可以进行下一步展开了**
# 三、编写代码   
   
## 1)&nbsp;&nbsp;网页布局   
在html文件body里加入:   

	```HTML
	请输入要洗牌的个数.
	<input type="text" name="" id="value">
	<button>发牌</button>
	<button>翻起全部</button>
	<button>盖起全部</button>
	<div id="poker"></div>
	```
这里的div是用来存放扑克牌的。至于扑克牌素材请自行百度下载。   
## 3)&nbsp;&nbsp;CSS代码   
这里考虑到是多张图，我们就使用类的方法来添加样式。   
其中固定了每一张图的长宽，设置了浮动和外边距，还设置了动画时间(翻牌效果)。   
当把.brandBack类添加给图片的时候就能看到图片翻转的效果了。   
	```CSS
	<style>
		.brand {
			width: 105px;
			height: 150px;
			float: left;
			margin-right: 10px;
			margin-top: 20px;
			transition: all 0.8s;
		}
		.brandBack{
			transform: rotateY(360deg);
			transition:all 0.8s;
		}
	</style>
	```
## 3)&nbsp;&nbsp;JavaScript代码   
**首先我们有大量的图片,这些图片的路径我们用一个数组来存储(考虑过用对象后来觉得太麻烦)，我们还要用一个数组来存放每一张图片对应的牌面值**    
	```JavaScript
	//存放牌面值的数组  
	var chars = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
	//每一张牌的路径,brands下标对应A-K(13张)
	var brands = ["img/14.jpg","img/15.jpg","img/16.jpg","img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg","img/21.jpg","img/35.jpg","img/49.jpg","img/11.jpg","img/12.jpg","img/13.jpg"];   
	```
上面均是全局数组，不需要放在任何function函数中   

**有了牌面值、每一张牌的路径,那么我们是不是还缺一个牌的背面呢？**   
   
	//牌的背面
	var back = "img/back.jpg";
   
***注意：***所有牌的路径以你自己的路径为准，这里可能和你们的不一样。   
   
##### 牌的随机面值   
这里我们需要用到js的随机函数Math.random()来创建一个随机数，创建一个1-13的随机数来对应A-K。   

	Math.random()*13;   
但是你会发现这样随机出来的数是小数，那怎么办？js其实还提供了一个方法：
>ceil() 方法可对一个数进行上舍入。——来自[W3C网](http://www.w3school.com.cn/jsref/jsref_ceil.asp)   
那么我们为了方便就把这个生成随机数打包成一个函数:     

 	```JavaScript
	//生成一个1-13的随机数
	function generateMixed() {
		var id = Math.ceil(Math.random()*13);
		return id;
	}   
	```
*以上函数就是生成一个随机数的函数了，后面我们只需要调用它就可以返回一个1-13的随机数给我们了。*

##### 创建一张“牌”   
我们有了之前的牌面值和路径之后是不是还缺少一个真正的牌在HTML DOM里面呢？那么我们就利用JS的动态创建来把我们的扑克牌添加进去吧！   
   
	var img = document.createElement('img');   
上面这条语句就在HTML文档树中添加了一个img标签元素了，也就是我们所说的牌，但是这张牌还没有在HTML中出现，他只是DOM世界的一个孤儿，我们稍后再把它插入HTML文档中。   

	var num = generateMixed();
	var imgSrc = brands[num-1];   
这两句是干嘛的呢？num变量是用来保存随机出来的数值，imgSrc是把随机出来的数值对应到brands数组(存放着图片路径)中的路径，这里num-1是因为数组下标是从0开始的。   
   
那么有了img标签和面值、路径后我们是不是应该给img标签添加路径了呢？   
**这里我们还需要考虑一个问题，所有的牌出现的时候都应该是盖着的，那我们要怎么实现保存每一张牌的正面呢？**   
这里我想到了两个方法：   

1. 使用数组保存每一张牌的正面图片路径   
1. 在img标签里加入一个index属性用来存放当前牌的正面路径   

刚开始你可能会有疑惑，为什么要这样做？**因为你翻牌的效果实际上就是改变了img标签的src属性**   

   		```JavaScript
		img.setAttribute('src',back);
		img.setAttribute('alt','扑克');
		img.setAttribute('index',imgSrc);
		img.setAttribute('class','brand');
		img.setAttribute('row',chars[num-1]);   
		```
每一行代码作用:   

1. 由于发的牌第一次出现应该是背面,所以我们先把背面牌路径给src
2. 当用户无法查看图像时（可能由于网速太慢、错误的 src 属性、或者用户使用的是屏幕阅读器），alt 属性为图像提供了替代的文本。[引自W3C](http://www.w3school.com.cn/html5/att_img_alt.asp)   
3. 把当前牌的真正路径放入index属性中   
4. 添加class类
5. 添加row属性用来存放牌面值   
   
*在第3点、第5点其实不应该直接把面值和路径直接放在img标签属性中。但为了方便我选择把它放在了img标签中。在以后的项目中尽量不要这么做，*   

##### 为你的牌添加事件   
既然我们要做鼠标进过的时候开牌离开盖牌，那么就要用到onmouseover、onmouseout事件，**(自我要求)**这个时候我们得多想想，难道我只能鼠标移在一张牌的时候看牌吗？如果我要看多张牌呢？所以我添加了一个onclick事件，在点击这张牌之后一直是开牌状态   
    ```JavaScript
	img.onmouseover = function(){
		flop(this);
	}
	img.onmouseout = function(){
		flopBack(this);
	}
	img.onclick = function(){
		turn(this);
	}   
	```
分别设置了三个事件，每个事件触发时都会执行一个函数。分别是:1、开牌2、盖牌3、点击一直开牌   
**开牌函数**   
	```JavaScript
	//翻牌事件
	function flop(element) {
		element.setAttribute('class','brand brandBack');
		element.setAttribute('src',element.getAttribute('index'));
	}
	```
由于我们是把当前元素(this)传递进来了，我们只需要修改src属性就可以把正面牌展示出来了，但是直接修改就没有翻牌动画了，所以在修改之前我们需要添加brandBack类，实际上就是一个转牌动画。   

**盖牌函数**   
	```JavaScript
	//盖牌
	function flopBack(element) {
		element.setAttribute('class','brand');
		element.setAttribute('src',back);
	} 
	```
和开牌一样，我们只需要把brandBack类去掉就行了，再把图片背面替换过来。   

**点击翻牌**   
	```JavaScript
	//点击翻拍
	function turn(element) {
		element.setAttribute('class','brand brandBack');
		element.setAttribute('src',element.getAttribute('index'));
		element.onmouseout = null;
	}  
	```
同上两个方法一样，最后一句是把onmouseout事件移除，不然单击之后鼠标移开又会触发盖牌。   

##### 把你的牌插入到html中   
   
这里我们需要先得到HTML中的id为poker的div元素,我用了全局变量来存放这个元素以便后面要用:   

	var poker = document.getElementById('poker');   
请把它放在chars数组和brands数组后。   
回到之前创建牌的那，加入下面这句:   
	
	poker.appendChild(img);  
这样就把创建的牌插入到HTML元素中了，但是我们能不能改进一下呢？比如可以指定创建多少个，我们只需要一个参数和一个循环就可以搞定了。创建牌的函数最终样子就是这样了:   
		
		```JavaScript
		//创建牌
		function createBrand(n) {
			for(var i =0; i< n;i++)
			{
				var img = document.createElement('img');
				var num = generateMixed();
				var imgSrc = brands[num-1];
				img.setAttribute('src',back);
				img.setAttribute('alt','扑克');
				img.setAttribute('index',imgSrc);
				img.setAttribute('class','brand');
				img.setAttribute('row',chars[num-1]);
				img.onmouseover = function(){
					flop(this);
				}
				img.onmouseout = function(){
					flopBack(this);
				}
				img.onclick = function(){
					turn(this);
				}
				poker.appendChild(img);
			}
		}   
		//开牌
		function flop(element) {
			element.setAttribute('class','brand brandBack');
			element.setAttribute('src',element.getAttribute('index'));
		}
		//盖牌
		function flopBack(element) {
			element.setAttribute('class','brand');
			element.setAttribute('src',back);
		}
		//点击开拍
		function turn(element) {
			element.setAttribute('class','brand brandBack');
			element.setAttribute('src',element.getAttribute('index'));
			element.onmouseout = null;
		}
		 ```

### 在什么时候创建？   
在这之前的步骤都还没有执行，那么我们需要在什么时候添加进网页内容中呢？还记得最早在html代码中的那几个按钮和一个文本输入框吗？对，就是让用户输入一个数然后点击发牌你的牌才发出来。   
那么我们应该先获得到输入框的值然后再创建：   
   

```JavaScript
		//设置要生成牌的张数
		function getValue()
		{
			var value = document.getElementById('value');
			createBrand(value.value);
		}   
```
这时候创建牌函数的触发条件就有了，那就是“发牌”按钮。如果没有这个触发，那就网页上永远都不会出现牌，因为你没有任何事件触发它。   
**对了，我们好像还忘了点什么，我们不是有翻起全部牌和盖上全部牌吗？**   
这个和之前翻牌和盖牌没有很大差距，唯一的差别就是你需要用一个循环来遍历所有的img。   

```JavaScript
		//翻起全部牌
		function openAllCards() {
			var brandsList = poker.getElementsByTagName('img');
			for(var i=0;i<brandsList.length;i++)
			{
				brandsList[i].setAttribute('class','brand brandBack');
				brandsList[i].setAttribute('src',brandsList[i].getAttribute('index'));
				brandsList[i].onmouseout = function(){
					flopBack(this);
				}
			}
		}
```
盖牌也是一样:
```JavaScript
		//盖起全部牌
		function closeAllCards(){
			var brandsList = poker.getElementsByTagName('img');
			for(var i=0;i<brandsList.length;i++)
			{
				brandsList[i].setAttribute('class','brand');
				brandsList[i].setAttribute('src',back);
				brandsList[i].onmouseout = function(){
					flopBack(this);
				}
			}
		}
```
因为我们之前可能单击之后触发的函数把onmouseout事件移除了，所以在这我们需要重新添加进去。   
### 最后给你的按钮添加单击事件
找到html中的文本输入框和三个按钮并加入onclick事件，最终效果如下:   

```html
	请输入要洗牌的个数.<input type="text" name="" id="value">
	<button onclick="getValue()">发牌</button>
	<button onclick="openAllCards()">翻起全部</button>
	<button onclick="closeAllCards()">盖起全部</button>
```
# 四、结束   
**“发牌游戏”就到这了。这次任务的核心点就在于各个函数之间的调用以及整体的设计，重点就是在于细节方面，比如更形象的“翻牌效果”**   
### 最终代码   

```html  
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>发牌游戏</title>
		<style>
			.brand {
				width: 105px;
				height: 150px;
				float: left;
				margin-right: 10px;
				margin-top: 20px;
				transition: all 0.8s;
			}
			.brandBack{
				transform: rotateY(360deg);
				transition:all 0.8s;
			}
		</style>
	</head>
	<body>
		请输入要洗牌的个数.<input type="text" name="" id="value">
		<button onclick="getValue()">发牌</button>
		<button onclick="openAllCards()">翻起全部</button>
		<button onclick="closeAllCards()">盖起全部</button>
		<div id="poker">
			
		</div>
	
	
		<script>
			var chars = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
			//每一张牌的路径,brands下标对应A-K(13张)
			var brands = ["img/14.jpg","img/15.jpg","img/16.jpg","img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg","img/21.jpg","img/35.jpg","img/49.jpg","img/11.jpg","img/12.jpg","img/13.jpg"];
			//牌的背面
			var back = "img/back.jpg";
			var poker = document.getElementById('poker');
	
			function generateMixed() {
		         var id = Math.ceil(Math.random()*13);
			     return id;
			}
			//创建牌
			function createBrand(n) {
				for(var i =0; i< n;i++)
				{
					var img = document.createElement('img');
					var num = generateMixed();
					var imgSrc = brands[num-1];
					img.setAttribute('src',back);
					img.setAttribute('alt','扑克');
					img.setAttribute('index',imgSrc);
					img.setAttribute('class','brand');
					img.setAttribute('row',chars[num-1]);
					img.onmouseover = function(){
						flop(this);
					}
					img.onmouseout = function(){
						flopBack(this);
					}
					img.onclick = function(){
						turn(this);
					}
					poker.appendChild(img);
				}
			}
			//设置要生成牌的张数
			function getValue()
			{
				var value = document.getElementById('value');
				createBrand(value.value);
			}
			//开牌
			function flop(element) {
				element.setAttribute('class','brand brandBack');
				element.setAttribute('src',element.getAttribute('index'));
			}
			//盖牌
			function flopBack(element) {
				element.setAttribute('class','brand');
				element.setAttribute('src',back);
			}
			//点击开牌
			function turn(element) {
				element.setAttribute('class','brand brandBack');
				element.setAttribute('src',element.getAttribute('index'));
				element.onmouseout = null;
			}
			//翻起全部牌
			function openAllCards() {
				var brandsList = poker.getElementsByTagName('img');
				for(var i=0;i<brandsList.length;i++)
				{
					brandsList[i].setAttribute('class','brand brandBack');
					brandsList[i].setAttribute('src',brandsList[i].getAttribute('index'));
					brandsList[i].onmouseout = function(){
						flopBack(this);
					}
				}
			}
			//盖起全部牌
			function closeAllCards(){
				var brandsList = poker.getElementsByTagName('img');
				for(var i=0;i<brandsList.length;i++)
				{
					brandsList[i].setAttribute('class','brand');
					brandsList[i].setAttribute('src',back);
					brandsList[i].onmouseout = function(){
						flopBack(this);
					}
				}
			}
		</script>
	</body>
	</html>
```   

#### 最后感谢您的阅读，后面可能会在这个的基础上改良，例如实现发牌动画效果。   
**如果觉得这篇文章对您有帮助，请转载给更多需要的人(转载时请注明出处)。谢谢！**

