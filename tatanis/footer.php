<?php if ( get_field( 'updates_status', 'option' ) ) { ?>
    <section class="updates">
        <div class="updates__inner">
            <div class="container">
                <div class="updates__wrapper">
                    <h2 class="updates__title"><?php echo get_field( 'updates_title', 'option' ); ?></h2>
                    <div class="updates__form">
                        <?php echo get_field( 'updates_code', 'option' ); ?>
                    </div>
                </div>
            </div>
        </div>
    </section>
<?php } ?>


<footer class="footer">
    <div class="footer__inner">
        <div class="container">
            <div class="footer__top">
                <div class="footer__top-nav">
                    <?php if ( have_rows( 'menus', 'option' ) ) : ?>
                        <?php while ( have_rows( 'menus', 'option' ) ) : the_row(); ?>
                            <div class="footer__list">
                                <h5><?php echo get_sub_field( 'title_menu' ); ?></h5>
                                <?php
                                wp_nav_menu( array(
                                    'theme_location'  => '',
                                    'menu'            => get_sub_field( 'title_menu' ),
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
                                ) );
                                ?>
                            </div>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </div>
                <div class="footer__top-info">
                    <?php if ( have_rows( 'offices', 'option' ) ) : ?>
                        <?php while ( have_rows( 'offices', 'option' ) ) : the_row(); ?>
                            <div class="footer__list">
                                <h5><?php echo get_sub_field( 'country' ); ?></h5>
                                <span><?php echo get_sub_field( 'contact_office' ); ?></span>
                            </div>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </div>
            </div>
            <div class="footer__bottom">
                <div class="footer__bottom-wrapper">
                    <ul class="footer__list-social">
                        <?php if ( have_rows( 'social', 'option' ) ) : ?>
                            <?php while ( have_rows( 'social', 'option' ) ) : the_row(); ?>
                                <li>
                                    <a href="<?php echo get_sub_field( 'link' ); ?>" target="_blank">
                                        <img src="<?php echo get_sub_field( 'icon' )['url']; ?>" alt="<?php echo esc_attr( get_sub_field( 'icon' )['alt'] ); ?>">
                                    </a>
                                </li>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    </ul>
                    <div class="footer__bottom-info">
                        <ul>
                            <?php
                            wp_nav_menu( array(
                                'theme_location'  => '',
                                'menu'            => 'Footer bottom menu',
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
                                'items_wrap'      => '%3$s',
                                'depth'           => 0,
                            ) );
                            ?>
                            <li>
                                <span>
                                    <?php echo '© ' . date( 'Y' ) . ' ' . get_field( 'copyright', 'option' ); ?>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="footer__bottom-logo">
                        <?php $logo_footer = get_field( 'logo_footer', 'option' ); ?>
                        <a href="<?php echo get_home_url(); ?>">
                            <img src="<?php echo $logo_footer['url']; ?>" alt="<?php echo esc_attr( $logo_footer['alt'] ?: get_bloginfo( 'name' ) ); ?>">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>

<div class="print-footer">
    <div class="print-footer__img">
        <?php $logo_print = get_field( 'logo_print', 'option' ); ?>
        <img src="<?php echo $logo_print['url']; ?>" alt="<?php echo esc_attr( $logo_print['alt'] ); ?>">
    </div>
</div>

<div class="mob__menu modal">
    <div class="modal-dialog">
        <div class="mob__header__lang">
            <ul>
                <?php languages_list(); ?>
            </ul>
        </div>
        <ul class="mobilemenu">
            <?php
            $mobile_menu = wp_nav_menu( array(
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
                'items_wrap'      => '%3$s',
                'depth'           => 0,
            ) );
            $mobile_menu = str_replace( 'sub-menu', 'submenu sub-menu', $mobile_menu );
            echo $mobile_menu;

            wp_nav_menu( array(
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
                'items_wrap'      => '%3$s',
                'depth'           => 0,
            ) );
            ?>
        </ul>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Flip.min.js"></script>

<?php wp_footer(); ?>
<script>
    var ajaxurl = '<?php echo site_url(); ?>/wp-admin/admin-ajax.php';
</script>

<!-- Comeet careers widget -->
<script>
    window.comeetInit = function() {
        COMEET.init({
            "token": "<?php echo get_field( 'comeet_token', 'option' ); ?>",
            "company-uid": "<?php echo get_field( 'comeet_uid', 'option' ); ?>",
            "company-name": "<?php echo get_field( 'comeet_company_name', 'option' ); ?>",
            "field-portfolio": false,
            "field-website": false,
            "css-url": "<?php echo get_template_directory_uri(); ?>/css/comeet-custom.css",
            "css-cache": "false"
        });
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//www.comeet.co/careers-api/api.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'comeet-jsapi'));
</script>

<!-- Set Salesforce lead source to the page title -->
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const interval = setInterval(function() {
            const input = document.querySelector('input[name="salesforce_lead_source"]');
            if (input) {
                input.value = document.title;
                clearInterval(interval);
            }
        }, 100);
    });
</script>

</body>

</html>
