---
title: 'C#笔记——定义类'
date: 2017-06-17 14:58:22
tags:  ["C#","笔记"]
comments: true
---
#  1、C#中的类定义   

C#使用关键字 `class` 来定义类：   

```C
	class MyClass
	{
	   //类成员
	}
```
这段代码定义了一个类 `MyClass` ，默认情况下，类声明为**内部**的，**即只有当前项目中的代码才能访问它** 。<!-- more -->可使用`internal` 关键字来修饰（但这没有必要）：   

```C
	//下面是一个内部类  关键字  internal
	internal class MyClass
	{
	    //类成员
	}
	//下面是一个公共类  关键字 public
	public class MyClass
	{
		//类成员
	}
```
除了这两个访问修饰符关键字外，还可以指定类是抽象的（不能实例化，只能继承，可以有抽象成员）或密封的（sealed，不能继承）。分别为： `abstract`(抽象的) && `sealed` (密封的)   

```C
	//下面是一个公共抽象类
	public abstract class MyClass
	{
	    //类成员,可以是抽象的
	}
	//下面是一个公共密封类
	public sealed class MyClass
	{
	    //类成员
	}
```
**抽象类和密封类都可以是公共的或者内部的**  
   
### 继承    

还可以在类中定义继承。为此，要在类名的后面加上一个冒号，其后跟基类名：
```C
	public class MyClass : MyBase //继承此基类
	{
	    //类成员
	}
```

注意：在C的类定义中，**只能有一个基类**。如果继承了一个抽象类，就必须实现所继承类的所有抽象成员（除非派生类也是抽象的）。   
**编译器不允许派生类的可访问性高于基类**。也就是说**内部类可以继承于一个公共基类，但是公共类不能继承与一个内部基类。**   

```C
public class MyBase
{
    //类成员
}
internal class MyClass:MyBase //继承于MyBase
{
    //类成员
}
```
上面这个例子是合法的，下面的例子为不合法。

```C
	//一个错误的写法,公共类不能继承内部类
	internal class MyBase
	{
		//类成员
	}
	public class MyClass : MyBase
	{
	    //类成员
	}
```

**如果没有使用基类，被定义的类就只继承于基类System.Object(它在C中的别名是object，因为所有类的根类都是System.Object)。    

### 接口   

除了可以指定基类外，还可以在冒号之后指定支持的接口。如果指定了基类，它必须紧跟在冒号的后面，之后才是指定的接口：   

```C
	public class MyClass : IMyInterface //接口,推荐使用I开头命名
	{
	    //类成员
	}
```
支持该接口的类必须实现所有接口成员，但如果不想使用给定的接口成员，可以提供一种“空”的实现方式（没有函数代码），还可以把接口成员实现为抽象类中的抽象成员。   
 
下面给出了一个错误的例子（基类不在继承列表的第一个）：   
```C
	public class MyClass :IMyInterface,MyBase  //基类不在第一项
	{
	    //类成员
	}
```
正确方式应该如下：   
```C
	public class MyClass : MyBase,IMyInterface //第一项为：基类，第二项为：接口
	{
	    //类成员
	}
```
还可以指定多个接口：   
```C
	public class MyClass : MyBase,IMyInterface,IMySecondInterface //多个接口
	{
		//类成员
	}
```
### 接口的定义   

声明接口的方式与声明类的方式相似，但是用关键字是`interface` 而不是 `class`：   
```C
	interface IMyInterface
	{
	    //接口成员
	}
```
访问修饰符关键字 `public` && `internal` 的使用方式是相同的，与类一样，接口也默认定义为内部接口。**所以要使接口可以公开访问，必须使用 `public` 关键字**：   
```C
	public interface IMyInterface
	{
	    //接口成员
	}
```
**不能在接口中使用关键字 `abstract` && `sealed` **，因为这两个修饰符在接口定义中是没有意义的（他们不包含实现代码，所以不能直接实例化，且必须是可以继承的）。   



也可以用与类类似的方法来指定接口的继承，主要区别是可以使用多个基接口：   

```C
public interface IMyInterface : IMyBaseInterface,IMyBaseInterface2  //多个基接口
{
    //接口成员
}
```
**接口不是类，所以没有继承System.Object**

# 2、构造函数和析构函数   

在C中定义类时，**常常不需要定义相关的构造函数和析构函数**。因为在编码时，如果没有提供它们，编译器会自动添加它们。但是如果有必要可以提供自己的构造函数和析构函数。   

下面使用一个简单的方法演示把一个构造函数添加到类中：   
```C
	class MyClass
	{
	    //与类同名
		public MyClass()
		{
	        //constructor code(构造函数代码)
	    }
	}
```
这个构造函数与类同名，但没有参数（使其成为类的默认构造函数）。   

