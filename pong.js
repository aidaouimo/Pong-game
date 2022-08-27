var scoreLeft;
var scoreRight;

function Ball() {
    this.id = "ball";
    this.x = document.body.getBoundingClientRect().width / 2;
    this.y = document.body.getBoundingClientRect().height / 2;
    this.vx = 30;
    this.vy = 30;
}

function place_objects(objects) {
    for (i = 0; i < objects.length; i++) {
        var object = objects[i];
        var element = document.getElementById(object.id);
        element.style.left = object.x + "px";
        element.style.top = object.y + "px";
    }
}

function update() {
    if ((ball.x >= (document.body.getBoundingClientRect().width - 100) && ball.y > (paddle2.y - 66) && ball.y < (paddle2.y + 130))) {
        ball.vx = -ball.vx;
    }
    if (ball.x < 30 && ball.y > (paddle1.y - 66) && ball.y < (paddle1.y + 130)) {
        ball.vx = -ball.vx;
    }

    if ((ball.y < 0) || (ball.y >= (document.body.getBoundingClientRect().height - 64))) {
        ball.vy = -ball.vy;
    }
    if (ball.x < 0) {
        ball.x = document.body.getBoundingClientRect().width / 2;
        ball.y = document.body.getBoundingClientRect().height / 2;
        ball.vx *= Math.floor(Math.random() * (Math.sqrt(2) / 2) + (-Math.sqrt(2) / 2));
        ball.vy *= Math.floor(Math.random() * (Math.sqrt(2) / 2) + (-Math.sqrt(2) / 2));
        paddle2.scoreRight++;
    }
    if (ball.x >= (document.body.getBoundingClientRect().width - 64)) {
        ball.x = document.body.getBoundingClientRect().width / 2;
        ball.y = document.body.getBoundingClientRect().height / 2;
        ball.vx *= Math.floor(Math.random() * (Math.sqrt(2) / 2) + (-Math.sqrt(2) / 2));
        ball.vy *= Math.floor(Math.random() * (Math.sqrt(2) / 2) + (-Math.sqrt(2) / 2));
        paddle1.scoreLeft++;
    }

    ball.x += ball.vx;
    ball.y += ball.vy;
    document.getElementById("scores").innerHTML = paddle1.scoreLeft + " - " + paddle2.scoreRight;



    if ((paddle1.y < 0)) paddle1.y = 5;
    if (paddle1.y >= (document.body.getBoundingClientRect().height - 195)) paddle1.y = document.body.getBoundingClientRect().height - 210;
    if ((paddle2.y < 0)) paddle2.y = 5;
    if (paddle2.y >= (document.body.getBoundingClientRect().height - 195)) paddle2.y = document.body.getBoundingClientRect().height - 210;

    if (buttons.p1_down) paddle1.y += paddle1.yspeed;
    else if (buttons.p1_up) paddle1.y -= paddle1.yspeed;
    if (buttons.p2_down) paddle2.y += paddle2.yspeed;
    else if (buttons.p2_up) paddle2.y -= paddle2.yspeed;

    place_objects([ball, paddle1, paddle2]);

}

var ball;
var paddle1;
var paddle2;

function init() {
    ball = new Ball();
    paddle1 = new Paddle1();
    paddle2 = new Paddle2();
    setInterval(update, 100);
}

function Paddle1() {
    this.id = "paddle1";
    this.y = document.body.getBoundingClientRect().height / 2;
    this.yspeed = 20;
    this.scoreLeft = 0;

}

function Paddle2() {
    this.id = "paddle2";
    this.y = document.body.getBoundingClientRect().height / 2;
    this.yspeed = 20;
    this.scoreRight = 0;

}

function Button() {
    this.p2_down = false;
    this.p2_up = false;
    this.p1_down = false;
    this.p1_up = false;
}
var buttons = new Button();



function event_handler(event) {
    if (event.type == "keydown") {
        switch (event.key) {
            case "a":
                buttons.p1_up = true;
                break;
            case "q":
                buttons.p1_down = true;
                break;
            case "p":
                buttons.p2_up = true;
                break;
            case "m":
                buttons.p2_down = true;
                break;
        }
    } else if (event.type == "keyup") {
        switch (event.key) {
            case "a":
                buttons.p1_up = false;
                break;
            case "q":
                buttons.p1_down = false;
                break;
            case "p":
                buttons.p2_up = false;
                break;
            case "m":
                buttons.p2_down = false;
                break;
        }
    }
}
window.addEventListener("keydown", event_handler);
window.addEventListener("keyup", event_handler);