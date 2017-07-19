$(function(){
    //判断当前商品是否已经选过
    function exists(product,products){  
        for (var i = 0, len = products.length; i < len; i++){
            if (products[i].id === product.id && products[i].color === product.color && products[i].size === product.size)
                return i;
        }
        return -1;
    }
 
    //“加入购物车”点击事件
    $("#cart").click(function(){
        var _good = $(this).parents(".show_right");
        var tz = _good.children(".pr_box").children().first().children(".tit_txt").text(); 
        var _product = {};

        //获取当前页面的商品信息
        _product = {
            id:$(".g_id").text(),
            img:$("#sel1 a").children(".i_selected").siblings("img").attr("src"),
            name:_good.children(".title").children("span").text(),
            color:$("#sel1 a").children(".i_selected").siblings(".word").text() || null,
            size:$("#sel2 a").children(".i_selected").siblings("em").text() || null,
            amount:$("#buyAmount").text(),
            price:$("#item_price").text(),
            src:location.href,
        }
        if(tz === "套装")
             _product.tz = true;
        else
            _product.tz = false;
 
        // console.log(_product); 
        // 从cookie中读取products
        $.cookie.json = true;//自动json转换
        var _products = $.cookie("products") || [];

        //判断当前商品是否已经选过
        var index = exists(_product,_products);
        
        if(index === -1){//当前商品没有选购过
            _products.push(_product);

            //将选购的商品信息插入到数据库中 

        }else{//当前商品选购过
            var amount = Number(_products[index].amount) + Number(_product.amount);
            _products[index].amount = amount ;

            //将修改对应数据库中商品数量
        }

        // console.log(_products);         
        //将修改后的products存储到cookie中
        $.cookie("products",_products,{path:"/"});

        console.log($.cookie("products"));
        alert("加入购物车成功！");
    });
    
});