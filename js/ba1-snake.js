'use strict';


//Ở đây ta tạo ra bộ khung chứa game

const canvas = document.getElementById('game');

const context = canvas.getContext('2d');

const scorePlaceElement = document.querySelector('#scorePlace');

const inputNameElement = document.getElementById('nameInput');

const namePlaceElement = document.querySelector('#namePlace');

const btnOkElement = document.querySelector('#btnOk');

const containerElement = document.querySelector('#container');

const formMainWrapperElement = document.querySelector('#formMainWrapper');

if (btnOkElement && containerElement && formMainWrapperElement) {

    btnOkElement.addEventListener('click', (e) => {
        e.preventDefault();
        formMainWrapperElement.classList.toggle('none');
        containerElement.classList.remove('none');
        getName();
    })
}

const getName = () => {
    const inputNameElement = document.getElementById('nameInput');

    let nameValue = inputNameElement.value;

    namePlaceElement.innerText = nameValue;

}


const grid = 16;
// khởi tạo đối tượng rắn là 1 ô vuông

const snake = {

    x: 160, //vị trí của snake theo hướng x,y

    y: 160,

    dx: grid, //hướng di chuyển theo phương x hoặc y,ở đây khi start game 
    //snake sẽ di chuyển theo x direction với value = 16

    dy: 0,

    cells: [],

    maxCells: 3

};

let count = 0;

const apple = {

    x: 320,

    y: 320

};


const getRandomInt = (min, max) => {

    return Math.floor(Math.random() * (max - min)) + min;

}


// game loop

const loop = () => {
    //hàm này giống như setTimeout, sẽ gọi lại hàm loop khi loop thực thi xong

    requestAnimationFrame(loop);


    // slow game loop to 15 fps instead of 60 - 60/15 = 4

    if (++count < 4) {

        return;

    }


    count = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);


    snake.x += snake.dx; // mỗi loop rắn sẽ di chuyển thêm 1dx đơn vị

    snake.y += snake.dy;


    // khi snake đụng tường sẽ chạy lại từ edge đối diện

    if (snake.x < 0) {

        snake.x = canvas.width - grid;

    } else if (snake.x >= canvas.width) {

        snake.x = 0;

    }


    if (snake.y < 0) {

        snake.y = canvas.height - grid;

    } else if (snake.y >= canvas.height) {

        snake.y = 0;

    }


    // Phương thức unshift sẽ thêm một hoặc nhiều phần tử vào đầu mảng

    snake.cells.unshift({
        x: snake.x,
        y: snake.y
    });


    // thêm 1 ô vuông phía trc thì phải remove 1 cái phía sau để snake move dc.

    if (snake.cells.length > snake.maxCells) {

        snake.cells.pop();

    }


    // draw apple

    context.fillStyle = 'red';

    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);


    // draw snake

    context.fillStyle = 'green';

    snake.cells.forEach((cell, index) => {

        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        let score = 0;
        // snake ate apple

        if (cell.x === apple.x && cell.y === apple.y) {

            snake.maxCells++;
            score = snake.maxCells - 3;
            console.log(`ahuoheof ${score}`);

            apple.x = getRandomInt(0, 25) * grid;

            apple.y = getRandomInt(0, 25) * grid;
            scorePlaceElement.innerText = score;
        }


        // check va chạm khi rắn đụng đuôi

        for (let i = index + 1; i < snake.cells.length; i++) {



            // va chạm thì reset game

            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                scorePlaceElement.innerText = '0';

                snake.x = 160;

                snake.y = 160;

                snake.cells = [];

                snake.maxCells = 3;

                snake.dx = grid;

                snake.dy = 0;


                apple.x = getRandomInt(0, 25) * grid;

                apple.y = getRandomInt(0, 25) * grid;

            }

        }

    });

}

//bắt sự kiện bàn phím ấn xuống

document.addEventListener('keydown', function (e) {

    // lọc sự kiện keydown để rắn không di ngược lại

    if (e.which === 37 && snake.dx === 0) {

        snake.dx = -grid;

        snake.dy = 0;

    } else if (e.which === 38 && snake.dy === 0) {

        snake.dy = -grid;

        snake.dx = 0;

    } else if (e.which === 39 && snake.dx === 0) {

        snake.dx = grid;

        snake.dy = 0;

    } else if (e.which === 40 && snake.dy === 0) {

        snake.dy = grid;

        snake.dx = 0;

    }

});


requestAnimationFrame(loop);