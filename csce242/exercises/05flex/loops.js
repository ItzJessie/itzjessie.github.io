document.getElementById("btn-display").onclick = () => {
    const startNum = parseInt(document.getElementById("txt-start").value);
    const endNum = parseInt(document.getElementById("txt-end").value);
    const displayArea = document.getElementById("start-end-display");
    displayArea.innerHTML = "";
    const errorDisplay = document.getElementById("error-num-order");
    errorDisplay.innerHTML = "";    //clear out any previous errors
    const favMessageP = document.getElementById("fav-message");
    favMessageP.innerHTML = "";

    if(endNum < startNum) {
        errorDisplay.innerHTML = `${endNum} is less than ${startNum}.`
        return; //don't do anything else if you already have an error
    }

    for(let i=startNum; i <= endNum; i++){
        const li = document.createElement("li");
        li.innerHTML = i;
        displayArea.append(li);
        //attach event to onclick li
        li.onclick = () => {
            favMessageP.innerHTML = `You clicked ${i}.`
        }
    }
}

document.getElementById("display-stairs").onclick = () => {
    console.log("button clicked");
}

let count = 0;
let updateCount;

document.getElementById("btn-count").onclick = (event) => {
    if (event.currentTarget.innerHTML === "start") {
        event.target.innerHTML = "stop";

        updateCount = setInterval(()=>{
            count++;
            document.querySelector("#count-display").innerHTML = count;
        }, 1000);
        
            
    } else {
        event.target.innerHTML = "start";
        clearInterval(updateCount);
        console.log("counting stopped");
    }
}

document.getElementById("btn-reset").onclick = () => {
    count = 0;
    clearInterval(updateCount);
    document.querySelector("#btn-count").innerHTML = "start";
    document.querySelector("#count-display").innerHTML = "";
}
 

// const toys = ["dragon", "spider", "lizard"];
const toys = [];
toys["dragon"] = "I breath fire";
toys["spider"] = "I spin webs";
toys["lizard"] = "I change colors";

document.getElementById("btn-toys").onclick = (event) => {
    event.currentTarget.disabled = true;

    // for (let i=0; i<toys.length; i++) {
    //     const li = document.createElement("li");
    //     li.innerHTML = toys[i];
    //     document.getElementById("toys-display").append(li);
    // }

    // toys.forEach((toy, i) => {
    //     console.log(`${i+1}. ${toy}`);
    //     const li = document.createElement("li");
    //     li.innerHTML = toy;
    //     document.getElementById("display-toys").append(li);
    // });

    const ul = document.createElement("ul");
    document.getElementById("display-toys").append(ul);

    toy.forEach((toys, i) => {
        const li = document.createElement("li");
        ul.append(li);
        li.innerHTML = `${i+1}. ${toys}`;
    });
}

document.getElementById("btn-toys").onclick = (event) => {

    const section = document.getElementById("show-toy-desc");

    for(let toy in toys) {
        console.log(toy, toys[toy]);
        const p = document.createElement("p");
        li.innerHTML = `${toy}: ${toys[toy]}`;
        p.onclick = () => {
            document.getElementById("toy-message").innerHTML = `Best ${toy} Ever. ${toys[toy]}`;
        }
    }

}