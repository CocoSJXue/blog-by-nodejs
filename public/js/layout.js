$(function(){
	//为title添加鼠标移入事件
	var $box3D = $('.box3D');
	$box3D.mouseenter(function(){
		$(this).css({'transform':'rotateX(90deg)'})
	}).mouseleave(function(){
		$(this).css({'transform':'rotateX(0deg)'});
	})
	
	
	
	//为下方nextpage图片添加鼠标移入事件
	var $nextPage = $('#next a');
	$nextPage.mouseenter(function(){
		$nextPage.animate({'backgroundPositionY':'-29px'},300);
	})
	$nextPage.mouseleave(function(){
		$nextPage.animate({'backgroundPositionY':'-3px'},100,function(){
			$nextPage.css('backgroundPositionY','-63px');
		});
	})
	
})
