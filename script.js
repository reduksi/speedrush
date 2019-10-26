    var anim_id;
    var last;
    var next;
    //dom
    var container = document.querySelector('#container');
    var car = document.querySelector('#car');
    var car_1 = document.querySelector('#car_1');
    var car_2 = document.querySelector('#car_2');
    var car_3 = document.querySelector('#car_3');
    var car_4 = document.querySelector('#car_4');
    var line_1 = document.querySelector('#line_1');
    var line_2 = document.querySelector('#line_2');
    var line_3 = document.querySelector('#line_3');

    var line2_1 = document.querySelector('#line2_1');
    var line2_2 = document.querySelector('#line2_2');
    var line2_3 = document.querySelector('#line2_3');
    var restart_div = document.querySelector('#restart_div');
    var restart_btn =document.querySelector('#restart')
    var score = document.getElementById("score");

    //saving some initial setup
    // var container_left = parseInt(window.getComputedStyle(container).getPropertyValue('left'));
    var container_width = parseInt(window.getComputedStyle(container).getPropertyValue('width'));
    var container_height = parseInt(window.getComputedStyle(container).getPropertyValue('height'));
    var car_width = parseInt(window.getComputedStyle(car).getPropertyValue('width'));
    var car_height = parseInt(window.getComputedStyle(car).getPropertyValue('height'));

    //some other declarations
    var game_over = false;

    var score_counter = 1;

    var speed = 3;
    var line_speed = 5;

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

    document.addEventListener('keydown', function(event) {
        var key = event.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
     });
     document.addEventListener('keyup', function(event) {
        var key = event.keyCode;
        if(game_over === false){
            if (key === 37) {
                cancelAnimationFrame(move_left);
                car.style.transform = 'rotate(0deg)'
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                car.style.transform = 'rotate(0deg)'
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
            
     });

    function left() {
        if (game_over === false && parseInt(window.getComputedStyle(car).getPropertyValue('left')) > 0) {
            car.style.left = parseInt(window.getComputedStyle(car).getPropertyValue('left')) - 7 + 'px'
            car.style.transform = 'rotate(-10deg)'
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (game_over === false && parseInt(window.getComputedStyle(car).getPropertyValue('left')) < container_width - car_width) {
            car.style.left = parseInt(window.getComputedStyle(car).getPropertyValue('left')) + 7 + 'px'
            car.style.transform = 'rotate(10deg)'
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(window.getComputedStyle(car).getPropertyValue('top')) > 0) {
            car.style.top = parseInt(window.getComputedStyle(car).getPropertyValue('top')) - 1 + 'px'
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(window.getComputedStyle(car).getPropertyValue('top')) < container_height - car_height) {
            car.style.top = parseInt(window.getComputedStyle(car).getPropertyValue('top')) + 3 + 'px'
            move_down = requestAnimationFrame(down);
        }
    }

    /* Move the cars and lines */
    anim_id = requestAnimationFrame(repeat);

    function repeat() {
        if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3) || collision(car, car_4)) {
            stop_the_game();
            return;
        }

        score_counter++;

        if (score_counter % 20 == 0) {
            score.innerHTML = "" + (parseInt(score.innerHTML) + 1);
        }
        if (score_counter % 300 == 0) {
            speed++;
            line_speed++;
        }

        car_down(car_1);
        car_down(car_2);
        car_down(car_3);
        car_down(car_4);

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);
        line_down(line2_1);
        line_down(line2_2);
        line_down(line2_3);

        anim_id = requestAnimationFrame(repeat);
    }

    function car_down(car) {
        var car_current_top = parseInt(window.getComputedStyle(car).getPropertyValue('top'));
        if (car_current_top > container_height) {
            car_current_top = -1000;
            var car_left = ['7%', '42%', '75%']; 
            while( next === last ) {
                next = car_left[Math.floor(Math.random() * car_left.length)];
            } last = next;
            car.style.left = next
        }
        car.style.top = car_current_top + speed + 'px'
    }

    function line_down(line) {
        var line_current_top = parseInt(window.getComputedStyle(line).getPropertyValue('top'));
        if (line_current_top > container_height) {
            line_current_top = -210;
        }
        line.style.top = line_current_top + line_speed + 'px'
    }
    restart_btn.addEventListener('click', function(event) {
        window.location.replace("index.html");
     });


    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.className = 'show'
        restart_btn.focus();
        return;
    }

    /* ------------------------------GAME CODE ENDS HERE------------------------------------------- */


    function collision(div1, div2) {
        var x1 = div1.getBoundingClientRect().left;
        var y1 = div1.getBoundingClientRect().top;
        var h1 = div1.offsetHeight;
        var w1 = div1.offsetWidth;
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = div2.getBoundingClientRect().left;
        var y2 = div2.getBoundingClientRect().top;
        var h2 = div2.offsetHeight;
        var w2 = div2.offsetWidth;
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }