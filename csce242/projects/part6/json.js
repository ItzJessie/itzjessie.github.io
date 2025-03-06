const getGames = async () => {
    const url = "https://itzjessie.github.io/csce242/projects/part6/json/upcomingRelease.json";

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }

}

const showGames = async () => {
    let games = await getGames();
    let gamesSection = document.getElementById("games-section");


    games.forEach((game) => {
        gamesSection.append(getGameItem(game));
    });

};

const getGameItem = (game) =>  {
    let section = document.createElement("section");

    let h3 = document.createElement("h3");
    h3.innerHTML = game.name;
    section.append(h3);

    let img = document.createElement("img");
    img.src = game.image;
    section.append(img);
    

    let ul = document.createElement("ul");
    section.append(ul);
    ul.append(getLi(game.developer));
    ul.append(getLi(`Price: $${game.price}`));
    ul.append(getLi(game.difficulty));
    ul.append(getLi(game.description));
    ul.append(getLi(`Rating: ${game.rating}`));

    section.append(getReviews(game.reviews));


    return section
};

const getLi = data => {
    const li = document.createElement("li");
    li.textContent = data;
    return li;
};

const getReviews = (reviews) => {
    const section = document.createElement("section");

    reviews.forEach(review => {
        const p = document.createElement("p");
        p.textContent = review;
        section.append(p);
    });
    return section;
};




window.onload = () => showGames();