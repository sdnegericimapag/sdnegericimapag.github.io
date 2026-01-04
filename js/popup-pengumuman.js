// Buka popup pengumuman
document.getElementById("openPengumuman").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("popup-pengumuman").style.display = "block";
});

// Tombol close popup pengumuman
document.querySelector(".close-pengumuman").onclick = function () {
    document.getElementById("popup-pengumuman").style.display = "none";
};

// Klik luar popup pengumuman
window.addEventListener("click", function (e) {
    const popup = document.getElementById("popup-pengumuman");
    if (e.target === popup) {
        popup.style.display = "none";
    }
});
