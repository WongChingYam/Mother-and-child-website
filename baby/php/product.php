<?php
    //连接数据库
    $conn = mysql_connect("localhost:3306","root","");
    if(!$conn)
        die("error : " . mysql_error());

    /* 指定连接的具体数据库名称 */
	mysql_select_db("babyDB", $conn);

	/* 设置向数据库读写数据时的编码 */
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");

    //根据商品product_id，在数据库中查找到对应的商品详细信息
    $product_id = $_POST["pro_id"];
 
    //查询数据库
    $sql = "SELECT * FROM products,type,details where products.type_id = type.id and products.product_id = details.product_id and products.product_id = '$product_id'";
    $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
    $arr = array();
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $arr[] = $row; // 将当前行数据保存到数组中
    }
    echo json_encode($arr);

    //查询type数据库
    // $_id = intval(next(current($arr)));
    // $sql = "SELECT kind FROM type where id = '$_id'";
    // $result = mysql_query($sql, $conn); // 执行SQL语句，获取查询结果集
    // // $arr = array();
    // while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    //     $kind = $row['kind'];
    // }
    // foreach($arr as $value){
    //     next($value) = $kind;
    //     echo json_encode(next($value));
    // }

    // echo json_encode(next(current($arr)));

    /* 关闭连接 */
	mysql_close($conn); 
?>