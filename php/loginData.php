<?php
// connect to database
    $connect = new mysqli("serwer1985793.home.pl", "30859962_html", "Ajay.Magic07","30859962_html");
    if(!$connect){
        die('connection failed '.mysqli_connect_error());
    }else{
        //echo "Connected successfully ";
    }
// get data from JS
    $json = file_get_contents('php://input');
// decode data
    $data = json_decode($json, true);
// pass data to variable
    $login = $data["login"];
    $password = $data["password"];
// query to data base
    $sql = "SELECT * FROM ziombleRegister";
// pass results to variable
    $result = $connect->query($sql);
// check if there is a data
    if($result->num_rows > 0){
// loop for all rows in result       
        while($row = $result->fetch_assoc()){
// check if login and password are correct
            if($row["login"] == $login && $row["password"] == $password){
// giving data of user to array
                $userData = array(true,$row["login"], $row["email"],$row["password"]);
// pack to JSON
                $userDataJSON = json_encode($userData);
// sending it to JS response
                echo $userDataJSON;
                
            }
        }
    }
    
?>