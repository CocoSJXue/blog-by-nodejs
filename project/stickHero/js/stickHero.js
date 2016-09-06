$(function(){
	var $section = $('section');
	var $scoreBox = $('#scoreBox');
	var $start = $('#start');
	var $loseTips = $('#loseTips');
	var $scores = $('#scores');
	var $mBox = $('#matchManBox');
	var $mMan = $('#matchMan');
	var $pierBox = $('#pierBox');
	var $pier = $('.pier');
	var $stick = $('#stick');
	//记录成功次数
	var score = 0;
	//记录定时器
	var timer = null;
	//记录开始游戏的次数
	var start = 0;
	//记录每次游戏分数
	var arr = [];
	
	//页面初始化
	//初始化火柴人的位置,即第一个树墩的右侧
	$mBox.css({
		left:mRightFn($pier.eq(0))
	});
	$pier.eq(1).css({
		left: desFn($pier.eq(0)),
		width: widthFn()
	})
	$scoreBox.html('0')
	var onOff = false;
	//点击开始
	$start.mousedown(function(e){e.stopPropagation();})
		.mouseup(function(e){e.stopPropagation();})
		.on('click',function(e){
			//如果火柴人已经在运动，点击重新开始无效
			if($section.prop('timer')) return;
			onOff = true;
			var $pier = $('.pier');
			score = 0;
			$scoreBox.html(score)
			//重新开始
			if($start.html() == 'restart'){
				//初始化页面
				$mBox.css({
					left:30,
					bottom:100,
					height:52,
					width:20
				});
				$mMan.prop('src','img/1.jpg');
				$pier.eq(0).css({
					left: 0,
					width: 50
				})
				$pier.eq(1).css({
					left: desFn($pier.eq(0)),
					width: widthFn()
				})
				$stick.css({
					width:3,
					height:0,
					transform:'rotate(0deg)'
				})
				$loseTips.css('display','none');
				//清除定时器
				clearInterval(timer);
			}
			//开始后将按钮内容置空，并变为红色
			$start.html('restart').css({
				'background-color':'red',
				color:'black'
			});
			e.stopPropagation();
		})
		//点击框内出开始按钮外任意位置，进行游戏
		$section.mousedown(function(e){
			if($section.prop('timer')) return;
			if(!onOff) return;
			//每次按下重新获取三个树墩
			var $pier = $('.pier');
			//初始化火柴人的位置,即第一个树墩的右侧
			$mBox.css({
				left:mRightFn($pier.eq(0))
			});
			$stick.css({
				left:parseFloat($pier.eq(0).css('width'))
			})
			
			clearInterval(timer);
			var sH = parseFloat($stick.height());
			//鼠标按下打开定时器，棍子高度增加
			timer = setInterval(function(){
				sH += 5;
				$stick.css({
					width:3,
					height: sH,
					bottom:100
				})
			},100);
		})
		//鼠标抬起
		$section.mouseup(function(e){
			if(!onOff) return;
			if($section.prop('timer')) return;
			$section.prop('timer',true)
			//每次按下重新获取三个树墩
			var $pier = $('.pier');
			//鼠标抬起，棍子倒下，小人src换成动态图，并改变其left值
			$mMan.prop('src','img/2.gif');
			//棍子倒下，将宽高置换
			$stick.css({
				'height': parseFloat($stick.css('width')),
				'width': parseFloat($stick.css('height')),
			})
			
			//抬起时，清除定时器
			clearInterval(timer);
			timer = setInterval(function(){
				var l = parseFloat($mBox.css('left')) + 6;
				//先判断棍子宽度  和  第一个第二个树墩之间的距离
				var stickRL = parseFloat($stick.css('width')) + parseFloat($stick.css('left'));
				var stickW = parseFloat($stick.css('width'));
				var mBoxW = parseFloat($mBox.css('width'));
				
				if(stickW < disXFn($pier.eq(1))){
					//棍子长度小于中间间隙时
					if(l + 5 >= stickRL){
						loseFn();
						//以棍子left为圆心，直角运动90度
						$stick.css('transform','rotate(90deg)');
					}else{
						$section.prop('timer',true)
					}
				}else if(stickW > disXFn($pier.eq(1)) + parseFloat($pier.eq(1).css('width'))){
					//棍子长度大于第二个树墩的右侧时
					if(l + 5 >= stickRL){
						loseFn();
						//棍子消失
						$stick.css({
							'width':0,
							'height':0
						})
					}else{
						$section.prop('timer',true)
					}
				}else{
					//棍子宽度刚刚好,完成加分
					//小人移动，当走到第二个树墩右侧时，停下
					if(l >= mRightFn($pier.eq(1))){
						$section.prop('timer',false)
						score++;
						if(score == 1){
							
							start++;
							//记录分数
							$scores.append('<div start="'+start+'">第'+start+'次分数'+score+'</div>')
						}
						
						$scores.children().last().html(score+'分');
						$scores.children().css('background-color','black')
						$scores.children().each(function(i){
							var val = parseFloat($scores.children().eq(i).html());
							arr.push(val);
							arr.sort(function(a,b){
								return b-a;
							})
						})
						
						for (var i = 0; i < $scores.children().length; i++) {
							if(arr[0] == parseFloat($scores.children().eq(i).html())){
								$scores.children().eq(i).css('background-color','red')
							}
						}
						
						
						$scoreBox.html(score)
						clearInterval(timer);
						$stick.css({
							'width':0,
							'height':0
						})
						$mMan.prop('src','img/1.jpg');
						//第三个柱子出现
						$pier.eq(2).css({
							'width':widthFn(),
							'left':desFn2($pier.eq(1)),
						})
						var pier0L = parseFloat($pier.eq(0).css('left'))
						var pier1L = parseFloat($pier.eq(1).css('left'))
						var pier2L = parseFloat($pier.eq(2).css('left'))
						var mBoxL = parseFloat($mBox.css('left'))
						
						$pier.eq(0).animate({'left': pier0L-pier1L},100,'linear');
						$pier.eq(1).animate({'left': 0},100,'linear');
						$pier.eq(2).animate({'left': pier2L-pier1L},100,'linear');
						$mBox.animate({'left': mBoxL-pier1L},100,'linear');
						//将第一个树墩添加到盒子的最后面
						$pierBox.append($pier.eq(0))
					}
				}
				$mBox.css('left', l + 'px');
			},100)
			
		})
	
	
	
	//树墩之间的距离随机，第二个树墩的left值大于50+10，小于一定值
	function desFn(prevPWidth){
		var m = parseFloat(prevPWidth.css('width')) + parseFloat(prevPWidth.css('left'));
		return Math.random()*(300 - m) + m + 10;
//		return 60;
	}
	function desFn2(prevPWidth){
		var m = parseFloat(prevPWidth.css('width')) + parseFloat(prevPWidth.css('left'));
		return Math.random()*(400 - m) + m + 10;
//		return 120;
	}
	//树墩宽度随机，大于10，小于100
	function widthFn(){
		return Math.random()*(100 - 20) + 20;
	}
	//火柴人最后定停下的位置
	function mRightFn($piers){
	return parseFloat($piers.css('left')) + parseFloat($piers.css('width')) - parseFloat($mBox.css('width'));
	}
	//两个树墩之间的距离
	function disXFn($piers){
		return parseFloat($piers.css('left')) - parseFloat($piers.prev().css('width'));
	}
	//失败
	function loseFn(){
		onOff = false;
		score = 0;
		clearInterval(timer);
		$mMan.prop('src','img/1.jpg');
		//火柴人旋转下落，后消失
		$mBox.animate({'rotate':'720','bottom':'0','width':'0','height':'0'},500,'linear');
		$loseTips.css('display','block');
		$section.prop('timer',false);
		start++;
		
	}
	
});
