// ===== Dark / light mode (remembered in the browser) =====
var themeBtn = document.getElementById("themeBtn");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

var saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved === "dark" ? "dark" : "light");

themeBtn.addEventListener("click", function () {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

// ===== Mobile menu =====
var menuBtn = document.getElementById("menuBtn");
var nav = document.getElementById("nav");

menuBtn.addEventListener("click", function () {
  var open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

// ===== Project search and filters (Projects page only) =====
var search = document.getElementById("search");

if (search) {
  var category = document.getElementById("category");
  var year = document.getElementById("year");
  var type = document.getElementById("type");
  var cards = document.querySelectorAll(".project");
  var count = document.getElementById("count");
  var empty = document.getElementById("empty");

  function filterProjects() {
    var text = search.value.trim().toLowerCase();
    var shown = 0;

    cards.forEach(function (card) {
      var match =
        card.dataset.search.indexOf(text) !== -1 &&
        (category.value === "" || card.dataset.category === category.value) &&
        (year.value === "" || card.dataset.year === year.value) &&
        (type.value === "" || card.dataset.type === type.value);

      card.hidden = !match;
      if (match) shown++;
    });

    count.textContent = shown + (shown === 1 ? " project" : " projects") + " found";
    empty.hidden = shown !== 0;
  }

  [search, category, year, type].forEach(function (box) {
    box.addEventListener("input", filterProjects);
  });
  search.form.addEventListener("submit", function (e) { e.preventDefault(); });
  filterProjects();
}

// ===== Contact form: checks the fields, then opens the visitor's email app =====
var form = document.getElementById("contactForm");

if (form) {
  var msg = document.getElementById("formMsg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var subject = form.elements.subject.value.trim();
    var message = form.elements.message.value.trim();

    msg.className = "error";
    if (!name || !email || !subject || !message) {
      msg.textContent = "Please fill in all the fields.";
      return;
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      msg.textContent = "Please enter a valid email address.";
      return;
    }

    msg.className = "";
    msg.textContent = "Opening your email app...";
    window.location.href = "mailto:rosendoe040@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  });
}
