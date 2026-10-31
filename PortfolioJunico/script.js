// ===== YOUR INFO (edit here, it updates every page) =====
const site = {
  name: "Rosendo S. Espina Jr.",
  section: "3-IT9",
  course: "Bachelor of Science in Information Technology",
  email: "rosendoe040@email.com",
  facebook: "Rosendo Espina Jr.",
  instagram: "den_endl",
  logo: "logo.png"
};

const pages = [
  ["Home", "index.html"],
  ["About", "about.html"],
  ["Portfolio", "portfolio.html"],
  ["Skills", "skills.html"],
  ["Contact", "contact.html"]
];

const projects = [
  { title: "Urban Threads: Logo", image: "pictures/LOGO1.png",
    desc: "A round logo for Urban Threads, a back-to-school clothing brand, in dusty pink and blue.", tools: ["GIMP"] },
  { title: "Urban Threads: Banner Ad", image: "pictures/BANNERAD.png",
    desc: "A banner ad that promotes the Back-to-School Collection.", tools: ["GIMP"] },
  { title: "Urban Threads: Social Media Post", image: "pictures/SOCIALMEDIA.png",
    desc: "A square social media post for the Back To School T-Shirt collection.", tools: ["GIMP"] },
  { title: "Urban Threads: Landing Page", image: "pictures/LANDINGPAGE.png",
    desc: "A landing page design with the brand name, the collection title and a Shop Now button.", tools: ["GIMP"] },
  { title: "Urban Threads: Newsletter Header", image: "pictures/NEWSLETTERHEADER.png",
    desc: "A wide header for the brand's Back to School newsletter.", tools: ["GIMP"] },
  { title: "The 1975: Badge", image: "pictures/Badge.png",
    desc: "A pentagon badge design for the band The 1975.", tools: ["GIMP"] },
  { title: "The 1975: Horizontal", image: "pictures/Horizontal.png",
    desc: "The badge and the tagline arranged side by side in a horizontal layout.", tools: ["GIMP"] },
  { title: "The 1975: Vertical", image: "pictures/Vertical.png",
    desc: "The badge and the tagline stacked in a vertical layout.", tools: ["GIMP"] },
  { title: "Portfolio Website: Figma Prototype", image: "pictures/Figma.png",
    desc: "The Figma prototype for this portfolio: Home, About, Projects, Skills and Contact pages linked together.", tools: ["Figma"] }
];
const technicalSkills = ["HTML and CSS", "JavaScript basics", "Networking basics"];
const softSkills = ["Teamwork", "Communication", "Time management"];

let selected = 0;

// ===== SHARED PARTS =====

// Name of the page we are on, like "about.html"
function currentFile() {
  return location.pathname.split("/").pop() || "index.html";
}

