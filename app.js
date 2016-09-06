/**
 * Created by 毅 on 2016/8/22.
 * 应用的初始化运行入口文件
 */

var express = require('express');
var swig = require('swig');
var app = express();
var fs = require('fs');

//读取JSON数据
var portfolioData = JSON.parse(fs.readFileSync('./data/portfolio.json').toString());
var articleData = JSON.parse( fs.readFileSync('./data/article.json').toString().replace(/\n/g, '') );
var bookshelfData = JSON.parse( fs.readFileSync('./data/bookshelf.json').toString().replace(/\n/g, '') );


/*
* 应用数据
* */
var data;

/*
* 中间件
* */
app.use(function(req, res, next) {
    data = {
    		portfolioData:portfolioData,
    		articleData:articleData,
    		bookshelfData:bookshelfData,
        route_path: '/'
    };
    next();
});

//静态资源托管设置
app.use( '/public', express.static('public') );
app.use( '/project', express.static('project') );

//模板引擎设置
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
swig.setDefaults({cache: false});


/*
* 路由
* ******************************************************/

//首页
app.get('/', function(req, res) {
	data.route_path = '/';
    res.render('home', data);
});

//注册
app.get('/portfolio', function(req, res) {
    data.route_path = '/portfolio';
    res.render('portfolio', data);
});

//文章
app.get('/article', function(req, res) {
    data.route_path = '/article';
    res.render('article', data);
});
//我的书架
app.get('/bookshelf', function(req, res) {
    data.route_path = '/bookshelf';
    res.render('bookshelf', data);
});
//联系我
app.get('/contact', function(req, res) {
    data.route_path = '/contact';
    res.render('contact', data);
});

//开启服务（监听）
app.listen(1111, 'localhost');
console.log('服务器已经开启成功');