//登陆后更改顶部样式
if(localStorage["username"]){
	$(".da-login").html("欢迎你，"+localStorage["username"]);
	$(".da-register").html("我的订单");
}

var checkPrice = function(){
	var flag = true;
	for(var i = 0;i<$("input:checkbox:not(.allcheck)").length;i++){
		if(!$("input:checkbox:not(.allcheck)").eq(i).prop("checked")){
			$(".allcheck").prop("checked",false);
			flag = false;
			break;
		}
	}
	if(flag){
		$(".allcheck").prop("checked",true);
	}
	var $all = 0;
	for(var i = 0;i<$("input:checkbox:not(.allcheck)").length;i++){
		if($("input:checkbox:not(.allcheck)").eq(i).prop("checked")){
			$all += parseInt($("input:checkbox:not(.allcheck)").eq(i).parent().parent().children(".td-total").children(".total").html());
		}
	}
	
	$(".sumprice>.f20").html($all);
	//已选中商品数
	var $allcount = 0;
	for(var i = 0;i<$("input:checkbox:not(.allcheck)").length;i++){
		if($("input:checkbox:not(.allcheck)").eq(i).prop("checked")){
			$allcount += parseInt($("input:checkbox:not(.allcheck)").eq(i).val());
		}
	}
	
	$(".ammount>.rede1").html($allcount);
}

var getShopCart = function() {
	var $shopcart = $.cookie("shopcart");
	if(!$shopcart) {
		$(".cart-table>table").show();
	} else {
		$(".cart-table>table").hide();
	}
	if($shopcart != undefined) {
		var json = strOper.get($shopcart);
		var html = "";
		$.each(json, function(i, o) {
			html += "<ul class=\"clearfix goods\">" +
				"<li class=\"td td-check\">" +
				"<input type=\"checkbox\" class=\"check\" value=\"" + o.count + "\" />" +
				"</li>" +
				"<li class=\"td td-good\">" +
				"<a href=\"\" class=\"clearfix cover\">" +
				"<div class=\"img cover-img\" style=\"background-image: url(" + o.img + ");\"></div>" +
				"</a>" +
				"<a href=\"\" class=\"clearfix name\">" +
				"<span class=\"title\">[DarLing]</span>" +
				"<br>" +
				"<span>" + o.name + "</span>" +
				"</a>" +
				"</li>" +
				"<li class=\"td td-price\">" +
				"<p>¥<span class=\"price\">" + o.price + "</span></p>" +
				"</li>" +
				"<li class=\"td td-number\">" +
				"	<a class=\"btn-number f1 btn-reduce\" style=\"font-weight: bold;\" data-pid=\"" + o.id + "\">" +
				"<span class=\"ico-reduce\"></span>" +
				"</a>" +
				"<input type=\"text\" value=\"" + o.count + "\" class=\"number-in\" />" +
				"<a class=\"btn-number f1 btn-add\" style=\"font-size: 26px;\" data-pid=\"" + o.id + "\">" +
				"<span class=\"ico-add\"></span>" +
				"</a>" +
				"</li>" +
				"<li class=\"td td-total\">" +
				"￥<span class=\"total\">" + (o.price * o.count) + "</span>" +
				"</li>" +
				"<li class=\"td td-handle\">" +
				"<a class=\"del\" data-pid=\"" + o.id + "\">删除</a>" +
				"</li>" +
				"</ul>";
		});
		$(".cart-list").html(html);
		
		$("input:checkbox:not(:first:last)").click(function(){
			checkPrice();
		});
		
		//吸顶效果
		var toph = $(".total-box").offset().top - 680;
		$(window).scroll(function() {
			if($("body").scrollTop() < toph) {
				$(".total-box").parent().addClass("floating");
			}
			if($("body").scrollTop() > toph) {
				$(".total-box").parent().removeClass("floating");
			}
		});
	}
}
getShopCart();

var getCollect = function() {
	var $collect = $.cookie("collect");
	if(!$collect) {
		$(".cart-collection>table").show();
	} else {
		$(".cart-collection>table").hide();
	}
	if($collect != undefined) {
		var json = strOper.get($collect);
		var html = "";
		$.each(json, function(i, o) {
			html += '<li class="active">' +
				'<a href="">' +
				'<div class="img-ct cover-img"><img src="' + o.img + '"></div>' +
				'<p class="goods-price">¥' +
				'<span>' + o.price + '</span>'+
				'</p>' +
				'<p class="goods-title">' + o.name + '</p>' +
				'</a>' +
				'<a href="javascript:;" class="btn-cart" pid="' + o.id + '">加入购物车</a>' +
				'</li>';
		});
		$(".c-list>ul").html(html);
	}
}
getCollect();

