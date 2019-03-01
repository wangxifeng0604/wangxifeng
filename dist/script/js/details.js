;(function($){
	//渲染主页
	var picid = location.search.substring(1).split('=')[1];
	console.log(picid);
	$.ajax({
		url:'http://10.31.162.55/mkf/php/detail.php',
		data:{
			sid:picid
		},
		dataType:'json',
	}).done(function(data){
		console.log(data);
		$('.xfdjtu').attr('src',data.url);
		$('.dfdjtu').attr('src',data.url);
		$('.xfdjtu').attr('sid',data.sid);
		$('.sahngptitlt').html(data.title);
		$('.wangyetitle').html(data.title);
		$('.toubutitle').html(data.title)
		$('.shangpcost').html(data.price)
		var arr = data.urls.split(',');
		console.log(arr);
		var str = '';
		$.each(arr,function(idnex,value){
			str+='<li><img src="' + value + '"/></li>';
		});
		$('.smallicoul').html(str);
		$('.smallicoul').find('li').eq(0).addClass('onmouseimg');
		$('.onmouseimg').css({'width':'48px','height':'48px','border':'1px solid red'});
	});
	
	
	
	//放大镜效果
	$('.smallfdj').width($('.smallimg').width()*$('.bigimg').width()/$('.dfdjtu').width());
	$('.smallfdj').height($('.smallimg').height()*$('.bigimg').height()/$('.dfdjtu').height());
	var bili=$('.dfdjtu').width()/$('.smallimg').width();
	$('.smallimg').hover(function(){
		console.log(1);
		$('.smallfdj').css('visibility','visible');
		$('.bigimg').css('visibility','visible');
		$(this).on('mousemove',function(ev){
			var $left=ev.pageX-$('.xqmainbox').offset().left-$('.smallfdj').width()/2;
			var $top=ev.pageY-$('.xqmainbox').offset().top-$('.smallfdj').height()/2;
			if($left<0){
				$left=0;
			}else if($left>=$('.smallimg').width()-$('.smallfdj').width()){
				$left=$('.smallimg').width()-$('.smallfdj').width();
			}
			if($top<0){
				$top=0;
			}else if($top>=$('.smallimg').height()-$('.smallfdj').height()){
				$top=$('.smallimg').height()-$('.smallfdj').height();
			}
			
			$('.smallfdj').css('left',$left);
			$('.smallfdj').css('top',$top);
			$('.dfdjtu').css('left',-$left*bili);
			$('.dfdjtu').css('top',-$top*bili);
		})
	},function(){
		$('.smallfdj').css('visibility','hidden');
		$('.bigimg').css('visibility','hidden');
	});
	
		/* $('.smallicoul').on('ready','li',function(){
			$('.smallicoul li:first').addClass('onmouseimg');
			$('.onmouseimg').css({'width':'48px','height':'48px','border':'1px solid red'});
		}); */
		
		
		//放大镜小图切换
		$('.smallicoul').on('mouseover','li',function(){
			var $imgurl=$(this).find('img').attr('src');
			$(this).addClass('onmouseimg').siblings('li').removeClass('onmouseimg');
			$('.onmouseimg').css({'width':'48px','height':'48px','border':'1px solid red'});
			$('.smallicoul').children().not('.onmouseimg').css({'width':'50px','height':'50px','border':'none'});
			$('.dfdjtu').attr('src',$imgurl);
			$('.xfdjtu').attr('src',$imgurl);
		})
		
		
		
		$('.xqbuychoosejia').on('click',function(){
			$zhi=$('.xqbuychooseipt').attr('value');
			$('.xqbuychooseipt').attr('value',parseInt($zhi)+1);
		})
		
		$('.xqbuychoosejian').on('click',function(){
			$zhi=$('.xqbuychooseipt').attr('value');
			if($zhi>1){
				$('.xqbuychooseipt').attr('value',parseInt($zhi)-1);
			}else{
				$('.xqbuychooseipt').attr('value',1);
			}
		
		})
		
		//添加cookie
		
		var $sid = location.search.substring(1).split('=')[1];//获取地址栏sid
		console.log($sid);
		var sidarr=[];//定义两个数组用来存储sid和数量
		var numarr=[];
		
		function  cookietoarray(){
			if(getcookie('cooksid') && getcookie('cookienum')){//如果存在cookie将cookie拆分成数组
				sidarr=getcookie('cooksid').split(',')
				numarr=getcookie('cookienum').split(',')
			}
		}
		
		$('.jiarucart').on('click',function(){//单击加入购物车
			cookietoarray();
			if($.inArray($sid,sidarr)==-1){//当前cookie不存在
				sidarr.push($sid);//将新的sid和num push进sidarr和numarr
				numarr.push($('.xqbuychooseipt').val());
				addcookie('cooksid',sidarr.toString(),7);//将arr转换成字符串存进cookie七天
				addcookie('cookienum',numarr.toString(),7);

			}else{//当前cookie存在
				var newnum=parseInt($('.xqbuychooseipt').val())+parseInt(numarr[$.inArray($sid,sidarr)]);
				numarr[$.inArray($sid,sidarr)]=newnum;
				addcookie('cookienum',numarr.toString(),7)
			}
		});
})(jQuery)