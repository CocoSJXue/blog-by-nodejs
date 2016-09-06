window.onload = function(){
	var opa = document.querySelector('#opa');
	var main = document.querySelector('#main');
	var before = document.querySelector('#before');
	var startbtn = document.querySelector('#startbtn');
	var skip = document.querySelector('#skip');
	var restart = document.querySelector('#restart');
	var pass = 0;
	var n = 0;
	
	var cs = document.querySelector('#cs');
	var oGs = cs.getContext('2d');
	drawStart();
	function drawStart(){
		//绘制开始图标
		jc.start('cs',true);
		jc.line([[30,10],[80,35],[30,60]],'#333',1);
		jc.text('关卡：'+pass,20,85,'#330').name('txt1');
		jc('.txt1').font('16px Times New Roman')
		jc.start('cs');
	}
	
		
	startbtn.onclick = function(){
		before.style.left = -window.innerWidth/2 + 'px';
		clearInterval(opa.timer1);
		opa.timer1 = setInterval(function(){
			n -= 15
			opa.style.left = n + 'px';
			if(opa.offsetLeft <= -window.innerWidth){
				clearInterval(opa.timer1);
			}
		},50);
		//游戏区域
		drawFn();
		balls();
		//让已存在的小球运动
		moveFn();
	}
	
	
	//获取canvas标签和绘图环境
	function drawFn(){
		var c1 = document.querySelector('#c1');
		var oG = c1.getContext('2d');
		//绘制中心白圆
		jc.start('c1',true);
		jc.circle(150,150,45,'#fff',1);
		jc.start('c1');
		//绘制下方发射小球
		jc.circle(150,500,8,'#fff',1).name('new1');
	}
	//绘制小球
	function balls(){
		jc.line([[150,150],[150,300]],'#fff').name('lineMove');
		jc.circle(150,293,8,'#fff',1).name('cicle1');
	}
	//让已存在的小球运动
	function moveFn(){
		animate.call(jc('.lineMove'));
		animate.call(jc('.cicle1'));
	    function animate(){
	        this.animate({rotate:{angle:360,x:150,y:150}},4000,function(){
	            animate.call(this);
	        });
	    }
	}
	
	
	main.onclick = function(e){
		jc.circle(150,500,8,'#fff',1).name('new');
		jc('.new').translateTo(150,293,100,function(){
			var ele = jc('.cicle1').elements;
			if(ele.length >= 10){
				jc.text('YOU WIN!',70,40,'#f00').name('txt2');
				jc.text('分数：'+(ele.length),70,80,'#f00').name('txt2');
				jc('.txt2').font('30px Times New Roman')
				jc(".lineMove").stop();
				jc(".cicle1").stop();
				
				pass++;
				//将开始按钮的画布清空
				jc.clear('cs');
				drawStart();
				
				clearInterval(opa.timer1);
				opa.timer1 = setInterval(function(){
					n += 15
					before.style.left = n + (window.innerWidth - before.offsetWidth)/2 + 'px';
					opa.style.left = n + 'px';
					if(opa.offsetLeft >= 0){
						clearInterval(opa.timer1);
						n = 0;
						//将动画的话布清空
						jc.clear('c1');
					}
				},30);
				
				return;
			}
			for (var i = 0; i < ele.length; i++) {
				var pos = ele[i].position();
				var disx = Math.abs(pos.x - 150);
				var disy = Math.abs(pos.y - 293);
				var disy2 = Math.abs(pos.y - 301);
				//失败！！！
				//判断当前小球与已有小球是否接触？？？，接触就gameover，不接触就继续
				if((disx*disx + disy*disy) <= 16*16 && (disx*disx + disy2*disy2) <= 16*16){
					jc.text('GAME OVER!',70,40,'#f00').name('txt2');
					jc.text('分数：'+(ele.length),70,80,'#f00').name('txt2');
					jc('.txt2').font('30px Times New Roman')
					jc(".lineMove").stop();
					jc(".cicle1").stop();
					
					clearInterval(opa.timer1);
					opa.timer1 = setInterval(function(){
						n += 15
						before.style.left = n + (window.innerWidth - before.offsetWidth)/2 + 'px';
						opa.style.left = n + 'px';
						if(opa.offsetLeft >= 0){
							clearInterval(opa.timer1);
							n = 0;
							//将动画的话布清空
							jc.clear('c1');
						}
					},50);
					return;
				}
			}
			
			jc(".lineMove").stop();
			jc(".cicle1").stop();
			balls();
			//让已存在的小球运动
			moveFn();
			jc('.new').del();
		})
		e.defaultPrevented();
		return false;
	}

}
