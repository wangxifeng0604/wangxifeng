;(function($){
	
	$('.loginname').on('focus',function(){
		if($('.loginname').attr('placeholder')=="可使用已注册的用户名登录"){
			$('.loginname').attr('placeholder','');
		}
	});
	
	$('.loginname').on('blur',function(){
		if($('.loginname').attr('placeholder')==""){
			$('.loginname').attr('placeholder','可使用已注册的用户名登录');
		}
	});
	
	
	
	$('.loginpassword').on('focus',function(){
		if($('.loginpassword').attr('placeholder')=="8-20个大小写英文字母或数字"){
			$('.loginpassword').attr('placeholder','');
		}
	});
	
	$('.loginpassword').on('blur',function(){
		if($('.loginpassword').attr('placeholder')==""){
			$('.loginpassword').attr('placeholder','8-20个大小写英文字母或数字');
		}
	});
	
	
	$('#submit').on('click',function(){
		var loginname= $('.loginname').val();
		var loginpassword=$('.loginpassword').val();
			$.ajax({
			type:'post',
			url:'http://10.31.162.55/mkf/php/login.php',
			data:{
				loginname,
				loginpassword
			}
		}).done(function(data){
				if(data=='true'){
					alert('登陆成功，前往首页'),
					location.href='http://10.31.162.55/mkf/src/index.html'
				}else{
					alert('用户名或密码错误,请检查无误后重输')
				}
			})
	});
})(jQuery)