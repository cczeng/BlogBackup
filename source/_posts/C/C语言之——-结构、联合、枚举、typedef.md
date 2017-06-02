---
title: C语言之——-结构、联合、枚举、typedef
date: 2017-05-21 11:45:02
tags:  ["C","笔记"]
comments: true
---
昨天520，表示本孤狼一直窝在寝室QAQ哪里都没去。只好默默的啃了会书，今天终于把这章节完结了，就此写一篇笔记，以便以后用到。  
（ps：看了一下之前几篇博文，发现文字过多，没有图文并茂，所以在后期尽量加入程序设计时画流程图、思维导图以便加深理解）     

<!-- more -->   

# 1、结构   
> 设计程序最重要的一个步骤就是选择一个表示数据的好方法。在多数情况下，使用简单的变量类型甚至数组是不够的。   

简单的数据类型远远不够我们使用，例如我们需要存储用户的基本信息，其中包括：姓名、性别、年龄。如果使用简单的数据类型那就需要分别创建数组，每个数组相互关联起来。但这样不仅容易出错且不方便。那么结构的出现就是为了解决这类问题，并延伸出更高级更复杂的数据类型。   

### 1.1 声明(struct)   
结构声明(structure declaration)是描述结构如何组合的主要方法:   
```C
	struct user{
		char name[20];
		char sex;
		int age;
	};
```
该声明描述了一个由1个char数组和1个char变量以及1个int变量组成的结构。**它并没有创建一个实际的数据对象，而是描述了组成这类对象的元素（模板）。**   
```C
    struct user zeng;
```
它把 **zeng** 声明为一个使用 **user** 结构设计的结构变量。   
***注意:***   
1.  每个成员可以是任何一种C的数据类型，甚至是其他结构 
2.  结构用一个;表示结束    

### 1.2 定义结构变量    

#### 1.2.1 结构设计   

结构设计告诉编译器如何表示数据，但并没有让计算机为此分配空间。   

#### 1.2.2 结构变量
有了结构设计才能创建结构变量
```C
    struct user zeng;
```
编译器看到这条指令，会创建一个变量zeng并使用user的模板为该变量分配空间。*下图表示了结构在内存中示意图*   
![结构在内存中的表示](/img/C/struct.png )

可以简写成以下方法：
```C
    struct user{
		char name[20];
		char sex;
		int age;
	}zeng;//在定以后跟变量名
```
#### 1.2.3 初始化结构   
```C
	struct user zeng = {
          "zengliang",
          'm',
          20
    };
```
```C
    //任意初始化顺序
    struct user zeng = {
          .name="zengliang",
          .sex='m',
          .age=20
    };
```
```C
    //另一种初始化
    struct user zeng = {
          .name="zengliang",
          'm',    //跟在.name之后的sex
          20
    };
```
#### 1.2.4 访问结构成员    
使用 **[.]** 运算符
```C
    //get()访问
    gets(zeng.name);
    //scanf()访问
    scanf("%s",zeng.name);
```
### 1.3 结构数组
```C
    struct user classStuden[10];
```
![结构数组](/img/C/structArr.png)
#### 1.3.1 访问结构数组
```C
    zeng[0].name;
    zeng[0].name[10];
```
###  1.4 嵌套结构
```C
    struct names{
		char first[10];
		char last[10];
	};
    struct user{
		struct names name;   //嵌套结构
		char sex;
		int age;
	};
	
```
#### 1.4.1 访问嵌套结构
```C
    struct user zeng;
    gets(zeng.name.first);
    gets(zeng.name.last);
```
### 1.5指向结构的指针
```C
    struct names{
		char first[10];
		char last[10];
	};
    struct user{
		struct names name;   //嵌套结构
		char sex;
		int age;
	};

	int main(){
		struct user zeng = {
          .name.first="zeng",
          .name.last = "liang",
          .sex='m',
          .age=20
        };
        struct user *studen;//结构指针
        //结构名!=结构地址,必须使用&运算符
        studen = &zeng;     //初始化结构指针
        //访问结构指针使用[->]运算符
        printf("%c",studen->sex);
        //以下表达式等价
        zeng.sex == studen->sex == (*studen).sex
    }
```
### 1.6 向函数传递结构信息
```C
    struct user {
        char name[20];
        char sex;
        int age;
    };
    char* studenName(const struct user* studen)
    {
        return studen.name;
    }
    int main()
    {
        struct user zeng = {
          "zengliang",
          'm',
          20
        };
        printf("%s\n",studenName(&zeng));
    }
```
### 1.7 结构、指针和malloc()
```C
    struct user{
	    char * fname;
	    char * lname;
	};
    //分配内存
	void getInfo(struct user * pst)
	{
	    char temp[81];
	    printf("请输入姓:");
	    gets(temp);
	    //分配内存
	    pst->fname = (char *)malloc(strlen(temp)+1);
	    //复制进已分配的内存
	    strcpy(pst->fname,temp);
	    printf("请输入名:");
	    gets(temp);
	    //分配内存
	    pst->lname = (char *)malloc(strlen(temp)+1);
	    //复制进已分配的内存
	    strcpy(pst->lname,temp);
	}
    //释放内存
    void clean(struct user * pst)
    {
        free(pst->fname);
        free(pst->lname);
    }
```
### 1.8 伸缩型数组成员（C99）
**规则：**
1. 伸缩型数组成员必须是 **最后一个** 数组成员
2.  结构中必须至少有一个其它成员
3.  伸缩型数组就像普通数组一样被声明，除了它的方括号内是空的。

