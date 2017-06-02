---
title: 初学JavaScript动画
date: 2017-05-31 15:47:34
tags: ["JS","CSS3"]
comments: true
---
以前学js的时候由于没有编程基础，导致学到动画那一块就停止了。现在回过头去重新学习了关于JavaScript制作动画效果以及使用纯CSS来打造动画效果。懂了这些最基本的原理后，就可以根据这个写出更复杂、更炫酷的动画。

<!-- more -->

# 1、纯CSS实现动画     
在用JavaScript做动画效果前，我们先学习一下用CSS3来实现动画效果，在某些场景下，用CSS3就可以满足。   

话不多说，先上 **[DEMO](/Subpage/pokerGame/css_animation.html)**   **请使用chrome等现代浏览器**   

下面是gif效果图   
![纯CSS实现动画](/img/JavaScript/css_animation.gif)   

**这里的效果实际上完全依赖CSS3的：@keyframes 规则**   

> **定义和用法**
通过 @keyframes 规则，您能够创建动画。
创建动画的原理是，将一套 CSS 样式逐渐变化为另一套样式。
在动画过程中，您能够多次改变这套 CSS 样式。
以百分比来规定改变发生的时间，或者通过关键词 "from" 和 "to"，等价于 0% 和 100%。
0% 是动画的开始时间，100% 动画的结束时间。
为了获得最佳的浏览器支持，您应该始终定义 0% 和 100% 选择器。
注释：**请使用动画属性来控制动画的外观，同时将动画与选择器绑定。**   

**语法**:

```CSS
	@keyframes animationname {keyframes-selector {css-styles;}}
```

![纯CSS实现动画](/img/JavaScript/@keyframes.png)   

有了 @keyframes 规则后需要在选择器中绑定 @keyframes 规则   

```CSS
	-webkit-animation-name:myfirst;   //这里的myfirst就是规则名
```

接下来就开始制作动画效果：   

首先我们需要在网页中插入一个元素，这个元素就是我们要展示动画的元素。这里我使用了一个100px的正方形，背景为红色以便于展示。   

```CSS
html,body{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.move {
	width: 100px;
	height: 100px;
	background: red;
}
//以下为body中内存
<div class="move"></div>   //html中插入
```

有了这个div之后我们就可以编写@keyframes规则了:     

```CSS
@keyframes myfirst {
	0% {
		transform: translate3d(1500px,0,0);
	}
	40% {
		transform: translate3d(25px,0,0);
	}
	52% {
		transform: translate3d(50px,0,0);
	}
	65% {
		transform: translate3d(25px,0,0);
	}
	70% {
		transform: translate3d(25px,0,0);
	}
	100% {
		transform: translate3d(1500px,0,0);
	}
}
```

说明：   
1\. myfirst 为你的规则名，用于选择器绑定
2\. 0%~100%为动画时间，from（与 0% 相同）to（与 100% 相同）
3\. 在每一个动画的过程中可以改变css样式   

