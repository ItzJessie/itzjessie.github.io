const buildSeriesId = (title) =>
    `series-${title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")}`;

const createSeriesCard = (anime) => {
    const card = document.createElement("article");
    card.className = "all-series-card";
    card.id = buildSeriesId(anime.title);

    card.innerHTML = `
        <img src="${anime.img_name}" alt="${anime.title}" />
        <div class="all-series-body">
            <h2>${anime.title}</h2>
            <p><span>Release:</span> ${anime.year}</p>
            <p><span>Studio:</span> ${anime.studio}</p>
            <p><span>Episodes:</span> ${anime.episodes}</p>
            <p>${anime.synopsis}</p>
        </div>
    `;

    return card;
};

const renderAllSeries = async () => {
    const grid = document.querySelector(".all-series-grid");

    if (!grid) {
        return;
    }

    try {
        const response = await fetch("anime-series.json");
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const animeList = await response.json();
        grid.innerHTML = "";

        animeList.forEach((anime) => {
            grid.appendChild(createSeriesCard(anime));
        });

        window.allAnimeDatabase = animeList.map((anime) => ({
            name: anime.title,
            id: buildSeriesId(anime.title)
        }));

        document.dispatchEvent(
            new CustomEvent("allSeriesRendered", {
                detail: {
                    count: animeList.length
                }
            })
        );
    } catch (error) {
        grid.innerHTML = `
            <div class="all-series-no-results" style="display:block">
                <p>Could not load anime data right now.</p>
            </div>
        `;
        console.error("Failed to load anime-series.json", error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    window.allAnimeDatabase = [];
    renderAllSeries();
});
