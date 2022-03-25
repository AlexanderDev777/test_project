<?php
$file = __DIR__ . '/basket.json';

function getData() {
    global $file;
    $data = null;
    if(file_exists($file)) {
        $data = json_decode(file_get_contents($file), true);

    }

    return $data;
}

function put($id) {
    $data = getData();
    $data[] = $id;

    write($data);
}

function remove($id) {
    $id = intval($id);

    $data = getData();
    foreach ($data as $k => $v) {
        if(intval($v) === $id) {
            unset($data[$k]);
        }
    }
    write($data);
}

function isBasket($id) {
    $res = false;
    $data = getData();

    if($data !== null) {
        if(in_array($id, $data)) {
            $res = true;
        }
    }

    return $res;
}

function write($data) {
    global $file;
    file_put_contents($file, json_encode($data));
}


function renderItems($data) {
    $file = __DIR__ . '/item.php';
    if($file !== null && file_exists($file)) {
        ob_start(); //Отключаем вывод
        require $file;
        return ob_get_clean(); // Возвращаем содержимое файла
    }
    return '';
}