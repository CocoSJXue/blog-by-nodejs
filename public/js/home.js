$(function(){
	$content = $('#content');
	$content.html('<canvas id="homeMain" width="350" height="350"></canvas>');
	
	var arrWord = ['薛素娟','的个人主页','TO','PORTFOLIO']
	
	var oc = document.querySelector('#homeMain');
	var oG = oc.getContext('2d');
	dragCircle('rgba(100,100,100,.4)','rgb(150,150,150)',175,168);
	//文字部分
	wordFn('italic 40px Courier New',arrWord[0],arrWord[1],80,160)
	//下一页图标
	nextIcon(280);
	function dragCircle(color1,color2,r1,r2){
		oG.save();
		oG.beginPath();
		oG.fillStyle = color1;
		oG.arc(175,175,r1,0,360*Math.PI/180,false);
		oG.fill();
		oG.closePath();
		oG.restore();
		
		oG.save();
		oG.beginPath();
		oG.strokeStyle = color2;
		oG.arc(175,175,r2,0,360*Math.PI/180,false);
		oG.stroke();
		oG.closePath();
		oG.restore();
	}
	
	function wordFn(font,str1,str2,top1,top2){
		oG.font = font;
		oG.fillStyle = 'white';
		//获得文字宽度，没有高度
		var w1 = oG.measureText(str1).width;
		var w2 = oG.measureText(str2).width;
		//设置文字居中，水平居中，竖直居中
		oG.fillText(str1,(oc.width-w1)/2,top1);
		oG.fillText(str2,(oc.width-w2)/2,top2);
	}
	//下一页图标
	function nextIcon(t){
		oG.save();
		oG.beginPath();
		oG.fillStyle = 'rgba(141,168,60,1)';
		oG.arc(175,t,20,0,360*Math.PI/180,false);
		oG.fill();
		oG.closePath();
		oG.restore();
		
		oG.save();
		oG.beginPath();
		oG.fillStyle = 'black'
		oG.moveTo(175,t+3);
		oG.lineTo(167,t-2)
		oG.lineTo(175,t+8)
		oG.lineTo(183,t-2)
		oG.closePath();
		oG.fill();
		oG.restore();
	}
	
	oc.onmouseenter = function(){
//		$content.append('<a class="toPortfolio" href="/portfolio"></a>');
		
		oG.clearRect(0,0,oc.width,oc.height);
		dragCircle('rgba(141,168,60,1)','rgb(200,200,150)',110,103);
		//文字部分
		wordFn('italic 30px Courier New',arrWord[2],arrWord[3],120,160)
		//下一页图标
		nextIcon(220);
	}
	oc.onmouseout = function(){
		oG.clearRect(0,0,oc.width,oc.height);
		dragCircle('rgba(100,100,100,.4)','rgb(150,150,150)',175,168);
		//文字部分
		wordFn('italic 40px Courier New',arrWord[0],arrWord[1],80,160)
		//下一页图标
		nextIcon(270);
	}
	
	oc.onclick = function(){
		//页面跳转
		window.location = window.location + 'portfolio'
	}
	
	
})
