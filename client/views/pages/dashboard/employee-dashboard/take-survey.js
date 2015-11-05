function pointRange(start, end) {
    var result = [];
    if (end < start) return result;

    var length = end - start + 1;
    while (length) {
        result.push(start);
        start++;
        length--;
    }
    return result;
}

var START = 1;
var END = 5;

var QUESTIONS = [
    {
        index: 0,
        title: 'Goals and Purpose',
        question: 'Does Leader set goals generally?',
        type: 'goalRating',
        slideClass: 'slide--current',
        questionIcon: 'flaticon-goal5'
    },
    {
        index: 1,
        title: 'Meetings',
        question: 'Does Leader handle/define meetings properly?',
        type: 'meetingRating',
        slideClass: '',
        questionIcon: 'flaticon-businessman'
    },
    {
        index: 2,
        title: 'Ground rules and norms',
        question: 'Does Leader set Ground rules and norms?',
        type: 'groundRulesRating',
        slideClass: '',
        questionIcon: 'flaticon-rule3'
    },
    {
        index: 3,
        title: 'Communication',
        question: 'Does Leader communicate properly?',
        type: 'communicationRating',
        slideClass: '',
        questionIcon: 'flaticon-two210'
    },
    {
        index: 4,
        title: 'Leadership',
        question: 'Does Leader lead properly?',
        type: 'leadershipRating',
        slideClass: '',
        questionIcon: 'flaticon-tie13'
    },
    {
        index: 5,
        title: 'Workload/ Distribution of work',
        question: 'Does Leader help on workload and fair distribution of work?',
        type: 'workloadRating',
        slideClass: '',
        questionIcon: 'flaticon-working2'
    },
    {
        index: 6,
        title: 'Energy/Commitment Level',
        question: 'Does Leader committed to work and is he passionate about it?',
        type: 'energyRating',
        slideClass: '',
        questionIcon: 'flaticon-energy28'
    },
    {
        index: 7,
        title: 'Management of Stress',
        question: 'Is Leader handling the stress as a facade?',
        type: 'stressRating',
        slideClass: '',
        questionIcon: 'flaticon-women47'
    },
    {
        index: 8,
        title: 'Decision Making',
        question: 'Is Leader able to make decision in a fair way?',
        type: 'decisionRating',
        slideClass: '',
        questionIcon: 'flaticon-hammers4'
    },
    {
        index: 9,
        title: 'Respect for differences/diversity',
        question: 'Does he respect to differences and diversity?',
        type: 'respectRating',
        slideClass: '',
        questionIcon: 'flaticon-job16'
    },
    {
        index: 10,
        title: 'Management of conflict',
        question: 'Does Leader handle the conflicts properly?',
        type: 'conflictRating',
        slideClass: '',
        questionIcon: 'flaticon-puzzle-piece1'
    }

];

AutoForm.hooks({
    takeSurveyForm: {
        onError: function (a, b, c) {
            console.log(a, b, c);
        },
        onSuccess: function () {
            Router.go('dashboard');
            toastr.success("Send survey successful");


            analytics.track('Do Survey', {
                category: 'Employee:' + Meteor.userId(),
                label: 'Leader:' + Meteor.user().leader()._id
            });

        }
    }
});


Template.TakeSurvey.onCreated(function () {
    //this.questions = questions;
});

Template.TakeSurvey.onRendered(function () {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

    $('input').on('ifChecked', function() {
        $('.button--nav-next .fa-arrow-right').trigger('click');
    });
});



Template.surveySlider.helpers({
    questions: function () {
        return QUESTIONS;
    }
});


Template.ratingSurveys.helpers({
    range: function () {
        return pointRange(START, END);
    }
});



