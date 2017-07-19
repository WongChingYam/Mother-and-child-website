$(function(){ 
	//为分类动态设置样式
	$(".sort ul").on("mouseenter","li",function(){
		console.log($(this).children("a"));
		$(this).children("a").children("img").hide();
		$(this).children("a").children("span").show();
		$(this).children("a").css("borderColor","#ff4965");
	});
	$(".sort ul").on("mouseleave","li",function(){
		$(this).children("a").children("img").show();
		$(this).children("a").children("span").hide();
		$(this).children("a").css("borderColor","#ececec");
	});
});