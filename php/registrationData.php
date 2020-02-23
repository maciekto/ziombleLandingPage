<?php
// connect to database
    $connect = new mysqli("serwer1985793.home.pl", "30859962_html", "Ajay.Magic07","30859962_html");
    if(!$connect){
        die('connection failed '.mysqli_connect_error());
    }else{
        echo "Connected successfully ";
    }
// get data from JS
    $json = file_get_contents('php://input');
// decode data
    $data = json_decode($json, true);
// pass data to variable
    $login = $data["login"];
    $email = $data["email"];
    $password = $data["password"];
// query to data base
    $sql = "INSERT INTO ziombleRegister (login, email, password) VALUES ('$login', '$email', '$password')";
// pass query to database and check if everything is okay
    if($connect->query($sql) === TRUE){
// passing response to JS 
        echo "NEW RECORD CREATED SUCCESSFULLY";
    }else{
// passing response to JS
        echo $connect->error;
    }

?>