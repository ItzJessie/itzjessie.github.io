const searchForm = document.querySelector(".all-series-search");
const searchInput = document.querySelector(".all-series-search input");
const seriesCards = Array.from(
    document.querySelectorAll(".all-series-card")
);

const filterSeries = () => {
    const query = searchInput.value.trim().toLowerCase();

    seriesCards.forEach((card) => {
        const title = card.querySelector("h2");
        const name = title ? title.textContent.trim().toLowerCase() : "";
        const isMatch = name.includes(query);
        card.style.display = isMatch ? "" : "none";
    });
};

if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        filterSeries();
    });

    searchInput.addEventListener("input", filterSeries);
}
