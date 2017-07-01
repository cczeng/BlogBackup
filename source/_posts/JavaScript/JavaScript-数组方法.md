---
title: JavaScript 数组方法
date: 2017-07-01 15:24:28
tags: ["JS"]
comments: true
---

# JavaScript 数组方法  

JS的数组与其他语言最大的区别在于JS的数组每一项都可以存储不同数据类型。   
   
可直接[点击这里](/Subpage/JavaScript/arraymethod.html)打开网页后Ctrl+F查找方法，例如：迭代
<!-- more -->
## 声明

```JS
	var colors = new Array();//使用Array的构造函数
	var colors = new Array(20);
	var colors = new Array('red','blue','green');
	//数组字面量表示法
	var colors = ['red','blue','green'];
	var colors = [];//空数组
```

## 小技巧
数组的length属性是可 **读写** 的。   
```JS
	var colors = ['red','green','blue'];
	alert(colors.length);//3
	colors.length =2;
	alert(colors);//red,green
	//上面默认调用了数组每一项的toString方法
```


**添加数组长度** array.length :
```JS
	var colors = ['red','green','blue'];
	colors[colors.length] = 'orange';
	colors[colors.length] = 'brown';
	alert(colors);//red,green,blue,orange,brown
	//由于数组最后一项的索引始终是array.length-1，因此就会自动添加一个值
	colors[99] = 'red';
	alert(colors.length);//100
```
**检测数组**: Array.isArray(colors);   
   
## 方法   

这里只例句常用的，想要详细的数组方法，请[点击这里](/Subpage/JavaScript/arraymethod.html)打开网页后Ctrl+F查找方法，例如：迭代   

### 栈方法（后进先出）/添加删除项

方法名：**push() && pop()**   

push()方法可接收任意参数，并**添加到数组末尾**，并返回修改后数组长度。   
pop()方法从数组末尾**删除最后一项**，返回移除的项。   

例：   

```JS
	var number = [1,2,3,4,5];
	var count = number.push(10,20,30);//推入三项
	alert(count);//3
	var item = number.pop();//取出最后一项
	alert(item);//30
```


### 队列方法（先进后出）/删除添加项
   
方法名： **shift() && unshift()**   

shift() **移除数组第一项** 并返回该项。   

unshift() **在数组前端添加任意个项**并返回数组长度   

例:  


```JS
	var colors = ['red','blue','green'];
	var item = colors.shift();
	alert(item);//red
	var count = colors.unshift('red','yellow');
	alert(count);//4
```

### 重排/排序

方法名： **reverse() && sort()**   

reverse() 把数组翻转   

sort() 调用每一项的toString()方法后比较字符串大小排序（不好排序数字）   

sort()有一个办法可以解决排序数字   

例：   

```JS
	var values = [1,2,3,4,5];
	var values1 = [0,1,5,10,15];
	values.reverse();
	alert(values);//5,4,3,2,1
	values1.sort();
	alert(values1);//0,1,10,15,5
```

明显看出sort()方法的缺陷，但是可以通过下面的办法解决：   

sort()方法**接受一个比较函数作为参数**：   第一个应该位于第二个之前则返回负数，相同则返回0，第一个应该位于第二个之后则返回正数。

列：   

```JS
	var values = [0,1,5,10,15];
	values.sort(compare);
	alert(values);//15,10,5,1,0
	//比较函数
	function compare(value1,value2){
		return value2 - value1;
		// 想要改变排序方式只需把value2-value1改成value1-value2
	}
```
### 操作方法/复制、删除、替换、插入   

方法名： ** concat() && slice() && splice() **   

concat():基于当前数组中所有项创建一个新数组。   

例：   
```JS
	var colors = ['red','blue'];
	var colors2 = ['green','yellow'];
	var colors3 = colors.concat(colors2);
	alert(colors3);//red,blue,green,yellow
	//复制了colors并把colors2数组拼接到colors后形成一个新的数组返回给colors3
```
slice():基于**当前数组中的一项或多项** 创建一个新数组。   

```JS
	var colors = ['red','green','blue','yellow','purple'];
	var colors2 = colors.slice(1);//一个参数代表从下标1开始到数组结尾
	var colors3 = colors.slice(1,4);//两个参数从下标1开始到下标4的项，不包括第4项
	alert(colors2);//green,blue,yellow,purple
	alert(colors3);//green,blue,yellow 这里没有包含第colors[4]项
```
splice(): 这个方法是最强大的数组方法。这里不做太多解释，[点击这里](/Subpage/JavaScript/arraymethod.html)打开网页后Ctrl+F查找方法，例如：插入/替换
