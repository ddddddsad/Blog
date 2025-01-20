const particleEffectConfig = {
    zIndex: 2,
    opacity: 0.15,
    color: "0,0,0",
    count: 599,
    maxDistance: 6000,
    speedMultiplier: 0.2,
    particleSize: 1,
    particleColor: "rgba(0, 0, 0, 0.8)"
};

!function (config) {
    function n(n, e, t) {
        return n.getAttribute(e) || t
    }

    function e(n) {
        return document.getElementsByTagName(n)
    }

    function t() {
        var t = e("script"), o = t.length, i = t[o - 1];
        return {l: o, z: config.zIndex, o: config.opacity, c: config.color, n: config.count}
    }

    function o() {
        a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    function i() {
        r.clearRect(0, 0, a, c);
        var n, e, t, o, m, l;
        s.forEach(function (i) {
            i.x += i.xa * config.speedMultiplier;
            i.y += i.ya * config.speedMultiplier;
            i.xa *= i.x > a || i.x < 0 ? -1 : 1;
            i.ya *= i.y > c || i.y < 0 ? -1 : 1;
            r.fillRect(i.x - .5, i.y - .5, config.particleSize, config.particleSize);
            for (var x = 0; x < u.length; x++) {
                n = u[x];
                if (n !== i && n.x !== null && n.y !== null) {
                    o = i.x - n.x;
                    m = i.y - n.y;
                    l = o * o + m * m;
                    if (l < n.max) {
                        t = (n.max - l) / n.max;
                        r.beginPath();
                        r.lineWidth = t / 2;
                        r.strokeStyle = config.particleColor.replace("0.8", (t + .2));
                        r.moveTo(i.x, i.y);
                        r.lineTo(n.x, n.y);
                        r.stroke();
                    }
                }
            }
        });
        x(i);
    }

    var a, c, u, m = document.createElement("canvas"), d = t(), l = "c_n" + d.l, r = m.getContext("2d"),
        x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n) {
            window.setTimeout(n, 1e3 / 45);
        }, w = Math.random;
    
    m.id = l;
    m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o + ";pointer-events:none;";
    e("body")[0].appendChild(m);
    o();
    window.onresize = o;

    var s = [];
    for (var f = 0; d.n > f; f++) {
        var h = w() * a, g = w() * c, v = 2 * w() - 1, p = 2 * w() - 1;
        s.push({x: h, y: g, xa: v, ya: p, max: config.maxDistance});
    }
    u = s;
    setTimeout(function () {
        i();
    }, 100);
}(particleEffectConfig);
