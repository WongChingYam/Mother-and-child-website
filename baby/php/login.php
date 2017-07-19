<?php
    $action = $_POST["action"];

    //连接数据库
    $conn = mysql_connect("localhost:3306","root","");
    if(!$conn)
        die("error : " . mysql_error());

    /* 指定连接的具体数据库名称 */
	mysql_select_db("babyDB", $conn);
 
	/* 设置向数据库读写数据时的编码 */
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");

    //检验手机号是否已注册
    if($action == "register_check"){
        $phone = $_POST["phone"];
 
        //查询数据库
        $sql = "SELECT * FROM userInfo";
        $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
        $arr = array();
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $arr[] = $row; // 将当前行数据保存到数组中
        }
	    echo json_encode($arr); 
        
        //将注册手机号与数据库中的比较
        // foreach ($arr as $value){
        //     if($value[0] == $phone){
        //         echo "$value[0]";
        //         break;
        //     }
        // } 
    } 
    //将注册的用户信息加入到数据库中
    if($action == "register"){
        $phone = $_POST["phone"];
        $password = $_POST["password"];
        $b_sex = $_POST["b_sex"];
        $b_birth = $_POST["b_birth"];
        //添加数据库
        $sql = "INSERT INTO userInfo VALUES(NULL,'$phone', '$password', '$b_sex', '$b_birth', NULL, NULL, NULL)";
        $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
        if ($result)
			echo '成功';
		else 
			echo '失败';
    }
    //登录
    if($action == "login"){
        $phone = $_POST["phone"];
        $password = $_POST["password"];

        //查询数据库
        $sql = "SELECT * FROM userInfo";
        $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
        $arr = array();
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $arr[] = $row; // 将当前行数据保存到数组中
        }
        echo json_encode($arr);
        //将注册手机号与数据库中的比较
        // foreach ($arr as $value){
        //     if($value[0] == $phone && $value[1] == $password){
        //         echo "成功";
        //         break;
        //     }
        // }       
    }
    


    /* 关闭连接 */
	mysql_close($conn);

?>