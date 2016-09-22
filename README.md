# blog-by-nodejs
基于express+swig+jquery+ES6搭建的个人博客社区

简介：

1  项目后端搭建:

使用express框架完成博客网站后端搭建;
使用swig模板引擎完成页面创建渲染;
使用ES6的字符串模板;

2  项目前端搭建:

部分使用了HTML5以及CSS3编写，可能会造成部分浏览器的不兼容;
使用jQuery完成网站前端JS脚本和样式处理;
使用layout.html完成header导航条的以及不同页面相同部分的布局;
使用home.html通过面向对象与canvas绘制home页的切换页面按钮;
使用portfolio.html通过读取json与后端交互完成页面渲染;
使用article.html通过读取json与后端交互完成页面渲染;

3  网站整体功能:

网站为展示性网站，通过点击导航栏可实现页面切换

个人作品：
    该页面展示个人主要作品/项目，点击详情可查看其详细内容，点击图片/作品名字可进入作品实际页面
我之所见：
    该页面展示的是平时工作学习中了解或遇到的小小知识点，点击副导航可分别查看不同类别的知识点，点击不同条目又可见该知识点的具体详细内容
主页：
    该页面主要利用canvas绘制出中心部位图标，实现页面切换
我的书架：
    该页面主要展示我平时收藏的部分书籍，以备不时之需
联系我：
    该页面只要展示我的联系方式


4  运行环境:

在Mac下的node 6.0.0版本,express4.13.1版本运行正常

安装:

安装node(https://nodejs.org/en/);
安装express框架(npm install express -g);
安装mongodb(https://www.mongodb.org/downloads#production)查看说明完成相关环境以及配置搭建;
在当前项目目录中使用npm install命令安装相关模块(如果模块下载速度慢可考虑使用淘宝cnpm镜像进行下载);
运行与使用:

使用命令行工具在该项目目录下使用 npm start 或者 node app.js 运行程序,默认是使用3000端口，可到app.js中将app.listen(1111, 'localhost');运行成功可在命令行看到Blog satrt on port:3000;

