document.addEventListener("DOMContentLoaded", () => {

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

  const searchIndex = [];

  Promise.all(
    pages.map(page =>
      fetch(page)
        .then(res => res.text())
        .then(html => {

          const doc = new DOMParser().parseFromString(html, "text/html");

          const headings = [...doc.querySelectorAll("h1,h2,h3,p")]
            .map(el => el.innerText)
            .join(" ")
            .toLowerCase();

          if (headings.trim()) {
            searchIndex.push({
              text: headings,
              url: page
            });
          }

        })
        .catch(() => {})
    )
  );

  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");

  if (!input || !results) return;

  // ENTER buka hasil pertama
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      const first = results.querySelector("a");
      if (first) window.location.href = first.href;
    }
  });

  input.addEventListener("keyup", () => {
    const keyword = input.value.toLowerCase().trim();
    results.innerHTML = "";

    if (!keyword) {
      results.style.display = "none";
      return;
    }

    const found = searchIndex.filter(p =>
      p.text.includes(keyword)
    );

    found.slice(0, 8).forEach(p => {
      const a = document.createElement("a");
      a.href = p.url;
      a.textContent = keyword;
      results.appendChild(a);
    });

    results.style.display = found.length ? "block" : "none";
  });

});
