// Anime data for each era with images, facts, and anime details
const eraData = {
    "1980s": {
        fact: "Anime gains global popularity, introducing new genres and transforming the industry.",
        anime: [
            {
                name: "City Hunter",
                startDate: "1987",
                endDate: "1991",
                status: "ended",
                image: "images/1980s img.png",
                factAlternate: "Mecha and action titles dominated the 1980s, pushing animation boundaries."
            },
            {
                name: "Dragon Ball",
                startDate: "1986",
                endDate: "1989",
                status: "ended",
                image: "images/dragon-1280x720.jpg",
                factAlternate: "OVA (Original Video Animation) launches, allowing for experimental content."
            },
            {
                name: "Gundam",
                startDate: "1979",
                endDate: "1980",
                status: "ended",
                image: "images/gundam-1280x720.jpg",
                factAlternate: "Anime transitions from TV to home video, creating space for niche content."
            },
            {
                name: "Akira",
                startDate: "1988",
                endDate: "1988",
                status: "ended",
                image: "images/akira-1280x720.jpg",
                factAlternate: "High-budget films push animation techniques to unprecedented levels."
            },
            {
                name: "Maison Ikkoku",
                startDate: "1986",
                endDate: "1988",
                status: "ended",
                image: "images/maison-1280x720.jpg",
                factAlternate: "Romance and comedy anime gain traction with adult audiences."
            }
        ]
    },
    "1990s": {
        fact: "A golden era of shounen and shoujo hits that capture worldwide audiences.",
        anime: [
            {
                name: "Sailor Moon",
                startDate: "1992",
                endDate: "1997",
                status: "ended",
                image: "images/1990s img.png",
                factAlternate: "Shoujo anime revolution begins, expanding anime's appeal to female viewers."
            },
            {
                name: "Dragon Ball Z",
                startDate: "1989",
                endDate: "1996",
                status: "ended",
                image: "images/1990s img.png",
                factAlternate: "Shounen anime becomes a global phenomenon across multiple countries."
            },
            {
                name: "Neon Genesis Evangelion",
                startDate: "1995",
                endDate: "1996",
                status: "ended",
                image: "images/neon-1280x720.jpg",
                factAlternate: "Psychological and complex narratives emerge in mainstream anime."
            },
            {
                name: "Ranma 1/2",
                startDate: "1989",
                endDate: "1992",
                status: "ended",
                image: "images/ranma-1280x720.jpg",
                factAlternate: "Comedy-romance hybrids capture both comedy and action fans."
            },
            {
                name: "Rurouni Kenshin",
                startDate: "1996",
                endDate: "1998",
                status: "ended",
                image: "images/Rurouni-Kenshin-1280x720.jpg",
                factAlternate: "Historical settings with martial arts create new genre possibilities."
            },
            {
                name: "Cowboy Bebop",
                startDate: "1998",
                endDate: "1999",
                status: "ended",
                image: "images/cowboy-1280x720.jpg",
                factAlternate: "Jazz influences and film noir aesthetics modernize anime storytelling."
            }
        ]
    },
    "2000s": {
        fact: "A boom period bringing new animation styles and breakout franchises.",
        anime: [
            {
                name: "Naruto",
                startDate: "2002",
                endDate: "2007",
                status: "ended",
                image: "images/naruto-shippuden-anime-featured-image-naruto-uzumaki-from-naruto-shippuden 1.png",
                factAlternate: "Long-running shounen series define the entire decade of anime."
            },
            {
                name: "Bleach",
                startDate: "2004",
                endDate: "2012",
                status: "ended",
                image: "images/bleach-1280x720.jpg",
                factAlternate: "The \"Big Three\" shounen franchises shape the industry landscape."
            },
            {
                name: "Fullmetal Alchemist",
                startDate: "2005",
                endDate: "2010",
                status: "ended",
                image: "images/fullmetal-alchemist-1280×720px.jpg",
                factAlternate: "Complex plots with deep themes make anime appealing to mature audiences."
            },
            {
                name: "Hunter x Hunter",
                startDate: "2011",
                endDate: "2014",
                status: "ended",
                image: "images/hunterxhunter-1280×720px.jpg",
                factAlternate: "Long-form narratives with intricate plots define the era's storytelling."
            },
            {
                name: "Death Note",
                startDate: "2006",
                endDate: "2007",
                status: "ended",
                image: "images/death-1280x720.jpg",
                factAlternate: "Psychological thrillers attract viewers beyond traditional anime fans."
            }
        ]
    },
    "2010s": {
        fact: "Highly polished, diverse series dominate the anime landscape.",
        anime: [
            {
                name: "Steins;Gate",
                startDate: "2011",
                endDate: "2011",
                status: "ended",
                image: "images/best-2010s-anime-by-year-steins-gate-cropped 1.png",
                factAlternate: "Time-travel narratives and high-concept premises define the era."
            },
            {
                name: "Attack on Titan",
                startDate: "2013",
                endDate: "2023",
                status: "ended",
                image: "images/aot-1280x720.jpg",
                factAlternate: "Dark fantasy anime reaches peak popularity with cinematic quality."
            },
            {
                name: "JoJo's Bizarre Adventure",
                startDate: "2012",
                endDate: "Current",
                status: "ongoing",
                image: "images/jojo-bizarre-adventure-1280-720.jpg",
                factAlternate: "Colorful, over-the-top action anime celebrates its legendary source material."
            },
            {
                name: "One Punch Man",
                startDate: "2015",
                endDate: "2015",
                status: "ended",
                image: "images/one-punch-man-1280x720.jpg",
                factAlternate: "Parody anime becomes a massive hit by subverting genre expectations."
            },
            {
                name: "My Hero Academia",
                startDate: "2016",
                endDate: "Current",
                status: "ongoing",
                image: "images/myheroacdamia-1280x720.jpg",
                factAlternate: "Superhero narratives combine Western storytelling with anime aesthetics."
            }
        ]
    },
    "2020s": {
        fact: "Anime flourishes thanks to streaming, new technologies, and darker, mature themes.",
        anime: [
            {
                name: "Jujutsu Kaisen",
                startDate: "2020",
                endDate: "Current",
                status: "ongoing",
                image: "images/jujutsu-kaisen 1.png",
                factAlternate: "Streaming platforms distribute anime globally, breaking geographic barriers."
            },
            {
                name: "Chainsaw Man",
                startDate: "2022",
                endDate: "Current",
                status: "ongoing",
                image: "images/chainsaw-man-1280x720.jpg",
                factAlternate: "Experimental animation techniques and visual styles push creative boundaries."
            },
            {
                name: "Demon Slayer",
                startDate: "2019",
                endDate: "Current",
                status: "ongoing",
                image: "images/demon-1280x720.jpg",
                factAlternate: "Animation studios become household names as quality reaches new heights."
            },
            {
                name: "Spy x Family",
                startDate: "2022",
                endDate: "Current",
                status: "ongoing",
                image: "images/spy-1280x720.jpg",
                factAlternate: "Comedy-action hybrids achieve mainstream success with diverse audiences."
            },
            {
                name: "Vinland Saga",
                startDate: "2019",
                endDate: "2023",
                status: "ended",
                image: "images/vinland-1280x720.jpg",
                factAlternate: "Historical drama anime proves anime can tackle serious literary themes."
            }
        ]
    }
};

