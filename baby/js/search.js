$(function(){
    var name = $.cookie("search") || "";
    
    if(name == ""){
        $("#shopping").empty().append("<div>找到0个商品，请减少筛选条件再尝试一下吧</div>");
    }
    else{
        $.ajax({
            url:"../php/search.php",
            data:{p_name:name},
            dataType:"json",
            success:function(data){ 
                console.log(data);
                if(data.length==0)
                    $("#shopping").empty().append("<div>找到0个商品，请减少筛选条件再尝试一下吧</div>");
                else{
                    //显示商品
                    var data0 = {
                        products:data
                    };
                    var html = template("search_template",data0);
                    $("#shopping ul").append(html);
                    $("#shopping ul li").on("click","a",function(){
                        var id = $(this).children(".p_id").text();
                        $.cookie("id",id,{path:"/"});
                    })
                }

            }
        });
    }

});