这里还用到了CSS3的transform的 **[translate3d](http://www.w3school.com.cn/cssref/pr_transform.asp)** 属性  **而不是直接修改left值。**   

这里我们从最开始的时候先移动到右侧外边，然后在40%的时候移动回来，52%的时候实现一个回弹的动画之后再65%的时候回去，这样就实现了回弹效果，之后就停顿一会再回最右边。     

*这里放一张慢图来仔细观察。   *

![纯CSS实现动画](/img/JavaScript/css_animation_1.gif) 

编写好了@keyframes 规则之后就需要在选择器里绑定：   

```CSS
.move {
	width: 100px;
	height: 100px;
	background: red;
	-webkit-animation-name:myfirst;   /*要绑定的规则名 */
	-webkit-animation-duration:2s;    /*动画完成一个周期的时间*/
	-webkit-animation-timing-function:ease-out;  /*动画规定的速度曲线*/
	-webkit-animation-delay:0s;      /* 动画何时开始*/
	-webkit-animation-iteration-count:5;  /*动画被播放次数*/
	-webkit-animation-direction:normal;  /*规定动画是否在下一周期逆向地播放。默认是 "normal"。*/
	-webkit-animation-fill-mode:backwards; /*规定对象动画时间之外的状态。*/
}
```

设置好了之后就可以看到效果了，如果想更详细的了解animation属性请点击[CSS3 animation 属性](http://www.w3school.com.cn/cssref/pr_animation.asp)    

#### 总结   
就是利用 @keyframes 规则来编写动画过程中的变化，在选择器中使用animation属性来设置 @keyframes 的方式   

# 2、JavaScript 制作动画   

想要制作更为复杂，更实用的动画还需用到JavaScript来加强交互。   

这里先上 **[DEMO](/Subpage/pokerGame/js_animation1.html)** 

## 1）HTML   

首先在网页中插入一个要移动的标记，这里使用id来定位。   
```HTML
    <div id="move"></div>
```
之后我们只需要操作这个id为move的div元素了。   

## 2）CSS（层叠样式表）   
稍微对元素进行适当的修饰。为了方便看到我们要给元素加一个背景。   

```CSS
#move {
	width: 50px;
	height: 50px;
	background: red;
	position: absolute;
	transform:translate3d(0px,0px,0px);
}
```

**注意这里我们设置了 position和transform属性**，因为稍后我们的JS就是基于这两个属性的基础之上。   

## 3）JavaScript

首先我们需要在网页加载之后把move移动到一个位置。这里我们需要修改move的left和top属性才能让他到指定的位置,但left和top属性依赖于position属性,所以之前我们在css的时候就应该设置好。   

```JS
function moveElement(elementID,final_x,final_y,time_val){
```

首先这个函数有四个参数,第一个参数为要移动的元素id,第二个参数为要移动的x轴,第三个参数为要移动的y轴,第四个参数为速度。   

```JS
//对象检测
if(!document.getElementById) return false;
if(!document.getElementById(elementID)) return false;
```

接下来检测浏览器是否有该方法和对象   

```JS
var elem = document.getElementById(elementID);
var dist = 0;
```

变量elem得到了move元素,dist是用来计算速度的变量。   

接下来需要得到move元素的left和top值进行与目标地计算。**注意：只有使用了dom脚本或style属性为元素分配了位置后才能获取到left和top值,否则获取不到** 所以在后面的时候我们可以使用js来初始化。   

```JS
var xpos = parseInt(elem.style.left);
var ypos = parseInt(elem.style.top);
```

这里使用了parseInt();   

>parseInt() 函数可解析一个字符串，并返回一个整数。   

这里把获得的left和top属性转换成数字: "16px" -> 16   

```JS
//安全检查
if(!elem.style.left){
	elem.style.left = "0px";
}
if(!elem.style.top){
	elem.style.top = "0px";
}
```

得到了left和top之后还需要判断一下是否有值，如果没有的话就给初始化0给它。   

```JS
if(xpos == final_x && ypos == final_y)
	return true;
if(xpos < final_x){
	//方法Math.ceil()
	//ceil() 方法可对一个数进行上舍入。
	dist = Math.ceil((final_x - xpos)/speed);
	xpos += dist;
}
if(xpos > final_x){
	dist = Math.ceil((xpos - final_x)/speed);
	xpos -= dist;
}
if(ypos < final_y){
	dist = Math.ceil((final_y - ypos)/speed);
	ypos += dist;
}
if(ypos > final_y){
	dist = Math.ceil((ypos - final_y)/speed);
	ypos -= dist;
}
```

之后则是进行判断,判断元素move在目的地的哪边，如果在左边则xpos增加，否则xpos减少,y轴也是一样。   

![move移动示意图](/img/JavaScript/move.PNG)    

为了实现距离目的地越远速度越快,越近的时候变慢,而且不是一直以一个速度靠近,所以我们需要让xpos每次增加的距离不一样。这里用 **(目的地-move)/速度)**来计算每一次增加的距离。 **假设初始为：(500-10)\10;** 那么每次就增加49个像素,**直到(500-491)\10的时候由Math.ceil()进行上舍入** 到达491之后则每次移动1个像素。   

最后需要把xpos和ypos的值给move变成为left值和top值。   


```JS
elem.style.left = xpos + 'px';
elem.style.top = ypos + 'px';
```


有了这些之后还需要进行函数回调,但是回调不是立马,需要一个时间间隔,这时候就需要我们的主角登场了：**[setTimeout(functionName,millisec)](http://www.w3school.com.cn/jsref/met_win_settimeout.asp)**   

```JS
var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+speed+")";
```

我们先把传递的字符串拼接起来给一个变量,这样有利于阅读和修改。   

```JS
var timeOut = setTimeout(repeat,10);
```

最后进行回调,并把setTimeout返回值给timeOut以方便我们取消。    

## 收尾   

最后我们可以在HTML中触发这个函数：


```HTML
<button onclick="moveElement('move',500,500,10);">移动至500</button>
<button onclick="moveElement('move',1000,1000,10);">移动至1000</button>
```

但是你会发现如果你快速点击两个按钮的话,move就会出错,因为在还没有结束上一个移动之前就点击了移动到下一个位置,**会导致元素像拔河一样拉来拉去** 所以我们在下一个移动之前应该先判断上一个移动是否完成,** 如果没有完成则使用clearTimeout()清除setTimeout();** JavaScript允许我们为对象添加属性,所以我们可以直接给elem添加一个属性保存setTimeout()：elem.movement = setTimeout(repeat,10);再前面开始的时候判断是否有,有的话则清除上一个。   

最后function moveElement()函数内容修改为:   

```JS
//修改元素的left和top属性进行移动
//注意：只有使用了dom脚本或style属性为元素分配了位置后才能获取到left和top值,否则获取不到
function moveElement(elementID,final_x,final_y,speed){
	//对象检测
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	var dist = 0;
	//清除上一个未完成的移动
	if(elem.movement)
		clearTimeout(elem.movement);
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	//安全检查
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.top){
		elem.style.top = "0px";
	}
	if(xpos == final_x && ypos == final_y)
		return true;
	if(xpos < final_x){
		//方法Math.ceil()
		//ceil() 方法可对一个数进行上舍入。
		dist = Math.ceil((final_x - xpos)/speed);
		xpos += dist;
	}
	if(xpos > final_x){
		dist = Math.ceil((xpos - final_x)/speed);
		xpos -= dist;
	}
	if(ypos < final_y){
		dist = Math.ceil((final_y - ypos)/speed);
		ypos += dist;
	}
	if(ypos > final_y){
		dist = Math.ceil((ypos - final_y)/speed);
		ypos -= dist;
	}
	elem.style.left = xpos + 'px';
	elem.style.top = ypos + 'px';
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+speed+")";
	//JavaScript允许我们为元素创建属性，这里创建了一个属性movement
	elem.movement=setTimeout(repeat,10);
}
```


接下来只需要调用这个函数就可以了。   

后面修改transform值也是同样的方法，但是需要使用正则来匹配到translate3d属性,否则无法获取到transform:translate3d();属性   

```JS
//修改元素的translate3d()实现移动.
//注意：只有使用了dom脚本或style属性为元素分配了transform才能获取到translate3d值,否则获取不到
function moveElementTran(elementID,tran_x,tran_y,speed){
	//对象检测
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	var dist = 0;
	var transForm = elem.style.transform || '';
	//正则.match()方法返回一个数组
	//说明：(\d)匹配的值保存在数组
	var xpos = transForm.match(/translate3d\(\s*(\d+)+px,\s*(\d+)px,\s*(\d+)px\)/i);
	var ypos = transForm.match(/translate3d\(\s*(\d+)+px,\s*(\d+)px,\s*(\d+)px\)/i);
	if(elem.movement)
		clearTimeout(elem.movement);
	if(xpos == null && ypos == null)
	{
		xpos=ypos=0;
	}else{
		xpos = xpos[1] -0;
		ypos = ypos[2] -0;
	}
	if(xpos == tran_x && ypos == tran_y)
		return true;
	if(xpos < tran_x){
		//方法Math.ceil()
		//ceil() 方法可对一个数进行上舍入。
		dist = Math.ceil((tran_x - xpos)/speed);
		xpos += dist;
	}
	if(xpos > tran_x){
		dist = Math.ceil((xpos - tran_x)/speed);
		xpos -= dist;
	}
	if(ypos < tran_y){
		dist = Math.ceil((tran_y - ypos)/speed);
		ypos += dist;
	}
	if(ypos > tran_y){
		dist = Math.ceil((ypos - tran_y)/speed);
		ypos -= dist;
	}
	var tran3d = "translate3d(" + xpos + "px,"+ ypos + "px," + "0" + ")";
	elem.style.transform = tran3d ;
	var repeat = "moveElementTran('"+elementID+"',"+tran_x+","+tran_y+","+speed+")";
	var view = document.getElementById('view2');
	view.innerHTML = tran3d;
	//JavaScript允许我们为元素创建属性，这里创建了一个属性movement
	elem.movement=setTimeout(repeat,10);
}
```


最后自己写一些驱动函数来驱动它,这里就不做说明了。直接上最后的代码:   



```HTML
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>JavaScript动画</title>
		<style>
			#move {
				width: 50px;
				height: 50px;
				background: red;
				position: absolute;
				transform:translate3d(0px,0px,0px);
			}
			span {
				margin-right: 30px;
			}
			.input {
				position: fixed;
				top: 0;
				left: 20%;
			}
		</style>
	</head>
	<body>
		<div id="move"></div>
		
		<div class="input">
			<p>效果1:修改元素left、top属性。&nbsp;&nbsp;&nbsp;&nbsp;效果2:修改元素transform：translate3d(x,y)</p>
			left:
			<input type="range" max="1000" min="200" step="5" value="300" oninput="change(this)" onchange="change(this)" id="input1" /><span>300</span>
			top:
			<input type="range" max="1000" min="200" step="5" value="300" oninput="change(this)" onchange="change(this)" id="input2" /><span>300</span>
			time:
			<input type="range" max="100" min="5" step="2" value="10" oninput="change(this)" onchange="change(this)" id="input3" /><span>10</span>
			<button onclick="run()">效果1</button>
			<button onclick="runTran()">效果2</button>
			<br />
			<p id="view1"></p>
			<p id="view2"></p>
		</div>




		<script>
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
			//修改元素的left和top属性进行移动
			//注意：只有使用了dom脚本或style属性为元素分配了位置后才能获取到left和top值,否则获取不到
			function moveElement(elementID,final_x,final_y,speed){
				//对象检测
				if(!document.getElementById) return false;
				if(!document.getElementById(elementID)) return false;
				var elem = document.getElementById(elementID);
				var dist = 0;
				if(elem.movement)
					clearTimeout(elem.movement);
				var xpos = parseInt(elem.style.left);
				var ypos = parseInt(elem.style.top);
				//安全检查
				if(!elem.style.left){
					elem.style.left = "0px";
				}
				if(!elem.style.top){
					elem.style.top = "0px";
				}
				if(xpos == final_x && ypos == final_y)
					return true;
				if(xpos < final_x){
					//方法Math.ceil()
					//ceil() 方法可对一个数进行上舍入。
					dist = Math.ceil((final_x - xpos)/speed);
					xpos += dist;
				}
				if(xpos > final_x){
					dist = Math.ceil((xpos - final_x)/speed);
					xpos -= dist;
				}
				if(ypos < final_y){
					dist = Math.ceil((final_y - ypos)/speed);
					ypos += dist;
				}
				if(ypos > final_y){
					dist = Math.ceil((ypos - final_y)/speed);
					ypos -= dist;
				}
				elem.style.left = xpos + 'px';
				elem.style.top = ypos + 'px';
				var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+speed+")";
				var view = document.getElementById('view1');
				view.innerHTML = "left:" + xpos+ "px  top:" + ypos + "px";
				//JavaScript允许我们为元素创建属性，这里创建了一个属性movement
				elem.movement=setTimeout(repeat,10);
			}
			//修改元素的translate3d()实现移动.
			//注意：只有使用了dom脚本或style属性为元素分配了transform才能获取到translate3d值,否则获取不到
			function moveElementTran(elementID,tran_x,tran_y,speed){
				//对象检测
				if(!document.getElementById) return false;
				if(!document.getElementById(elementID)) return false;
				var elem = document.getElementById(elementID);
				var dist = 0;
				var transForm = elem.style.transform || '';
				//正则.match()方法返回一个数组
				//说明：(x)匹配的值保存在数组
				var xpos = transForm.match(/translate3d\(\s*(\d+)+px,\s*(\d+)px,\s*(\d+)px\)/i);
				var ypos = transForm.match(/translate3d\(\s*(\d+)+px,\s*(\d+)px,\s*(\d+)px\)/i);
				if(elem.movement)
					clearTimeout(elem.movement);
				if(xpos == null && ypos == null)
				{
					xpos=ypos=0;
				}else{
					xpos = xpos[1] -0;
					ypos = ypos[2] -0;
				}
				if(xpos == tran_x && ypos == tran_y)
					return true;
				if(xpos < tran_x){
					//方法Math.ceil()
					//ceil() 方法可对一个数进行上舍入。
					dist = Math.ceil((tran_x - xpos)/speed);
					xpos += dist;
				}
				if(xpos > tran_x){
					dist = Math.ceil((xpos - tran_x)/speed);
					xpos -= dist;
				}
				if(ypos < tran_y){
					dist = Math.ceil((tran_y - ypos)/speed);
					ypos += dist;
				}
				if(ypos > tran_y){
					dist = Math.ceil((ypos - tran_y)/speed);
					ypos -= dist;
				}
				var tran3d = "translate3d(" + xpos + "px,"+ ypos + "px," + "0" + ")";
				elem.style.transform = tran3d ;
				var repeat = "moveElementTran('"+elementID+"',"+tran_x+","+tran_y+","+speed+")";
				var view = document.getElementById('view2');
				view.innerHTML = tran3d;
				//JavaScript允许我们为元素创建属性，这里创建了一个属性movement
				elem.movement=setTimeout(repeat,10);
			}
			function positionMessage(x,y,time){
				if(!document.getElementById) return false;
				if(!document.getElementById('move')) return false;
				moveElement("move",x,y,time);
			}
			function positionMessageTran(x,y,time){
				if(!document.getElementById) return false;
				if(!document.getElementById('move')) return false;
				moveElementTran("move",x,y,time);
			}
			function change(elem){
				var nextSibling = elem.nextSibling;
				nextSibling.innerHTML = elem.value;
	  		}
	  		function run() {
	  			var x = document.getElementById('input1').value;
	  			var y = document.getElementById('input2').value;
	  			var time = document.getElementById('input3').value;
	  			positionMessage(x,y,time);
	  		}
	  		function runTran() {
	  			var x = document.getElementById('input1').value;
	  			var y = document.getElementById('input2').value;
	  			var time = document.getElementById('input3').value;
	  			positionMessageTran(x,y,time);
	  		}
		</script>
	</body>
	</html>
```

**最后就到此了,如发现文中有问题可以在文章下方留言.谢谢** 