---
title: 利用shell脚本自动安装软件
date: 2017-08-2 10:58:59
tags:  ["ubuntu","shell"]
comments: true
---

昨两天由于想在ubuntu上配置angular2的环境，在百度上复制了一串把当前用户设置为root的方法，结果导致系统出现问题，无奈尝试了好多遍实在无头绪只好重装（只能怪自己不去系统的学习下linux）。    

在几年前刚接触linux的时候就想让系统自动安装软件了，可是那时候毕竟太年轻，研究无果就放弃了。现在想起来就尝试做了，发现其实很简单。   

<!-- more -->

## 建立一个shell脚本

shell脚本内容以 `#!/bin/sh` 开头：   

```shell
	#!/bin/sh
	
	//...
```
   

如果对shell脚本有兴趣，可阅读[shell编程基础](http://wiki.ubuntu.org.cn/Shell%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80)


## 开始你的表演
  

我们平时安装软件的时候一般有两种方法：   

1. 使用dpkg -i 命令安装.deb包
2. 使用apt-get install 命令安装  

那么我们脚本其实相当于windows下的 `批处理`,只需要往里面写 `安装软件的命令` 即可。   

例如：   

```shell
	sudo add-apt-repository ppa:webupd8team/sublime-text-3 -y
	sudo apt-get install sublime-text-installer -y
```
   

这里后面跟的 `-y` 参数就是解决需要输入回车和输入y进行确定的办法，添加源的时候我们不需要y，但是需要y后面的回车，想来想去我发现这个办法完美解决。   
  

这里贴出代码：   
   
```shell
	#!/bin/sh
	#remove Amazon
	echo "----------------移除亚马逊----------------"
	sudo apt-get remove unity-webapps-common -y
	#windows && ubuntu 双系统时间不同步
	echo "----------------解决双系统时间不同步----------------"
	sudo apt-get install ntpdate -y
	sudo ntpdate time.nist.gov
	sudo hwclock --localtime --systohc

	#sublime text 3
	echo "----------------添加sublime text 3 源----------------"
	sudo add-apt-repository ppa:webupd8team/sublime-text-3 -y
	#截屏工具shutter
	echo "----------------添加shutter源----------------"
	sudo add-apt-repository ppa:shutter/ppa -y
	#安装种子下载软件
	echo "----------------添加qbittorrent源----------------"
	sudo add-apt-repository ppa:hydr0g3n/qbittorrent-stable -y
	#安装ftp工具
	echo "----------------添加FileZilla源----------------"
	sudo add-apt-repository ppa:n-muench/programs-ppa -y
	#实时监控系统性能
	echo "----------------添加系统监控源----------------"
	sudo add-apt-repository ppa:fossfreedom/indicator-sysmonitor -y
	#mac theme
	echo "----------------添加MAC主题源----------------"
	sudo add-apt-repository ppa:noobslab/macbuntu -y
	#Flatabulous主题
	echo "----------------添加Flatabulous主题----------------"
	sudo add-apt-repository ppa:noobslab/themes -y
	sudo add-apt-repository ppa:noobslab/icons -y
	#install 
	echo "----------------update更新----------------"
	sudo apt-get update



	#apache2
	echo "----------------安装apache2----------------"
	sudo apt-get install apache2 apache2-doc -y
	sudo /etc/init.d/apache2 start
	#sublime text 3
	echo "----------------安装sublime text 3----------------"
	sudo apt-get install sublime-text-installer -y
	#shutter
	echo "----------------安装shutter----------------"
	sudo apt-get install shutter -y
	#indicator-sysmonitor
	echo "----------------安装indicator-sysmonitor----------------"
	sudo apt-get install indicator-sysmonitor -y
	#vim
	echo "----------------安装vim----------------"
	sudo apt-get install vim -y
	#git
	echo "----------------安装git----------------"
	sudo apt-get install git -y
	#ettercap-graphical
	echo "----------------安装ettercap----------------"
	sudo apt-get install ettercap-graphical -y
	#nmap
	echo "----------------安装nmap----------------"
	sudo apt-get install nmap -y
	#安装种子下载软件
	echo "----------------安装qbittorrent----------------"
	sudo apt-get install qbittorrent -y
	#安装ftp工具
	echo "----------------安装FileZilla----------------"
	sudo apt-get install filezilla -y
	#mac theme
	echo "----------------安装MAC theme----------------"
	sudo apt-get install macbuntu-os-icons-lts-v7 -y
	sudo apt-get install macbuntu-os-ithemes-lts-v7 -y
	#Flatabulous
	echo "----------------安装Flatabulous theme----------------"
	sudo apt-get install flatabulous-theme -y
	sudo apt-get install ultra-flat-icons -y
	#slingscold
	echo "----------------安装slingscold----------------"
	sudo apt-get install slingscold -y
	#albert
	echo "----------------安装albert----------------"
	sudo apt-get install albert -y
	#plank
	echo "----------------安装plank----------------"
	sudo apt-get install plank -y
	sudo apt-get install macbuntu-os-plank-theme-lts-v7 -y
	#tweak tool
	echo "----------------安装tweak tool----------------"
	sudo apt-get install unity-tweak-tool -y
	sudo apt-get install gnome-tweak-tool -y
	#mac font
	echo "----------------安装MAC FONT----------------"
	wget -O mac-fonts.zip http://drive.noobslab.com/data/Mac/macfonts.zip
	sudo unzip mac-fonts.zip -d /usr/share/fonts -y
	rm mac-fonts.zip
	sudo fc-cache -f -v


	#半自动安装
	#需要软件包deb支持
	echo "----------------安装deb包----------------"
	#网易云
	echo "----------------安装网易云----------------"
	sudo dpkg -i netease-cloud-music_1.0.0-2_amd64_ubuntu16.04.deb
	#ssr
	echo "----------------安装ssr----------------"
	sudo dpkg -i electron-ssr_0.1.2-21_amd64.deb
	unzip shadowsocksr-manyuser.zip
	mv shadowsocksr-manyuser ../
	#天气
	echo "----------------安装天气----------------"
	sudo dpkg -i indicator-weather_13.8.0_all.deb
	#搜狗输入法
	echo "----------------安装搜狗输入法----------------"
	sudo dpkg -i sogoupinyin_2.1.0.0086_amd64.deb
	#chrome
	echo "----------------安装chrome----------------"
	sudo dpkg -i google-chrome-stable_current_amd64.deb
	#virtualbox
	echo "----------------安装虚拟机virtualbox----------------"
	sudo dpkg -i virtualbox-5.0_5.0.20-106931-Ubuntu-xenial_i386.deb
	echo "----------------修复依赖----------------"
	sudo apt-get -f install -y
	#webstorm
	echo "----------------安装webstorm----------------"
	sudo tar -zxvf WebStorm-2017.2.tar.gz
	sudo mv WebStorm-172.3317.70 /opt/
	#使用管道来进行输入密码
	echo "----------------移动webstorm图标到桌面----------------"
	gksu chmod +x WebStorm.desktop
	mv WebStorm.desktop /home/"$USER"/桌面/
	#让sublime text3能输入中文
	echo "----------------让sublime text3能输入中文----------------"
	cd sublime-text-imfix-master
	./sublime-imfix
	cd -
	#nodejs
	echo "----------------安装nodejs----------------"
	tar -xJf node-v8.2.1-linux-x64.tar.xz
	sudo mv node-v8.2.1-linux-x64  /opt/
	echo "----------------为普通用户添加命令----------------"
	sudo ln -s /opt/node-v8.2.1-linux-x64/bin/node /usr/local/bin/node 
	sudo ln -s /opt/node-v8.2.1-linux-x64/bin/npm /usr/local/bin/npm
	#angular
	echo "----------------安装angular-cli----------------"
	npm install -g @angular/cli
	sudo ln -s /opt/node-v8.2.1-linux-x64/bin/ng /usr/local/bin/ng
	#typescript
	echo "----------------安装typescript----------------"
	npm install -g typescript
	sudo ln -s /opt/node-v8.2.1-linux-x64/bin/tsc /usr/local/bin/tsc
	#hexo-cli
	echo "----------------安装hexo----------------"
	npm install -g hexo
	sudo ln -s /opt/node-v8.2.1-linux-x64/bin/hexo  /usr/local/bin/hexo

	echo "----------------检查版本----------------"
	nodejs -v
	npm -v
	ng -v
	tsc -v
	hexo -v
	#update
	echo "----------------执行更新，修复依赖----------------"
	sudo apt-get update
	sudo apt-get -f install -y

	#启动一次webstrom
	echo "----------------尝试启动webstorm,启动完成后请手动关闭,下面是激活网址----------------"
	echo "----------------http://idea.iteblog.com/key.php"
	cd /opt/WebStorm-172.3317.70/bin/
	./webstorm.sh
	echo "----------------启动性能监控----------------"
	#性能启动监控
	indicator-sysmonitor &

	echo "----------------------------------------------------------------"
	echo "安装完成"
	echo "apache2路径: /var/www/html/"
	echo "请手动设置ssr的路径 /home/$USER/shadowsocksr-manyuser/shadowsocksr"
	echo "请手动设置主题"
	echo "请自行安装sublime text 3 的软件包"
	echo "请自行添加截图快捷键：系统设置——键盘——自定义快捷键——命令:shutter -s"
	echo "请自行删除dl.google源(更新chrome)用的，不删除的话 apt-get update 的时候会卡在那"
	echo "import urllib.request,os,hashlib; h = 'df21e130d211cfc94d9b0905775a7c0f' + '1e3d39e33b79698005270310898eea76'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)"
	echo "----------------------------------------------------------------"

```
**注意:** 为了节省时间以及复杂度，我选择安装部分手动下载的软件包，特别是chrome浏览器，如果要在线下载没有科学上网的同学可能就下载不动了。   

**链接: [百度网盘下载链接](https://pan.baidu.com/s/1pLkargf) 密码: nrrg**   
  

想自己改写脚本的同学，请继续往下看，如果只是想用的可以关闭此窗口了。(ps:文件里含有说明)   
   

## 注意事项   

   

下面列出一些注意事项：  

1. 不要切换至root用户，否则会终止脚本(解决办法：可使用expect)
2. sudo apt-get install 的时候可能会出现提示密码，暂时没有想到解决方案(ps:基本不用输入)
3. 添加源的时候会询问按下回车或者Ctrl+C退出，只需要在每一句添加源的后面加入 `-y`参数即可，这里我们只需要y后面的`回车`,即可完美解决。
4. nodejs使用的是官方已经编译好了的，需要手动添加一个软链接来实现普通用户使用：`sudo ln -s /opt/node-v8.2.1-linux-x64/bin/node /usr/local/bin/node` 其中前一个为node命令的目录，后一个为用户的命令目录。
5. 想自己`添加/修改` 安装自己的软件，可自行删除或添加sudo语句，尽量先添加源，全部源添加之后再执行update，再把安装放在update语句之后。   

   

有了这些之后，就不怕重装了。省去了很多麻烦。