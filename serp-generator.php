<?php
/**
 * Plugin Name: Wix Solution SERP Generator
 * Author: Md. Toriqul Mowla Sujan
 * Author URI: https://fiverr.com/developer_sujan
 * Version: 1.0.0
 * Description: Custom Plugin to Add SERP Generator
 * Text-Domain: serp
 */

if( ! defined( 'ABSPATH' ) ) : exit(); endif; // No direct access allowed.


require 'vendor/autoload.php';

/**
* Define Plugins Constants
*/
define ( 'SERP_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define ( 'SERP_URL', trailingslashit( plugins_url( '/', __FILE__ ) ) );

/**
 * Loading Necessary Scripts
 */



add_action( 'wp_enqueue_scripts', 'sujan_load_serp_scripts' );
function sujan_load_serp_scripts() {
    wp_enqueue_script( 'serp-react-sujan', SERP_URL . 'build/index.js', [ 'jquery', 'wp-element' ], wp_rand(), true );
    wp_enqueue_style( 'serp-react-sujan', SERP_URL . 'build/index.css' );
    wp_enqueue_style( 'serp-font-awesome', 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css' );
    wp_localize_script( 'serp-react-sujan', 'appLocalizer', [
        'apiUrl' => home_url( '/wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
        'user_id' => get_current_user_id()
    ] );
}



add_action('admin_init', function(){
    add_settings_field(
        'serp_setting-id',
        'scaleserp.com API Key',
        'serp_setting_callback_function',
        'general',
        'default',
        array( 'label_for' => 'serp_setting-name' ),
    );

    register_setting( 'general', 'serp_setting-name' ); 
});

function serp_setting_callback_function( $args ) {
    ?>
        <input name="serp_setting-name" placeholder="e.g. D5188F764C2945CF849CB08B877A13D7" type="text" id="serp_setting-id" value="<?php echo get_option('serp_setting-name'); ?>" class="regular-text">
    <?php 
}



require_once SERP_PATH . 'classes/class-create-shortcode.php';
require_once SERP_PATH . 'classes/class-create-routes.php';