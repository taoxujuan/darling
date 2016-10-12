// 头部
$(".regtip-close").click(function() {
	$(".da-reg-tip").hide();
});
$(".d-da").hover(function() {
	$(".da-code").show();
}, function() {
	$(".da-code").hide();
});

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
//侧边栏
$.get("../json/indexBan.json", function(data) {
	var html = "";
	$.each(data, function(i, o) {
		html += "<dl class=\"" + o.className + "\">" +
			"<dt>" +
			"<span class=\"ico-category\">" +
			"<img src=\"" + o.img1 + "\"></span>" + o.bigTitle + "" +
			"</dt>" +
			"<dd class=\"category-sort\">" +
			"<span class=\"ico-arrow-2-4\"></span>" +
			"<div class=\"category-sort-box\">"
		$.each(o.item, function(i, o) {
			html += "<a href=\"\" target=\"_blank\">" + o.itemdesc + "</a>"
		});
		html += "</div>" +
			"</dd>" +
			"<dd class=\"category-drop\">" +
			"<div>" +
			"<div class=\"hot-brand\">" +
			"<div class=\"hot-brand-title\">" + o.bigTitle + "</div>" +
			"<div class=\"hot-brand-box clearfix\">"
		$.each(o.pic, function(i, o) {
			html += "<a href=\"\" target=\"_blank\">" +
				"<div class=\"brand-img cover-img\" style=\"background-image: url(" + o.picSrc + ")\"></div>" +
				"</a>"
		});
		html += "</div>" +
			"</div>" +
			"<div class=\"category-data clearfix\">" +
			"<div class=\"brand-ad\">" +
			"<a href=\"\" target=\"_blank\">" +
			"<div class=\"brand-img-1 cover-img\" style=\"background-image: url(" + o.banBigpic + ")\"></div>" +
			"</a>" +
			"</div>" +
			"<div class=\"category-data-1\">"
		$.each(o.list, function(i, o) {
			html += "<div class=\"category-data-2 clearfix\">";
			$.each(o.div, function(i, o) {
				html += "<div class=\"item\">" +
					"<a href=\"\" target=\"_blank\">" + o.title + "</a>" +
					"</div>" +
					"<div class=\"data\">";
				$.each(o.lista, function(i, o) {
					html += "<a href=\"\" target=\"_blank\">" + o.a + "</a>";
				});
				html += "</div>";
			});
			html += "</div>";
		});
		html += "</div>" +
			"	</div>" +
			"</div>" +
			"</dd>" +
			"</dl>";
	});
	$(".dd").html(html);
	$(".dd>dl").hover(function() {
		var $dlIndex = $(this).index();
		$(".category-drop").hide().eq($dlIndex).show().css("border-left", "none");
		$(".dd>dl").css("border-right", "1px solid #654579").eq($dlIndex).css("border-right-color", "#fff");
		$(".ico-up").css("display", "none");
		$(".ico-down").css("display", "inline-block");
	}, function() {
		$(".category-drop").hide();
		$(".dd>dl").css("border-right", "none");
		$(".ico-down").css("display", "none");
		$(".ico-up").css("display", "inline-block");
	})
})

// 轮播图
$(".slides>li:eq(0)").show();
var $lbtIndex = 0;

function $change() {
	$lbtIndex %= 3;
	$(".slides>li").hide().eq($lbtIndex).fadeIn(600);
	$(".flex-control-paging>li>a").removeClass("flex-active").eq($lbtIndex).addClass("flex-active");
}
$(".flex-control-paging>li").click(function() {
	clearInterval(termId);
	$lbtIndex = $(this).index();
	$change();
	autoPlay();
});
var termId;

