---
title: JS扑克牌小游戏(三)
date: 2017-06-11 14:58:06
tags: ["JS"]
comments: true
---

继续前两个版本的更新。本次更新加入了发牌动画以及点击开牌之后的效果。更新了一些以前没有接触到的知识点，其中动画就是一点,若想看动画制作效果请看我上一篇的博文 **[初学JavaScript动画](https://cczeng.github.io/2017/05/31/JavaScript/%E5%88%9D%E5%AD%A6JavaScript%E5%8A%A8%E7%94%BB/)**。此次程序相对复杂，就不做细分，主要讲一下每个函数功能:    


1. 新的动画功能(考虑到效率本次中弃用)
2. 使用setTimeout()
3. 预加载函数
4. 监听手机是否横屏
5. 添加毛玻璃效果


<!-- more -->

此次经过了两次更新，第一次只考虑做出效果来，第二次改进修复了几个已知BUG，并且改善了第一次的动画流畅度，第一次的效果在手机上有明显卡顿。   


先上两个版本的效果 ：     

第一版：

![demo3](/img/JavaScript/pokerGameDemo/demo3_1.gif)

第二版：   

![demo3](/img/JavaScript/pokerGameDemo/demo3_2.gif)   

可以明显看出动画效果不一样了。可以点击这里看第二版的实际效果： **[第二版演示](\Subpage\pokerGame\thanPoints.html)**

# 一、html   

在写完第一版之后其实不怎么想写bolg的，因为那天写的实在头疼，写到最后逻辑乱了，但后面又抽空去重新改良了以下，逻辑也理清了。才准备些blog记录这次成长的╭(╯^╰)╮。   

好了和之前一样，首先就是单纯的写一个html文件看看实际效果布局，然后添加css和js。
```HTML
    <!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>扑克人机战</title>
		<link rel="stylesheet" href="css/poker.css">
	
	</head>
	<body>
		<article id="pokerParent">
			<h2>扑克人机战</h2>
			<!-- 弹出框 -->
			<div id="mask">
				<h1 id="endView">GO!</h1>
				<button onclick="start()">开始</button>
			</div>
			<!-- 弹出框end -->
			<!-- 这里为扑克牌出现的地方 -->
			<!-- 得分 -->
			<span class="score" id="score">0</span>
			<!-- 扑克 -->
		</article>
		<!-- 历史战绩 -->
		<span class="history">
			<div id="History" onmouseover="displayList(this)" onmouseout="this.style.position= 'absolute'">
				<!-- <span class="list">
					第<span>1</span>回合:<span>8:13</span>你赢了,<span>用户+1</span>
				</span>  -->
			</div>
		</span>
		<!-- 历史战绩end -->
	
	
		<script src="js/poker.js"></script>
	</body>
	</html>
```


说明：   

<article>标签的伪选择器::before于body配合做出毛玻璃效果。扑克与得分均放在该标签内容里。历史战绩则用定位把它定义左下角，鼠标经过的时候能显示历史更多的记录，离开则显示最近的。其中注释部分为需要输出时候的html格式。如果需要更改毛玻璃背景，则只需要修改css中 `body、article::before` 选择器中：`background: url(../img/lk.jpg)` 即可。如需修改毛玻璃的效果程度只需修改 `article::before` 中 `filter:blur(20px);`里面的像素即可，值越小毛玻璃效果越淡。    


# 二、CSS     
css这里就不做太多解释，主要就是布局的设置.   
```CSS
    /** 清除内外边距 **/
	body, h1, h2, h3, h4, h5, h6, hr, p, blockquote,div, /* structural elements 结构元素 */
	dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
	pre, /* text formatting elements 文本格式元素 */
	form, fieldset, legend, button, input, textarea, /* form elements 表单元素 */
	th, td /* table elements 表格元素 */ {
	    margin: 0;
	    padding: 0;
	}
	p,a,div,span,input,label,h1,h2,h3{
		font:"Microsoft Yahei",Tahoma, Helvetica, Arial, "SimSun", sans-serif;
		color:rgba(255,255,255,0.8);
	}
	html,body{
		font-size: 100%;
		width: 100%;
		height: 100%;
	}
	body{
		background: url(../img/lk.jpg) 0 / cover fixed;
		position: relative;
	}
	.history,.list,div,span,{
		transition: all 0.4s;
	}
	.history:hover,.list:hover,div:hover,span:hover{
		transition: all 0.4s;
	}
	h2{
		color: #fff;
	}
	article {
		position: absolute;
		width: 90%;
		height: 90%;
		margin: 2.5% 5% 0;
		text-align: center;
		background: hsla(0,0%,50%,0.3);
		overflow: hidden;
		box-shadow: 0px 0px 8px rgba(0,0,0,.8);
	}
	article::before {
		content: '';
		position: absolute;
		top: 0;right: 0;left: 0;bottom: 0;
		filter: blur(20px);
		background: url(../img/lk.jpg) 0 / cover fixed;
		z-index: -1;
		margin: -30px;
	}
	h2{
		display: block;
		width: 100%;
		height: 4em;
		line-height: 4em;
		margin: 5px 0 3px 5px;
		background: rgb(0,176,240);
		color: #fff;
		font-size: 1.4em;
		box-shadow: 0px 1px 1px #000;
		z-index: 99;
	}
	#mask {
		width: 100%;
		height: 100%;
		background: rgba(55,62,64,1);
		position: absolute;
		left: 0;
		top: -100%;
		z-index: 99;
		opacity: 0;
		transition: all .8s;
	}
	#mask h1 {
		font-size: 10rem;
		margin-top: 2rem;
		color: rgb(0,179,140);
	}
	#mask button {
		width: 10rem;
		height: 4rem;
		font-size: 2rem;
		border-radius: 20px;
		margin: 10% auto;
		color: rgb(0,179,140);
		background:none;
		border: 3px solid rgb(0,179,140);
		transition:all 0.6s;
		cursor: pointer;
		outline: none;
	}
	#mask button:hover {
		color: rgb(0,176,240);
		border-color: rgb(0,176,240);
		transition: all 0.6s;
	}
	/*历史记录*/
	.history{
		display: block;
		width: 20%;
		height: 20%;
		background: rgb(55,62,64);
		opacity: .3;
		position: absolute;
		left: .5rem;
		bottom: 1rem;
		z-index: 999;
		text-align: center;
		overflow: auto;
		transition: all 0.4s;
		box-shadow: 0 0 3px rgba(0,0,0,.9);
	}
	.history:hover{
		height: 65%;
		opacity: 1;
		transition: all 0.4s;
	}
	.history div {
		overflow: hidden;
		position: absolute;
		bottom: 0;
	}
	.history .list{
		display: inline-block;
		color: rgb(0,179,140);
		font-size: .6rem;
		margin-bottom: 10px;
		text-align: center;
		text-indent: .4rem;
	}
	.history .list span {
		display: inline-block;
		font-size: 1rem;
		margin: 0 .4rem;
		padding: 0 .4rem 0 0;
		background: rgb(0,176,240);
	}
	#score{
		display: inline-block;
		width: 8rem;
		height: 4rem;
		line-height: 4rem;
		font-size: 2rem;
		background:rgb(0,176,240);
		color: rgb(55,62,64);
		z-index: 99;
	}
	/*历史记录end*/
	/*扑克牌*/
	.poker{
		display: inline-block;
		width: 6.575rem;
		height: 8.5rem;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 1px 1px rgba(0,0,0,0.15);
		position: absolute;
		left: 45%;
		top: 40%;
		transition: all 1s;
		cursor: pointer;
	}
	.poker img {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
	.pokerBig {
		width: 6.575rem;
		height: 8.5rem;
	}
	.face {
		width: 100%;
		height: 100%;
		background-image: url(../faces/4_1.svg);
		background-size: 100%;
	}
	.poker:hover{
		transform: translateY(-30px);
		box-shadow: 0 0 3rem rgba(128,0,0,1);
		/*z-index: 999  !important;*/
		transition: all 0.8s;
	}
	.poker .topleft {
		position: absolute;
		left: .4rem;
		top: .2rem;
		color: #000;
	}
	.poker .botton {
		position: absolute;
		bottom: .2rem;
		right: .4rem;
		color: #000;
		transform: rotate(180deg);
	}
	/*扑克牌end*/
	@media all and (min-width: 800px) and (max-width: 1200px){
		.poker {
			width: 3.875rem;
			height: 5.5rem;
			margin-left: -3rem;
			font-size: 40%;
		}
		.poker .topleft {
			left: .2rem;
			top: .1rem;
		}
		.poker .botton {
			bottom: .1rem;
			right: .2rem;
		}
	}
```


这里最后做了一下响应式，针对手机把扑克牌设置更小，否则显示太大了屏幕不能完全显示20张牌。    




# 三、JavaScript    


本次代码过多，只简单讲解一下每个函数的功能，怎么修改以达到自己想要的效果。有部分效果不是很好，代码结构设计的也不是很好，比如每一次重新开始都是重新创建20张扑克牌，想过每次开始的时候只需要把之前的20张牌初始化就行了，但是前期做的时候没有考虑好，导致如果想更改必须修改多个函数，暂时就先不修改了，等以后如果有空了则进行代码重构。    

先上全部代码，然后仔细看每一个函数，欢迎指出错误与不足，请在本博客下方留言板留言。    

```JavaScript
	// 扑克牌值
	var pokerValue = [99,199,3,4,5,6,7,8,9,10,11,12,13];
	// 每一张扑克对应的值存放在pokerArr数组
	var pokerArr = new Array();
	// 每一张扑克花色
	var pokerColor = new Array();
	// 扑克背面
	var back = "faces/4_1.svg";
	// 要输出结果的元素
	var endView = document.getElementById('endView');
	// 得分
	var score = document.getElementById('score');
	// 要插入扑克的父元素
	var pokerParent = document.getElementById('pokerParent');
	// 要插入历史记录的父元素
	var History = document.getElementById('History');
	// 得分
	var scoreValue = 0;
	// 场次
	var count = 0;
	// 创建的牌数量
	var pokerNum = 0;
	// 获取网页窗口大小
	var WIDTH = document.body.offsetWidth;
	var HTIGHT = document.body.offsetHeight;
	// 游戏开始
	function start(){
		var list = pokerParent.querySelectorAll('.poker');
		pokerNum = 0;
		for(var i=0;i<list.length;i++){
			pokerParent.removeChild(list[i]);
		}
		var mask = document.getElementById('mask');
		// 先创建牌
		createPokers(20);
		// 把mask移走
		mask.style.top = "-100%";
		var list = pokerParent.getElementsByClassName('poker');
		// 如果要修改为js进行动画,则需要把 _element()函数中注释部分解除即可
		for(var i =0;i<list.length;i++){
			setTimeout(_element(list[i],i),i*100);
		}
	}
	// 发牌动画,需配合setTimeout调用此函数
	function _element(elem,i,x,y) 
	{ 
		return function() 
		{
			var x = (WIDTH > 1300)?100:60;
			var y = i>=10?150:-50;
			if(x&&y){
				// moveElementTran(ele,x,y,1);
				elem.style.transform = "translate3d("+ x + "px," + y + "px,0px)";
				// elem.style.left = x+"px";
				// elem.style.top = y+"px";
			}
			if(i%10 < 5){
				elem.style.transform = "translate3d("+ ((i%10)*(x*(-1))) + "px,"+ y +"px,0px)";
			}else{
				elem.style.transform = "translate3d("+ (i%5+1)*x + "px,"+ y +"px,0px)";
			}
		} 
	}
	// 创建n张牌
	function createPokers(n){
		for(var i =0; i<n;i++){
			var poker = newCard();
			poker.onclick = function () {
				openCard(this);
			}
			var tran = "translate3d(" + pokerNum * -2 + "px," + "0px,"+ "0px)";
			poker.style.transform = tran;
			// poker.style.left = WIDTH/2- 100 - i*3 + "px";
			// poker.style.top = HTIGHT/2 - 68 + "px";
			poker.style.zIndex = pokerNum;
			pokerParent.appendChild(poker);
		}
	
	}
	//获得一个随机数
	function getRandom(n) {return  Math.ceil(Math.random()*n);}
	// 开牌
	function openCard(elem){
		count++;
		console.log(elem.getAttribute('id'));
		var userValue = displayPoker(elem);
		var computer = getRandom(pokerNum-1);
		var id = elem.getAttribute('id');
		// 利用正则获取到id
		var num = id.replace(/[^0-9]/ig,"");
		while(num==computer){
			computer = getRandom(pokerNum);
			console.log("抽中的牌相同,尝试重抽");
		}
		console.log(num,computer);
		var pokerList = pokerParent.getElementsByClassName('poker');
		console.log("以开牌");
		console.log("以获取到所有扑克牌:" + pokerList.length + "张");
		console.log("剩余牌以全部移走");
		var computerValue = displayPoker(pokerList[computer]);
		// 把其余牌全部移走
		var x = -100;
		for(var i=0;i<pokerList.length;i++){
			var pokerListImg = pokerList[i].getElementsByTagName('img')[0];
			if(pokerListImg.getAttribute('src')==null){
				// var id = pokerList[i].getAttribute('id');
				// setTimeout(_element(id,i+1,1500,1500),i*100);
				pokerList[i].style.transform = "translate3d(2000px,0px,0px)";
			}else{
				pokerList[i].style.transform = "translate3d("+ x + "px,0px,0px)";
				x+=200;
			}
		}
		var view = "";
		if(userValue > computerValue){
			scoreValue++;
			view = "用户+1";
		}else if(userValue < computerValue){
			scoreValue--;
			view = "用户-1";
		}else if(userValue == computerValue){
			view = "平局";
		}
		// 刷新历史记录
		score.innerHTML = scoreValue;
		var spanL = document.createElement('span');
		spanL.setAttribute('class','list');
		var span1 = document.createElement('span');
		var span2 = document.createElement('span');
		var span3 = document.createElement('span');
		var txt =document.createTextNode("第");
		spanL.appendChild(txt);
		span1.innerHTML = count;
		spanL.appendChild(span1);
		var txt = document.createTextNode("回合:");
		spanL.appendChild(txt);
		userValue = transformationPoker(userValue);
		computerValue = transformationPoker(computerValue);
		span2.innerHTML = userValue + ":" + computerValue + ",";
		spanL.appendChild(span2);
		span3.innerHTML = view;
		spanL.appendChild(span3);
		History.appendChild(spanL);
		endView.innerHTML= view=="用户+1"?"你赢了":view=="平局"?view:"你输了";
		setTimeout("restart()",2000);
	}
	// 把1/2/11/12/13转换为A/J/Q/K
	function transformationPoker(value){
		var transformationValue = 0;
		switch(value)
		{
		case 1:
		  transformationValue = 'A';
		  break;
		case 99:
		  transformationValue = 'A';
		  break;
		case 2 || 199:
			transformationValue = 2;
			break;
		case 199:
			transformationValue = 2;
			break;
		case 11:
		  transformationValue = 'J';
		  break;
		case 12:
		  transformationValue = 'Q';
		  break;
		case 13:
		  transformationValue = 'K';
		  break;
		default:
		  transformationValue = value;
		}
		return transformationValue;
	}
	// 显示牌
	function displayPoker(elem) {
		var id = elem.getAttribute('id');
		console.log(id);
		// 利用正则获取到id
		var num = id.replace(/[^0-9]/ig,"");
		var img = elem.getElementsByTagName('img')[0];
		var topleft = elem.getElementsByClassName('topleft')[0];
		var botton = elem.getElementsByClassName('botton')[0];
		var pokerValues = 0;
		pokerValues=transformationPoker(pokerArr[num-1]);
		img.setAttribute('src','faces/'+pokerColor[num-1] + '_' + pokerArr[num-1] +'.svg');
		// 移除开牌事件
		elem.onclick = null;
		img.setAttribute('class','');
		topleft.innerHTML = pokerValues;
		botton.innerHTML = pokerValues;
		var number = pokerArr[num-1]
		switch(number)
		{
		case 1:
		  number = 99;
		  break;
		case 2:
		  number = 199;
		  break;
		default:
		  number = pokerArr[num-1];
		}
		return number;
	}
	//创建一张扑克
	function newCard(){
		pokerNum++;
		var poker = document.createElement('div');
		var img = document.createElement('img');
		img.setAttribute('class','face');
		var topleft = document.createElement('div');
		topleft.setAttribute('class','topleft');
		var botton = document.createElement('div');
		botton.setAttribute('class','botton');
		poker.appendChild(img);
		poker.appendChild(topleft);
		poker.appendChild(botton);
		poker.setAttribute('class','poker');
		poker.setAttribute('id','poker'+pokerNum);
		pokerArr[pokerNum-1] = getRandom(13);
		pokerColor[pokerNum-1] = getRandom(3);
		return poker;
	}
	//预加载函数
	function addLoadEvent(func) {
		var onLoad = window.onload;
		if(typeof window.onload != 'function'){
			window.onload = func;
		}else{
			window.onload = function(){
				onLoad();
				func();
			}
		}
	}
	//修改元素的translate3d()实现移动.
	//注意：只有使用了dom脚本或style属性为元素分配了transform才能获取到translate3d值,否则获取不到
	function moveElementTran(elementID,tran_x,tran_y,time_val){
		if(!document.getElementById) return false;
		if(!document.getElementById(elementID)) return false;
		var elem = document.getElementById(elementID);
		var transForm = elem.style.transform || '';
		//正则.match()方法返回一个数组
		//说明：(x)匹配的值保存在数组
		var xpos = transForm.match(/translate3d\(\s*(\d+)+px,\s*(\d+)px,\s*(\d+)px\)/i);
		var ypos = transForm.match(/translate3d\(\s*(\d+)+px,\s*(\d+)px,\s*(\d+)px\)/i);
		if(xpos == null && ypos == null)
		{
			return false;
		}else{
			xpos = xpos[1];
			ypos = ypos[2];
		}
		if(xpos == tran_x && ypos == tran_y)
			return true;
		if(xpos < tran_x)
			xpos++;
		if(xpos > tran_x)
			xpos--;
		if(ypos < tran_y)
			ypos++;
		if(ypos > tran_y)
			ypos--;
		var tran3d = "translate3d(" + xpos + "px,"+ ypos + "px," + "0" + ")";
		elem.style.transform = tran3d ;
		var repeat = "moveElementTran('"+elementID+"',"+tran_x+","+tran_y+","+time_val+")";
		movement = setTimeout(repeat,time_val);
	}
	//显示历史记录列表
	function displayList(elem) {
		var list  = elem.getElementsByClassName('list');
		if(list.length > 8)
			elem.style.position = "relative";
	}
	function restart(){
		var mask = document.getElementById('mask');
		mask.style.top = 0;
		mask.style.opacity = 1;
	}
	// 判断设备横屏还是竖屏
	// 如果是横屏则返回true
	function checkOrient(){
		if(window.orientation == 0 || window.orientation == 180){
			var screenOrientation = false;
		}else if(window.orientation == 90 || window.orientation == -90){
			var screenOrientation = true;
		}
		return screenOrientation;
	}
	// 对设备旋转事件做出响应
	function setOrientation(){
		var html = document.getElementsByTagName('html')[0];
		var orientation = checkOrient();
		console.log(WIDTH);
		if(!orientation && WIDTH <= 980){
			alert("请切换至横屏状态下效果更好.");
		}
	}
	// 添加事件监听
	addEventListener('load', function(){
	
	    setOrientation();
	
	    window.onorientationchange = setOrientation;
	
	});
	addLoadEvent(restart);

```

首先我们读一个程序就得找到入口，在C语言中main()函数则是一个程序的入口，而js中，可以有很多入口，比如来自html的各种事件，以及`window.onload`事件。首先我们应该看看js在网页加载之后有没有执行的函数，然后再看html中有没有事件触发。   



在此我们先看js：

`addLoadEvent(restart); ` 这一句就是js的开始，顺着这个函数我们可以找到整个程序的流程。首先看看`addLoadEvent()`函数。


`addLoadEvent()` 函数：
```JavaScript
	//预加载函数
	function addLoadEvent(func) {
		var onLoad = window.onload;
		if(typeof window.onload != 'function'){
			window.onload = func;
		}else{
			window.onload = function(){
				onLoad();
				func();
			}
		}
	}
```

我们发现这个函数只是一个预加载函数，就是在网页加载完毕之后执行一个函数，`addLoadEvent(restart); ` 括号里面的则为要执行的函数。我们再去找到 `restart()` 函数：   

` restart()` 函数：
```JavaScript
	function restart(){
		var mask = document.getElementById('mask');
		mask.style.top = 0;
		mask.style.opacity = 1;
	}
```

这个函数找到了html中id为mask的元素，也就是我们的弹出框，把它的top样式属性设置为0（在这之前我用css控制了top:-100%）这样窗口就出现了，但是我们发现好像这个函数里面并没有调用其余函数了，那么程序就到这了吗？不，这时候我们的注意力应该转移到这个id为mask的元素，看看html中是否有事件触发了js。`<button onclick="start()">开始</button> ` 很明显，这个按钮通过单击事件触发了一个名为`start()` 的函数，我们再看看start()函数里写了什么：    

`start()` 函数：
```JavaScript
	// 游戏开始
	function start(){
		var list = pokerParent.querySelectorAll('.poker');
		pokerNum = 0;
		for(var i=0;i<list.length;i++){
			pokerParent.removeChild(list[i]);
		}
		var mask = document.getElementById('mask');
		// 先创建牌
		createPokers(20);
		// 把mask移走
		mask.style.top = "-100%";
		var list = pokerParent.getElementsByClassName('poker');
		// 如果要修改为js进行动画,则需要把 _element()函数中注释部分解除即可
		for(var i =0;i<list.length;i++){
			setTimeout(_element(list[i],i),i*100);
		}
	}
```

可以看出，这个程序首先检查有没有扑克牌，如果有则删除所有扑克，并重新调用`createPokers(20);` 函数创建了20张扑克牌。创建完之后把mask移走，并重新获取所有扑克牌，并把他们移动到指定位置。这时候我们需要看的就有两个函数了，我们先看看 `createPokers(20);` 创建牌的函数，然后再回头看看`setTimeout(_element(list[i],i),i*100)` :   

`createPokers(n)` 函数：
```JavaScript
	// 创建n张牌
	function createPokers(n){
		for(var i =0; i<n;i++){
			var poker = newCard();
			poker.onclick = function () {
				openCard(this);
			}
			var tran = "translate3d(" + pokerNum * -2 + "px," + "0px,"+ "0px)";
			poker.style.transform = tran;
			// poker.style.left = WIDTH/2- 100 - i*3 + "px";
			// poker.style.top = HTIGHT/2 - 68 + "px";
			poker.style.zIndex = pokerNum;
			pokerParent.appendChild(poker);
		}
	}
```
这个函数调用了`newCard()`函数动态创建了20张扑克牌，并为每一张扑克牌添加了一个`onclick`事件触发`openCard()`函数，并插入到html中。现在再往下看看   

`newCard()` 函数：
```JavaScript
	//创建一张扑克
	function newCard(){
		pokerNum++;
		var poker = document.createElement('div');
		var img = document.createElement('img');
		img.setAttribute('class','face');
		var topleft = document.createElement('div');
		topleft.setAttribute('class','topleft');
		var botton = document.createElement('div');
		botton.setAttribute('class','botton');
		poker.appendChild(img);
		poker.appendChild(topleft);
		poker.appendChild(botton);
		poker.setAttribute('class','poker');
		poker.setAttribute('id','poker'+pokerNum);
		pokerArr[pokerNum-1] = getRandom(13);
		pokerColor[pokerNum-1] = getRandom(3);
		return poker;
	}
```

`newCard()` 函数每创建一张扑克牌则计一下数，js的动态创建元素这里不做详细解释。现在返回之前的`start()` 函数，看看`setTimeout(_element(list[i],i),i*100)` ，首先我们看看**[setTimeout()](http://www.w3school.com.cn/jsref/met_win_settimeout.asp)** ，我们发现第一个参数传递的为字符串，但是如果用字符串的话就无法为函数传递参数了，所以我们使用了另一个方法，调用`_element()`函数然后通过return 返回即可解决，这里参照 **[给定时器settimeout、setInterval调用传递参数](http://www.cnblogs.com/chinahnzl/articles/612147.html)** 给出的方法：   

`_element()` 函数:
```JavaScript
	// 发牌动画,需配合setTimeout调用此函数
	function _element(elem,i,x,y) 
	{ 
		return function() 
		{
			var x = (WIDTH > 1300)?100:60;
			var y = i>=10?150:-50;
			if(x&&y){
				// moveElementTran(ele,x,y,1);
				elem.style.transform = "translate3d("+ x + "px," + y + "px,0px)";
				// elem.style.left = x+"px";
				// elem.style.top = y+"px";
			}
			if(i%10 < 5){
				elem.style.transform = "translate3d("+ ((i%10)*(x*(-1))) + "px,"+ y +"px,0px)";
			}else{
				elem.style.transform = "translate3d("+ (i%5+1)*x + "px,"+ y +"px,0px)";
			}
		} 
	}
```
这里将一个函数返回即可做到延时，发牌动画效果其实就是利用css3的`transform:translate3d(x,y,z)` 属性配合 `transition` 来做的，js只需要控制 元素移动，动画的实现则交给css3的 transition 来实现（考虑到流畅度这里使用` transform` 属性），第一版的时候是直接调用 `moveElementTran()` 函数的，但是发现有明显的卡顿现象，之后百度查看资料后发现修改 `transform` 和 `transition` 属性是最好的方法。请参考 **[优化js脚本设计，防止浏览器假死](http://www.nowamagic.net/librarys/veda/detail/787)**    

到此时，我们的html中就出现了20张牌，并且按照我们的要求排列好了。接下来则是点击其中一张牌触发onclick事件，调用 `openCard()`    

`openCard()` 函数：
```JavaScript
	// 开牌
	function openCard(elem){
		count++;
		console.log(elem.getAttribute('id'));
		var userValue = displayPoker(elem);
		var computer = getRandom(pokerNum-1);
		var id = elem.getAttribute('id');
		// 利用正则获取到id
		var num = id.replace(/[^0-9]/ig,"");
		while(num==computer){
			computer = getRandom(pokerNum);
			console.log("抽中的牌相同,尝试重抽");
		}
		console.log(num,computer);
		var pokerList = pokerParent.getElementsByClassName('poker');
		console.log("以开牌");
		console.log("以获取到所有扑克牌:" + pokerList.length + "张");
		console.log("剩余牌以全部移走");
		var computerValue = displayPoker(pokerList[computer]);
		// 把其余牌全部移走
		var x = -100;
		for(var i=0;i<pokerList.length;i++){
			var pokerListImg = pokerList[i].getElementsByTagName('img')[0];
			if(pokerListImg.getAttribute('src')==null){
				// var id = pokerList[i].getAttribute('id');
				// setTimeout(_element(id,i+1,1500,1500),i*100);
				pokerList[i].style.transform = "translate3d(2000px,0px,0px)";
			}else{
				pokerList[i].style.transform = "translate3d("+ x + "px,0px,0px)";
				x+=200;
			}
		}
		var view = "";
		if(userValue > computerValue){
			scoreValue++;
			view = "用户+1";
		}else if(userValue < computerValue){
			scoreValue--;
			view = "用户-1";
		}else if(userValue == computerValue){
			view = "平局";
		}
		// 刷新历史记录
		score.innerHTML = scoreValue;
		var spanL = document.createElement('span');
		spanL.setAttribute('class','list');
		var span1 = document.createElement('span');
		var span2 = document.createElement('span');
		var span3 = document.createElement('span');
		var txt =document.createTextNode("第");
		spanL.appendChild(txt);
		span1.innerHTML = count;
		spanL.appendChild(span1);
		var txt = document.createTextNode("回合:");
		spanL.appendChild(txt);
		userValue = transformationPoker(userValue);
		computerValue = transformationPoker(computerValue);
		span2.innerHTML = userValue + ":" + computerValue + ",";
		spanL.appendChild(span2);
		span3.innerHTML = view;
		spanL.appendChild(span3);
		History.appendChild(spanL);
		endView.innerHTML= view=="用户+1"?"你赢了":view=="平局"?view:"你输了";
		setTimeout("restart()",2000);
	}
```

这个函数首先调用了 `displayPoker(elem)`翻起牌，然后把其余的扑克全部移走。 接下来则是插入一条历史记录。我们再看看   

 `displayPoker(elem)` 函数：
 
```JavaScript
	// 显示牌
	function displayPoker(elem) {
		var id = elem.getAttribute('id');
		console.log(id);
		// 利用正则获取到id
		var num = id.replace(/[^0-9]/ig,"");
		var img = elem.getElementsByTagName('img')[0];
		var topleft = elem.getElementsByClassName('topleft')[0];
		var botton = elem.getElementsByClassName('botton')[0];
		var pokerValues = 0;
		pokerValues=transformationPoker(pokerArr[num-1]);
		img.setAttribute('src','faces/'+pokerColor[num-1] + '_' + pokerArr[num-1] +'.svg');
		// 移除开牌事件
		elem.onclick = null;
		img.setAttribute('class','');
		topleft.innerHTML = pokerValues;
		botton.innerHTML = pokerValues;
		var number = pokerArr[num-1]
		switch(number)
		{
		case 1:
		  number = 99;
		  break;
		case 2:
		  number = 199;
		  break;
		default:
		  number = pokerArr[num-1];
		}
		return number;
	}
```

可以看到这里首先利用正则提取出id值，然后根据id来与pokerArr、pokerColor数组进行核对。然后返回poker的值给调用它的地方。这里用到了一个简单的转换：`transformationPoker(pokerArr[num-1]);` ：

```JavaScript
	// 把1/2/11/12/13转换为A/J/Q/K
	function transformationPoker(value){
		var transformationValue = 0;
		switch(value)
		{
		case 1:
		  transformationValue = 'A';
		  break;
		case 99:
		  transformationValue = 'A';
		  break;
		case 2 || 199:
			transformationValue = 2;
			break;
		case 199:
			transformationValue = 2;
			break;
		case 11:
		  transformationValue = 'J';
		  break;
		case 12:
		  transformationValue = 'Q';
		  break;
		case 13:
		  transformationValue = 'K';
		  break;
		default:
		  transformationValue = value;
		}
		return transformationValue;
	}
```

把一个数值转换为扑克牌值的形式返回。最后 `openCard()` 函数又一次调用了 `setTimeout("restart()",2000);` 意思为重新开始，**一切又回到了开始。** 其中有很多小细节没有详细说明，可自行上网查阅。

# 总结

其实这个东西并没有什么价值，但对于学习和研究js来说，这个东西的价值带来的“收益”非常大。其中理解了`setTimeout()`如何传递参数、修改元素的`top`属性要比修改`transform`、`transition`属性制作的动画效耗的资源更大也更卡顿。 

**写给想要修改此程序的人：   **

1. 如果你想要修改发牌动画，只需要找到 `_element(elem,i,x,y) `函数修改其中实现动画的效果即可。
2. 如果你想给开牌效果添加一些动画，则找到 ` openCard()` 函数和 `displayPoker()` 修改即可。
3. 如果想要创建更多/更少的牌，则找到 `start()` 函数中 `createPokers(20);` 修改其中数值，并修改 `_element() ` 函数中牌的排列即可。   

  

**经历过无数次练习和代码量，你才能成长为经验老道的大牛。在以学习为目标的时候，永远不要当“脚本小子”**