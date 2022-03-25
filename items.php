
<?php
$base = json_decode(file_get_contents(__DIR__ . '/base.json'), true);

$isCatalog = $isBasket = false;
if(stripos($_SERVER['REQUEST_URI'] , 'catalog') !== false) {
	$isCatalog = true;
}
if(stripos($_SERVER['REQUEST_URI'] , 'basket') !== false) {
    $isBasket = true;
}
$i = 0;
?>
<?php foreach ($base as $item) :

    if(isBasket($item['id'])) {
        $item['basket'] = ' inbasket';
    } else {
        $item['basket'] = '';
    }
    if($isCatalog) :
    ?>

        <?=renderItems($item)?>


	<?php elseif($isBasket) : ?>

		<?php if(isBasket($item['id'])) : ?>
        <?=renderItems($item)?>
		<?php endif; ?>


	<?php else : ?>


	<?php if( $i < 5) : ?>

			<?=renderItems($item)?>

		<?php endif; ?>

	<?php endif; ?>

<?php $i++; endforeach; ?>