KISSY.add('kg/custom-scrollbar/1.0.1/index',["node","base"],function(S ,require, exports, module) {
 var Node = require('node');
var Base = require('base');
var height = 0,
    contentHeight = 0,
    handelHeight = 0,
    n = 0;
var CustomScrollbar = Base.extend({
    initializer: function() {
        //var scrollbar = S.one('.custom-scrollbar'),
        this.initScrollbarHtml();
    },
    initScrollbarHtml: function() {
        var self = this;
        var scrollbar = self.get('ele'),
            onMac = self.get('onMac'),
            tpl = self.get('tpl');
        if (!scrollbar) return;
        //onMac 为false时 在MAC系统下用系统默认滚动条
        if (!onMac && navigator.userAgent.indexOf("Mac OS X") > 0) {
            scrollbar.css('overflow-y', 'scroll');
            return;
        }
        var data = {
            text: scrollbar.html()
        }
        scrollbar.html(S.substitute(tpl, data));
        self.initProp();
    },
    initProp: function() {
        var self = this;
        var scrollbar = self.get('ele');
        if (!scrollbar) return;
        self.content = scrollbar.one('.custom-scrollbar-content');
        self.track = scrollbar.one('.custom-scrollbar-track');
        self.handel = scrollbar.one('.scrollbar-handle');


        //TODO
        //if(self.get('mouseHover')){self.handel.hide();}

        height = scrollbar.height(),
            contentHeight = self.content.height();

        if (contentHeight <= height) return;
        n = contentHeight / height;
        handelHeight = parseInt(height / n);
        self.handel.style('height', handelHeight);
        self.track.style('height', height);

        self.eventBind();
    },
    //事件绑定
    eventBind: function() {
        this.mouseWheelBind();
        this.mouseMoveBind();
    },
    //鼠标滚轮事件绑定
    mouseWheelBind: function() {
        var self = this;
        //滚动轨道事件绑定
        self.track.on('mouseenter', function(e) {
            Node(document).on('mousewheel', scrollFn);
        }).on('mouseleave', function(e) {
            Node(document).detach('mousewheel', scrollFn);
        });
        //文本区域事件绑定
        self.content.on('mouseenter', function(e) {
            Node(document).on('mousewheel', scrollFn);
        }).on('mouseleave', function(e) {
            Node(document).detach('mousewheel', scrollFn);
        });

        function scrollFn(e) {
            e.halt();
            var top = parseFloat(self.handel.css('top'));
            var nowTop = top - (e.deltaY) * 10;
            if (nowTop < 0) {
                nowTop = 0;
            } else if (nowTop > height - self.handel.height()) {
                nowTop = height - self.handel.height();
            }
            self.handel.style('top', parseInt(nowTop));
            self.content.style('top', parseInt(-nowTop * n));

        }

    },
    _addMouseHover: function(self, is) {

        var self = self;

        function hideHandel() {
            self.hanndel.fideOut(0.5);
        }
        if (!self.get('mouseHover')) return;
        //开启定时器
    },
    //滚动条鼠标滑动事件绑定
    mouseMoveBind: function() {
        var self = this;
        self.handel.on('mousedown', function(ev) {
            var clientY = ev.clientY;
            var disY = clientY - self.handel.offset().top;
            ev.halt();
            document.onmousemove = function(ev) {
                var oEvent = ev || event;
                var top = oEvent.clientY - disY;
                if (top < 0) {
                    top = 0;
                } else if (top > self.track.height() - self.handel.height()) {
                    top = self.track.height() - self.handel.height();
                };
                self.handel.style('top', parseInt(top));
                self.content.style('top', parseInt(-top * n));
                return false;
            }
            document.onmouseup = function() {
                document.onmouseup = null;
                document.onmousemove = null;
            };
        });
    }
}, {
    ATTRS: {
        ele: {
            value: null
        },
        tpl: {
            value: '<div class="custom-scrollbar-track">' +
                '<span class="scrollbar-handle"></span>' +
                '</div>' +
                '<div class="custom-scrollbar-content">{text}</div>'
        },
        //mac 下默认为true  false关闭次滚动条
        onMac: {
            value: true
        },
        mouseHover: {
            value: false
        }
    }
});

module.exports = CustomScrollbar;
});