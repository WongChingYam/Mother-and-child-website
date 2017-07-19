$(function(){
 
    document.getElementById("vf1").value = genCode();

    document.getElementById("change").onclick=function(){
        document.getElementById("vf1").value=genCode();
    }

    function genCode() {
        var rand, // 随机的 unicode 编码
            code = "", // 保存生成验证码字符串内容的变量
            current = 0; // 当前生成验证码的位数

        // 循环生成验证码
        while (current < 4) {
            rand = (Math.floor(Math.random() * (122 - 48 + 1)) + 48);
            // 生成随机数非法的条件
            if (rand > 57 && rand < 65 || rand > 90 && rand < 97)
                continue;
            
            // 随机数合法，表示生成一位验证码
            code += String.fromCharCode(rand);
            current++;
        }
        // 返回生成的验证码
        return code;
    }
    

    //登录、注册界面的切换以及按钮样式的改变
    var lis = $("li",$("nav")[0]),
        links = $("a",$("nav")[0]);
    var current = 0;
    var model = location.hash || "#zhuce";
    
    if(model == "#denglu"){
        current = 1;
        $("#denglu").show();
        $("#zhuce").hide();
    }else{
        $("#zhuce").show();
        $("#denglu").hide();
    }
    lis[current].className = "select";
    links[current].style.color = "#f74f66";
    
    for(let i=0;i<links.length;i++){
        links[i].onclick = function(){//给登录、注册链接绑定点击事件
            lis[current].className = "";
            links[current].style.color = "#939393";
            if(i===1){
                $("#zhuce").hide();
                $(".bottom",$(".invest")[0])[0].style.display = "none"; 
                $("#born").checked = false;  
                $("#unborn").checked = false;                                            
                $("#denglu").show();
            }
            else{
                $("#zhuce").show();
                $("#denglu").hide();
            }
                

            links[i].style.color = "#f74f66"; 
            lis[i].className = "select";
            current = i;
        }
    }

    //注册时，宝宝年龄阶段模块样式的改变
    $("#born").click(function(){
        $(".invest .bottom").show();
        $(".sex3").hide();                        
    });

    $("#unborn").click(function(){
        $(".invest .bottom").show();
        $(".sex3").show();        
    });
    //日期
    var html = "";
    var year = (new Date()).getFullYear();
    var month = (new Date()).getMonth() + 10;
    html += '<option disabled="" selected="">年</option>';
    for(var i = -parseInt(month/12);i<13;i++){
        html += "<option value='"+ (year - i)+ "'>" + (year - i) + "</option>";
    }
    
    $("#year").empty().append(html);//年
    
    var html = "";
    html += '<option disabled="" selected="">月</option>';    
    
    for(var i=1;i<13;i++){
        html += "<option value='"+ i+ "'>" + i + "</option>";        
    }
    $("#month").empty().append(html);//月


    //用户注册验证
    var come_in = false;
    //验证手机号格式
    function checkNo(){
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if(!reg.test($("#phone").val())){
            $(".phone").show();            
            come_in = false;
        }else{
            $(".phone").hide(); 
            come_in = true;                       
        } 
    }
    $("#phone").blur(function(){
        //验证手机号格式
        checkNo();
        //检验手机号是否已注册
        $.ajax({
            url:"../php/login.php",
            type:"post",
            dataType:"json",
            data:{
                action:"register_check",
                no:$("#phone").val()
            },
            success:function(data){
                data.forEach(function(u){
                    if(u.phone == $("#phone").val()){
                        alert("此手机号已注册，请直接登录！");
                        come_in = false;
                    }
                });
            }
        });
    });
    //验证密码
    function checkPwd(){
        var reg = /^.{6,16}$/;
        if(reg.test($("#pwd").val())){
            $(".password").hide();
            come_in = true;
        }else{
            $(".password").show();
            come_in = false;
        }
    }
    $("#pwd").blur(checkPwd);
    //再次验证密码
    function checkp(){
        if($("#pwd2").val() !== $("#pwd").val()){
            $(".password2").show();  
            come_in = false;
        }
        else{
            $(".password2").hide();
            come_in = true;
        }
    }
    $("#pwd2").blur(checkp);
    //验证验证码
    function checkf(){
        if($("#vf0").val().toLowerCase() !== $("#vf1").val().toLowerCase()){
            $(".vf0").show();  
            come_in = false;
        }
        else{
            $(".vf0").hide();
            come_in = true;
        }
    }
    $("#vf0").blur(checkf);
    //验证是否填写宝宝资料
    function checkBaby(){
        var sex = $("input[name='child']:checked").val();
        var y = $("select[name='year'] option:selected").val();
        var m = $("select[name='month'] option:selected").val();
        var d = $("select[name='day'] option:selected").val();

        if((typeof sex) === "undefined" || y === "年" || m === "月" || d === "日"){
            alert("请完善右侧您的宝宝的资料！");
            come_in = false;
        }else
            come_in = true;
        
        return y+"/"+m+"/"+d;
    }

    //提交注册
    $("#sub").click(function(){
        checkNo();
        checkPwd();
        checkp();
        checkf();
        checkBaby();

        if(come_in){
            var b_birth = checkBaby();
            //将用户信息添加数据库 
            $.ajax({
                url:"../php/login.php",
                type:"post",
                data:{
                    action:"register",
                    phone:$("#phone").val(),
                    password:$("#pwd").val(),
                    b_sex:$("input[name='child']:checked").val(),
                    b_birth:b_birth
                },
                success:function(data){
                    if(data == "成功"){
                        window.location = "../index.html";
                        $.cookie.json = true;//自动json转换
                        $.cookie("phone",$("#phone").val(),{expires:3,path:"/"});
                    }
                    else
                        alert("注册失败！");
                }
            });

        }
    });

    //登录验证
    //之前记住过密码
    $.cookie.json = true;//自动json转换
    var _user = $.cookie("user") || [];
    if(_user.length != 0){
        $("#phone1").val(_user[0].phone);
        $("#password1").val(_user[0].password);
        $("#free").attr("checked","checked");
    }
    function checkNo1(){
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if(!reg.test($("#phone1").val())){
            $(".phone1").show();            
            // come_in = false;
        }else{
            $(".phone1").hide(); 
            // come_in = true;                       
        } 
    }
    $("#phone1").blur(function(){
        //验证手机号格式
        checkNo1();
    });
    //点击登录
    $("#sub1").click(function(){
        //验证手机号和密码
        $.ajax({
            url:"../php/login.php",
            type:"post",
            dataType:"json",
            data:{
                action:"login",
                phone:$("#phone1").val(),
                password:$("#password1").val()
            },
            success:function(data){
                var come = false;
                data.forEach(function(u){
                    if(u.phone == $("#phone1").val() && u.password == $("#password1").val()){
                        //记住密码,保存到cookie中
                        if($("input:checked").attr("id") === "free"){
                            $.cookie.json = true;//自动json转换
                            // var users = $.cookie("users") || [];
                            var user = [];
                            var _user = {
                                phone:$("#phone1").val(),
                                password:$("#password1").val(),
                            };
                            user.push(_user);
                            
                            $.cookie("user",user,{expires:7,path:"/"});
                        
                        }
                        //登录成功，跳转页面
                        $.cookie.json = true;//自动json转换
                        $.cookie("phone",u.phone,{expires:3,path:"/"});
                        // console.log($.cookie("phone"));
                        window.location = "../index.html";
                        // console.log("111");
                        come = true;
                    }
                }); 
                if(window.location.pathname == "/baby/html/zhuce.html" && !come){
                    alert("手机号或密码错误！");      

                }
            }
        });
    });
 
});
