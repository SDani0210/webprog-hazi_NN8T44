<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

while (true) {
    $time = date('H:i:s');
    echo "data: Jelenlegi idő: $time\n\n";
    ob_flush();
    flush();
    sleep(1);
}
?>
