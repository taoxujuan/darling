//头部
$(".dd").hide();
$(".dt-title").mouseover(function() {
	$(".dd").show();
});
$(".dd").mouseover(function() {
	$(".dd").show();
})
$(".dd").mouseleave(function() {
	$(".dd").hide();
	$(".dt-title").mouseleave(function() {
		$(".dd").hide();
	});
})

//登陆后更改顶部样式
if(localStorage["username"]){
	$(".da-login").html("欢迎你，"+localStorage["username"]);
	$(".da-register").html("我的订单");
}
//购物车上面的数目
var $shopcart = $.cookie("shopcart");
if($shopcart != undefined){
	var result = strOper.sum($shopcart);
	$(".da-header-cart>span").html(result);
}
// 搜索框部分
var flag = true;
$(".ico-sort-ar").click(function() {
	if(flag) {
		$(".drop").css("display", "block");
		flag = false;
		$(".drop>ul>li").click(function() {
			$(".sort-name").text($(this).text());
		})
	} else {
		$(".drop").css("display", "none");
		flag = true;
	}

})

// 选择部分
$.get("../json/select.json", function(data) {
	var html = "";
	$.each(data, function(i, o) {
		html += '<li class="clearfix">' +
			'<dl>' +
			'<dt>' + o.title + ':</dt>' +
			'<dd class="single-select">' +
			'<div class="select-inner clearfix">'
		$.each(o.list, function(i, o) {
			html += '<a href="javascript:;" class="item clearfix">' +
				'<span class="text">' + o.text + ' </span>' +
				'</a>';
		});
		html += '</div>' +
			'</dd>' +
			'<dd class="mul-select clearfix">'
		$.each(o.label, function(i, o) {
			html += '<label class="item clearfix">' +
				'<input type="checkbox">' +
				'<span class="text">' + o.desc + '</span>' +
				'</label>'
		});
		html += '<div class="select-function">' +
			'<button class="search-sure">确定</button>' +
			'<button class="search-cancel">取消</button>' +
			'</div>' +
			'</dd>' +
			'</dl>' +
			'<div class="option">' +
			'<a class="sort-mul" href="javascript:;" style="' + o.mulhide + '">' +
			'<span class="ico-add">+</span>' +
			'<span class="text-mul">多选</span>' +
			'</a>' +
			'<a class="sort-more" href="javascript:;" style="' + o.morehide + '">' +
			'<span class="ico-r-4-7"></span>' +
			'<span class="text-more">更多</span>' +
			'</a>' +
			'</div>' +
			'</li>';
	});
	$(".condition>ul").html(html);

	var isSelect = true;
	$(".condition>ul>li").mouseover(function() {
		var $selectIndex = $(this).index();
		$(".sort-mul").eq($selectIndex).click(function() {
			if(isSelect) {
				$(".single-select").eq($selectIndex).hide();
				$(".mul-select").eq($selectIndex).show();
				isSelect = false;
			} else {
				$(".single-select").eq($selectIndex).show();
				$(".mul-select").eq($selectIndex).hide();
				isSelect = true;
			}
		});
		$(".sort-more").eq($selectIndex).click(function() {
			if(isSelect) {
				$(".single-select").eq($selectIndex).css("height", "auto");
				$(".text-more").eq($selectIndex).html("收起");
				isSelect = false;
			} else {
				$(".single-select").eq($selectIndex).css("height", "24px");
				$(".text-more").eq($selectIndex).html("更多");
				isSelect = true;
			}
		})
	});

})

// 排序部分
var prFlag = true;
$(".sortinner>a").click(function() {
	$(".sortinner>a").removeClass("current");
	$(".sortinner>a").children().removeClass("ico-sort-dr");
	$(this).addClass("current");
	$(this).children().addClass("ico-sort-dr");
	$(".up1").removeClass("current");
	$(".down1").removeClass("current");
});
if($(".sortinner>a").attr("className", "pr10")) {
	$(".sortinner>.pr10").click(function() {
		if(prFlag) {
			$(".up1").addClass("current");
			$(".down1").removeClass("current");
			prFlag = false;
		} else {
			$(".down1").addClass("current");
			$(".up1").removeClass("current");
			prFlag = true;
		}
	});
} else {
	$(".up1").removeClass("current");
	$(".down1").removeClass("current");
};

