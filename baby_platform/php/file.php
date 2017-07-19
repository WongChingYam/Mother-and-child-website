<?php  
    if(isset($_FILES["myfile"])){  
        $ret = array();  
        //DIRECTORY_SEPARATOR是一个显示系统分隔符的命令
        //在 Windows 中，斜线（/）和反斜线（\）都可以用作目录分隔符，在linux上路径的分隔符是/
        $uploadDir = '../../baby/img'.DIRECTORY_SEPARATOR; 
        //dirname(__FILE__) 取到的是当前文件的绝对路径 
        $dir = dirname(__FILE__).DIRECTORY_SEPARATOR.$uploadDir; 
        // 判断当期目录下的 img 目录是否存在该文件
        // 如果没有 img 目录，你需要创建它，img 目录权限为 777 
        file_exists($dir) || (mkdir($dir,0777,true) && chmod($dir,0777));  
        if(!is_array($_FILES["myfile"]["name"])) {  //single file 
            $fileName = $_FILES["myfile"]["name"];  
            //将上传的文件移动到新位置    move_uploaded_file()
            move_uploaded_file($_FILES["myfile"]["tmp_name"],$dir.$fileName);  
            $ret['file'] = DIRECTORY_SEPARATOR.$uploadDir.$fileName;  
        }  
        echo json_encode($ret);  
    }  
?>  
