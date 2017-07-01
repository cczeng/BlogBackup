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
