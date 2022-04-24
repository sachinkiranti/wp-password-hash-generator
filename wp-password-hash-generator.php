<?php
/*
Plugin Name: Wordpress Password Hash Generator
Plugin URI: https://www.raisachin.com.np/plugins/wp-password-hash-generator/
Description: A simple plugin to generate the hash for the given text and a sql queries for updating the user password
Version: 1.0.0
Author: sachinkiranti
Author URI: https://raisachin.com.np
Text Domain: wp-password-hash-generator
*/

defined( 'ABSPATH' ) or die( 'No direct access!' );

// Shortcode for the Frontend UI
if (! function_exists('wp_password_hash_generator_frontend')) :

    function wp_password_hash_generator_frontend( $atts )
    {
        extract( shortcode_atts(
                array(
                    'password'        => 'Password',
                    'hash'      => 'Hash',
                    'sql'        => 'SQL Query',
                    'compatibility'     => 'Compatibility',
                    'compatibilityValue' => 'Wordpress v3.x, v4.x, v5.x and new versions'
                ), $atts )
        );

        $file_path = dirname(__FILE__) . '/templates/wp-password-hash-generator-frontend.php';

        ob_start();

        include($file_path);

        $html = ob_get_contents();
        ob_end_clean();
        return $html;
    }

endif;

add_shortcode( 'wp-password-hash-generator', 'wp_password_hash_generator_frontend' );

if (! function_exists('wp_password_hash_generator_frontend_action')) :

    function wp_password_hash_generator_frontend_action() {
        $hashedPassword = wp_hash_password(sanitize_text_field($_POST['password']));
        wp_send_json(array(
            'hash' => $hashedPassword,
            'sql'  => "UPDATE `wp_users` SET `user_pass` = '".$hashedPassword."' WHERE `user_login` = 'your_user_name'"
        ));
        wp_die();
    }

endif;
add_action("wp_ajax_wp_password_hash_generator_frontend_action" , "wp_password_hash_generator_frontend_action");
add_action("wp_ajax_nopriv_wp_password_hash_generator_frontend_action" , "wp_password_hash_generator_frontend_action");


// Script
if (! function_exists('wp_password_hash_generator_enqueue_scripts')) :

    function wp_password_hash_generator_enqueue_scripts() {
        wp_enqueue_script( 'wphg-script', plugin_dir_url(__FILE__).'assets/wphg.js', array('jquery'), null, true );
        wp_localize_script('wphg-script', "wphg_data", array(
            'ajaxurl' => admin_url( 'admin-ajax.php' ),
            'action'  => 'wp_password_hash_generator_frontend_action'
        ));
    }

endif;
add_action( 'wp_enqueue_scripts', 'wp_password_hash_generator_enqueue_scripts' );