//我的收藏
$(".btn-cart").click(function(e) {
	var $target = $(e.target);
	var id = $target.attr("pid");
	var name = $target.prev().children(".goods-title").html();
	var img = $target.prev().children(".img-ct").children().attr("src");
	var price = $target.prev().children(".goods-price").children().eq(0).html();
	var str = id + "#" + img + "#" + name + "#" + price + "#" + "1";
	var $shopcart = $.cookie("shopcart");
	if(!$shopcart) {
		//cookie文件中是空的
		$.cookie("shopcart", str, {
			expires: 7
		});
	} else {
		var result = strOper.add($shopcart, str);
		$.cookie("shopcart", result);
	}
//	getShopCart();
	
	//动画效果
		var $productImg = $target.prev().children(".img-ct").children();
        $productImg.clone()
            .appendTo("body")
            .css({
                position:"absolute",
                left:$productImg.offset().left + 35,
                top:$productImg.offset().top + 35,
                opacity:.8,
                width:70,
                height:70,
                zIndex:100
            }).animate({
					left: $productImg.offset().left + 35,
					top: $productImg.offset().top + 30
				}, 400).delay(400).animate({
					left: $(".total-box").offset().left + 200,
					top: $(".total-box").offset().top ,
					opacity: 0,
					width: 0,
					height:0
				}, 400,function(){
					getShopCart();
				});
	
});

//我的收藏左右按钮切换
var $collectIndex = 0;
var $liLength = $(".c-list>ul>li").width();
var $liCount = $(".c-list>ul>li").length;
$(".btn-pre").click(function(){
	if($collectIndex<=1){
		$collectIndex = 1;
	}
	$collectIndex--;
	$(".c-list>ul").css({
		marginLeft:-($liLength + 40) * $collectIndex 
	});
});
$(".btn-next").click(function(){
	if($collectIndex >= $liCount - 6){
		$collectIndex = $liCount - 6;
	}
	$collectIndex++;
	$(".c-list>ul").css({
		marginLeft:-($liLength + 40) * $collectIndex 
	});
});




//对产品数量加减的函数
var counter = function(element, type) {
	var count = type === true ? 1 : -1;
	var $p = type === true ? $(element).prev() : $(element).next();
	if(parseInt($p.val()) == 1 && type === false) {
		count = 0;
	} else {
		var $shopcart = $.cookie("shopcart");
		var id = $(element).data("pid");
		var result = strOper.counter($shopcart, id, type);
		$.cookie("shopcart", result);
	}
	$p.val(parseInt($p.val()) + count);
	var $d = parseInt($p.parent().prev().children("p").children(".price").html());
	$p.parent().next().children(".total").html((parseInt($p.val()) + count)*$d);
//	$p.parent().parent().parent().parent().parent().next().children().eq(1).children(".toolbar").children(".ammount").children(".rede1").html(parseInt($p.val()) + count);	
}


//删除购物车中的产品事件委托
$(".cart-list").click(function(e) {
	if($(e.target).attr("class") == "del") {
		$(".mask").show();
		$(".da-dialog").show(function() {
			$(".buttons>.cancel").click(function() {
				$(".da-dialog").hide();
			});
			$(".close").click(function() {
				$(".da-dialog").hide();
			})
			$(".buttons>.confirm").click(function() {
				var $shopcart = $.cookie("shopcart");
				var id = $(e.target).data("pid");
				var result = strOper.del($shopcart, id);
				$.cookie("shopcart", result);
				getShopCart();
				$(".allcheck").prop("checked",false);
				$(".sumprice>.f20").html("0");
				$(".da-dialog").hide();
			})
		});
	} else if($(e.target).attr("class") == "btn-number f1 btn-reduce") {
		counter(e.target, false);
		var $check = $(e.target).parent().parent().children().eq(0).children("input");
		$check.prop("checked",true);
		checkPrice();
	} else if($(e.target).attr("class") == "btn-number f1 btn-add") {
		counter(e.target, true);
		var $check = $(e.target).parent().parent().children().eq(0).children("input");
		$check.prop("checked",true);
		checkPrice();
	}
});

$(".allcheck:first").click(function(){
	if($(this).prop("checked")){
		$("input:checkbox").prop("checked",true);
	}else{
		$("input:checkbox").prop("checked",false);
	}
	checkPrice();
});


//$(".option>a:first").click(function(){
//	$(".mask").show();
//		$(".da-dialog").show(function() {
//			$(".buttons>.cancel").click(function() {
//				$(".da-dialog").hide();
//			});
//			$(".close").click(function() {
//				$(".da-dialog").hide();
//			})
//			$(".buttons>.confirm").click(function(){
//				 $("input:checkbox:not(.allcheck)").each(function() { // 遍历选中的checkbox
//          		console.log($("input:checkbox:not(.allcheck)"))
//      		});
//			})
//		});
//})
//$(".allcheck:last").click(function(){
//	if($(this).prop("checked")){
//		$("input:checkbox").prop("checked",true);
//	}else{
//		$("input:checkbox").prop("checked",false);
//	}
//	checkPrice();
//});
