---
title: git简教
date: 2017-09-08 20:43:37
tags: ["git"]
comments: true
---

# 前言



献给所有努力奋斗的程序员。



程序改变世界。   



<!--more-->  

为什么我会选择使用 git ？—— 这个美妙而强大的分布式版本控制软件。 

  

> git 是一个分布式版本控制软件.				——引自维基百科  



当你在开发一个项目或者编写一份文档的时候，经常需要添加内容、修改内容、删除内容，而且是不断的反复修改，但是修改之前你却想保存修改前的文档以便后面找回。由此一来就会产生非常多的备份。   

突然有一天你发现你的项目改错了，出现了bug，那怎么办？之前修改了太多东西已经不记得原样了，这个时候撤销操作往往出现更多的错误。那么有什么来解决这些问题呢？   

   

一个**开源且免费** 的 **分布式** 版本控制系统出现了。		—— [git](https://git-scm.com)



# 安装

  

**[git官网](https://git-scm.com)** 下载安装，不推荐安装GUI界面。   

  

安装完成后测试是否安装成功：

```
#git --version
git version 2.14.1
```

如果有版本号出现则表示安装成功，反之安装失败。 

 

# 本地版本库

版本库是被git管理的一个目录，里面的所有文件都可以被git管理，每个文件的增删改操作git都可以跟踪。  



#### 创建一个版本库

首先需要进入一个目录下，`windows` 下右键在git bash中打开,linux && Mac 则cd进入：

```
git init
Initialized empty Git repository in /Users/zengliang/Desktop/git演示/.git/
```

此时已经创建好了你的版本库，可查看当前目录下是否有 `.git` 文件夹。  



#### 工作区、暂存区

**工作区**是指你在电脑里看到的目录，你所需要编写的文件。   

**暂存区** 是由git版本库来创建的，当你需要保存文件的时候可把文件的保存添加到暂存区。   

  

#### 增删改

首先我们往目录下添加一个文件 `1.txt`:

|—git演示

​	|— 1.txt   



向里面写入：

```
hello world!
```



保存文件，然后我们切换到git命令行输入：

```
git status
# On branch master
#
# No commits yet
#
# Untracked files:
#  (use "git add <file>..." to include in what will be committed)
#
#	1.txt
#
# nothing added to commit but untracked files present (use "git  add" to track)
```

这条命令是查看当前`工作区的改动`。可以看出我们新添加了一个文件，名为`1.txt`此时git提示我们有一个文件没有提交更改，使用`git add`来添加到暂存区。

##### 添加你的改动

首先我们需要把改动的文件添加到`暂存区`，再添加到`分支` :

```
git add .
# 上面.的意思是全部文件，也可单独使用 git add 1.txt
```

也可使用 `git checkout — file` 来删除文件，不添加至暂存区。**不能省略—** 

此时已经添加到了暂存区，但是还没有添加进入当前分支:

```
git commit -m "我的第一个git"
# [master (root-commit) 30d0463] 我的第一个git
#  1 file changed, 1 insertion(+)
#  create mode 100644 1.txt

```



**git commit -m "我的第一个git" ** 的意思是添加到分支，`-m` "" 双引号引起的是对这次修改进行一个简单的描述，这里最好每次都说明，否则后面回退版本不好查找。  



此时说明已经添加进当前`分支`了，关于 `分支` 稍后我们会说明。

此时我们再查看当前工作区有没有文件改动：

```
git status
# On branch master
# nothing to commit, working tree clean
```

此时说明我们的工作区是干净的，没有需要提交的文件。   



到此我们已经完成了一个简单的 `把文件添加到分支` 的操作。接下来我们继续。



#### 版本回滚

我们再次往`1.txt`文件里面写入一些新的东西。

```
Hello 亮!
这是用于测试添加新内容。
```

可以发现，我们修改了第一行，并且加入了新的一行内容。   

我们再次添加到分支保存我们这次的改动：

```
git add .
git commit -m "修改了1.txt文档说明"
# [master 8e783ff] 修改了1.txt文档说明
#  1 file changed, 2 insertions(+), 1 deletion(-)
```

我们添加了当前改动到分支，并且添加了一个描述。   

**但是突然我们不想要这次改动了，怎么办 ？ 大多数人都是选择撤销，当然，在这种文件改动少的情况下撤销的效果往往会更好。但是在修改了很多文件且都要撤销改动的时候撤销往往更容易导致错误，效率还不高**   



在此之前，我们所有的修改都由 `git add .` 添加到了分支。

**查看日志**

```
git log
# commit 8e783ffc5b8e0cb831ad1783b163bd865a36c8e3 (HEAD -> master)
# Author: cczeng <1501725626@qq.com>
# Date:   Fri Sep 8 22:02:33 2017 +0800
#
#    修改了1.txt文档说明
#
# commit 30d0463348ba0de67410a430bf8d20e6e8a35d4b
# Author: cczeng <1501725626@qq.com>
# Date:   Fri Sep 8 21:50:28 2017 +0800
#
#    我的第一个git
```

这里说明有两次提交日志，且位于master分支。 `commit` 后面的字符串是一个`版本号` 我们回滚就需要用到这个版本号来确定我们要回滚到哪一个版本。`git log` 输出的东西太多，我们可以选择简短的方法：加上`—pretty=oneline`参数   

```
git log --pretty=oneline
# 8e783ffc5b8e0cb831ad1783b163bd865a36c8e3 (HEAD -> master) 修改了1.txt文档说明
# 30d0463348ba0de67410a430bf8d20e6e8a35d4b 我的第一个git
```

此时显示的则是剪短的一个日志。



那么有了日志，我们才好确定我们需要回退到哪一版本。



接下来我们使用`git reset —hard ` 进行版本回退。其中`—hard` 表示当前分支的顶端。

```
git reset --hard 30d0463348ba0de67410a430bf8d20e6e8a35d4b
# HEAD is now at 30d0463 我的第一个git
```

此时我们已经回到了之前的版本了。我们可以打开文件来查看：

```
Hello world!
```

**一切都回到了开始**

这个时候我们已经完成了版本回滚。



但是问题来了，第二天起来，我突然又需要在之前改动的基础上进行操作了，可是怎么办？我们的文档已经撤销回来了，一切都回到了开始。  

> 一个足以强大的东西说明已经帮你把你能考虑到的都考虑好了。



git 为我们保留了每一次我们的操作记录。可使用`git reflog` 来查看我们每一次命令记录。

```
git reflog
# 30d0463 (HEAD -> master) HEAD@{0}: reset: moving to 30d0463348ba0de67410a430bf8d20e6e8a35d4b
# 8e783ff HEAD@{1}: commit: 修改了1.txt文档说明
# 30d0463 (HEAD -> master) HEAD@{2}: commit (initial): 我的第一个git
```

可以看出一共有三次操作，最新的一次是回滚操作，每一次操作都记录了一个`commit id` ，我们可以利用这个id再次进行撤销回滚操作。

```
git reset --hard 8e783ff
# HEAD is now at 8e783ff 修改了1.txt文档说明
```

这个时候再看我们的文件，发现又到了我们添加了内容之后的样子。**要是现实也有这个时光机就好了**



此时我们已经完成了基本的git操作。



![git操作流程](/img/git/git操作流程.png)



到这里我们已经完成了基本的git操作了，接下来我们继续了解`分支`



# 分支

在我们之前的操作全部都是基于一个时间线的，这条时间线就是主分支`master` 每一个项目默认都由这个分支。



当你需要另一个甚至更多人来协同你一起开发的时候，你就需要使用分支。

为什么这么说？

因为不可能每个人都修改同一份文档。而且这也不是明智的做法。

**`master` 是主分支，也是项目开始的开始，是最稳定的一个原型。**

除非完全测试通过了才可以提交到`master`分支，否则千万不要提交到master分支。

那么我们可以创建一个属于自己的分支，这个分支是由`master`分支延伸出来的。意思是在`master`的基础上进行操作，但完全不影响`master`的文件。

```
git checkout -b cczeng	#表示创建并切换到cczeng分支
# Switched to a new branch 'cczeng'
```

 此时已经创建好了一个属于你的分支，但是这个时候你去看文件发现没有任何的变化。稍后我们会了解 `master`分支和`cczeng`分支是完全独立开来的。  



我们可以使用`git branch` 来查看我们当前位于哪一个分支，在我们创建了属于自己的分之后，切勿在`master`分支下进行任何文件操作。一切都是位于`cczeng`分支进行操作，因为`master`分支是最初的原型，只有你分支完全测试通过即可合并到`master`分支。

```
git branch
 * cczeng
   master
```

前面带有 `*` 号表示当前位于哪一个分支。



我们现在对文件进行修改：

```
Hello 亮!
这是用于测试添加新内容。
这是属于我自己的分支：cczeng
```

我们加入了一条新的信息，接下来我们添加到暂存区。



```
git add .
git commit -m "添加了属于自己的分支"
# [cczeng bbcff95] 添加了属于自己的分支
#  1 file changed, 1 insertion(+)
```



这次的操作，是位于 `cczeng`的分支下。



![git分支](/img/git/git分支.png)



可以看出，位于 `cczeng` 下的日志多了一条，就是我们最新的修改。但是 `master` 下并没有。我们可以使用 `git checkout master` 来切换到主分支查看。

```
git checkout master
# Switched to branch 'master'
```

此时的`1.txt`文件内容：

```
Hello 亮!
这是用于测试添加新内容。
```

而我们之前明明添加了新的内容，但是为什么没有显示？

```
Hello 亮!
这是用于测试添加新内容。
这是属于我自己的分支：cczeng
```

**因为`master`分支和`cczeng`分支是完全独立开的**

正因为如此，我们才可以在不影响项目最初原型的基础上进行任何增加删除修改操作。那么如果我们已经测试通过了，需要把我们的`cczeng` 分支下的内容和 `master`的内容合并呢？



### 分支合并

假设我的任务是开发一个网页的子页面，现在已经测试没有问题了。我需要和原型进行合并了。

`git merge cczeng`即可合并，在`master`分支下使用`git merge cczeng`

```
git merge cczeng
# Updating 8e783ff..bbcff95
# Fast-forward
#  1.txt | 1 +
#  1 file changed, 1 insertion(+)
```

表示已经合并成功，`1.txt`文件更新了一行内容。

有时候，事情往往不是我们想象的那么简单。当项目大起来了，可能涉及到每个人都修改了同一个文件，那么这个时候就会导致冲突。



### 冲突

我们再次切换到cczeng分支。

```
git checkout cczeng #如果已经在这个分支则不需要切换，使用git branch来查看当前位于哪个分支
```

修改`1.txt`文件：

```
Hello 亮!
这是用于测试冲突的修改。
这是属于我自己的分支：cczeng
```

我们修改了第二行，接下来继续添加到暂存区。

```
git add .
git commit -m "添加了测试冲突"
git checkout master
```

现在我们位于`master` 分支下，我们在`master`分之下也进行修改。

```
Hello 亮!
这是属于我自己的分支：cczeng
```

暂存

```
git add .
git commit -m "添加了master测试冲突"
```

切换到`cczeng`分支

```
git checkout cczeng
git merge master #合并分支
```

由于项目太简单，这里没有git自动合并成功了。但是当项目大起来的时候，多个人同时修改了一个文件往往git无法自动合并成功，这时候需要手动合并。



这里我找一个来自网络的例子：

```
这是第一行
这是第二行
<<<<<<< HEAD
commit 记录索引的状态
=======
pull 取得远端数据库的内容
>>>>>>> issue3
```

这里的 `<<<<<<<<<` `==========` `>>>>>>>>>>>`表示有冲突，从 `<<<<<<<<<`到 `==========` 表示你当前的内容， `==========` 到`>>>>>>>>>>>`表示合并的那个分支或者远程仓库的内容。此时需要手动进行处理。

可选择保留自己分支的内容或者合并分支的内容，

```
这是第一行
这是第二行
pull 取得远端数据库的内容
```

这里就算处理好了冲突。**真实项目中往往不止一个文件会发生冲突。**



# 远程仓库

在此之前我们已经学会了如何在本地仓库进行git的版本管理。

那么如果需要多人协作开发并且需要分布式开发，也就是在公司的电脑上开发好了，但是家里笔记本却没有最新的内容。如何在多个设备上都保持最新的呢？这里就需要使用一个代码仓库了。



可用的代码仓库有很多，全球最大最出名的当然是  [github](https://github.com)了。 

其余的还有很多，例如 [coding](https://coding.net)、 [码云](https://git.oschina.net)等



由于 github 没有免费的私有项目，所以本次不对 github进行介绍，可自行百度了解。

本次使用的是码云，是一个国内的免费仓库，不限制私有仓库和公有仓库的数量，在国内的速度还算可以。



接下来我们继续来了解怎么使用码云作为我们的远程仓库。



## [码云](http://git.oschina.net/)——开源中国

先去[码云官网](http://git.oschina.net/) 注册一个账号。



然后选择右上角的 `+` 号选择 `新建项目` :

![新建项目](/img/git/new.png)

接下来填写基本的信息

![填写项目信息](/img/git/new1.png)

![填写项目信息](/img/git/new2.png)



点击创建，就已经创建好了一个私有项目了。

![创建完成](/img/git/new3.png)

但是这个时候什么都还没有。我们选择上图的`克隆/下载`按钮。

![克隆](/img/git/new4.png)



点击复制 `https` 。接下来就可以使用git来添加远程仓库了。  



首先我们要学会看官方的使用手册。



** [马云平台帮助文档](http://git.mydoc.io/?t=154710)**  

打开上面的链接，进入码云平台帮助文档。在`侧边码云使用手册` 找到 [新手小白如何快速的在码云平台注册账号并完成第一次提交](http://git.mydoc.io/?t=154701) 这里有更详细的介绍。

接下来我们打开git，进入我们之前那个项目目录。添加远程仓库。



```
git config --global user.name "你的名字或昵称"
git config --global user.email "你的邮箱"
# 下面是添加远程仓库，需要使用之前在码云创建好的项目选择下载/克隆，复制https链接
git remote add origin <你的项目地址>    #origin 名称可改成其他，当有多个远程仓库的时候使用这个名称来区分
```

此时已经添加完成。接下来即可完成第一次提交。



```
git pull origin master #拉取一次远程仓库
git add .
git commit -m "第一次提交"
git push origin master  #这里为提交到远程仓库，注意提交的分支为master
```



接下来输入账号密码即可完成第一次提交，可打开浏览器刷新一次查看码云上是否已经更新。



** 教程到这已经差不多结束** 详细的请查看** [马云平台帮助文档](http://git.mydoc.io/?t=154710)** 



# 结束

这里提供一个我自己整理的一些常用的 git 使用命令。如有需要可点击下方百度云下载链接(附带《git小书》)。



链接:http://pan.baidu.com/s/1i5sw7nZ  密码:834k



```
初始化本地仓库：
	git init

查看本地仓库的变更状态：
	git status

添加本地暂存（托管）文件：
	git add fileName	//指定文件名
	git add .			//全部
	git add *.md		//通配符匹配

提交被托管的文件变化到本地仓库：
	git commit -m "本次更改的描述"
查看本地历史提交日志：
	git log
回退到对应版本：
	--hard：表示当前版本
	HEAD^：上一个版本，HEAD^^为上上个版本，HEAD~100表示前100个版本
	git reset --head HEAD^
记录每一次命令：
	git reflog

添加一个远程地址并起名叫origin：
	git remote add origin https://github.com/(地址)

查看现有的远程列表：
	git remote -v

提交本地仓库的记录到远程仓库：
	git push -u origin master(主分支)

拉取远程仓库：
	git pull origin master

git pull 提示冲突：
	git pull origin 分支

	//出现错误

	git stash  缓存起来

	git pull origin 分支

	git stash pop //还原

	git stash clear

 Git如何进行分支管理？
     1、创建分支
     创建分支很简单：git branch <分支名>
     2、切换分支
     git checkout <分支名>
     该语句和上一个语句可以和起来用一个语句表示：git checkout -b <分支名>
     3、分支合并
     比如，如果要将开发中的分支（develop），合并到稳定分支（master），
     首先切换的master分支：git checkout master。
     然后执行合并操作：git merge develop。
     如果有冲突，会提示你，调用git status查看冲突文件。
     解决冲突，然后调用git add或git rm将解决后的文件暂存。
     所有冲突解决后，git commit 提交更改。
     4、分支衍合
     分支衍合和分支合并的差别在于，分支衍合不会保留合并的日志，不留痕迹，而 分支合并则会保留合并的日志。
     要将开发中的分支（develop），衍合到稳定分支（master）。
     首先切换的master分支：git checkout master。
     然后执行衍和操作：git rebase develop。
     如果有冲突，会提示你，调用git status查看冲突文件。
     解决冲突，然后调用git add或git rm将解决后的文件暂存。
     所有冲突解决后，git rebase --continue 提交更改。
     5、删除分支
     执行git branch -d <分支名>
     如果该分支没有合并到主分支会报错，可以用以下命令强制删除git branch -D <分支名>

```





** 感谢您的阅读 ** 由于个人能力可能内容不完整，也可能有错。请谅解。 

