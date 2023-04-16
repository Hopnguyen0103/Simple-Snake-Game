// Khai báo biến cho canvas và context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Khai báo biến cho kích thước ô vuông, đồng hồ, điểm số, tốc độ và chuỗi rắn ban đầu
const box = 10;
const box1 = 15;
let snake = [{ x: 200, y: 200 }];
let food = { x: Math.floor(Math.random() * 39) * box, y: Math.floor(Math.random() * 39) * box };
let bigfood = { x: Math.floor(Math.random() * 39) * box, y: Math.floor(Math.random() * 39) * box };
let score = 0;
let speed = 150;
let dx = box;
let dy = 0;

// Hàm vẽ rắn
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    // Vẽ đầu rắn thành hình tròn
    if (i === 0) {
      ctx.beginPath();
      ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    } else { // Vẽ thân rắn thành hình vuông
      ctx.fillStyle = "green";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
  }
}

// Hàm vẽ mồi
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}
function drawBigFood() {
  ctx.fillStyle = "blue";
  ctx.fillRect(bigfood.x, bigfood.y, box1, box1);
}

// Hàm cập nhật điểm số
function updateScore() {
  document.getElementById("score").innerHTML = score;
}

// Hàm di chuyển rắn và xử lý chạm tường hoặc chạm đuôi
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  // Kiểm tra nếu rắn chạm tường hoặc chạm đuôi thì kết thúc trò chơi
  if (head.x < 0 || head.x > canvas.width - box || head.y < 0 || head.y > canvas.height - box || checkCollision(head)) {
    clearInterval(gameInterval);
    document.getElementById("gameOver").style.display = "block";
  } else {
    // Thêm phần tử mới vào đầu mảng rắn
    snake.unshift(head);
    // Kiểm tra nếu rắn ăn được mồi thì cộng điểm và tăng tốc độ
    if ((head.x === food.x && head.y === food.y)) {
      score++;
      updateScore();
      speed -= 10;
      // điểm mỗi lần ăn được 4 mồi thường
      if(snake.length!=1 && (snake.length==5 || (snake.length!==6 && snake.length%5==1 ))){
        // tạo mồi xanh
        createBigNewFood();
      }else{
        // tạo mồi đỏ
        createNewFood();
      }
    }
    else if((head.x === bigfood.x && head.y === bigfood.y)){
      score+=5;
      updateScore();
      speed -= 20;
      // điểm mỗi lần ăn được 4 mồi thường
      if(snake.length!=1 && (snake.length==5 || (snake.length!==6 && snake.length%5==1 ))){
        // tạo mồi xanh
        createBigNewFood();
      }else{
        // tạo mồi đỏ
        createNewFood();
      }
    }
    else {
      // Xóa phần tử cuối cùng của mảng rắn để di chuyển
      snake.pop();
    }
  }
}
// hàm tạo mồi to hơn khi điểm đạt 5 
function createBigNewFood(){
  let newFood = { x: Math.floor(Math.random() * 39) * box, y: Math.floor(Math.random() * 39) * box };

  // Kiểm tra xem tọa độ mới của mồi có trùng với vị trí của rắn hay không
  for (let i = 0; i < snake.length; i++) {
    if (newFood.x === snake[i].x && newFood.y === snake[i].y) {
      // Nếu bị trùng, gọi lại hàm để tạo mồi mới
      return createBigNewFood();
    }
  }

  // Nếu không bị trùng, cập nhật tọa độ mới cho biến bigfood
  bigfood = newFood;
}
// Hàm kiểm tra rắn chạm đuôi
function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Hàm tạo mồi mới
function createNewFood() {
  let newFood = { x: Math.floor(Math.random() * 39) * box, y: Math.floor(Math.random() * 39) * box };

  // Kiểm tra xem tọa độ mới của mồi có trùng với vị trí của rắn hay không
  for (let i = 0; i < snake.length; i++) {
    if (newFood.x === snake[i].x && newFood.y === snake[i].y) {
      // Nếu bị trùng, gọi lại hàm để tạo mồi mới
      return createNewFood();
    }
  }

  // Nếu không bị trùng, cập nhật tọa độ mới cho biến food
  food = newFood;
}

// Xử lý sự kiện nhấn phím để di chuyển rắn
document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37: // Left arrow
      if (dx !== box) {
        dx = -box;
        dy = 0;
      }
      break;
    case 38: // Up arrow
      if (dy !== box) {
        dx = 0;
        dy = -box;
      }
      break;
    case 39: //Right arrow
    if (dx !== -box) {
    dx = box;
    dy = 0;
    }
    break;
    case 40: // Down arrow
    if (dy !== -box) {
    dx = 0;
    dy = box;
    }
    break;
    }
    });
    
    // Hàm vẽ trò chơi
    function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    if(snake.length!=1 && (snake.length==5 || (snake.length!==6 && snake.length%5==1 ))){
      drawBigFood();
    }else{
      drawFood();
    }
    }
    
    // Hàm bắt đầu trò chơi
    function startGame() {
    updateScore();
    gameInterval = setInterval(() => {
    moveSnake();
    drawGame();
    }, speed);
    }
    
    document.addEventListener("DOMContentLoaded", function() {
      
        // Bắt sự kiện nhấn nút Reset Game
        document.getElementById("resetButton").addEventListener("click", function() {
          // Thiết lập lại các biến về giá trị ban đầu
          snake = [{ x: 200, y: 200 }];
          food = { x: Math.floor(Math.random() * 39) * box, y: Math.floor(Math.random() * 39) * box };
          score = 0;
          speed = 150;
          dx = box;
          dy = 0;
          document.getElementById("gameOver").style.display = "none";
          // Bắt đầu trò chơi mới
          startGame();
        });
      });