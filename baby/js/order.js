$(function(){

    //-----------------------订单的生成--------------------------------------------------------------------------------
    $.cookie.json = true;
    var pros = $.cookie("pros") || [];
    var total_money = pros.pop();
    
    console.log(pros,$.cookie("pros"));
    $("#topbox").css("background","#fff");

    $(".address").css("visibility","hidden"); 
    $(".newadress").hide();

    //增加地址
    $(".addnewadress").click(function(){
        //通过接口获取省市区
        $.when($.ajax("https://route.showapi.com/1149-1?areaName=&level=1&maxSize=20&page=1&showapi_appid=29550&showapi_sign=e48f5d7e50334ffca41693016df78054"), $.ajax("https://route.showapi.com/1149-1?areaName=&level=1&maxSize=20&page=2&showapi_appid=29550&showapi_sign=e48f5d7e50334ffca41693016df78054")).then(function(data1,data2){
            var prov = data1[0].showapi_res_body.data;
            var html = "";
            var index = 0;
            prov.forEach(function(province){
                index++;
                html += "<option value='"+province.id+"'>"+province.areaName + "</option>";
            });

            prov = data2[0].showapi_res_body.data;
            prov.forEach(function(province){
                index++;
                html += "<option value='"+province.id+"'>"+province.areaName + "</option>";
            });

            $("#province").append(html);
            initCity();//加载城市
        });
        // 初始化城市
        function initCity(){
            var provinceId = $("#province").val();
            $.ajax("http://route.showapi.com/1149-2?parentId="+provinceId+"&showapi_appid=29550&showapi_sign=e48f5d7e50334ffca41693016df78054").done(function(data){
                var city = data.showapi_res_body.data;
                var html = "";
                var index = 0;
                
                city.forEach(function(c) {
                    index++;
                    html += "<option value='"+ c.id +"'>" + c.areaName + "</option>";
                });
                $("#city").empty().append(html);
                initDistrict();//加载区域
            });
        }
        // 初始化区域
        function initDistrict() {
            var cityId = $("#city").val();
            $.ajax("https://route.showapi.com/1149-2?parentId="+ cityId +"&showapi_appid=29550&showapi_sign=e48f5d7e50334ffca41693016df78054").done(function(data){
                var district = data.showapi_res_body.data;
                var html = "";
                var index = 0;

                district.forEach(function(dist) {
                    index++;
                    html += "<option value='"+ dist.id +"'>" + dist.areaName + "</option>";
                });             
                $("#area").empty().append(html);
            });
        }
        //省份或城市改变，重新加载
        $("#province").on("change", initCity);
        $("#city").on("change", initDistrict);


        $("#ship_name").val("");
        $("#ship_address_detail").val("");
        $("#ship_mobile").val("");
        $(".newadress").show();


    });

    //检验收货人信息
    //检验收货人姓名是否为空
    var keep = false;
    var name = "",address = "",txt = "",area="";
    function checkName(name){
        if(name == ""){
            $("#new_name_error").show();
            keep = false;
        }
        else{
            $("#new_name_error").hide();  
            keep = true;
        }
    }
    $("#ship_name").blur(function(){
        name = $(this).val();
        checkName(name);
    });
    //检验地址是否为空
    function checkAddress(address){
        if(address == ""){
            $("#new_address_error").show();
            keep = false;
        }
        else{
            $("#new_address_error").hide();  
            keep = true;
        }
    }
    $("#ship_address_detail").blur(function(){
        address = $(this).val();
        checkAddress(address);
    });
    //验证手机号码是否为空，格式是否正确
    function checkPhone(txt){
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if(txt == ""){
            $("#new_mobile_error").show();
            keep = false;
        }
        else if(!reg.test(txt)){
            $("#new_mobile_error").text("手机号码格式不正确").show();
            keep = false;
        }
        else{
            $("#new_mobile_error").hide();  
            keep = true;
        }
    }
    $("#ship_mobile").blur(function(){
        txt = $(this).val();
        checkPhone(txt);
    });

    //点击取消，隐藏收货人信息的填写栏
    $("#cancelAddress").click(function(){
        $(".newadress").hide();
    });

    //保存收件人地址信息
    var name1,area1,address1,txt1;
    $("#saveAddress").click(function(){
        name = $("#ship_name").val();
        address = $("#ship_address_detail").val();
        txt = $("#ship_mobile").val();
        checkName(name);
        checkAddress(address);
        checkPhone(txt);

        if(keep){
            $("#province").children().each(function(){
                if($(this).val() === $("#province").val())
                    area += $(this).text() + " ";
            });
            $("#city").children().each(function(){
                if($(this).val() === $("#city").val())
                    area += $(this).text() + " ";
            });
            $("#area").children().each(function(){
                if($(this).val() === $("#area").val())
                    area += $(this).text();
            });

            $(".newadress").hide();

            $(".tplNameN1").text(name);
            $(".area").text(area);
            $(".adr1").text(address);
            $(".phone").text(txt);
            $(".address").css("visibility","visible");

            $(".last_ad").text(area + " " + address);
            $("#last_name").text(name);
            $("#last_phone").text(txt);

            name1=name;area1=area;address1=address;txt1=txt;
            name = "";area="";address="";txt="";      
        }

        
    });

    $(".address .ad").hover(function(){
        $(".editor").show();
    },function(){
        $(".editor").hide();        
    });

    //删除收件人信息
    $(".newdelete").click(function(){
        var del = confirm("确定要删除此地址？");
        if(del){
            $(".address").css("visibility","hidden");
            $(".last_ad").text("");
            $("#last_name").text("");
            $("#last_phone").text("");
        }
        else
            $(".address").css("visibility","visible");                  
    });

    //修改收件人信息
    $(".bianji").click(function(){
        var ar = area1.split(" ");
        $("#ship_name").val(name1);
        $("#ship_address_detail").val(address1);
        $("#ship_mobile").val(txt1);
        $("#province").children().each(function(){
            if($(this).text() == ar[0])
                $(this).attr("selected","selected");
        });
        $("#city").children().each(function(){
            if($(this).text() == ar[0])
                $(this).attr("selected","selected");
        });
        $("#area").children().each(function(){
            if($(this).text() == ar[0])
                $(this).attr("selected","selected");
        });
        $(".newadress").show();
    });

    //商品清单显示
    var datas = {
        prods:pros
    };
    var htmls = template("productBuy_template",datas);
    $("#goods").append(htmls);

    //商品总计
    var n = 0;
    pros.forEach(function(cur){
        n += Number(cur.amount);
    })
    $(".count_amount").text(n);
    $(".count_money").text(total_money);
    $(".pay").text(total_money);
    $("#last_pay").text(total_money);

    //点击结算时，生成订单，保存数据库

}); 