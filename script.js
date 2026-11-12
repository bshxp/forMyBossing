// Edit your names, start date, love letter, and tulip notes right here:
const MONTHSARY_DATA = {
  herName: "My Love",
  yourName: "Lalove mo",
  startDate: "2026-08-13",
  letter:
    "Happy 3rd monthsary lalove ko! alala mo yung mga araw na nag hahanap lang tayo ng website para sa para sa mga flowers, para sa certificates ng kasal HAHAHA! ngayon ito na, life time subscription to boi! Gutso ko lang sabihin sayo na, Kahit anong bagay, thoughts, bagyo, hamon ang dumating sa buhay, maasahan mong may kasama ka palagi, Ako. Hinding hinding hindi po ako mawawala sayo lalove ko! MWA ***",
  tulipNotes: [
    { title: "Tulip I", text: "Lalove, isang ngiti mo lang po buo na ang araw ko!" },
    { title: "Tulip II", text: "Ako na ang pinakamaswerteng tao sa mundo, kasi mayroon akong ikaw." },
    { title: "Tulip III", text: "Pangako po lalove ko na taoyng dalawa lang, tayo na to. Palagi." },
    { title: "Tulip IV", text: "Lalove kahit maging siomai ka, hindi kita ipagpapalit okay? sayong sayong sayo po ako!." },
    { title: "Tulip V", text: "Sa tuwing nakikita kita, yung uod sa tyan ko nagiging paruparo" },
    { title: "Tulip VI", text: "Deserve mo ang lahat mga magagandang bagay sa mundong ito, deseve mo ako, tayo!" }
  ]
};

// Render Content
function renderContent() {
  document.getElementById("her-name-display").textContent = MONTHSARY_DATA.herName;
  document.getElementById("letter-her-name").textContent = MONTHSARY_DATA.herName;
  document.getElementById("your-name-display").textContent = MONTHSARY_DATA.yourName || "";
  document.getElementById("letter-body").textContent = MONTHSARY_DATA.letter;

  const parsedDate = new Date(MONTHSARY_DATA.startDate + "T00:00:00");
  document.getElementById("date-display").textContent = parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const tulipGrid = document.getElementById("tulip-grid");
  tulipGrid.innerHTML = "";

  MONTHSARY_DATA.tulipNotes.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "tulip-card";
    card.innerHTML = `
      <span class="tulip-icon">🌷</span>
      <h3 class="tulip-card-title">${item.title || `Tulip ${index + 1}`}</h3>
      <span class="tulip-tap-label">Tap to bloom</span>
      <p class="tulip-note">${item.text}</p>
    `;
    card.addEventListener("click", (e) => {
      card.classList.toggle("bloomed");
      burstPetals(10, e.clientX, e.clientY);
    });
    tulipGrid.appendChild(card);
  });
}

// Live Counter
function updateCounter() {
  const start = new Date(MONTHSARY_DATA.startDate + "T00:00:00").getTime();
  const now = Date.now();
  const diff = Math.max(0, now - start);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCounter, 1000);

// Theme Toggle (Black vs White)
const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

themeBtn.addEventListener("click", () => {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-theme") === "dark";
  html.setAttribute("data-theme", isDark ? "light" : "dark");
  themeIcon.textContent = isDark ? "🌙" : "☀️";
  themeLabel.textContent = isDark ? "Dark Mode" : "Light Mode";
});

// Wax Seal Love Letter Toggle
const envelopeCard = document.getElementById("envelope-card");
const waxSeal = document.getElementById("wax-seal");

waxSeal.addEventListener("click", (e) => {
  envelopeCard.classList.toggle("opened");
  if (envelopeCard.classList.contains("opened")) {
    burstPetals(24, e.clientX, e.clientY);
  }
});

// Falling Sakura Petals & Gold Sparkles Canvas
const canvas = document.getElementById("petals-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Petal {
  constructor(burst = false, originX = null, originY = null) {
    const spread = Math.min(160, canvas.width * 0.35);
    this.x = burst
      ? (originX ?? canvas.width / 2) + (Math.random() - 0.5) * spread
      : Math.random() * canvas.width;
    this.y = burst ? (originY ?? canvas.height * 0.35) : -20;
    this.size = Math.random() * 6 + 4.5;
    this.speedY = burst ? Math.random() * 3 + 1.5 : Math.random() * 1.4 + 0.6;
    this.speedX = (Math.random() - 0.5) * (burst ? 4.5 : 1.2);
    this.rotation = Math.random() * Math.PI * 2;
    this.spin = (Math.random() - 0.5) * 0.04;
    this.isGold = Math.random() < 0.25;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.y * 0.015) * 0.4;
    this.rotation += this.spin;
    if (this.y > canvas.height + 20) {
      this.y = -20;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.isGold ? "rgba(212, 175, 55, 0.75)" : "rgba(255, 183, 197, 0.8)";
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Adjust initial particle count based on screen width for smooth mobile performance
const initialCount = window.innerWidth < 600 ? 20 : 32;
for (let i = 0; i < initialCount; i++) {
  const p = new Petal();
  p.y = Math.random() * canvas.height;
  particles.push(p);
}

function burstPetals(count = 20, originX = null, originY = null) {
  for (let i = 0; i < count; i++) {
    particles.push(new Petal(true, originX, originY));
  }
  const maxParticles = window.innerWidth < 600 ? 75 : 110;
  if (particles.length > maxParticles) {
    particles.splice(0, particles.length - maxParticles);
  }
}

document.getElementById("bouquet").addEventListener("click", (e) => {
  burstPetals(28, e.clientX, e.clientY);
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

// Initialize
renderContent();
updateCounter();
animate();