<?php
/**
 * This file will create shortcode
 */

class Sujan_Create_Serp_Shortcode {

    public function __construct() {
        add_shortcode( 'serp-generator', [ $this, 'sujan_serp_generator' ] );
    }

    public function sujan_serp_generator() {
        ob_start(); 
        ?>
            <div class="sujan-wrapper">
                <div id="serp-generator">
                </div>
            </div>
        <?php return ob_get_clean();
    }

}
new Sujan_Create_Serp_Shortcode();