也可以使用私有的默认构造函数，即不能用这个构造函数来创建这个类的对象实例（它是不可创建的）：   

```C
	class MyClass
	{
	    private MyClass()
	    {
		    //构造函数代码
		}
	}
```
最后，通过提供参数，也可以采用相同的方式给类添加**非默认的构造函数**，例如：   
```C
	class MyClass
	{
		public MyClass()
		{
			//默认构造函数代码
		}
		public MyClass(int myInt)
		{
			//非默认构造函数代码
		}
	}
```
可提供的构造函数的数量**不受限制**（当然不能耗尽内存，也不能有相同的参数集）   

### 析构函数

类的析构函数由带有 `~` 前缀的类名来声明（构造函数也使用类名声明）。   

```C
	class MyClass
	{
		~MyClass()
		{
			//析构函数体
		}
	}
```

### 构造函数的执行顺序   
任何构造函数都可以配置在执行自己的代码前调用其他构造函数。   

```C
	public class MyBaseClass
	{
		public MyBaseClass()
		{
		}
		public MyBaseClass(int i)
		{
		}
	}
	public class MyDerivedClass:MyBaseClass
	{
		public MyDerivedClass()
		{
		}
		public MyDerivedClass(int i)
		{
		}
		public MyDerivedClass(int i,int j)
		{
		}
	}
```
如果以下面的方式实例化MyDerivedClass:
//注意实例化类使用 `new` 关键字
`MyDerivedClass myObj = new MyDerivedClass();`   

则执行顺序如下：
* 执行System.Object.Object()的构造函数  //类根的实例化
* 执行MyBaseClass.MyBaseClass()构造函数  //基类实例化
* 执行MyDerivedClass.MyDerivedClass()构造函数  //派生类实例化   

另外如果使用下面的语句：   
`MyDerivedClass my Obj = new MyDerivedClass(4);` 

则执行顺序如下：
* 执行System.Object.Object()的构造函数  //类根的实例化
* 执行MyBaseClass.MyBaseClass()构造函数  //基类实例化
* 执行MyDerivedClass.MyDerivedClass(int i)构造函数  //派生类实例化 

另外如果使用下面的语句：   
`MyDerivedClass my Obj = new MyDerivedClass(4,5);` 

则执行顺序如下：
* 执行System.Object.Object()的构造函数  //类根的实例化
* 执行MyBaseClass.MyBaseClass()构造函数  //基类实例化
* 执行MyDerivedClass.MyDerivedClass(int i,int j)构造函数  //派生类实例化 

**如果我们想要修改实例化顺序，只需使用构造函数初始化器**：

```C
	public class MyDerivedClass:MyBaseClass
	{
		public MyDerivedClass(int i,int j):base(5)
		{
		}
	}
```
其中使用 `base` 关键字指定.net实例化过程使用基类中具有指定参数的构造函数。   


这段代码执行顺序如下：
* 执行System.Object.Object()的构造函数  //类根的实例化
* 执行MyBaseClass.MyBaseClass(int i)构造函数  //基类实例化
* 执行MyDerivedClass.MyDerivedClass(int i,int j)构造函数  //派生类实例化 

---
除了使用`base` 关键字外，这里还可以讲另一个关键字 `this` 用作构造函数初始化器。这个关键字指定在调用指定构造函数前：   
```C
public class MyDerivedClass : MyBaseClass
{
	public MyDerivedClass():this(5,6)
	{
	}
	public MyDerivedClass(int i,int j):base(i)
	{
	}
}
```

这段代码执行顺序如下：
* 执行System.Object.Object()的构造函数  //类根的实例化
* 执行MyBaseClass.MyBaseClass(int i)构造函数  //基类实例化
* 执行MyDerivedClass.MyDerivedClass(int i,int j)构造函数  //派生类实例化
* * 执行MyDerivedClass.MyDerivedClass()构造函数  //派生类实例化 

# 注意   


**1、 公共类不能继承于内部类——不允许派生类的可访问性高于基类**
**2、 基类必须在集成列表中第一项，接口需跟在基类之后**
**3、 接口可继承基接口**
**4、 构造函数与类同名： public MyClass(){}**
**5、 析构函数：~MyClass(){}**
**6、 构造函数初始化器`base` && `this` 只能定义一个构造函数**   

不要创建无限循环：
```C
	//这段代码延时了一个无线循环的构造函数
	public class MyBaseClass
	{
		public MyBaseClass():this(5)
		{
		}
		public MyBaseClass(int i):this()
		{
		}
	}
```


































