Template.surveySlider.onRendered(function () {
    $("#takeSurveyModal").modal("show");
    //$('.i-checks').iCheck({
    //    checkboxClass: 'icheckbox_square-green',
    //    radioClass: 'iradio_square-green'
    //});

    /**
     * main.js
     * http://www.codrops.com
     *
     * Licensed under the MIT license.
     * http://www.opensource.org/licenses/mit-license.php
     *
     * Copyright 2015, Codrops
     * http://www.codrops.com
     */
    ;
    (function (window) {

        'use strict';

        var bodyEl = document.body,
            docElem = window.document.documentElement,
            support = {transitions: Modernizr.csstransitions},
        // transition end event name
            transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'msTransition': 'MSTransitionEnd',
                'transition': 'transitionend'
            },
            transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
            onEndTransition = function (el, callback) {
                var onEndCallbackFn = function (ev) {
                    if (support.transitions) {
                        if (ev.target != this) return;
                        this.removeEventListener(transEndEventName, onEndCallbackFn);
                    }
                    if (callback && typeof callback === 'function') {
                        callback.call(this);
                    }
                };
                if (support.transitions) {
                    el.addEventListener(transEndEventName, onEndCallbackFn);
                }
                else {
                    onEndCallbackFn();
                }
            },
        // window sizes
            win = {width: window.innerWidth, height: window.innerHeight},
        // some helper vars to disallow scrolling
            lockScroll = false, xscroll, yscroll,
            scrollContainer = document.querySelector('.container'),
        // the main slider and its items
            sliderEl = document.querySelector('.slider'),
            items = [].slice.call(sliderEl.querySelectorAll('.slide')),
        // total number of items
            itemsTotal = items.length,
        // navigation controls/arrows
            navRightCtrl = sliderEl.querySelector('.button--nav-next'),
            navLeftCtrl = sliderEl.querySelector('.button--nav-prev'),
            zoomCtrl = sliderEl.querySelector('.button--zoom'),
        // the main content element
            contentEl = document.querySelector('.content'),
        // close content control
            closeContentCtrl = contentEl.querySelector('button.button--close'),
        // index of current item
            current = 0,
        // check if an item is "open"
            isOpen = false,
            isFirefox = typeof InstallTrigger !== 'undefined',
        // scale body when zooming into the items, if not Firefox (the performance in Firefox is not very good)
            bodyScale = isFirefox ? false : 3;

        // some helper functions:
        function scrollX() {
            return window.pageXOffset || docElem.scrollLeft;
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        // from http://www.sberry.me/articles/javascript-event-throttling-debouncing
        function throttle(fn, delay) {
            var allowSample = true;

            return function (e) {
                if (allowSample) {
                    allowSample = false;
                    setTimeout(function () {
                        allowSample = true;
                    }, delay);
                    fn(e);
                }
            };
        }

        function init() {
            initEvents();
        }

        // event binding
        function initEvents() {
            // navigation
            navRightCtrl.addEventListener('click', function () {
                navigate('right');
            });
            navLeftCtrl.addEventListener('click', function () {
                navigate('left');
            });

            // window resize
            window.addEventListener('resize', throttle(function (ev) {
                // reset window sizes
                win = {width: window.innerWidth, height: window.innerHeight};

                // reset transforms for the items (slider items)
                items.forEach(function (item, pos) {
                    if (pos === current) return;
                    var el = item.querySelector('.slide__mover');
                    dynamics.css(el, {translateX: el.offsetWidth});
                });
            }, 10));

            // keyboard navigation events
            document.addEventListener('keydown', function (ev) {
                if (isOpen) return;
                var keyCode = ev.keyCode || ev.which;
                switch (keyCode) {
                    case 37:
                        navigate('left');
                        break;
                    case 39:
                        navigate('right');
                        break;
                }
            });
        }

        // opens one item
        function openItem(item) {
            if (isOpen) return;
            isOpen = true;

            // the element that will be transformed
            var zoomer = item.querySelector('.zoomer');
            // slide screen preview
            classie.add(zoomer, 'zoomer--active');
            // disallow scroll
            scrollContainer.addEventListener('scroll', noscroll);
            // apply transforms
            applyTransforms(zoomer);
            // also scale the body so it looks the camera moves to the item.
            if (bodyScale) {
                dynamics.animate(bodyEl, {scale: bodyScale}, {type: dynamics.easeInOut, duration: 500});
            }
            // after the transition is finished:
            onEndTransition(zoomer, function () {
                // reset body transform
                if (bodyScale) {
                    dynamics.stop(bodyEl);
                    dynamics.css(bodyEl, {scale: 1});

                    // fix for safari (allowing fixed children to keep position)
                    bodyEl.style.WebkitTransform = 'none';
                    bodyEl.style.transform = 'none';
                }
                // no scrolling
                classie.add(bodyEl, 'noscroll');
                classie.add(contentEl, 'content--open');
                var contentItem = document.getElementById(item.getAttribute('data-content'))
                classie.add(contentItem, 'content__item--current');
                classie.add(contentItem, 'content__item--reset');


                // reset zoomer transform - back to its original position/transform without a transition
                classie.add(zoomer, 'zoomer--notrans');
                zoomer.style.WebkitTransform = 'translate3d(0,0,0) scale3d(1,1,1)';
                zoomer.style.transform = 'translate3d(0,0,0) scale3d(1,1,1)';
            });
        }

        // closes the item/content
        function closeContent() {
            var contentItem = contentEl.querySelector('.content__item--current'),
                zoomer = items[current].querySelector('.zoomer');

            classie.remove(contentEl, 'content--open');
            classie.remove(contentItem, 'content__item--current');
            classie.remove(bodyEl, 'noscroll');

            if (bodyScale) {
                // reset fix for safari (allowing fixed children to keep position)
                bodyEl.style.WebkitTransform = '';
                bodyEl.style.transform = '';
            }

            /* fix for safari flickering */
            var nobodyscale = true;
            applyTransforms(zoomer, nobodyscale);
            /* fix for safari flickering */

            // wait for the inner content to finish the transition
            onEndTransition(contentItem, function (ev) {
                classie.remove(this, 'content__item--reset');

                // reset scrolling permission
                lockScroll = false;
                scrollContainer.removeEventListener('scroll', noscroll);

                /* fix for safari flickering */
                zoomer.style.WebkitTransform = 'translate3d(0,0,0) scale3d(1,1,1)';
                zoomer.style.transform = 'translate3d(0,0,0) scale3d(1,1,1)';
                /* fix for safari flickering */

                // scale up - behind the scenes - the item again (without transition)
                applyTransforms(zoomer);

                // animate/scale down the item
                setTimeout(function () {
                    classie.remove(zoomer, 'zoomer--notrans');
                    classie.remove(zoomer, 'zoomer--active');
                    zoomer.style.WebkitTransform = 'translate3d(0,0,0) scale3d(1,1,1)';
                    zoomer.style.transform = 'translate3d(0,0,0) scale3d(1,1,1)';
                }, 25);

                if (bodyScale) {
                    dynamics.css(bodyEl, {scale: bodyScale});
                    dynamics.animate(bodyEl, {scale: 1}, {
                        type: dynamics.easeInOut,
                        duration: 500
                    });
                }

                isOpen = false;
            });
        }

        // applies the necessary transform value to scale the item up
        function applyTransforms(el, nobodyscale) {
            // zoomer area and scale value
            var zoomerArea = el.querySelector('.zoomer__area'),
                zoomerAreaSize = {width: zoomerArea.offsetWidth, height: zoomerArea.offsetHeight},
                zoomerOffset = zoomerArea.getBoundingClientRect(),
                scaleVal = zoomerAreaSize.width / zoomerAreaSize.height < win.width / win.height ? win.width / zoomerAreaSize.width : win.height / zoomerAreaSize.height;

            if (bodyScale && !nobodyscale) {
                scaleVal /= bodyScale;
            }

            // apply transform
            el.style.WebkitTransform = 'translate3d(' + Number(win.width / 2 - (zoomerOffset.left + zoomerAreaSize.width / 2)) + 'px,' + Number(win.height / 2 - (zoomerOffset.top + zoomerAreaSize.height / 2)) + 'px,0) scale3d(' + scaleVal + ',' + scaleVal + ',1)';
            el.style.transform = 'translate3d(' + Number(win.width / 2 - (zoomerOffset.left + zoomerAreaSize.width / 2)) + 'px,' + Number(win.height / 2 - (zoomerOffset.top + zoomerAreaSize.height / 2)) + 'px,0) scale3d(' + scaleVal + ',' + scaleVal + ',1)';
        }

        // navigate the slider
        function navigate(dir) {
            var itemCurrent = items[current],
                currentEl = itemCurrent.querySelector('.slide__mover'),
                currentTitleEl = itemCurrent.querySelector('.slide__title');


            // update new current value
            if (dir === 'right') {
                if (current >= itemsTotal - 1) return false;
                current = current < itemsTotal - 1 ? current + 1 : 0;
            }
            else {
                if (current <= 0) return false;
                current = current > 0 ? current - 1 : itemsTotal - 1;
            }

            var itemNext = items[current],
                nextEl = itemNext.querySelector('.slide__mover'),
                nextTitleEl = itemNext.querySelector('.slide__title');

            // animate the current element out
            dynamics.animate(currentEl, {
                opacity: 0,
                translateX: dir === 'right' ? -1 * currentEl.offsetWidth / 2 : currentEl.offsetWidth / 2,
                rotateZ: dir === 'right' ? -10 : 10
            }, {
                type: dynamics.spring,
                duration: 1500,
                friction: 600,
                complete: function () {
                    dynamics.css(itemCurrent, {opacity: 0, visibility: 'hidden'});
                }
            });

            // animate the current title out
            dynamics.animate(currentTitleEl, {translateX: dir === 'right' ? -250 : 250, opacity: 0}, {
                type: dynamics.bezier,
                points: [{"x": 0, "y": 0, "cp": [{"x": 0.2, "y": 1}]}, {"x": 1, "y": 1, "cp": [{"x": 0.3, "y": 1}]}],
                duration: 450
            });

            // set the right properties for the next element to come in
            dynamics.css(itemNext, {opacity: 1, visibility: 'visible'});
            dynamics.css(nextEl, {
                opacity: 0,
                translateX: dir === 'right' ? nextEl.offsetWidth / 2 : -1 * nextEl.offsetWidth / 2,
                rotateZ: dir === 'right' ? 10 : -10
            });

            // animate the next element in
            dynamics.animate(nextEl, {opacity: 1, translateX: 0}, {
                type: dynamics.spring,
                duration: 1500,
                friction: 600,
                complete: function () {
                    items.forEach(function (item) {
                        classie.remove(item, 'slide--current');
                    });
                    classie.add(itemNext, 'slide--current');
                }
            });

            // set the right properties for the next title to come in
            dynamics.css(nextTitleEl, {translateX: dir === 'right' ? 250 : -250, opacity: 0});
            // animate the next title in
            dynamics.animate(nextTitleEl, {translateX: 0, opacity: 1}, {
                type: dynamics.bezier,
                points: [{"x": 0, "y": 0, "cp": [{"x": 0.2, "y": 1}]}, {"x": 1, "y": 1, "cp": [{"x": 0.3, "y": 1}]}],
                duration: 650
            });

            $(".current-slide").html(current + 1);
        }

        // disallow scrolling (on the scrollContainer)
        function noscroll() {
            if (!lockScroll) {
                lockScroll = true;
                xscroll = scrollContainer.scrollLeft;
                yscroll = scrollContainer.scrollTop;
            }
            scrollContainer.scrollTop = yscroll;
            scrollContainer.scrollLeft = xscroll;
        }

        init();

    })(window);
});