<?php
// connect to database
    $connect = new mysqli("serwer1985793.home.pl", "30859962_html", "Ajay.Magic07","30859962_html");
    if(!$connect){
        die('connection failed');
    }
// get data from JS
    $json = file_get_contents('php://input');
// decode data
    $data = json_decode($json, true);
// pass data to variable
    $login = $data["login"];
// query to data base
    $sql = 'SELECT * FROM ziombleRegister';
// pass results to variable
    $result = $connect->query($sql);
// check if there is a data
    if($result->num_rows > 0){
// loop for all rows in result
        while($row = $result->fetch_assoc()){
// check if login/nickname alreday exists
            if($row["login"] == $login){
// if login exists send true to JS response
                echo 'true';
            }
        }
    }

?>