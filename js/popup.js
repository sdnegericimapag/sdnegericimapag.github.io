<script>
// Buka popup (semua tombol)
document.querySelectorAll(".openPopup").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const popupId = this.dataset.popup;
    document.getElementById(popupId).style.display = "block";
  });
});

// Tutup popup (semua tombol close)
document.querySelectorAll(".popup-modal .close").forEach(btn => {
  btn.onclick = function () {
    this.closest(".popup-modal").style.display = "none";
  };
});

// Klik luar popup untuk nutup
window.onclick = function (e) {
  document.querySelectorAll(".popup-modal").forEach(popup => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
};
</script>


