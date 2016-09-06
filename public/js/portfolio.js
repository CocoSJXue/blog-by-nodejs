$(function(){
	var n = 0;
	var $scrollBox = $('#scrollBox');
	var $scroll = $('#scroll');
	var $portfolioMain = $('#portfolioMain');
	var $contList = $('#contList');
	//鼠标移入图片出现遮罩层
	var $imgBox = $('.imgBox');
	$imgBox.mouseenter(function(){
		$(this).children('img').css({'transform':'scale(1.4)'})
		$(this).children('a').animate({'opacity':.7},500)
	})
	$imgBox.mouseleave(function(){
		$(this).children('img').css({'transform':'scale(1)'})
		$(this).children('a').animate({'opacity':0},500)
	})
	//点击详情按钮，查看详情
	var $detailBtn = $('.detailBtn');
	$detailBtn.click(function(){
		$(this).parent().css('display','none');
		$(this).parent().next().css('display','block');
		//此时盒子高度发生变化，更新滚轮事件
		scrollFn();
	});
	//点击收起时，收起详情
	var $deDetailBtn = $('.deDetailBtn');
	$deDetailBtn.click(function(){
		$(this).parent().css('display','none');
		$(this).parent().prev().css('display','block');
		//此时盒子高度发生变化，更新滚轮事件
		scrollFn();
	});
	//滚轮事件
	scrollFn();
	//设置滚动条信息
	function scrollFn(){
		// jquery 兼容的滚轮事件
		$(document).on("mousewheel DOMMouseScroll", function (e) {
			
			var portfolioMainHeight = parseFloat($portfolioMain.css('height'));
			var contListHeight = parseFloat($contList.css('height'));
			$scrollBox.css('height',portfolioMainHeight);
			$scroll.css('height',portfolioMainHeight*portfolioMainHeight/contListHeight);
			var scrollBoxHeight = parseFloat($scrollBox.css('height'));
			var scrollHeight = parseFloat($scroll.css('height'));
			
			if(contListHeight <= portfolioMainHeight){
				$contList.css('top',0)
				$scrollBox.css('height',0);
				$scroll.css('height',0);
				return;
			};
		    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
		                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
		    console.log(delta)
		    if (delta > 0) {
		        // 向上滚
		        n += 2;
		        if(n >= 0){
		    			n = 0
		    		}
		        $contList.css('top',n)
		        $scroll.css('top',-n/(contListHeight-portfolioMainHeight)*(scrollBoxHeight - scrollHeight))
		    } else if (delta < 0) {
		    		// 向下滚
		    		n -= 2;
		    		if(n <= portfolioMainHeight - contListHeight){
		        		n = portfolioMainHeight - contListHeight
		        }
		    		$contList.css('top',n)
		    		$scroll.css('top',-n/(contListHeight-portfolioMainHeight)*(scrollBoxHeight - scrollHeight))
		    }
		});
	}
	
})
