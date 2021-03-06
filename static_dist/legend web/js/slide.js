/*文字滚动*/
$(function(){
	var _wrap=$('ul.line');
	var _interval=2000;
	var _moving;
	_wrap.hover(function(){
		clearInterval(_moving);
	},function(){
		_moving=setInterval(function(){
			var _field=_wrap.find('li:first');
			var _h=_field.height();
			_field.animate({marginTop:-_h+'px'},600,function(){
				_field.css('marginTop',0).appendTo(_wrap);
			})
		},_interval)
	}).trigger('mouseleave');
});

/*图片滚动*/
(function($){
	$.fn.Slide=function(options){
		var opts = $.extend({},$.fn.Slide.deflunt,options),
		index=1,targetLi = $("." + opts.claNav + " li", $(this)),//目标对象
		clickNext = $("." + opts.claNav + " .next", $(this)),//点击下一个按钮
		clickPrev = $("." + opts.claNav + ".prev", $(this)),//点击上一个按钮
		ContentBox = $("." + opts.claCon , $(this)),//滚动的对象
		ContentBoxNum=ContentBox.children().size(),//滚动对象的子元素个数
		slideH=ContentBox.children().first().height(),//滚动对象的子元素个数高度，相当于滚动的高度
		slideW=ContentBox.children().first().width(),//滚动对象的子元素宽度，相当于滚动的宽度
		autoPlay,slideWH;
		if(opts.effect=="scroolY"||opts.effect=="scroolTxt"){
			slideWH=slideH;
		}else if(opts.effect=="scroolX"||opts.effect=="scroolLoop"){
			ContentBox.css("width",ContentBoxNum*slideW);
			slideWH=slideW;
		}else if(opts.effect=="fade"){
			ContentBox.children().first().css("z-index","1");
		}
		
		var $this=$(this);
		//滚动函数
		var doPlay=function(){
			$.fn.Slide.effect[opts.effect](ContentBox, targetLi, index, slideWH, opts);
			index++;
			if (index*opts.steps >= ContentBoxNum) {
				index = 0;
			}
		};
		clickNext.click(function(event){
			$.fn.Slide.effectLoop.scroolLeft(ContentBox, targetLi, index, slideWH, opts,function(){
				for(var i=0;i<opts.steps;i++){
					ContentBox.find("li:first",$this).appendTo(ContentBox);
				}
				ContentBox.css({"left":"0"});
			});
			event.preventDefault();
		});
		clickPrev.click(function(event){
			for(var i=0;i<opts.steps;i++){
				ContentBox.find("li:last").prependTo(ContentBox);
			}
			ContentBox.css({"left":-index*opts.steps*slideW});
			$.fn.Slide.effectLoop.scroolRight(ContentBox, targetLi, index, slideWH, opts);
			event.preventDefault();
		});
		//自动播放
		if (opts.autoPlay) {
			autoPlay = setInterval(doPlay, opts.timer);
			ContentBox.hover(function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
			},function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
				autoPlay=setInterval(doPlay, opts.timer);
			});
		}
		
		//目标事件
		targetLi.hover(function(){
			if(autoPlay){
				clearInterval(autoPlay);
			}
			index=targetLi.index(this);
			window.setTimeout(function(){$.fn.Slide.effect[opts.effect](ContentBox, targetLi, index, slideWH, opts);},200);
			
		},function(){
			if(autoPlay){
				clearInterval(autoPlay);
			}
			autoPlay = setInterval(doPlay, opts.timer);
		});
	};
	$.fn.Slide.deflunt={
		effect : "scroolY",
		autoPlay:true,
		speed : "normal",
		timer : 1000,
		defIndex : 0,
		claNav:"JQ-slide-nav",
		claCon:"JQ-slide-content",
		steps:1
	};
	$.fn.Slide.effectLoop={
		scroolLeft:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.animate({"left":-i*opts.steps*slideW},opts.speed,callback);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		},
		
		scroolRight:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.stop().animate({"left":0},opts.speed,callback);
			
		}
	}
	$.fn.Slide.effect={
		fade:function(contentObj,navObj,i,slideW,opts){
			contentObj.children().eq(i).stop().animate({opacity:1},opts.speed).css({"z-index": "1"}).siblings().animate({opacity: 0},opts.speed).css({"z-index":"0"});
			navObj.eq(i).addClass("on").siblings().removeClass("on");
		},
		scroolTxt:function(contentObj,undefined,i,slideH,opts){
			//alert(i*opts.steps*slideH);
			contentObj.animate({"margin-top":-opts.steps*slideH},opts.speed,function(){
                for( var j=0;j<opts.steps;j++){
                	contentObj.find("li:first").appendTo(contentObj);
                }
                contentObj.css({"margin-top":"0"});
            });
		},
		scroolX:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.stop().animate({"left":-i*opts.steps*slideW},opts.speed,callback);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		},
		scroolY:function(contentObj,navObj,i,slideH,opts){
			contentObj.stop().animate({"top":-i*opts.steps*slideH},opts.speed);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		}
	};
})(jQuery);

$("#temp3").Slide({
	effect : "fade",
    speed : "normal",
    timer : 3000
});
$("#temp4").Slide({
    effect:"scroolX",
    speed:"normal",
    timer:2000,
    steps:1
});