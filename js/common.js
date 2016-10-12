// 头部
$(".regtip-close").click(function(){
	$(".da-reg-tip").hide();
});
$(".d-da").hover(function(){
	$(".da-code").show();
},function(){
	$(".da-code").hide();
})
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


