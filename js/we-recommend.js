$(document).ready(function () {
    // We recommend - menu
    (function () {
        var wSpace = $('.we-recommend-menu'),
            item = $('.we-recommend-menu-item');

        item.on('click', function () {
            var i = $(this),
                itemHiddenSide,
                correctScrLeft,
                thisOffsetLeft = i.offset().left + wSpace.offset().left,
                thisWidth = i.outerWidth(),
                thisRightSide = thisOffsetLeft + thisWidth,
                activeClass = 'we-recommend-menu-item-active',
                menuWidth = wSpace.width(),
                scrLeft = wSpace.scrollLeft();

            item.removeClass(activeClass);
            i.addClass(activeClass);

            if(thisRightSide > menuWidth) {
                itemHiddenSide = thisWidth - (menuWidth - thisOffsetLeft);
                correctScrLeft = scrLeft + itemHiddenSide;
                wSpace.animate({scrollLeft: correctScrLeft}, 500);
            } else if (thisOffsetLeft < 0) {
                itemHiddenSide = thisWidth - i.next().offset().left;
                correctScrLeft = scrLeft - itemHiddenSide;
                wSpace.animate({scrollLeft: correctScrLeft}, 500);
            }
        });
    }) ();

    // We recommend - slider
    (function () {
        var item = $('.we-recommend-item'),
            itemsCount = item.length,
            lackCounter = function (itemsToShow) {
                var lack = itemsCount % itemsToShow;

                if(lack !== 0) {
                    return (itemsToShow * (Math.floor(itemsCount / itemsToShow) + 1)) - itemsCount;
                } else {
                    return 0;
                }
            },
            currentCount = 0,
            desktopLack = lackCounter(5),
            sDesktopLack = lackCounter(4),
            tabLack = lackCounter(3),
            mobLack = lackCounter(2),
            itemsSlider = $('.we-recommend-contens-data');

        itemsSlider.slick({
            dots: true,
            arrows: false,
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: false,
            responsive: [
                {
                    breakpoint: 828,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 610,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });

        var rmPrev = function () {
            if(currentCount !== 0) {
                var i = currentCount;

                for(i; i > 0; i--) {
                    itemsSlider.slick('slickRemove', item.length);
                }
            }
        };

        var addLack = function () {
            var i = currentCount;

            for(i; i > 0; i--) {
                itemsSlider.slick('slickAdd', '<div></div>');
            }
        };

        var lackItems = function () {
            var wWidth = $(window).width();

            if(wWidth >= 828) {
                if(currentCount !== desktopLack) {
                    rmPrev();
                    currentCount = desktopLack;
                    addLack();
                }
            } else if(wWidth >= 610 && wWidth < 828) {
                if(currentCount !== sDesktopLack) {
                    rmPrev();
                    currentCount = sDesktopLack;
                    addLack();
                }
            } else if(wWidth >= 480 && wWidth < 610) {
                if(currentCount !== tabLack) {
                    rmPrev();
                    currentCount = tabLack;
                    addLack();
                }
            } else {
                if(currentCount !== mobLack) {
                    rmPrev();
                    currentCount = mobLack;
                    addLack();
                }
            }
        };

        lackItems();

        $(window).resize(function () {
            lackItems();
        });
    }) ();
});