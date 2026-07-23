<?php
/**
 * The Header template for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- ────────────────────────────────  Fonts  ──────────────────────────────── -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Open+Sans:wght@400;700&display=swap"
          rel="stylesheet">

    <!-- ============================================================================ -->
    <!-- =====================  TRACKING & MARKETING TAGS  =========================== -->
    <!-- =====================  מסודר לפי סדר חשיבות        =========================== -->
    <!-- ============================================================================ -->

    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- 1. Google Tag Manager  (קונטיינר ראשי)                                       -->
    <!--    עודכן 2026-07-23: קונטיינר חדש GTM-56PG8B58                                -->
    <!--    חייב להיות גבוה ככל האפשר בתוך ה-<head>                                    -->
    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-56PG8B58');</script>
    <!-- End Google Tag Manager -->

    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- קונטיינרים ישנים של GTM — הוחלפו 2026-07-23                                   -->
    <!-- אין לנו גישה אליהם והם שייכים לגורמים אחרים, לכן הושבתו (נשמרים לתיעוד בלבד)   -->
    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- OLD (הוחלף 2026-07-23) — GTM-WW5Z8XB, הוטמע דרך תוסף Google Tag Manager for WordPress by gtm4wp.com:
    <script data-cfasync="false" data-pagespeed-no-defer type="text/javascript">
        var dataLayer_content = {"pagePostType":"frontpage","pagePostType2":"single-page","pagePostAuthor":"leah"};
    </script>
    <script data-cfasync="false">
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WW5Z8XB');
    </script>
    -->

    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- 2. Google Analytics 4  (מדידה)                                               -->
    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- GA4 — G-GPLT586WDK -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-GPLT586WDK"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-GPLT586WDK');
    </script>

    <!-- GA4 — G-5X8HBGVXT6 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-5X8HBGVXT6"></script>
    <script>
        gtag('config', 'G-5X8HBGVXT6');
    </script>

    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- 3. Google Ads  (המרות)                                                       -->
    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- Google Ads (gtag.js) — AW-10987612182 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10987612182"></script>
    <script>
        gtag('config', 'AW-10987612182');
        gtag('config', 'AW-10987612182/6X6JCJSWs7IaEJbQpvco', {
            'phone_conversion_number': '+1 (317) 804-2031'
        });
    </script>

    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- 4. Facebook Pixel  (פרסום)                                                   -->
    <!--    שני פיקסלים: 3031611553724447 + 612656819753675                           -->
    <!--    טעינת הבסיס פעם אחת, אתחול שני הפיקסלים ו-PageView משותף                   -->
    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '3031611553724447');
        fbq('init', '612656819753675');
        fbq('track', 'PageView');
    </script>
    <noscript>
        <img height="1" width="1" style="display:none"
             src="https://www.facebook.com/tr?id=3031611553724447&ev=PageView&noscript=1"/>
        <img height="1" width="1" style="display:none"
             src="https://www.facebook.com/tr?id=612656819753675&ev=PageView&noscript=1"/>
    </noscript>
    <!-- End Facebook Pixel Code -->

    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- 5. Bing Ads (Microsoft UET)  — 17229773                                      -->
    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- Tracking Code for BING Ads -->
    <script>(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"17229773"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");</script>

    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- 6. Twitter / X Pixel  — o6qb0                                                -->
    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- Twitter universal website tag code -->
    <script>
        !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
        },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
        twq('init','o6qb0');
        twq('track','PageView');
    </script>
    <!-- End Twitter universal website tag code -->

    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- 7. HubSpot  — 20132069                                                       -->
    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- Start of HubSpot Embed Code -->
    <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/20132069.js"></script>
    <!-- End of HubSpot Embed Code -->
    <script type="text/javascript" class="hsq-set-content-id" data-content-id="">
        var _hsq = _hsq || [];
        _hsq.push(["setContentType", ""]);
    </script>

    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <!-- 8. אימותי בעלות (Verification)                                               -->
    <!-- ────────────────────────────────────────────────────────────────────────── -->
    <meta name="facebook-domain-verification" content="zvb3mfw8a3479xfpy5q53wjn0vivgh" />

    <!-- ============================================================================ -->
    <!-- =====================  END TRACKING & MARKETING TAGS  ======================= -->
    <!-- ============================================================================ -->

    <!-- ─────────────────────────────  Libraries  ─────────────────────────────── -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<!-- Google Tag Manager (noscript) — עודכן 2026-07-23: GTM-56PG8B58 -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-56PG8B58"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<!-- OLD noscript (הוחלף 2026-07-23) — GTM-K6H9VZ5:
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K6H9VZ5"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
-->

<header class="header">
    <div class="header__wrapper">
        <div class="header__top">
            <div class="container">
                <div class="header__top-inner">
                    <div class="mob__link__box">
                        <a href="mailto:<?php echo get_field('email','option'); ?>">
                            <img src="<?php echo get_template_directory_uri(); ?>/images/icon/email-icon-orange.svg" alt="Email">
                        </a>
                    </div>
                    <div class="header__lang">
                        <ul>
                            <?php // languages_list(); ?>
                        </ul>
                    </div>
                    <div class="header__link">
                        <?php
                        $top_menu_args = array(
                            'theme_location'  => '',
                            'menu'            => 'Top header menu',
                            'container'       => '',
                            'container_class' => '',
                            'container_id'    => '',
                            'menu_class'      => 'menu',
                            'menu_id'         => '',
                            'echo'            => true,
                            'fallback_cb'     => 'wp_page_menu',
                            'before'          => '',
                            'after'           => '',
                            'link_before'     => '',
                            'link_after'      => '',
                            'items_wrap'      => '<ul class="">%3$s</ul>',
                            'depth'           => 0,
                        );
                        wp_nav_menu( $top_menu_args );
                        ?>
                    </div>
                    <div class="mob__menu__icon">
                        <img src="<?php echo get_template_directory_uri(); ?>/images/icon/menu-icon-orange.svg" alt="Menu">
                    </div>
                </div>
            </div>
        </div>
        <div class="header__main">
            <div class="container">
                <div class="header__main-inner">
                    <div class="header__logo">
                        <?php $logo = get_field( 'logo', 'option' ); ?>
                        <a href="<?php echo get_home_url(); ?>">
                            <img src="<?php echo $logo['url']; ?>" alt="<?php echo esc_attr( $logo['alt'] ?: get_bloginfo( 'name' ) ); ?>">
                        </a>
                    </div>
                    <div class="header__main-wrapper">
                        <nav class="header__nav">
                            <?php
                            $main_menu_args = array(
                                'theme_location'  => '',
                                'menu'            => 'Header menu',
                                'container'       => '',
                                'container_class' => '',
                                'container_id'    => '',
                                'menu_class'      => 'menu',
                                'menu_id'         => '',
                                'echo'            => false,
                                'fallback_cb'     => 'wp_page_menu',
                                'before'          => '',
                                'after'           => '',
                                'link_before'     => '',
                                'link_after'      => '',
                                'items_wrap'      => '<ul class="">%3$s</ul>',
                                'depth'           => 0,
                            );
                            $menu = wp_nav_menu( $main_menu_args );
                            $menu = str_replace( 'sub-menu', 'submenu sub-menu', $menu );
                            echo $menu;
                            ?>
                        </nav>
                        <div class="header__btn">
                            <a class="btn" href="<?php echo get_field( 'button_link', 'option' ); ?>"><?php echo get_field( 'button_text', 'option' ); ?></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>

<div class="print-header">
    <div class="print-header__img">
        <?php $logo_print = get_field( 'logo_print', 'option' ); ?>
        <img src="<?php echo $logo_print['url']; ?>" alt="<?php echo esc_attr( $logo_print['alt'] ); ?>">
    </div>
</div>
