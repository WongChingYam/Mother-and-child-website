$(function(){ 
    //数量的加减
    var num = Number($("#buyAmount").text());//获取当前购买商品的数量
    
    $("#show .add").click(function(){
        num++;
        $("#buyAmount").text(num);
    });
    $("#show .reduce").click(function(){
        if(num > 1){
            num--;
            $("#buyAmount").text(num);
        }
    });
    //阻止多次点击选中的行为
    $("#show .num_select").on("selectstart",function(){
        return false;
    });

    //商品详情导航栏的固定
    var height = $("#main-content .nav-bar").offset().top;
    //滚动鼠标，当商品导航栏到当前窗口顶部及以上隐藏位置，固定在当前窗口顶部位置
    $(window).scroll(function(){
        if($(window).scrollTop() > height)
            $("#main-content .nav-bar").addClass("nav-bar-fixed");
        else
            $("#main-content .nav-bar").removeClass("nav-bar-fixed");
    });

    //鼠标点击商品导航栏，样式、内容的变化
    var autoScroll = false;
    $("#main-content .nav-bar").on("click","li",function(){
        var index = $(this).index();//当前点击li的索引
        var _top = $("#main-content .floor").eq(index).offset().top;
        $("html,body").stop().animate({scrollTop:_top},1000,function(){
            autoScroll = false;
        });
        autoScroll = true;
        $(this).addClass("current").siblings("li").removeClass("current");        
    });

    //放大镜效果
    $("#show .show_left .show_left1").hover(function(){
        $("#show .glass").css("display","block");
        $("#show .big").css("display","block");
    },function(){
        $("#show .glass").css("display","none");
        $("#show .big").css("display","none");
    });

    var _glassWidth = parseFloat($("#show .glass").outerWidth()),//放大镜盒子的宽
        _glassHeight= parseFloat($("#show .glass").outerHeight()),//放大镜盒子的高
        _boxWidth = $("#show .show_left1").outerWidth(),
        _boxHeight = $("#show .show_left1").outerHeight();

    $("#show .show_left1").mousemove(function(e){
        e = e || event;
        //记录鼠标在文档中的位置
        var _pageX=e.pageX?e.pageX : e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft),
            _pageY=e.pageY?e.pageY : e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);

        //设置放大镜在文档中的位置
        var _left = _pageX - _glassWidth/2 - $("#show .show_left1").offset().left,
            _top = _pageY - _glassHeight/2 - $("#show .show_left1").offset().top;

        $("#show .glass").css({left:_left+"px",top:_top+"px"});

        if(_left<0)
            _left=0;
        else if(_left>_boxWidth-_glassWidth)
            _left=_boxWidth-_glassWidth;

        if(_top<0)
            _top=0;
        else if(_top>_boxHeight-_glassHeight)
            _top=_boxHeight-_glassHeight;

        $("#show .glass").css({left:_left+"px",top:_top+"px"});

        //设置大图显示的位置，即大图移动位置
        var rateX = _boxWidth/_glassWidth,
            rateY = _boxHeight/_glassHeight;
        var _width = rateX * _boxWidth + "px",
            _height = rateX * _boxHeight + "px",
            _left = -rateX * _left +"px",
            _top = -rateY * _top + "px";
        
        $("#show .big img").css({width:_width,height:_height,left:_left,top:_top});
    });

    //查看不同的图片
    $("#show .show_left2").on("mouseenter","a",function(){
        var index = $(this).index();
        $(this).addClass("selected").siblings().removeClass("selected");
        $(".show_left1 img").eq(index).addClass("cur").siblings("img").removeClass("cur");
        $("#show .big img").eq(index).addClass("cur").siblings("img").removeClass("cur");
    });
});