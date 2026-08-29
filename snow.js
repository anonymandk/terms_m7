(function () {
    var canvas = document.getElementById("snow-canvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var flakes = [];
    var flakeCount = 90;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function makeFlake() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2.2 + 0.6,
            speedY: Math.random() * 0.6 + 0.25,
            speedX: Math.random() * 0.4 - 0.2,
            drift: Math.random() * Math.PI * 2,
            driftSpeed: Math.random() * 0.015 + 0.005,
            opacity: Math.random() * 0.5 + 0.25
        };
    }

    function init() {
        resize();
        flakes = [];
        for (var i = 0; i < flakeCount; i++) {
            flakes.push(makeFlake());
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";

        for (var i = 0; i < flakes.length; i++) {
            var f = flakes[i];
            ctx.globalAlpha = f.opacity;
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    function update() {
        for (var i = 0; i < flakes.length; i++) {
            var f = flakes[i];
            f.drift += f.driftSpeed;
            f.y += f.speedY;
            f.x += f.speedX + Math.sin(f.drift) * 0.3;

            if (f.y > canvas.height + 5) {
                f.y = -5;
                f.x = Math.random() * canvas.width;
            }
            if (f.x > canvas.width + 5) f.x = -5;
            if (f.x < -5) f.x = canvas.width + 5;
        }
    }

    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    init();
    draw();

    if (!reduceMotion) {
        requestAnimationFrame(loop);
    }
})();
