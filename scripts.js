// Smooth reveal on scroll
const sections = document.querySelectorAll("section");
const reveal = () => {
  const trigger = window.innerHeight * 0.8;
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < trigger) section.classList.add("visible");
  });
};

window.addEventListener("scroll", reveal);

// Particle Background Animation
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 80;
const color = "rgba(46, 139, 192, 0.6)"; // Electric Blue

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

const chart = document.getElementById('skillsBarChart');

new Chart(chart, {
  type: 'bar',
  data: {
    labels: [
      'Windows Server', 
      'Networking', 
      'Azure / Cloud', 
      'Automation / PowerShell',
      'Monitoring & SRE'
    ],
    datasets: [{
      data: [92, 86, 80, 78, 75],
      backgroundColor: [
        '#00C49A', '#0077B6', '#00B4D8', '#0096C7', '#0077B6'
      ],
      borderRadius: 6,
      barThickness: 28
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#e0e0e0', font: { family: 'Montserrat' } }
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
        border: { display: false }
      }
    }
  }
});
