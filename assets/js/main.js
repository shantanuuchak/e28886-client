/*===================================================
    Vixto Template Scripts
====================================================*/
(function ($) {
    "use strict";

    // Preloader
    $(window).on('load', function () {
        $('.site-preloader .loader-text').hide();
        $('.site-preloader').css({
            "height": 0
        });
        $('body').addClass('loaded');
        setTimeout(function () {
            $('.site-preloader').remove();
        }, 5000);
    });

    $(document).ready(function () {

        var html = $('html');

        // Responsive Classes
        function responsiveClasses() {
            var body = $("body");
            if ($(window).width() < 992) {
                body.removeClass("viewport-lg");
                body.addClass("viewport-sm");
            } else {
                body.removeClass("viewport-sm");
                body.addClass("viewport-lg");
            }
        }

        // Window Resize
        $(window).on("resize", function () {
            responsiveClasses();
        }).resize();

        // Sticky Header
        function stickyHeader() {
            var mainHeader = $('header.main-header'),
                menuWrap = $('header.main-header .bottom-header'),
                clonedHeader = menuWrap.clone(),
                yOffset = 0;
            mainHeader.after('<div class="sticky-header-wrap"></div>');
            var stickyHeader = $('.sticky-header-wrap');
            stickyHeader.html(clonedHeader);

            $(window).on("scroll", function () {
                yOffset = $(window).scrollTop();
                if (yOffset >= 400) {
                    stickyHeader.addClass("sticky-fixed-top");
                } else {
                    stickyHeader.removeClass("sticky-fixed-top");
                }
            });
        }

        if ($('body').hasClass('viewport-lg')) {
            stickyHeader();
        }

        // Mobile Menu
        function mobileMenu() {
            $("header.main-header").after('<div class="mobile-navigation-menu"><button id="mobile-menu-close"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M256-213.847 213.847-256l224-224-224-224L256-746.153l224 224 224-224L746.153-704l-224 224 224 224L704-213.847l-224-224-224 224Z"/></svg></button></div>');
            var menuWrapper = $("header.main-header .header-menu-wrap .nav-menu").clone();
            $('.mobile-navigation-menu #mobile-menu-close').after(menuWrapper);

            $("#mobile-menu-close, .mobile-menu-action").on("click", function () {
                $(".mobile-navigation-menu").toggleClass("open-mobile-menu");
            });

            $(".mobile-navigation-menu ul li:has(ul)").each(function () {
                $(this).append('<span class="dropdown-plus"></span>');
                $(this).addClass("dropdown_menu");
            });

            $(".mobile-navigation-menu .dropdown-plus").on("click", function () {
                $(this).prev("ul").slideToggle(300);
                $(this).toggleClass("dropdown-open");
                $(".mobile-navigation-menu ul li:has(ul)").toggleClass("dropdown-open");
            });

            $(".mobile-navigation-menu .dropdown_menu a").append("<span></span>");
        }

        mobileMenu();

        // Popup Search Box
        $(function () {
            $("#popup-search-box").removeClass("toggled");
            $("body").removeClass("open-search-box");
            $(".menu-search").on("click", function (e) {
                e.stopPropagation();
                $("body").toggleClass("open-search-box");
                $("#popup-search").focus();
            });

            $("#popup-search-box input").on("click", function (e) {
                e.stopPropagation();
            });
            $(document).on(
                "click",
                ".search-close, #searchbox-overlay",
                function (e) {
                    e.preventDefault();
                    $("body.open-search-box").removeClass("open-search-box");
                }
            );
        });

        // Data Background
        $("[data-bg").each(function () {
            $(this).css("background-image", "url( " + $(this).attr("data-bg") + "  )");
        });

        // Ticker Slider Swiper
        var tickerCarousel = new Swiper(".swiper.ticker-slider", {
            loop: true,
            speed: 2000,
            slidesPerView: 1,
            spaceBetween: 0,
            direction: 'vertical',
            autoplay: {
                delay: 4000,
            },
        });

        // Featured Post Carousel
        var featuredCarousel = new Swiper(".swiper.featured-post-carousel", {
            loop: true,
            speed: 2000,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                993: {
                    slidesPerView: "auto",
                    spaceBetween: 40,
                }
            }
        });

        // Vertical Post Carousel
        var verticalPostCarousel = new Swiper(".vartical-post-carousel", {
            speed: 2000,
            loop: true,
            direction: 'vertical',
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                0: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    mousewheel: true
                }
            }
        });

        // Gallary Post Slider
        var gallarySlider = new Swiper(".gallary-post-slider", {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });

        // Single Post Gallery
        var gallarySlider = new Swiper(".single-post-gallery", {
            spaceBetween: 0,
            speed: 2000,
            loop: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".vexson-swiper-next",
                prevEl: ".vexson-swiper-prev",
            }
        });

        // Current Year
        var currentYear = new Date().getFullYear();
        $('#currentYear').append(currentYear);

        // Scroll To Top
        var scrollTop = $("#scroll-top");
        $(window).on('scroll', function () {
            var topPos = $(this).scrollTop();
            if (topPos > 100) {
                $('#scrollup').removeClass('hide');
                $('#scrollup').addClass('show');

            } else {
                $('#scrollup').removeClass('show');
                $('#scrollup').addClass('hide');
            }
        });

        $(scrollTop).on("click", function () {
            $('html, body').animate({
                scrollTop: 0
            }, 100);
            return false;
        });

        // Custom Cursor
        function customCursor() {
            $('body').append('<div class="dl-cursor"><span></span></div>');
            var cursor = $('.dl-cursor'),
                dragCursor = $('.dl-drag-cursor');

            $(window).on('mousemove', function (e) {
                cursor.css({
                    'transform': 'translate(' + (e.clientX - 5) + 'px,' + (e.clientY - 5) + 'px)',
                    'visibility': 'inherit'
                });
            });

            $(window).on('mouseout', function () {
                cursor.css('visibility', 'hidden');
            });

            dragCursor.each(function () {
                $(this).on('mouseleave', function () {
                    cursor.removeClass('dl-drag');
                });
                $(this).on('mouseover', function () {
                    cursor.addClass('dl-drag');
                });
            });
        }

        if ($('body').hasClass('viewport-lg')) {
            customCursor();
        }

        // Venobox Active
        $('.venobox').venobox({
            spinner: 'spinner-pulse',
        });

        // Menu Text Animation
        document.querySelectorAll('.main-header-wapper .nav-menu > li > a').forEach(btnText => btnText.innerHTML = '<span>' + btnText.textContent.split('').join('</span><span>') + '</span>');

        // Button Text Animation
        document.querySelectorAll('.text-anim').forEach(btnText => btnText.innerHTML = '<span>' + btnText.textContent.split('').join('</span><span>') + '</span>');

        // Subscribe Modal
        if ($('body').hasClass('viewport-lg')) {
            var modalID = document.getElementById('subscribeModal');
            if( modalID != null){
                var subscribeModal = new bootstrap.Modal(modalID);
                setTimeout(function () {
                    subscribeModal.show();
                }, 10000);
            }
            
        }

    });

    // Color Scheme Swithcer
    const storageKey = 'theme-preference';

    const onClick = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
        setPreference();
    }
    
    const getColorPreference = () => {
        if (localStorage.getItem(storageKey)){
            return localStorage.getItem(storageKey);
        }else{
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
    }
    
    const setPreference = () => {
        localStorage.setItem(storageKey, theme.value);
        reflectPreference();
    }
    
    const reflectPreference = () => {
        document.firstElementChild.setAttribute('data-theme', theme.value);
        document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value);
    }
    
    const theme = {
        value: getColorPreference(),
    }
    
    // set early so no page flashes / CSS is made aware
    reflectPreference();
    
    window.onload = () => {
    
        // set on load so screen readers can see latest value on the button
        reflectPreference();
        
        // now this script can find and listen for clicks on the control
        document.querySelector('#theme-toggle').addEventListener('click', onClick);
    }
    
    // sync with system changes
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', ({matches:isDark}) => {
            theme.value = isDark ? 'dark' : 'light';
        setPreference();
    });

})(jQuery);
