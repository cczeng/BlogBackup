---
title: 'C#笔记——面向对象编程简介'
date: 2017-05-16 10:55:39
tags:  ["C#","笔记"]
comments: true
---
#### 摘自C#入门经典（第七版）——第八章   

###  对象和类   
>  **[对象](http://baike.baidu.com/link?url=gOglAqhLQQeNdd7RawEn_DTRzfmnT1NnVQSXW36g85v2-gxHGgmLXDucRstE8walCQg6azWfufn5s2c-8IW0LXNG7-9arDGkTgx-zkQJo0e)**是**[OOP](http://baike.baidu.com/link?url=Sg7eDc1ZJE20wqd0eNks5ijPt_TjCk0qvp1-ag7t-KBhhWThS3YBCVgk36RJsN8cZyHMX-hWqzwo0bDnRTfky_)** *应用程序的组成部件。**[类](http://baike.baidu.com/link?url=M3K5MeRHyEjE5N34-KljAW7UEA_Nkgn5XibqkpntmzqUyqVBYaV9cJajB63jUwJpdIkQsTffS86Bve4urJnaMK)** *是用于实例化对象的类型定义。* **[对象](http://baike.baidu.com/link?url=gOglAqhLQQeNdd7RawEn_DTRzfmnT1NnVQSXW36g85v2-gxHGgmLXDucRstE8walCQg6azWfufn5s2c-8IW0LXNG7-9arDGkTgx-zkQJo0e)**可以包含**[数据](http://baike.baidu.com/link?url=a7My4fQm5KgL3B09I2DM9T4A7QEu8G2e9pWk3VECCCgUPmNBD5z897TcnKaetZs6xhwZ6rejSDL_arbiMZv_5Z0AdmRCSlvVicA1AfiYYva)**，提供其他代码可以使用的操作。**[数据](http://baike.baidu.com/link?url=a7My4fQm5KgL3B09I2DM9T4A7QEu8G2e9pWk3VECCCgUPmNBD5z897TcnKaetZs6xhwZ6rejSDL_arbiMZv_5Z0AdmRCSlvVicA1AfiYYva)** 可以通过属性提供外部代码使用，操作可以通过方法提供外部代码使用。   
>  **[属性](http://baike.baidu.com/link?url=tgsp2RneYACBdmAT45FT3HXb2sivBhsJ9p2J2b4TStje_qBQw9DiK0-aobsCPunlniLsvXe_l5yKyYri_XtFKukTr2YPZighE8mPRRjtUwm)**和**方法**称为类的成员。**[属性](http://baike.baidu.com/link?url=tgsp2RneYACBdmAT45FT3HXb2sivBhsJ9p2J2b4TStje_qBQw9DiK0-aobsCPunlniLsvXe_l5yKyYri_XtFKukTr2YPZighE8mPRRjtUwm)**可以进行读取访问、写入访问或读写访问。**[类](http://baike.baidu.com/link?url=M3K5MeRHyEjE5N34-KljAW7UEA_Nkgn5XibqkpntmzqUyqVBYaV9cJajB63jUwJpdIkQsTffS86Bve4urJnaMK)**成员可以是公共的（可用于所有代码）或私有的（只有类定义中的代码可以使用）。在.NET中，所有的东西都是**[对象](http://baike.baidu.com/link?url=gOglAqhLQQeNdd7RawEn_DTRzfmnT1NnVQSXW36g85v2-gxHGgmLXDucRstE8walCQg6azWfufn5s2c-8IW0LXNG7-9arDGkTgx-zkQJo0e)**    

<!-- more -->
###  对象的生命周期
>  **[对象](http://baike.baidu.com/link?url=gOglAqhLQQeNdd7RawEn_DTRzfmnT1NnVQSXW36g85v2-gxHGgmLXDucRstE8walCQg6azWfufn5s2c-8IW0LXNG7-9arDGkTgx-zkQJo0e)**通过调用它的一个**[构造函数](http://baike.baidu.com/link?url=usuz1oSaBbDb6LL_58xxv4wmLuYfUhzbwc_aMJStc9PxqPpwJ2FCTu52NtL_3Uehnnua7M8n0uNbYb-A9ZRB7M8wvq-Jm3T7kfqCL7oPT7m76Xlrwr983lAlKxH3ng8u)**来实例化。不再需要**[对象](http://baike.baidu.com/link?url=gOglAqhLQQeNdd7RawEn_DTRzfmnT1NnVQSXW36g85v2-gxHGgmLXDucRstE8walCQg6azWfufn5s2c-8IW0LXNG7-9arDGkTgx-zkQJo0e)**时，就执行其**[构析函数](http://baike.baidu.com/link?url=IYGZxeqxX-ym3RRR5E55F8H9cvwLYe1GguhZ5aVG5b-Z8Y-m69WSapulTF7mA3LWr5LbIj4jUoZ08UPgUv6eB5LY7_IvDVO8cmawG0TFcBS_FoLEY7FxUZIwUmtma-BT)**，以删除它。
>  ***重点：***要清理对象，常常需要手工删除它。

### 静态成员和实例成员   
> 实例成员只能在类的对象实例上使用，静态成员只能直接通过类定义使用，它不与实例关联。   

### 接口   
> **接口** *是可以在类上实现的公共属性和方法的集合*。可将 实现了一个接口的类*的**[对象](http://baike.baidu.com/link?url=gOglAqhLQQeNdd7RawEn_DTRzfmnT1NnVQSXW36g85v2-gxHGgmLXDucRstE8walCQg6azWfufn5s2c-8IW0LXNG7-9arDGkTgx-zkQJo0e)**赋值给对应实例类型的变量。之后通过改变量，可以使用该接口定义的成员。

### 继承   

> **继承** *是一个类定义派生于另一个类定义的机制。*  **类**从其**父类**中继承成员，每个**类**都只能有一个**父类**。**子类**不能访问**父类**的私有成员，但可以定义受保护的成员，***受保护的成员只能在该类和派生于该类的子类中使用*** 。**子类**可以重写**父类**中的虚拟成员。所有的类都有一个以**System.Object**结尾的继承链，在C#中，**System.Object**有一个别名**object**   

### 多态性   
> 从一个派生类实例化的所有对象都可以看成其父类的实例。   

### 对象关系和特性   
>  **[对象](http://baike.baidu.com/link?url=gOglAqhLQQeNdd7RawEn_DTRzfmnT1NnVQSXW36g85v2-gxHGgmLXDucRstE8walCQg6azWfufn5s2c-8IW0LXNG7-9arDGkTgx-zkQJo0e)**可以包含其他对象，也可以表示其他对象的集合。  ***要在表达式中处理对象，常常要通过运算符重载，定义运算符如何处理对象。*** 对象可以提供事件，事件因某种内部处理而被触发，客户端代码通过提供事件处理程序来响应事件
	


