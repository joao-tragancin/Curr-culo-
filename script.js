// Seleção dos elementos interativos da página
const welcomeButton = document.getElementById("welcomeButton");
const toggleSkillsButton = document.getElementById("toggleSkills");
const skillsContent = document.getElementById("skillsContent");
const greetingForm = document.getElementById("greetingForm");
const visitorName = document.getElementById("visitorName");
const personalGreeting = document.getElementById("personalGreeting");
const formMessage = document.getElementById("formMessage");
const themeButton = document.getElementById("themeButton");

// Funcionalidade 1: exibe uma mensagem de boas-vindas
welcomeButton.addEventListener("click", () => {
  alert("Olá! Obrigado por visitar meu currículo digital.");
});

// Funcionalidade 2: mostra ou esconde os detalhes das habilidades
toggleSkillsButton.addEventListener("click", () => {
  const isHidden = skillsContent.classList.toggle("is-hidden");
  toggleSkillsButton.innerText = isHidden ? "Mostrar detalhes" : "Ocultar detalhes";
  toggleSkillsButton.setAttribute("aria-expanded", String(!isHidden));
});

// Funcionalidade 3: coleta o nome e altera o texto no topo da página
greetingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = visitorName.value.trim();

  if (!name) {
    formMessage.innerText = "Por favor, informe seu nome.";
    visitorName.focus();
    return;
  }

  personalGreeting.innerText = `Que bom ter você por aqui, ${name}!`;
  formMessage.innerText = "Saudação criada com sucesso! Veja o topo da página.";
  document.getElementById("inicio").scrollIntoView({ behavior: "smooth" });
});

// Funcionalidade extra: alterna o tema e guarda a escolha no navegador
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeButton.innerText = "☀";
}

themeButton.addEventListener("click", () => {
  const darkMode = document.body.classList.toggle("dark");
  themeButton.innerText = darkMode ? "☀" : "☾";
  themeButton.setAttribute("aria-label", darkMode ? "Ativar tema claro" : "Ativar tema escuro");
  localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
  drawSkillsChart();
});

// Canvas opcional: gráfico simples das habilidades
function drawSkillsChart() {
  const canvas = document.getElementById("skillsCanvas");
  const context = canvas.getContext("2d");
  const skills = [
    { name: "HTML", value: 85 },
    { name: "CSS", value: 80 },
    { name: "JS", value: 70 },
    { name: "Python", value: 75 },
    { name: "C#", value: 65 }
  ];
  const styles = getComputedStyle(document.body);
  const textColor = styles.getPropertyValue("--text").trim();
  const mutedColor = styles.getPropertyValue("--muted").trim();
  const accentColor = styles.getPropertyValue("--accent").trim();

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = "700 14px Segoe UI";
  context.textBaseline = "middle";

  skills.forEach((skill, index) => {
    const y = 34 + index * 56;
    context.fillStyle = textColor;
    context.fillText(skill.name, 10, y);
    context.fillStyle = mutedColor;
    context.fillRect(72, y - 8, 290, 16);
    context.fillStyle = accentColor;
    context.fillRect(72, y - 8, 290 * (skill.value / 100), 16);
    context.fillStyle = textColor;
    context.fillText(`${skill.value}%`, 370, y);
  });
}

document.getElementById("currentYear").innerText = new Date().getFullYear();
drawSkillsChart();