// Top bar: round logo on the left, links and light/dark button on the right
function buildHeader() {
  const here = currentFile() === "project.html" ? "portfolio.html" : currentFile();
  const links = pages.map(([label, file]) =>
    `<a href="${file}"${file === here ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("");
  document.getElementById("siteHeader").innerHTML = `
    <a class="brand" href="index.html" aria-label="${site.name} - Home">
      <img src="${site.logo}" alt="" onerror="this.style.display='none'">
    </a>
    <nav aria-label="Main">${links}
      <button id="themeBtn" onclick="toggleTheme()" aria-label="Switch light or dark mode"></button>
    </nav>`;
}

// Bottom bar: name, contact links, page links, copyright
function buildFooter() {
  const links = pages.map(([label, file]) => `<a href="${file}">${label}</a>`).join("");
  const fb = "https://" + site.facebook;
  const ig = "https://www.instagram.com/" + site.instagram.replace("@", "");
  document.getElementById("siteFooter").innerHTML = `
    <div class="footer-inner">
      <p><strong>${site.name}</strong> &mdash; ${site.course}</p>
      <p class="footer-links">
        <a href="mailto:${site.email}">${site.email}</a>
        <a href="${fb}" target="_blank" rel="noopener">Facebook</a>
        <a href="${ig}" target="_blank" rel="noopener">Instagram</a>
      </p>
      <p class="footer-links">${links}</p>
      <p>&copy; ${new Date().getFullYear()} ${site.name}</p>
    </div>`;
}

// ===== LIGHT / DARK =====
function applyTheme(mode) {
  document.documentElement.dataset.theme = mode;
  const btn = document.getElementById("themeBtn");
  if (btn) btn.textContent = mode === "dark" ? "Light" : "Dark";
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
}

// ===== PAGE FUNCTIONS =====

// Home + About: fill in the name, section and course
function fillProfile() {
  document.querySelectorAll("[data-fill]").forEach(el => {
    el.textContent = site[el.dataset.fill];
  });
}

// Portfolio: click a card to pick it for the Quick view
function selectProject(i) {
  selected = i;
  document.getElementById("quickTitle").textContent = projects[i].title;
  document.querySelectorAll(".card").forEach((c, n) => c.classList.toggle("picked", n === i));
}

// Portfolio: go to the project page (the number is sent in the link)
function openProject() {
  location.href = "project.html?id=" + selected;
}

// Portfolio: build the project cards
function buildCards() {
  const box = document.getElementById("cards");
  projects.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "card";
    b.innerHTML = `<img src="${p.image}" alt="" onerror="this.style.display='none'"><h3>${p.title}</h3>`;
    b.onclick = () => selectProject(i);
    box.appendChild(b);
  });
  selectProject(0);
}

// Project page: read ?id= from the link and show that project
function showProject() {
  let id = Number(new URLSearchParams(location.search).get("id"));
  if (!(id >= 0 && id < projects.length)) id = 0;
  const p = projects[id];
  document.title = p.title + " | " + site.name;
  document.getElementById("projTitle").textContent = p.title;
  document.getElementById("projDesc").textContent = p.desc;
  fillList("projTools", p.tools);
  const img = document.getElementById("projImg");
  img.src = p.image;
  img.alt = p.title;
}

// Put an array of text into a list
function fillList(id, items) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";
  items.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
}

// Contact: copy the email
function copyEmail() {
  const msg = document.getElementById("copyMsg");
  navigator.clipboard.writeText(site.email)
    .then(() => msg.textContent = "Email copied!")
    .catch(() => msg.textContent = "Could not copy. Please copy it by hand.");
}

// Contact: show or hide the CV on the page
function toggleCV() {
  const box = document.getElementById("cvBox");
  const frame = document.getElementById("cvFrame");
  const btn = document.getElementById("cvBtn");
  if (box.hidden) {
    if (!frame.getAttribute("src")) frame.src = "cv.pdf";   // load it the first time
    box.hidden = false;
    btn.textContent = "Hide CV";
    box.scrollIntoView({ behavior: "smooth" });
  } else {
    box.hidden = true;
    btn.textContent = "View CV";
  }
}

// Contact: check the form, then open the visitor's email app
function sendMessage(event) {
  event.preventDefault();
  const msg = document.getElementById("formMsg");
  const name = document.getElementById("fName").value.trim();
  const email = document.getElementById("fEmail").value.trim();
  const subject = document.getElementById("fSubject").value.trim();
  const message = document.getElementById("fMessage").value.trim();

  msg.className = "error";
  if (document.getElementById("fTrap").value !== "") return false; // spam bot
  if (!name || !email || !subject || !message) {
    msg.textContent = "Please fill in all the fields.";
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = "Please enter a valid email address.";
    return false;
  }

  const body = message + "\n\nFrom: " + name + " (" + email + ")";
  location.href = "mailto:" + site.email +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  msg.className = "";
  msg.textContent = "Thank you, " + name + "! Your email app should open now.";
  document.getElementById("contactForm").reset();
  return false;
}

// ===== START (runs on every page) =====
function start() {
  buildHeader();
  buildFooter();

  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  applyTheme(saved === "dark" ? "dark" : "light");

  fillProfile();
  if (document.getElementById("cards")) buildCards();
  if (document.getElementById("projTitle")) showProject();
  if (document.getElementById("techList")) {
    fillList("techList", technicalSkills);
    fillList("softList", softSkills);
  }
  if (document.getElementById("email")) {
    document.getElementById("email").textContent = site.email;
  }
}
start();