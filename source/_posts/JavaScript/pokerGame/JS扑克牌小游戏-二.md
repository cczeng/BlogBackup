---
title: JS扑克牌小游戏(二)
date: 2017-05-16 20:29:22
tags: ["JS"]
comments: true
---
我觉得在我写这篇博客之前，我应该先写一下怎么用[github](http://baike.baidu.com/link?url=yPC4RXAbpYGue0ZUdPibEJksWbGjl7ucA5k9RO1fJDj6BGZsk5QO8qDOT46klr0vYPyX-RirlOdHUK75-ixO3a)作为**版本控制**。   

*注：由于本人接触github时间也不长，可能写的不是很好，如有错误，请指正*

**场景1（多人协作）** 当一个项目需要多个人分工合作开发，小A负责开发模块1，小B负责开发模块2，小C负责开发模块3。小A提前于小B小C开发好了模块1，这时候小B、小C就需要更新小A写的模块1，那么刚开始你会觉得拿个U盘复制一下不就好了嘛。那等小B开发好了模块2的时候，小C开发好了模块3的时候；小A发现现有模块1有bug的时候，小C想给模块3增加功能的时候...在这种情况下，你还会选择拿个U盘复制来复制去吗？   
<!-- more -->    

**场景2（版本控制）：** 当小A、小B、小C 终于合作开发出了一个demo后，要对这个demo进行完善，三个人分别进行了修改，修改后测试发现小A的模块1出现了bug，但是这个时候小A抓破头皮也找不到bug到底错在哪，不过他想到了一个万能的点子，**回滚**到之前的版本，但是修改太多了，已经忘记以前的版本长啥样了，他又没有备份前一个版本，这时候怎么办呢？   

  

这时候就衍生出了各种[版本控制](http://baike.baidu.com/item/%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)工具及软件。**[git](http://baike.baidu.com/link?url=wLivolCopVaOUaDj3OtEQjx4BNaWmPy25Jro5lWuWjzGkjvgookHBRstCO-yhlPp68YVwunznh-ka_KBxtQHsK)** 就是其中之一。

**如果已有相应经验或不需要的请自行跳过第一点 1、Github**
# 1、Github  

### Github是什么？
> GitHub 是一个面向开源及私有软件项目的托管平台，因为只支持 Git 作为唯一的版本库格式进行托管，故名 GitHub。   

想要了解轻戳这里 **[Github是什么？看完你就了解一些了](http://www.cnblogs.com/jiqing9006/p/5584848.html)**   

### 怎样使用Github?   

轻戳这里~ [怎样使用GitHub? —知乎](https://www.zhihu.com/question/20070065)  

### 需求   

场景1的需求已经很明确，解决办法： 利用github的分支。  

场景2需求解决办法：  我这里就直接上图吧。   
![Github](/img/pokerGame/github.png)    

# 2、回归正题    

这次我们要实现 **电脑抽一张牌，用户抽一张牌，比较谁的牌面值更大**。有了需求才好下一步。   

这里先上效果图：   
![演示图](/img/pokerGame/yanshi2.gif)

#### 细节设计：
1. 抽的牌直接显示牌面值
2. 移除翻牌效果
3.  把牌面值于标签独立开
4.  加入统计功能 

### 1、修改网页显示效果   
根据需求，我们需要在网页上分别显示电脑、用户抽中的牌。这里我没有进行对网页效果美化。
![网页效果](/img/pokerGame/effect2_view.png)


代码实现如下:   
**css:**     

```HTML
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
		.center {
			width: 70%;
			margin: 5px 15%;
		}
		.left{
			width: 20%;
			float: left;
			margin:10px 15%;
		}
		.right{
			width: 20%;
			float: left;
		}
		.imgHover {
			cursor: pointer;

		}
		p span {
			font-weight: bold;
		}
	</style>
```
**html:**    

```HTML
	<button onclick="licensing(this)" class="center" id="hair">发牌</button>
	<p class="center">共<span id="totalView">0</span>把,赢了<span id="userWinView">0</span>把,输了<span id="userTransportView">0</span>把,平局<span id="flatView">0</span>把</p>
	<!-- 电脑存放牌 -->
	<div class="left">
		<p>电脑抽中的牌为:</p>
		<div id="computer"></div>
	</div>
	<!-- 玩家存放牌 -->
	<div class="right">
		<p>你抽中的牌为:</p>
		<div id="user"></div>	
	</div>
```

其中：
1. button按钮用来触发发牌事件licensing(this)，由于发牌后需要把按钮变为重新开始这里我选择把当前元素作为函数参数传递进去。   
2.  第一个p标签用于显示统计的场次   
3.  两个div分别存放电脑、用户抽取的牌，这里利用两个div的id来插入创建的牌

#### **JS代码**  

**变量定义**   

```JavaScript
		var chars = ['99','199','3','4','5','6','7','8','9','10','11','12','13'];
		//每一张牌的路径,brands下标对应A-K(13张)
		var brands = ["img/14.jpg","img/15.jpg","img/16.jpg","img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg","img/21.jpg","img/35.jpg","img/49.jpg","img/11.jpg","img/12.jpg","img/13.jpg"];
		//牌的背面
		var back = "img/back.jpg";
		var pokerValue = [0,0] ;
		var COUNT = 0;
		var TOTAL=0,computerCount=0,userCount=0,flat=0;

		var totalView = document.getElementById('totalView');
		var userWinView = document.getElementById('userWinView');
		var userTransportView = document.getElementById('userTransportView');
		var flatView = document.getElementById('flatView');

		var computer = document.getElementById('computer');
		var user = document.getElementById('user');
```
说明：（以下加粗部分均为变量/数组）     
1. 把之前的牌面值(**chars数组**)中的A、J、Q、K、分别替换为数值，由于扑克中2最大，所以设置值大一些（199），A比2小（99），依次类推J Q K。这里数值可自行改变大小。
2.  添加数组**pokerValue** 用于存放电脑和用户的牌面值大小。避免了在标签中直接显示。
3. 加入了计数 变量 **COUNT**，防止用户多次抽牌。
4.  加入总计场次**TOTAL**,电脑胜利场次/输了场次**computerCount**，用户胜利场次**userCount**，平局场次**flat**。
5.  分别找到要显示的元素。**totalView**、**userWinView**、**userTransportView**、**flatView**。
6.  分别找到要插入牌的地方：**computer**、**user**

有了这些以后，在进行编写函数。

**函数**   

就从单击按钮触发事件来改写。   

```JavaScript
	//发牌
		function licensing(element){
			var card = newCard();
			//计数器增加1
			COUNT++;
			element.onclick = null;
			element.innerHTML = "重新开始";
			element.onclick = function () {
				restart();
			}

			user.appendChild(card);
			setTimeout('cardSize()',200);
		}
```

函数首先应该创建一张牌： var card = newCard();   
在这我们需要重写之前的创建牌函数，因为我们需要把创建的牌当做一个返回值来返回，并且移除不必要的属性，如:index、row，每次创建一张牌，都记录好牌面值写入到数组 pokerValue[]数组中。    

修改之后的创建牌函数newCard():
```JavaScript
	//创建电脑和用户的牌
		function newCard(){
			var img = document.createElement('img');
			var num = generateMixed();				//获取随机数
			var imgSrc = brands[num-1];
			img.setAttribute('src',imgSrc);
			img.setAttribute('alt','扑克');
			img.setAttribute('class','brand imgHover');
			pokerValue[COUNT] = chars[num-1];
			return img;
		}
```
newCard()函数返回了一张牌给我们的licensing()函数，得到这张牌后我们应该给计数COUNT增加1，因为你抽了一张牌。之后移除onclick事件，防止再次单击抽排，之后将按钮改为重新开始，添加onclick事件触发为重新开始：   
*restart()；    //重新开始函数   *
```JavaScript
	//重新开始
		function restart(){
			var hair = document.getElementById('hair');
			var computerImg = computer.getElementsByTagName('img');
			var card = newCard();
			COUNT++;
			computer.removeChild(computerImg[0]);
			computer.appendChild(card);

			hair.innerHTML = "发牌";
			hair.onclick = function () {
				licensing(this);
			}
			var userImg = user.getElementsByTagName('img');
			user.removeChild(userImg[0]);
		}
```

该函数分别把电脑和用户的牌删除，并创建一张新的牌给电脑。再重新把按钮修改为发牌，添加发牌事件licensing(this)。**最后再回到发牌函数licensing()**把之前var card = newCard()；得到的牌（元素）插入到用户显示区域中:user.appendChild(card); 之后延时200毫秒后判断牌的大小。    

*判断牌的大小函数cardSize() *   

```JavaScript
	//比较牌的大小
		function cardSize(){
			var num1 = parseInt(pokerValue[0]);
			var num2 = parseInt(pokerValue[1]);
			console.log(COUNT);
			if(num1 > num2){
				alert("你输了！");
				computerCount ++ ;
			}
			else if (num1 == num2){
				alert("平局!");
				flat ++ ;
			}
			else if(num1 < num2){
				alert("你赢了!");
				userCount++;
			}

			if(TOTAL != 0){
				if(TOTAL%10 == 0 && userCount%10 <5)
					alert("恭喜你达成:非洲酋长称号!!");
				else if(TOTAL%10 == 0 && userCount%10 > 5)
					alert("哎呦,欧气不错哦！");
				else if(TOTAL%10 == 0 && userCount%10 > 8)
					alert("恭喜你达成:欧洲酋长称号!!!");
			}


			TOTAL++;
			COUNT = 0;
			totalView.innerHTML = TOTAL;
			userWinView.innerHTML = userCount;
			userTransportView.innerHTML = TOTAL - userCount;
			flatView.innerHTML = flat;

		}
```

这里首先把牌面值转换为数值类型，然后进行判断。相应的结果就显示相应的弹窗，并统计总场次和胜利失败场次。其中一段加入了一个小小的彩蛋（我就叫它为彩蛋吧）：   
```JavaScript
			if(TOTAL != 0){
				if(TOTAL%10 == 0 && userCount%10 <5)
					alert("恭喜你达成:非洲酋长称号!!");
				else if(TOTAL%10 == 0 && userCount%10 > 5)
					alert("哎呦,欧气不错哦！");
				else if(TOTAL%10 == 0 && userCount%10 > 8)
					alert("恭喜你达成:欧洲酋长称号!!!");
			}
```

这里其实就是计算了你10把里面赢了多少把，输了多少把。   

最后就是把你的结果显示到p标签中。
```JavaScript 
	totalView.innerHTML = TOTAL;
	userWinView.innerHTML = userCount;
	userTransportView.innerHTML = TOTAL - userCount;
	flatView.innerHTML = flat;
```

**在这里，所有的函数已经做好了。**但是你会发现我们第一次打开浏览器的时候发现电脑没有牌，所以我们还需要在浏览器加载的时候给电脑添加一张牌，这里需要用到window.onload()事件：

*浏览器打开时给电脑抽取一张牌*   
```JavaScript
	    window.onload = function(){
			var img = newCard();
			computer.appendChild(img);
			COUNT++;
		};
```

当然，我们在抽取牌之后要给COUNT变量+1，这样表明我已经抽取了一张牌，下一张的时候就是用户的牌了。这样**pokerValue[]**数组才能对应存储电脑和用户的牌面值。**之前就一直在这里出错了。**老是误判给我赢，其实就是计数出错了，导致判断的时候是错误的数值进行判断。   

# 结束   

所有代码：   
```HTML
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
			.center {
				width: 70%;
				margin: 5px 15%;
			}
			.left{
				width: 20%;
				float: left;
				margin:10px 15%;
			}
			.right{
				width: 20%;
				float: left;
			}
			.imgHover {
				cursor: pointer;

			}
			p span {
				font-weight: bold;
			}
		</style>
	</head>
	<body>
		
		<button onclick="licensing(this)" class="center" id="hair">发牌</button>
		<p class="center">共<span id="totalView">0</span>把,赢了<span id="userWinView">0</span>把,输了<span id="userTransportView">0</span>把,平局<span id="flatView">0</span>把</p>
		<!-- 电脑存放牌 -->
		<div class="left">
			<p>电脑抽中的牌为:</p>
			<div id="computer"></div>
		</div>
		<!-- 玩家存放牌 -->
		<div class="right">
			<p>你抽中的牌为:</p>
			<div id="user"></div>	
		</div>
		



		<script>
			var chars = ['99','199','3','4','5','6','7','8','9','10','11','12','13'];
			//每一张牌的路径,brands下标对应A-K(13张)
			var brands = ["img/14.jpg","img/15.jpg","img/16.jpg","img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg","img/21.jpg","img/35.jpg","img/49.jpg","img/11.jpg","img/12.jpg","img/13.jpg"];
			//牌的背面
			var back = "img/back.jpg";
			var pokerValue = [0,0] ;
			var COUNT = 0;
			var TOTAL=0,computerCount=0,userCount=0,flat=0;

			var totalView = document.getElementById('totalView');
			var userWinView = document.getElementById('userWinView');
			var userTransportView = document.getElementById('userTransportView');
			var flatView = document.getElementById('flatView');

			var computer = document.getElementById('computer');
			var user = document.getElementById('user');

			function generateMixed() {
		         var id = Math.ceil(Math.random()*13);
			     return id;
			}
			//创建电脑和用户的牌
			function newCard(){
				var img = document.createElement('img');
				var num = generateMixed();				//获取随机数
				var imgSrc = brands[num-1];
				img.setAttribute('src',imgSrc);
				img.setAttribute('alt','扑克');
				img.setAttribute('class','brand imgHover');
				pokerValue[COUNT] = chars[num-1];
				return img;
			}


			//重新开始
			function restart(){
				var hair = document.getElementById('hair');
				var computerImg = computer.getElementsByTagName('img');
				var card = newCard();
				COUNT++;
				computer.removeChild(computerImg[0]);
				computer.appendChild(card);

				hair.innerHTML = "发牌";
				hair.onclick = function () {
					licensing(this);
				}
				var userImg = user.getElementsByTagName('img');
				user.removeChild(userImg[0]);
			}
			//比较牌的大小
			function cardSize(){
				var num1 = parseInt(pokerValue[0]);
				var num2 = parseInt(pokerValue[1]);
				console.log(COUNT);
				if(num1 > num2){
					alert("你输了！");
					computerCount ++ ;
				}
				else if (num1 == num2){
					alert("平局!");
					flat ++ ;
				}
				else if(num1 < num2){
					alert("你赢了!");
					userCount++;
				}

				if(TOTAL != 0){
					if(TOTAL%10 == 0 && userCount%10 <5)
						alert("恭喜你达成:非洲酋长称号!!");
					else if(TOTAL%10 == 0 && userCount%10 > 5)
						alert("哎呦,欧气不错哦！");
					else if(TOTAL%10 == 0 && userCount%10 > 8)
						alert("恭喜你达成:欧洲酋长称号!!!");
				}


				TOTAL++;
				COUNT = 0;
				totalView.innerHTML = TOTAL;
				userWinView.innerHTML = userCount;
				userTransportView.innerHTML = TOTAL - userCount;
				flatView.innerHTML = flat;

			}
			//发牌
			function licensing(element){
				var card = newCard();
				//计数器增加1
				COUNT++;
				element.onclick = null;
				element.innerHTML = "重新开始";
				element.onclick = function () {
					restart();
				}

				user.appendChild(card);
				setTimeout('cardSize()',200);

				
			}

			window.onload = function(){
				var img = newCard();
				computer.appendChild(img);
				COUNT++;
			};
		</script>
	</body>
	</html>
```

**码字写教程实在辛苦，但是还是要坚持！**



