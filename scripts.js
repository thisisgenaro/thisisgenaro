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

window.addEventListener('load', function () {
  const chart = new CanvasJS.Chart("skillsChart", {
    animationEnabled: true,
    backgroundColor: "transparent",
    axisX: {
      lineThickness: 0,
      tickLength: 0,
      labelFontColor: "#e0e0e0",
      labelFontSize: 14,
      labelFontFamily: "Montserrat",
    },
    axisY: {
      lineThickness: 0,
      gridThickness: 0,
      tickLength: 0,
      labelFormatter: () => " ",
    },
    data: [{
      type: "bar",
      color: "#00C49A", // default teal color
      indexLabelFontColor: "#e0e0e0",
      indexLabelFontFamily: "Montserrat",
      indexLabelFontSize: 14,
      indexLabelPlacement: "outside",
      indexLabelFontWeight: "bold",
      indexLabel: "{y}%",
      dataPoints: [
        { y: 92, label: "Windows Server", color: "#00C49A" },
        { y: 86, label: "Networking", color: "#0077B6" },
        { y: 80, label: "Azure / Cloud", color: "#00B4D8" },
        { y: 78, label: "Automation / PowerShell", color: "#0096C7" },
        { y: 75, label: "Monitoring & SRE", color: "#0077B6" }
      ]
    }]
  });

  chart.render();
});
