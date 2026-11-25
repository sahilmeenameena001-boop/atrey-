const appointmentDialog = document.querySelector("#appointment-dialog");
const appointmentForm = appointmentDialog.querySelector("form");
const appointmentDate = appointmentForm.elements.namedItem("date");
const indiaDateFormat = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

document.querySelectorAll("[data-open-appointment]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    appointmentDate.min = indiaDateFormat.format(new Date());
    appointmentDialog.showModal();
  });
});

appointmentDialog.querySelector(".appointment-close").addEventListener("click", () => {
  appointmentDialog.close();
});

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  appointmentDate.min = indiaDateFormat.format(new Date());
  if (!appointmentForm.reportValidity()) return;

  const details = new FormData(appointmentForm);
  const message = [
    "I'd like to request an appointment.",
    "",
    `Full name: ${details.get("name").trim()}`,
    `Email address: ${details.get("email").trim()}`,
    `Matter type: ${details.get("matter")}`,
    `Preferred date: ${details.get("date")}`,
    `Preferred time: ${details.get("time")} IST`,
    `Brief description: ${details.get("description").trim()}`,
  ].join("\r\n");

  const subject = encodeURIComponent("Appointment request");
  window.location.href = `mailto:abhishekatrey@gmail.com?subject=${subject}&body=${encodeURIComponent(message)}`;
});

const menuToggle = document.querySelector('[aria-controls="profile-header-menu"]');
const mobileMenu = document.querySelector("#profile-header-menu");
const mobileViewport = window.matchMedia("(max-width: 767px)");

function closeMobileMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
});

mobileMenu.addEventListener("click", (event) => {
  if (mobileViewport.matches && event.target.closest("a, button")) {
    closeMobileMenu();
    if (appointmentDialog.open) {
      appointmentDialog.addEventListener("close", () => menuToggle.focus(), { once: true });
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMobileMenu();
    menuToggle.focus();
  }
});

mobileViewport.addEventListener("change", closeMobileMenu);
