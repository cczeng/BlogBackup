---
title: 我是如何利用Github Pages搭建起我的博客，细数一路的坑
date: 2017-05-03 17:02:22
tags: ["blog","Hexo"]
comments: true
---
# 1、前言   
其实早在这之前我就一直想过写博客,但由于种种原因一直没有去学习这方面的知识,最近半个月(从开始动手到搭建好)一直陆陆续续的在着手这方面的工作。从开始到搭建完成的过程中遇到了很多困难，因为在这之前对Github一点了解都没有导致满头雾水,不断的跳进一个又一个坑,甚至想过放弃.但最后结果想必都知道了。在写如何搭建之前我觉得我们应该先从头开始了解。  

<!--more-->
## 那么我为什么要建立自己的博客？*——[引自:为什么你要写博客？—陈素封](https://zhuanlan.zhihu.com/p/19743861?columnSlug=cnfeat)*
### 1.“提高将事情讲清楚的能力”. 
> 在写博客之前你需要花更多的时间来表达出你的想法，表达你想法之前你得先对你要表达的东西充分理解并理清思路和逻辑。
	>> 很多东西你以为懂了，但当你在写下来的时候，你就觉得无从下手了。   

### 2.分享带来的连锁反应
> “通过分享，你获得了直接而快速的回报，你最终或许会发现你已将版权和“保留所有权利”抛诸脑后。新的经济学准则是：参与你作品的人越多，回报越高。在分享主义里，如果你愿意你可以保留所有权，但是我乐于分享。” by 毛向辉 《分享主义：一场思维革命》   

### 3.记录成长
> 我们每个人都应该有这样的经历:隔了很久我们回头看看以前的自己会发现特别傻x,但正是因为这些傻x的岁月让我们不断成长,你在成长的过程中不断的修正自己的错误。   

### 4.探索未知的世界
> 世界不止是你的家，你的公司，你的朋友圈，你应该去发现一个更大的世界，通过写博客，你会知道世界上还有很多人像你一样在写博客，这些人和知识正在世界的某个角落在等着你。   

### 5.帮助更多想要获取帮助的人   
> 这点我相信大家由为感触,在你探索一个未知的知识领域的时候,往往被撞的一鼻子灰.幸运的人很快就能找到一个“师傅”或一篇很好的文章,但大多数往往在找“教程”的过程中就已经放弃了.因为他们没能够找到刚好理解的文章.   

