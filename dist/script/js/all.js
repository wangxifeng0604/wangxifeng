;(function($){
		//二级导航
		var $li=$(".nav_2leftul li")
		$li.hover(function(){
				$(this).find(".listbox").css({"left":"5px"});
				
				$posix=($(this).find('.listico')
				.css("background-position-x").slice(0,1)-20)+'px';
				
				$(this).find('.listico')
				.css({"background-position-x":$posix});
				
				$(this).find("h4 a").css({"color":"#d00"});
				
				$(this).find(".erjinav").css({"display":"block"});
			
			},function(){
			
				$(this).find('.listico')
				.css({"background-position-x":'0'});
				
				$(this).find(".listbox").css({"left":"0px"});
				
				$(this).find("h4 a").css({"color":"#333"});
				
				$(this).find(".erjinav").css({"display":"none"});
		});
	
	
	
	
		//轮播图
		
		
		var $bannerbox= $('.nav_2banner');
		var $bannerbtns = $('.nav_2bannerbtn li');
		var $bannerimgs = $('.nav_2bannerimg li');
		var $bannerleft = $('.nav_2bannerleft');
		var $bannerright = $('.nav_2bannerright');
		var $autotimer = null;
		var $num = 0;
		
		$bannerbox.hover(function(){
			$bannerleft.show();
			$bannerright.show();
			clearInterval($autotimer);
		},function(){
			$bannerleft.hide();
			$bannerright.hide();
			$autotimer=setInterval(function(){
				$bannerright.click();
			},2000);
		});
		
		
		$bannerbtns.on('click',function(){
			$num=$(this).index();
			qiehuan();
		});
		
		$bannerleft.on('click',function(){
			$num--;
			if($num<0){
				$num=$bannerbtns.length-1;
			}
			qiehuan();
		});
		
		$bannerright.on('click',function(){
			$num++;
			if($num>$bannerbtns.length-1){
				$num=0;
			}
			qiehuan();
		});
		

		function qiehuan() {
			$bannerbtns.eq($num).addClass('active').siblings('li').removeClass('active');
			$bannerimgs.eq($num).stop(true).animate({
				opacity:1
			}).siblings('li').stop(true).animate({
				opacity:0
			})
		}
		
		$autotimer=setInterval(function(){
			$bannerright.click();
		},5000);
		
		
		//幻灯片
		var $huandengbox=$('.swiper');
		var $huandengpian=$('.swiperbox');
		var $huandeng=$('.swiperbox_1');
		var $huandengleft=$('.swipernext');
		var $huandengright=$(".swiperorev");
		var $hdtimer=null;
		var $hdaototimer=null;
		
		var $huandengwidth=parseFloat($huandeng.css('width'))*4+2;
		var $dqposi=$huandengpian.css('left');
		
		$huandengbox.hover(function(){
			$huandengleft.animate({
				opacity:1
			})
			$huandengright.animate({
				opacity:1
			})
			clearInterval($hdaototimer);
		},function(){
			$huandengleft.animate({
				opacity:0.5
			})
			$huandengright.animate({
				opacity:0.5
			})
			$hdaototimer=setInterval(function(){
				$huandengleft.click();
			},3000)
		})
		
		$huandengleft.on('click',function(){
			
			$dqposi=(parseInt($huandengpian.css('left'))-$huandengwidth)+"px";
			
			if(parseInt($dqposi)<=-$huandengwidth*3){
				$huandengpian.css({'left':'0px'})
				$dqposi=(parseInt($huandengpian.css('left'))-$huandengwidth)+"px";
			}
				$huandengpian.stop(true).animate({
				left:$dqposi
			})
			
		
			
			
		})
		
		$huandengright.on('click',function(){
			
				$dqposi=(parseInt($huandengpian.css('left'))+$huandengwidth)+"px";
			if(parseInt($dqposi)>0){
				$huandengpian.css({'left':'-'+($huandengwidth*2+'px')})
				$dqposi=(parseInt($huandengpian.css('left'))+$huandengwidth)+"px";
			}
				$huandengpian.stop(true).animate({
				left:$dqposi
			})
			
	
		})
		
		$hdaototimer=setInterval(function(){
			$huandengleft.click();
		},3000)
		
		
		//#F32613;
		var $cnavhv=$('.cnav')
		$cnavhv.find('a').hover(function(){
			$(this).css({"background-color":"#F32613"});
		},function(){
			$(this).css({"background-color":"black"});
		})
		
		//gotop
		$gotop=$('.variation2 a');
		$gotop.on('click',function(){
			$('html,body').animate({
				scrollTop:0
			});
		});
		
})(jQuery);