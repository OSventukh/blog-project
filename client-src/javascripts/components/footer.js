export default function footer() {
  const yearSpan = document.querySelector('span.year');
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}