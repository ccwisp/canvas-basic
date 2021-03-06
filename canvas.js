const canvas = document.querySelector('canvas');

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

const GRAVITY = 1;
const FRICTION = 0.91;

canvas.height = HEIGHT;
canvas.width = WIDTH;

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

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }

  update() {
    if (this.x + this.radius > WIDTH || this.x - this.radius < 0)
      this.dx *= -1 * FRICTION;

    if (this.y + this.radius + this.dy > HEIGHT || this.y - this.radius < 0) {
      this.dy *= -1 * FRICTION;
      this.dx *= -1 * FRICTION * 0.9;
    } else {
      this.dy += GRAVITY;
    }

    this.y += this.dy;
    this.x += this.dx;

    this.draw();
  }
}

for (let i = 0; i < 300; i++) {
  const radius = Math.random() * 30 + 2;
  const dx = Math.random() - 0.5;
  const dy = Math.random() - 0.5;
  const y = Math.random() * (HEIGHT - 300 - 2 * radius) + radius;
  const x = Math.random() * (WIDTH - 2 * radius) + radius;
  circles.push(new Circle(x, y, dx, dy, radius));
}

animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach((c) => c.update());
};

animate();
