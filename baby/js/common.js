$(function(){ 

    //商品分类导航栏鼠标经过效果
    $("#navbox .kind .list").on("mouseenter","li",function(){
        $(this).addClass("current");
        var index = $(this).index();
        //显示对应商品，鼠标移到商品时，导航栏对应的分类效果不变
        $("#navbox .kind .goods").hide().eq(index).show().hover(function(){
            $("#navbox .kind .list li").eq(index).addClass("current").siblings("li").removeClass("current");
        },function(){
            $("#navbox .kind .list li").removeClass("current");            
        });
    }).on("mouseleave","li",function(){
        $(this).removeClass("current");
        var index = $(this).index();
    });
    //每次商品分类导航栏出现时，第一个分类块显示，其他隐藏
    $("#navbox .kind").mouseleave(function(){
        $("#navbox .kind .list li").first().addClass("current");
        $("#navbox .kind .goods").first().show();
    });


    //返回顶部
    $("#side-panel .panel").last().click(function(){
        $("html,body").stop().animate({scrollTop:0},1000);
    });
    
    $.cookie.json = true;//自动json转换
    var _phone = $.cookie("phone") || "";
    // var _user = $.cookie("user") || [];
    // var exit = true;

    // console.log(_user);
    if(_phone === ""){
        $("#headerbox ul").empty().append('<li>你好，欢迎来到母婴网！</li>'+
                '<li><a href="/baby/html/zhuce.html#denglu">登录</a></li>'+
                '<li><a href="/baby/html/zhuce.html">免费注册</a></li>'+
                '<li><a href="">帮助中心</a></li>');
    }
    else{
        $("#headerbox ul").empty().append('<li>你好，'+ _phone +'</li>'+
                '<li><a href="">帮助中心</a></li>'+
                '<li><a href="/baby/html/zhuce.html?#denglu" id="exit">退出</a></li>');
    }
    // else if(_user.length != 0){
    //     $("#headerbox ul").empty().append('<li>你好，'+ _user[0].phone +'</li>'+
    //             '<li><a href="">帮助中心</a></li>'+
    //             '<li><a href="/baby/html/zhuce.html?#denglu" id="exit">退出</a></li>');
    // }

    //退出
    $("#exit").click(function(){
        $.cookie("phone",null,{expires:-1,path:"/"});

        // $("#headerbox ul").empty().append('<li>你好，欢迎来到母婴网！</li>'+
        //         '<li><a href="html/zhuce.html#denglu">登录</a></li>'+
        //         '<li><a href="html/zhuce.html">免费注册</a></li>'+
        //         '<li><a href="">帮助中心</a></li>');
    });

     //搜索商品
    $("#look").keyup(function(){
        $.ajax({
            url:"https://www.mia.com/instant/welcome/ajaxProductWordName",
            data:{
                lenovoWord:$(this).val()
            },
            dataType:"json",
            async:false,
            success:function(data){
                console.log(data.data);
                var data = data.data; 
                var html="";
                // console.log(typeof data.length);
                if((typeof data.length) != "undefined"){
                    data.forEach(function(curr){
                        // console.log(curr.name);
                        html += "<li>"+curr.name+"</li>"
                    })
                    $("#top .searchInfo ul").empty().append(html);
                    $("#top .searchInfo").show();
                    $("#top .searchInfo ul").on("click","li",function(){
                        console.log($(this).text());
                        $.cookie("search",$(this).text(),{path:"/"});
                        if(window.location.pathname == "/baby/index.html")
                            window.location = "html/search.html";
                        else
                            window.location = "search.html";
                        
                    });
                    $("#sear").click(function(){
                        $.cookie("search",$("#look").val(),{path:"/"})
                        if(window.location.pathname == "/baby/index.html")
                            window.location = "html/search.html";
                        else
                            window.location = "search.html";
                    });
                }
            }
        })
    });
    
    $(document).click(function(){
        $("#top .searchInfo").hide();
    })
});