// 上一页下一页
var $page = $(".current-page").html();
var $countpage = $(".countpage").html();
if($page == 1) {
	$(".mr22").hide();
}
if($page == $countpage) {
	$(".nextpage").hide();
}
$(".nextpage").click(function() {
	$page++;
	$(".current-page").html($page);
	if($page > 1) {
		$(".mr22").show();
	};
	if($page == $countpage) {
		$(".nextpage").hide();
	};
});
$(".mr22").click(function() {
	$page--;
	$(".current-page").html($page);
	if($page < $countpage) {
		$(".nextpage").show();
	};
	if($page == 1) {
		$(".mr22").hide();
	};
});
// 商品列表 searchlist

// 底部切换页面  分页系统  
function getMsg(num) {
	$.ajax({
		url: "../json/subGoods.json",
		type: "GET",
		dataType: "json",
		success: function(data) {
			//计算分页的数量
			var showNum = num;
			var dataNum = data.length;
			var pageNum = Math.ceil(dataNum / showNum);
			$('.page').pagination(pageNum, {
				num_edge_entries: 1, //边缘页数
				num_display_entries: 4, //主体页数
				items_per_page: 1, //每页显示1项
				prev_text: "上一页",
				next_text: "下一页",
				callback: function(index) {
					var html = "";
					for(var i = showNum * index; i < showNum * index + showNum; i++) {
						if(i < dataNum) {
							var img = data[i].img;
							var id = data[i].id;
							var price = data[i].price;
							var oldprice = data[i].oldprice;
							var discount = data[i].discount;
							var name = data[i].name;
							var people = data[i].people;
							var comment = data[i].comment;
							html += "<li>" +
								"<a class=\"search-img\">" +
								"<div class=\"search-img cover-img\"><img data-original=\"" + img + "\"></div>" +
								"<div class=\"sign\"></div>"+
								"<div class=\"option\" pid=\"" + id + "\">" +
								"加入购物车" +
								"<span class=\"ico-g-cart\"></span>" +
								"</div>" +
								"</a>" +
								"<div class=\"data\">" +
								"<p class=\"price\">" +
								"<span class=\"rede1\">¥</span>" +
								"<span class=\"now-price\">" + price + "</span>" +
								"<span class=\"old-price\">¥" + oldprice + "</span>" +
								"</p>" +
								"<p class=\"title\">" +
								"<span class=\"discount\">" + discount + "折/</span> " +
								"<span class=\"rede1\"></span>" +
								"<a href=\"../html/product.html\" target=\"_blank\">" +
								name +
								"</a>" +
								"</p>" +
								"<p class=\"function\">" +
								people + "人收藏" +
								"<span class=\"line\">|</span>" + comment + "条评论" +
								"</p>" +
								"</div>" +
								"</li>";
						}
					}
					$(".searchlist>ul").html(html);
					
					$(".searchlist>ul img").lazyload({
						effect:"fadeIn"
					});
					
					$(".searchlist>ul>li").hover(function() {
						$(this).children().eq(0).children().eq(2).show();
						$(this).children().eq(0).children().eq(3).show();
					}, function() {
						$(this).children().eq(0).children().eq(2).hide();
						$(this).children().eq(0).children().eq(3).hide();
					});

					$(".searchlist>ul>li>a").click(function(e) {
						if($(e.target).is(".option")) {
							var $target = $(e.target);
							var id = $target.attr("pid");
							var name = $target.parent().next().children(".title").children().eq(2).html();
							var img = $target.prev().prev().children().data("original");
							var price = $target.parent().next().children(".price").children(".now-price").html();
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
							//动画效果
							var $productImg = $target.prev().prev().children();
	                        $productImg.clone()
	                            .appendTo("body")
	                            .css({
	                                position:"absolute",
	                                left:$productImg.offset().left + 70,
	                                top:$productImg.offset().top + 60,
	                                opacity:.9,
	                                width:140,
	                                height:134,
	                                zIndex:100
	                            }).animate({
	                            	left:$productImg.offset().left + 35,
                                	top:$productImg.offset().top + 30
	                            },400).delay(300).animate({
	                            	left:$(".da-header-cart").offset().left,
                                	top:$(".da-header-cart").offset().top,
                                	opacity:0,
                                	width:0,
                                	height:0
	                            },600);
						}
						//购物车上面的数目
						var $shopcart = $.cookie("shopcart");
						if($shopcart != undefined){
							var result = strOper.sum($shopcart);
							$(".da-header-cart>span").html(result);
						}
						
						
					});
					//换到商品详情页的cookie
						$(".title>a").click(function(e) {
							
							var $target = $(e.target);
							var id = $target.parent().parent().prev().children(".option").attr("pid");
							$.cookie("product", id);
							console.log(id)
						});
						
					
				}
			})
		}
	})
}
getMsg(20)
