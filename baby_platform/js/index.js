$(function(){
    //将管理员账号显示到页面
    $("#number").text($.cookie("number"));

    //退出系统
    $("#exits").click(function(){
        window.location = "../login.html";
    })

    //显示所有商品到页面
    showPros();
    function showPros(){
        $.ajax({
            url:"../php/products.php",
            type:"post",
            dataType:"json",
            data:{action:"select"},
            success:function(data){
                console.log(data);
                //显示商品
                var data0 = {
                    products:data
                };
                var html0 = template("product_template",data0);
                $(".list").empty().append(html0);
                $("#delete").on("click",del_Pros);
                $("#search").on("click",sear_Pros);
            }
        }); 
    }
    //显示商品类型
    $.ajax({
        url:"../php/products.php",
        type:"post",
        dataType:"json",
        data:{action:"select_kind"},
        success:function(data){
            console.log(data);
            //显示商品
            var data0 = {
                kinds:data
            };
            var html0 = template("type_template",data0);
            $("#sel").append(html0);
            }
    });

    //上传图片
    var xhr;  
  
    function createXMLHttpRequest() {  
        if (window.ActiveXObject) {  
            xhr = new ActiveXObject("Microsoft.XMLHTTP");  
        } else if (window.XMLHttpRequest) {  
            xhr = new XMLHttpRequest();  
        }  
    }   

    function UpladFile() {  
        var fileObj = document.getElementById("product_img").files[0];  
        var FileController = '../php/file.php';  
        var form = new FormData();  
        form.append("myfile", fileObj);  
        createXMLHttpRequest();  
        xhr.onreadystatechange = function(){handleStateChange(0)};  
        xhr.open("post", FileController, true);  
        xhr.send(form); 
    }
    function UpladFile1() {  
        var fileObj = document.getElementById("product_img1").files[0];  
        var FileController = '../php/file.php';  
        var form = new FormData();  
        form.append("myfile", fileObj);  
        createXMLHttpRequest();  
        xhr.onreadystatechange = function(){handleStateChange(1)};  
        xhr.open("post", FileController, true);  
        xhr.send(form); 
    }  

    function handleStateChange(num) {  
        if (xhr.readyState == 4) {  
            if (xhr.status == 200 || xhr.status == 0) {  
                var result = xhr.responseText;
                //eval是把JSON字符串转换成JSON对象，不转换是没法取对象的属性的。和$.parseJSON()这个方法是一样的。  
                var json = eval("(" + result + ")");  
                // console.log(json.file); 
                if(num==0){
                    $("#img1").empty().append("<img src='"+json.file+"' style='width:120px;height:80px;' class='col-sm-offset-2'>");
                    var path0 = json.file.split("/");
                }
                else if(num==1){
                    $("#img2").empty().append("<img src='"+json.file+"' style='width:120px;height:80px;' class='col-sm-offset-2'>");
                    var path1 = json.file.split("/");
                }
                // if((typeof path0) !== "undefined" && (typeof path1) !== "undefined")
                //         product_img = path0[path0.length-1] + "&" + path1[path1.length-1];
                
                // console.log(product_img);
                $.cookie.json = true;
                if((typeof path0) !== "undefined")
                        $.cookie("path0",path0,{path:"/"});
                if((typeof path1) !== "undefined")
                        $.cookie("path1",path1,{path:"/"});
                        
            }  
        }  
    }  
    
    $("#upfile").on("click", UpladFile);
    $("#upfile1").on("click",UpladFile1);

    //添加商品
    $("#add").click(function(){
        $.cookie.json = true;
        var img1 = $.cookie("path0"),img2 = $.cookie("path1");
        var product_id = $("#product_id").val(),
            product_name = $("#product_name").val(),
            product_info = $("#product_info").val(),
            product_price = $("#product_price").val(),
            product_color = $("#product_color").val(),
            product_size = $("#product_size").val(),
            fit_age = $(":radio[name='fit_age']:checked").next().text(),
            sale_amount = $("#sale_amount").val(),
            product_img = img1[img1.length-1] + "&" + img2[img2.length-1],
            type = $("#sel option:selected").attr("title"),
            gz;
        if($(":radio[name='gz']:checked").next().text() == "是")
            gz = 1;
        else
            gz = 0;
        
        //将商品添加进数据库
        $.ajax({
            url:"../php/products.php",
            type:"post",
            data:{
                action:"insert",
                product_id:product_id,
                product_name:product_name,
                product_info:product_info,
                product_price:product_price,
                product_color:product_color,
                product_size:product_size,
                fit_age:fit_age,
                sale_amount:sale_amount,
                product_img:product_img,
                type:type,
                gz:gz
            },
            success:function(data){
                console.log(data);
                if(data == "成功"){
                    alert("添加成功");
                    $('#myModal').modal('hide');
                }
            }
        })
    });

    //删除商品
    // $("#delete").on("click",del_Pros);
    function del_Pros(){
        var checkboxes = $(":checkbox:checked").not($(":checkbox").first());
        // console.log(checkboxes.length);
        if(checkboxes.length == 0)
            alert("请选择删除的商品！");
        else{
            for(var i=0;i<checkboxes.length;i++){
                var product_id = $(checkboxes[i]).parent("td").siblings("td").first().text();
                var product_size = $(checkboxes[i]).parent("td").siblings("td").eq(4).text();
                var product_color = $(checkboxes[i]).parent("td").siblings("td").eq(5).text();
                $.ajax({
                    url:"../php/products.php",
                    type:"post",
                    data:{
                        action:"delete",
                        product_id:product_id,
                        product_size:product_size,
                        product_color:product_color
                    },
                    success:function(data){
                        if(data == "成功"){
                            alert("删除成功");
                            showPros();
                        }
                        else
                            alert("删除失败");  
                    }
                });
            }
        }
    }

    //搜索商品
    // $("#search").on("click",sear_Pros);
    function sear_Pros(){
        var txt = $("#search_text").val();
        var reg = /^[0-9]*$/;
        // console.log(reg.test(txt));
        if(reg.test(txt)){
            $.ajax({
                url:"../php/products.php",
                type:"post",
                dataType:"json",
                data:{
                    action:"search1",
                    product_id:$("#search_text").val()
                },
                success:function(data){
                    console.log(data);
                    //显示商品
                    var data0 = {
                        products:data
                    };
                    var html0 = template("product_template",data0);
                    $(".list").empty().append(html0);
                    $("#delete").on("click",del_Pros);
                    $("#search").on("click",sear_Pros);
                }
            });
        }else{
            $.ajax({
                url:"../php/products.php",
                type:"post",
                dataType:"json",
                data:{
                    action:"search2",
                    product_name:$("#search_text").val()
                },
                success:function(data){
                    console.log(data);
                    //显示商品
                    var data0 = {
                        products:data
                    };
                    var html0 = template("product_template",data0);
                    $(".list").empty().append(html0);
                    $("#delete").on("click",del_Pros);
                    $("#search").on("click",sear_Pros);
                }
            });
        }
    }

    //显示用户
    $("#list").on("click","li",function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active");

        var index = $(this).index();
        if(index == 0)
            showPros();
        else if(index == 1){
            $.ajax({
                url:"../php/products.php",
                type:"post",
                dataType:"json",
                data:{action:"select_today"},
                success:function(data){
                    console.log(data);
                    //显示商品
                    var data0 = {
                        products:data
                    };
                    var html0 = template("today_template",data0);
                    $(".list").empty().append(html0);
                }
            });
        }
        else if(index == 2){
            $.ajax({
                url:"../php/products.php",
                type:"post",
                dataType:"json",
                data:{action:"select_users"},
                success:function(data){
                    console.log(data);
                    //显示商品
                    var data0 = {
                        users:data
                    };
                    var html0 = template("users_template",data0);
                    $(".list").empty().append(html0);
                }
            });
        }
    });
})