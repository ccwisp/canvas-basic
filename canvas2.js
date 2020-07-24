const canvas = document.querySelector('canvas');

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const GRAVITY = 1;
const FRICTION = 0.88;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext('2d');

const circles = [];

const colors = ['#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  update = () => {
    if (this.x + this.radius > WIDTH || this.x - this.radius < 0) this.dx *= -1;
    if (this.y + this.radius + this.dy > HEIGHT || this.y - this.radius < 0) {
      this.dy *= -1 * FRICTION;
    } else {
      this.dy += GRAVITY;
    }

    this.y += this.dy;

    this.draw();
  };
}

for (let i = 0; i < 500; i++) {
  const radius = Math.random() * 20 + 5;
  const x = Math.random() * (WIDTH - 2 * radius) + radius;
  const y = Math.random() * (HEIGHT - 2 * radius) + radius;
  const dx = Math.random() * 4;
  const dy = Math.random() * 4;
  circles.push(new Circle(x, y, dx, dy, radius));
}

animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  circles.forEach((c) => c.update());
};

animate();
