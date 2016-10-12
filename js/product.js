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
if($shopcart != undefined) {
	var result = strOper.sum($shopcart);
	$(".da-header-cart>span").html(result);
}

var getProduct = function() {
	var id = $.cookie("product");
	$.get("../json/subGoods.json", function(data) {
		var html = "";
		$.each(data, function(i, o) {
			if(id == o.id) {
				html += '<div class="goods-show">' +
					'<div class="goods-big">' +
					'<img src="' + o.img + '" class="goods-big-img">' +
					'<div class="tool"></div>' +
					'</div>' +
					'<div class="bigImg">' +
					'<img src="' + o.img + '" />' +
					'</div>' +
					'<div class="thumbnailImgBox">' +
					'<em class="thumbnailImgPrev"></em>' +
					'<div>' +
					'<ul>' +
					'<li class="hover">' +
					'<img src="' + o.img + '">' +
					'</li>' +
					'<li>' +
					'<img src="../images/pro-buy1.jpg">' +
					'</li>' +
					'<li>' +
					'<img src="../images/all.jpg">' +
					'</li>' +
					'<li>' +
					'<img src="../images/pro-buy2.jpg">' +
					'</li>' +
					'<li>' +
					'<img src="../images/pro2.jpg">' +
					'</li>' +
					'<li>' +
					'<img src="../images/allgood2.jpg">' +
					'</li>' +
					'<li>' +
					'<img src="../images/all.jpg">' +
					'</li>' +
					'<li>' +
					'<img src="../images/pro-buy2.jpg">' +
					'</li>' +
					'<li>' +
					'<img src="../images/pro2.jpg">' +
					'</li>' +
					'<li>' +
					'<img src="../images/allgood4.jpg">' +
					'</li>' +
					'</ul>' +
					'</div>' +
					'<em class="thumbnailImgNext"></em>' +
					'</div>' +
					'<div class="share clearfix">' +
					'<div class="f1">' +
					'<div class="bdsharebuttonbox share-btn  bdshare-button-style0-16">' +
					'<a class="share-btn-inner">' +
					'<span class="icon-share"></span>分享' +
					'</a>' +
					'</div>' +
					'</div>' +
					'<div class="f1 pf40">' +
					'<a href="javascript:;">' +
					'<span class="ico-collect" pid="' + o.id + '"></span> 收藏' +
					'</a>' +
					'</div>' +
					'<div class="tip-note-box fr">' +
					'<span class="tip-note">' +
					'<div class="tip-title">' +
					'<span class="ico-infonote"></span>消费者告知书<span class="ico-5-4"></span>' +
					'</div>' +
					'<div class="note">' +
					'<div class="tip-note-content">' +
					'<p>尊敬的客户：</p>' +
					'<p>您好!</p>' +
					'<p>在您选购境外商品前，麻烦您仔细阅读此文，同意本文所告知内容后再进行下单购买：<br>' +
					'1.您在本（公司）网站上购买的境外商品为产地直销商品，仅限个人自用不得进行再销售，商品本身可能无中文标签，您可以查看网站的翻译或者在线联系我们的客服。<br>' +
					'2.您购买的境外商品适用的品质、健康、标识等项目使用标准符合原产国使用标准，但是可能与我国标准有所不同，所以在使用过程中由此可能产生的危害或损失以及其他风险，将由您个人承担。<br>' +
					'3.您在本（公司）网站上购买保税区发货的境外商品时，自动视为由达令极速免税店代您向海关进行申报和代缴税款。<br>' +
					' </p>' +
					'<p style="text-align: right;padding-top: 30px;">谢谢！</p>' +
					' <p style="text-align: right">北京普缇客科技有限公司</p>' +
					'</div>' +
					'</div>' +
					'</span>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'<div class="goods-data">' +
					'<h1 class="clearfix">' +
					'<span class="sign"></span>' +
					'<span>' + o.name + '</span>' +
					'</h1>' +
					'<dl class="goods-price clearfix">' +
					'<dt>达令价</dt>' +
					'<dd>' +
					'<div class="clearfix">' +
					'<div class="f1">' +
					'￥<span class="f30 bold">' + o.price + '</span>' +
					'</div>' +
					'</div>' +
					'<p>海外现时售价' +
					'<span>¥' +
					'<span>' + o.oldprice + '</span>' +
					'</span>' +
					'<span class="price-off">5.2折</span>' +
					'</p>' +
					'<p class="tax_fee">' +
					'<em>税费: ¥0.00</em>' +
					'</p>' +
					'</dd>' +
					'</dl>' +
					'<dl class="goods-function clearfix">' +
					'<ul>' +
					'<li>评分：' +
					'<span title="评分:4.88">' +
					'<span class="icon-star"></span>' +
					'<span class="icon-star"></span>' +
					'<span class="icon-star"></span>' +
					'<span class="icon-star"></span>' +
					'<span class="icon-half-star"></span>' +
					'</span>' +
					'</li>' +
					'<li>评论：8646条</li>' +
					'<li>收藏：' +
					'<span data-wishes-count="">9393</span>' +
					'</li>' +
					'</ul>' +
					'</dl>' +
					'<dl class="goods-thumbnail clearfix">' +
					'<dt>款式</dt>' +
					'<dd>' +
					'<ul class="clearfix">' +
					'<li>' +
					'<a href="javascript:;">' +
					'<img src="' + o.img + '">' +
					'</a>' +
					'</li>' +
					'<li>' +
					'<a href="javascript:;">' +
					'<img src="../images/pro2.jpg">' +
					'</a>' +
					'</li>' +
					'</ul>' +
					'</dd>' +
					'</dl>' +
					'<dl class="goods-number clearfix">' +
					'<dt>购买数量</dt>' +
					'<dd>' +
					'<div class="number">' +
					'<a class="btn-reduce" href="javascript:;">' +
					'<span class="ico-u-5"></span>' +
					'</a>' +
					'<a class="btn-add" href="javascript:;">' +
					'<span class="ico-d-5"></span>' +
					'</a>' +
					'<input class="number-input" value="1" type="text">' +
					'</div>' +
					'<p>限购1件</p>' +
					'</dd>' +
					'</dl>' +
					'<div class="goods-btn clearfix">' +
					'<a href="">' +
					'<span class="btn-buy">立即购买</span>' +
					'</a>' +
					'<button class="da-cart-add" pid="' + o.id + '">添加到购物车</button>' +
					'</div>' +
					'<div class="goods-tips clearfix">' +
					'<span class="mr20"><span class="ico-mark-1"></span>正品保障</span>' +
					'<span class="mr20"><span class="ico-mark-2"></span>24小时发货</span>' +
					'<span class="mr20"><span class="ico-mark-3"></span>满55元快递包邮</span>' +
					'</div>' +
					'</div>';

			}
		});
		$(".detail-intro").html(html);

		//购物车上面的数目
		var $shopcart = $.cookie("shopcart");
		if($shopcart != undefined) {
			var result = strOper.sum($shopcart);
			$(".da-header-cart>span").html(result);
		}

		//消费者告知书
		$(".tip-title").mouseover(function() {
			$(".tip-note-content").show().css({
				background: "#fff",
				border: "1px solid #666",
				marginTop: -22
			})
		});
		$(".tip-note-content").mouseleave(function() {
			$(".tip-note-content").hide();
			$(".tip-title").mouseleave(function() {
				$(".tip-note-content").hide();
			})
		});
		//吸顶效果
		var toph = $(".tag").offset().top;
		$(window).scroll(function() {
			if($("body").scrollTop() > $(".tag").offset().top) {
				$(".tag").css({
					position: "fixed",
					top: 0,
					width: "90%",
					background: "#fff"
				});
				$(".tag-right").show();
			}
			if($("body").scrollTop() < toph) {
				$(".tag").css({
					position: "relative",
					top: 0
				});
				$(".tag-right").hide();
			}
		});

		$(".tag-1>ul>li").click(function() {
			$(this).addClass("current").siblings().removeClass("current");
		})

		//商品详情放大镜部分
		var $goodIndex = 0;
		var $liLen = $(".thumbnailImgBox>div>ul>li").width();
		var $liIndexCount = $(".thumbnailImgBox>div>ul>li").length;
		$(".thumbnailImgPrev").click(function() {
			if($goodIndex <= 1) {
				$goodIndex = 1;
			}
			$goodIndex--;
			$(".thumbnailImgBox>div>ul").css({
				marginLeft: -$liLen * $goodIndex
			})
		})
		$(".thumbnailImgNext").click(function() {
			if($goodIndex >= $liIndexCount - 5) {
				$goodIndex = $liIndexCount - 5;
			}
			$goodIndex++;
			$(".thumbnailImgBox>div>ul").css({
				marginLeft: -$liLen * $goodIndex
			})
		})

		$(".thumbnailImgBox>div>ul>li").click(function() {
			$(this).addClass("hover").siblings().removeClass("hover");
			var $imgSrc = $(this).children().attr("src");
			$(".goods-big>img").attr("src", $imgSrc);
			$(".bigImg>img").attr("src", $imgSrc);
		})

		//放大镜效果
		var scale = 2;
		var toolwh = 379 / scale;
		$(".tool").css({
			width: toolwh,
			height: toolwh,
			boxShadow: "0px 0px 10px #333"
		})
		$(".bigImg>img").css({
			width: 379 * scale,
			height: 379 * scale
		})
		$(".goods-big").hover(function() {
			$(".tool").show();
			$(".bigImg").show();
			$(this).mousemove(function(e) {
				$(".tool").css({
					left: Math.max(Math.min(e.pageX - $(".goods-big").offset().left - $(".tool").width() / 2, 379 - $(".tool").width()), 0),
					top: Math.max(Math.min(e.pageY - $(".goods-big").offset().top - $(".tool").height() / 2, 379 - $(".tool").height()), 0)
				});
				$(".bigImg>img").css({
					marginLeft: $(".tool").position().left * scale * -1,
					marginTop: $(".tool").position().top * scale * -1
				})
			})

		}, function() {
			$(".tool").hide();
			$(".bigImg").hide();
		})

		$(".goods-thumbnail>dd>ul>li").hover(function() {
			$(this).css("border", "2px solid red");
		}, function() {
			$(this).css("border", "none");
		})

		$(".btn-add").click(function() {
			var $num = $(".number-input").val();
			$num++;
			$(".number-input").val($num);
		})
		$(".btn-reduce").click(function() {
				var $num = $(".number-input").val();
				$num--;
				if($num <= 1) {
					$num = 1;
				}
				$(".number-input").val($num);

			})
			//添加到购物车
		$(".da-cart-add").click(function(e) {
			var $target = $(e.target);
			var id = $target.attr("pid");
			var name = $target.parent().parent().children("h1").children().eq(1).html();
			var img = $target.parent().parent().children(".goods-thumbnail").children("dd").children().children().eq(0).children().children().attr("src");
			var price = $target.parent().parent().children(".goods-price").children("dd").children(".clearfix").children(".f1").children().html();
			var count = $target.parent().prev().children("dd").children(".number").children("input").val();
			var str = id + "#" + img + "#" + name + "#" + price + "#" + count;
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
			var $shopcart = $.cookie("shopcart");
			var result = strOper.sum($shopcart);
			console.log(result);
			$(".da-header-cart>span").html(result);
		})

		//收藏
		$(".ico-collect").click(function(e) {
			$(this).addClass("liked");
			var $target = $(e.target);
			var id = $target.attr("pid");
			var name = $target.parent().parent().parent().parent().next().children("h1").children().eq(1).html();
			var img = $target.parent().parent().parent().prev().prev().children().attr("src");
			var price = $target.parent().parent().parent().parent().next().children(".goods-price").children("dd").children(".clearfix").children().children().html();
			var oldprice = $target.parent().parent().parent().parent().next().children(".goods-price").children("dd").children().eq(1).children().children().html();
			var str = id + "#" + img + "#" + name + "#" + price + "#" + oldprice;
			var $collect = $.cookie("collect");
			if(!$collect) {
				$.cookie("collect", str, {
					expires: 7
				});
			} else {
				var result = strOper.add($collect, str);
				$.cookie("collect", result);
			}
		})

	});
}
getProduct();