// Function to get a random anime from an era
function getRandomAnime(eraKey) {
    const era = eraData[eraKey];
    return era.anime[Math.floor(Math.random() * era.anime.length)];
}

// Function to format the date range
function getDateRange(anime) {
    if (anime.status === "ongoing") {
        return `${anime.startDate} - Current`;
    } else {
        return `${anime.startDate} - ${anime.endDate}`;
    }
}

// Function to update the era panels with random content
function updateEraPanels() {
    const eras = ["1980s", "1990s", "2000s", "2010s", "2020s"];
    
    eras.forEach(era => {
        const panel = document.getElementById(`era-${era}`);
        if (panel) {
            const randomAnime = getRandomAnime(era);
            
            // Update image
            const img = panel.querySelector("img");
            if (img) {
                img.src = randomAnime.image;
                img.alt = `${randomAnime.name} - ${era}`;
            }
            
            // Update description/fact
            const description = panel.querySelector("p");
            if (description) {
                description.textContent = randomAnime.factAlternate;
            }
            
            // Update anime name and date
            const listItems = panel.querySelectorAll("ul li");
            if (listItems.length >= 2) {
                listItems[0].textContent = randomAnime.name;
                listItems[1].textContent = getDateRange(randomAnime);
            }
        }
    });
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateEraPanels);
