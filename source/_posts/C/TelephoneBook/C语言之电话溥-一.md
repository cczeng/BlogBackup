---
title: C语言之电话溥(一)
date: 2017-05-12 16:44:41
tags: ["C","笔记"]
comments: true
---
&nbsp;&nbsp;突然发现已经有很久没有去看C了，当初的热情已经慢慢变淡。也很久没有认真的去学习知识了，现在想起来就重新温习了一下C语言。   
&nbsp;&nbsp;这次基于当前的知识用C语言的结构写了一个简单的电话溥。   
<!--more-->   

# 1、动手前的思考
   
1. 采用什么方法抽象出电话溥？
2. 哪种方法更好更方便？
3. 怎样让主要信息在dos窗口表现更突出？
   
### 解决办法   
1. 采用数据结构的方法来抽象出电话溥
2. 采用结构会比数组更好
3. 使用各种分隔符号来突出联系人列表

### 基本要求   
1. 要存储的内容有:姓名、电话、地址、邮箱
2. 能够读取已经存储的联系人资料
3. 在已有联系人的基础上再加入新的联系人   
4. 所有联系人均保存在一个文件中    

### 进一步思考  
1. 使用动态无限存储联系人个数
2. 加入查找联系人功能
3. 删除指定联系人
4. 加入指定某个联系人进行资料修改  


***出于还没有接触到链表、二叉搜索树等知识，暂时搁置，此次只考虑***   

# 2、代码    
此次不做教程类那么详细，主要用于笔记。   

#### 1、头文件与常量定义  
```C
#include "stdio.h"
#include "stdlib.h"
#define MAXNAME	20				//用户名
#define MAXTEL 12				//电话
#define MAXADDRESS 40			//地址
#define MAXEMAIL 30				//邮箱
#define NUMBER 40				//人数
```

#### 2、结构
```C
//由于需要存储到文件中，为方便以后读取，这里没有使用动态内存分配
struct user
{
	char name[MAXNAME];
	char tel[MAXTEL];
	char address[MAXADDRESS];
	char email[MAXEMAIL];
};   
```

#### 3、 主函数   

##### 变量定义   
  

```C
struct user class[NUMBER];					//结构数组  
int count = 0;
int index,filecount;
FILE * phoneBook;							//文件指针
int size = sizeof(struct user);   
```


**说明:**   
1. 第一条语句创建了user为模板的class结构数组
2. 第四条语句创建了一个文件指针
3. 第五条保存了user结构需要的内存大小   

##### 打开文件   

有了变量之后就需要打开文件，以便读取文件里是否有联系人在里面，后面存储也需要用到这个文件。这里调用**fopen()**函数打开文件。   
**fopen()原型 FILE * fopen(const char * path,const char * mode);**  
fopen()第一个参数为要打开的文件，第二个参数以什么方式打开文件，其中打开方式有:   
1. “r” 以只读方式打开文件，该文件必须存在。  
2. “r+” 以可读写方式打开文件，该文件必须存在。  
3. ”rb+“ 读写打开一个二进制文件，允许读写数据（可以任意修改），文件必须存在。  
4. “w” 打开只写文件，若文件存在则文件长度清为0，即该文件内容会消失。若文件不存在则建立该文件。  
5. “w+” 打开可读写文件，若文件存在则文件长度清为零，即该文件内容会消失。若文件不存在则建立该文件。  
6. “a” 以附加的方式打开只写文件。若文件不存在，则会建立该文件，如果文件存在，写入的数据会被加到文件尾，即文件原先的内容会被保留。（EOF符保留）  
7. ”a+“ 以附加方式打开可读写的文件。若文件不存在，则会建立该文件，如果文件存在，写入的数据会被加到文件尾后，即文件原先的内容会被保留。 （原来的EOF符不保留）  
8. “wb” 只写打开或新建一个二进制文件；只允许写数据（若文件存在则文件长度清为零，即该文件内容会消失）。  
9. “wb+” 读写打开或建立一个二进制文件，允许读和写（若文件存在则文件长度清为零，即该文件内容会消失）  
10. “wx” 创建文本文件,只允许写入数据.[C11]  
11. “wbx” 创建一个二进制文件,只允许写入数据.[C11]  
12. ”w+x“ 创建一个文本文件,允许读写.[C11]  
13. “wb+x” 创建一个二进制文件,允许读写.[C11]  
14. “w+bx” 和"wb+x"相同[C11]    
15. “rt” 只读打开一个文本文件，只允许读数据  
16. “rb+” 读写打开一个二进制文件，允许读和写  
17. “ab+” 读写打开一个二进制文件，允许读，或在文件末追加数据    

