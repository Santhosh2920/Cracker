/*
  MS Crackers website settings
  1. Replace SHOP_PHONE with your WhatsApp number, including country code, digits only.
     Example for India: "919876543210" (do not include +, spaces, or hyphens).
  2. Update SHOP_ADDRESS with your shop's real address.
  3. You can also change SHOP_NAME and the visible shop text below.
*/
const SHOP_NAME = "MS Crackers";
const SHOP_PHONE = "910000000000"; // CHANGE THIS to your WhatsApp number
const SHOP_ADDRESS = "Add your shop address here"; // CHANGE THIS

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const menuToggle = document.getElementById("menuToggle");
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));

  document.getElementById("displayPhone").textContent =
    SHOP_PHONE === "910000000000" ? "+91 00000 00000 (update in script.js)" : "+" + SHOP_PHONE;
  document.getElementById("displayAddress").textContent = SHOP_ADDRESS;
  document.getElementById("year").textContent = new Date().getFullYear();

  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    productCards.forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  }));

  document.querySelectorAll(".enquiry-btn").forEach(button => button.addEventListener("click", () => {
    document.getElementById("interest").value = button.dataset.product;
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => document.getElementById("customerName").focus({ preventScroll: true }), 450);
  }));

  document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();
    if (!SHOP_PHONE || SHOP_PHONE === "910000000000") {
      alert("Please update SHOP_PHONE in script.js with your WhatsApp number before using the enquiry form.");
      return;
    }
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const interest = document.getElementById("interest").value;
    const message = document.getElementById("message").value.trim();
    const text = `Hello ${SHOP_NAME}, my name is ${name}.\nMy phone number: ${phone}\nEnquiry: ${interest}\n${message ? "Message: " + message + "\n" : ""}Please share current availability and details.`;
    window.open(`https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  });

  const backTop = document.getElementById("backTop");
  window.addEventListener("scroll", () => backTop.classList.toggle("visible", window.scrollY > 450));
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
