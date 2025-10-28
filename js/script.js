// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const seccion = document.querySelector(this.getAttribute("href"));
    if (seccion) {
      seccion.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Modo oscuro
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Cargar preferencia guardada
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
}

// Toggle para hacer click
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Guardar preferencia
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Selector de idiomas
const flags = {
  es: "images/flags/es.png",
  en: "images/flags/gb.png",
  fr: "images/flags/fr.png",
  de: "images/flags/de.png",
  it: "images/flags/it.png",
  pt: "images/flags/pt.png",
};

const currentLanguageBtn = document.getElementById("current-language");
const currentFlag = document.getElementById("current-flag");
const languageDropdown = document.getElementById("language-dropdown");
const langOptions = document.querySelectorAll(".lang-option");

let currentLang = localStorage.getItem("language") || "es";

// Cargar idioma al iniciar
window.addEventListener("DOMContentLoaded", () => {
  changeLanguage(currentLang);
  currentFlag.src = flags[currentLang];
  updateActiveOption();
});

// Abrir/cerrar dropdown
currentLanguageBtn.addEventListener("click", () => {
  languageDropdown.classList.toggle("active");
});

// Cerrar dropdown al hacer click fuera
document.addEventListener("click", (e) => {
  if (!e.target.closest(".language-selector")) {
    languageDropdown.classList.remove("active");
  }
});

// Cambiar idioma
langOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const lang = option.getAttribute("data-lang");
    currentLang = lang;

    currentFlag.src = flags[lang];
    changeLanguage(lang);
    localStorage.setItem("language", lang);
    updateActiveOption();
    languageDropdown.classList.remove("active");
  });
});

// Función para cambiar idioma
function changeLanguage(lang) {
  fetch(`./languages/${lang}.json`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelectorAll("[data-section]").forEach((element) => {
        const section = element.getAttribute("data-section");
        const value = element.getAttribute("data-value");

        if (data[section] && data[section][value]) {
          element.textContent = data[section][value];
        }
      });

      document.documentElement.setAttribute("lang", lang);
    })
    .catch((error) => {
      console.error("Error al cargar el idioma:", error);
    });
}

// Marcar opción activa en el selector de idiomas
function updateActiveOption() {
  langOptions.forEach((option) => {
    if (option.getAttribute("data-lang") === currentLang) {
      option.classList.add("active");
    } else {
      option.classList.remove("active");
    }
  });
}
