<?php

$post = $_POST;
require_once 'lib.php';

$basket = getData();
$res = [];
if($basket === null) {
    put($post['id']);
    $res['put'] = true;
} else {
    if(in_array($post['id'], $basket)) {
        remove($post['id']);
        $res['remove'] = true;
    } else {
        put($post['id']);
        $res['put'] = true;
    }
}
echo json_encode($res);


?>