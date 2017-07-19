$(function(){
    $("#login").click(function(){
        $.ajax({
            url:"php/login.php",
            type:"post",
            dataType:"json",
            data:{
                number:$("#inputNumber").val(), 
                password:$("#inputPassword3").val()
            },
            success:function(data){
                if(data.length == 0){
                    alert("账号或密码错误！");
                }
                else{
                    var n = $("#inputNumber").val();
                    window.location = "html/index.html";
                    $.cookie("number",n,{path:"/"});
                }
            }
        })
    })
})