**更多请自行阅读[百度知道](http://baike.baidu.com/link?url=X8Bl9Z_lXyto-MM3y2I_pQ9DfCRb6RXauJcyT7CDUCqIeOeuWRJes4A8oV1mC6kENynSZ9AAmH_MGUxIOQbNfa)**   
   

```C
if((phoneBook = fopen("phoneBook.dat","a+b"))==NULL)
{
	fputs("文件打开失败.\n",stderr);
	exit(1);
}
```
   
有了文件之后，就需要进行读取和写入了，在读取和写入之前需要先定位到文件的开始。    

```C
//定位到文件开始处
rewind(phoneBook);
```
   

**先检查文件里有没有联系人,有的话先读取出来,然后记录个数，并从结构数组指定位置开始写入新的.**   

```C
//首先查看文件里有没有存储着电话号码,如果有那就先读取出来.
	while(count < NUMBER && fread(&class[count],size,1,phoneBook) == 1)
	{
		if(count == 0)
			puts("当前文件存贮了以下联系人:");
		puts("-------------------------------------");
		printf("|  姓名:  %s\n|  电话:  %s\n|  地址:  %s\n|  邮箱:  %s\n",class[count].name,
			class[count].tel,class[count].address,class[count].email);
		puts("-------------------------------------");

		count++;
	}
```
 
上面这段代码会一直读取文件中的联系人，直到全部读取完。   
fread()函数原型：**size_t fread ( void *buffer, size_t size, size_t count, FILE *stream) ;**      
fread是一个函数。从一个文件流中读数据，最多读取count个项，每个项size个字节，如果调用成功返回实际读取到的项个数（小于或等于count），如果不成功或读到文件末尾返回 0。    

全部读取完了后记录当前读取的个数，以便后面存储的时候从哪个位置开始。
```C
filecount = count;
```

判断是否超出存储范围   
```C 
if(count == NUMBER)
	{
		fputs("\n当前已存储满.",stderr);
		exit(2);
	} 
```

读取新的联系人进结构体   

```C
	puts("\n请输入一个新的联系人资料.直接[Enter]则退出.\n");
	//存储新的联系人
	while(count<NUMBER && printf("-----------------------------------\n姓名:"),gets(class[count].name) != NULL && class[count].name[0] != '\0')
	{
		printf("电话:  ");
		gets(class[count].tel);
		printf("地址:  ");
		gets(class[count].address);
		printf("邮箱:  ");
		gets(class[count++].email);
		puts("-----------------------------------");

		if(count < NUMBER)
			puts("\n请继续输入一个新的联系人资料.直接[Enter]则退出.\n");
	}
```

再次全部输出联系人:   

```C
if(count > 0)
	{
		puts("以下列出所有联系人列表.");
		for(index = 0; index < count;index++)
		{
			puts("-----------------------------------");
			printf("|  姓名:  %s\n|  电话:  %s\n|  地址:  %s\n|  邮箱:  %s\n",class[index].name,
			class[index].tel,class[index].address,class[index].email);
			puts("-----------------------------------");
		}
		//写入文件
		fwrite(&class[filecount],size,count - filecount,phoneBook);
	}
	else
	{
		puts("本次没有输入任何联系人");
	}
	puts("Bye!\n");
```

到这就基本结束了。最终代码如下:   

```C
#include "stdio.h"
#include "stdlib.h"
#define MAXNAME	20				//用户名
#define MAXTEL 12				//电话
#define MAXADDRESS 40			//地址
#define MAXEMAIL 30				//邮箱
#define NUMBER 40				//人数


//由于需要存储到文件中，为方便以后读取，这里没有使用动态内存分配
struct user
{
	char name[MAXNAME];
	char tel[MAXTEL];
	char address[MAXADDRESS];
	char email[MAXEMAIL];
};
int main(int argc, char const *argv[])
{
	struct user class[NUMBER];					//结构数组
	int count = 0;
	int index,filecount;
	FILE * phoneBook;							//文件指针
	int size = sizeof(struct user);				//用来存储结构大小，以便分配内存

	puts("请勿将本程序目录下:[phoneBook.dat] 文件删除,如若要重置电话溥请删除该文件即可.");
	//打开文件
	if((phoneBook = fopen("phoneBook.dat","a+b"))==NULL)
	{
		fputs("文件打开失败.\n",stderr);
		exit(1);
	}

	rewind(phoneBook);							//定位到文件开始处

	//首先查看文件里有没有存储着电话号码,如果有那就先读取出来.
	while(count < NUMBER && fread(&class[count],size,1,phoneBook) == 1)
	{
		if(count == 0)
			puts("当前文件存贮了以下联系人:");
		puts("-------------------------------------");
		printf("|  姓名:  %s\n|  电话:  %s\n|  地址:  %s\n|  邮箱:  %s\n",class[count].name,
			class[count].tel,class[count].address,class[count].email);
		puts("-------------------------------------");

		count++;
	}

	filecount = count;							//存储着已有电话溥人数

	if(count == NUMBER)
	{
		fputs("\n当前已存储满.",stderr);
		exit(2);
	}

	puts("\n请输入一个新的联系人资料.直接[Enter]则退出.\n");
	printf("姓名:");
	//存储新的联系人
	while(count<NUMBER && gets(class[count].name) != NULL && class[count].name[0] != '\0')
	{
		puts("-----------------------------------");
		printf("电话:  ");
		gets(class[count].tel);
		printf("地址:  ");
		gets(class[count].address);
		printf("邮箱:  ");
		gets(class[count++].email);
		puts("-----------------------------------");

		if(count < NUMBER)
			puts("\n请继续输入一个新的联系人资料.直接[Enter]则退出.\n");
	}

	if(count > 0)
	{
		puts("以下列出所有联系人列表.");
		for(index = 0; index < count;index++)
		{
			puts("-----------------------------------");
			printf("|  姓名:  %s\n|  电话:  %s\n|  地址:  %s\n|  邮箱:  %s\n",class[index].name,
			class[index].tel,class[index].address,class[index].email);
			puts("-----------------------------------");
		}
		//写入文件
		fwrite(&class[filecount],size,count - filecount,phoneBook);
	}
	else
	{
		puts("本次没有输入任何联系人");
	}
	puts("Bye!\n");



	return 0;
}

```
### 效果   
![效果图](/img/TelephoneBook.gif)   
由于我是在ubuntu on windows 10 中编译执行的,命令行界面显示有点小问题。
![效果图](/img/TelephoneBook.png)  