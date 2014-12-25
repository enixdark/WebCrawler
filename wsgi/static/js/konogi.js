/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
(function (l, o, i, e) {
    var p = i('html'),
    d = i(l),
    a = i(o),
    q = i.fancybox = function () {
        q.open.apply(this, arguments)
    },
    k = navigator.userAgent.match(/msie/i),
    c = null,
    f = o.createTouch !== e,
    j = function (r) {
        return r && r.hasOwnProperty && r instanceof i
    },
    b = function (r) {
        return r && i.type(r) === 'string'
    },
    m = function (r) {
        return b(r) && r.indexOf('%') > 0
    },
    h = function (r) {
        return (r && !(r.style.overflow && r.style.overflow === 'hidden') && ((r.clientWidth && r.scrollWidth > r.clientWidth) || (r.clientHeight && r.scrollHeight > r.clientHeight)))
    },
    n = function (t, s) {
        var r = parseInt(t, 10) || 0;
        if (s && m(t)) {
            r = q.getViewport() [s] / 100 * r
        }
        return Math.ceil(r)
    },
    g = function (r, s) {
        return n(r, s) + 'px'
    };
    i.extend(q, {
        version: '2.1.5',
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: true,
            autoHeight: false,
            autoWidth: false,
            autoResize: true,
            autoCenter: !f,
            fitToView: true,
            aspectRatio: false,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: 'auto',
            wrapCSS: '',
            arrows: true,
            closeBtn: true,
            closeClick: false,
            nextClick: false,
            mouseWheel: true,
            autoPlay: false,
            playSpeed: 3000,
            preload: 3,
            modal: false,
            loop: true,
            ajax: {
                dataType: 'html',
                headers: {
                    'X-fancyBox': true
                }
            },
            iframe: {
                scrolling: 'auto',
                preload: true
            },
            swf: {
                wmode: 'transparent',
                allowfullscreen: 'true',
                allowscriptaccess: 'always'
            },
            keys: {
                next: {
                    13: 'left',
                    34: 'up',
                    39: 'left',
                    40: 'up'
                },
                prev: {
                    8: 'right',
                    33: 'down',
                    37: 'right',
                    38: 'down'
                },
                close: [
                    27
                ],
                play: [
                    32
                ],
                toggle: [
                    70
                ]
            },
            direction: {
                next: 'left',
                prev: 'right'
            },
            scrollOutside: true,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (k ? ' allowtransparency="true"' : '') + '></iframe>',
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: 'fade',
            openSpeed: 250,
            openEasing: 'swing',
            openOpacity: true,
            openMethod: 'zoomIn',
            closeEffect: 'fade',
            closeSpeed: 250,
            closeEasing: 'swing',
            closeOpacity: true,
            closeMethod: 'zoomOut',
            nextEffect: 'elastic',
            nextSpeed: 250,
            nextEasing: 'swing',
            nextMethod: 'changeIn',
            prevEffect: 'elastic',
            prevSpeed: 250,
            prevEasing: 'swing',
            prevMethod: 'changeOut',
            helpers: {
                overlay: true,
                title: true
            },
            onCancel: i.noop,
            beforeLoad: i.noop,
            afterLoad: i.noop,
            beforeShow: i.noop,
            afterShow: i.noop,
            beforeChange: i.noop,
            beforeClose: i.noop,
            afterClose: i.noop
        },
        group: {
        },
        opts: {
        },
        previous: null,
        coming: null,
        current: null,
        isActive: false,
        isOpen: false,
        isOpened: false,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: false
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {
        },
        helpers: {
        },
        open: function (s, r) {
            if (!s) {
                return
            }
            if (!i.isPlainObject(r)) {
                r = {
                }
            }
            if (false === q.close(true)) {
                return
            }
            if (!i.isArray(s)) {
                s = j(s) ? i(s) .get()  : [
                    s
                ]
            }
            i.each(s, function (x, y) {
                var w = {
                },
                t,
                B,
                z,
                A,
                v,
                C,
                u;
                if (i.type(y) === 'object') {
                    if (y.nodeType) {
                        y = i(y)
                    }
                    if (j(y)) {
                        w = {
                            href: y.data('fancybox-href') || y.attr('href'),
                            title: y.data('fancybox-title') || y.attr('title'),
                            isDom: true,
                            element: y
                        };
                        if (i.metadata) {
                            i.extend(true, w, y.metadata())
                        }
                    } else {
                        w = y
                    }
                }
                t = r.href || w.href || (b(y) ? y : null);
                B = r.title !== e ? r.title : w.title || '';
                z = r.content || w.content;
                A = z ? 'html' : (r.type || w.type);
                if (!A && w.isDom) {
                    A = y.data('fancybox-type');
                    if (!A) {
                        v = y.prop('class') .match(/fancybox\.(\w+)/);
                        A = v ? v[1] : null
                    }
                }
                if (b(t)) {
                    if (!A) {
                        if (q.isImage(t)) {
                            A = 'image'
                        } else {
                            if (q.isSWF(t)) {
                                A = 'swf'
                            } else {
                                if (t.charAt(0) === '#') {
                                    A = 'inline'
                                } else {
                                    if (b(y)) {
                                        A = 'html';
                                        z = y
                                    }
                                }
                            }
                        }
                    }
                    if (A === 'ajax') {
                        C = t.split(/\s+/, 2);
                        t = C.shift();
                        u = C.shift()
                    }
                }
                if (!z) {
                    if (A === 'inline') {
                        if (t) {
                            z = i(b(t) ? t.replace(/.*(?=#[^\s]+$)/, '')  : t)
                        } else {
                            if (w.isDom) {
                                z = y
                            }
                        }
                    } else {
                        if (A === 'html') {
                            z = t
                        } else {
                            if (!A && !t && w.isDom) {
                                A = 'inline';
                                z = y
                            }
                        }
                    }
                }
                i.extend(w, {
                    href: t,
                    type: A,
                    content: z,
                    title: B,
                    selector: u
                });
                s[x] = w
            });
            q.opts = i.extend(true, {
            }, q.defaults, r);
            if (r.keys !== e) {
                q.opts.keys = r.keys ? i.extend({
                }, q.defaults.keys, r.keys)  : false
            }
            q.group = s;
            return q._start(q.opts.index)
        },
        cancel: function () {
            var r = q.coming;
            if (!r || false === q.trigger('onCancel')) {
                return
            }
            q.hideLoading();
            if (q.ajaxLoad) {
                q.ajaxLoad.abort()
            }
            q.ajaxLoad = null;
            if (q.imgPreload) {
                q.imgPreload.onload = q.imgPreload.onerror = null
            }
            if (r.wrap) {
                r.wrap.stop(true, true) .trigger('onReset') .remove()
            }
            q.coming = null;
            if (!q.current) {
                q._afterZoomOut(r)
            }
        },
        close: function (r) {
            q.cancel();
            if (false === q.trigger('beforeClose')) {
                return
            }
            q.unbindEvents();
            if (!q.isActive) {
                return
            }
            if (!q.isOpen || r === true) {
                i('.fancybox-wrap') .stop(true) .trigger('onReset') .remove();
                q._afterZoomOut()
            } else {
                q.isOpen = q.isOpened = false;
                q.isClosing = true;
                i('.fancybox-item, .fancybox-nav') .remove();
                q.wrap.stop(true, true) .removeClass('fancybox-opened');
                q.transitions[q.current.closeMethod]()
            }
        },
        play: function (t) {
            var r = function () {
                clearTimeout(q.player.timer)
            },
            v = function () {
                r();
                if (q.current && q.player.isActive) {
                    q.player.timer = setTimeout(q.next, q.current.playSpeed)
                }
            },
            s = function () {
                r();
                a.unbind('.player');
                q.player.isActive = false;
                q.trigger('onPlayEnd')
            },
            u = function () {
                if (q.current && (q.current.loop || q.current.index < q.group.length - 1)) {
                    q.player.isActive = true;
                    a.bind({
                        'onCancel.player beforeClose.player': s,
                        'onUpdate.player': v,
                        'beforeLoad.player': r
                    });
                    v();
                    q.trigger('onPlayStart')
                }
            };
            if (t === true || (!q.player.isActive && t !== false)) {
                u()
            } else {
                s()
            }
        },
        next: function (s) {
            var r = q.current;
            if (r) {
                if (!b(s)) {
                    s = r.direction.next
                }
                q.jumpto(r.index + 1, s, 'next')
            }
        },
        prev: function (s) {
            var r = q.current;
            if (r) {
                if (!b(s)) {
                    s = r.direction.prev
                }
                q.jumpto(r.index - 1, s, 'prev')
            }
        },
        jumpto: function (s, u, r) {
            var t = q.current;
            if (!t) {
                return
            }
            s = n(s);
            q.direction = u || t.direction[(s >= t.index ? 'next' : 'prev')];
            q.router = r || 'jumpto';
            if (t.loop) {
                if (s < 0) {
                    s = t.group.length + (s % t.group.length)
                }
                s = s % t.group.length
            }
            if (t.group[s] !== e) {
                q.cancel();
                q._start(s)
            }
        },
        reposition: function (u, r) {
            var t = q.current,
            s = t ? t.wrap : null,
            v;
            if (s) {
                v = q._getPosition(r);
                if (u && u.type === 'scroll') {
                    delete v.position;
                    s.stop(true, true) .animate(v, 200)
                } else {
                    s.css(v);
                    t.pos = i.extend({
                    }, t.dim, v)
                }
            }
        },
        update: function (t) {
            var r = (t && t.type),
            s = !r || r === 'orientationchange';
            if (s) {
                clearTimeout(c);
                c = null
            }
            if (!q.isOpen || c) {
                return
            }
            c = setTimeout(function () {
                var u = q.current;
                if (!u || q.isClosing) {
                    return
                }
                q.wrap.removeClass('fancybox-tmp');
                if (s || r === 'load' || (r === 'resize' && u.autoResize)) {
                    q._setDimension()
                }
                if (!(r === 'scroll' && u.canShrink)) {
                    q.reposition(t)
                }
                q.trigger('onUpdate');
                c = null
            }, (s && !f ? 0 : 300))
        },
        toggle: function (r) {
            if (q.isOpen) {
                q.current.fitToView = i.type(r) === 'boolean' ? r : !q.current.fitToView;
                if (f) {
                    q.wrap.removeAttr('style') .addClass('fancybox-tmp');
                    q.trigger('onUpdate')
                }
                q.update()
            }
        },
        hideLoading: function () {
            a.unbind('.loading');
            i('#fancybox-loading') .remove()
        },
        showLoading: function () {
            var s,
            r;
            q.hideLoading();
            s = i('<div id="fancybox-loading"><div></div></div>') .click(q.cancel) .appendTo('body');
            a.bind('keydown.loading', function (t) {
                if ((t.which || t.keyCode) === 27) {
                    t.preventDefault();
                    q.cancel()
                }
            });
            if (!q.defaults.fixed) {
                r = q.getViewport();
                s.css({
                    position: 'absolute',
                    top: (r.h * 0.5) + r.y,
                    left: (r.w * 0.5) + r.x
                })
            }
        },
        getViewport: function () {
            var r = (q.current && q.current.locked) || false,
            s = {
                x: d.scrollLeft(),
                y: d.scrollTop()
            };
            if (r) {
                s.w = r[0].clientWidth;
                s.h = r[0].clientHeight
            } else {
                s.w = f && l.innerWidth ? l.innerWidth : d.width();
                s.h = f && l.innerHeight ? l.innerHeight : d.height()
            }
            return s
        },
        unbindEvents: function () {
            if (q.wrap && j(q.wrap)) {
                q.wrap.unbind('.fb')
            }
            a.unbind('.fb');
            d.unbind('.fb')
        },
        bindEvents: function () {
            var s = q.current,
            r;
            if (!s) {
                return
            }
            d.bind('orientationchange.fb' + (f ? '' : ' resize.fb') + (s.autoCenter && !s.locked ? ' scroll.fb' : ''), q.update);
            r = s.keys;
            if (r) {
                a.bind('keydown.fb', function (v) {
                    var t = v.which || v.keyCode,
                    u = v.target || v.srcElement;
                    if (t === 27 && q.coming) {
                        return false
                    }
                    if (!v.ctrlKey && !v.altKey && !v.shiftKey && !v.metaKey && !(u && (u.type || i(u) .is('[contenteditable]')))) {
                        i.each(r, function (w, x) {
                            if (s.group.length > 1 && x[t] !== e) {
                                q[w](x[t]);
                                v.preventDefault();
                                return false
                            }
                            if (i.inArray(t, x) > - 1) {
                                q[w]();
                                v.preventDefault();
                                return false
                            }
                        })
                    }
                })
            }
            if (i.fn.mousewheel && s.mouseWheel) {
                q.wrap.bind('mousewheel.fb', function (y, z, u, t) {
                    var x = y.target || null,
                    v = i(x),
                    w = false;
                    while (v.length) {
                        if (w || v.is('.fancybox-skin') || v.is('.fancybox-wrap')) {
                            break
                        }
                        w = h(v[0]);
                        v = i(v) .parent()
                    }
                    if (z !== 0 && !w) {
                        if (q.group.length > 1 && !s.canShrink) {
                            if (t > 0 || u > 0) {
                                q.prev(t > 0 ? 'down' : 'left')
                            } else {
                                if (t < 0 || u < 0) {
                                    q.next(t < 0 ? 'up' : 'right')
                                }
                            }
                            y.preventDefault()
                        }
                    }
                })
            }
        },
        trigger: function (s, u) {
            var r,
            t = u || q.coming || q.current;
            if (!t) {
                return
            }
            if (i.isFunction(t[s])) {
                r = t[s].apply(t, Array.prototype.slice.call(arguments, 1))
            }
            if (r === false) {
                return false
            }
            if (t.helpers) {
                i.each(t.helpers, function (w, v) {
                    if (v && q.helpers[w] && i.isFunction(q.helpers[w][s])) {
                        q.helpers[w][s](i.extend(true, {
                        }, q.helpers[w].defaults, v), t)
                    }
                })
            }
            a.trigger(s)
        },
        isImage: function (r) {
            return b(r) && r.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function (r) {
            return b(r) && r.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function (s) {
            var t = {
            },
            x,
            r,
            u,
            v,
            w;
            s = n(s);
            x = q.group[s] || null;
            if (!x) {
                return false
            }
            t = i.extend(true, {
            }, q.opts, x);
            v = t.margin;
            w = t.padding;
            if (i.type(v) === 'number') {
                t.margin = [
                    v,
                    v,
                    v,
                    v
                ]
            }
            if (i.type(w) === 'number') {
                t.padding = [
                    w,
                    w,
                    w,
                    w
                ]
            }
            if (t.modal) {
                i.extend(true, t, {
                    closeBtn: false,
                    closeClick: false,
                    nextClick: false,
                    arrows: false,
                    mouseWheel: false,
                    keys: null,
                    helpers: {
                        overlay: {
                            closeClick: false
                        }
                    }
                })
            }
            if (t.autoSize) {
                t.autoWidth = t.autoHeight = true
            }
            if (t.width === 'auto') {
                t.autoWidth = true
            }
            if (t.height === 'auto') {
                t.autoHeight = true
            }
            t.group = q.group;
            t.index = s;
            q.coming = t;
            if (false === q.trigger('beforeLoad')) {
                q.coming = null;
                return
            }
            u = t.type;
            r = t.href;
            if (!u) {
                q.coming = null;
                if (q.current && q.router && q.router !== 'jumpto') {
                    q.current.index = s;
                    return q[q.router](q.direction)
                }
                return false
            }
            q.isActive = true;
            if (u === 'image' || u === 'swf') {
                t.autoHeight = t.autoWidth = false;
                t.scrolling = 'visible'
            }
            if (u === 'image') {
                t.aspectRatio = true
            }
            if (u === 'iframe' && f) {
                t.scrolling = 'scroll'
            }
            t.wrap = i(t.tpl.wrap) .addClass('fancybox-' + (f ? 'mobile' : 'desktop') + ' fancybox-type-' + u + ' fancybox-tmp ' + t.wrapCSS) .appendTo(t.parent || 'body');
            i.extend(t, {
                skin: i('.fancybox-skin', t.wrap),
                outer: i('.fancybox-outer', t.wrap),
                inner: i('.fancybox-inner', t.wrap)
            });
            i.each(['Top',
            'Right',
            'Bottom',
            'Left'], function (z, y) {
                t.skin.css('padding' + y, g(t.padding[z]))
            });
            q.trigger('onReady');
            if (u === 'inline' || u === 'html') {
                if (!t.content || !t.content.length) {
                    return q._error('content')
                }
            } else {
                if (!r) {
                    return q._error('href')
                }
            }
            if (u === 'image') {
                q._loadImage()
            } else {
                if (u === 'ajax') {
                    q._loadAjax()
                } else {
                    if (u === 'iframe') {
                        q._loadIframe()
                    } else {
                        q._afterLoad()
                    }
                }
            }
        },
        _error: function (r) {
            i.extend(q.coming, {
                type: 'html',
                autoWidth: true,
                autoHeight: true,
                minWidth: 0,
                minHeight: 0,
                scrolling: 'no',
                hasError: r,
                content: q.coming.tpl.error
            });
            q._afterLoad()
        },
        _loadImage: function () {
            var r = q.imgPreload = new Image();
            r.onload = function () {
                this.onload = this.onerror = null;
                q.coming.width = this.width / q.opts.pixelRatio;
                q.coming.height = this.height / q.opts.pixelRatio;
                q._afterLoad()
            };
            r.onerror = function () {
                this.onload = this.onerror = null;
                q._error('image')
            };
            r.src = q.coming.href;
            if (r.complete !== true) {
                q.showLoading()
            }
        },
        _loadAjax: function () {
            var r = q.coming;
            q.showLoading();
            q.ajaxLoad = i.ajax(i.extend({
            }, r.ajax, {
                url: r.href,
                error: function (s, t) {
                    if (q.coming && t !== 'abort') {
                        q._error('ajax', s)
                    } else {
                        q.hideLoading()
                    }
                },
                success: function (s, t) {
                    if (t === 'success') {
                        r.content = s;
                        q._afterLoad()
                    }
                }
            }))
        },
        _loadIframe: function () {
            var r = q.coming,
            s = i(r.tpl.iframe.replace(/\{rnd\}/g, new Date() .getTime())) .attr('scrolling', f ? 'auto' : r.iframe.scrolling) .attr('src', r.href);
            i(r.wrap) .bind('onReset', function () {
                try {
                    i(this) .find('iframe') .hide() .attr('src', '//about:blank') .end() .empty()
                } catch (t) {
                }
            });
            if (r.iframe.preload) {
                q.showLoading();
                s.one('load', function () {
                    i(this) .data('ready', 1);
                    if (!f) {
                        i(this) .bind('load.fb', q.update)
                    }
                    i(this) .parents('.fancybox-wrap') .width('100%') .removeClass('fancybox-tmp') .show();
                    q._afterLoad()
                })
            }
            r.content = s.appendTo(r.inner);
            if (!r.iframe.preload) {
                q._afterLoad()
            }
        },
        _preloadImages: function () {
            var w = q.group,
            v = q.current,
            r = w.length,
            t = v.preload ? Math.min(v.preload, r - 1)  : 0,
            u,
            s;
            for (s = 1; s <= t; s += 1) {
                u = w[(v.index + s) % r];
                if (u.type === 'image' && u.href) {
                    new Image() .src = u.href
                }
            }
        },
        _afterLoad: function () {
            var s = q.coming,
            u = q.current,
            z = 'fancybox-placeholder',
            w,
            x,
            y,
            t,
            r,
            v;
            q.hideLoading();
            if (!s || q.isActive === false) {
                return
            }
            if (false === q.trigger('afterLoad', s, u)) {
                s.wrap.stop(true) .trigger('onReset') .remove();
                q.coming = null;
                return
            }
            if (u) {
                q.trigger('beforeChange', u);
                u.wrap.stop(true) .removeClass('fancybox-opened') .find('.fancybox-item, .fancybox-nav') .remove()
            }
            q.unbindEvents();
            w = s;
            x = s.content;
            y = s.type;
            t = s.scrolling;
            i.extend(q, {
                wrap: w.wrap,
                skin: w.skin,
                outer: w.outer,
                inner: w.inner,
                current: w,
                previous: u
            });
            r = w.href;
            switch (y) {
            case 'inline':
            case 'ajax':
            case 'html':
                if (w.selector) {
                    x = i('<div>') .html(x) .find(w.selector)
                } else {
                    if (j(x)) {
                        if (!x.data(z)) {
                            x.data(z, i('<div class="' + z + '"></div>') .insertAfter(x) .hide())
                        }
                        x = x.show() .detach();
                        w.wrap.bind('onReset', function () {
                            if (i(this) .find(x) .length) {
                                x.hide() .replaceAll(x.data(z)) .data(z, false)
                            }
                        })
                    }
                }
                break;
            case 'image':
                x = w.tpl.image.replace('{href}', r);
                break;
            case 'swf':
                x = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + r + '"></param>';
                v = '';
                i.each(w.swf, function (A, B) {
                    x += '<param name="' + A + '" value="' + B + '"></param>';
                    v += ' ' + A + '="' + B + '"'
                });
                x += '<embed src="' + r + '" type="application/x-shockwave-flash" width="100%" height="100%"' + v + '></embed></object>';
                break
            }
            if (!(j(x) && x.parent() .is(w.inner))) {
                w.inner.append(x)
            }
            q.trigger('beforeShow');
            w.inner.css('overflow', t === 'yes' ? 'scroll' : (t === 'no' ? 'hidden' : t));
            q._setDimension();
            q.reposition();
            q.isOpen = false;
            q.coming = null;
            q.bindEvents();
            if (!q.isOpened) {
                i('.fancybox-wrap') .not(w.wrap) .stop(true) .trigger('onReset') .remove()
            } else {
                if (u.prevMethod) {
                    q.transitions[u.prevMethod]()
                }
            }
            q.transitions[q.isOpened ? w.nextMethod : w.openMethod]();
            q._preloadImages()
        },
        _setDimension: function () {
            var U = q.getViewport(),
            Q = 0,
            W = false,
            Y = false,
            C = q.wrap,
            O = q.skin,
            Z = q.inner,
            L = q.current,
            M = L.width,
            J = L.height,
            F = L.minWidth,
            y = L.minHeight,
            S = L.maxWidth,
            K = L.maxHeight,
            E = L.scrolling,
            w = L.scrollOutside ? L.scrollbarWidth : 0,
            I = L.margin,
            x = n(I[1] + I[3]),
            v = n(I[0] + I[2]),
            t,
            s,
            P,
            R,
            H,
            G,
            N,
            A,
            z,
            V,
            u,
            X,
            r,
            B,
            D;
            C.add(O) .add(Z) .width('auto') .height('auto') .removeClass('fancybox-tmp');
            t = n(O.outerWidth(true) - O.width());
            s = n(O.outerHeight(true) - O.height());
            P = x + t;
            R = v + s;
            H = m(M) ? (U.w - P) * n(M) / 100 : M;
            G = m(J) ? (U.h - R) * n(J) / 100 : J;
            if (L.type === 'iframe') {
                B = L.content;
                if (L.autoHeight && B.data('ready') === 1) {
                    try {
                        if (B[0].contentWindow.document.location) {
                            Z.width(H) .height(9999);
                            D = B.contents() .find('body');
                            if (w) {
                                D.css('overflow-x', 'hidden')
                            }
                            G = D.outerHeight(true)
                        }
                    } catch (T) {
                    }
                }
            } else {
                if (L.autoWidth || L.autoHeight) {
                    Z.addClass('fancybox-tmp');
                    if (!L.autoWidth) {
                        Z.width(H)
                    }
                    if (!L.autoHeight) {
                        Z.height(G)
                    }
                    if (L.autoWidth) {
                        H = Z.width()
                    }
                    if (L.autoHeight) {
                        G = Z.height()
                    }
                    Z.removeClass('fancybox-tmp')
                }
            }
            M = n(H);
            J = n(G);
            z = H / G;
            F = n(m(F) ? n(F, 'w') - P : F);
            S = n(m(S) ? n(S, 'w') - P : S);
            y = n(m(y) ? n(y, 'h') - R : y);
            K = n(m(K) ? n(K, 'h') - R : K);
            N = S;
            A = K;
            if (L.fitToView) {
                S = Math.min(U.w - P, S);
                K = Math.min(U.h - R, K)
            }
            X = U.w - x;
            r = U.h - v;
            if (L.aspectRatio) {
                if (M > S) {
                    M = S;
                    J = n(M / z)
                }
                if (J > K) {
                    J = K;
                    M = n(J * z)
                }
                if (M < F) {
                    M = F;
                    J = n(M / z)
                }
                if (J < y) {
                    J = y;
                    M = n(J * z)
                }
            } else {
                M = Math.max(F, Math.min(M, S));
                if (L.autoHeight && L.type !== 'iframe') {
                    Z.width(M);
                    J = Z.height()
                }
                J = Math.max(y, Math.min(J, K))
            }
            if (L.fitToView) {
                Z.width(M) .height(J);
                C.width(M + t);
                V = C.width();
                u = C.height();
                if (L.aspectRatio) {
                    while ((V > X || u > r) && M > F && J > y) {
                        if (Q++ > 19) {
                            break
                        }
                        J = Math.max(y, Math.min(K, J - 10));
                        M = n(J * z);
                        if (M < F) {
                            M = F;
                            J = n(M / z)
                        }
                        if (M > S) {
                            M = S;
                            J = n(M / z)
                        }
                        Z.width(M) .height(J);
                        C.width(M + t);
                        V = C.width();
                        u = C.height()
                    }
                } else {
                    M = Math.max(F, Math.min(M, M - (V - X)));
                    J = Math.max(y, Math.min(J, J - (u - r)))
                }
            }
            if (w && E === 'auto' && J < G && (M + t + w) < X) {
                M += w
            }
            Z.width(M) .height(J);
            C.width(M + t);
            V = C.width();
            u = C.height();
            W = (V > X || u > r) && M > F && J > y;
            Y = L.aspectRatio ? (M < N && J < A && M < H && J < G)  : ((M < N || J < A) && (M < H || J < G));
            i.extend(L, {
                dim: {
                    width: g(V),
                    height: g(u)
                },
                origWidth: H,
                origHeight: G,
                canShrink: W,
                canExpand: Y,
                wPadding: t,
                hPadding: s,
                wrapSpace: u - O.outerHeight(true),
                skinSpace: O.height() - J
            });
            if (!B && L.autoHeight && J > y && J < K && !Y) {
                Z.height('auto')
            }
        },
        _getPosition: function (t) {
            var x = q.current,
            s = q.getViewport(),
            v = x.margin,
            u = q.wrap.width() + v[1] + v[3],
            r = q.wrap.height() + v[0] + v[2],
            w = {
                position: 'absolute',
                top: v[0],
                left: v[3]
            };
            if (x.autoCenter && x.fixed && !t && r <= s.h && u <= s.w) {
                w.position = 'fixed'
            } else {
                if (!x.locked) {
                    w.top += s.y;
                    w.left += s.x
                }
            }
            w.top = g(Math.max(w.top, w.top + ((s.h - r) * x.topRatio)));
            w.left = g(Math.max(w.left, w.left + ((s.w - u) * x.leftRatio)));
            return w
        },
        _afterZoomIn: function () {
            var r = q.current;
            if (!r) {
                return
            }
            q.isOpen = q.isOpened = true;
            q.wrap.css('overflow', 'visible') .addClass('fancybox-opened');
            q.update();
            if (r.closeClick || (r.nextClick && q.group.length > 1)) {
                q.inner.css('cursor', 'pointer') .bind('click.fb', function (s) {
                    if (!i(s.target) .is('a') && !i(s.target) .parent() .is('a')) {
                        s.preventDefault();
                        q[r.closeClick ? 'close' : 'next']()
                    }
                })
            }
            if (r.closeBtn) {
                i(r.tpl.closeBtn) .appendTo(q.skin) .bind('click.fb', function (s) {
                    s.preventDefault();
                    q.close()
                })
            }
            if (r.arrows && q.group.length > 1) {
                if (r.loop || r.index > 0) {
                    i(r.tpl.prev) .appendTo(q.outer) .bind('click.fb', q.prev)
                }
                if (r.loop || r.index < q.group.length - 1) {
                    i(r.tpl.next) .appendTo(q.outer) .bind('click.fb', q.next)
                }
            }
            q.trigger('afterShow');
            if (!r.loop && r.index === r.group.length - 1) {
                q.play(false)
            } else {
                if (q.opts.autoPlay && !q.player.isActive) {
                    q.opts.autoPlay = false;
                    q.play()
                }
            }
        },
        _afterZoomOut: function (r) {
            r = r || q.current;
            i('.fancybox-wrap') .trigger('onReset') .remove();
            i.extend(q, {
                group: {
                },
                opts: {
                },
                router: false,
                current: null,
                isActive: false,
                isOpened: false,
                isOpen: false,
                isClosing: false,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            q.trigger('afterClose', r)
        }
    });
    q.transitions = {
        getOrigPosition: function () {
            var u = q.current,
            s = u.element,
            x = u.orig,
            w = {
            },
            r = 50,
            y = 50,
            v = u.hPadding,
            z = u.wPadding,
            t = q.getViewport();
            if (!x && u.isDom && s.is(':visible')) {
                x = s.find('img:first');
                if (!x.length) {
                    x = s
                }
            }
            if (j(x)) {
                w = x.offset();
                if (x.is('img')) {
                    r = x.outerWidth();
                    y = x.outerHeight()
                }
            } else {
                w.top = t.y + (t.h - y) * u.topRatio;
                w.left = t.x + (t.w - r) * u.leftRatio
            }
            if (q.wrap.css('position') === 'fixed' || u.locked) {
                w.top -= t.y;
                w.left -= t.x
            }
            w = {
                top: g(w.top - v * u.topRatio),
                left: g(w.left - z * u.leftRatio),
                width: g(r + z),
                height: g(y + v)
            };
            return w
        },
        step: function (s, t) {
            var v,
            x,
            y,
            r = t.prop,
            u = q.current,
            w = u.wrapSpace,
            z = u.skinSpace;
            if (r === 'width' || r === 'height') {
                v = t.end === t.start ? 1 : (s - t.start) / (t.end - t.start);
                if (q.isClosing) {
                    v = 1 - v
                }
                x = r === 'width' ? u.wPadding : u.hPadding;
                y = s - x;
                q.skin[r](n(r === 'width' ? y : y - (w * v)));
                q.inner[r](n(r === 'width' ? y : y - (w * v) - (z * v)))
            }
        },
        zoomIn: function () {
            var v = q.current,
            s = v.pos,
            t = v.openEffect,
            u = t === 'elastic',
            r = i.extend({
                opacity: 1
            }, s);
            delete r.position;
            if (u) {
                s = this.getOrigPosition();
                if (v.openOpacity) {
                    s.opacity = 0.1
                }
            } else {
                if (t === 'fade') {
                    s.opacity = 0.1
                }
            }
            q.wrap.css(s) .animate(r, {
                duration: t === 'none' ? 0 : v.openSpeed,
                easing: v.openEasing,
                step: u ? this.step : null,
                complete: q._afterZoomIn
            })
        },
        zoomOut: function () {
            var u = q.current,
            s = u.closeEffect,
            t = s === 'elastic',
            r = {
                opacity: 0.1
            };
            if (t) {
                r = this.getOrigPosition();
                if (u.closeOpacity) {
                    r.opacity = 0.1
                }
            }
            q.wrap.animate(r, {
                duration: s === 'none' ? 0 : u.closeSpeed,
                easing: u.closeEasing,
                step: t ? this.step : null,
                complete: q._afterZoomOut
            })
        },
        changeIn: function () {
            var w = q.current,
            t = w.nextEffect,
            s = w.pos,
            r = {
                opacity: 1
            },
            v = q.direction,
            x = 200,
            u;
            s.opacity = 0.1;
            if (t === 'elastic') {
                u = v === 'down' || v === 'up' ? 'top' : 'left';
                if (v === 'down' || v === 'right') {
                    s[u] = g(n(s[u]) - x);
                    r[u] = '+=' + x + 'px'
                } else {
                    s[u] = g(n(s[u]) + x);
                    r[u] = '-=' + x + 'px'
                }
            }
            if (t === 'none') {
                q._afterZoomIn()
            } else {
                q.wrap.css(s) .animate(r, {
                    duration: w.nextSpeed,
                    easing: w.nextEasing,
                    complete: q._afterZoomIn
                })
            }
        },
        changeOut: function () {
            var t = q.previous,
            s = t.prevEffect,
            r = {
                opacity: 0.1
            },
            u = q.direction,
            v = 200;
            if (s === 'elastic') {
                r[u === 'down' || u === 'up' ? 'top' : 'left'] = (u === 'up' || u === 'left' ? '-' : '+') + '=' + v + 'px'
            }
            t.wrap.animate(r, {
                duration: s === 'none' ? 0 : t.prevSpeed,
                easing: t.prevEasing,
                complete: function () {
                    i(this) .trigger('onReset') .remove()
                }
            })
        }
    };
    q.helpers.overlay = {
        defaults: {
            closeClick: true,
            speedOut: 200,
            showEarly: true,
            css: {
            },
            locked: !f,
            fixed: true
        },
        overlay: null,
        fixed: false,
        el: i('html'),
        create: function (r) {
            r = i.extend({
            }, this.defaults, r);
            if (this.overlay) {
                this.close()
            }
            this.overlay = i('<div class="fancybox-overlay"></div>') .appendTo(q.coming ? q.coming.parent : r.parent);
            this.fixed = false;
            if (r.fixed && q.defaults.fixed) {
                this.overlay.addClass('fancybox-overlay-fixed');
                this.fixed = true
            }
        },
        open: function (s) {
            var r = this;
            s = i.extend({
            }, this.defaults, s);
            if (this.overlay) {
                this.overlay.unbind('.overlay') .width('auto') .height('auto')
            } else {
                this.create(s)
            }
            if (!this.fixed) {
                d.bind('resize.overlay', i.proxy(this.update, this));
                this.update()
            }
            if (s.closeClick) {
                this.overlay.bind('click.overlay', function (t) {
                    if (i(t.target) .hasClass('fancybox-overlay')) {
                        if (q.isActive) {
                            q.close()
                        } else {
                            r.close()
                        }
                        return false
                    }
                })
            }
            this.overlay.css(s.css) .show()
        },
        close: function () {
            var r,
            s;
            d.unbind('resize.overlay');
            if (this.el.hasClass('fancybox-lock')) {
                i('.fancybox-margin') .removeClass('fancybox-margin');
                r = d.scrollTop();
                s = d.scrollLeft();
                this.el.removeClass('fancybox-lock');
                d.scrollTop(r) .scrollLeft(s)
            }
            i('.fancybox-overlay') .remove() .hide();
            i.extend(this, {
                overlay: null,
                fixed: false
            })
        },
        update: function () {
            var s = '100%',
            r;
            this.overlay.width(s) .height('100%');
            if (k) {
                r = Math.max(o.documentElement.offsetWidth, o.body.offsetWidth);
                if (a.width() > r) {
                    s = a.width()
                }
            } else {
                if (a.width() > d.width()) {
                    s = a.width()
                }
            }
            this.overlay.width(s) .height(a.height())
        },
        onReady: function (s, t) {
            var r = this.overlay;
            i('.fancybox-overlay') .stop(true, true);
            if (!r) {
                this.create(s)
            }
            if (s.locked && this.fixed && t.fixed) {
                if (!r) {
                    this.margin = a.height() > d.height() ? i('html') .css('margin-right') .replace('px', '')  : false
                }
                t.locked = this.overlay.append(t.wrap);
                t.fixed = false
            }
            if (s.showEarly === true) {
                this.beforeShow.apply(this, arguments)
            }
        },
        beforeShow: function (t, u) {
            var r,
            s;
            if (u.locked) {
                if (this.margin !== false) {
                    i('*') .filter(function () {
                        return (i(this) .css('position') === 'fixed' && !i(this) .hasClass('fancybox-overlay') && !i(this) .hasClass('fancybox-wrap'))
                    }) .addClass('fancybox-margin');
                    this.el.addClass('fancybox-margin')
                }
                r = d.scrollTop();
                s = d.scrollLeft();
                this.el.addClass('fancybox-lock');
                d.scrollTop(r) .scrollLeft(s)
            }
            this.open(t)
        },
        onUpdate: function () {
            if (!this.fixed) {
                this.update()
            }
        },
        afterClose: function (r) {
            if (this.overlay && !q.coming) {
                this.overlay.fadeOut(r.speedOut, i.proxy(this.close, this))
            }
        }
    };
    q.helpers.title = {
        defaults: {
            type: 'float',
            position: 'bottom'
        },
        beforeShow: function (s) {
            var u = q.current,
            w = u.title,
            r = s.type,
            v,
            t;
            if (i.isFunction(w)) {
                w = w.call(u.element, u)
            }
            if (!b(w) || i.trim(w) === '') {
                return
            }
            v = i('<div class="fancybox-title fancybox-title-' + r + '-wrap">' + w + '</div>');
            switch (r) {
            case 'inside':
                t = q.skin;
                break;
            case 'outside':
                t = q.wrap;
                break;
            case 'over':
                t = q.inner;
                break;
            default:
                t = q.skin;
                v.appendTo('body');
                if (k) {
                    v.width(v.width())
                }
                v.wrapInner('<span class="child"></span>');
                q.current.margin[2] += Math.abs(n(v.css('margin-bottom')));
                break
            }
            v[(s.position === 'top' ? 'prependTo' : 'appendTo')](t)
        }
    };
    i.fn.fancybox = function (t) {
        var s,
        u = i(this),
        r = this.selector || '',
        v = function (z) {
            var y = i(this) .blur(),
            w = s,
            x,
            A;
            if (!(z.ctrlKey || z.altKey || z.shiftKey || z.metaKey) && !y.is('.fancybox-wrap')) {
                x = t.groupAttr || 'data-fancybox-group';
                A = y.attr(x);
                if (!A) {
                    x = 'rel';
                    A = y.get(0) [x]
                }
                if (A && A !== '' && A !== 'nofollow') {
                    y = r.length ? i(r)  : u;
                    y = y.filter('[' + x + '="' + A + '"]');
                    w = y.index(this)
                }
                t.index = w;
                if (q.open(y, t) !== false) {
                    z.preventDefault()
                }
            }
        };
        t = t || {
        };
        s = t.index || 0;
        if (!r || t.live === false) {
            u.unbind('click.fb-start') .bind('click.fb-start', v)
        } else {
            a.undelegate(r, 'click.fb-start') .delegate(r + ':not(\'.fancybox-item, .fancybox-nav\')', 'click.fb-start', v)
        }
        this.filter('[data-fancybox-start=1]') .trigger('click');
        return this
    };
    a.ready(function () {
        var s,
        r;
        if (i.scrollbarWidth === e) {
            i.scrollbarWidth = function () {
                var u = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>') .appendTo('body'),
                v = u.children(),
                t = v.innerWidth() - v.height(99) .innerWidth();
                u.remove();
                return t
            }
        }
        if (i.support.fixedPosition === e) {
            i.support.fixedPosition = (function () {
                var u = i('<div style="position:fixed;top:20px;"></div>') .appendTo('body'),
                t = (u[0].offsetTop === 20 || u[0].offsetTop === 15);
                u.remove();
                return t
            }())
        }
        i.extend(q.defaults, {
            scrollbarWidth: i.scrollbarWidth(),
            fixed: i.support.fixedPosition,
            parent: i('body')
        });
        s = i(l) .width();
        p.addClass('fancybox-lock-test');
        r = i(l) .width();
        p.removeClass('fancybox-lock-test');
        i('<style type=\'text/css\'>.fancybox-margin{margin-right:' + (r - s) + 'px;}</style>') .appendTo('head')
    })
}(window, document, jQuery));
if (!jQuery) {
    throw new Error('Bootstrap requires jQuery')
}
+ function (b) {
    function a() {
        var e = document.createElement('bootstrap');
        var d = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };
        for (var c in d) {
            if (e.style[c] !== undefined) {
                return {
                    end: d[c]
                }
            }
        }
    }
    b.fn.emulateTransitionEnd = function (e) {
        var d = false,
        c = this;
        b(this) .one(b.support.transition.end, function () {
            d = true
        });
        var f = function () {
            if (!d) {
                b(c) .trigger(b.support.transition.end)
            }
        };
        setTimeout(f, e);
        return this
    };
    b(function () {
        b.support.transition = a()
    })
}(window.jQuery);
+ function (d) {
    var c = '[data-dismiss="alert"]';
    var b = function (e) {
        d(e) .on('click', c, this.close)
    };
    b.prototype.close = function (j) {
        var i = d(this);
        var g = i.attr('data-target');
        if (!g) {
            g = i.attr('href');
            g = g && g.replace(/.*(?=#[^\s]*$)/, '')
        }
        var h = d(g);
        if (j) {
            j.preventDefault()
        }
        if (!h.length) {
            h = i.hasClass('alert') ? i : i.parent()
        }
        h.trigger(j = d.Event('close.bs.alert'));
        if (j.isDefaultPrevented()) {
            return
        }
        h.removeClass('in');
        function f() {
            h.trigger('closed.bs.alert') .remove()
        }
        d.support.transition && h.hasClass('fade') ? h.one(d.support.transition.end, f) .emulateTransitionEnd(150)  : f()
    };
    var a = d.fn.alert;
    d.fn.alert = function (e) {
        return this.each(function () {
            var g = d(this);
            var f = g.data('bs.alert');
            if (!f) {
                g.data('bs.alert', (f = new b(this)))
            }
            if (typeof e == 'string') {
                f[e].call(g)
            }
        })
    };
    d.fn.alert.Constructor = b;
    d.fn.alert.noConflict = function () {
        d.fn.alert = a;
        return this
    };
    d(document) .on('click.bs.alert.data-api', c, b.prototype.close)
}(window.jQuery);
+ function (c) {
    var b = function (e, d) {
        this.$element = c(e);
        this.options = c.extend({
        }, b.DEFAULTS, d)
    };
    b.DEFAULTS = {
        loadingText: 'loading...'
    };
    b.prototype.setState = function (g) {
        var i = 'disabled';
        var e = this.$element;
        var h = e.is('input') ? 'val' : 'html';
        var f = e.data();
        g = g + 'Text';
        if (!f.resetText) {
            e.data('resetText', e[h]())
        }
        e[h](f[g] || this.options[g]);
        setTimeout(function () {
            g == 'loadingText' ? e.addClass(i) .attr(i, i)  : e.removeClass(i) .removeAttr(i)
        }, 0)
    };
    b.prototype.toggle = function () {
        var d = this.$element.closest('[data-toggle="buttons"]');
        if (d.length) {
            var e = this.$element.find('input') .prop('checked', !this.$element.hasClass('active')) .trigger('change');
            if (e.prop('type') === 'radio') {
                d.find('.active') .removeClass('active')
            }
        }
        this.$element.toggleClass('active')
    };
    var a = c.fn.button;
    c.fn.button = function (d) {
        return this.each(function () {
            var g = c(this);
            var f = g.data('bs.button');
            var e = typeof d == 'object' && d;
            if (!f) {
                g.data('bs.button', (f = new b(this, e)))
            }
            if (d == 'toggle') {
                f.toggle()
            } else {
                if (d) {
                    f.setState(d)
                }
            }
        })
    };
    c.fn.button.Constructor = b;
    c.fn.button.noConflict = function () {
        c.fn.button = a;
        return this
    };
    c(document) .on('click.bs.button.data-api', '[data-toggle^=button]', function (f) {
        var d = c(f.target);
        if (!d.hasClass('btn')) {
            d = d.closest('.btn')
        }
        d.button('toggle');
        f.preventDefault()
    })
}(window.jQuery);
+ function (b) {
    var c = function (e, d) {
        this.$element = b(e);
        this.$indicators = this.$element.find('.carousel-indicators');
        this.options = d;
        this.paused = this.sliding = this.interval = this.$active = this.$items = null;
        this.options.pause == 'hover' && this.$element.on('mouseenter', b.proxy(this.pause, this)) .on('mouseleave', b.proxy(this.cycle, this))
    };
    c.DEFAULTS = {
        interval: 5000,
        pause: 'hover',
        wrap: true
    };
    c.prototype.cycle = function (d) {
        d || (this.paused = false);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval(b.proxy(this.next, this), this.options.interval));
        return this
    };
    c.prototype.getActiveIndex = function () {
        this.$active = this.$element.find('.item.active');
        this.$items = this.$active.parent() .children();
        return this.$items.index(this.$active)
    };
    c.prototype.to = function (f) {
        var e = this;
        var d = this.getActiveIndex();
        if (f > (this.$items.length - 1) || f < 0) {
            return
        }
        if (this.sliding) {
            return this.$element.one('slid', function () {
                e.to(f)
            })
        }
        if (d == f) {
            return this.pause() .cycle()
        }
        return this.slide(f > d ? 'next' : 'prev', b(this.$items[f]))
    };
    c.prototype.pause = function (d) {
        d || (this.paused = true);
        if (this.$element.find('.next, .prev') .length && b.support.transition.end) {
            this.$element.trigger(b.support.transition.end);
            this.cycle(true)
        }
        this.interval = clearInterval(this.interval);
        return this
    };
    c.prototype.next = function () {
        if (this.sliding) {
            return
        }
        return this.slide('next')
    };
    c.prototype.prev = function () {
        if (this.sliding) {
            return
        }
        return this.slide('prev')
    };
    c.prototype.slide = function (k, f) {
        var m = this.$element.find('.item.active');
        var d = f || m[k]();
        var j = this.interval;
        var l = k == 'next' ? 'left' : 'right';
        var g = k == 'next' ? 'first' : 'last';
        var h = this;
        if (!d.length) {
            if (!this.options.wrap) {
                return
            }
            d = this.$element.find('.item') [g]()
        }
        this.sliding = true;
        j && this.pause();
        var i = b.Event('slide.bs.carousel', {
            relatedTarget: d[0],
            direction: l
        });
        if (d.hasClass('active')) {
            return
        }
        if (this.$indicators.length) {
            this.$indicators.find('.active') .removeClass('active');
            this.$element.one('slid', function () {
                var e = b(h.$indicators.children() [h.getActiveIndex()]);
                e && e.addClass('active')
            })
        }
        if (b.support.transition && this.$element.hasClass('slide')) {
            this.$element.trigger(i);
            if (i.isDefaultPrevented()) {
                return
            }
            d.addClass(k);
            d[0].offsetWidth;
            m.addClass(l);
            d.addClass(l);
            m.one(b.support.transition.end, function () {
                d.removeClass([k,
                l].join(' ')) .addClass('active');
                m.removeClass(['active',
                l].join(' '));
                h.sliding = false;
                setTimeout(function () {
                    h.$element.trigger('slid')
                }, 0)
            }) .emulateTransitionEnd(600)
        } else {
            this.$element.trigger(i);
            if (i.isDefaultPrevented()) {
                return
            }
            m.removeClass('active');
            d.addClass('active');
            this.sliding = false;
            this.$element.trigger('slid')
        }
        j && this.cycle();
        return this
    };
    var a = b.fn.carousel;
    b.fn.carousel = function (d) {
        return this.each(function () {
            var h = b(this);
            var g = h.data('bs.carousel');
            var e = b.extend({
            }, c.DEFAULTS, h.data(), typeof d == 'object' && d);
            var f = typeof d == 'string' ? d : e.slide;
            if (!g) {
                h.data('bs.carousel', (g = new c(this, e)))
            }
            if (typeof d == 'number') {
                g.to(d)
            } else {
                if (f) {
                    g[f]()
                } else {
                    if (e.interval) {
                        g.pause() .cycle()
                    }
                }
            }
        })
    };
    b.fn.carousel.Constructor = c;
    b.fn.carousel.noConflict = function () {
        b.fn.carousel = a;
        return this
    };
    b(document) .on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (j) {
        var i = b(this),
        f;
        var d = b(i.attr('data-target') || (f = i.attr('href')) && f.replace(/.*(?=#[^\s]+$)/, ''));
        var g = b.extend({
        }, d.data(), i.data());
        var h = i.attr('data-slide-to');
        if (h) {
            g.interval = false
        }
        d.carousel(g);
        if (h = i.attr('data-slide-to')) {
            d.data('bs.carousel') .to(h)
        }
        j.preventDefault()
    });
    b(window) .on('load', function () {
        b('[data-ride="carousel"]') .each(function () {
            var d = b(this);
            d.carousel(d.data())
        })
    })
}(window.jQuery);
+ function (b) {
    var c = function (e, d) {
        this.$element = b(e);
        this.options = b.extend({
        }, c.DEFAULTS, d);
        this.transitioning = null;
        if (this.options.parent) {
            this.$parent = b(this.options.parent)
        }
        if (this.options.toggle) {
            this.toggle()
        }
    };
    c.DEFAULTS = {
        toggle: true
    };
    c.prototype.dimension = function () {
        var d = this.$element.hasClass('width');
        return d ? 'width' : 'height'
    };
    c.prototype.show = function () {
        if (this.transitioning || this.$element.hasClass('in')) {
            return
        }
        var e = b.Event('show.bs.collapse');
        this.$element.trigger(e);
        if (e.isDefaultPrevented()) {
            return
        }
        var h = this.$parent && this.$parent.find('> .panel > .in');
        if (h && h.length) {
            var f = h.data('bs.collapse');
            if (f && f.transitioning) {
                return
            }
            h.collapse('hide');
            f || h.data('bs.collapse', null)
        }
        var i = this.dimension();
        this.$element.removeClass('collapse') .addClass('collapsing') [i](0);
        this.transitioning = 1;
        var d = function () {
            this.$element.removeClass('collapsing') .addClass('in') [i]('auto');
            this.transitioning = 0;
            this.$element.trigger('shown.bs.collapse')
        };
        if (!b.support.transition) {
            return d.call(this)
        }
        var g = b.camelCase(['scroll',
        i].join('-'));
        this.$element.one(b.support.transition.end, b.proxy(d, this)) .emulateTransitionEnd(350) [i](this.$element[0][g])
    };
    c.prototype.hide = function () {
        if (this.transitioning || !this.$element.hasClass('in')) {
            return
        }
        var e = b.Event('hide.bs.collapse');
        this.$element.trigger(e);
        if (e.isDefaultPrevented()) {
            return
        }
        var f = this.dimension();
        this.$element[f](this.$element[f]()) [0].offsetHeight;
        this.$element.addClass('collapsing') .removeClass('collapse') .removeClass('in');
        this.transitioning = 1;
        var d = function () {
            this.transitioning = 0;
            this.$element.trigger('hidden.bs.collapse') .removeClass('collapsing') .addClass('collapse')
        };
        if (!b.support.transition) {
            return d.call(this)
        }
        this.$element[f](0) .one(b.support.transition.end, b.proxy(d, this)) .emulateTransitionEnd(350)
    };
    c.prototype.toggle = function () {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    };
    var a = b.fn.collapse;
    b.fn.collapse = function (d) {
        return this.each(function () {
            var g = b(this);
            var f = g.data('bs.collapse');
            var e = b.extend({
            }, c.DEFAULTS, g.data(), typeof d == 'object' && d);
            if (!f) {
                g.data('bs.collapse', (f = new c(this, e)))
            }
            if (typeof d == 'string') {
                f[d]()
            }
        })
    };
    b.fn.collapse.Constructor = c;
    b.fn.collapse.noConflict = function () {
        b.fn.collapse = a;
        return this
    };
    b(document) .on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (j) {
        var l = b(this),
        d;
        var k = l.attr('data-target') || j.preventDefault() || (d = l.attr('href')) && d.replace(/.*(?=#[^\s]+$)/, '');
        var f = b(k);
        var h = f.data('bs.collapse');
        var i = h ? 'toggle' : l.data();
        var m = l.attr('data-parent');
        var g = m && b(m);
        if (!h || !h.transitioning) {
            if (g) {
                g.find('[data-toggle=collapse][data-parent="' + m + '"]') .not(l) .addClass('collapsed')
            }
            l[f.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
        }
        f.collapse(i)
    })
}(window.jQuery);
+ function (g) {
    var e = '.dropdown-backdrop';
    var b = '[data-toggle=dropdown]';
    var a = function (i) {
        var h = g(i) .on('click.bs.dropdown', this.toggle)
    };
    a.prototype.toggle = function (k) {
        var j = g(this);
        if (j.is('.disabled, :disabled')) {
            return
        }
        var i = f(j);
        var h = i.hasClass('open');
        d();
        if (!h) {
            if ('ontouchstart' in document.documentElement && !i.closest('.navbar-nav') .length) {
                g('<div class="dropdown-backdrop"/>') .insertAfter(g(this)) .on('click', d)
            }
            i.trigger(k = g.Event('show.bs.dropdown'));
            if (k.isDefaultPrevented()) {
                return
            }
            i.toggleClass('open') .trigger('shown.bs.dropdown');
            j.focus()
        }
        return false
    };
    a.prototype.keydown = function (l) {
        if (!/(38|40|27)/.test(l.keyCode)) {
            return
        }
        var k = g(this);
        l.preventDefault();
        l.stopPropagation();
        if (k.is('.disabled, :disabled')) {
            return
        }
        var j = f(k);
        var i = j.hasClass('open');
        if (!i || (i && l.keyCode == 27)) {
            if (l.which == 27) {
                j.find(b) .focus()
            }
            return k.click()
        }
        var m = g('[role=menu] li:not(.divider):visible a', j);
        if (!m.length) {
            return
        }
        var h = m.index(m.filter(':focus'));
        if (l.keyCode == 38 && h > 0) {
            h--
        }
        if (l.keyCode == 40 && h < m.length - 1) {
            h++
        }
        if (!~h) {
            h = 0
        }
        m.eq(h) .focus()
    };
    function d() {
        g(e) .remove();
        g(b) .each(function (i) {
            var h = f(g(this));
            if (!h.hasClass('open')) {
                return
            }
            h.trigger(i = g.Event('hide.bs.dropdown'));
            if (i.isDefaultPrevented()) {
                return
            }
            h.removeClass('open') .trigger('hidden.bs.dropdown')
        })
    }
    function f(j) {
        var h = j.attr('data-target');
        if (!h) {
            h = j.attr('href');
            h = h && /#/.test(h) && h.replace(/.*(?=#[^\s]*$)/, '')
        }
        var i = h && g(h);
        return i && i.length ? i : j.parent()
    }
    var c = g.fn.dropdown;
    g.fn.dropdown = function (h) {
        return this.each(function () {
            var j = g(this);
            var i = j.data('dropdown');
            if (!i) {
                j.data('dropdown', (i = new a(this)))
            }
            if (typeof h == 'string') {
                i[h].call(j)
            }
        })
    };
    g.fn.dropdown.Constructor = a;
    g.fn.dropdown.noConflict = function () {
        g.fn.dropdown = c;
        return this
    };
    g(document) .on('click.bs.dropdown.data-api', d) .on('click.bs.dropdown.data-api', '.dropdown form', function (h) {
        h.stopPropagation()
    }) .on('click.bs.dropdown.data-api', b, a.prototype.toggle) .on('keydown.bs.dropdown.data-api', b + ', [role=menu]', a.prototype.keydown)
}(window.jQuery);
+ function (c) {
    var b = function (e, d) {
        this.options = d;
        this.$element = c(e);
        this.$backdrop = this.isShown = null;
        if (this.options.remote) {
            this.$element.load(this.options.remote)
        }
    };
    b.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    };
    b.prototype.toggle = function (d) {
        return this[!this.isShown ? 'show' : 'hide'](d)
    };
    b.prototype.show = function (g) {
        var d = this;
        var f = c.Event('show.bs.modal', {
            relatedTarget: g
        });
        this.$element.trigger(f);
        if (this.isShown || f.isDefaultPrevented()) {
            return
        }
        this.isShown = true;
        this.escape();
        this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', c.proxy(this.hide, this));
        this.backdrop(function () {
            var i = c.support.transition && d.$element.hasClass('fade');
            if (!d.$element.parent() .length) {
                d.$element.appendTo(document.body)
            }
            d.$element.show();
            if (i) {
                d.$element[0].offsetWidth
            }
            d.$element.addClass('in') .attr('aria-hidden', false);
            d.enforceFocus();
            var h = c.Event('shown.bs.modal', {
                relatedTarget: g
            });
            i ? d.$element.find('.modal-dialog') .one(c.support.transition.end, function () {
                d.$element.focus() .trigger(h)
            }) .emulateTransitionEnd(300)  : d.$element.focus() .trigger(h)
        })
    };
    b.prototype.hide = function (d) {
        if (d) {
            d.preventDefault()
        }
        d = c.Event('hide.bs.modal');
        this.$element.trigger(d);
        if (!this.isShown || d.isDefaultPrevented()) {
            return
        }
        this.isShown = false;
        this.escape();
        c(document) .off('focusin.bs.modal');
        this.$element.removeClass('in') .attr('aria-hidden', true) .off('click.dismiss.modal');
        c.support.transition && this.$element.hasClass('fade') ? this.$element.one(c.support.transition.end, c.proxy(this.hideModal, this)) .emulateTransitionEnd(300)  : this.hideModal()
    };
    b.prototype.enforceFocus = function () {
        c(document) .off('focusin.bs.modal') .on('focusin.bs.modal', c.proxy(function (d) {
            if (this.$element[0] !== d.target && !this.$element.has(d.target) .length) {
                this.$element.focus()
            }
        }, this))
    };
    b.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keyup.dismiss.bs.modal', c.proxy(function (d) {
                d.which == 27 && this.hide()
            }, this))
        } else {
            if (!this.isShown) {
                this.$element.off('keyup.dismiss.bs.modal')
            }
        }
    };
    b.prototype.hideModal = function () {
        var d = this;
        this.$element.hide();
        this.backdrop(function () {
            d.removeBackdrop();
            d.$element.trigger('hidden.bs.modal')
        })
    };
    b.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    };
    b.prototype.backdrop = function (g) {
        var f = this;
        var e = this.$element.hasClass('fade') ? 'fade' : '';
        if (this.isShown && this.options.backdrop) {
            var d = c.support.transition && e;
            this.$backdrop = c('<div class="modal-backdrop ' + e + '" />') .appendTo(document.body);
            this.$element.on('click.dismiss.modal', c.proxy(function (h) {
                if (h.target !== h.currentTarget) {
                    return
                }
                this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0])  : this.hide.call(this)
            }, this));
            if (d) {
                this.$backdrop[0].offsetWidth
            }
            this.$backdrop.addClass('in');
            if (!g) {
                return
            }
            d ? this.$backdrop.one(c.support.transition.end, g) .emulateTransitionEnd(150)  : g()
        } else {
            if (!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass('in');
                c.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one(c.support.transition.end, g) .emulateTransitionEnd(150)  : g()
            } else {
                if (g) {
                    g()
                }
            }
        }
    };
    var a = c.fn.modal;
    c.fn.modal = function (d, e) {
        return this.each(function () {
            var h = c(this);
            var g = h.data('bs.modal');
            var f = c.extend({
            }, b.DEFAULTS, h.data(), typeof d == 'object' && d);
            if (!g) {
                h.data('bs.modal', (g = new b(this, f)))
            }
            if (typeof d == 'string') {
                g[d](e)
            } else {
                if (f.show) {
                    g.show(e)
                }
            }
        })
    };
    c.fn.modal.Constructor = b;
    c.fn.modal.noConflict = function () {
        c.fn.modal = a;
        return this
    };
    c(document) .on('click.bs.modal.data-api', '[data-toggle="modal"]', function (i) {
        var h = c(this);
        var f = h.attr('href');
        var d = c(h.attr('data-target') || (f && f.replace(/.*(?=#[^\s]+$)/, '')));
        var g = d.data('modal') ? 'toggle' : c.extend({
            remote: !/#/.test(f) && f
        }, d.data(), h.data());
        i.preventDefault();
        d.modal(g, this) .one('hide', function () {
            h.is(':visible') && h.focus()
        })
    });
    c(document) .on('show.bs.modal', '.modal', function () {
        c(document.body) .addClass('modal-open')
    }) .on('hidden.bs.modal', '.modal', function () {
        c(document.body) .removeClass('modal-open')
    })
}(window.jQuery);
+ function (c) {
    var b = function (e, d) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
        this.init('tooltip', e, d)
    };
    b.DEFAULTS = {
        animation: true,
        placement: 'top',
        selector: false,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        container: false
    };
    b.prototype.init = function (k, h, f) {
        this.enabled = true;
        this.type = k;
        this.$element = c(h);
        this.options = this.getOptions(f);
        var j = this.options.trigger.split(' ');
        for (var g = j.length; g--; ) {
            var e = j[g];
            if (e == 'click') {
                this.$element.on('click.' + this.type, this.options.selector, c.proxy(this.toggle, this))
            } else {
                if (e != 'manual') {
                    var l = e == 'hover' ? 'mouseenter' : 'focus';
                    var d = e == 'hover' ? 'mouseleave' : 'blur';
                    this.$element.on(l + '.' + this.type, this.options.selector, c.proxy(this.enter, this));
                    this.$element.on(d + '.' + this.type, this.options.selector, c.proxy(this.leave, this))
                }
            }
        }
        this.options.selector ? (this._options = c.extend({
        }, this.options, {
            trigger: 'manual',
            selector: ''
        }))  : this.fixTitle()
    };
    b.prototype.getDefaults = function () {
        return b.DEFAULTS
    };
    b.prototype.getOptions = function (d) {
        d = c.extend({
        }, this.getDefaults(), this.$element.data(), d);
        if (d.delay && typeof d.delay == 'number') {
            d.delay = {
                show: d.delay,
                hide: d.delay
            }
        }
        return d
    };
    b.prototype.getDelegateOptions = function () {
        var d = {
        };
        var e = this.getDefaults();
        this._options && c.each(this._options, function (f, g) {
            if (e[f] != g) {
                d[f] = g
            }
        });
        return d
    };
    b.prototype.enter = function (e) {
        var d = e instanceof this.constructor ? e : c(e.currentTarget) [this.type](this.getDelegateOptions()) .data('bs.' + this.type);
        clearTimeout(d.timeout);
        d.hoverState = 'in';
        if (!d.options.delay || !d.options.delay.show) {
            return d.show()
        }
        d.timeout = setTimeout(function () {
            if (d.hoverState == 'in') {
                d.show()
            }
        }, d.options.delay.show)
    };
    b.prototype.leave = function (e) {
        var d = e instanceof this.constructor ? e : c(e.currentTarget) [this.type](this.getDelegateOptions()) .data('bs.' + this.type);
        clearTimeout(d.timeout);
        d.hoverState = 'out';
        if (!d.options.delay || !d.options.delay.hide) {
            return d.hide()
        }
        d.timeout = setTimeout(function () {
            if (d.hoverState == 'out') {
                d.hide()
            }
        }, d.options.delay.hide)
    };
    b.prototype.show = function () {
        var n = c.Event('show.bs.' + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(n);
            if (n.isDefaultPrevented()) {
                return
            }
            var j = this.tip();
            this.setContent();
            if (this.options.animation) {
                j.addClass('fade')
            }
            var i = typeof this.options.placement == 'function' ? this.options.placement.call(this, j[0], this.$element[0])  : this.options.placement;
            var r = /\s?auto?\s?/i;
            var s = r.test(i);
            if (s) {
                i = i.replace(r, '') || 'top'
            }
            j.detach() .css({
                top: 0,
                left: 0,
                display: 'block'
            }) .addClass(i);
            this.options.container ? j.appendTo(this.options.container)  : j.insertAfter(this.$element);
            var o = this.getPosition();
            var d = j[0].offsetWidth;
            var l = j[0].offsetHeight;
            if (s) {
                var h = this.$element.parent();
                var g = i;
                var p = document.documentElement.scrollTop || document.body.scrollTop;
                var q = this.options.container == 'body' ? window.innerWidth : h.outerWidth();
                var m = this.options.container == 'body' ? window.innerHeight : h.outerHeight();
                var k = this.options.container == 'body' ? 0 : h.offset() .left;
                i = i == 'bottom' && o.top + o.height + l - p > m ? 'top' : i == 'top' && o.top - p - l < 0 ? 'bottom' : i == 'right' && o.right + d > q ? 'left' : i == 'left' && o.left - d < k ? 'right' : i;
                j.removeClass(g) .addClass(i)
            }
            var f = this.getCalculatedOffset(i, o, d, l);
            this.applyPlacement(f, i);
            this.$element.trigger('shown.bs.' + this.type)
        }
    };
    b.prototype.applyPlacement = function (i, j) {
        var g;
        var k = this.tip();
        var f = k[0].offsetWidth;
        var n = k[0].offsetHeight;
        var e = parseInt(k.css('margin-top'), 10);
        var h = parseInt(k.css('margin-left'), 10);
        if (isNaN(e)) {
            e = 0
        }
        if (isNaN(h)) {
            h = 0
        }
        i.top = i.top + e;
        i.left = i.left + h;
        k.offset(i) .addClass('in');
        var d = k[0].offsetWidth;
        var l = k[0].offsetHeight;
        if (j == 'top' && l != n) {
            g = true;
            i.top = i.top + n - l
        }
        if (/bottom|top/.test(j)) {
            var m = 0;
            if (i.left < 0) {
                m = i.left * - 2;
                i.left = 0;
                k.offset(i);
                d = k[0].offsetWidth;
                l = k[0].offsetHeight
            }
            this.replaceArrow(m - f + d, d, 'left')
        } else {
            this.replaceArrow(l - n, l, 'top')
        }
        if (g) {
            k.offset(i)
        }
    };
    b.prototype.replaceArrow = function (f, e, d) {
        this.arrow() .css(d, f ? (50 * (1 - f / e) + '%')  : '')
    };
    b.prototype.setContent = function () {
        var e = this.tip();
        var d = this.getTitle();
        e.find('.tooltip-inner') [this.options.html ? 'html' : 'text'](d);
        e.removeClass('fade in top bottom left right')
    };
    b.prototype.hide = function () {
        var f = this;
        var h = this.tip();
        var g = c.Event('hide.bs.' + this.type);
        function d() {
            if (f.hoverState != 'in') {
                h.detach()
            }
        }
        this.$element.trigger(g);
        if (g.isDefaultPrevented()) {
            return
        }
        h.removeClass('in');
        c.support.transition && this.$tip.hasClass('fade') ? h.one(c.support.transition.end, d) .emulateTransitionEnd(150)  : d();
        this.$element.trigger('hidden.bs.' + this.type);
        return this
    };
    b.prototype.fixTitle = function () {
        var d = this.$element;
        if (d.attr('title') || typeof (d.attr('data-original-title')) != 'string') {
            d.attr('data-original-title', d.attr('title') || '') .attr('title', '')
        }
    };
    b.prototype.hasContent = function () {
        return this.getTitle()
    };
    b.prototype.getPosition = function () {
        var d = this.$element[0];
        return c.extend({
        }, (typeof d.getBoundingClientRect == 'function') ? d.getBoundingClientRect()  : {
            width: d.offsetWidth,
            height: d.offsetHeight
        }, this.$element.offset())
    };
    b.prototype.getCalculatedOffset = function (d, g, e, f) {
        return d == 'bottom' ? {
            top: g.top + g.height,
            left: g.left + g.width / 2 - e / 2
        }
         : d == 'top' ? {
            top: g.top - f,
            left: g.left + g.width / 2 - e / 2
        }
         : d == 'left' ? {
            top: g.top + g.height / 2 - f / 2,
            left: g.left - e
        }
         : {
            top: g.top + g.height / 2 - f / 2,
            left: g.left + g.width
        }
    };
    b.prototype.getTitle = function () {
        var f;
        var d = this.$element;
        var e = this.options;
        f = d.attr('data-original-title') || (typeof e.title == 'function' ? e.title.call(d[0])  : e.title);
        return f
    };
    b.prototype.tip = function () {
        return this.$tip = this.$tip || c(this.options.template)
    };
    b.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip() .find('.tooltip-arrow')
    };
    b.prototype.validate = function () {
        if (!this.$element[0].parentNode) {
            this.hide();
            this.$element = null;
            this.options = null
        }
    };
    b.prototype.enable = function () {
        this.enabled = true
    };
    b.prototype.disable = function () {
        this.enabled = false
    };
    b.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    };
    b.prototype.toggle = function (f) {
        var d = f ? c(f.currentTarget) [this.type](this.getDelegateOptions()) .data('bs.' + this.type)  : this;
        d.tip() .hasClass('in') ? d.leave(d)  : d.enter(d)
    };
    b.prototype.destroy = function () {
        this.hide() .$element.off('.' + this.type) .removeData('bs.' + this.type)
    };
    var a = c.fn.tooltip;
    c.fn.tooltip = function (d) {
        return this.each(function () {
            var g = c(this);
            var f = g.data('bs.tooltip');
            var e = typeof d == 'object' && d;
            if (!f) {
                g.data('bs.tooltip', (f = new b(this, e)))
            }
            if (typeof d == 'string') {
                f[d]()
            }
        })
    };
    c.fn.tooltip.Constructor = b;
    c.fn.tooltip.noConflict = function () {
        c.fn.tooltip = a;
        return this
    }
}(window.jQuery);
+ function (c) {
    var b = function (e, d) {
        this.init('popover', e, d)
    };
    if (!c.fn.tooltip) {
        throw new Error('Popover requires tooltip.js')
    }
    b.DEFAULTS = c.extend({
    }, c.fn.tooltip.Constructor.DEFAULTS, {
        placement: 'right',
        trigger: 'click',
        content: '',
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    b.prototype = c.extend({
    }, c.fn.tooltip.Constructor.prototype);
    b.prototype.constructor = b;
    b.prototype.getDefaults = function () {
        return b.DEFAULTS
    };
    b.prototype.setContent = function () {
        var f = this.tip();
        var e = this.getTitle();
        var d = this.getContent();
        f.find('.popover-title') [this.options.html ? 'html' : 'text'](e);
        f.find('.popover-content') [this.options.html ? 'html' : 'text'](d);
        f.removeClass('fade top bottom left right in');
        if (!f.find('.popover-title') .html()) {
            f.find('.popover-title') .hide()
        }
    };
    b.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    };
    b.prototype.getContent = function () {
        var d = this.$element;
        var e = this.options;
        return d.attr('data-content') || (typeof e.content == 'function' ? e.content.call(d[0])  : e.content)
    };
    b.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip() .find('.arrow')
    };
    b.prototype.tip = function () {
        if (!this.$tip) {
            this.$tip = c(this.options.template)
        }
        return this.$tip
    };
    var a = c.fn.popover;
    c.fn.popover = function (d) {
        return this.each(function () {
            var g = c(this);
            var f = g.data('bs.popover');
            var e = typeof d == 'object' && d;
            if (!f) {
                g.data('bs.popover', (f = new b(this, e)))
            }
            if (typeof d == 'string') {
                f[d]()
            }
        })
    };
    c.fn.popover.Constructor = b;
    c.fn.popover.noConflict = function () {
        c.fn.popover = a;
        return this
    }
}(window.jQuery);
+ function (c) {
    function b(f, e) {
        var d;
        var g = c.proxy(this.process, this);
        this.$element = c(f) .is('body') ? c(window)  : c(f);
        this.$body = c('body');
        this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', g);
        this.options = c.extend({
        }, b.DEFAULTS, e);
        this.selector = (this.options.target || ((d = c(f) .attr('href')) && d.replace(/.*(?=#[^\s]+$)/, '')) || '') + ' .nav li > a';
        this.offsets = c([]);
        this.targets = c([]);
        this.activeTarget = null;
        this.refresh();
        this.process()
    }
    b.DEFAULTS = {
        offset: 10
    };
    b.prototype.refresh = function () {
        var d = this.$element[0] == window ? 'offset' : 'position';
        this.offsets = c([]);
        this.targets = c([]);
        var e = this;
        var f = this.$body.find(this.selector) .map(function () {
            var h = c(this);
            var g = h.data('target') || h.attr('href');
            var i = /^#\w/.test(g) && c(g);
            return (i && i.length && [[i[d]() .top + (!c.isWindow(e.$scrollElement.get(0)) && e.$scrollElement.scrollTop()),
            g]]) || null
        }) .sort(function (h, g) {
            return h[0] - g[0]
        }) .each(function () {
            e.offsets.push(this[0]);
            e.targets.push(this[1])
        })
    };
    b.prototype.process = function () {
        var j = this.$scrollElement.scrollTop() + this.options.offset;
        var f = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight;
        var h = f - this.$scrollElement.height();
        var g = this.offsets;
        var d = this.targets;
        var k = this.activeTarget;
        var e;
        if (j >= h) {
            return k != (e = d.last() [0]) && this.activate(e)
        }
        for (e = g.length; e--; ) {
            k != d[e] && j >= g[e] && (!g[e + 1] || j <= g[e + 1]) && this.activate(d[e])
        }
    };
    b.prototype.activate = function (f) {
        this.activeTarget = f;
        c(this.selector) .parents('.active') .removeClass('active');
        var d = this.selector + '[data-target="' + f + '"],' + this.selector + '[href="' + f + '"]';
        var e = c(d) .parents('li') .addClass('active');
        if (e.parent('.dropdown-menu') .length) {
            e = e.closest('li.dropdown') .addClass('active')
        }
        e.trigger('activate')
    };
    var a = c.fn.scrollspy;
    c.fn.scrollspy = function (d) {
        return this.each(function () {
            var g = c(this);
            var f = g.data('bs.scrollspy');
            var e = typeof d == 'object' && d;
            if (!f) {
                g.data('bs.scrollspy', (f = new b(this, e)))
            }
            if (typeof d == 'string') {
                f[d]()
            }
        })
    };
    c.fn.scrollspy.Constructor = b;
    c.fn.scrollspy.noConflict = function () {
        c.fn.scrollspy = a;
        return this
    };
    c(window) .on('load', function () {
        c('[data-spy="scroll"]') .each(function () {
            var d = c(this);
            d.scrollspy(d.data())
        })
    })
}(window.jQuery);
+ function (c) {
    var b = function (d) {
        this.element = c(d)
    };
    b.prototype.show = function () {
        var j = this.element;
        var g = j.closest('ul:not(.dropdown-menu)');
        var f = j.attr('data-target');
        if (!f) {
            f = j.attr('href');
            f = f && f.replace(/.*(?=#[^\s]*$)/, '')
        }
        if (j.parent('li') .hasClass('active')) {
            return
        }
        var h = g.find('.active:last a') [0];
        var i = c.Event('show.bs.tab', {
            relatedTarget: h
        });
        j.trigger(i);
        if (i.isDefaultPrevented()) {
            return
        }
        var d = c(f);
        this.activate(j.parent('li'), g);
        this.activate(d, d.parent(), function () {
            j.trigger({
                type: 'shown.bs.tab',
                relatedTarget: h
            })
        })
    };
    b.prototype.activate = function (f, e, i) {
        var d = e.find('> .active');
        var h = i && c.support.transition && d.hasClass('fade');
        function g() {
            d.removeClass('active') .find('> .dropdown-menu > .active') .removeClass('active');
            f.addClass('active');
            if (h) {
                f[0].offsetWidth;
                f.addClass('in')
            } else {
                f.removeClass('fade')
            }
            if (f.parent('.dropdown-menu')) {
                f.closest('li.dropdown') .addClass('active')
            }
            i && i()
        }
        h ? d.one(c.support.transition.end, g) .emulateTransitionEnd(150)  : g();
        d.removeClass('in')
    };
    var a = c.fn.tab;
    c.fn.tab = function (d) {
        return this.each(function () {
            var f = c(this);
            var e = f.data('bs.tab');
            if (!e) {
                f.data('bs.tab', (e = new b(this)))
            }
            if (typeof d == 'string') {
                e[d]()
            }
        })
    };
    c.fn.tab.Constructor = b;
    c.fn.tab.noConflict = function () {
        c.fn.tab = a;
        return this
    };
    c(document) .on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (d) {
        d.preventDefault();
        c(this) .tab('show')
    })
}(window.jQuery);
+ function (c) {
    var b = function (e, d) {
        this.options = c.extend({
        }, b.DEFAULTS, d);
        this.$window = c(window) .on('scroll.bs.affix.data-api', c.proxy(this.checkPosition, this)) .on('click.bs.affix.data-api', c.proxy(this.checkPositionWithEventLoop, this));
        this.$element = c(e);
        this.affixed = this.unpin = null;
        this.checkPosition()
    };
    b.RESET = 'affix affix-top affix-bottom';
    b.DEFAULTS = {
        offset: 0
    };
    b.prototype.checkPositionWithEventLoop = function () {
        setTimeout(c.proxy(this.checkPosition, this), 1)
    };
    b.prototype.checkPosition = function () {
        if (!this.$element.is(':visible')) {
            return
        }
        var h = c(document) .height();
        var i = this.$window.scrollTop();
        var d = this.$element.offset();
        var j = this.options.offset;
        var g = j.top;
        var f = j.bottom;
        if (typeof j != 'object') {
            f = g = j
        }
        if (typeof g == 'function') {
            g = j.top()
        }
        if (typeof f == 'function') {
            f = j.bottom()
        }
        var e = this.unpin != null && (i + this.unpin <= d.top) ? false : f != null && (d.top + this.$element.height() >= h - f) ? 'bottom' : g != null && (i <= g) ? 'top' : false;
        if (this.affixed === e) {
            return
        }
        if (this.unpin) {
            this.$element.css('top', '')
        }
        this.affixed = e;
        this.unpin = e == 'bottom' ? d.top - i : null;
        this.$element.removeClass(b.RESET) .addClass('affix' + (e ? '-' + e : ''));
        if (e == 'bottom') {
            this.$element.offset({
                top: document.body.offsetHeight - f - this.$element.height()
            })
        }
    };
    var a = c.fn.affix;
    c.fn.affix = function (d) {
        return this.each(function () {
            var g = c(this);
            var f = g.data('bs.affix');
            var e = typeof d == 'object' && d;
            if (!f) {
                g.data('bs.affix', (f = new b(this, e)))
            }
            if (typeof d == 'string') {
                f[d]()
            }
        })
    };
    c.fn.affix.Constructor = b;
    c.fn.affix.noConflict = function () {
        c.fn.affix = a;
        return this
    };
    c(window) .on('load', function () {
        c('[data-spy="affix"]') .each(function () {
            var e = c(this);
            var d = e.data();
            d.offset = d.offset || {
            };
            if (d.offsetBottom) {
                d.offset.bottom = d.offsetBottom
            }
            if (d.offsetTop) {
                d.offset.top = d.offsetTop
            }
            e.affix(d)
        })
    })
}(window.jQuery);
$(document) .ready(function () {
    $('a.fb') .fancybox();
    $('a#single_image') .fancybox();
    $('a#inline') .fancybox({
        zoomSpeedIn: 300,
        zoomSpeedOut: 300,
        hideOnContentClick: true
    });
    $('a.group') .fancybox({
        zoomSpeedIn: 300,
        zoomSpeedOut: 300,
        overlayShow: true
    });
    $('a.iframe') .fancybox({
        width: '75%',
        height: '75%',
        autoScale: true,
        transitionIn: 'fade',
        transitionOut: 'fade',
        type: 'iframe',
        hideOnContentClick: false
    });
    $('#message') .animate({
        opacity: 1
    }, 8000) .animate({
        opacity: 'hide'
    }, 'slow');
    $('#umenu') .click(function () {
        $('#menu-login') .slideToggle('fast');
        $('#menu-search') .hide();
        $('#smenu') .removeClass('selected');
        $(this) .toggleClass('selected');
        $('html, body') .animate({
            scrollTop: 0
        }, 'fast');
        return false
    });
    $('#smenu') .click(function () {
        $('#menu-search') .slideToggle('fast');
        $('#menu-login') .hide();
        $('#umenu') .removeClass('selected');
        $(this) .toggleClass('selected');
        $('html, body') .animate({
            scrollTop: 0
        }, 'fast');
        return false
    });
    $('#metalink') .click(function () {
        $('#metapanel') .toggleClass('hidden-xs');
        return false
    });
    $('a#tag-list') .click(function () {
        $('a.tagadelic') .addClass('list');
        $(this) .addClass('selected');
        $('a#tag-cloud') .removeClass('selected')
    });
    $('a#tag-cloud') .click(function () {
        $('a.tagadelic') .removeClass('list');
        $(this) .addClass('selected');
        $('a#tag-list') .removeClass('selected')
    });
    $('a#view-list') .click(function () {
        $('li') .addClass('list');
        $(this) .addClass('selected');
        $('a#view-thumb') .removeClass('selected')
    });
    $('a#tag-cloud') .click(function () {
        $('li') .removeClass('list');
        $(this) .addClass('selected');
        $('a#tag-list') .removeClass('selected')
    });
    $('.toggle') .click(function () {
        $(this) .parent() .next('div.toggle-content') .slideToggle();
        $(this) .hide()
    });
    $('.togglenormal') .click(function () {
        $(this) .parent() .next('div.toggle-content') .slideToggle()
    });
    $('#agreeLicense') .click(function () {
        $(this) .parent() .next('div.toggle-content') .show();
        $(this) .hide()
    });
    $('textarea.selectall') .click(function () {
        $(this) .select()
    });
    $('#filterlist tbody tr') .addClass('hidden');
    $('#filterlist tbody tr.ux') .removeClass('hidden');
    $('ul#filter a') .click(function () {
        $(this) .css('outline', 'none');
        $('ul#filter .current') .removeClass('current');
        $(this) .parent() .addClass('current');
        var a = $(this) .text() .toLowerCase() .replace(' ', '-');
        if (a == 'all') {
            $('#filterlist tbody tr.hidden') .removeClass('hidden')
        } else {
            $('#filterlist tbody tr') .each(function () {
                if (!$(this) .hasClass(a)) {
                    $(this) .addClass('hidden')
                } else {
                    $(this) .removeClass('hidden')
                }
            })
        }
        return false
    });
    $('#header-affix') .affix({
        offset: {
            top: 0
        }
    });
    $('[data-clampedwidth]') .each(function () {
        var b = $(this);
        var a = b.data('clampedwidth');
        var c = function () {
            var d = $(a) .width() - parseInt(b.css('paddingLeft')) - parseInt(b.css('paddingRight')) - parseInt(b.css('marginLeft')) - parseInt(b.css('marginRight')) - parseInt(b.css('borderLeftWidth')) - parseInt(b.css('borderRightWidth'));
            b.css('width', d)
        };
        c();
        $(window) .resize(c)
    });
    (function () {
        $.fn.extend({
            showMe: $.fn.addClass
        });
        var b = 0;
        var d = '';
        var c = '38,38,40,40,37,39,37,39,66,65';
        $(window) .keydown(function (a) {
            d += ',' + a.keyCode;
            if (d.indexOf(c) >= 0 && b <= 1) {
                b += 1;
                if (b == 1) {
                    $('#wrapper') .showMe('unicorns');
                    $('body') .showMe('unibg');
                    d = ''
                } else {
                    $('#wrapper') .showMe('evil')
                }
            }
        })
    }) ()
});

//-- Google Analytics Urchin Module
//-- Copyright 2007 Google, All Rights Reserved.

//-- Urchin On Demand Settings ONLY
var _uacct="";			// set up the Urchin Account
var _userv=1;			// service mode (0=local,1=remote,2=both)

//-- UTM User Settings
var _ufsc=1;			// set client info flag (1=on|0=off)
var _udn="auto";		// (auto|none|domain) set the domain name for cookies
var _uhash="on";		// (on|off) unique domain hash for cookies
var _utimeout="1800";   	// set the inactive session timeout in seconds
var _ugifpath="/__utm.gif";	// set the web path to the __utm.gif file
var _utsp="|";			// transaction field separator
var _uflash=1;			// set flash version detect option (1=on|0=off)
var _utitle=1;			// set the document title detect option (1=on|0=off)
var _ulink=0;			// enable linker functionality (1=on|0=off)
var _uanchor=0;			// enable use of anchors for campaign (1=on|0=off)
var _utcp="/";			// the cookie path for tracking
var _usample=100;		// The sampling % of visitors to track (1-100).

//-- UTM Campaign Tracking Settings
var _uctm=1;			// set campaign tracking module (1=on|0=off)
var _ucto="15768000";		// set timeout in seconds (6 month default)
var _uccn="utm_campaign";	// name
var _ucmd="utm_medium";		// medium (cpc|cpm|link|email|organic)
var _ucsr="utm_source";		// source
var _uctr="utm_term";		// term/keyword
var _ucct="utm_content";	// content
var _ucid="utm_id";		// id number
var _ucno="utm_nooverride";	// don't override

//-- Auto/Organic Sources and Keywords
var _uOsr=new Array();
var _uOkw=new Array();
_uOsr[0]="google";	_uOkw[0]="q";
_uOsr[1]="yahoo";	_uOkw[1]="p";
_uOsr[2]="msn";		_uOkw[2]="q";
_uOsr[3]="aol";		_uOkw[3]="query";
_uOsr[4]="aol";		_uOkw[4]="encquery";
_uOsr[5]="lycos";	_uOkw[5]="query";
_uOsr[6]="ask";		_uOkw[6]="q";
_uOsr[7]="altavista";	_uOkw[7]="q";
_uOsr[8]="netscape";	_uOkw[8]="query";
_uOsr[9]="cnn";	_uOkw[9]="query";
_uOsr[10]="looksmart";	_uOkw[10]="qt";
_uOsr[11]="about";	_uOkw[11]="terms";
_uOsr[12]="mamma";	_uOkw[12]="query";
_uOsr[13]="alltheweb";	_uOkw[13]="q";
_uOsr[14]="gigablast";	_uOkw[14]="q";
_uOsr[15]="voila";	_uOkw[15]="rdata";
_uOsr[16]="virgilio";	_uOkw[16]="qs";
_uOsr[17]="live";	_uOkw[17]="q";
_uOsr[18]="baidu";	_uOkw[18]="wd";
_uOsr[19]="alice";	_uOkw[19]="qs";
_uOsr[20]="yandex";	_uOkw[20]="text";
_uOsr[21]="najdi";	_uOkw[21]="q";
_uOsr[22]="aol";	_uOkw[22]="q";
_uOsr[23]="club-internet"; _uOkw[23]="query";
_uOsr[24]="mama";	_uOkw[24]="query";
_uOsr[25]="seznam";	_uOkw[25]="q";
_uOsr[26]="search";	_uOkw[26]="q";
_uOsr[27]="wp";	_uOkw[27]="szukaj";
_uOsr[28]="onet";	_uOkw[28]="qt";
_uOsr[29]="netsprint";	_uOkw[29]="q";
_uOsr[30]="google.interia";	_uOkw[30]="q";
_uOsr[31]="szukacz";	_uOkw[31]="q";
_uOsr[32]="yam";	_uOkw[32]="k";
_uOsr[33]="pchome";	_uOkw[33]="q";
_uOsr[34]="kvasir";	_uOkw[34]="searchExpr";
_uOsr[35]="sesam";	_uOkw[35]="q";
_uOsr[36]="ozu"; _uOkw[36]="q";
_uOsr[37]="terra"; _uOkw[37]="query";
_uOsr[38]="nostrum"; _uOkw[38]="query";
_uOsr[39]="mynet"; _uOkw[39]="q";
_uOsr[40]="ekolay"; _uOkw[40]="q";
_uOsr[41]="search.ilse"; _uOkw[41]="search_for";
_uOsr[42]="bing"; _uOkw[42]="q";

//-- Auto/Organic Keywords to Ignore
var _uOno=new Array();
//_uOno[0]="urchin";
//_uOno[1]="urchin.com";
//_uOno[2]="www.urchin.com";

//-- Referral domains to Ignore
var _uRno=new Array();
//_uRno[0]=".urchin.com";

//-- **** Don't modify below this point ***
var _uff,_udh,_udt,_ubl=0,_udo="",_uu,_ufns=0,_uns=0,_ur="-",_ufno=0,_ust=0,_ubd=document,_udl=_ubd.location,_udlh="",_uwv="1.4";
var _ugifpath2="http://www.google-analytics.com/__utm.gif";
if (_udl.hash) _udlh=_udl.href.substring(_udl.href.indexOf('#'));
if (_udl.protocol=="https:") _ugifpath2="https://ssl.google-analytics.com/__utm.gif";
if (!_utcp || _utcp=="") _utcp="/";
function urchinTracker(page) {
 if (_udl.protocol=="file:") return;
 if (_uff && (!page || page=="")) return;
 var a,b,c,xx,v,z,k,x="",s="",f=0,nv=0;
 var nx=" expires="+_uNx()+";";
 var dc=_ubd.cookie;
 _udh=_uDomain();
 if (!_uVG()) return;
 _uu=Math.round(Math.random()*2147483647);
 _udt=new Date();
 _ust=Math.round(_udt.getTime()/1000);
 a=dc.indexOf("__utma="+_udh+".");
 b=dc.indexOf("__utmb="+_udh);
 c=dc.indexOf("__utmc="+_udh);
 if (_udn && _udn!="") { _udo=" domain="+_udn+";"; }
 if (_utimeout && _utimeout!="") {
  x=new Date(_udt.getTime()+(_utimeout*1000));
  x=" expires="+x.toGMTString()+";";
 }
 if (_ulink) {
  if (_uanchor && _udlh && _udlh!="") s=_udlh+"&";
  s+=_udl.search;
  if(s && s!="" && s.indexOf("__utma=")>=0) {
   if (!(_uIN(a=_uGC(s,"__utma=","&")))) a="-";
   if (!(_uIN(b=_uGC(s,"__utmb=","&")))) b="-";
   if (!(_uIN(c=_uGC(s,"__utmc=","&")))) c="-";
   v=_uGC(s,"__utmv=","&");
   z=_uGC(s,"__utmz=","&");
   k=_uGC(s,"__utmk=","&");
   xx=_uGC(s,"__utmx=","&");
   if ((k*1) != ((_uHash(a+b+c+xx+z+v)*1)+(_udh*1))) {_ubl=1;a="-";b="-";c="-";xx="-";z="-";v="-";}
   if (a!="-" && b!="-" && c!="-") f=1;
   else if(a!="-") f=2;
  }
 }
 if(f==1) {
  _ubd.cookie="__utma="+a+"; path="+_utcp+";"+nx+_udo;
  _ubd.cookie="__utmb="+b+"; path="+_utcp+";"+x+_udo;
  _ubd.cookie="__utmc="+c+"; path="+_utcp+";"+_udo;
 } else if (f==2) {
  a=_uFixA(s,"&",_ust);
  _ubd.cookie="__utma="+a+"; path="+_utcp+";"+nx+_udo;
  _ubd.cookie="__utmb="+_udh+"; path="+_utcp+";"+x+_udo;
  _ubd.cookie="__utmc="+_udh+"; path="+_utcp+";"+_udo;
  _ufns=1;
 } else if (a>=0 && b>=0 && c>=0) {
   b = _uGC(dc,"__utmb="+_udh,";");
   b = ("-" == b) ? _udh : b;  
  _ubd.cookie="__utmb="+b+"; path="+_utcp+";"+x+_udo;
 } else {
  if (a>=0) a=_uFixA(_ubd.cookie,";",_ust);
  else {
   a=_udh+"."+_uu+"."+_ust+"."+_ust+"."+_ust+".1";
   nv=1;
  }
  _ubd.cookie="__utma="+a+"; path="+_utcp+";"+nx+_udo;
  _ubd.cookie="__utmb="+_udh+"; path="+_utcp+";"+x+_udo;
  _ubd.cookie="__utmc="+_udh+"; path="+_utcp+";"+_udo;
  _ufns=1;
 }
 if (_ulink && xx && xx!="" && xx!="-") {
   xx=_uUES(xx);
   if (xx.indexOf(";")==-1) _ubd.cookie="__utmx="+xx+"; path="+_utcp+";"+nx+_udo;
 }
 if (_ulink && v && v!="" && v!="-") {
  v=_uUES(v);
  if (v.indexOf(";")==-1) _ubd.cookie="__utmv="+v+"; path="+_utcp+";"+nx+_udo;
 }
 var wc=window;
 var c=_ubd.cookie;
 if(wc && wc.gaGlobal && wc.gaGlobal.dh==_udh){
  var g=wc.gaGlobal;
  var ua=c.split("__utma="+_udh+".")[1].split(";")[0].split(".");
  if(g.sid)ua[3]=g.sid;
  if(nv>0){
   ua[2]=ua[3];
   if(g.vid){
    var v=g.vid.split(".");
    ua[0]=v[0];
    ua[1]=v[1];
   }
  }
  _ubd.cookie="__utma="+_udh+"."+ua.join(".")+"; path="+_utcp+";"+nx+_udo;
 }
 _uInfo(page);
 _ufns=0;
 _ufno=0;
 if (!page || page=="") _uff=1;
}
function _uGH() {
 var hid;
 var wc=window;
 if (wc && wc.gaGlobal && wc.gaGlobal.hid) {
  hid=wc.gaGlobal.hid;
 } else {
  hid=Math.round(Math.random()*0x7fffffff);
  if (!wc.gaGlobal) wc.gaGlobal={};
  wc.gaGlobal.hid=hid;
 }
 return hid;
}
function _uInfo(page) {
 var p,s="",dm="",pg=_udl.pathname+_udl.search;
 if (page && page!="") pg=_uES(page,1);
 _ur=_ubd.referrer;
 if (!_ur || _ur=="") { _ur="-"; }
 else {
  dm=_ubd.domain;
  if(_utcp && _utcp!="/") dm+=_utcp;
  p=_ur.indexOf(dm);
  if ((p>=0) && (p<=8)) { _ur="0"; }
  if (_ur.indexOf("[")==0 && _ur.lastIndexOf("]")==(_ur.length-1)) { _ur="-"; }
 }
 s+="&utmn="+_uu;
 if (_ufsc) s+=_uBInfo();
 if (_uctm) s+=_uCInfo();
 if (_utitle && _ubd.title && _ubd.title!="") s+="&utmdt="+_uES(_ubd.title);
 if (_udl.hostname && _udl.hostname!="") s+="&utmhn="+_uES(_udl.hostname);
 if (_usample && _usample != 100) s+="&utmsp="+_uES(_usample);
 s+="&utmhid="+_uGH();
 s+="&utmr="+_ur;
 s+="&utmp="+pg;
 if ((_userv==0 || _userv==2) && _uSP()) {
  var i=new Image(1,1);
  i.src=_ugifpath+"?"+"utmwv="+_uwv+s;
  i.onload=function() { _uVoid(); }
 }
 if ((_userv==1 || _userv==2) && _uSP()) {
  var i2=new Image(1,1);
  i2.src=_ugifpath2+"?"+"utmwv="+_uwv+s+"&utmac="+_uacct+"&utmcc="+_uGCS();
  i2.onload=function() { _uVoid(); }
 }
 return;
}
function _uVoid() { return; }
function _uCInfo() {
 if (!_ucto || _ucto=="") { _ucto="15768000"; }
 if (!_uVG()) return;
 var c="",t="-",t2="-",t3="-",o=0,cs=0,cn=0,i=0,z="-",s="";
 if (_uanchor && _udlh && _udlh!="") s=_udlh+"&";
 s+=_udl.search;
 var x=new Date(_udt.getTime()+(_ucto*1000));
 var dc=_ubd.cookie;
 x=" expires="+x.toGMTString()+";";
 if (_ulink && !_ubl) {
  z=_uUES(_uGC(s,"__utmz=","&"));
  if (z!="-" && z.indexOf(";")==-1) { _ubd.cookie="__utmz="+z+"; path="+_utcp+";"+x+_udo; return ""; }
 }
 z=dc.indexOf("__utmz="+_udh+".");
 if (z>-1) { z=_uGC(dc,"__utmz="+_udh+".",";"); }
 else { z="-"; }
 t=_uGC(s,_ucid+"=","&");
 t2=_uGC(s,_ucsr+"=","&");
 t3=_uGC(s,"gclid=","&");
 if ((t!="-" && t!="") || (t2!="-" && t2!="") || (t3!="-" && t3!="")) {
  if (t!="-" && t!="") c+="utmcid="+_uEC(t);
  if (t2!="-" && t2!="") { if (c != "") c+="|"; c+="utmcsr="+_uEC(t2); }
  if (t3!="-" && t3!="") { if (c != "") c+="|"; c+="utmgclid="+_uEC(t3); }
  t=_uGC(s,_uccn+"=","&");
  if (t!="-" && t!="") c+="|utmccn="+_uEC(t);
  else c+="|utmccn=(not+set)";
  t=_uGC(s,_ucmd+"=","&");
  if (t!="-" && t!="") c+="|utmcmd="+_uEC(t);
  else  c+="|utmcmd=(not+set)";
  t=_uGC(s,_uctr+"=","&");
  if (t!="-" && t!="") c+="|utmctr="+_uEC(t);
  else { t=_uOrg(1); if (t!="-" && t!="") c+="|utmctr="+_uEC(t); }
  t=_uGC(s,_ucct+"=","&");
  if (t!="-" && t!="") c+="|utmcct="+_uEC(t);
  t=_uGC(s,_ucno+"=","&");
  if (t=="1") o=1;
  if (z!="-" && o==1) return "";
 }
 if (c=="-" || c=="") { c=_uOrg(); if (z!="-" && _ufno==1)  return ""; }
 if (c=="-" || c=="") { if (_ufns==1)  c=_uRef(); if (z!="-" && _ufno==1)  return ""; }
 if (c=="-" || c=="") {
  if (z=="-" && _ufns==1) { c="utmccn=(direct)|utmcsr=(direct)|utmcmd=(none)"; }
  if (c=="-" || c=="") return "";
 }
 if (z!="-") {
  i=z.indexOf(".");
  if (i>-1) i=z.indexOf(".",i+1);
  if (i>-1) i=z.indexOf(".",i+1);
  if (i>-1) i=z.indexOf(".",i+1);
  t=z.substring(i+1,z.length);
  if (t.toLowerCase()==c.toLowerCase()) cs=1;
  t=z.substring(0,i);
  if ((i=t.lastIndexOf(".")) > -1) {
   t=t.substring(i+1,t.length);
   cn=(t*1);
  }
 }
 if (cs==0 || _ufns==1) {
  t=_uGC(dc,"__utma="+_udh+".",";");
  if ((i=t.lastIndexOf(".")) > 9) {
   _uns=t.substring(i+1,t.length);
   _uns=(_uns*1);
  }
  cn++;
  if (_uns==0) _uns=1;
  _ubd.cookie="__utmz="+_udh+"."+_ust+"."+_uns+"."+cn+"."+c+"; path="+_utcp+"; "+x+_udo;
 }
 if (cs==0 || _ufns==1) return "&utmcn=1";
 else return "&utmcr=1";
}
function _uRef() {
 if (_ur=="0" || _ur=="" || _ur=="-") return "";
 var i=0,h,k,n;
 if ((i=_ur.indexOf("://"))<0 || _uGCse()) return "";
 h=_ur.substring(i+3,_ur.length);
 if (h.indexOf("/") > -1) {
  k=h.substring(h.indexOf("/"),h.length);
  if (k.indexOf("?") > -1) k=k.substring(0,k.indexOf("?"));
  h=h.substring(0,h.indexOf("/"));
 }
 h=h.toLowerCase();
 n=h;
 if ((i=n.indexOf(":")) > -1) n=n.substring(0,i);
 for (var ii=0;ii<_uRno.length;ii++) {
  if ((i=n.indexOf(_uRno[ii].toLowerCase())) > -1 && n.length==(i+_uRno[ii].length)) { _ufno=1; break; }
 }
 if (h.indexOf("www.")==0) h=h.substring(4,h.length);
 return "utmccn=(referral)|utmcsr="+_uEC(h)+"|"+"utmcct="+_uEC(k)+"|utmcmd=referral";
}
function _uOrg(t) {
 if (_ur=="0" || _ur=="" || _ur=="-") return "";
 var i=0,h,k;
 if ((i=_ur.indexOf("://"))<0 || _uGCse()) return "";
 h=_ur.substring(i+3,_ur.length);
 if (h.indexOf("/") > -1) {
  h=h.substring(0,h.indexOf("/"));
 }
 for (var ii=0;ii<_uOsr.length;ii++) {
  if (h.toLowerCase().indexOf(_uOsr[ii].toLowerCase()) > -1) {
   if ((i=_ur.indexOf("?"+_uOkw[ii]+"=")) > -1 || (i=_ur.indexOf("&"+_uOkw[ii]+"=")) > -1) {
    k=_ur.substring(i+_uOkw[ii].length+2,_ur.length);
    if ((i=k.indexOf("&")) > -1) k=k.substring(0,i);
    for (var yy=0;yy<_uOno.length;yy++) {
     if (_uOno[yy].toLowerCase()==k.toLowerCase()) { _ufno=1; break; }
    }
    if (t) return _uEC(k);
    else return "utmccn=(organic)|utmcsr="+_uEC(_uOsr[ii])+"|"+"utmctr="+_uEC(k)+"|utmcmd=organic";
   }
  }
 }
 return "";
}
function _uGCse() {
 var h,p;
 h=p=_ur.split("://")[1];
 if(h.indexOf("/")>-1) {
  h=h.split("/")[0];
  p=p.substring(p.indexOf("/")+1,p.length);
 }
 if(p.indexOf("?")>-1) {
  p=p.split("?")[0];
 }
 if(h.toLowerCase().indexOf("google")>-1) {
  if(_ur.indexOf("?q=")>-1 || _ur.indexOf("&q=")>-1) {
   if (p.toLowerCase().indexOf("cse")>-1) {
    return true;
   }
  }
 }
}
function _uBInfo() {
 var sr="-",sc="-",ul="-",fl="-",cs="-",je=1;
 var n=navigator;
 if (self.screen) {
  sr=screen.width+"x"+screen.height;
  sc=screen.colorDepth+"-bit";
 } else if (self.java) {
  var j=java.awt.Toolkit.getDefaultToolkit();
  var s=j.getScreenSize();
  sr=s.width+"x"+s.height;
 }
 if (n.language) { ul=n.language.toLowerCase(); }
 else if (n.browserLanguage) { ul=n.browserLanguage.toLowerCase(); }
 je=n.javaEnabled()?1:0;
 if (_uflash) fl=_uFlash();
 if (_ubd.characterSet) cs=_uES(_ubd.characterSet);
 else if (_ubd.charset) cs=_uES(_ubd.charset);
 return "&utmcs="+cs+"&utmsr="+sr+"&utmsc="+sc+"&utmul="+ul+"&utmje="+je+"&utmfl="+fl;
}
function __utmSetTrans() {
 var e;
 if (_ubd.getElementById) e=_ubd.getElementById("utmtrans");
 else if (_ubd.utmform && _ubd.utmform.utmtrans) e=_ubd.utmform.utmtrans;
 if (!e) return;
 var l=e.value.split("UTM:");
 var i,i2,c;
 if (_userv==0 || _userv==2) i=new Array();
 if (_userv==1 || _userv==2) { i2=new Array(); c=_uGCS(); }

 for (var ii=0;ii<l.length;ii++) {
  l[ii]=_uTrim(l[ii]);
  if (l[ii].charAt(0)!='T' && l[ii].charAt(0)!='I') continue;
  var r=Math.round(Math.random()*2147483647);
  if (!_utsp || _utsp=="") _utsp="|";
  var f=l[ii].split(_utsp),s="";
  if (f[0].charAt(0)=='T') {
   s="&utmt=tran"+"&utmn="+r;
   f[1]=_uTrim(f[1]); if(f[1]&&f[1]!="") s+="&utmtid="+_uES(f[1]);
   f[2]=_uTrim(f[2]); if(f[2]&&f[2]!="") s+="&utmtst="+_uES(f[2]);
   f[3]=_uTrim(f[3]); if(f[3]&&f[3]!="") s+="&utmtto="+_uES(f[3]);
   f[4]=_uTrim(f[4]); if(f[4]&&f[4]!="") s+="&utmttx="+_uES(f[4]);
   f[5]=_uTrim(f[5]); if(f[5]&&f[5]!="") s+="&utmtsp="+_uES(f[5]);
   f[6]=_uTrim(f[6]); if(f[6]&&f[6]!="") s+="&utmtci="+_uES(f[6]);
   f[7]=_uTrim(f[7]); if(f[7]&&f[7]!="") s+="&utmtrg="+_uES(f[7]);
   f[8]=_uTrim(f[8]); if(f[8]&&f[8]!="") s+="&utmtco="+_uES(f[8]);
  } else {
   s="&utmt=item"+"&utmn="+r;
   f[1]=_uTrim(f[1]); if(f[1]&&f[1]!="") s+="&utmtid="+_uES(f[1]);
   f[2]=_uTrim(f[2]); if(f[2]&&f[2]!="") s+="&utmipc="+_uES(f[2]);
   f[3]=_uTrim(f[3]); if(f[3]&&f[3]!="") s+="&utmipn="+_uES(f[3]);
   f[4]=_uTrim(f[4]); if(f[4]&&f[4]!="") s+="&utmiva="+_uES(f[4]);
   f[5]=_uTrim(f[5]); if(f[5]&&f[5]!="") s+="&utmipr="+_uES(f[5]);
   f[6]=_uTrim(f[6]); if(f[6]&&f[6]!="") s+="&utmiqt="+_uES(f[6]);
  }
  if (_udl.hostname && _udl.hostname!="") s+="&utmhn="+_uES(_udl.hostname);
  if (_usample && _usample != 100) s+="&utmsp="+_uES(_usample);

  if ((_userv==0 || _userv==2) && _uSP()) {
   i[ii]=new Image(1,1);
   i[ii].src=_ugifpath+"?"+"utmwv="+_uwv+s;
   i[ii].onload=function() { _uVoid(); }
  }
  if ((_userv==1 || _userv==2) && _uSP()) {
   i2[ii]=new Image(1,1);
   i2[ii].src=_ugifpath2+"?"+"utmwv="+_uwv+s+"&utmac="+_uacct+"&utmcc="+c;
   i2[ii].onload=function() { _uVoid(); }
  }
 }
 return;
}
function _uFlash() {
 var f="-",n=navigator;
 if (n.plugins && n.plugins.length) {
  for (var ii=0;ii<n.plugins.length;ii++) {
   if (n.plugins[ii].name.indexOf('Shockwave Flash')!=-1) {
    f=n.plugins[ii].description.split('Shockwave Flash ')[1];
    break;
   }
  }
 } else {
  var fl;
  try {
   fl = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
   f = fl.GetVariable("$version");
  } catch(e) {}
  if (f == "-") {
   try {
    fl = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
    f = "WIN 6,0,21,0";
    fl.AllowScriptAccess = "always";
    f = fl.GetVariable("$version");
   } catch(e) {}
  }
  if (f == "-") {
   try {
    fl = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
    f = fl.GetVariable("$version");
   } catch(e) {}
  }
  if (f != "-") {
   f = f.split(" ")[1].split(",");
   f = f[0] + "." + f[1] + " r" + f[2];
  }
 }
 return f;
}
function __utmLinkerUrl(l,h) {
 var p,k,a="-",b="-",c="-",x="-",z="-",v="-";
 var dc=_ubd.cookie;
 var iq = l.indexOf("?");
 var ih = l.indexOf("#");
 var url=l;
 if (dc) {
  a=_uES(_uGC(dc,"__utma="+_udh+".",";"));
  b=_uES(_uGC(dc,"__utmb="+_udh,";"));
  c=_uES(_uGC(dc,"__utmc="+_udh,";"));
  x=_uES(_uGC(dc,"__utmx="+_udh,";"));
  z=_uES(_uGC(dc,"__utmz="+_udh+".",";"));
  v=_uES(_uGC(dc,"__utmv="+_udh+".",";"));
  k=(_uHash(a+b+c+x+z+v)*1)+(_udh*1);
  p="__utma="+a+"&__utmb="+b+"&__utmc="+c+"&__utmx="+x+"&__utmz="+z+"&__utmv="+v+"&__utmk="+k;
 }
 if (p) {
  if (h && ih>-1) return;
  if (h) { url=l+"#"+p; }
  else {
   if (iq==-1 && ih==-1) url=l+"?"+p;
   else if (ih==-1) url=l+"&"+p;
   else if (iq==-1) url=l.substring(0,ih-1)+"?"+p+l.substring(ih);
   else url=l.substring(0,ih-1)+"&"+p+l.substring(ih);
  }
 }
 return url;
}
function __utmLinker(l,h) {
 if (!_ulink || !l || l=="") return;
 _udl.href=__utmLinkerUrl(l,h);
}
function __utmLinkPost(f,h) {
 if (!_ulink || !f || !f.action) return;
 f.action=__utmLinkerUrl(f.action, h);
 return;
}
function __utmSetVar(v) {
 if (!v || v=="") return;
 if (!_udo || _udo == "") {
  _udh=_uDomain();
  if (_udn && _udn!="") { _udo=" domain="+_udn+";"; }
 }
 if (!_uVG()) return;
 var r=Math.round(Math.random() * 2147483647);
 _ubd.cookie="__utmv="+_udh+"."+_uES(v)+"; path="+_utcp+"; expires="+_uNx()+";"+_udo;
 var s="&utmt=var&utmn="+r;
 if (_usample && _usample != 100) s+="&utmsp="+_uES(_usample);
 if ((_userv==0 || _userv==2) && _uSP()) {
  var i=new Image(1,1);
  i.src=_ugifpath+"?"+"utmwv="+_uwv+s;
  i.onload=function() { _uVoid(); }
 }
 if ((_userv==1 || _userv==2) && _uSP()) {
  var i2=new Image(1,1);
  i2.src=_ugifpath2+"?"+"utmwv="+_uwv+s+"&utmac="+_uacct+"&utmcc="+_uGCS();
  i2.onload=function() { _uVoid(); }
 }
}
function _uGCS() {
 var t,c="",dc=_ubd.cookie;
 if ((t=_uGC(dc,"__utma="+_udh+".",";"))!="-") c+=_uES("__utma="+t+";+");
 if ((t=_uGC(dc,"__utmx="+_udh,";"))!="-") c+=_uES("__utmx="+t+";+");
 if ((t=_uGC(dc,"__utmz="+_udh+".",";"))!="-") c+=_uES("__utmz="+t+";+");
 if ((t=_uGC(dc,"__utmv="+_udh+".",";"))!="-") c+=_uES("__utmv="+t+";");
 if (c.charAt(c.length-1)=="+") c=c.substring(0,c.length-1);
 return c;
}
function _uGC(l,n,s) {
 if (!l || l=="" || !n || n=="" || !s || s=="") return "-";
 var i,i2,i3,c="-";
 i=l.indexOf(n);
 i3=n.indexOf("=")+1;
 if (i > -1) {
  i2=l.indexOf(s,i); if (i2 < 0) { i2=l.length; }
  c=l.substring((i+i3),i2);
 }
 return c;
}
function _uDomain() {
 if (!_udn || _udn=="" || _udn=="none") { _udn=""; return 1; }
 if (_udn=="auto") {
  var d=_ubd.domain;
  if (d.substring(0,4)=="www.") {
   d=d.substring(4,d.length);
  }
  _udn=d;
 }
 _udn = _udn.toLowerCase(); 
 if (_uhash=="off") return 1;
 return _uHash(_udn);
}
function _uHash(d) {
 if (!d || d=="") return 1;
 var h=0,g=0;
 for (var i=d.length-1;i>=0;i--) {
  var c=parseInt(d.charCodeAt(i));
  h=((h << 6) & 0xfffffff) + c + (c << 14);
  if ((g=h & 0xfe00000)!=0) h=(h ^ (g >> 21));
 }
 return h;
}
function _uFixA(c,s,t) {
 if (!c || c=="" || !s || s=="" || !t || t=="") return "-";
 var a=_uGC(c,"__utma="+_udh+".",s);
 var lt=0,i=0;
 if ((i=a.lastIndexOf(".")) > 9) {
  _uns=a.substring(i+1,a.length);
  _uns=(_uns*1)+1;
  a=a.substring(0,i);
  if ((i=a.lastIndexOf(".")) > 7) {
   lt=a.substring(i+1,a.length);
   a=a.substring(0,i);
  }
  if ((i=a.lastIndexOf(".")) > 5) {
   a=a.substring(0,i);
  }
  a+="."+lt+"."+t+"."+_uns;
 }
 return a;
}
function _uTrim(s) {
  if (!s || s=="") return "";
  while ((s.charAt(0)==' ') || (s.charAt(0)=='\n') || (s.charAt(0,1)=='\r')) s=s.substring(1,s.length);
  while ((s.charAt(s.length-1)==' ') || (s.charAt(s.length-1)=='\n') || (s.charAt(s.length-1)=='\r')) s=s.substring(0,s.length-1);
  return s;
}
function _uEC(s) {
  var n="";
  if (!s || s=="") return "";
  for (var i=0;i<s.length;i++) {if (s.charAt(i)==" ") n+="+"; else n+=s.charAt(i);}
  return n;
}
function __utmVisitorCode(f) {
 var r=0,t=0,i=0,i2=0,m=31;
 var a=_uGC(_ubd.cookie,"__utma="+_udh+".",";");
 if ((i=a.indexOf(".",0))<0) return;
 if ((i2=a.indexOf(".",i+1))>0) r=a.substring(i+1,i2); else return "";  
 if ((i=a.indexOf(".",i2+1))>0) t=a.substring(i2+1,i); else return "";  
 if (f) {
  return r;
 } else {
  var c=new Array('A','B','C','D','E','F','G','H','J','K','L','M','N','P','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9');
  return c[r>>28&m]+c[r>>23&m]+c[r>>18&m]+c[r>>13&m]+"-"+c[r>>8&m]+c[r>>3&m]+c[((r&7)<<2)+(t>>30&3)]+c[t>>25&m]+c[t>>20&m]+"-"+c[t>>15&m]+c[t>>10&m]+c[t>>5&m]+c[t&m];
 }
}
function _uIN(n) {
 if (!n) return false;
 for (var i=0;i<n.length;i++) {
  var c=n.charAt(i);
  if ((c<"0" || c>"9") && (c!=".")) return false;
 }
 return true;
}
function _uES(s,u) {
 if (typeof(encodeURIComponent) == 'function') {
  if (u) return encodeURI(s);
  else return encodeURIComponent(s);
 } else {
  return escape(s);
 }
}
function _uUES(s) {
 if (typeof(decodeURIComponent) == 'function') {
  return decodeURIComponent(s);
 } else {
  return unescape(s);
 }
}
function _uVG() {
 if((_udn.indexOf("www.google.") == 0 || _udn.indexOf(".google.") == 0 || _udn.indexOf("google.") == 0) && _utcp=='/' && _udn.indexOf("google.org")==-1) {
  return false;
 }
 return true;
}
function _uSP() {
 var s=100;
 if (_usample) s=_usample;
 if(s>=100 || s<=0) return true;
 return ((__utmVisitorCode(1)%10000)<(s*100));
}
function urchinPathCopy(p){
 var d=document,nx,tx,sx,i,c,cs,t,h,o;
 cs=new Array("a","b","c","v","x","z");
 h=_uDomain(); if (_udn && _udn!="") o=" domain="+_udn+";";
 nx=_uNx()+";";
 tx=new Date(); tx.setTime(tx.getTime()+(_utimeout*1000));
 tx=tx.toGMTString()+";";
 sx=new Date(); sx.setTime(sx.getTime()+(_ucto*1000));
 sx=sx.toGMTString()+";";
 for (i=0;i<6;i++){
  t=" expires=";
  if (i==1) t+=tx; else if (i==2) t=""; else if (i==5) t+=sx; else t+=nx;
  c=_uGC(d.cookie,"__utm"+cs[i]+"="+h,";");
  if (c!="-") d.cookie="__utm"+cs[i]+"="+c+"; path="+p+";"+t+o;
 }
}
function _uCO() {
 if (!_utk || _utk=="" || _utk.length<10) return;
 var d='www.google.com';
 if (_utk.charAt(0)=='!') d='analytics.corp.google.com';
 _ubd.cookie="GASO="+_utk+"; path="+_utcp+";"+_udo;
 var sc=document.createElement('script');
 sc.type='text/javascript';
 sc.id="_gasojs";
 sc.src='https://'+d+'/analytics/reporting/overlay_js?gaso='+_utk+'&'+Math.random();
 document.getElementsByTagName('head')[0].appendChild(sc);  
}
function _uGT() {
 var h=location.hash, a;
 if (h && h!="" && h.indexOf("#gaso=")==0) {
  a=_uGC(h,"gaso=","&");
 } else {
  a=_uGC(_ubd.cookie,"GASO=",";");
 }
 return a;
}
var _utk=_uGT();
if (_utk && _utk!="" && _utk.length>10 && _utk.indexOf("=")==-1) {
 if (window.addEventListener) {
  window.addEventListener('load', _uCO, false); 
 } else if (window.attachEvent) { 
  window.attachEvent('onload', _uCO);
 }
}

function _uNx() {
  return (new Date((new Date()).getTime()+63072000000)).toGMTString();
}


$(function () {
    var googleCSEWatermark = function ($id) {
        var f = document.getElementById($id);
        if (f && (f.query || f.q || f['edit-keys'])) {
            var q = f.query ? f.query : (f.q ? f.q : f['edit-keys']);
            var n = navigator;
            var l = location;
            if (n.platform == 'Win32') {
                q.style.cssText = 'border: 1px solid #7e9db9; padding: 2px;';
            }
            var b = function () {
                if (q.value == '') {
                    q.style.background = '#FFFFFF url(http://www.google.com/coop/intl/' + Drupal.settings.googleCSE.language + '/images/google_custom_search_watermark.gif) left no-repeat';
                }
            };
            var f = function () {
                q.style.background = '#ffffff';
            };
            q.onfocus = f;
            q.onblur = b;
            if (!/[&?]query=[^&]/.test(l.search)) {
                b();
            }
        }
    };
    googleCSEWatermark('google-cse-searchbox-form');
    googleCSEWatermark('google-cse-results-searchbox-form');
    if (Drupal.settings.googleCSE.searchForm) {
        googleCSEWatermark('search-form');
    }
});
;

(function () {
    var l = this,
    g,
    y = l.jQuery,
    p = l.$,
    o = l.jQuery = l.$ = function (E, F) {
        return new o.fn.init(E, F)
    },
    D = /^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,
    f = /^.[^:#\[\.,]*$/;
    o.fn = o.prototype = {
        init: function (E, H) {
            E = E || document;
            if (E.nodeType) {
                this[0] = E;
                this.length = 1;
                this.context = E;
                return this
            }
            if (typeof E === 'string') {
                var G = D.exec(E);
                if (G && (G[1] || !H)) {
                    if (G[1]) {
                        E = o.clean([G[1]], H)
                    } else {
                        var I = document.getElementById(G[3]);
                        if (I && I.id != G[3]) {
                            return o() .find(E)
                        }
                        var F = o(I || []);
                        F.context = document;
                        F.selector = E;
                        return F
                    }
                } else {
                    return o(H) .find(E)
                }
            } else {
                if (o.isFunction(E)) {
                    return o(document) .ready(E)
                }
            }
            if (E.selector && E.context) {
                this.selector = E.selector;
                this.context = E.context
            }
            return this.setArray(o.isArray(E) ? E : o.makeArray(E))
        },
        selector: '',
        jquery: '1.3.2',
        size: function () {
            return this.length
        },
        get: function (E) {
            return E === g ? Array.prototype.slice.call(this)  : this[E]
        },
        pushStack: function (F, H, E) {
            var G = o(F);
            G.prevObject = this;
            G.context = this.context;
            if (H === 'find') {
                G.selector = this.selector + (this.selector ? ' ' : '') + E
            } else {
                if (H) {
                    G.selector = this.selector + '.' + H + '(' + E + ')'
                }
            }
            return G
        },
        setArray: function (E) {
            this.length = 0;
            Array.prototype.push.apply(this, E);
            return this
        },
        each: function (F, E) {
            return o.each(this, F, E)
        },
        index: function (E) {
            return o.inArray(E && E.jquery ? E[0] : E, this)
        },
        attr: function (F, H, G) {
            var E = F;
            if (typeof F === 'string') {
                if (H === g) {
                    return this[0] && o[G || 'attr'](this[0], F)
                } else {
                    E = {
                    };
                    E[F] = H
                }
            }
            return this.each(function (I) {
                for (F in E) {
                    o.attr(G ? this.style : this, F, o.prop(this, E[F], G, I, F))
                }
            })
        },
        css: function (E, F) {
            if ((E == 'width' || E == 'height') && parseFloat(F) < 0) {
                F = g
            }
            return this.attr(E, F, 'curCSS')
        },
        text: function (F) {
            if (typeof F !== 'object' && F != null) {
                return this.empty() .append((this[0] && this[0].ownerDocument || document) .createTextNode(F))
            }
            var E = '';
            o.each(F || this, function () {
                o.each(this.childNodes, function () {
                    if (this.nodeType != 8) {
                        E += this.nodeType != 1 ? this.nodeValue : o.fn.text([this])
                    }
                })
            });
            return E
        },
        wrapAll: function (E) {
            if (this[0]) {
                var F = o(E, this[0].ownerDocument) .clone();
                if (this[0].parentNode) {
                    F.insertBefore(this[0])
                }
                F.map(function () {
                    var G = this;
                    while (G.firstChild) {
                        G = G.firstChild
                    }
                    return G
                }) .append(this)
            }
            return this
        },
        wrapInner: function (E) {
            return this.each(function () {
                o(this) .contents() .wrapAll(E)
            })
        },
        wrap: function (E) {
            return this.each(function () {
                o(this) .wrapAll(E)
            })
        },
        append: function () {
            return this.domManip(arguments, true, function (E) {
                if (this.nodeType == 1) {
                    this.appendChild(E)
                }
            })
        },
        prepend: function () {
            return this.domManip(arguments, true, function (E) {
                if (this.nodeType == 1) {
                    this.insertBefore(E, this.firstChild)
                }
            })
        },
        before: function () {
            return this.domManip(arguments, false, function (E) {
                this.parentNode.insertBefore(E, this)
            })
        },
        after: function () {
            return this.domManip(arguments, false, function (E) {
                this.parentNode.insertBefore(E, this.nextSibling)
            })
        },
        end: function () {
            return this.prevObject || o([])
        },
        push: [
        ].push,
        sort: [
        ].sort,
        splice: [
        ].splice,
        find: function (E) {
            if (this.length === 1) {
                var F = this.pushStack([], 'find', E);
                F.length = 0;
                o.find(E, this[0], F);
                return F
            } else {
                return this.pushStack(o.unique(o.map(this, function (G) {
                    return o.find(E, G)
                })), 'find', E)
            }
        },
        clone: function (G) {
            var E = this.map(function () {
                if (!o.support.noCloneEvent && !o.isXMLDoc(this)) {
                    var I = this.outerHTML;
                    if (!I) {
                        var J = this.ownerDocument.createElement('div');
                        J.appendChild(this.cloneNode(true));
                        I = J.innerHTML
                    }
                    return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g, '') .replace(/^\s*/, '')]) [0]
                } else {
                    return this.cloneNode(true)
                }
            });
            if (G === true) {
                var H = this.find('*') .andSelf(),
                F = 0;
                E.find('*') .andSelf() .each(function () {
                    if (this.nodeName !== H[F].nodeName) {
                        return
                    }
                    var I = o.data(H[F], 'events');
                    for (var K in I) {
                        for (var J in I[K]) {
                            o.event.add(this, K, I[K][J], I[K][J].data)
                        }
                    }
                    F++
                })
            }
            return E
        },
        filter: function (E) {
            return this.pushStack(o.isFunction(E) && o.grep(this, function (G, F) {
                return E.call(G, F)
            }) || o.multiFilter(E, o.grep(this, function (F) {
                return F.nodeType === 1
            })), 'filter', E)
        },
        closest: function (E) {
            var G = o.expr.match.POS.test(E) ? o(E)  : null,
            F = 0;
            return this.map(function () {
                var H = this;
                while (H && H.ownerDocument) {
                    if (G ? G.index(H) > - 1 : o(H) .is(E)) {
                        o.data(H, 'closest', F);
                        return H
                    }
                    H = H.parentNode;
                    F++
                }
            })
        },
        not: function (E) {
            if (typeof E === 'string') {
                if (f.test(E)) {
                    return this.pushStack(o.multiFilter(E, this, true), 'not', E)
                } else {
                    E = o.multiFilter(E, this)
                }
            }
            var F = E.length && E[E.length - 1] !== g && !E.nodeType;
            return this.filter(function () {
                return F ? o.inArray(this, E) < 0 : this != E
            })
        },
        add: function (E) {
            return this.pushStack(o.unique(o.merge(this.get(), typeof E === 'string' ? o(E)  : o.makeArray(E))))
        },
        is: function (E) {
            return !!E && o.multiFilter(E, this) .length > 0
        },
        hasClass: function (E) {
            return !!E && this.is('.' + E)
        },
        val: function (K) {
            if (K === g) {
                var E = this[0];
                if (E) {
                    if (o.nodeName(E, 'option')) {
                        return (E.attributes.value || {
                        }) .specified ? E.value : E.text
                    }
                    if (o.nodeName(E, 'select')) {
                        var I = E.selectedIndex,
                        L = [
                        ],
                        M = E.options,
                        H = E.type == 'select-one';
                        if (I < 0) {
                            return null
                        }
                        for (var F = H ? I : 0, J = H ? I + 1 : M.length; F < J; F++) {
                            var G = M[F];
                            if (G.selected) {
                                K = o(G) .val();
                                if (H) {
                                    return K
                                }
                                L.push(K)
                            }
                        }
                        return L
                    }
                    return (E.value || '') .replace(/\r/g, '')
                }
                return g
            }
            if (typeof K === 'number') {
                K += ''
            }
            return this.each(function () {
                if (this.nodeType != 1) {
                    return
                }
                if (o.isArray(K) && /radio|checkbox/.test(this.type)) {
                    this.checked = (o.inArray(this.value, K) >= 0 || o.inArray(this.name, K) >= 0)
                } else {
                    if (o.nodeName(this, 'select')) {
                        var N = o.makeArray(K);
                        o('option', this) .each(function () {
                            this.selected = (o.inArray(this.value, N) >= 0 || o.inArray(this.text, N) >= 0)
                        });
                        if (!N.length) {
                            this.selectedIndex = - 1
                        }
                    } else {
                        this.value = K
                    }
                }
            })
        },
        html: function (E) {
            return E === g ? (this[0] ? this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g, '')  : null)  : this.empty() .append(E)
        },
        replaceWith: function (E) {
            return this.after(E) .remove()
        },
        eq: function (E) {
            return this.slice(E, + E + 1)
        },
        slice: function () {
            return this.pushStack(Array.prototype.slice.apply(this, arguments), 'slice', Array.prototype.slice.call(arguments) .join(','))
        },
        map: function (E) {
            return this.pushStack(o.map(this, function (G, F) {
                return E.call(G, F, G)
            }))
        },
        andSelf: function () {
            return this.add(this.prevObject)
        },
        domManip: function (J, M, L) {
            if (this[0]) {
                var I = (this[0].ownerDocument || this[0]) .createDocumentFragment(),
                F = o.clean(J, (this[0].ownerDocument || this[0]), I),
                H = I.firstChild;
                if (H) {
                    for (var G = 0, E = this.length; G < E; G++) {
                        L.call(K(this[G], H), this.length > 1 || G > 0 ? I.cloneNode(true)  : I)
                    }
                }
                if (F) {
                    o.each(F, z)
                }
            }
            return this;
            function K(N, O) {
                return M && o.nodeName(N, 'table') && o.nodeName(O, 'tr') ? (N.getElementsByTagName('tbody') [0] || N.appendChild(N.ownerDocument.createElement('tbody')))  : N
            }
        }
    };
    o.fn.init.prototype = o.fn;
    function z(E, F) {
        if (F.src) {
            o.ajax({
                url: F.src,
                async: false,
                dataType: 'script'
            })
        } else {
            o.globalEval(F.text || F.textContent || F.innerHTML || '')
        }
        if (F.parentNode) {
            F.parentNode.removeChild(F)
        }
    }
    function e() {
        return + new Date
    }
    o.extend = o.fn.extend = function () {
        var J = arguments[0] || {
        },
        H = 1,
        I = arguments.length,
        E = false,
        G;
        if (typeof J === 'boolean') {
            E = J;
            J = arguments[1] || {
            };
            H = 2
        }
        if (typeof J !== 'object' && !o.isFunction(J)) {
            J = {
            }
        }
        if (I == H) {
            J = this;
            --H
        }
        for (; H < I; H++) {
            if ((G = arguments[H]) != null) {
                for (var F in G) {
                    var K = J[F],
                    L = G[F];
                    if (J === L) {
                        continue
                    }
                    if (E && L && typeof L === 'object' && !L.nodeType) {
                        J[F] = o.extend(E, K || (L.length != null ? [
                        ] : {
                        }), L)
                    } else {
                        if (L !== g) {
                            J[F] = L
                        }
                    }
                }
            }
        }
        return J
    };
    var b = /z-?index|font-?weight|opacity|zoom|line-?height/i,
    q = document.defaultView || {
    },
    s = Object.prototype.toString;
    o.extend({
        noConflict: function (E) {
            l.$ = p;
            if (E) {
                l.jQuery = y
            }
            return o
        },
        isFunction: function (E) {
            return s.call(E) === '[object Function]'
        },
        isArray: function (E) {
            return s.call(E) === '[object Array]'
        },
        isXMLDoc: function (E) {
            return E.nodeType === 9 && E.documentElement.nodeName !== 'HTML' || !!E.ownerDocument && o.isXMLDoc(E.ownerDocument)
        },
        globalEval: function (G) {
            if (G && /\S/.test(G)) {
                var F = document.getElementsByTagName('head') [0] || document.documentElement,
                E = document.createElement('script');
                E.type = 'text/javascript';
                if (o.support.scriptEval) {
                    E.appendChild(document.createTextNode(G))
                } else {
                    E.text = G
                }
                F.insertBefore(E, F.firstChild);
                F.removeChild(E)
            }
        },
        nodeName: function (F, E) {
            return F.nodeName && F.nodeName.toUpperCase() == E.toUpperCase()
        },
        each: function (G, K, F) {
            var E,
            H = 0,
            I = G.length;
            if (F) {
                if (I === g) {
                    for (E in G) {
                        if (K.apply(G[E], F) === false) {
                            break
                        }
                    }
                } else {
                    for (; H < I; ) {
                        if (K.apply(G[H++], F) === false) {
                            break
                        }
                    }
                }
            } else {
                if (I === g) {
                    for (E in G) {
                        if (K.call(G[E], E, G[E]) === false) {
                            break
                        }
                    }
                } else {
                    for (var J = G[0]; H < I && K.call(J, H, J) !== false; J = G[++H]) {
                    }
                }
            }
            return G
        },
        prop: function (H, I, G, F, E) {
            if (o.isFunction(I)) {
                I = I.call(H, F)
            }
            return typeof I === 'number' && G == 'curCSS' && !b.test(E) ? I + 'px' : I
        },
        className: {
            add: function (E, F) {
                o.each((F || '') .split(/\s+/), function (G, H) {
                    if (E.nodeType == 1 && !o.className.has(E.className, H)) {
                        E.className += (E.className ? ' ' : '') + H
                    }
                })
            },
            remove: function (E, F) {
                if (E.nodeType == 1) {
                    E.className = F !== g ? o.grep(E.className.split(/\s+/), function (G) {
                        return !o.className.has(F, G)
                    }) .join(' ')  : ''
                }
            },
            has: function (F, E) {
                return F && o.inArray(E, (F.className || F) .toString() .split(/\s+/)) > - 1
            }
        },
        swap: function (H, G, I) {
            var E = {
            };
            for (var F in G) {
                E[F] = H.style[F];
                H.style[F] = G[F]
            }
            I.call(H);
            for (var F in G) {
                H.style[F] = E[F]
            }
        },
        css: function (H, F, J, E) {
            if (F == 'width' || F == 'height') {
                var L,
                G = {
                    position: 'absolute',
                    visibility: 'hidden',
                    display: 'block'
                },
                K = F == 'width' ? [
                    'Left',
                    'Right'
                ] : [
                    'Top',
                    'Bottom'
                ];
                function I() {
                    L = F == 'width' ? H.offsetWidth : H.offsetHeight;
                    if (E === 'border') {
                        return
                    }
                    o.each(K, function () {
                        if (!E) {
                            L -= parseFloat(o.curCSS(H, 'padding' + this, true)) || 0
                        }
                        if (E === 'margin') {
                            L += parseFloat(o.curCSS(H, 'margin' + this, true)) || 0
                        } else {
                            L -= parseFloat(o.curCSS(H, 'border' + this + 'Width', true)) || 0
                        }
                    })
                }
                if (H.offsetWidth !== 0) {
                    I()
                } else {
                    o.swap(H, G, I)
                }
                return Math.max(0, Math.round(L))
            }
            return o.curCSS(H, F, J)
        },
        curCSS: function (I, F, G) {
            var L,
            E = I.style;
            if (F == 'opacity' && !o.support.opacity) {
                L = o.attr(E, 'opacity');
                return L == '' ? '1' : L
            }
            if (F.match(/float/i)) {
                F = w
            }
            if (!G && E && E[F]) {
                L = E[F]
            } else {
                if (q.getComputedStyle) {
                    if (F.match(/float/i)) {
                        F = 'float'
                    }
                    F = F.replace(/([A-Z])/g, '-$1') .toLowerCase();
                    var M = q.getComputedStyle(I, null);
                    if (M) {
                        L = M.getPropertyValue(F)
                    }
                    if (F == 'opacity' && L == '') {
                        L = '1'
                    }
                } else {
                    if (I.currentStyle) {
                        var J = F.replace(/\-(\w)/g, function (N, O) {
                            return O.toUpperCase()
                        });
                        L = I.currentStyle[F] || I.currentStyle[J];
                        if (!/^\d+(px)?$/i.test(L) && /^\d/.test(L)) {
                            var H = E.left,
                            K = I.runtimeStyle.left;
                            I.runtimeStyle.left = I.currentStyle.left;
                            E.left = L || 0;
                            L = E.pixelLeft + 'px';
                            E.left = H;
                            I.runtimeStyle.left = K
                        }
                    }
                }
            }
            return L
        },
        clean: function (F, K, I) {
            K = K || document;
            if (typeof K.createElement === 'undefined') {
                K = K.ownerDocument || K[0] && K[0].ownerDocument || document
            }
            if (!I && F.length === 1 && typeof F[0] === 'string') {
                var H = /^<(\w+)\s*\/?>$/.exec(F[0]);
                if (H) {
                    return [K.createElement(H[1])]
                }
            }
            var G = [
            ],
            E = [
            ],
            L = K.createElement('div');
            o.each(F, function (P, S) {
                if (typeof S === 'number') {
                    S += ''
                }
                if (!S) {
                    return
                }
                if (typeof S === 'string') {
                    S = S.replace(/(<(\w+)[^>]*?)\/>/g, function (U, V, T) {
                        return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i) ? U : V + '></' + T + '>'
                    });
                    var O = S.replace(/^\s+/, '') .substring(0, 10) .toLowerCase();
                    var Q = !O.indexOf('<opt') && [1,
                    '<select multiple=\'multiple\'>',
                    '</select>'] || !O.indexOf('<leg') && [1,
                    '<fieldset>',
                    '</fieldset>'] || O.match(/^<(thead|tbody|tfoot|colg|cap)/) && [1,
                    '<table>',
                    '</table>'] || !O.indexOf('<tr') && [2,
                    '<table><tbody>',
                    '</tbody></table>'] || (!O.indexOf('<td') || !O.indexOf('<th')) && [3,
                    '<table><tbody><tr>',
                    '</tr></tbody></table>'] || !O.indexOf('<col') && [2,
                    '<table><tbody></tbody><colgroup>',
                    '</colgroup></table>'] || !o.support.htmlSerialize && [1,
                    'div<div>',
                    '</div>'] || [0,
                    '',
                    ''];
                    L.innerHTML = Q[1] + S + Q[2];
                    while (Q[0]--) {
                        L = L.lastChild
                    }
                    if (!o.support.tbody) {
                        var R = /<tbody/i.test(S),
                        N = !O.indexOf('<table') && !R ? L.firstChild && L.firstChild.childNodes : Q[1] == '<table>' && !R ? L.childNodes : [
                        ];
                        for (var M = N.length - 1; M >= 0; --M) {
                            if (o.nodeName(N[M], 'tbody') && !N[M].childNodes.length) {
                                N[M].parentNode.removeChild(N[M])
                            }
                        }
                    }
                    if (!o.support.leadingWhitespace && /^\s/.test(S)) {
                        L.insertBefore(K.createTextNode(S.match(/^\s*/) [0]), L.firstChild)
                    }
                    S = o.makeArray(L.childNodes)
                }
                if (S.nodeType) {
                    G.push(S)
                } else {
                    G = o.merge(G, S)
                }
            });
            if (I) {
                for (var J = 0; G[J]; J++) {
                    if (o.nodeName(G[J], 'script') && (!G[J].type || G[J].type.toLowerCase() === 'text/javascript')) {
                        E.push(G[J].parentNode ? G[J].parentNode.removeChild(G[J])  : G[J])
                    } else {
                        if (G[J].nodeType === 1) {
                            G.splice.apply(G, [
                                J + 1,
                                0
                            ].concat(o.makeArray(G[J].getElementsByTagName('script'))))
                        }
                        I.appendChild(G[J])
                    }
                }
                return E
            }
            return G
        },
        attr: function (J, G, K) {
            if (!J || J.nodeType == 3 || J.nodeType == 8) {
                return g
            }
            var H = !o.isXMLDoc(J),
            L = K !== g;
            G = H && o.props[G] || G;
            if (J.tagName) {
                var F = /href|src|style/.test(G);
                if (G == 'selected' && J.parentNode) {
                    J.parentNode.selectedIndex
                }
                if (G in J && H && !F) {
                    if (L) {
                        if (G == 'type' && o.nodeName(J, 'input') && J.parentNode) {
                            throw 'type property can\'t be changed'
                        }
                        J[G] = K
                    }
                    if (o.nodeName(J, 'form') && J.getAttributeNode(G)) {
                        return J.getAttributeNode(G) .nodeValue
                    }
                    if (G == 'tabIndex') {
                        var I = J.getAttributeNode('tabIndex');
                        return I && I.specified ? I.value : J.nodeName.match(/(button|input|object|select|textarea)/i) ? 0 : J.nodeName.match(/^(a|area)$/i) && J.href ? 0 : g
                    }
                    return J[G]
                }
                if (!o.support.style && H && G == 'style') {
                    return o.attr(J.style, 'cssText', K)
                }
                if (L) {
                    J.setAttribute(G, '' + K)
                }
                var E = !o.support.hrefNormalized && H && F ? J.getAttribute(G, 2)  : J.getAttribute(G);
                return E === null ? g : E
            }
            if (!o.support.opacity && G == 'opacity') {
                if (L) {
                    J.zoom = 1;
                    J.filter = (J.filter || '') .replace(/alpha\([^)]*\)/, '') + (parseInt(K) + '' == 'NaN' ? '' : 'alpha(opacity=' + K * 100 + ')')
                }
                return J.filter && J.filter.indexOf('opacity=') >= 0 ? (parseFloat(J.filter.match(/opacity=([^)]*)/) [1]) / 100) + '' : ''
            }
            G = G.replace(/-([a-z])/gi, function (M, N) {
                return N.toUpperCase()
            });
            if (L) {
                J[G] = K
            }
            return J[G]
        },
        trim: function (E) {
            return (E || '') .replace(/^\s+|\s+$/g, '')
        },
        makeArray: function (G) {
            var E = [
            ];
            if (G != null) {
                var F = G.length;
                if (F == null || typeof G === 'string' || o.isFunction(G) || G.setInterval) {
                    E[0] = G
                } else {
                    while (F) {
                        E[--F] = G[F]
                    }
                }
            }
            return E
        },
        inArray: function (G, H) {
            for (var E = 0, F = H.length; E < F; E++) {
                if (H[E] === G) {
                    return E
                }
            }
            return - 1
        },
        merge: function (H, E) {
            var F = 0,
            G,
            I = H.length;
            if (!o.support.getAll) {
                while ((G = E[F++]) != null) {
                    if (G.nodeType != 8) {
                        H[I++] = G
                    }
                }
            } else {
                while ((G = E[F++]) != null) {
                    H[I++] = G
                }
            }
            return H
        },
        unique: function (K) {
            var F = [
            ],
            E = {
            };
            try {
                for (var G = 0, H = K.length; G < H; G++) {
                    var J = o.data(K[G]);
                    if (!E[J]) {
                        E[J] = true;
                        F.push(K[G])
                    }
                }
            } catch (I) {
                F = K
            }
            return F
        },
        grep: function (F, J, E) {
            var G = [
            ];
            for (var H = 0, I = F.length; H < I; H++) {
                if (!E != !J(F[H], H)) {
                    G.push(F[H])
                }
            }
            return G
        },
        map: function (E, J) {
            var F = [
            ];
            for (var G = 0, H = E.length; G < H; G++) {
                var I = J(E[G], G);
                if (I != null) {
                    F[F.length] = I
                }
            }
            return F.concat.apply([], F)
        }
    });
    var C = navigator.userAgent.toLowerCase();
    o.browser = {
        version: (C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0,
        '0']) [1],
        safari: /webkit/.test(C),
        opera: /opera/.test(C),
        msie: /msie/.test(C) && !/opera/.test(C),
        mozilla: /mozilla/.test(C) && !/(compatible|webkit)/.test(C)
    };
    o.each({
        parent: function (E) {
            return E.parentNode
        },
        parents: function (E) {
            return o.dir(E, 'parentNode')
        },
        next: function (E) {
            return o.nth(E, 2, 'nextSibling')
        },
        prev: function (E) {
            return o.nth(E, 2, 'previousSibling')
        },
        nextAll: function (E) {
            return o.dir(E, 'nextSibling')
        },
        prevAll: function (E) {
            return o.dir(E, 'previousSibling')
        },
        siblings: function (E) {
            return o.sibling(E.parentNode.firstChild, E)
        },
        children: function (E) {
            return o.sibling(E.firstChild)
        },
        contents: function (E) {
            return o.nodeName(E, 'iframe') ? E.contentDocument || E.contentWindow.document : o.makeArray(E.childNodes)
        }
    }, function (E, F) {
        o.fn[E] = function (G) {
            var H = o.map(this, F);
            if (G && typeof G == 'string') {
                H = o.multiFilter(G, H)
            }
            return this.pushStack(o.unique(H), E, G)
        }
    });
    o.each({
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith'
    }, function (E, F) {
        o.fn[E] = function (G) {
            var J = [
            ],
            L = o(G);
            for (var K = 0, H = L.length; K < H; K++) {
                var I = (K > 0 ? this.clone(true)  : this) .get();
                o.fn[F].apply(o(L[K]), I);
                J = J.concat(I)
            }
            return this.pushStack(J, E, G)
        }
    });
    o.each({
        removeAttr: function (E) {
            o.attr(this, E, '');
            if (this.nodeType == 1) {
                this.removeAttribute(E)
            }
        },
        addClass: function (E) {
            o.className.add(this, E)
        },
        removeClass: function (E) {
            o.className.remove(this, E)
        },
        toggleClass: function (F, E) {
            if (typeof E !== 'boolean') {
                E = !o.className.has(this, F)
            }
            o.className[E ? 'add' : 'remove'](this, F)
        },
        remove: function (E) {
            if (!E || o.filter(E, [
                this
            ]) .length) {
                o('*', this) .add([this]) .each(function () {
                    o.event.remove(this);
                    o.removeData(this)
                });
                if (this.parentNode) {
                    this.parentNode.removeChild(this)
                }
            }
        },
        empty: function () {
            o(this) .children() .remove();
            while (this.firstChild) {
                this.removeChild(this.firstChild)
            }
        }
    }, function (E, F) {
        o.fn[E] = function () {
            return this.each(F, arguments)
        }
    });
    function j(E, F) {
        return E[0] && parseInt(o.curCSS(E[0], F, true), 10) || 0
    }
    var h = 'jQuery' + e(),
    v = 0,
    A = {
    };
    o.extend({
        cache: {
        },
        data: function (F, E, G) {
            F = F == l ? A : F;
            var H = F[h];
            if (!H) {
                H = F[h] = ++v
            }
            if (E && !o.cache[H]) {
                o.cache[H] = {
                }
            }
            if (G !== g) {
                o.cache[H][E] = G
            }
            return E ? o.cache[H][E] : H
        },
        removeData: function (F, E) {
            F = F == l ? A : F;
            var H = F[h];
            if (E) {
                if (o.cache[H]) {
                    delete o.cache[H][E];
                    E = '';
                    for (E in o.cache[H]) {
                        break
                    }
                    if (!E) {
                        o.removeData(F)
                    }
                }
            } else {
                try {
                    delete F[h]
                } catch (G) {
                    if (F.removeAttribute) {
                        F.removeAttribute(h)
                    }
                }
                delete o.cache[H]
            }
        },
        queue: function (F, E, H) {
            if (F) {
                E = (E || 'fx') + 'queue';
                var G = o.data(F, E);
                if (!G || o.isArray(H)) {
                    G = o.data(F, E, o.makeArray(H))
                } else {
                    if (H) {
                        G.push(H)
                    }
                }
            }
            return G
        },
        dequeue: function (H, G) {
            var E = o.queue(H, G),
            F = E.shift();
            if (!G || G === 'fx') {
                F = E[0]
            }
            if (F !== g) {
                F.call(H)
            }
        }
    });
    o.fn.extend({
        data: function (E, G) {
            var H = E.split('.');
            H[1] = H[1] ? '.' + H[1] : '';
            if (G === g) {
                var F = this.triggerHandler('getData' + H[1] + '!', [
                    H[0]
                ]);
                if (F === g && this.length) {
                    F = o.data(this[0], E)
                }
                return F === g && H[1] ? this.data(H[0])  : F
            } else {
                return this.trigger('setData' + H[1] + '!', [
                    H[0],
                    G
                ]) .each(function () {
                    o.data(this, E, G)
                })
            }
        },
        removeData: function (E) {
            return this.each(function () {
                o.removeData(this, E)
            })
        },
        queue: function (E, F) {
            if (typeof E !== 'string') {
                F = E;
                E = 'fx'
            }
            if (F === g) {
                return o.queue(this[0], E)
            }
            return this.each(function () {
                var G = o.queue(this, E, F);
                if (E == 'fx' && G.length == 1) {
                    G[0].call(this)
                }
            })
        },
        dequeue: function (E) {
            return this.each(function () {
                o.dequeue(this, E)
            })
        }
    });
    (function () {
        var R = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
        L = 0,
        H = Object.prototype.toString;
        var F = function (Y, U, ab, ac) {
            ab = ab || [];
            U = U || document;
            if (U.nodeType !== 1 && U.nodeType !== 9) {
                return []
            }
            if (!Y || typeof Y !== 'string') {
                return ab
            }
            var Z = [
            ],
            W,
            af,
            ai,
            T,
            ad,
            V,
            X = true;
            R.lastIndex = 0;
            while ((W = R.exec(Y)) !== null) {
                Z.push(W[1]);
                if (W[2]) {
                    V = RegExp.rightContext;
                    break
                }
            }
            if (Z.length > 1 && M.exec(Y)) {
                if (Z.length === 2 && I.relative[Z[0]]) {
                    af = J(Z[0] + Z[1], U)
                } else {
                    af = I.relative[Z[0]] ? [
                        U
                    ] : F(Z.shift(), U);
                    while (Z.length) {
                        Y = Z.shift();
                        if (I.relative[Y]) {
                            Y += Z.shift()
                        }
                        af = J(Y, af)
                    }
                }
            } else {
                var ae = ac ? {
                    expr: Z.pop(),
                    set: E(ac)
                }
                 : F.find(Z.pop(), Z.length === 1 && U.parentNode ? U.parentNode : U, Q(U));
                af = F.filter(ae.expr, ae.set);
                if (Z.length > 0) {
                    ai = E(af)
                } else {
                    X = false
                }
                while (Z.length) {
                    var ah = Z.pop(),
                    ag = ah;
                    if (!I.relative[ah]) {
                        ah = ''
                    } else {
                        ag = Z.pop()
                    }
                    if (ag == null) {
                        ag = U
                    }
                    I.relative[ah](ai, ag, Q(U))
                }
            }
            if (!ai) {
                ai = af
            }
            if (!ai) {
                throw 'Syntax error, unrecognized expression: ' + (ah || Y)
            }
            if (H.call(ai) === '[object Array]') {
                if (!X) {
                    ab.push.apply(ab, ai)
                } else {
                    if (U.nodeType === 1) {
                        for (var aa = 0; ai[aa] != null; aa++) {
                            if (ai[aa] && (ai[aa] === true || ai[aa].nodeType === 1 && K(U, ai[aa]))) {
                                ab.push(af[aa])
                            }
                        }
                    } else {
                        for (var aa = 0; ai[aa] != null; aa++) {
                            if (ai[aa] && ai[aa].nodeType === 1) {
                                ab.push(af[aa])
                            }
                        }
                    }
                }
            } else {
                E(ai, ab)
            }
            if (V) {
                F(V, U, ab, ac);
                if (G) {
                    hasDuplicate = false;
                    ab.sort(G);
                    if (hasDuplicate) {
                        for (var aa = 1; aa < ab.length; aa++) {
                            if (ab[aa] === ab[aa - 1]) {
                                ab.splice(aa--, 1)
                            }
                        }
                    }
                }
            }
            return ab
        };
        F.matches = function (T, U) {
            return F(T, null, null, U)
        };
        F.find = function (aa, T, ab) {
            var Z,
            X;
            if (!aa) {
                return []
            }
            for (var W = 0, V = I.order.length; W < V; W++) {
                var Y = I.order[W],
                X;
                if ((X = I.match[Y].exec(aa))) {
                    var U = RegExp.leftContext;
                    if (U.substr(U.length - 1) !== '\\') {
                        X[1] = (X[1] || '') .replace(/\\/g, '');
                        Z = I.find[Y](X, T, ab);
                        if (Z != null) {
                            aa = aa.replace(I.match[Y], '');
                            break
                        }
                    }
                }
            }
            if (!Z) {
                Z = T.getElementsByTagName('*')
            }
            return {
                set: Z,
                expr: aa
            }
        };
        F.filter = function (ad, ac, ag, W) {
            var V = ad,
            ai = [
            ],
            aa = ac,
            Y,
            T,
            Z = ac && ac[0] && Q(ac[0]);
            while (ad && ac.length) {
                for (var ab in I.filter) {
                    if ((Y = I.match[ab].exec(ad)) != null) {
                        var U = I.filter[ab],
                        ah,
                        af;
                        T = false;
                        if (aa == ai) {
                            ai = [
                            ]
                        }
                        if (I.preFilter[ab]) {
                            Y = I.preFilter[ab](Y, aa, ag, ai, W, Z);
                            if (!Y) {
                                T = ah = true
                            } else {
                                if (Y === true) {
                                    continue
                                }
                            }
                        }
                        if (Y) {
                            for (var X = 0; (af = aa[X]) != null; X++) {
                                if (af) {
                                    ah = U(af, Y, X, aa);
                                    var ae = W ^ !!ah;
                                    if (ag && ah != null) {
                                        if (ae) {
                                            T = true
                                        } else {
                                            aa[X] = false
                                        }
                                    } else {
                                        if (ae) {
                                            ai.push(af);
                                            T = true
                                        }
                                    }
                                }
                            }
                        }
                        if (ah !== g) {
                            if (!ag) {
                                aa = ai
                            }
                            ad = ad.replace(I.match[ab], '');
                            if (!T) {
                                return []
                            }
                            break
                        }
                    }
                }
                if (ad == V) {
                    if (T == null) {
                        throw 'Syntax error, unrecognized expression: ' + ad
                    } else {
                        break
                    }
                }
                V = ad
            }
            return aa
        };
        var I = F.selectors = {
            order: [
                'ID',
                'NAME',
                'TAG'
            ],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
            },
            attrMap: {
                'class': 'className',
                'for': 'htmlFor'
            },
            attrHandle: {
                href: function (T) {
                    return T.getAttribute('href')
                }
            },
            relative: {
                '+': function (aa, T, Z) {
                    var X = typeof T === 'string',
                    ab = X && !/\W/.test(T),
                    Y = X && !ab;
                    if (ab && !Z) {
                        T = T.toUpperCase()
                    }
                    for (var W = 0, V = aa.length, U; W < V; W++) {
                        if ((U = aa[W])) {
                            while ((U = U.previousSibling) && U.nodeType !== 1) {
                            }
                            aa[W] = Y || U && U.nodeName === T ? U || false : U === T
                        }
                    }
                    if (Y) {
                        F.filter(T, aa, true)
                    }
                },
                '>': function (Z, U, aa) {
                    var X = typeof U === 'string';
                    if (X && !/\W/.test(U)) {
                        U = aa ? U : U.toUpperCase();
                        for (var V = 0, T = Z.length; V < T; V++) {
                            var Y = Z[V];
                            if (Y) {
                                var W = Y.parentNode;
                                Z[V] = W.nodeName === U ? W : false
                            }
                        }
                    } else {
                        for (var V = 0, T = Z.length; V < T; V++) {
                            var Y = Z[V];
                            if (Y) {
                                Z[V] = X ? Y.parentNode : Y.parentNode === U
                            }
                        }
                        if (X) {
                            F.filter(U, Z, true)
                        }
                    }
                },
                '': function (W, U, Y) {
                    var V = L++,
                    T = S;
                    if (!U.match(/\W/)) {
                        var X = U = Y ? U : U.toUpperCase();
                        T = P
                    }
                    T('parentNode', U, V, W, X, Y)
                },
                '~': function (W, U, Y) {
                    var V = L++,
                    T = S;
                    if (typeof U === 'string' && !U.match(/\W/)) {
                        var X = U = Y ? U : U.toUpperCase();
                        T = P
                    }
                    T('previousSibling', U, V, W, X, Y)
                }
            },
            find: {
                ID: function (U, V, W) {
                    if (typeof V.getElementById !== 'undefined' && !W) {
                        var T = V.getElementById(U[1]);
                        return T ? [
                            T
                        ] : [
                        ]
                    }
                },
                NAME: function (V, Y, Z) {
                    if (typeof Y.getElementsByName !== 'undefined') {
                        var U = [
                        ],
                        X = Y.getElementsByName(V[1]);
                        for (var W = 0, T = X.length; W < T; W++) {
                            if (X[W].getAttribute('name') === V[1]) {
                                U.push(X[W])
                            }
                        }
                        return U.length === 0 ? null : U
                    }
                },
                TAG: function (T, U) {
                    return U.getElementsByTagName(T[1])
                }
            },
            preFilter: {
                CLASS: function (W, U, V, T, Z, aa) {
                    W = ' ' + W[1].replace(/\\/g, '') + ' ';
                    if (aa) {
                        return W
                    }
                    for (var X = 0, Y; (Y = U[X]) != null; X++) {
                        if (Y) {
                            if (Z ^ (Y.className && (' ' + Y.className + ' ') .indexOf(W) >= 0)) {
                                if (!V) {
                                    T.push(Y)
                                }
                            } else {
                                if (V) {
                                    U[X] = false
                                }
                            }
                        }
                    }
                    return false
                },
                ID: function (T) {
                    return T[1].replace(/\\/g, '')
                },
                TAG: function (U, T) {
                    for (var V = 0; T[V] === false; V++) {
                    }
                    return T[V] && Q(T[V]) ? U[1] : U[1].toUpperCase()
                },
                CHILD: function (T) {
                    if (T[1] == 'nth') {
                        var U = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2] == 'even' && '2n' || T[2] == 'odd' && '2n+1' || !/\D/.test(T[2]) && '0n+' + T[2] || T[2]);
                        T[2] = (U[1] + (U[2] || 1)) - 0;
                        T[3] = U[3] - 0
                    }
                    T[0] = L++;
                    return T
                },
                ATTR: function (X, U, V, T, Y, Z) {
                    var W = X[1].replace(/\\/g, '');
                    if (!Z && I.attrMap[W]) {
                        X[1] = I.attrMap[W]
                    }
                    if (X[2] === '~=') {
                        X[4] = ' ' + X[4] + ' '
                    }
                    return X
                },
                PSEUDO: function (X, U, V, T, Y) {
                    if (X[1] === 'not') {
                        if (X[3].match(R) .length > 1 || /^\w/.test(X[3])) {
                            X[3] = F(X[3], null, null, U)
                        } else {
                            var W = F.filter(X[3], U, V, true ^ Y);
                            if (!V) {
                                T.push.apply(T, W)
                            }
                            return false
                        }
                    } else {
                        if (I.match.POS.test(X[0]) || I.match.CHILD.test(X[0])) {
                            return true
                        }
                    }
                    return X
                },
                POS: function (T) {
                    T.unshift(true);
                    return T
                }
            },
            filters: {
                enabled: function (T) {
                    return T.disabled === false && T.type !== 'hidden'
                },
                disabled: function (T) {
                    return T.disabled === true
                },
                checked: function (T) {
                    return T.checked === true
                },
                selected: function (T) {
                    T.parentNode.selectedIndex;
                    return T.selected === true
                },
                parent: function (T) {
                    return !!T.firstChild
                },
                empty: function (T) {
                    return !T.firstChild
                },
                has: function (V, U, T) {
                    return !!F(T[3], V) .length
                },
                header: function (T) {
                    return /h\d/i.test(T.nodeName)
                },
                text: function (T) {
                    return 'text' === T.type
                },
                radio: function (T) {
                    return 'radio' === T.type
                },
                checkbox: function (T) {
                    return 'checkbox' === T.type
                },
                file: function (T) {
                    return 'file' === T.type
                },
                password: function (T) {
                    return 'password' === T.type
                },
                submit: function (T) {
                    return 'submit' === T.type
                },
                image: function (T) {
                    return 'image' === T.type
                },
                reset: function (T) {
                    return 'reset' === T.type
                },
                button: function (T) {
                    return 'button' === T.type || T.nodeName.toUpperCase() === 'BUTTON'
                },
                input: function (T) {
                    return /input|select|textarea|button/i.test(T.nodeName)
                }
            },
            setFilters: {
                first: function (U, T) {
                    return T === 0
                },
                last: function (V, U, T, W) {
                    return U === W.length - 1
                },
                even: function (U, T) {
                    return T % 2 === 0
                },
                odd: function (U, T) {
                    return T % 2 === 1
                },
                lt: function (V, U, T) {
                    return U < T[3] - 0
                },
                gt: function (V, U, T) {
                    return U > T[3] - 0
                },
                nth: function (V, U, T) {
                    return T[3] - 0 == U
                },
                eq: function (V, U, T) {
                    return T[3] - 0 == U
                }
            },
            filter: {
                PSEUDO: function (Z, V, W, aa) {
                    var U = V[1],
                    X = I.filters[U];
                    if (X) {
                        return X(Z, W, V, aa)
                    } else {
                        if (U === 'contains') {
                            return (Z.textContent || Z.innerText || '') .indexOf(V[3]) >= 0
                        } else {
                            if (U === 'not') {
                                var Y = V[3];
                                for (var W = 0, T = Y.length; W < T; W++) {
                                    if (Y[W] === Z) {
                                        return false
                                    }
                                }
                                return true
                            }
                        }
                    }
                },
                CHILD: function (T, W) {
                    var Z = W[1],
                    U = T;
                    switch (Z) {
                    case 'only':
                    case 'first':
                        while (U = U.previousSibling) {
                            if (U.nodeType === 1) {
                                return false
                            }
                        }
                        if (Z == 'first') {
                            return true
                        }
                        U = T;
                    case 'last':
                        while (U = U.nextSibling) {
                            if (U.nodeType === 1) {
                                return false
                            }
                        }
                        return true;
                    case 'nth':
                        var V = W[2],
                        ac = W[3];
                        if (V == 1 && ac == 0) {
                            return true
                        }
                        var Y = W[0],
                        ab = T.parentNode;
                        if (ab && (ab.sizcache !== Y || !T.nodeIndex)) {
                            var X = 0;
                            for (U = ab.firstChild; U; U = U.nextSibling) {
                                if (U.nodeType === 1) {
                                    U.nodeIndex = ++X
                                }
                            }
                            ab.sizcache = Y
                        }
                        var aa = T.nodeIndex - ac;
                        if (V == 0) {
                            return aa == 0
                        } else {
                            return (aa % V == 0 && aa / V >= 0)
                        }
                    }
                },
                ID: function (U, T) {
                    return U.nodeType === 1 && U.getAttribute('id') === T
                },
                TAG: function (U, T) {
                    return (T === '*' && U.nodeType === 1) || U.nodeName === T
                },
                CLASS: function (U, T) {
                    return (' ' + (U.className || U.getAttribute('class')) + ' ') .indexOf(T) > - 1
                },
                ATTR: function (Y, W) {
                    var V = W[1],
                    T = I.attrHandle[V] ? I.attrHandle[V](Y)  : Y[V] != null ? Y[V] : Y.getAttribute(V),
                    Z = T + '',
                    X = W[2],
                    U = W[4];
                    return T == null ? X === '!=' : X === '=' ? Z === U : X === '*=' ? Z.indexOf(U) >= 0 : X === '~=' ? (' ' + Z + ' ') .indexOf(U) >= 0 : !U ? Z && T !== false : X === '!=' ? Z != U : X === '^=' ? Z.indexOf(U) === 0 : X === '$=' ? Z.substr(Z.length - U.length) === U : X === '|=' ? Z === U || Z.substr(0, U.length + 1) === U + '-' : false
                },
                POS: function (X, U, V, Y) {
                    var T = U[2],
                    W = I.setFilters[T];
                    if (W) {
                        return W(X, V, U, Y)
                    }
                }
            }
        };
        var M = I.match.POS;
        for (var O in I.match) {
            I.match[O] = RegExp(I.match[O].source + /(?![^\[]*\])(?![^\(]*\))/.source)
        }
        var E = function (U, T) {
            U = Array.prototype.slice.call(U);
            if (T) {
                T.push.apply(T, U);
                return T
            }
            return U
        };
        try {
            Array.prototype.slice.call(document.documentElement.childNodes)
        } catch (N) {
            E = function (X, W) {
                var U = W || [];
                if (H.call(X) === '[object Array]') {
                    Array.prototype.push.apply(U, X)
                } else {
                    if (typeof X.length === 'number') {
                        for (var V = 0, T = X.length; V < T; V++) {
                            U.push(X[V])
                        }
                    } else {
                        for (var V = 0; X[V]; V++) {
                            U.push(X[V])
                        }
                    }
                }
                return U
            }
        }
        var G;
        if (document.documentElement.compareDocumentPosition) {
            G = function (U, T) {
                var V = U.compareDocumentPosition(T) & 4 ? - 1 : U === T ? 0 : 1;
                if (V === 0) {
                    hasDuplicate = true
                }
                return V
            }
        } else {
            if ('sourceIndex' in document.documentElement) {
                G = function (U, T) {
                    var V = U.sourceIndex - T.sourceIndex;
                    if (V === 0) {
                        hasDuplicate = true
                    }
                    return V
                }
            } else {
                if (document.createRange) {
                    G = function (W, U) {
                        var V = W.ownerDocument.createRange(),
                        T = U.ownerDocument.createRange();
                        V.selectNode(W);
                        V.collapse(true);
                        T.selectNode(U);
                        T.collapse(true);
                        var X = V.compareBoundaryPoints(Range.START_TO_END, T);
                        if (X === 0) {
                            hasDuplicate = true
                        }
                        return X
                    }
                }
            }
        }(function () {
            var U = document.createElement('form'),
            V = 'script' + (new Date) .getTime();
            U.innerHTML = '<input name=\'' + V + '\'/>';
            var T = document.documentElement;
            T.insertBefore(U, T.firstChild);
            if (!!document.getElementById(V)) {
                I.find.ID = function (X, Y, Z) {
                    if (typeof Y.getElementById !== 'undefined' && !Z) {
                        var W = Y.getElementById(X[1]);
                        return W ? W.id === X[1] || typeof W.getAttributeNode !== 'undefined' && W.getAttributeNode('id') .nodeValue === X[1] ? [
                            W
                        ] : g : [
                        ]
                    }
                };
                I.filter.ID = function (Y, W) {
                    var X = typeof Y.getAttributeNode !== 'undefined' && Y.getAttributeNode('id');
                    return Y.nodeType === 1 && X && X.nodeValue === W
                }
            }
            T.removeChild(U)
        }) ();
        (function () {
            var T = document.createElement('div');
            T.appendChild(document.createComment(''));
            if (T.getElementsByTagName('*') .length > 0) {
                I.find.TAG = function (U, Y) {
                    var X = Y.getElementsByTagName(U[1]);
                    if (U[1] === '*') {
                        var W = [
                        ];
                        for (var V = 0; X[V]; V++) {
                            if (X[V].nodeType === 1) {
                                W.push(X[V])
                            }
                        }
                        X = W
                    }
                    return X
                }
            }
            T.innerHTML = '<a href=\'#\'></a>';
            if (T.firstChild && typeof T.firstChild.getAttribute !== 'undefined' && T.firstChild.getAttribute('href') !== '#') {
                I.attrHandle.href = function (U) {
                    return U.getAttribute('href', 2)
                }
            }
        }) ();
        if (document.querySelectorAll) {
            (function () {
                var T = F,
                U = document.createElement('div');
                U.innerHTML = '<p class=\'TEST\'></p>';
                if (U.querySelectorAll && U.querySelectorAll('.TEST') .length === 0) {
                    return
                }
                F = function (Y, X, V, W) {
                    X = X || document;
                    if (!W && X.nodeType === 9 && !Q(X)) {
                        try {
                            return E(X.querySelectorAll(Y), V)
                        } catch (Z) {
                        }
                    }
                    return T(Y, X, V, W)
                };
                F.find = T.find;
                F.filter = T.filter;
                F.selectors = T.selectors;
                F.matches = T.matches
            }) ()
        }
        if (document.getElementsByClassName && document.documentElement.getElementsByClassName) {
            (function () {
                var T = document.createElement('div');
                T.innerHTML = '<div class=\'test e\'></div><div class=\'test\'></div>';
                if (T.getElementsByClassName('e') .length === 0) {
                    return
                }
                T.lastChild.className = 'e';
                if (T.getElementsByClassName('e') .length === 1) {
                    return
                }
                I.order.splice(1, 0, 'CLASS');
                I.find.CLASS = function (U, V, W) {
                    if (typeof V.getElementsByClassName !== 'undefined' && !W) {
                        return V.getElementsByClassName(U[1])
                    }
                }
            }) ()
        }
        function P(U, Z, Y, ad, aa, ac) {
            var ab = U == 'previousSibling' && !ac;
            for (var W = 0, V = ad.length; W < V; W++) {
                var T = ad[W];
                if (T) {
                    if (ab && T.nodeType === 1) {
                        T.sizcache = Y;
                        T.sizset = W
                    }
                    T = T[U];
                    var X = false;
                    while (T) {
                        if (T.sizcache === Y) {
                            X = ad[T.sizset];
                            break
                        }
                        if (T.nodeType === 1 && !ac) {
                            T.sizcache = Y;
                            T.sizset = W
                        }
                        if (T.nodeName === Z) {
                            X = T;
                            break
                        }
                        T = T[U]
                    }
                    ad[W] = X
                }
            }
        }
        function S(U, Z, Y, ad, aa, ac) {
            var ab = U == 'previousSibling' && !ac;
            for (var W = 0, V = ad.length; W < V; W++) {
                var T = ad[W];
                if (T) {
                    if (ab && T.nodeType === 1) {
                        T.sizcache = Y;
                        T.sizset = W
                    }
                    T = T[U];
                    var X = false;
                    while (T) {
                        if (T.sizcache === Y) {
                            X = ad[T.sizset];
                            break
                        }
                        if (T.nodeType === 1) {
                            if (!ac) {
                                T.sizcache = Y;
                                T.sizset = W
                            }
                            if (typeof Z !== 'string') {
                                if (T === Z) {
                                    X = true;
                                    break
                                }
                            } else {
                                if (F.filter(Z, [
                                    T
                                ]) .length > 0) {
                                    X = T;
                                    break
                                }
                            }
                        }
                        T = T[U]
                    }
                    ad[W] = X
                }
            }
        }
        var K = document.compareDocumentPosition ? function (U, T) {
            return U.compareDocumentPosition(T) & 16
        }
         : function (U, T) {
            return U !== T && (U.contains ? U.contains(T)  : true)
        };
        var Q = function (T) {
            return T.nodeType === 9 && T.documentElement.nodeName !== 'HTML' || !!T.ownerDocument && Q(T.ownerDocument)
        };
        var J = function (T, aa) {
            var W = [
            ],
            X = '',
            Y,
            V = aa.nodeType ? [
                aa
            ] : aa;
            while ((Y = I.match.PSEUDO.exec(T))) {
                X += Y[0];
                T = T.replace(I.match.PSEUDO, '')
            }
            T = I.relative[T] ? T + '*' : T;
            for (var Z = 0, U = V.length; Z < U; Z++) {
                F(T, V[Z], W)
            }
            return F.filter(X, W)
        };
        o.find = F;
        o.filter = F.filter;
        o.expr = F.selectors;
        o.expr[':'] = o.expr.filters;
        F.selectors.filters.hidden = function (T) {
            return T.offsetWidth === 0 || T.offsetHeight === 0
        };
        F.selectors.filters.visible = function (T) {
            return T.offsetWidth > 0 || T.offsetHeight > 0
        };
        F.selectors.filters.animated = function (T) {
            return o.grep(o.timers, function (U) {
                return T === U.elem
            }) .length
        };
        o.multiFilter = function (V, T, U) {
            if (U) {
                V = ':not(' + V + ')'
            }
            return F.matches(V, T)
        };
        o.dir = function (V, U) {
            var T = [
            ],
            W = V[U];
            while (W && W != document) {
                if (W.nodeType == 1) {
                    T.push(W)
                }
                W = W[U]
            }
            return T
        };
        o.nth = function (X, T, V, W) {
            T = T || 1;
            var U = 0;
            for (; X; X = X[V]) {
                if (X.nodeType == 1 && ++U == T) {
                    break
                }
            }
            return X
        };
        o.sibling = function (V, U) {
            var T = [
            ];
            for (; V; V = V.nextSibling) {
                if (V.nodeType == 1 && V != U) {
                    T.push(V)
                }
            }
            return T
        };
        return ;
        l.Sizzle = F
    }) ();
    o.event = {
        add: function (I, F, H, K) {
            if (I.nodeType == 3 || I.nodeType == 8) {
                return
            }
            if (I.setInterval && I != l) {
                I = l
            }
            if (!H.guid) {
                H.guid = this.guid++
            }
            if (K !== g) {
                var G = H;
                H = this.proxy(G);
                H.data = K
            }
            var E = o.data(I, 'events') || o.data(I, 'events', {
            }),
            J = o.data(I, 'handle') || o.data(I, 'handle', function () {
                return typeof o !== 'undefined' && !o.event.triggered ? o.event.handle.apply(arguments.callee.elem, arguments)  : g
            });
            J.elem = I;
            o.each(F.split(/\s+/), function (M, N) {
                var O = N.split('.');
                N = O.shift();
                H.type = O.slice() .sort() .join('.');
                var L = E[N];
                if (o.event.specialAll[N]) {
                    o.event.specialAll[N].setup.call(I, K, O)
                }
                if (!L) {
                    L = E[N] = {
                    };
                    if (!o.event.special[N] || o.event.special[N].setup.call(I, K, O) === false) {
                        if (I.addEventListener) {
                            I.addEventListener(N, J, false)
                        } else {
                            if (I.attachEvent) {
                                I.attachEvent('on' + N, J)
                            }
                        }
                    }
                }
                L[H.guid] = H;
                o.event.global[N] = true
            });
            I = null
        },
        guid: 1,
        global: {
        },
        remove: function (K, H, J) {
            if (K.nodeType == 3 || K.nodeType == 8) {
                return
            }
            var G = o.data(K, 'events'),
            F,
            E;
            if (G) {
                if (H === g || (typeof H === 'string' && H.charAt(0) == '.')) {
                    for (var I in G) {
                        this.remove(K, I + (H || ''))
                    }
                } else {
                    if (H.type) {
                        J = H.handler;
                        H = H.type
                    }
                    o.each(H.split(/\s+/), function (M, O) {
                        var Q = O.split('.');
                        O = Q.shift();
                        var N = RegExp('(^|\\.)' + Q.slice() .sort() .join('.*\\.') + '(\\.|$)');
                        if (G[O]) {
                            if (J) {
                                delete G[O][J.guid]
                            } else {
                                for (var P in G[O]) {
                                    if (N.test(G[O][P].type)) {
                                        delete G[O][P]
                                    }
                                }
                            }
                            if (o.event.specialAll[O]) {
                                o.event.specialAll[O].teardown.call(K, Q)
                            }
                            for (F in G[O]) {
                                break
                            }
                            if (!F) {
                                if (!o.event.special[O] || o.event.special[O].teardown.call(K, Q) === false) {
                                    if (K.removeEventListener) {
                                        K.removeEventListener(O, o.data(K, 'handle'), false)
                                    } else {
                                        if (K.detachEvent) {
                                            K.detachEvent('on' + O, o.data(K, 'handle'))
                                        }
                                    }
                                }
                                F = null;
                                delete G[O]
                            }
                        }
                    })
                }
                for (F in G) {
                    break
                }
                if (!F) {
                    var L = o.data(K, 'handle');
                    if (L) {
                        L.elem = null
                    }
                    o.removeData(K, 'events');
                    o.removeData(K, 'handle')
                }
            }
        },
        trigger: function (I, K, H, E) {
            var G = I.type || I;
            if (!E) {
                I = typeof I === 'object' ? I[h] ? I : o.extend(o.Event(G), I)  : o.Event(G);
                if (G.indexOf('!') >= 0) {
                    I.type = G = G.slice(0, - 1);
                    I.exclusive = true
                }
                if (!H) {
                    I.stopPropagation();
                    if (this.global[G]) {
                        o.each(o.cache, function () {
                            if (this.events && this.events[G]) {
                                o.event.trigger(I, K, this.handle.elem)
                            }
                        })
                    }
                }
                if (!H || H.nodeType == 3 || H.nodeType == 8) {
                    return g
                }
                I.result = g;
                I.target = H;
                K = o.makeArray(K);
                K.unshift(I)
            }
            I.currentTarget = H;
            var J = o.data(H, 'handle');
            if (J) {
                J.apply(H, K)
            }
            if ((!H[G] || (o.nodeName(H, 'a') && G == 'click')) && H['on' + G] && H['on' + G].apply(H, K) === false) {
                I.result = false
            }
            if (!E && H[G] && !I.isDefaultPrevented() && !(o.nodeName(H, 'a') && G == 'click')) {
                this.triggered = true;
                try {
                    H[G]()
                } catch (L) {
                }
            }
            this.triggered = false;
            if (!I.isPropagationStopped()) {
                var F = H.parentNode || H.ownerDocument;
                if (F) {
                    o.event.trigger(I, K, F, true)
                }
            }
        },
        handle: function (K) {
            var J,
            E;
            K = arguments[0] = o.event.fix(K || l.event);
            K.currentTarget = this;
            var L = K.type.split('.');
            K.type = L.shift();
            J = !L.length && !K.exclusive;
            var I = RegExp('(^|\\.)' + L.slice() .sort() .join('.*\\.') + '(\\.|$)');
            E = (o.data(this, 'events') || {
            }) [K.type];
            for (var G in E) {
                var H = E[G];
                if (J || I.test(H.type)) {
                    K.handler = H;
                    K.data = H.data;
                    var F = H.apply(this, arguments);
                    if (F !== g) {
                        K.result = F;
                        if (F === false) {
                            K.preventDefault();
                            K.stopPropagation()
                        }
                    }
                    if (K.isImmediatePropagationStopped()) {
                        break
                    }
                }
            }
        },
        props: 'altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which'.split(' '),
        fix: function (H) {
            if (H[h]) {
                return H
            }
            var F = H;
            H = o.Event(F);
            for (var G = this.props.length, J; G; ) {
                J = this.props[--G];
                H[J] = F[J]
            }
            if (!H.target) {
                H.target = H.srcElement || document
            }
            if (H.target.nodeType == 3) {
                H.target = H.target.parentNode
            }
            if (!H.relatedTarget && H.fromElement) {
                H.relatedTarget = H.fromElement == H.target ? H.toElement : H.fromElement
            }
            if (H.pageX == null && H.clientX != null) {
                var I = document.documentElement,
                E = document.body;
                H.pageX = H.clientX + (I && I.scrollLeft || E && E.scrollLeft || 0) - (I.clientLeft || 0);
                H.pageY = H.clientY + (I && I.scrollTop || E && E.scrollTop || 0) - (I.clientTop || 0)
            }
            if (!H.which && ((H.charCode || H.charCode === 0) ? H.charCode : H.keyCode)) {
                H.which = H.charCode || H.keyCode
            }
            if (!H.metaKey && H.ctrlKey) {
                H.metaKey = H.ctrlKey
            }
            if (!H.which && H.button) {
                H.which = (H.button & 1 ? 1 : (H.button & 2 ? 3 : (H.button & 4 ? 2 : 0)))
            }
            return H
        },
        proxy: function (F, E) {
            E = E || function () {
                return F.apply(this, arguments)
            };
            E.guid = F.guid = F.guid || E.guid || this.guid++;
            return E
        },
        special: {
            ready: {
                setup: B,
                teardown: function () {
                }
            }
        },
        specialAll: {
            live: {
                setup: function (E, F) {
                    o.event.add(this, F[0], c)
                },
                teardown: function (G) {
                    if (G.length) {
                        var E = 0,
                        F = RegExp('(^|\\.)' + G[0] + '(\\.|$)');
                        o.each((o.data(this, 'events') .live || {
                        }), function () {
                            if (F.test(this.type)) {
                                E++
                            }
                        });
                        if (E < 1) {
                            o.event.remove(this, G[0], c)
                        }
                    }
                }
            }
        }
    };
    o.Event = function (E) {
        if (!this.preventDefault) {
            return new o.Event(E)
        }
        if (E && E.type) {
            this.originalEvent = E;
            this.type = E.type
        } else {
            this.type = E
        }
        this.timeStamp = e();
        this[h] = true
    };
    function k() {
        return false
    }
    function u() {
        return true
    }
    o.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = u;
            var E = this.originalEvent;
            if (!E) {
                return
            }
            if (E.preventDefault) {
                E.preventDefault()
            }
            E.returnValue = false
        },
        stopPropagation: function () {
            this.isPropagationStopped = u;
            var E = this.originalEvent;
            if (!E) {
                return
            }
            if (E.stopPropagation) {
                E.stopPropagation()
            }
            E.cancelBubble = true
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = u;
            this.stopPropagation()
        },
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k
    };
    var a = function (F) {
        var E = F.relatedTarget;
        while (E && E != this) {
            try {
                E = E.parentNode
            } catch (G) {
                E = this
            }
        }
        if (E != this) {
            F.type = F.data;
            o.event.handle.apply(this, arguments)
        }
    };
    o.each({
        mouseover: 'mouseenter',
        mouseout: 'mouseleave'
    }, function (F, E) {
        o.event.special[E] = {
            setup: function () {
                o.event.add(this, F, a, E)
            },
            teardown: function () {
                o.event.remove(this, F, a)
            }
        }
    });
    o.fn.extend({
        bind: function (F, G, E) {
            return F == 'unload' ? this.one(F, G, E)  : this.each(function () {
                o.event.add(this, F, E || G, E && G)
            })
        },
        one: function (G, H, F) {
            var E = o.event.proxy(F || H, function (I) {
                o(this) .unbind(I, E);
                return (F || H) .apply(this, arguments)
            });
            return this.each(function () {
                o.event.add(this, G, E, F && H)
            })
        },
        unbind: function (F, E) {
            return this.each(function () {
                o.event.remove(this, F, E)
            })
        },
        trigger: function (E, F) {
            return this.each(function () {
                o.event.trigger(E, F, this)
            })
        },
        triggerHandler: function (E, G) {
            if (this[0]) {
                var F = o.Event(E);
                F.preventDefault();
                F.stopPropagation();
                o.event.trigger(F, G, this[0]);
                return F.result
            }
        },
        toggle: function (G) {
            var E = arguments,
            F = 1;
            while (F < E.length) {
                o.event.proxy(G, E[F++])
            }
            return this.click(o.event.proxy(G, function (H) {
                this.lastToggle = (this.lastToggle || 0) % F;
                H.preventDefault();
                return E[this.lastToggle++].apply(this, arguments) || false
            }))
        },
        hover: function (E, F) {
            return this.mouseenter(E) .mouseleave(F)
        },
        ready: function (E) {
            B();
            if (o.isReady) {
                E.call(document, o)
            } else {
                o.readyList.push(E)
            }
            return this
        },
        live: function (G, F) {
            var E = o.event.proxy(F);
            E.guid += this.selector + G;
            o(document) .bind(i(G, this.selector), this.selector, E);
            return this
        },
        die: function (F, E) {
            o(document) .unbind(i(F, this.selector), E ? {
                guid: E.guid + this.selector + F
            }
             : null);
            return this
        }
    });
    function c(H) {
        var E = RegExp('(^|\\.)' + H.type + '(\\.|$)'),
        G = true,
        F = [
        ];
        o.each(o.data(this, 'events') .live || [], function (I, J) {
            if (E.test(J.type)) {
                var K = o(H.target) .closest(J.data) [0];
                if (K) {
                    F.push({
                        elem: K,
                        fn: J
                    })
                }
            }
        });
        F.sort(function (J, I) {
            return o.data(J.elem, 'closest') - o.data(I.elem, 'closest')
        });
        o.each(F, function () {
            if (this.fn.call(this.elem, H, this.fn.data) === false) {
                return (G = false)
            }
        });
        return G
    }
    function i(F, E) {
        return ['live',
        F,
        E.replace(/\./g, '`') .replace(/ /g, '|')].join('.')
    }
    o.extend({
        isReady: false,
        readyList: [
        ],
        ready: function () {
            if (!o.isReady) {
                o.isReady = true;
                if (o.readyList) {
                    o.each(o.readyList, function () {
                        this.call(document, o)
                    });
                    o.readyList = null
                }
                o(document) .triggerHandler('ready')
            }
        }
    });
    var x = false;
    function B() {
        if (x) {
            return
        }
        x = true;
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', function () {
                document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                o.ready()
            }, false)
        } else {
            if (document.attachEvent) {
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState === 'complete') {
                        document.detachEvent('onreadystatechange', arguments.callee);
                        o.ready()
                    }
                });
                if (document.documentElement.doScroll && l == l.top) {
                    (function () {
                        if (o.isReady) {
                            return
                        }
                        try {
                            document.documentElement.doScroll('left')
                        } catch (E) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        o.ready()
                    }) ()
                }
            }
        }
        o.event.add(l, 'load', o.ready)
    }
    o.each(('blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error') .split(','), function (F, E) {
        o.fn[E] = function (G) {
            return G ? this.bind(E, G)  : this.trigger(E)
        }
    });
    o(l) .bind('unload', function () {
        for (var E in o.cache) {
            if (E != 1 && o.cache[E].handle) {
                o.event.remove(o.cache[E].handle.elem)
            }
        }
    });
    (function () {
        o.support = {
        };
        var F = document.documentElement,
        G = document.createElement('script'),
        K = document.createElement('div'),
        J = 'script' + (new Date) .getTime();
        K.style.display = 'none';
        K.innerHTML = '   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';
        var H = K.getElementsByTagName('*'),
        E = K.getElementsByTagName('a') [0];
        if (!H || !H.length || !E) {
            return
        }
        o.support = {
            leadingWhitespace: K.firstChild.nodeType == 3,
            tbody: !K.getElementsByTagName('tbody') .length,
            objectAll: !!K.getElementsByTagName('object') [0].getElementsByTagName('*') .length,
            htmlSerialize: !!K.getElementsByTagName('link') .length,
            style: /red/.test(E.getAttribute('style')),
            hrefNormalized: E.getAttribute('href') === '/a',
            opacity: E.style.opacity === '0.5',
            cssFloat: !!E.style.cssFloat,
            scriptEval: false,
            noCloneEvent: true,
            boxModel: null
        };
        G.type = 'text/javascript';
        try {
            G.appendChild(document.createTextNode('window.' + J + '=1;'))
        } catch (I) {
        }
        F.insertBefore(G, F.firstChild);
        if (l[J]) {
            o.support.scriptEval = true;
            delete l[J]
        }
        F.removeChild(G);
        if (K.attachEvent && K.fireEvent) {
            K.attachEvent('onclick', function () {
                o.support.noCloneEvent = false;
                K.detachEvent('onclick', arguments.callee)
            });
            K.cloneNode(true) .fireEvent('onclick')
        }
        o(function () {
            var L = document.createElement('div');
            L.style.width = L.style.paddingLeft = '1px';
            document.body.appendChild(L);
            o.boxModel = o.support.boxModel = L.offsetWidth === 2;
            document.body.removeChild(L) .style.display = 'none'
        })
    }) ();
    var w = o.support.cssFloat ? 'cssFloat' : 'styleFloat';
    o.props = {
        'for': 'htmlFor',
        'class': 'className',
        'float': w,
        cssFloat: w,
        styleFloat: w,
        readonly: 'readOnly',
        maxlength: 'maxLength',
        cellspacing: 'cellSpacing',
        rowspan: 'rowSpan',
        tabindex: 'tabIndex'
    };
    o.fn.extend({
        _load: o.fn.load,
        load: function (G, J, K) {
            if (typeof G !== 'string') {
                return this._load(G)
            }
            var I = G.indexOf(' ');
            if (I >= 0) {
                var E = G.slice(I, G.length);
                G = G.slice(0, I)
            }
            var H = 'GET';
            if (J) {
                if (o.isFunction(J)) {
                    K = J;
                    J = null
                } else {
                    if (typeof J === 'object') {
                        J = o.param(J);
                        H = 'POST'
                    }
                }
            }
            var F = this;
            o.ajax({
                url: G,
                type: H,
                dataType: 'html',
                data: J,
                complete: function (M, L) {
                    if (L == 'success' || L == 'notmodified') {
                        F.html(E ? o('<div/>') .append(M.responseText.replace(/<script(.|\s)*?\/script>/g, '')) .find(E)  : M.responseText)
                    }
                    if (K) {
                        F.each(K, [
                            M.responseText,
                            L,
                            M
                        ])
                    }
                }
            });
            return this
        },
        serialize: function () {
            return o.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? o.makeArray(this.elements)  : this
            }) .filter(function () {
                return this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password|search/i.test(this.type))
            }) .map(function (E, F) {
                var G = o(this) .val();
                return G == null ? null : o.isArray(G) ? o.map(G, function (I, H) {
                    return {
                        name: F.name,
                        value: I
                    }
                })  : {
                    name: F.name,
                    value: G
                }
            }) .get()
        }
    });
    o.each('ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend'.split(','), function (E, F) {
        o.fn[F] = function (G) {
            return this.bind(F, G)
        }
    });
    var r = e();
    o.extend({
        get: function (E, G, H, F) {
            if (o.isFunction(G)) {
                H = G;
                G = null
            }
            return o.ajax({
                type: 'GET',
                url: E,
                data: G,
                success: H,
                dataType: F
            })
        },
        getScript: function (E, F) {
            return o.get(E, null, F, 'script')
        },
        getJSON: function (E, F, G) {
            return o.get(E, F, G, 'json')
        },
        post: function (E, G, H, F) {
            if (o.isFunction(G)) {
                H = G;
                G = {
                }
            }
            return o.ajax({
                type: 'POST',
                url: E,
                data: G,
                success: H,
                dataType: F
            })
        },
        ajaxSetup: function (E) {
            o.extend(o.ajaxSettings, E)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded',
            processData: true,
            async: true,
            xhr: function () {
                return l.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP')  : new XMLHttpRequest()
            },
            accepts: {
                xml: 'application/xml, text/xml',
                html: 'text/html',
                script: 'text/javascript, application/javascript',
                json: 'application/json, text/javascript',
                text: 'text/plain',
                _default: '*/*'
            }
        },
        lastModified: {
        },
        ajax: function (M) {
            M = o.extend(true, M, o.extend(true, {
            }, o.ajaxSettings, M));
            var W,
            F = /=\?(&|$)/g,
            R,
            V,
            G = M.type.toUpperCase();
            if (M.data && M.processData && typeof M.data !== 'string') {
                M.data = o.param(M.data)
            }
            if (M.dataType == 'jsonp') {
                if (G == 'GET') {
                    if (!M.url.match(F)) {
                        M.url += (M.url.match(/\?/) ? '&' : '?') + (M.jsonp || 'callback') + '=?'
                    }
                } else {
                    if (!M.data || !M.data.match(F)) {
                        M.data = (M.data ? M.data + '&' : '') + (M.jsonp || 'callback') + '=?'
                    }
                }
                M.dataType = 'json'
            }
            if (M.dataType == 'json' && (M.data && M.data.match(F) || M.url.match(F))) {
                W = 'jsonp' + r++;
                if (M.data) {
                    M.data = (M.data + '') .replace(F, '=' + W + '$1')
                }
                M.url = M.url.replace(F, '=' + W + '$1');
                M.dataType = 'script';
                l[W] = function (X) {
                    V = X;
                    I();
                    L();
                    l[W] = g;
                    try {
                        delete l[W]
                    } catch (Y) {
                    }
                    if (H) {
                        H.removeChild(T)
                    }
                }
            }
            if (M.dataType == 'script' && M.cache == null) {
                M.cache = false
            }
            if (M.cache === false && G == 'GET') {
                var E = e();
                var U = M.url.replace(/(\?|&)_=.*?(&|$)/, '$1_=' + E + '$2');
                M.url = U + ((U == M.url) ? (M.url.match(/\?/) ? '&' : '?') + '_=' + E : '')
            }
            if (M.data && G == 'GET') {
                M.url += (M.url.match(/\?/) ? '&' : '?') + M.data;
                M.data = null
            }
            if (M.global && !o.active++) {
                o.event.trigger('ajaxStart')
            }
            var Q = /^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);
            if (M.dataType == 'script' && G == 'GET' && Q && (Q[1] && Q[1] != location.protocol || Q[2] != location.host)) {
                var H = document.getElementsByTagName('head') [0];
                var T = document.createElement('script');
                T.src = M.url;
                if (M.scriptCharset) {
                    T.charset = M.scriptCharset
                }
                if (!W) {
                    var O = false;
                    T.onload = T.onreadystatechange = function () {
                        if (!O && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                            O = true;
                            I();
                            L();
                            T.onload = T.onreadystatechange = null;
                            H.removeChild(T)
                        }
                    }
                }
                H.appendChild(T);
                return g
            }
            var K = false;
            var J = M.xhr();
            if (M.username) {
                J.open(G, M.url, M.async, M.username, M.password)
            } else {
                J.open(G, M.url, M.async)
            }
            try {
                if (M.data) {
                    J.setRequestHeader('Content-Type', M.contentType)
                }
                if (M.ifModified) {
                    J.setRequestHeader('If-Modified-Since', o.lastModified[M.url] || 'Thu, 01 Jan 1970 00:00:00 GMT')
                }
                J.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                J.setRequestHeader('Accept', M.dataType && M.accepts[M.dataType] ? M.accepts[M.dataType] + ', */*' : M.accepts._default)
            } catch (S) {
            }
            if (M.beforeSend && M.beforeSend(J, M) === false) {
                if (M.global && !--o.active) {
                    o.event.trigger('ajaxStop')
                }
                J.abort();
                return false
            }
            if (M.global) {
                o.event.trigger('ajaxSend', [
                    J,
                    M
                ])
            }
            var N = function (X) {
                if (J.readyState == 0) {
                    if (P) {
                        clearInterval(P);
                        P = null;
                        if (M.global && !--o.active) {
                            o.event.trigger('ajaxStop')
                        }
                    }
                } else {
                    if (!K && J && (J.readyState == 4 || X == 'timeout')) {
                        K = true;
                        if (P) {
                            clearInterval(P);
                            P = null
                        }
                        R = X == 'timeout' ? 'timeout' : !o.httpSuccess(J) ? 'error' : M.ifModified && o.httpNotModified(J, M.url) ? 'notmodified' : 'success';
                        if (R == 'success') {
                            try {
                                V = o.httpData(J, M.dataType, M)
                            } catch (Z) {
                                R = 'parsererror'
                            }
                        }
                        if (R == 'success') {
                            var Y;
                            try {
                                Y = J.getResponseHeader('Last-Modified')
                            } catch (Z) {
                            }
                            if (M.ifModified && Y) {
                                o.lastModified[M.url] = Y
                            }
                            if (!W) {
                                I()
                            }
                        } else {
                            o.handleError(M, J, R)
                        }
                        L();
                        if (X) {
                            J.abort()
                        }
                        if (M.async) {
                            J = null
                        }
                    }
                }
            };
            if (M.async) {
                var P = setInterval(N, 13);
                if (M.timeout > 0) {
                    setTimeout(function () {
                        if (J && !K) {
                            N('timeout')
                        }
                    }, M.timeout)
                }
            }
            try {
                J.send(M.data)
            } catch (S) {
                o.handleError(M, J, null, S)
            }
            if (!M.async) {
                N()
            }
            function I() {
                if (M.success) {
                    M.success(V, R)
                }
                if (M.global) {
                    o.event.trigger('ajaxSuccess', [
                        J,
                        M
                    ])
                }
            }
            function L() {
                if (M.complete) {
                    M.complete(J, R)
                }
                if (M.global) {
                    o.event.trigger('ajaxComplete', [
                        J,
                        M
                    ])
                }
                if (M.global && !--o.active) {
                    o.event.trigger('ajaxStop')
                }
            }
            return J
        },
        handleError: function (F, H, E, G) {
            if (F.error) {
                F.error(H, E, G)
            }
            if (F.global) {
                o.event.trigger('ajaxError', [
                    H,
                    F,
                    G
                ])
            }
        },
        active: 0,
        httpSuccess: function (F) {
            try {
                return !F.status && location.protocol == 'file:' || (F.status >= 200 && F.status < 300) || F.status == 304 || F.status == 1223
            } catch (E) {
            }
            return false
        },
        httpNotModified: function (G, E) {
            try {
                var H = G.getResponseHeader('Last-Modified');
                return G.status == 304 || H == o.lastModified[E]
            } catch (F) {
            }
            return false
        },
        httpData: function (J, H, G) {
            var F = J.getResponseHeader('content-type'),
            E = H == 'xml' || !H && F && F.indexOf('xml') >= 0,
            I = E ? J.responseXML : J.responseText;
            if (E && I.documentElement.tagName == 'parsererror') {
                throw 'parsererror'
            }
            if (G && G.dataFilter) {
                I = G.dataFilter(I, H)
            }
            if (typeof I === 'string') {
                if (H == 'script') {
                    o.globalEval(I)
                }
                if (H == 'json') {
                    I = l['eval']('(' + I + ')')
                }
            }
            return I
        },
        param: function (E) {
            var G = [
            ];
            function H(I, J) {
                G[G.length] = encodeURIComponent(I) + '=' + encodeURIComponent(J)
            }
            if (o.isArray(E) || E.jquery) {
                o.each(E, function () {
                    H(this.name, this.value)
                })
            } else {
                for (var F in E) {
                    if (o.isArray(E[F])) {
                        o.each(E[F], function () {
                            H(F, this)
                        })
                    } else {
                        H(F, o.isFunction(E[F]) ? E[F]()  : E[F])
                    }
                }
            }
            return G.join('&') .replace(/%20/g, '+')
        }
    });
    var m = {
    },
    n,
    d = [
        ['height',
        'marginTop',
        'marginBottom',
        'paddingTop',
        'paddingBottom'],
        [
            'width',
            'marginLeft',
            'marginRight',
            'paddingLeft',
            'paddingRight'
        ],
        [
            'opacity'
        ]
    ];
    function t(F, E) {
        var G = {
        };
        o.each(d.concat.apply([], d.slice(0, E)), function () {
            G[this] = F
        });
        return G
    }
    o.fn.extend({
        show: function (J, L) {
            if (J) {
                return this.animate(t('show', 3), J, L)
            } else {
                for (var H = 0, F = this.length; H < F; H++) {
                    var E = o.data(this[H], 'olddisplay');
                    this[H].style.display = E || '';
                    if (o.css(this[H], 'display') === 'none') {
                        var G = this[H].tagName,
                        K;
                        if (m[G]) {
                            K = m[G]
                        } else {
                            var I = o('<' + G + ' />') .appendTo('body');
                            K = I.css('display');
                            if (K === 'none') {
                                K = 'block'
                            }
                            I.remove();
                            m[G] = K
                        }
                        o.data(this[H], 'olddisplay', K)
                    }
                }
                for (var H = 0, F = this.length; H < F; H++) {
                    this[H].style.display = o.data(this[H], 'olddisplay') || ''
                }
                return this
            }
        },
        hide: function (H, I) {
            if (H) {
                return this.animate(t('hide', 3), H, I)
            } else {
                for (var G = 0, F = this.length; G < F; G++) {
                    var E = o.data(this[G], 'olddisplay');
                    if (!E && E !== 'none') {
                        o.data(this[G], 'olddisplay', o.css(this[G], 'display'))
                    }
                }
                for (var G = 0, F = this.length; G < F; G++) {
                    this[G].style.display = 'none'
                }
                return this
            }
        },
        _toggle: o.fn.toggle,
        toggle: function (G, F) {
            var E = typeof G === 'boolean';
            return o.isFunction(G) && o.isFunction(F) ? this._toggle.apply(this, arguments)  : G == null || E ? this.each(function () {
                var H = E ? G : o(this) .is(':hidden');
                o(this) [H ? 'show' : 'hide']()
            })  : this.animate(t('toggle', 3), G, F)
        },
        fadeTo: function (E, G, F) {
            return this.animate({
                opacity: G
            }, E, F)
        },
        animate: function (I, F, H, G) {
            var E = o.speed(F, H, G);
            return this[E.queue === false ? 'each' : 'queue'](function () {
                var K = o.extend({
                }, E),
                M,
                L = this.nodeType == 1 && o(this) .is(':hidden'),
                J = this;
                for (M in I) {
                    if (I[M] == 'hide' && L || I[M] == 'show' && !L) {
                        return K.complete.call(this)
                    }
                    if ((M == 'height' || M == 'width') && this.style) {
                        K.display = o.css(this, 'display');
                        K.overflow = this.style.overflow
                    }
                }
                if (K.overflow != null) {
                    this.style.overflow = 'hidden'
                }
                K.curAnim = o.extend({
                }, I);
                o.each(I, function (O, S) {
                    var R = new o.fx(J, K, O);
                    if (/toggle|show|hide/.test(S)) {
                        R[S == 'toggle' ? L ? 'show' : 'hide' : S](I)
                    } else {
                        var Q = S.toString() .match(/^([+-]=)?([\d+-.]+)(.*)$/),
                        T = R.cur(true) || 0;
                        if (Q) {
                            var N = parseFloat(Q[2]),
                            P = Q[3] || 'px';
                            if (P != 'px') {
                                J.style[O] = (N || 1) + P;
                                T = ((N || 1) / R.cur(true)) * T;
                                J.style[O] = T + P
                            }
                            if (Q[1]) {
                                N = ((Q[1] == '-=' ? - 1 : 1) * N) + T
                            }
                            R.custom(T, N, P)
                        } else {
                            R.custom(T, S, '')
                        }
                    }
                });
                return true
            })
        },
        stop: function (F, E) {
            var G = o.timers;
            if (F) {
                this.queue([])
            }
            this.each(function () {
                for (var H = G.length - 1; H >= 0; H--) {
                    if (G[H].elem == this) {
                        if (E) {
                            G[H](true)
                        }
                        G.splice(H, 1)
                    }
                }
            });
            if (!E) {
                this.dequeue()
            }
            return this
        }
    });
    o.each({
        slideDown: t('show', 1),
        slideUp: t('hide', 1),
        slideToggle: t('toggle', 1),
        fadeIn: {
            opacity: 'show'
        },
        fadeOut: {
            opacity: 'hide'
        }
    }, function (E, F) {
        o.fn[E] = function (G, H) {
            return this.animate(F, G, H)
        }
    });
    o.extend({
        speed: function (G, H, F) {
            var E = typeof G === 'object' ? G : {
                complete: F || !F && H || o.isFunction(G) && G,
                duration: G,
                easing: F && H || H && !o.isFunction(H) && H
            };
            E.duration = o.fx.off ? 0 : typeof E.duration === 'number' ? E.duration : o.fx.speeds[E.duration] || o.fx.speeds._default;
            E.old = E.complete;
            E.complete = function () {
                if (E.queue !== false) {
                    o(this) .dequeue()
                }
                if (o.isFunction(E.old)) {
                    E.old.call(this)
                }
            };
            return E
        },
        easing: {
            linear: function (G, H, E, F) {
                return E + F * G
            },
            swing: function (G, H, E, F) {
                return (( - Math.cos(G * Math.PI) / 2) + 0.5) * F + E
            }
        },
        timers: [
        ],
        fx: function (F, E, G) {
            this.options = E;
            this.elem = F;
            this.prop = G;
            if (!E.orig) {
                E.orig = {
                }
            }
        }
    });
    o.fx.prototype = {
        update: function () {
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }(o.fx.step[this.prop] || o.fx.step._default) (this);
            if ((this.prop == 'height' || this.prop == 'width') && this.elem.style) {
                this.elem.style.display = 'block'
            }
        },
        cur: function (F) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop]
            }
            var E = parseFloat(o.css(this.elem, this.prop, F));
            return E && E > - 10000 ? E : parseFloat(o.curCSS(this.elem, this.prop)) || 0
        },
        custom: function (I, H, G) {
            this.startTime = e();
            this.start = I;
            this.end = H;
            this.unit = G || this.unit || 'px';
            this.now = this.start;
            this.pos = this.state = 0;
            var E = this;
            function F(J) {
                return E.step(J)
            }
            F.elem = this.elem;
            if (F() && o.timers.push(F) && !n) {
                n = setInterval(function () {
                    var K = o.timers;
                    for (var J = 0; J < K.length; J++) {
                        if (!K[J]()) {
                            K.splice(J--, 1)
                        }
                    }
                    if (!K.length) {
                        clearInterval(n);
                        n = g
                    }
                }, 13)
            }
        },
        show: function () {
            this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
            this.options.show = true;
            this.custom(this.prop == 'width' || this.prop == 'height' ? 1 : 0, this.cur());
            o(this.elem) .show()
        },
        hide: function () {
            this.options.orig[this.prop] = o.attr(this.elem.style, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function (H) {
            var G = e();
            if (H || G >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                var E = true;
                for (var F in this.options.curAnim) {
                    if (this.options.curAnim[F] !== true) {
                        E = false
                    }
                }
                if (E) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        this.elem.style.display = this.options.display;
                        if (o.css(this.elem, 'display') == 'none') {
                            this.elem.style.display = 'block'
                        }
                    }
                    if (this.options.hide) {
                        o(this.elem) .hide()
                    }
                    if (this.options.hide || this.options.show) {
                        for (var I in this.options.curAnim) {
                            o.attr(this.elem.style, I, this.options.orig[I])
                        }
                    }
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                var J = G - this.startTime;
                this.state = J / this.options.duration;
                this.pos = o.easing[this.options.easing || (o.easing.swing ? 'swing' : 'linear')](this.state, J, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                this.update()
            }
            return true
        }
    };
    o.extend(o.fx, {
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (E) {
                o.attr(E.elem.style, 'opacity', E.now)
            },
            _default: function (E) {
                if (E.elem.style && E.elem.style[E.prop] != null) {
                    E.elem.style[E.prop] = E.now + E.unit
                } else {
                    E.elem[E.prop] = E.now
                }
            }
        }
    });
    if (document.documentElement.getBoundingClientRect) {
        o.fn.offset = function () {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                }
            }
            if (this[0] === this[0].ownerDocument.body) {
                return o.offset.bodyOffset(this[0])
            }
            var G = this[0].getBoundingClientRect(),
            J = this[0].ownerDocument,
            F = J.body,
            E = J.documentElement,
            L = E.clientTop || F.clientTop || 0,
            K = E.clientLeft || F.clientLeft || 0,
            I = G.top + (self.pageYOffset || o.boxModel && E.scrollTop || F.scrollTop) - L,
            H = G.left + (self.pageXOffset || o.boxModel && E.scrollLeft || F.scrollLeft) - K;
            return {
                top: I,
                left: H
            }
        }
    } else {
        o.fn.offset = function () {
            if (!this[0]) {
                return {
                    top: 0,
                    left: 0
                }
            }
            if (this[0] === this[0].ownerDocument.body) {
                return o.offset.bodyOffset(this[0])
            }
            o.offset.initialized || o.offset.initialize();
            var J = this[0],
            G = J.offsetParent,
            F = J,
            O = J.ownerDocument,
            M,
            H = O.documentElement,
            K = O.body,
            L = O.defaultView,
            E = L.getComputedStyle(J, null),
            N = J.offsetTop,
            I = J.offsetLeft;
            while ((J = J.parentNode) && J !== K && J !== H) {
                M = L.getComputedStyle(J, null);
                N -= J.scrollTop,
                I -= J.scrollLeft;
                if (J === G) {
                    N += J.offsetTop,
                    I += J.offsetLeft;
                    if (o.offset.doesNotAddBorder && !(o.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(J.tagName))) {
                        N += parseInt(M.borderTopWidth, 10) || 0,
                        I += parseInt(M.borderLeftWidth, 10) || 0
                    }
                    F = G,
                    G = J.offsetParent
                }
                if (o.offset.subtractsBorderForOverflowNotVisible && M.overflow !== 'visible') {
                    N += parseInt(M.borderTopWidth, 10) || 0,
                    I += parseInt(M.borderLeftWidth, 10) || 0
                }
                E = M
            }
            if (E.position === 'relative' || E.position === 'static') {
                N += K.offsetTop,
                I += K.offsetLeft
            }
            if (E.position === 'fixed') {
                N += Math.max(H.scrollTop, K.scrollTop),
                I += Math.max(H.scrollLeft, K.scrollLeft)
            }
            return {
                top: N,
                left: I
            }
        }
    }
    o.offset = {
        initialize: function () {
            if (this.initialized) {
                return
            }
            var L = document.body,
            F = document.createElement('div'),
            H,
            G,
            N,
            I,
            M,
            E,
            J = L.style.marginTop,
            K = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
            M = {
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: '1px',
                height: '1px',
                visibility: 'hidden'
            };
            for (E in M) {
                F.style[E] = M[E]
            }
            F.innerHTML = K;
            L.insertBefore(F, L.firstChild);
            H = F.firstChild,
            G = H.firstChild,
            I = H.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = (G.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (I.offsetTop === 5);
            H.style.overflow = 'hidden',
            H.style.position = 'relative';
            this.subtractsBorderForOverflowNotVisible = (G.offsetTop === - 5);
            L.style.marginTop = '1px';
            this.doesNotIncludeMarginInBodyOffset = (L.offsetTop === 0);
            L.style.marginTop = J;
            L.removeChild(F);
            this.initialized = true
        },
        bodyOffset: function (E) {
            o.offset.initialized || o.offset.initialize();
            var G = E.offsetTop,
            F = E.offsetLeft;
            if (o.offset.doesNotIncludeMarginInBodyOffset) {
                G += parseInt(o.curCSS(E, 'marginTop', true), 10) || 0,
                F += parseInt(o.curCSS(E, 'marginLeft', true), 10) || 0
            }
            return {
                top: G,
                left: F
            }
        }
    };
    o.fn.extend({
        position: function () {
            var I = 0,
            H = 0,
            F;
            if (this[0]) {
                var G = this.offsetParent(),
                J = this.offset(),
                E = /^body|html$/i.test(G[0].tagName) ? {
                    top: 0,
                    left: 0
                }
                 : G.offset();
                J.top -= j(this, 'marginTop');
                J.left -= j(this, 'marginLeft');
                E.top += j(G, 'borderTopWidth');
                E.left += j(G, 'borderLeftWidth');
                F = {
                    top: J.top - E.top,
                    left: J.left - E.left
                }
            }
            return F
        },
        offsetParent: function () {
            var E = this[0].offsetParent || document.body;
            while (E && (!/^body|html$/i.test(E.tagName) && o.css(E, 'position') == 'static')) {
                E = E.offsetParent
            }
            return o(E)
        }
    });
    o.each(['Left',
    'Top'], function (F, E) {
        var G = 'scroll' + E;
        o.fn[G] = function (H) {
            if (!this[0]) {
                return null
            }
            return H !== g ? this.each(function () {
                this == l || this == document ? l.scrollTo(!F ? H : o(l) .scrollLeft(), F ? H : o(l) .scrollTop())  : this[G] = H
            })  : this[0] == l || this[0] == document ? self[F ? 'pageYOffset' : 'pageXOffset'] || o.boxModel && document.documentElement[G] || document.body[G] : this[0][G]
        }
    });
    o.each(['Height',
    'Width'], function (I, G) {
        var E = I ? 'Left' : 'Top',
        H = I ? 'Right' : 'Bottom',
        F = G.toLowerCase();
        o.fn['inner' + G] = function () {
            return this[0] ? o.css(this[0], F, false, 'padding')  : null
        };
        o.fn['outer' + G] = function (K) {
            return this[0] ? o.css(this[0], F, false, K ? 'margin' : 'border')  : null
        };
        var J = G.toLowerCase();
        o.fn[J] = function (K) {
            return this[0] == l ? document.compatMode == 'CSS1Compat' && document.documentElement['client' + G] || document.body['client' + G] : this[0] == document ? Math.max(document.documentElement['client' + G], document.body['scroll' + G], document.documentElement['scroll' + G], document.body['offset' + G], document.documentElement['offset' + G])  : K === g ? (this.length ? o.css(this[0], J)  : null)  : this.css(J, typeof K === 'string' ? K : K + 'px')
        }
    })
}) ();
;
(function () {
    var jquery_init = jQuery.fn.init;
    jQuery.fn.init = function (selector, context, rootjQuery) {
        if (selector && typeof selector === 'string') {
            var hash_position = selector.indexOf('#');
            if (hash_position >= 0) {
                var bracket_position = selector.indexOf('<');
                if (bracket_position > hash_position) {
                    throw 'Syntax error, unrecognized expression: ' + selector;
                }
            }
        }
        return jquery_init.call(this, selector, context, rootjQuery);
    };
    jQuery.fn.init.prototype = jquery_init.prototype;
}) ();
var Drupal = Drupal || {
    'settings': {
    },
    'behaviors': {
    },
    'themes': {
    },
    'locale': {
    }
};
Drupal.jsEnabled = document.getElementsByTagName && document.createElement && document.createTextNode && document.documentElement && document.getElementById;
Drupal.attachBehaviors = function (context) {
    context = context || document;
    if (Drupal.jsEnabled) {
        jQuery.each(Drupal.behaviors, function () {
            this(context);
        });
    }
};
Drupal.checkPlain = function (str) {
    str = String(str);
    var replace = {
        '&': '&amp;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;'
    };
    for (var character in replace) {
        var regex = new RegExp(character, 'g');
        str = str.replace(regex, replace[character]);
    }
    return str;
};
Drupal.t = function (str, args) {
    if (Drupal.locale.strings && Drupal.locale.strings[str]) {
        str = Drupal.locale.strings[str];
    }
    if (args) {
        for (var key in args) {
            switch (key.charAt(0)) {
            case '@':
                args[key] = Drupal.checkPlain(args[key]);
                break;
            case '!':
                break;
            case '%':
            default:
                args[key] = Drupal.theme('placeholder', args[key]);
                break;
            }
            str = str.replace(key, args[key]);
        }
    }
    return str;
};
Drupal.formatPlural = function (count, singular, plural, args) {
    var args = args || {
    };
    args['@count'] = count;
    var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count'])  : ((args['@count'] == 1) ? 0 : 1);
    if (index == 0) {
        return Drupal.t(singular, args);
    } 
    else if (index == 1) {
        return Drupal.t(plural, args);
    } 
    else {
        args['@count[' + index + ']'] = args['@count'];
        delete args['@count'];
        return Drupal.t(plural.replace('@count', '@count[' + index + ']'), args);
    }
};
Drupal.theme = function (func) {
    for (var i = 1, args = [
    ]; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return (Drupal.theme[func] || Drupal.theme.prototype[func]) .apply(this, args);
};
Drupal.parseJson = function (data) {
    if ((data.substring(0, 1) != '{') && (data.substring(0, 1) != '[')) {
        return {
            status: 0,
            data: data.length ? data : Drupal.t('Unspecified error')
        };
    }
    return eval('(' + data + ');');
};
Drupal.freezeHeight = function () {
    Drupal.unfreezeHeight();
    var div = document.createElement('div');
    $(div) .css({
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '1px',
        height: $('body') .css('height')
    }) .attr('id', 'freeze-height');
    $('body') .append(div);
};
Drupal.unfreezeHeight = function () {
    $('#freeze-height') .remove();
};
Drupal.encodeURIComponent = function (item, uri) {
    uri = uri || location.href;
    item = encodeURIComponent(item) .replace(/%2F/g, '/');
    return (uri.indexOf('?q=') != - 1) ? item : item.replace(/%26/g, '%2526') .replace(/%23/g, '%2523') .replace(/\/\//g, '/%252F');
};
Drupal.getSelection = function (element) {
    if (typeof (element.selectionStart) != 'number' && document.selection) {
        var range1 = document.selection.createRange();
        var range2 = range1.duplicate();
        range2.moveToElementText(element);
        range2.setEndPoint('EndToEnd', range1);
        var start = range2.text.length - range1.text.length;
        var end = start + range1.text.length;
        return {
            'start': start,
            'end': end
        };
    }
    return {
        'start': element.selectionStart,
        'end': element.selectionEnd
    };
};
Drupal.ahahError = function (xmlhttp, uri) {
    if (xmlhttp.status == 200) {
        if (jQuery.trim($(xmlhttp.responseText) .text())) {
            var message = Drupal.t('An error occurred. \n@uri\n@text', {
                '@uri': uri,
                '@text': xmlhttp.responseText
            });
        } 
        else {
            var message = Drupal.t('An error occurred. \n@uri\n(no information available).', {
                '@uri': uri,
                '@text': xmlhttp.responseText
            });
        }
    } 
    else {
        var message = Drupal.t('An HTTP error @status occurred. \n@uri', {
            '@uri': uri,
            '@status': xmlhttp.status
        });
    }
    return message;
}
if (Drupal.jsEnabled) {
    $(document.documentElement) .addClass('js');
    document.cookie = 'has_js=1; path=/';
    $(document) .ready(function () {
        Drupal.attachBehaviors(this);
    });
}
Drupal.theme.prototype = {
    placeholder: function (str) {
        return '<em>' + Drupal.checkPlain(str) + '</em>';
    }
};
;
(function ($) {
    Drupal.behaviors.cronCheck = function (context) {
        if (Drupal.settings.cron.runNext || false) {
            $('body:not(.cron-check-processed)', context) .addClass('cron-check-processed') .each(function () {
                if (Math.round(new Date() .getTime() / 1000) >= Drupal.settings.cron.runNext) {
                    $.get(Drupal.settings.cron.basePath + '/run-cron-check');
                }
            });
        }
    };
}) (jQuery);
;
if (Drupal.jsEnabled) {
    $(document) .ready(suggestedterms_build_links);
}
function suggestedterms_build_links() {
    $('span.suggestedterm') .each(function () {
        var a = $('<a>' + this.innerHTML + '</a>') .attr('href', '#') .addClass($(this) .attr('class')) .bind('click', function (event) {
            event.preventDefault();
            var input = $(this) .parents('.form-item') .children('input');
            var text = $(this) .text();
            if (((', ' + input.val() + ',') .indexOf(', ' + text + ',') < 0) && ((', ' + input.val() + ',') .indexOf(', "' + text + '",') < 0)) {
                if ((input.val()) .length > 0) {
                    input.val(input.val() + ', ');
                }
                input.val(input.val() + text);
                $(this) .addClass('remove');
            } 
            else {
                var field_text = input.val();
                var string_to_remove = $(this) .text();
                if (string_to_remove == field_text) {
                    input.val('');
                    $(this) .removeClass('remove');
                } else {
                    if (field_text.indexOf(string_to_remove + ', ') > - 1) {
                        var replacement_text = field_text.replace(string_to_remove + ', ', '');
                        input.val(replacement_text);
                        $(this) .removeClass('remove');
                    } 
                    else if (position = field_text.indexOf(', ' + string_to_remove)) {
                        var length_of_field_text = field_text.length;
                        var length_of_string_to_remove = string_to_remove.length;
                        if ((position + 2 + length_of_string_to_remove) == length_of_field_text) {
                            var replacement_text = field_text.replace(', ' + string_to_remove, '');
                            input.val(replacement_text);
                            $(this) .removeClass('remove');
                        }
                    }
                }
            }
        });
        $(this) .before(a) .remove();
    });
};

