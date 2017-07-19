
window.onload=function(){
//轮播图
/*************************************************/    
    var imgs=$("img",$(".imgList",$("#container"))[0]),
        currentIndex=0,//当前显示图片的索引
        nextIndex=1,//即将显示图片的索引
        circles=[];//存放所有小圆点DOM元素的数组

    //自动轮播
    setInterval(changeImg,30000);

    //动态添加小圆点
    for(var i=0;i<imgs.length;i++){
        var _span=document.createElement("span");
        //将创建的span DOM元素添加到div.buttons元素内
        $(".buttons",$("#container"))[0].appendChild(_span);

        //默认给第一个小圆点加上红色背景
        if(i===0)
            _span.className="on"; 

        //将当前创建的小圆点保存到数组中
        circles.push(_span);

        //在当前创建的DOM元素上缓存索引
        _span.index=i;

    } 

    //鼠标移入小圆点时，显示对应的图片
    $(".buttons",$("#container"))[0].onmouseover=function(e){
        e=e||event;

        //获取触发事件的事件源
        var src=e.target || e.srcElement;

        if(src.nodeName.toLowerCase()==="span"){
            //显示对应小圆点索引的图片
            if(src.index !== currentIndex)
                nextIndex=src.index;

            changeImg();
        }
    }

    //向下翻页
    $("#next")[0].onclick=changeImg;
    //向上翻页
    $("#prev")[0].onclick=function(){
        nextIndex=currentIndex-1;
        if(nextIndex<0)
            nextIndex=imgs.length-1;

        changeImg();
    }

    //切换图片
    function changeImg(){
        //当前正在显示的图片淡出
        fadeOut(imgs[currentIndex],800);
        //即将显示的图片淡入
        fadeIn(imgs[nextIndex],800);

        //修改小圆点
        circles[currentIndex].className="";
        circles[nextIndex].className="on";

        //修改索引值
        currentIndex=nextIndex;
        nextIndex++;
        if(nextIndex>=imgs.length)
            nextIndex=0;
    }

    //推荐模块商品信息获取显示
    $.ajax({
        url:"php/index.php",
        dataType:"json",
        type:"post",
        data:{action:"select_products"},
        // async:false,
        success:function(data){
             var datas = {
                products:data,
            }
            var html = template("pro_template",datas);
            $("#focus .tui_jian").append(html);

            //查看商品详情
            $("#focus .pro_details").on("click",function(){
                var id = $(this).children(".g_id").text();
                // console.log(id);
                $.cookie("id",id,{path:"/"});
                window.location = "html/kind1-1.html";       
            });
        }
    });

    //从数据库中获取今日上新商品
    $.ajax({
        url:"php/index.php",
        dataType:"json",
        type:"post",
        data:{action:"select_today"},
        async:false,
        success:function(data){
            console.log(data);
            var kinds = [];
            
            data.forEach(function(curr){
                var kind = {};
                kind["kind"] = curr.kind
                kind["kind_img"] = curr.kind_img;
                
                kinds.push(kind);
            });
            for(var i=0;i<kinds.length;i++){
                for(var j=i;j<kinds.length;j++){
                    if(kinds[i].kind == kinds[j].kind)
                        kinds.splice(j,1);
                }
            }
            // console.log(kinds);

            kinds.forEach(function(curr){
                var products = [];
                data.forEach(function(c){
                    if(c.kind == curr.kind){
                        products.push(c);
                    }
                });
                curr["products"] = products;
            });
            console.log(kinds);
            
            var datas = {
                newKind:kinds,
            }
            var html = template("new_template",datas);
            $("#content").append(html);

        }
    });

    //查看商品详情
    $(".p_datails").on("click",function(){
        var id = $(this).children(".p_id").text();
        // console.log(id);
        $.cookie("id",id,{path:"/"});
        console.log($.cookie("id")); 
        window.location = "html/kind1-1.html";       
    });

}
 




