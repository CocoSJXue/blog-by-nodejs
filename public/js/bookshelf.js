$(function(){
//	'use strict'; 
	var $bookMain = $('#bookMain');
	var $bookCont = $('#bookMain ul');
	var $bookMainLi = $('#bookMain li');
	var $cancel = $('#cancel')
	var $kDetailBg = $('.kDetailBg');
	var n = 0;
	var $scrollBox = $('#scrollBox');
	var $scroll = $('#scroll');
	
	$bookMainLi.click(function(e){
		var title = $(this).find("img").attr("alt");
		var href = $(this).find("img").attr("href");
		var src = $(this).find("img").attr("src");
		$kDetailBg.css({'width':($(window).width()),'height':($(window).height())});
		$kDetailBg.css({'display':'block'}).offset({'left':0,'top':0});
		$kDetailBg.html(`<div class="bookDown">
							<img src="${src}" alt="${title}"/>
							<span>${title}</span>
							<a href=${href} target="_blank">PDF下载</a>
							<div class="cancel">×</div>
						</div>`)
		$kDetailBg.find(".bookDown").css({
			"top":($(window).height() - $kDetailBg.find(".bookDown").height())/2,
			"left":($(window).width() - $kDetailBg.find(".bookDown").width())/2
		})
		//取消之后隐藏
		$kDetailBg.find(".cancel").click(function(){
			$kDetailBg.css({'display':'none'}).html('');
		})
		//点击之后隐藏
		$kDetailBg.find("a").click(function(){
			$kDetailBg.css({'display':'none'}).html('');
		})
	});
	
	
	var bookMainHeight = parseFloat($bookMain.css('height'));
	var bookContHeight = parseFloat($bookCont.css('height'));
	$scrollBox.css('height',bookMainHeight);
	$scroll.css('height',bookMainHeight*bookMainHeight/bookContHeight);
	if(bookContHeight <= bookMainHeight){
		$bookCont.css('top',0)
		$scrollBox.css('height',0);
		$scroll.css('height',0);
	};
	
	//滚轮事件
	scrollFn();
	//设置滚动条信息
	function scrollFn(){
		// jquery 兼容的滚轮事件
		$(document).on("mousewheel DOMMouseScroll", function (e) {
			var bookMainHeight = parseFloat($bookMain.css('height'));
			var bookContHeight = parseFloat($bookCont.css('height'));
			$scrollBox.css('height',bookMainHeight);
			$scroll.css('height',bookMainHeight*bookMainHeight/bookContHeight);
			var scrollBoxHeight = parseFloat($scrollBox.css('height'));
			var scrollHeight = parseFloat($scroll.css('height'));
			
			if(bookContHeight <= bookMainHeight){
				$bookCont.css('top',0)
				$scrollBox.css('height',0);
				$scroll.css('height',0);
				return;
			};
		    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
		                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
		    if (delta > 0) {
		        // 向上滚
		        n = 2;
		        if(n >= 0){
		    			n = 0
		    		}
		        $bookCont.css('top',n)
		        $scroll.css('top',-n/(bookContHeight-bookMainHeight)*(scrollBoxHeight - scrollHeight))
		    } else if (delta < 0) {
		    		// 向下滚
		    		n -= 2;
		    		if(n <= bookMainHeight - bookContHeight){
		        		n = bookMainHeight - bookContHeight
		        }
		    		$bookCont.css('top',n)
		    		$scroll.css('top',-n/(bookContHeight-bookMainHeight)*(scrollBoxHeight - scrollHeight))
		    }
		});
	}
	
	
})