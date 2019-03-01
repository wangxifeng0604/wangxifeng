;(function(){
	//失去或得到焦点效果
	$('.username').on('focus',function(){
		//console.log(1)
		console.log($('.username').val())
		if($('.username').val()=="请输入账号"){
			$('.username').val('');
		}
	});
	
	/* $('.username').on('blur',function(){
		if($('.username').val()==""){
			$('.username').val('请输入账号');
		}
	}); */
	
	$('.userpassword').on('focus',function(){
		if($('.userpassword').val()=="请输入密码"){
			$('.userpassword').val('');
		}
	});
	
	/* $('.userpassword').on('blur',function(){
		if($('.userpassword').val()==""){
			$('.userpassword').val('请输入密码');
		}
	}); */
	
	//表单验证插件自定义规则
		$.validator.addMethod('regex',function(value,element,params){
			var exp= new RegExp(params);
			return exp.test(value);
		},'密码格式错误');
	
	
	//验证表单
	$('#form1').validate({
		onfocusout: function(element){$(element).valid()},
		onkeyup:function(element){$(element).valid()},
		success:function(label){
			label.text('√').css({'color':'green','background-color':'#fff','font-size':'20px'});
		},
		rules:{
			username:{
				required:true,
				minlength:6,
				maxlength:15,
				remote: {
						type: 'post',
						url: 'http://10.31.162.55/mkf/php/reg1.php'
				}
				
				
			},
			userpassword:{
				required:true,
				minlength:8,
				maxlength:20,
				regex: "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$"
				
			}
			
		},
		messages:{
			username:{
				required:'<b class="err" style="color:red;font-size:12px;background-color: #FFF5D9">用户名不可为空</b>',
				minlength:'<b class="err" style="color:red;font-size:12px;background-color: #FFF5D9">用户名长度不能小于6位</b>',
				maxlength:'<b class="err" style="color:red;font-size:12px;background-color: #FFF5D9">用户名长度不能大于15位</b>',
				remote: '<b class="err" style="color:red;font-size:12px;background-color: #FFF5D9">用户名已被注册</b>'

			},
			userpassword:{
				required:'<b class="err" style="color:red;font-size:12px;background-color: #FFF5D9">密码不可为空</b>',
				minlength:'<b class="err" style="color:red;font-size:12px;background-color: #FFF5D9">密码不可低于8位</b>',
				maxlength:'<b class="err" style="color:red;font-size:12px;background-color: #FFF5D9">密码最高20位</b>',
				regex:'<b class="err" style="color:red;font-size:12px;background-color: #FFF5D9">密码必须由数字和字母组成</b>'
			}
		}
	});
	/* $.validator.setDefaults({
		success:function(label){
			label.text('√').css('color','green').addClass('valid');
		}
	}) */
	
	$('#submit').on('click',function(){
		var username= $('#username').val();
		var userpassword=$('#userpassword').val();
		$('#form1').submit();
		//if(username.length>=6 && username.length<=15 && userpassword.lenght>=8 && userpassword.lenght<=20){
			//console.log(1)
			$.ajax({
			type:'post',
			url:'http://10.31.162.55/mkf/php/reg.php',
			data:{
				username,
				userpassword
			}
			/* success:function(d){
					location.href = 'http://10.31.162.55/mkf/src/login.html'
			} */
		}).done(
			alert('注册成功,即将前往登陆页面')
		) 
		//};
		

	})
})(jQuery)