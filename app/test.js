var _KITE_ROOT = "https://kite.zerodha.com";
! function() {
    function t(t, e) {
        this.clear = function() {
            d("#kite-modal-wrap").fadeOut(200, function() {
                d(this).remove(), k = null, b = null
            })
        };
        var n = (d(window).width(), d(window).height(), screen.width / 2 < 500 ? 500 : screen.width / 2, screen.height / 1.5 < 500 ? 500 : screen.height / 1.5, d("<div id='kite-modal'>")),
            i = d("<iframe id='kite-frame'>").attr("scrolling", "no"),
            a = d("<a href='#' title='Close'>").html("&times;").attr("id", "kite-close");
        a.click(function() {
            return confirm("Do you want to abandon this transaction and go back?") && (b && b.callback("cancelled", null), k && k.clear()), !1
        }), d("body").append(d("<div id='kite-modal-wrap'>").append(n)), n.append(a).append(i);
        var r = i.contents()[0];
        return r.open(), r.write("<!doctype html><html><head></head><body></body></html>"), r.close(), k = this, i.contents().find("body")
    }

    function e(t, e, n, i) {
        var a = this;
        this.clear = function() {
            a.win.close()
        }, k && k.clear();
        d(window).width(), d(window).height();
        n || (n = screen.width / 2 < 500 ? 500 : screen.width / 2), i || (i = screen.height / 1.5 < 500 ? 500 : screen.height / 1.8);
        var r = screen.width / 2 - n / 2,
            o = screen.height / 2 - i / 2,
            c = "width=%,height=%,left=%,top=%,status=no,menubar=no,toolbar=no,scrollbars=yes".replace("%", n).replace("%", i).replace("%", r).replace("%", o);
        return this.win = window.open(t, e, c), k = this, d(this.win.document).find("body")
    }

    function n(t, e) {
        var n = d("<input>").attr("name", t).attr("type", "hidden").attr("value", e);
        return n
    }

    function i(t, e, i) {
        var a = d("<form>");
        a.attr("method", i).attr("action", e);
        for (f in t) t.hasOwnProperty(f) && a.append(n(f, t[f]));
        return a
    }

    function a(t, e) {
        var n = {
            data: JSON.stringify(t)
        };
        for (var i in e) e.hasOwnProperty(i) && (n[i] = e[i]);
        return n
    }

    function r(t, e, n, i) {
        if (e = e || 2, n = n || 25, i = i || 200, t.hasOwnProperty("offset"))
            for (var a = t.offset().left, r = (a + t.outerWidth(), 1); e >= r; r++) t.animate({
                left: "-=" + n
            }, i / e / 4).animate({
                left: "+=" + n
            }, i / e / 2).animate({
                left: "+=0"
            }, i / e / 4)
    }

    function o() {
        var t = ["variety", "exchange", "tradingsymbol", "transaction_type", "quantity", "order_type", "price", "trigger_price", "product", "validity", "readonly", "tag"],
            e = d("*[data-kite]");
        e.each(function(e, n) {
            if (n = d(n), !n.data("kite-converted")) {
                n.data("kite-converted", 1);
                for (var i = n.data("kite"), a = {
                        variety: "regular"
                    }, r = 0; r < t.length; r++) a[t[r]] = n.data(t[r]);
                i && a.exchange && a.tradingsymbol && a.quantity && a.transaction_type && (ki = new KiteConnect(i), ki.add(a), ki.link(n), "KITE-BUTTON" == n.prop("tagName").toUpperCase() && (n.addClass("kite-" + a.transaction_type.toLowerCase()), n.attr("title", a.transaction_type + " " + a.tradingsymbol)))
            }
        })
    }

    function c() {
        d(window).on("message", function(t) {
            t = t.originalEvent;
            var e = d("<a>").attr("href", t.origin).get(0);
            if (-1 != m.indexOf(e.hostname) && t.data) {
                try {
                    var n = JSON.parse(t.data)
                } catch (t) {
                    return
                }
                if (n.hasOwnProperty("type")) switch (n.type) {
                    case "finished":
                        setTimeout(function() {
                            r(d("#kite-modal"))
                        }, 500);
                        break;
                    case "resize":
                        if (n.hasOwnProperty("height") && "number" == typeof n.height) {
                            var i = n.height,
                                a = d(window).height();
                            i > 250 && a - 90 > i && Math.abs(a - i) > 100 ? (d("#kite-frame").attr("scrolling", "no"), d("#kite-modal").height(i)) : i > d(window).height() && d("#kite-frame").attr("scrolling", "auto")
                        }
                        break;
                    case "basket":
                        n.hasOwnProperty("request_token") && n.hasOwnProperty("status") && ("completed" != n.status && "cancelled" != n.status || b && (b.callback(n.status, n.request_token), k && k.clear()));
                        break;
                    case "login":
                        n.hasOwnProperty("request_token") && n.hasOwnProperty("status") && b && (b.callback(n.status, n.request_token), k && k.clear())
                }
            }
        })
    }

    function s(t) {
        d = t, d(document).ready(function() {
            d("body").append(d("<link>").attr("rel", "stylesheet").attr("href", l + p)), o(), d(document).bind("DOMNodeInserted", function(t) {
                d(t.target).data("kite") && o()
            }), c()
        }), O = !0
    }
    if (window.hasOwnProperty("KiteConnect")) return !1;
    var d = null,
        l = "undefined" != typeof _KITE_ROOT ? _KITE_ROOT : "https://kite.trade",
        h = "/connect/basket",
        u = "/connect/login",
        p = "/static/build/css/publisher.min.css",
        y = ["variety", "exchange", "tradingsymbol", "transaction_type", "quantity", "order_type", "price", "trigger_price", "product", "validity", "readonly", "tag"],
        g = 50,
        w = {
            redirect_url: 1,
            api_key: 1
        },
        m = ["kite.zerodha.net", "kite.zerodha.com", "localhost", "127.0.0.1"],
        v = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Trident|IEMobile|Edge|Opera Mini/i.test(navigator.userAgent),
        k = null,
        b = null,
        O = !1;
    window.KiteConnect = function(n) {
        var r = [],
            o = {},
            c = null,
            s = (Math.floor(Math.random() * Math.pow(10, 8)), this);
        this.login = function() {
            var a = v ? t("", "Kite") : e("", "Kite", 475);
            b = s;
            var r = d("<h2>");
            r.attr("style", "font-family: 'Segoe UI', 'Helvetica Neue', 'Helvetica', sans; text-align: center; margin-top: 60px;color: #666;font-weight: 200"), r.text("Connecting to Kite ..."), a.append(r);
            var o = i({
                api_key: n,
                view: "popup"
            }, l + u, "get");
            return a.append(o),
                function(t) {
                    setTimeout(function() {
                        t.submit()
                    }, 500)
                }(o), !1
        }, this.connect = function(n) {
            if (r.length < 0) return !1;
            b = s;
            var c = v ? t("", "Kite") : e("", "Kite"),
                u = d("<h2>");
            u.attr("style", "font-family: 'Segoe UI', 'Helvetica Neue', 'Helvetica', sans; text-align: center; margin-top: 60px;color: #666;font-weight: 200"), u.text("Connecting to Kite ..."), c.append(u);
            var p = i(a(r, o), l + h, "post");
            return c.append(p),
                function(t) {
                    setTimeout(function() {
                        t.submit()
                    }, 500)
                }(p), !1
        }, this.finished = function(t) {
            c = t
        }, this.renderButton = function(t) {
            if ("string" == typeof t && (t = d(t)), t && "object" == typeof t) {
                var e = d("<button>").attr("title", "Trade with Kite").attr("class", "kite-trade-button");
                1 == r.length && (e.addClass("kite-" + r[0].transaction_type.toLowerCase()), e.attr("title", r[0].transaction_type + " " + r[0].tradingsymbol)), e.click(function(t) {
                    return t.preventDefault(), d(this).blur(), s.connect(), !1
                }), d(t).append(e)
            }
        }, this.link = function(t) {
            "string" == typeof t && (t = d(t)), t && "object" == typeof t && t.click(function(t) {
                return t.preventDefault(), d(this).blur(), s.connect(), !1
            })
        }, this.add = function(t) {
            if (r.length >= g) return !1;
            for (var e = 0; e < arguments.length; e++) {
                for (var n = {}, t = arguments[e], i = 0; i < y.length; i++) t.hasOwnProperty(y[i]) ? n[y[i]] = t[y[i]] : n[y[i]] = "";
                "BUY" != n.transaction_type && "SELL" != n.transaction_type && (n.transaction_type = "BUY"), r.push(n)
            }
        }, this.setOption = function(t, e) {
            w.hasOwnProperty(t) && (o[t] = e)
        }, this.get = function() {
            return JSON.parse(JSON.stringify(r))
        }, this.count = function() {
            return r.length
        }, this.html = function() {
            var t = i(a(r, o), l + h, "post");
            return d("<div>").append(t).html()
        }, this.callback = function(t, e) {
            "function" == typeof c && c(t ? t : t.cancelled, e ? e : null)
        }, this.setOption("api_key", n), this.setOption("redirect_url", "#")
    }, window.KiteConnect.ready = function(t) {
        O ? t() : ! function(t) {
            window.setTimeout(function() {
                window.KiteConnect.ready(t)
            }, 50)
        }(t)
    };
    var _ = !0;
    if (window.hasOwnProperty("jQuery") && jQuery.hasOwnProperty("fn") && jQuery.fn.hasOwnProperty("jquery")) {
        var P = parseFloat(jQuery.fn.jquery);
        !isNaN(P) && P >= 1.6 && (_ = !1, s(jQuery))
    }
    if (_) {
        var j = document.createElement("script");
        j.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
        var C = document.getElementsByTagName("head")[0],
            K = !1;
        j.onload = j.onreadystatechange = function() {
            K || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (K = !0, s(jQuery), j.onload = j.onreadystatechange = null, C.removeChild(j))
        }, C.appendChild(j)
    }
}();