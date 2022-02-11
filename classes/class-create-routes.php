<?php


/**
 * This file will create Custom Rest API End Points.
 */
class WP_React_Serp_Rest_Route {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'sujan/v1', '/serp', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_settings' ],
            'permission_callback' => [ $this, 'get_settings_permission' ]
        ] );
        register_rest_route( 'sujan/v1', '/serp', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_settings' ],
            'permission_callback' => [ $this, 'save_settings_permission' ]
        ] );

        register_rest_route( 'sujan/v1', '/search/{keyword}', [
            'methods' => 'GET',
            'callback' => [ $this, 'get_search' ],
            'permission_callback' => [ $this, 'get_settings_permission' ]
        ] );
        register_rest_route( 'sujan/v1', '/search', [
            'methods' => 'POST',
            'callback' => [ $this, 'save_search' ],
            'permission_callback' => [ $this, 'save_settings_permission' ]
        ] );


    }

    public function file_get_contents_curl($url) {
        $ch = curl_init();
    
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //Set curl to return the data instead of printing it to the browser.
        curl_setopt($ch, CURLOPT_URL, $url);
    
        $data = curl_exec($ch);
        curl_close($ch);
    
        return $data;
    }

    public function get_settings($req) {

        $web = new \spekulatius\phpscraper();

        if(!empty($req['url'])) : 

            $web->go( esc_url($req['url']) );

            $title = $web->title;
            if( $web->description == null ){
                $description = "WARNING: Meta description is empty!";
            }else {
                $description = $web->description;
            }
            
            $keywords = $web->keywords;

            $response = [
                'title' => $title,
                'description' => $description,
                'keywords' => $keywords
            ];
        
        else : 

            $response = [
                'title' => '',
                'description' => '',
                'keywords' => ''
            ];

        endif;

        return rest_ensure_response( $response );

    }

    public function get_search(){
        return 'search results';
    }

    public function get_settings_permission() {
        return true;
    }

    public function save_settings( $req ) {

        return rest_ensure_response( 'success' );
    }

    public function save_search($req){
        $api_key = get_option('serp_setting-name');
        $api_key = !empty( $api_key ) ? $api_key : "D5188F764C2945CF849CB08B877A13D7";
        $keyword = urlencode( isset($req['keyword']) ? $req['keyword'] : 'google' ); 
        $country = isset($req['country']) ? $req['country'] : 'bd';
        $url = "https://api.scaleserp.com/search?api_key=$api_key&q=$keyword&gl=$country";

        $response = json_decode( $this->file_get_contents_curl($url) );

        return rest_ensure_response( $response );
    }

    public function save_settings_permission() {
        return true;
    }
}
new WP_React_Serp_Rest_Route();