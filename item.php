<?php
?>

<div class="element">
    <div class="element-desc">
        <div class="element-desc-name"><?=$data['name']?></div>
        <div class="element-desc-color"><?=$data['color']?></div>
    </div>
    <div class="element-price">
        <div class="element-price-number"><?=$data['price']?></div>
        <div class="element-price-button" data-id="<?=$data['id']?>" <?=$data['basket']?>></div>
    </div>
</div>
