    $(function ($, window, document, undefined) {

        Slider = function (container, options) {
            /*
             options = {
             auto: true,
             time: 3000,
             event: 'hover' | 'click',
             mode: 'slide | fade',
             controller: $(),
             activeControllerCls: 'className',
             exchangeEnd: $.noop
             }
             */
            "use strict"; //stirct mode not support by IE9-
            if (!container) return;
            var options = options || {},
                currentIndex = 0,
                cls = options.activeControllerCls,
                delay = options.delay,
                isAuto = options.auto,
                controller = options.controller,
                event = options.event,
                interval,
                slidesWrapper = container.children().first(),
                slides = slidesWrapper.children(),
                length = options.length ? options.length : slides.length,
                childWidth = container.width(),
                totalWidth = childWidth * slides.length;

            function init() {
                var controlItem = controller.children();
                mode();
                event == 'hover' ? controlItem.mouseover(function () {
                    stop();
                    var index = $(this).index();
                    play(index, options.mode);
                }).mouseout(function () {
                    isAuto && autoPlay();
                }) : controlItem.click(function () {
                    stop();
                    var index = $(this).index();
                    play(index, options.mode);
                    isAuto && autoPlay();
                });

                isAuto && autoPlay();
            }

            //slide init
            function leftloop(){
                var wrapper = container.children().first();
                slidesWrapper[0].appendChild(slidesWrapper.children().eq(0)[0].cloneNode(true));
                slidesWrapper[0].insertBefore(slidesWrapper.children().eq(length-1)[0].cloneNode(true), slidesWrapper.children().eq(0)[0]);
                wrapper.width(totalWidth+2 * childWidth);
                wrapper.css("left", -childWidth + "px");
            }

            //animate mode
            function mode() {
                var wrapper = container.children().first();
                options.mode == 'slide' ? leftloop() : wrapper.children().css({
                    'position': 'absolute',
                    'left': 0,
                    'top': 0
                }).hide();
            }

            //auto play
            function autoPlay(dir) {
                interval = setInterval(function () {
                    triggerPlay(currentIndex, dir);
                }, options.time);
            }

            //trigger play
            function triggerPlay(cIndex, dir) {
                var index;
                (cIndex == length - 1) ? index = 0 : index = cIndex + 1;
                play(index, options.mode, dir);
            }

            //play
            function play(index, mode, dir) {
                slidesWrapper.stop(true, true);
                slides.stop(true, true);
                if(!dir){ dir = "right"; } //default direction
                mode == 'slide' ? (function () {
                    if(index == 0 && currentIndex == length-1 && dir == "right"){
                        slidesWrapper.animate({
                                left: '-=' + childWidth + 'px'
                            }, delay, "linear", function(){slidesWrapper.css({left: -childWidth + 'px'});}
                        );
                    }
                    else if(index == length -1 && currentIndex == 0 && dir == "left"){
                        slidesWrapper.animate({
                                left: '+=' + childWidth + 'px'
                            }, delay, "linear", function(){slidesWrapper.css({left: -length*childWidth + 'px'});}
                        );
                    }
                    else if (index > currentIndex) {
                        slidesWrapper.animate({
                            left: '-=' + Math.abs(index - currentIndex) * childWidth + 'px'
                        }, delay, "linear");
                    } else if (index < currentIndex) {
                        slidesWrapper.animate({
                            left: '+=' + Math.abs(index - currentIndex) * childWidth + 'px'
                        }, delay, "linear");
                    } else {
                        return;
                    }
                })() : (function () {
                    if (slidesWrapper.children(':visible').index() == index) return;
                    slidesWrapper.children().fadeOut(delay).eq(index).fadeIn(delay);
                })();
                try {
                    controller.children('.' + cls).removeClass(cls);
                    controller.children().eq(index).addClass(cls);
                } catch (e) {
                }
                currentIndex = index;
                options.exchangeEnd && typeof options.exchangeEnd == 'function' && options.exchangeEnd.call(this, currentIndex);
            }

            //stop
            function stop() {
                clearInterval(interval);
            }


            //prev frame
            function prev() {
                stop();
                currentIndex == 0 ? triggerPlay(length - 2, "left") : triggerPlay(currentIndex - 2, "left");

                isAuto && autoPlay("left");
            }

            //next frame
            function next() {
                stop();
                currentIndex == length - 1 ? triggerPlay(-1, "right") : triggerPlay(currentIndex, "right");
                isAuto && autoPlay("right");
            }


            //init
            init();

            //prev frame
            /*
            function prev() {
                stop();
                var lineLeft = slidesWrapper.find("li:first").width();
                slidesWrapper.find("li:last").prependTo(slidesWrapper);
                slidesWrapper.css({marginLeft: -lineLeft});
                slidesWrapper.animate({marginLeft: 0}, 500);

                currentIndex--;
                currentIndex < 0? currentIndex = Math.abs(currentIndex + length) : currentIndex ;
                controller.children('.' + cls).removeClass(cls);
                controller.children().eq(currentIndex).addClass(cls);

                isAuto && autoPlay();
            }
            
            //next frame
            function next() {
                stop();
                var lineLeft = slidesWrapper.find("li:first").width();
                slidesWrapper.animate({marginLeft: -lineLeft}, 500, function(){ slidesWrapper.css({marginLeft: 0}).find("li:first").appendTo(slidesWrapper);});

                currentIndex++;
                currentIndex == length ? currentIndex = 0 : currentIndex;
                controller.children('.' + cls).removeClass(cls);
                controller.children().eq(currentIndex).addClass(cls);

                isAuto && autoPlay();
            }
            */

            //expose the Slider API
            return {
                prev: function () {
                    prev();
                },
                next: function () {
                    next();
                }
            }
        };
    }(jQuery, window, document));