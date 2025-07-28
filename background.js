const canvas = document.getElementById('space-bg');
const ctx = canvas.getContext('2d');
let stars = [], planets = [], ships = [];
let blackHole = { x: window.innerWidth / 2, y: window.innerHeight / 2, r: 100, angle: 0 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 200; i++) {
  stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 2, speed: Math.random() * 0.5 + 0.2 });
}
for (let i = 0; i < 3; i++) {
  planets.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 30 + 20,
    color: `hsl(${Math.random() * 360}, 60%, 50%)`,
    speed: Math.random() * 0.2 + 0.05,
    angle: Math.random() * Math.PI * 2
  });
}
for (let i = 0; i < 5; i++) {
  ships.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speedX: Math.random() * 1 - 0.5,
    speedY: Math.random() * 1 - 0.5,
    size: 4 + Math.random() * 3
  });
}

function drawBlackHole() {
  const gradient = ctx.createRadialGradient(blackHole.x, blackHole.y, blackHole.r * 0.3, blackHole.x, blackHole.y, blackHole.r);
  gradient.addColorStop(0, 'rgba(162, 89, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.save();
  ctx.translate(blackHole.x, blackHole.y);
  ctx.rotate(blackHole.angle);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, blackHole.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  blackHole.angle += 0.002;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  stars.forEach(star => {
    ctx.fillRect(star.x, star.y, star.size, star.size);
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;
  });

  planets.forEach(planet => {
    ctx.beginPath();
    ctx.fillStyle = planet.color;
    ctx.arc(planet.x, planet.y, planet.r, 0, Math.PI * 2);
    ctx.fill();
    planet.angle += planet.speed * 0.01;
    planet.x += Math.cos(planet.angle) * planet.speed;
    planet.y += Math.sin(planet.angle) * planet.speed;
  });

  ctx.fillStyle = '#a259ff';
  ships.forEach(ship => {
    ctx.fillRect(ship.x, ship.y, ship.size * 2, ship.size);
    ship.x += ship.speedX;
    ship.y += ship.speedY;
    if (ship.x < 0 || ship.x > canvas.width) ship.speedX *= -1;
    if (ship.y < 0 || ship.y > canvas.height) ship.speedY *= -1;
  });

  drawBlackHole();

  requestAnimationFrame(animate);
}
animate();
