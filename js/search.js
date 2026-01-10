
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
  )
);

const input = document.getElementById("searchInput");
const results = document.getElementById("searchResults");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); // ⬅️ INI PENTING
  }
});

input.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();
  results.innerHTML = "";

  if (!keyword) {
    results.style.display = "none";
    return;
  }

  const found = searchIndex.filter(p =>
    p.title.toLowerCase().includes(keyword) ||
    p.content.includes(keyword)
  );

  found.forEach(p => {
    const a = document.createElement("a");
    a.href = p.url;
    a.innerHTML = `<strong>${p.title}</strong>`;
    results.appendChild(a);
  });

  results.style.display = found.length ? "block" : "none";
});