function autoPlay() {
	termId = setInterval(function() {
		$lbtIndex++;
		$change();
	}, 3000);
};
autoPlay();
// 今日上新   
$.get("../json/newGoods.json", function(data) {
			var html = "";
			$.each(data, function(i, o) {
				html += "<ul class=\"" + o.className + " clearfix\">"
				$.each(o.ul, function(i, o) {
					html += "<li class=\"" + o.canme + "\">" +
						"<a href=\"javascript:;\" class=\"new-img\">" +
						"<div class=\"new-img cover-img\"><img data-original=\"" + o.imgSrc + "\"></div>" +
						"<div class=\"sign\"></div>" +
						"<div class=\"option\" pid=\"" + o.id + "\">" +
						"加入购物车" +
						"<span class=\"ico-g-cart\"></span>" +
						"</div>" +
						"</a>" +
						"<div class=\"data\">" +
						"<p class=\"price clearfix\">" +
						"<span class=\"collect\">" + o.collect + "人收藏</span>" +
						" <span class=\"rede1\">¥</span>" +
						" <span class=\"now-price\">" + o.nowprice + "</span>" +
						"<span class=\"old-price\">¥<span>" + o.oldprice + "</span></span>" +
						"</p>" +
						"<p class=\"title\">" +
						"<span class=\"discount\">" + o.discount + "/折</span>" +
						" <span class=\"rede1\"></span>" +
						"<a href=\"../html/product.html\">" + o.name +
						" </a>" +
						"</p>" +
						"</div>" +
						"</li>";
				});
				html += "</ul>"
			});
			$(".index-new-box").html(html);
			//懒加载
			$(".index-new-box img").lazyload({
				effect:"fadeIn"
			});
			
			var $changeIndex = 0;
				$(".change").click(function() {
						$changeIndex++;
						$changeIndex %= 5;
						$(".w285").hide().eq($changeIndex).show();
						$(".w589").hide().eq($changeIndex).show();
					})
					//鼠标滑过显示购物车
				$(".index-new-box>ul>li").hover(function() {
					$(this).children().children(".option").show();
				}, function() {
					$(this).children().children(".option").hide();
				});
			
			$(".index-new-box>ul>li>a").click(function(e) {
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
							position: "absolute",
							left: $productImg.offset().left + 70,
							top: $productImg.offset().top + 60,
							opacity: .9,
							width: 140,
							height: 134,
							zIndex: 100
						}).animate({
							left: $productImg.offset().left + 35,
							top: $productImg.offset().top + 30
						}, 400).delay(300).animate({
							left: $(".da-header-cart").offset().left,
							top: $(".da-header-cart").offset().top,
							opacity: 0,
							width: 0,
							height: 0
						}, 600);

				}
				
				//购物车上面的数目
				var $shopcart = $.cookie("shopcart");
				if($shopcart != undefined) {
					var result = strOper.sum($shopcart);
					$(".da-header-cart>span").html(result);
				}

				//	//换到商品详情页的cookie
				//	$(".title>a").click(function(e) {
				//		var $target = $(e.target);
				//		var id = $target.parent().parent().prev().children(".option").attr("pid");
				//		$.cookie("product", id);
				//	});

			})
	});
			// 大家都说好
			$.get("../json/allGood.json", function(data) {
				var html = "";
				$.each(data, function(i, o) {
					html += "<ul>"
					$.each(o.ulist, function(i, o) {
						html += "<li>" +
							"<a href=\"\" target=\"_blank\">" +
							"<div class=\"cover-img cover-img\" style=\"background-image:url(" + o.imgSrc + ");\"></div>" +
							"</a>" +
							"<div class=\"sign\">" +
							"<img src=\"" + o.mianshui + "\">" +
							"</div>" +
							"<div class=\"data\">" +
							"<p class=\"price clearfix\">" +
							"<span class=\"rede1\">¥</span>" +
							" <span class=\"now-price\">" + o.nowprice + "</span>" +
							"<span class=\"old-price\">¥" + o.oldprice + "</span>" +
							"</p>" +
							"<a href=\"../html/product.html\" target=\"_blank\">" +
							"<p class=\"title\">" +
							"<span class=\"rede1\"></span>" +
							o.name +
							"</p>" +
							"</a>" +
							"<a href=\"\" target=\"_blank\">" +
							"<div class=\"comment\">" +
							"<div class=\"face cover-img\" style=\"background-image:url(" + o.faceimg + ")\"></div>" +
							"<div class=\"bg\"></div>" +
							"<div class=\"comment-text\">" +
							"<p>" + o.text + "</p>" + o.message +
							"</div>" +
							"</div>" +
							"</a>" +
							"</div>" +
							"</li>";
					});
					html += "</ul>"
				});
				$(".index-good-list").html(html);
			});

			$(".index-good>.index-good-tab>ul>li").click(function() {
				var $tabIndex = $(this).index();
				$(".index-good-tab>ul>li").removeClass("current").eq($tabIndex).addClass("current");
				$(".index-good-list>ul").hide().eq($tabIndex).show();
			})

			// 买了又买
			$.get("../json/buyAgain.json", function(data) {
					var html = "";
					$.each(data, function(i, o) {
						html += '<dl class="dl-buy">' +
							'<dt>' + o.title + '</dt>'
						$.each(o.dd, function(i, o) {
							html += '<dd class="clearfix ' + o.classname + '">' +
								'<span class="tag ' + o.grey + '">TOP' + o.num + '</span>' +
								'<a href="" class="img-link" target="_blank">' +
								'<div class="cover-img cover-img" style="background-image:url(' + o.imgSrc + '"></div>' +
								'</a>' +
								'<div class="data">' +
								'<p class="title">' +
								'<a href="../html/product.html" target="_blank">' + o.name +
								'</a>' +
								'</p>' +
								'<div class="data-1">' +
								'<p class="price clearfix">' +
								'<span class="rede1">¥</span>' +
								'<span class="now-price">' + o.nowprice + '</span>' +
								'<span class="old-price">¥' + o.oldprice + '</span>' +
								'</p>' +
								'<p class="state">' +
								o.state +
								'<br>' +
								'<a href="" target="_blank">' + o.back + '</a>' +
								'</p>' +
								'</div>' +
								'</div>' +
								'</dd>';
						});
						html += '</dl>';
					});
					$(".index-buy-list").html(html);
					$(".dl-buy").mouseover(function() {
						var $buyIndex = $(this).index();
						$(".dl-buy").eq($buyIndex).children("dd").mouseover(function() {
							$(this).removeClass("ex-first").addClass("first").siblings().removeClass("first").addClass("ex-first");
						});
						$(".dl-buy").eq($buyIndex).mouseleave(function() {
							$(this).children("dd").removeClass("first").addClass("ex-first");
							$(this).children("dd").eq(0).removeClass("ex-first").addClass("first");
						})
					});
				})
				//新品黑马
			$.get("../json/newgoods2.json", function(data) {
				var html = "";
				$.each(data, function(i, o) {
					html += '<li>' +
						'<a href="" class="ex-firat" target="_blank">' +
						'<div class="cover-img cover-img" style="background-image:url(' + o.imgSrc + ');"></div>' +
						'</a>' +
						'<div class="sign"></div>' +
						'<div class="data">' +
						'<p class="price clearfix">' +
						'<span class="rede1">¥</span>' +
						'<span class="now-price">' + o.nowprice + '</span>' +
						'<span class="old-price">¥' + o.oldprice + '</span>' +
						'</p>' +
						'<p class="title">' +
						'<span class="rede1"></span>' +
						'<a href="../html/product.html" class="ex-first clearfix" target="_blank">' +
						o.name +
						'</a>' +
						'</p>' +
						'</div>' +
						'<div class="comment">' +
						'<div class="bg"></div>' +
						'<div class="comment-text">' +
						'<p>推荐理由：' +
						'<br>' +
						o.text +
						'</p>' +
						'</div>' +
						'</div>' +
						'</li>';
				});
				$(".index-newest-list>ul").html(html);
			})

			//今日闪购
			// left
			$.get("../json/shangleft.json", function(data) {
				var html = "";
				$.each(data, function(i, o) {
					html += '<li class="clearfix" style="' + o.hide + '">' +
						'<a href="" class="index-sale-img">' +
						'<div class="cover-img" style="background-image:url(' + o.imgSrc + ');"></div>' +
						'</a>' +
						'<div class="data">' +
						'<div class="timeout">距闪购结束' +
						'<span class="data-hour">00</span>' +
						'<span class="colon">:</span>' +
						'<span class="data-min">00</span>' +
						'<span class="colon">:</span>' +
						'<span class="data-sec">00</span>' +
						'</div>' +
						'<p class="title">' +
						'<span class="discount">' + o.discount + '折</span>' +
						'<a href="../html/product.html" target="_blank">' +
						o.name +
						'</a>' +
						'</p>' +
						'<p class="intro">' +
						o.intro +
						'</p>' +
						'<p class="price clearfix">' +
						'<span class="rede1">¥</span>' +
						'<span class="now-price">' + o.nowprice + '</span>' +
						'<span class="old-price">¥' + o.oldprice + '</span>' +
						'</p>' +
						'<div class="function">' +
						'<a href="" target="_blank" class="btn-buy">立即抢购</a>' +
						'<span class="info">' + o.info + '人购买</span>' +
						'</div>' +
						'</div>' +
						'</li>';
				});
				$(".index-sale-list>ul").html(html);
				$countDown("2017/9/26 00:00:00", ".timeout");
				//倒计时
				function $countDown(time, id) {
					var hour_elem = $(id).find('.data-hour');
					var minute_elem = $(id).find('.data-min');
					var second_elem = $(id).find('.data-sec');
					var end_time = new Date(time).getTime(), //月份是实际月份-1
						sys_second = (end_time - new Date().getTime()) / 1000;
					var timer = setInterval(function() {
						if(sys_second > 1) {
							sys_second -= 1;
							var hour = Math.floor((sys_second / 3600) % 24);
							var minute = Math.floor((sys_second / 60) % 60);
							var second = Math.floor(sys_second % 60);
							$(hour_elem).text(hour < 10 ? "0" + hour : hour); //计算小时
							$(minute_elem).text(minute < 10 ? "0" + minute : minute); //计算分钟
							$(second_elem).text(second < 10 ? "0" + second : second); //计算秒杀
						} else {
							clearInterval(timer);
						}
					}, 1000);
				}
			})

			$(".flash-expand").click(function() {
				$(".index-sale-list>ul>li").show();
				$(".flash-expand").hide();
			});
			// right
			$.get("../json/shangright.json", function(data) {
				var html = "";
				$.each(data, function(i, o) {
					html += '<ul style="' + o.hide + '">'
					$.each(o.list, function(i, o) {
						html += '<li class="clearfix">' +
							'<a href="" target="_blank" class="forenotice-title">' +
							'<div class="cover-img" style="background-image:url(' + o.imgSrc + ');"></div>' +
							'</a>' +
							'<div class="data">' +
							'<p class="title">' +
							'<span class="discount">' + o.discount + '折</span>' +
							'<a href="../html/product.html" target="_blank">' +
							o.name +
							'</a>' +
							'</p>' +
							'<p class="intro">' + o.intro + '</p>' +
							'<div class="function">' +
//							'<a href="javascript:;">' +
//							'<span class="ico-collect"></span>收藏' +
//							'</a>' +
							'<button class="btn-cart">立即抢购</button>' +
							'</div>' +
							'</div>' +
							'</li>';
					});
					html += '</ul>';
				});
				$(".index-tommorrow>span").html(html);
				var $tomIndex = 0;
				$(".flash-scroll-up").click(function() {
					$tomIndex--;
					$tomIndex %= 3;
					$(".index-tommorrow>span>ul").hide().eq($tomIndex).show();
				})
				$(".flash-scroll-down").click(function() {
					$tomIndex++;
					$tomIndex %= 3;
					$(".index-tommorrow>span>ul").hide().eq($tomIndex).show();
				})
			});
			

//回到顶部
$(window).scroll(function(){
	if($("body").scrollTop()>1000){
		$(".go-top").fadeIn(200);
	}else{
		$(".go-top").fadeOut(200);
	}
} );
$(".go-top").click(function(){
	$("body").animate({
		scrollTop:0
	},400);
});