# 一、开始搭建Github Pages    
参考:[傻瓜都可以利用github pages建博客](http://cyzus.github.io/2015/06/21/github-build-blog/)  
参考:[手把手教你使用Hexo + Github Pages搭建个人独立博客](https://segmentfault.com/a/1190000004947261)    
 *可以选择阅读完以上两篇教程后倒回来看不懂的地方.*   

## 1.使用前了解Github   
> GitHub是一个共享虚拟主机服务，用于存放使用Git版本控制的软件代码和内容项目(引自维基百科）  

## 2.为什么选择Github?  
> github有一个很有爱的项目，叫做github pages，这个项目是给开发者建立一个私人页面，上面用来分享新颖的想法和自己写的代码.   

## 3.注册属于你自己的Github账号
首先进入[Github](https://github.com/)站点,然后进行注册(此处不做详细说明可自行阅读[github教程：[1]注册github](http://jingyan.baidu.com/article/455a9950abe0ada167277864.html))   
   
注册完毕后你就拥有了自己的代码仓库了.  
  
## 4.创建仓库  
  
在Github首页右上角头像左侧加号点选择 New repositor(新存储库)或[点击这里](https://github.com/new)进行创建一个仓库.

![创建一个仓库](/img/blog/create1.png)   

## 5.开启Github Pages  
  
进入设置  
![设置](/img/blog/create2.png)  

找到这一块  

![设置](/img/blog/create3.png)  

当你的仓库名为：用户名.github.io 之后默认开启Github Pages  

现在随便选择一个主题,选择上图的 Choose a theme 之后会跳转到下面这个页面   
  
![设置](/img/blog/create4.png)  
  
设置完毕后你就可以通过  username.github.io(username为你的用户名访问你的博客了)   
  

## 6.下载Github 客户端   
根据自己的系统自行选择下载安装   
   
[点击前往Github下载](https://desktop.github.com/)   
   
下载安装好之后登陆你的github.   
   
从你的仓库添加到本地   
   
![设置](/img/blog/create5.png)  
  
接下来就需要搭建Hexo了   
  
# 二、Hexo   
   
要使用Hexo,需要安装Nodejs以及Git   

## 安装Node.js   
   
[下载Node.js](https://nodejs.org/en/download/)   
参考:[安装Node.js](http://www.runoob.com/nodejs/nodejs-install-setup.html)   
   
## 安装Git   
   
[下载Git](https://git-scm.com/download/)   
  
一路点击Next就行了.   
   
## 安装Hexo   
  
在你需要安装Hexo的目录下(新建一个文件夹)右键选择 Git Bash   

	npm install hexo-cli -g   
	hexo init #初始化网站   
	npm install   
	hexo g #生成或 hexo generate   
	hexo s #启动本地服务器 或者 hexo server,这一步之后就可以通过http://localhost:4000  查看了

*详细命令请参考[Hexo文档](https://hexo.io/docs/commands.html)*   
  
这里介绍一下怎么创建一篇文章   

	hexo new "文章名" #新建文章
	hexo new page "页面名" #新建页面   
   
常用简写   

	hexo n == hexo new
	hexo g == hexo generate
	hexo s == hexo server
	hexo d == hexo deploy
   
新建一篇文章后就可以[预览](http://localhost:4000/ )了,在hexo new之后执行一次生成hexo g再执行hexo s启动本地服务器,如果之前还在hexo s 按Ctrl + C 结束.   
  
## 添加主题  
   
### 安装主题(yilia主题):   

	hexo clean
	git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia   

### 启动主题   
   
找到目录下的_config.yml 文件,打开找到 theme：属性并设置为yilia   
   
### 更新主题   
   
	cd themes/yilia
	git pull
	hexo g
	hexo s
   
此时刷新[http://localhost:4000/](http://localhost:4000/)页面就能看到新的主题了.   

## 使用Hexo deploy部署到github   
   
还是编辑根目录下_config.yml文件   

	deploy:
		type: git
		repo: git@github.com:cczeng/cczeng.github.io.git  #这里的网址填你自己的
		branch: master   
  
**此处感谢有网友帮忙指出错误,原文自第二行起由于疏忽没有缩进 **

具体配置可参考[我的博客备份](https://github.com/cczeng/BlogBackup)  
  


保存后需要提前安装一个扩展：
   
	npm install hexo-deployer-git --save   
   
接下来就是将Hexo部署到我们的Github仓库上   

# 三、部署到Github   
   
## 1.检查SSH keys的设置   
   
以下命令均是在Git bash里输入   
   
	cd ~/.ssh
	ls
	#此时会显示一些文件
	mkdir key_backup
	cp id_rsa* key_backup
	rm id_rsa*  
	#以上三步为备份和移除原来的SSH key设置
	ssh-keygen -t rsa -C "邮件地址@youremail.com" #生成新的key文件,邮箱地址填你的Github地址
	#Enter file in which to save the key (/Users/your_user_directory/.ssh/id_rsa):<回车就好>
	#接下来会让你输入密码

之后就可以看到成功的界面。   
   
## 2.添加SSH Key到Github   
   
进入[github首页](https://github.com/)   
   
![设置](/img/blog/create6.png)  
   
添加SSH Key。   
   
![设置](/img/blog/create7.png)   
   
找到 系统当前用户目录下(开启查看隐藏文件) **C:\Users\用户名\ .ssh** id_rsa.pub文件以文本方式打开。打开之后全部复制到key中   
   
![设置](/img/blog/create8.png)   
   
到了这就可以测试一下是否成功了:   

	ssh -T git@github.com
	#之后会要你输入yes/no,输入yes就好了。

设置你的账号信息:   

	git config --global user.name "你的名字"     #真实名字不是github用户名
	git config --global user.email "邮箱@邮箱.com"	#github邮箱
   

## 3.部署到github
   
	hexo d
   
这时再刷新  username.github.io 就可以看到你的博客了。   
   

到了这你以为就结束了吗？没有，还有坑没有给你们填好。  
   
# 四、最后的填坑   
   
1. 不知道怎么修改yilia主题?(修改*themes/yilia/_config.yml*)请参考[一个简洁优雅的hexo主题 ](https://github.com/litten/hexo-theme-yilia)   
1. Hexo主题配置(根目录**_config.yml**文件)
1. 电脑重装了系统/多台电脑写博客？那就赶紧戳这里[使用hexo，如果换了电脑怎么更新博客？](https://www.zhihu.com/question/21193762)   
1. 不知道如何编写Markdown语法？[Markdown——入门指南](http://www.jianshu.com/p/1e402922ee32/)   
1. 想要给网站添加图片？请把图片放入根目录 *source\ * 下建立一个文件夹，当你执行hexo g的时候此文件夹自动生成到public中。

# 最后   
   
可能有部分细节疏漏，请参考：   
*全文参考:[傻瓜都可以利用github pages建博客](http://cyzus.github.io/2015/06/21/github-build-blog/)* 
*全文参考:[手把手教你使用Hexo + Github Pages搭建个人独立博客](https://segmentfault.com/a/1190000004947261)*
**如果您觉得对你有帮助，请转载给更多需要的人(转载时请注明出处)。谢谢！**   

