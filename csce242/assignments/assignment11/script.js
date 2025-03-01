//
class Game {
    constructor(title, pic) {
        this.title = title;
        this.pic = pic;
    }
    
    get item() {
        const gameSection = document.createElement("section");
        gameSection.classList.add("game");
        
        const heading = document.createElement("h3");
        heading.innerText = this.title;
        gameSection.appendChild(heading);
        
        const infoList = document.createElement("ul");
        gameSection.appendChild(infoList);
        
        gameSection.appendChild(this.picture(this.pic));
        
        return gameSection;
    }
    
    ListItem(info) {
        const  liItem = document.createElement("li");
        liItem.innerText = info;
        return liItem;
    }
    
    picture(pic) {
        const picItem = document.createElement("img");
        picItem.src = "images/" + pic;
        return picItem;
    }
    
}

document.addEventListener("DOMContentLoaded", function () {
    const games = [
        {
            name: "Super Mario Bros",
            image: "images/supermariobros.jpg",
            facts: [
                "Released in 1985",
                "Developed by Nintendo",
                "Introduced Mario and Luigi",
                "Considered one of the greatest video games of all time",
                "Helped revive the video game industry",
                "Features eight worlds with four levels each"
            ]
        },
        {
            name: "DC Universe",
            image: "images/dcuniverse.jpg",
            facts: [
                "Based on DC Comics characters",
                "Released as an MMORPG",
                "Allows players to create custom heroes or villains",
                "Features iconic locations like Gotham and Metropolis",
                "Has ongoing updates with new content",
                "Supports both PvE and PvP gameplay"
            ]
        },
        {
            name: "Black Ops 6",
            image: "images/blackops6.jpg",
            facts: [
                "Part of the Call of Duty franchise",
                "Focuses on covert military operations",
                "Includes both single-player and multiplayer modes",
                "Features advanced weaponry and tactics",
                "Popular for its fast-paced gameplay",
                "Has a dedicated eSports community"
            ]
        },
        {
            name: "Red Dead Redemption 2",
            image: "images/rd2.jpg",
            facts: [
                "Developed by Rockstar Games",
                "Released in 2018",
                "Set in the American Wild West",
                "Follows Arthur Morgan, an outlaw",
                "Features an open-world environment",
                "Highly praised for its storytelling and realism"
            ]
        },
        {
            name: "Cyberpunk 2077",
            image: "images/cp2077.jpg",
            facts: [
                "Developed by CD Projekt Red",
                "Released in 2020",
                "Set in the futuristic Night City",
                "Players control V, a mercenary with cybernetic enhancements",
                "Features branching storylines and choices",
                "Initially criticized for bugs, but improved with updates"
            ]
        }
    ];

    const gameList = document.getElementById("game-list");
    const modal = document.getElementById("popup");
    const modalTitle = modal.querySelector("h2");
    const modalContent = modal.querySelector(".w3-modal-content .w3-container");

    gameList.style.display = "flex";
    gameList.style.flexWrap = "wrap";
    gameList.style.justifyContent = "center";
    gameList.style.padding = "0 20px";

    modal.style.opacity = "0";
    modal.style.transform = "scale(0.8)";
    modal.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    games.forEach(game => {
        const gameTile = document.createElement("div");
        gameTile.classList.add("game");

        gameTile.style.padding = "30px";
        gameTile.style.background = "#423b3b";
        gameTile.style.borderRadius = "1px";
        gameTile.style.textAlign = "center";
        gameTile.style.width = "504px";
        gameTile.style.height = "400px";


        const title = document.createElement("p");
        title.textContent = game.name;
        title.style.position = "bold";

        const img  = document.createElement("img");
        img.src = game.image;
        img.alt = game.name;
        img.style.width = "79%";
        img.style.height = "79%";
        img.style.borderRadius = "1px";


        gameTile.appendChild(title);
        gameTile.appendChild(img);
    
        gameTile.addEventListener("click", function () {
            modal.style.display = "block";
            setTimeout(() => {
                modal.style.opacity = "1";
                modal.style.transform = "scale(1)";
            }, 10);
            modalTitle.textContent = game.name;
            modalContent.innerHTML = `
               <header class="w3-container w3-teal">
                    <span class = "w3-button w3-display-topright" onclick = "closePopup()">&times;</span>
                    <h2>${game.name}</h2>
               </header>
               <div style = "display: flex; align-items: center; gap: 20px: padding: 20px;">
                    <div style = "flex: 1; text-align: left;">
                        <p>${game.facts.join("<br><br>")}</p>
                    </div>
                    <div style = "flex: 1;">
                        <img src = "${game.image}" alt="${game.name}" style = "width: 100%; height: 250px; border-radius: 1px; padding-left: 200px;">
                    </div>
                </div>
            
            `
        });

        gameList.appendChild(gameTile);
    });

    function closePopup() {
        modal.style.opacity = "0";
        modal.style.transform = "scale(0.8)";
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("w3-display-topright")) {
            closePopup();
        }
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            closePopup();
        }
    });
});
