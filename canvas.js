const canvas = document.querySelector('canvas');

const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;

canvas.height = innerHeight;
canvas.width = innerWidth;

const c = canvas.getContext('2d');

const circleArray = [];
const colors = ['#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];

const mouse = {
  x: undefined,
  y: undefined,
};

const mouseRadius = 50;
const maxRadius = 300;

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    //Interactive Part

    if (
      mouse.x - this.x < mouseRadius &&
      mouse.x - this.x > -mouseRadius &&
      mouse.y - this.y < mouseRadius &&
      mouse.y - this.y > -mouseRadius
    ) {
      if (this.radius < maxRadius) this.radius += 1;
    } else if (this.radius > this.minRadius) this.radius -= 1;

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

//Creating circles
for (let i = 0; i < 2500; i++) {
  let radius = Math.random() * 3 + 1;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 2;
  let dy = (Math.random() - 0.5) * 2;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

//Animation
animate = () => {
  requestAnimationFrame(animate);

  c.fillStyle = '#264653';
  c.fillRect(0, 0, innerWidth, innerHeight);

  circleArray.forEach((c) => c.update());
};

animate();