//大家都在买
$.get("../json/proright.json", function(data) {
	var html = "";
	$.each(data, function(i, o) {
		html += '<li>' +
			'<a href="" target="_blank">' +
			'<div class="img-ct cover-img" style="background-image:url(' + o.imgSrc + ')"></div>' +
			'<p class="goods-price">￥' + o.nowprice +
			'<span class="old-price">￥' + o.oldprice + '</span>' +
			'</p>' +
			'<p class="goods-title">' + o.name + '</p>' +
			'</a>' +
			'</li>';
	});
	$(".sidebar-buying>ul").html(html);
	$(".sidebar-buying>ul>li:lt(2)").addClass("active");
	var $currentIndex = 0;
	$(".scroll-up").click(function() {
		$currentIndex -= 2;
		$currentIndex %= 12;
		$(".sidebar-buying>ul>li").eq($currentIndex).addClass('active').siblings().removeClass("active");
		$(".sidebar-buying>ul>li").eq($currentIndex).next().addClass("active");
	});
	$(".scroll-down").click(function() {
		$currentIndex += 2;
		$currentIndex %= 12;
		$(".sidebar-buying>ul>li").eq($currentIndex).addClass('active').siblings().removeClass("active");
		$(".sidebar-buying>ul>li").eq($currentIndex).next().addClass("active");
	})
})

//用户评价部分
function getM(num) {
	$.ajax({
		url: "../json/evaluation.json",
		type: "GET",
		dataType: "json",
		success: function(data) {
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
							var imgSrc = data[i].imgSrc;
							var name = data[i].name;
							var rate = data[i].rate;
							var time = data[i].time;
							var text = data[i].text;
							html += '<li class="clearfix">' +
								'<div class="face">' +
								'<img src="' + imgSrc + '" />' +
								'<p>' + name + '</p>' +
								'</div>' +
								'<div class="data clearfix">' +
								'<div class="info clearfix">' +
								'<div class="rate">' +
								'评分:' +
								'<span title="评分:' + rate + '">' +
								'<span class="icon-star"></span>' +
								'<span class="icon-star"></span>' +
								'<span class="icon-star"></span>' +
								'<span class="icon-star"></span>' +
								'<span class="icon-star"></span>' +
								'</span>' +
								'</div>' +
								'<div class="time">' +
								'评论时间：' +
								'<span class="pr10">' + time + '</span>' +
								'</div>' +
								'</div>' +
								'<p class="text">' + text + '</p>' +
								'</div>' +
								'</li>';
						}
					}
					$(".comment-table>ul").html(html);
				}
			})
		}

	})

}
getM(10);