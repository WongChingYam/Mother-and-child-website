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

    if($action == "select_kind"){
        //查询数据库
        $sql = "SELECT * FROM type";
        $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
        $arr = array();
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $arr[] = $row; // 将当前行数据保存到数组中
        }
        echo json_encode($arr);
    }
    //搜索
    if($action == "search1"){
        //根据商品product_id，在数据库中查找到对应的商品详细信息
        $product_id = $_POST["product_id"];
        
        //查询数据库
        $sql = "SELECT * FROM products where product_id = '$product_id'";
        $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
        $arr = array();
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $arr[] = $row; // 将当前行数据保存到数组中
        }
        echo json_encode($arr);
    }
    if($action == "search2"){
        $product_name = $_POST["product_name"];   

        $sql = "SELECT * FROM products where product_name LIKE '%$product_name%'";
        $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
        $arr = array();
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $arr[] = $row; // 将当前行数据保存到数组中
        }
            echo json_encode($arr);
    }
    //删除
    if($action == "delete"){
        $product_id = $_POST["product_id"];
        $color = $_POST["product_color"];
        $size = $_POST["product_size"];

        $sql = "delete from products where product_id = '$product_id' and product_color = '$color' and product_size = '$size'";
        $result = mysql_query($sql, $conn);
        if ($result){
            $sql = "delete from details where product_id = '$product_id'";
            mysql_query($sql, $conn);
            echo '成功';
        }
        else 
            echo '失败';
    }
    //修改
    if($action == "update"){ 
        
    }
    //添加
    if($action == "insert"){
        //获取传递过来的数据
        $product_id = $_POST["product_id"];
        $product_name = $_POST["product_name"];
        $product_info = $_POST["product_info"];
        $product_price = $_POST["product_price"];
        $product_color = $_POST["product_color"];
        $product_size = $_POST["product_size"];
        $fit_age = $_POST["fit_age"];
        $sale_amount = $_POST["sale_amount"];
        $product_img = $_POST["product_img"];
        $product_gz = $_POST["gz"];
        $type = $_POST["type"];

        //添加数据库
        $sql = "INSERT INTO products VALUES(NULL, '$type', '$product_id', '$product_name', '$product_info', '$product_price', NULL, '$product_img','$product_color','$product_size','$product_gz','$sale_amount','$fit_age','100')";
        $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
        if ($result){
            $sql = "INSERT INTO details VALUES(NULL, '$product_id', NULL, NULL,NULL)";
            mysql_query($sql, $conn); // 执行SQL语句
            echo '成功';
        }
        else 
            echo '失败';      
    }
    if($action == "select"){
        //查询数据库
        $sql = "SELECT * FROM products";
        $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
        $arr = array();
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $arr[] = $row; // 将当前行数据保存到数组中
        }
        echo json_encode($arr);
    }
    if($action == "select_today"){
        //查询数据库
        $sql = "SELECT * FROM today";
        $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
        $arr = array();
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $arr[] = $row; // 将当前行数据保存到数组中
        }
        echo json_encode($arr);
    }
    if($action == "select_users"){
        //查询数据库
        $sql = "SELECT * FROM userinfo";
        $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
        $arr = array();
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $arr[] = $row; // 将当前行数据保存到数组中
        }
        echo json_encode($arr);
    }

    /* 关闭连接 */
	mysql_close($conn); 
?>