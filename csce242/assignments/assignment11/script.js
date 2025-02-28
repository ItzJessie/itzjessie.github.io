class Game {
    constructor(title, length, difficulty, age, availability, pic) {
        this.title = title;
        this.length = length;
        this.difficulty = difficulty;
        this.age = age;
        this.availability = availability;
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
        infoList.append(this.ListItem(this.length));
        infoList.append(this.ListItem(this.difficulty));
        infoList.append(this.ListItem(`Age: ${this.age}`));
        infoList.append(this.ListItem(this.availability));
        
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



window.onload = ( ) => {
    let games = [];
    let gameList = document.getElementById("game-list");  
    
    games.push(
        new Game("Super Mario Bros", "8 Hrs", "easy-to-learn", 20, "Nintendo Switch", "supermariobros.jpg"));
    games.push(
        new Game("DC Universe", "20 Hrs", "challenging", 10, "All Platforms", "dcuniverse.jpg" )
    );
    games.push(
        new Game("Black Ops 6", "8 Hrs", "skill-needed", 1, "All Platforms", "blackops6.jpg" )
    );

    
    for (let i in games) {


        gameList.append(games[i].item);
    }
};

