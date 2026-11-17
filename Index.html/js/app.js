const navItems = [...document.querySelectorAll(".nav-item")];
const pages = [...document.querySelectorAll(".page")];
const crumb = document.getElementById("crumb");
const sidebar = document.getElementById("sidebar");

function showPage(name) {
  const page = document.getElementById(`page-${name}`);
  if (!page) return;
  pages.forEach(item => item.classList.toggle("active", item === page));
  navItems.forEach(item => item.classList.toggle("active", item.dataset.page === name));
  crumb.textContent = name.replace("-", " ").toUpperCase();
  sidebar.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", `#${name}`);
}
navItems.forEach(item => item.addEventListener("click", () => showPage(item.dataset.page)));
document.querySelectorAll("[data-link]").forEach(item => item.addEventListener("click", () => showPage(item.dataset.link)));
document.getElementById("mobileMenu").addEventListener("click", () => sidebar.classList.toggle("open"));