例子：
```C
    struct flex{
        int count;
        double average;
        double scores[];    //伸缩型数组成员
    };
```
这个时候如果声明了一个struct flex变量， 但还是不能用scores做任何事情，因为没有为它分配任何内存。   
解决办法：**使用一个指向struct flex类型的指针，使用malloc()来为scores分配足够内存**    
```C
    struct flex *pf;//声明一个指针
    //为这个指针分配内存,scores数组大小分配为5
    pf = malloc(sizeof(struct flex)+ 5 * sizeof(double));
    //访问结构成员
    pf->count = 5;
    pf->scores[2] = 19.9;
    //释放内存
    free(pf);
```


# 2.联合
联合 **是一个能在同一个存储空间里（但不同时）存储不同类型数据的数据类型。**关键字**(union)**   
联合是以于结构同样的方式建立的，也是需要有一个联合模板和一个联合变量。   
```C
    union hold{
        int digit;
        doube bigfl;
        char letter;
    };
```
### 2.1 联合初始化
```C
    union hold valA;
    val1.letter = 'R';
    union hold valB = valA;//把一个联合初始化给另一个联合
    union hold valC = {88};//初始化联合digit成员
    union hold valD = {.bigfl = 118.2};//指定初始化项目
```
### 2.2 使用联合
```C
    fit.digit = 23;//把23存储在fit中，使用2个字节
    fit.bigfl = 2.0;//清除23,存储2.0，使用8个字节
    fit.letter = 'h';//清除2.0,存储'h',使用1个字节
```
点运算符表示正在使用哪种数据类型。**在同一个时间只能存储一个值。** 也可像结构一样使用联合指针，使用运算符（->）   

下面是一个错误的例子：
```C
    fit.letter = 'A';
    flnum = 3.02 * fit.bigfl;//错误
```
**因为存储了一个char类型，而接下来的一行却嘉定fit的内容是double类型的。**    


# 3.枚举  
枚举类型： **声明代表整数常亮的符号名称。** 关键字**(enum)**  

### 3.1 声明枚举类型
```C
    enum spectrum {red,orange,yellow,green,blue,violet};
    enum spectrum color;
```

### 3.2 常量
blue和red到底是什么？从技术上讲，**它们是int类型的常量**。
```C
    printf("red = %d,orange = %d\n",red,orange);
    //输出
    red = 0,orange = 1;
```

### 3.3 默认值
默认时，枚举列表中的常量被指定为整数值0、1、2等等。以下声明使nina具有值：3
```C
    enum kids {nippy,slats,skippy,nina,liz};
```

### 3.4 指定值
```C
    enum levels {low = 100,medium =500,high = 2000};
    enum feline {cat,lynx = 10,pnuma,tiger};
    //第二条的声明是的cat默认为0,lynx、pnuma、tiger分别为:10、11、12
```
### 3.5 共享名字空间

**名字相同但具有不同作用域的两个变量不会冲突**。

```C
    struct rect {double x;double y; };//结构
    int rect;  //在C中不会引起冲突,但不推荐    
```
# typedef

typedef工具 是一种高级数据特性，**它可以为某一类型创建自己的名字**，与#define 相似，但又不同：   

1. typedef给出的符号名称**仅限于对类型，而不是对值**
2. typedef的解释由编译器，而不是预处理器执行。
3. 虽然它的范围有限，但在其受限范围内，typedef比#define更灵活。

```C
    typedef unsigned char BYTE;
    BYTE x,y[10],* z;//用BYTE声明变量
```

该定义的作用域取决于typedef语句所在位置，**如果定义在一个函数内部，它的作用域就是局部的。如果定义在外部，它将具有全局作用域。**

 **#define** 的实现方式：    
```C
    #define STRING char *
    STRING name,sign;
    //将被翻译为下面的形式
    char *name,sign;//只有name是指针
```

**typedef** 的实现方式：    
```C
    typedef STRING char *
    STRING name,sign;
    //将被翻译为下面的形式:
    char *name,* sign;//两个都是指针
```

### 对结构使用typedef

```C
   typedef struct {double x;double y;}rect;
   //可使用下面的声明方法
   rect r1 = {3.0,6.0};
   rect r2;
   r2 = r1;
   //这将被翻译为：
   struct {
       double x;
       double y;
   }r1={3.0,6.0};
   struct {
       double x;
       double y;
   }r2;
   r2=r1;
```


### 奇特的声明

表示一个数组的[]和表示一个函数的()具有同样的优先级，这个优先级高于间接运算符*的优先级，所以导致了以下的特性:   

```C
    int board[8][8];//int 数组的数组
    int ** ptr;     //指向int的指针的指针
    int * risks[10];//具有10个元素的数组，每个元素都是一个指向int的指针
    int (* rusls)[10];//一个指针，指向具有10个元素的int数组
    int * oof[3][4];//一个3*4的数组，每个元素都是一个指向int的只恨
    int (* uuf)[3][4];//一个指针,指向一个具有3*4个元素的int数组
    int (* uof[3])[4];//一个具有3个元素的数组，每个元素都是一个指向具有4个元素的int数组的指针
```

可以使用typedef建立一系列相关的类型:

```C
    typedef int arr5[5];
    typedef arr5 * p_arr5;
    typedef p_arr5 arrp10[10];
    arr5 togs;      //togs是具有5个元素的int数组
    p_arr5 p2;      //p2是一个指针，指向具有5个元素的int数组
    arrp10 ap;      //ap是具有10个元素的指针数组，每个指针指向具有5个元素的int数组
```

笔记记录自：[C Primer Plus(第五版) 中文版]()

