//登录
$(".tabs>a").eq(0).click(function(e) {
	$(this).addClass("active").siblings().removeClass("active");
	$(".login-form").show();
	$(".register-form").hide();
});
//注册
$(".tabs>a").eq(1).click(function(e) {
	$(this).addClass("active").siblings().removeClass("active");
	$(".login-form").hide();
	$(".register-form").show();
});

//input框选中样式改变
$(".ctrl>input").focus(function() {
	$(this).parent().addClass("current").siblings().removeClass("current");
});

//-------------以下为注册页面--------------
//接口验证
//手机号
var userflag = false;
var ajaxYan = function(){
	var $userName = $(".mobile").val();
	$.ajax({
		type:"POST",
		url:"http://10.9.158.170:8080/API/user/check.aspx",
		data:{username:$userName},
		dataType:"jsonp",
		success:function(data){
			console.log(data);
			if(data.result == "ok"){
				userflag = true;
			}else{
				userflag = false;
			}
		},
		error:function(status){
			console.log(status);
		}
	});
}
//手机号和密码
var ajaxAccess = function(){
	var $userName  = $(".mobile").val();
	var $pwd = $(".password").val();
	$.ajax({
		type:"POST",
		url:"http://10.9.158.170:8080/API/user/add.aspx",
		dataType:"jsonp",
		data:{username:$userName,password:$pwd},
		success:function(data){
			console.log(data);
			if(data.result=="ok"){
				alert("恭喜你，注册成功！");
				location.href = "../html/login.html";
			}else{
				alert("注册失败");
			}
		},
		error:function(status){
			console.log(status);
		}
	});
}
//选中复选框时按钮样式改变
$(".checkbox").change(function() {
	if($(".checkbox").prop("checked")) {

		$(".register-form>.submit-btn").removeClass("dispabled");
	} else {
		$(".register-form>.submit-btn").addClass("dispabled");
	}
});


var $regExpManger = {
	$mobile: /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
	$pwd:/^.{4,16}$/
}
	//手机号验证
function checkMobile(){
		var $mV = $(".mobile").val();
		if($mV == "") {
			$("#mobile-error").show().html("请输入手机号");
			$(".mobile").css("background", "#fff");
			return false;
		} else {
			if($regExpManger.$mobile.test($mV)) {
				$("#mobile-error").hide();
				$(".mobile").parent().removeClass("current");
				$(".mobile").css("background", "#ffeecc");
				ajaxYan();
				return true;
			} else {
				$("#mobile-error").show().html("请输入正确的手机号");
				$(".mobile").css("background", "#fdf3fd");
				return false;
			}
		}
}
////验证码验证
	$(".captcha").click(function(){
		var arr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var html = ""
		for(var i = 0;i<5;i++){	
			var $s = arr[parseInt(Math.random()*arr.length)];
			html += $s;	
		}
		$(".captcha").text(html);
	}) 		
function checkVerify() {	
	var $verV = $(".verify").val();
		if($verV == "") {
			$("#verify-error").show().html("请输入验证码");
			$(".verify").css("background", "#fff");
			return false;
		} else {
			if($verV == $(".captcha").html()) {
				$("#verify-error").hide();
				$(".verify").parent().removeClass("current");
				$(".verify").css("background", "#fff");
				return true;
			} else {
				$("#verify-error").show().html("验证码输入错误");
				$(".verify").css("background", "#fdf3fd");
				return false;
			}
		}
}
////短信验证码
function checkSms(){
	var $smsV = $(".sms").val();
		if($smsV == "") {
			$("#sms-error").show().html("请输入短信验证码");
			$(".sms").css("background", "#fff");
			return false;
		} else {
			if($smsV == "1234"||"111") {
				$("#sms-error").hide();
				$(".sms").parent().removeClass("current");
				$(".sms").css("background", "#fff");
				return true;
			} else {
				$("#sms-error").show().html("短信验证码输入错误");
				$(".sms").css("background", "#fdf3fd");
				return false;
			}
		}
}
//密码
function checkPwd() {
	var $pwV = $(".password").val();
		if($pwV == "") {
			$("#password-error").show().html("请输入密码");
			$(".password").css("background", "#fff");
			return false;
		} else {
			if($regExpManger.$pwd.test($pwV)){
				$("#password-error").hide();
				$(".password").parent().removeClass("current");
				$(".password").css("background", "#ffeecc");
				return true;
			}else{
				$("#password-error").show().html("密码必须在4-16个字符之间");
				$(".password").css("background", "#fff");
			}
			
		}
}

$(".mobile").blur(checkMobile);
$(".verify").blur(checkVerify);
$(".sms").blur(checkSms);
$(".password").blur(checkPwd);



$("#btn").click(function() {
	
	
	if($(".checkbox").prop("checked")){
		$(".ctrl>p").hide();
		if(checkMobile()&&checkVerify()&&checkSms()&&checkPwd()){
			if(userflag){
				ajaxAccess();
			}else{
				$(".ctrl>p").show().html("*该手机号已经被注册");
			}			
		}
	}else{
		$(".ctrl>p").show().html("*请接受服务条款");
	}
});


//注册协议弹出框
$(".Agreement").children().eq(1).click(function() {
	$(".da-dialog").show();
})

$(".button-sure").click(function() {
	$(".da-dialog").hide();
})
$(".da-dialog-title>em").click(function() {
	$(".da-dialog").hide();
})

//登录页面
//手机号验证
function checkMobile1(){
		var $mV = $(".phone").val();
		if($mV == "") {
			$("#phone-error").show().html("请输入手机号");
			$(".phone").css("background", "#fff");
			return false;
		} else {
			if($regExpManger.$mobile.test($mV)) {
				$("#phone-error").hide();
				$(".phone").parent().removeClass("current");
				$(".phone").css("background", "#ffeecc");
				return true;
			} else {
				$("#phone-error").show().html("请输入正确的手机号");
				$(".phone").css("background", "#fdf3fd");
				return false;
			}
		}
}
//密码
function checkPwd1() {
	var $pwV = $(".pwd").val();
		if($pwV == "") {
			$("#pwd-error").show().html("请输入密码");
			$(".pwd").css("background", "#fff");
			return false;
		} else {
			if($regExpManger.$pwd.test($pwV)){
				$("#pwd-error").hide();
				$(".pwd").parent().removeClass("current");
				$(".pwd").css("background", "#ffeecc");
				return true;
			}else{
				$("#pwd-error").show().html("密码必须在4-16个字符之间");
				$(".pwd").css("background", "#fff");
			}
		}
}

$(".phone").blur(checkMobile1);
$(".pwd").blur(checkPwd1);

//接口验证
var ajaxLogin = function(){
	var $userName1  = $(".phone").val();
	var $pwd1 = $(".pwd").val();
	$.ajax({
		type:"POST",
		url:"http://10.9.158.170:8080/API/user/login.aspx",
		dataType:"jsonp",
		data:{username:$userName1,password:$pwd1},
		success:function(data){
			console.log(data);
			if(data.result=="ok"){
				localStorage["username"] = $(".phone").val();
				location.href = "../html/index.html";		
			}else{
				$(".login-form").children().eq(3).show().html("*用户名或密码不正确");
			}
		},
		error:function(status){
			console.log(status);
		}
	});
} 

$("#btn1").click(function(){
	if(checkMobile1()&&checkPwd1()){
		$(".login-form").children().eq(3).hide();
		ajaxLogin();
	}
})
