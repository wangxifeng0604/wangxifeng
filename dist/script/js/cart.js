;(function($){
	function commoditys(sid,num){
		$.ajax({
			url:"http://10.31.162.55/mkf/php/taobaodata.php",
			dataType:'json'
		}).done(function(data){
			$.each(data,function(index,value){
				if(sid==value.sid){
					var clonecommoditys=$('.commodity:hidden').clone(true,true);//克隆隐藏的tr
					clonecommoditys.find('.commodityimg img').attr('src',value.url);
					clonecommoditys.find('.commodityimg img').attr('sid',value.sid);
					clonecommoditys.find('.commodityxq a').html(value.title);
					clonecommoditys.find('.commoditydj em').html(value.price);
					clonecommoditys.find('.commoditynum input').val(num);
					clonecommoditys.find('.commodityxiaoji em').html((value.price*num).toFixed(2));
					clonecommoditys.css('display','table-row');
					clonecommoditys.insertAfter('.dianpu');//将克隆出来的tr添加到第一个tr后面
					totalprice();
				};
			});
		});
	};
	//读取cookie渲染购物车
	if(getcookie('cooksid') && getcookie('cookienum')){
		var sid=getcookie('cooksid').split(',');
		var num=getcookie('cookienum').split(',');
		$.each(sid,function(index,value){//遍历cookie渲染
			commoditys(sid[index],num[index]);
		});
	}
	
	//如果没有cookie就显示空白购物车
	//有就渲染商品
	empty();
	function empty(){
		if(getcookie('cooksid')){
			$('.emptycar').hide();
			$('.shopcarbox').show();
		}else{
			$('.emptycar').show();
			$('.shopcarbox').hide();
		};
	};
	
	
	//计算总价
	function totalprice(){
		var allprice=0;
		$('.commodity:visible').each(function(){
			if($(this).find('input:checkbox').prop('checked')){
				allprice+=parseFloat($(this).find('.commodityxiaoji em').html())
			}
		});
		$('.zongjia').html('￥' + allprice);
	}
	
	
	//全选按钮
	$('.quanxuanbtn').on('change',function(){
		$('.commodity:visible').find('input:checkbox').prop('checked',$(this).prop('checked'));
		totalprice()
	})
	var $inputs=$('.commodity:visible').find('input:checkbox');
	$('tbody').on('input',$inputs,function(){
		if($('.commodity:visible').find('input:checkbox').size()==$('.commodity:visible').find('input:checked').length){
			$('.quanxuanbtn').prop('checked',true);
		}else{
			$('.quanxuanbtn').prop('checked',false);
		}
		totalprice();
	})
	
	
	//数量左右按键改变商品数量
	$('.commoditynumz').on('click',function(){
		var commodityvalue=$(this).parents('.commodity').find('.commoditynum input').val();
		commodityvalue++;
		if(commodityvalue>99){
			commodityvalue=99;
		}
		$(this).parents('.commodity').find('.commoditynum input').val(commodityvalue);
		$(this).parents('.commodity').find('.commodityxiaoji em').html(calcsingleprice($(this)));
		totalprice();
		changecookie($(this));
	})
	
	
	$('.commoditynumj').on('click',function(){
		var commodityvalue=$(this).parents('.commodity').find('.commoditynum input').val();
		commodityvalue--;
		if(commodityvalue<=0){
			commodityvalue=1;
		}
		$(this).parents('.commodity').find('.commoditynum input').val(commodityvalue);
		$(this).parents('.commodity').find('.commodityxiaoji em').html(calcsingleprice($(this)));
		totalprice();
		changecookie($(this));
	})
	
	
	
	//小记计算封装函数
	function calcsingleprice(obj){
		var $xiaojishuliang=parseInt(obj.parents('.commodity').find('.commoditynum input').val());
		var $xiaojijiage=parseFloat(obj.parents('.commodity').find('.commoditydj em').html());
		return ($xiaojishuliang*$xiaojijiage).toFixed(2);
	}
	
	$('.commoditynum input').on('input',function(){
		var reg=/^\d+$/g;
		if(reg.test($(this).val())){
			var $value=$(this).val();
			if($value>99){
				$(this).val(99);
			}else if($value<=0){
				$(this).val(1);
			}else{
				$(this).val($value);
			}
		}else{
			$(this).val(1);
		}
		$(this).parents('.commodity').find('.commodityxiaoji em').html(calcsingleprice($(this)));
		totalprice();
		changecookie($(this));
	})
	
	
	
	
	
	var sidarr=[];
	var numarr=[];
	
	function  cookietoarray(){
		if(getcookie('cooksid') && getcookie('cookienum')){//如果存在cookie将cookie拆分成数组
			sidarr=getcookie('cooksid').split(',')
			numarr=getcookie('cookienum').split(',')
			console.log(numarr)
		}
	}
	
	
	function changecookie(obj){
		cookietoarray()
		var sid=obj.parents('.commodity').find('.commodityimg img').attr('sid');
		numarr[$.inArray(sid,sidarr)]=obj.parents('.commodity').find('.commoditynum input').val();
		addcookie('cookienum',numarr.toString(),7);
	}
	
	$('tbody').on('click','.deletcommoditybtn',function(){
		console.log(1)
		if(window.confirm('确认删除？')){
			$(this).parents('.commodity').remove()
			deletecookie($(this).find('.commodityimg img').attr('sid'),sidarr)
			//window.location.reload(true);
			empty();
		}
		
		
	})
	
	
	function deletecookie(sid){
		cookietoarray();
		var $index=$.inArray(sid,sidarr);
		sidarr.splice($index,1);
		numarr.splice($index,1);
		addcookie('cooksid',sidarr.toString(),7);
		addcookie('cookienum',numarr.toString(),7)	
	}
})(jQuery);