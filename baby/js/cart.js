$(function(){
//-----------------------购物车商品信息的生成--------------------------------------------------------------------------------
    $.cookie.json = true;
    //显示cookie中购物车的信息
    var _products = $.cookie("products") || [];
    //没有选购商品时
    // if(_products.length === 0){
    //     $("#empty").show();
    //     $("#content").hide();
    //     $("#contentbox").css({background:"#f2f2f0"});
    //     $("#topbox").css({background:"#f2f2f0",border: 0});
    // }else{ 
    var _phone = $.cookie("phone") || "";
    function exists(product,products){  
        for (var i = 0, len = products.length; i < len; i++){
            if (products[i].id === product.id && products[i].color === product.color && products[i].size === product.size)
                return i;
        } 
        return -1;  
    }
    $.ajax({
        url:"../php/cart.php",
        type:"post",
        dataType:"json",
        async:false,
        data:{ 
            action:"select",
            phone:_phone
        }, 
        success:function(data){
            // console.log(data.length);
            if(data.length != ""){ 
                // data = JSON.parse(data);
                console.log(data);
                data.forEach(function(cur,idx,arr){
                    var d = {};
                    d["id"] = cur.product_id;
                    var t = cur.product_img.split("&");
                    d["img"] = "../" + t[0];
                    d["name"] = cur.product_name;
                    d["color"] = cur.product_color;
                    d["size"] = cur.product_size;
                    d["amount"] = cur.amount;
                    d["price"] = cur.product_price;
                    d["src"] = cur.src;
                    d["tz"] = cur.product_gz;
                    
                    var index = exists(d,_products);
                    if(index == -1)
                        _products.push(d);
                    else
                        _products[index].amount = Number(_products[index].amount) + Number(d[amount]);
                });
                console.log(_products);
                
                $.cookie("products",_products,{path:"/"});
            }
            
        }
        
    });
    //没有选购商品,购物车也没有东西
    if(_products.length === 0){
        $("#empty").show();
        $("#content").hide();
        $("#contentbox").css({background:"#f2f2f0"});
        $("#topbox").css({background:"#f2f2f0",border: 0});
    }else{ 
        $("#empty").hide();
        $("#content").show();
        $("#contentbox").css({background:"#fff"});
        $("#topbox").css({background:"#fff"});

        console.log(_products);
        //显示商品
        var data0 = {
            products:_products
        };
        // console.log(_products);
        console.log($.cookie("products"));
        var html0 = template("product_template",data0);
        $(".c_menu").after(html0);

    }

    //鼠标经过图片，放大


    //全选按钮，实现全选
    $("#contentbox .inputwarp").click(function(){
        $(this).toggleClass("checked"); 

        if($(this).hasClass("checked")){
            $(this).removeClass("nocheck");
            $(".it_mck").toggleClass("checked");
            $(".btn").removeClass("disabled");
        }        
        else{
            $(this).addClass("nocheck");
            $(".it_mck").removeClass("checked").addClass("nocheck");            
            $(".btn").addClass("disabled");            
        }
        Cal();
    });
    //单选按钮
    $("#content").on("click",".it_mck",function(){
        $(this).toggleClass("checked");

        if(!$(this).hasClass("checked")){
            $("#contentbox .inputwarp").removeClass("checked");              
            $(this).addClass("nocheck");            
        }
        
         //单选全选中时，全选选中
        var checks = $("#content .it_mck"),count=0;
        for(var i=0;i<checks.length;i++){
            if($(checks[i]).hasClass("checked"))
                count++;                                        
        }
        if(count === checks.length)
            $("#contentbox .inputwarp").addClass("checked");

        // 判断是否有勾选商品进行结算
        if(count>0)
            $(".btn").removeClass("disabled");
        if(count === 0)
            $(".btn").addClass("disabled");

        Cal();
 
    });

    //合计
    function Cal(){
        var total = 0;
        $("#content .c_total").each(function(index,money){
            if($(this).siblings(".it_mck").hasClass("checked"))
                total += Number($(this).children("em").text());
        });
        $("#content .c_count").children("label").text("¥"+total);
    }
    Cal();
    
    //删除
    $("#content .c_operate a").click(function(){
        var flag = confirm("是否要从购物车中移除此商品？");
        if(flag){//删除商品
            //从页面上删除此商品
            $(this).parents(".c_list").detach();
            //cookie中删除此商品
            var idx = Number($(this).attr("title"));
            _products.splice(idx,1);
            //将修改后的_products放入cookie中
            $.cookie("products",_products);

             //是否清空购物车中物品
            if(_products.length === 0){
                $("#empty").show();
                $("#content").hide();
                $("#contentbox").css({background:"#f2f2f0"});
                $("#topbox").css({background:"#f2f2f0",border: 0});
            }

        }
       Cal();
    });
    
   
   //减号样式的切换
   $("#content .reduce").each(function(index,r){
       jian($(this),Number($("#content .g_num").eq(index).val()));
   });

   //数量的修改
    //加
   $("#content .add").click(function(){
        var index = Number($(this).parents(".c_list").children(".c_operate").children("a").attr("title"));               
        var amount = Number($("#content .g_num").eq(index).val());//获取当前商品的数量   
        amount++;
        
        //修改页面上的数量显示
        $("#content .g_num").eq(index).val(amount);
        //修改小计
        var t = Number($("#content .c_price").eq(index).text()) * amount;
        $("#content .c_total").eq(index).children("em").text(t);
        //修改对应_products中商品数量
        _products[index].amount = amount;
        //将修改后的_products放入cookie中
        $.cookie("products",_products);

        Cal();

        jian($(this).siblings(".reduce"),amount);

   });
   //减
   $("#content .reduce").click(function(){
        var index = Number($(this).parents(".c_list").children(".c_operate").children("a").attr("title"));               
        var amount = Number($("#content .g_num").eq(index).val());//获取当前商品的数量          
        amount--;
        if(amount <= 1){
            amount = 1;
        }
        //修改页面上的数量显示
        $("#content .g_num").eq(index).val(amount);
        //修改小计
        var t = Number($("#content .c_price").eq(index).text()) * amount;
        $("#content .c_total").eq(index).children("em").text(t);
        //修改对应_products中商品数量
        _products[index].amount = amount;
        //将修改后的_products放入cookie中
        $.cookie("products",_products);

        Cal(); 

        jian($(this),amount);

   }); 

   //是否可以减数量 
   function jian(element,amount){
        if(amount > 1){
            element.removeClass("disabled");
        }else{
            element.addClass("disabled");
        }
   }
   //结算
   var pros=[];
   $("#content .btn").click(function(){
        $.cookie.json = true;//自动json转换
        var _phone = $.cookie("phone") || "";

        if(_phone === ""){
            window.location = "../html/zhuce.html?#denglu";
        }
        else{
            //将购物车中商品信息保存到数据库，即cookie中product存入数据库
            //从cookie中读取商品信息
            $.cookie.json = true;//自动json转换
            var _products = $.cookie("products");
            // var flag;
            // $.ajax({ 
            //     url:"../php/cart.php",
            //     type:"post",
            //     async:false,
            //     data:{
            //         action:"select",
            //         phone:_phone
            //     }
            // });
            //加入数据库
            _products.forEach(function(product){
                $.ajax({
                    url:"../php/cart.php",
                    type:"post",
                    async:false,
                    data:{ 
                        action:"insert", 
                        phone:_phone,
                        product_id:product.id,
                        color:product.color,
                        size:product.size,
                        amount:product.amount,
                        src:product.src    
                    }
                });
            });
 
            $.cookie("products",null,{expires:-1,path:"/"});

            //将需要付款购买的商品信息保存到cookie
            var total_money = $("#content .c_count").children("label").text().slice(1);
            
            var goods = $("#content .it_mck");
            for(var i=0;i<goods.length;i++){
                if($(goods[i]).hasClass("checked"))
                    pros.push(_products[i]);                                               
            }
            if(pros.length > 0){
                pros.push(total_money);
                window.location = "../html/order.html";
                $.cookie("pros",pros,{path:"/"});
            }
        }
    });
     
});