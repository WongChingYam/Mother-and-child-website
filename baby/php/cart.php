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

    if($action == "select"){
        //获取传递过来的数据
        $phone = $_POST["phone"];

        $sql = "select * from cart WHERE phone = '$phone'";
        $result = mysql_query($sql, $conn);
        $arr = array();
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $arr[] = $row; // 将当前行数据保存到数组中
        }
        if(count($arr) >0){
            if($color == "")
                $sql = "SELECT * from products,(SELECT * FROM cart WHERE phone = '$phone') as a where a.product_id = products.product_id";
            else   
                $sql = "SELECT * from products,(SELECT * FROM cart WHERE phone = '$phone') as a where a.product_color= products.product_color and a.product_id = products.product_id";
            $result = mysql_query($sql, $conn);
            $arr1 = array();
            while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
                $arr1[] = $row; // 将当前行数据保存到数组中
            }
            echo json_encode($arr1);

            $sql = "delete from cart where phone = '$phone'";
            mysql_query($sql, $conn);
        }
        else
            echo json_encode(array());
            
    }

    //添加
    if($action == "insert"){
        //获取传递过来的数据
        $phone = $_POST["phone"];
        $product_id = $_POST["product_id"];
        $color = $_POST["color"];
        $size = $_POST["size"];
        $amount = $_POST["amount"];
        $src = $_POST["src"];

        //添加数据库
        $sql = "INSERT INTO cart VALUES(NULL, '$product_id', '$phone', '$color', '$size', '$amount', '$src')";
        $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
        if ($result)
            echo '成功';
        else 
            echo '失败';
    }
    //删除
    if($action == "delete"){
        $phone = $_POST["phone"];
        $product_id = $_POST["product_id"];
        $color = $_POST["color"];
        $size = $_POST["size"];

        $sql = "delete from cart where phone = '$phone' and product_id = '$product_id' and product_color = '$color' and product_size = '$size'";
        $result = mysql_query($sql, $conn);
        if ($result)
            echo '成功';
        else 
            echo '失败';
    }
    //修改
    if($action == "update"){
        $phone = $_POST["phone"];
        $product_id = $_POST["product_id"];
        $color = $_POST["color"];
        $size = $_POST["size"];
        $amount = $_POST["amount"];

        $sql = "UPDATE cart SET amount=$amount WHERE phone = '$phone' and product_id = '$product_id' and product_color = '$color' and product_size = '$size'";
        $result = mysql_query($sql, $conn);
        if ($result)
            echo '成功';
        else 
            echo '失败';
    }
    
?>