document.addEventListener("DOMContentLoaded", function () {

  // Ambil elemen search
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");

  // Jika halaman tidak punya search, hentikan script
  if (!input || !results) return;

  // DAFTAR HALAMAN (SESUIKAN DENGAN NAVBAR)
  const pages = [
    "index.html",
    "logo.html",
    "visimisi.html",
    "identitas.html",
    "tentang.html",
    "tendik",
    "eskul",
    "lomba",
    "prestasi",
    "galeri",
    "galerivideo",
    "sekilasinfo",
    "download"
  ];

  // Index pencarian
  const searchIndex = [];
  let lastResults = [];

  // Ambil isi semua halaman
  Promise.all(
    pages.map(page =>
      fetch(page)
        .then(res => {
          if (!res.ok) throw new Error("Tidak ditemukan: " + page);
          return res.text();
        })
        .then(html => {
          const doc = new DOMParser().parseFromString(html, "text/html");

          const title =
            doc.querySelector("h1")?.innerText ||
            doc.querySelector("title")?.innerText ||
            page;

          const content = [...doc.querySelectorAll("h1,h2,h3,p,li")]
            .map(el => el.innerText)
            .join(" ")
            .toLowerCase();

          searchIndex.push({ title, url: page, content });
        })
        .catch(err => console.warn(err.message))
    )
  );

  // ENTER → buka hasil pertama
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (lastResults.length > 0) {
        window.location.href = lastResults[0].url;
      }
    }
  });

  // Ketik → tampilkan hasil
  input.addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();
    results.innerHTML = "";

    if (!keyword) {
      results.style.display = "none";
      lastResults = [];
      return;
    }

    lastResults = searchIndex.filter(p =>
      p.title.toLowerCase().includes(keyword) ||
      p.content.includes(keyword)
    );

    lastResults.forEach(p => {
      const a = document.createElement("a");
      a.href = p.url;
      a.innerHTML = `<strong>${p.title}</strong>`;
      results.appendChild(a);
    });

    results.style.display = lastResults.length ? "block" : "none";
  });

});
