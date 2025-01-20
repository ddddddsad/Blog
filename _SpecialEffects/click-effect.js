document.addEventListener("DOMContentLoaded", function() {
    const clickEffectConfig = {
        colours: ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"],
        minBallCount: 10,
        maxBallCount: 20,
        longPressMinBallCount: 50,
        longPressMaxBallCount: 100,
        minBallRadius: 8,
        maxBallRadius: 12,
        ballRadiusDecay: 0.3,
        ballVelocityDecay: 0.9,
        normalMultiplier: 6,
        longPressMultiplier: 14,
        multiplierIncrement: 0.2,
        multiplierDecrement: 0.4,
        longPressDuration: 500
    };

    function clickEffect() {
        let balls = [];
        let longPressed = false;
        let longPress;
        let multiplier = 0;
        let width, height;
        let origin;
        let normal;
        let ctx;
        const config = clickEffectConfig;
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.classList.add("canvas-container");

        const pointer = document.createElement("span");
        pointer.classList.add("pointer");
        document.body.appendChild(pointer);

        if (canvas.getContext && window.addEventListener) {
            ctx = canvas.getContext("2d");
            updateSize();
            window.addEventListener('resize', updateSize, false);
            loop();
            window.addEventListener("mousedown", function(e) {
                pushBalls(randBetween(config.minBallCount, config.maxBallCount), e.clientX, e.clientY);
                document.body.classList.add("is-pressed");
                longPress = setTimeout(function(){
                    document.body.classList.add("is-longpress");
                    longPressed = true;
                }, config.longPressDuration);
            }, false);
            window.addEventListener("mouseup", function(e) {
                clearTimeout(longPress);
                if (longPressed == true) {
                    document.body.classList.remove("is-longpress");
                    pushBalls(randBetween(config.longPressMinBallCount + Math.ceil(multiplier), config.longPressMaxBallCount + Math.ceil(multiplier)), e.clientX, e.clientY);
                    longPressed = false;
                }
                document.body.classList.remove("is-pressed");
            }, false);
            window.addEventListener("mousemove", function(e) {
                let x = e.clientX;
                let y = e.clientY;
                pointer.style.top = y + "px";
                pointer.style.left = x + "px";
            }, false);
        } else {
            console.log("canvas or addEventListener is unsupported!");
        }

        function updateSize() {
            canvas.width = window.innerWidth * 2;
            canvas.height = window.innerHeight * 2;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(2, 2);
            width = (canvas.width = window.innerWidth);
            height = (canvas.height = window.innerHeight);
            origin = {
                x: width / 2,
                y: height / 2
            };
            normal = {
                x: width / 2,
                y: height / 2
            };
        }

        class Ball {
            constructor(x = origin.x, y = origin.y) {
                this.x = x;
                this.y = y;
                this.angle = Math.PI * 2 * Math.random();
                if (longPressed == true) {
                    this.multiplier = randBetween(config.longPressMultiplier, config.longPressMultiplier + 1) + multiplier;
                } else {
                    this.multiplier = randBetween(config.normalMultiplier, config.normalMultiplier * 2);
                }
                this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
                this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
                this.r = randBetween(config.minBallRadius, config.maxBallRadius) + 3 * Math.random();
                this.color = config.colours[Math.floor(Math.random() * config.colours.length)];
            }
            update() {
                this.x += this.vx - normal.x;
                this.y += this.vy - normal.y;
                normal.x = -2 / window.innerWidth * Math.sin(this.angle);
                normal.y = -2 / window.innerHeight * Math.cos(this.angle);
                this.r -= config.ballRadiusDecay;
                this.vx *= config.ballVelocityDecay;
                this.vy *= config.ballVelocityDecay;
            }
        }

        function pushBalls(count = 1, x = origin.x, y = origin.y) {
            for (let i = 0; i < count; i++) {
                balls.push(new Ball(x, y));
            }
        }

        function randBetween(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function loop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < balls.length; i++) {
                let b = balls[i];
                if (b.r < 0) continue;
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
                ctx.fill();
                b.update();
            }
            if (longPressed == true) {
                multiplier += config.multiplierIncrement;
            } else if (!longPressed && multiplier >= 0) {
                multiplier -= config.multiplierDecrement;
            }
            removeBall();
            requestAnimationFrame(loop);
        }

        function removeBall() {
            balls = balls.filter(b => b.r > 0);
        }
    }

    clickEffect(); // 启动特效
});
