$(function(){
	var $pTitles = $('.pTitle li');
	var $kHtmlMain = $('#kHtmlMain');
	var $kHtml = $('.kHtml');
	var $cancel = $('#cancel')
	
	
	var n = 0;
	var $scrollBox = $('#scrollBox');
	var $scroll = $('#scroll');
	var $kHtmlMain = $('#kHtmlMain');
	
	$pTitles.eq(0).css({'background-color':'rgba(163,135,30,.8)','color':'white'});
	$kHtml.eq(0).css('display','block');
	$pTitles.click(function(e){
		$pTitles.css({'background-color':'palegoldenrod','color':'#666'})
		$(this).css({'background-color':'rgba(163,135,30,.8)','color':'white'});
		//显示当前显示匹配的标签内容
		$kHtml.css('display','none');
		//过滤找到有某class的ul，让其显示
		$kHtml.filter('.' + $(this).html()).css('display','block');
		n = 0;
		//滚轮事件
		scrollFn();
		//单条知识点详情
		datailFn();
	});
	
	datailFn();
	function datailFn(){
		//单条知识点详情
		var $kDetailBg = $('.kDetailBg');
		var $kHtmlLi = $('.kHtml li');
		var $detail = null;
		$kDetailBg.css({'width':($(window).width()),'height':($(window).height())});
		$kHtmlLi.click(function(){
			//取消滚轮事件
			$(document).off("mousewheel DOMMouseScroll", wheelFn)
			
			$detail = $(this).children();
			$detail.css({'display':'block'});
			$detail.offset({'left':$kHtmlMain.offset().left,'top':$kHtmlMain.offset().top});
			$kDetailBg.css({'display':'block'}).offset({'left':0,'top':0});
		})
		$cancel.click(function(){
			$kDetailBg.css({'display':'none'});
			$detail.css({'display':'none'})
			//添加滚轮事件
			$(document).on("mousewheel DOMMouseScroll", wheelFn)
		})
	}
	
	//滚轮事件
	scrollFn();
	//设置滚动条信息
	function scrollFn(){
		var $kHtml = $('.kHtml');
		var kHtmlMainHeight = parseFloat($kHtmlMain.css('height'));
			var kHtmlHeight = parseFloat($kHtml.css('height'));
			$scrollBox.css('height',kHtmlMainHeight);
			$scroll.css('height',kHtmlMainHeight*kHtmlMainHeight/kHtmlHeight);
			var scrollBoxHeight = parseFloat($scrollBox.css('height'));
			var scrollHeight = parseFloat($scroll.css('height'));
			if(kHtmlHeight <= kHtmlMainHeight){
				$kHtml.css('top',0)
				$scrollBox.css('height',0);
				$scroll.css('height',0);
				
				return;
			};
		// jquery 兼容的滚轮事件
		$(document).on("mousewheel DOMMouseScroll", wheelFn)
	}
	
	function wheelFn(e) {
			var kHtmlMainHeight = parseFloat($kHtmlMain.css('height'));
			var kHtmlHeight = parseFloat($kHtml.css('height'));
			$scrollBox.css('height',kHtmlMainHeight);
			$scroll.css('height',kHtmlMainHeight*kHtmlMainHeight/kHtmlHeight);
			var scrollBoxHeight = parseFloat($scrollBox.css('height'));
			var scrollHeight = parseFloat($scroll.css('height'));
			if(kHtmlHeight <= kHtmlMainHeight){
				$kHtml.css('top',0)
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
		        $kHtml.css('top',n)
		        $scroll.css('top',-n/(kHtmlHeight-kHtmlMainHeight)*(scrollBoxHeight - scrollHeight))
		    } else if (delta < 0) {
		    		// 向下滚
		    		n -= 2;
		    		if(n <= kHtmlMainHeight - kHtmlHeight){
		        		n = kHtmlMainHeight - kHtmlHeight
		        }
		    		$kHtml.css('top',n)
		    		$scroll.css('top',-n/(kHtmlHeight-kHtmlMainHeight)*(scrollBoxHeight - scrollHeight))
		    }
		};
	
})


function UUid() {
	/*jshint bitwise:false */
	var i, random;
	var uuid = '';

	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
			.toString(16);
	}

	return uuid;
}
