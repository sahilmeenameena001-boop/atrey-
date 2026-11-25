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
