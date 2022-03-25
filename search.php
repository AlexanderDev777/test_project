<?php

$post = $_POST;
require_once 'lib.php';

$res = [];

if(isset($post['search']) && mb_strlen($post['search']) > 3) {
    $base = json_decode(file_get_contents(__DIR__ . '/base.json'), true);


    foreach ($base as $item) {
        $item['name'] = mb_strtolower($item['name']);
        $item['color'] = mb_strtolower($item['color']);
        $post['search'] = mb_strtolower($post['search']);
        if(stripos($item['name'], $post['search']) !== false) {
            if(isBasket($item['id'])) {
                $item['basket'] = true;
            }
            $res[] = $item;
        }
        if(stripos($item['color'], $post['search']) !== false) {
            if(isBasket($item['id'])) {
                $item['basket'] = true;
            }
            $res[] = $item;
        }
    }

    echo json_encode($res);
}