//button click example
document.getElementById("btn-show-message").onclick = ()=>{
    document.getElementById("p-message").innerHTML = "Hi Portia";
};

//link click example
//e is the event (Clicking)
//e.currentTarget is the element the event was performed on (the link)
document.getElementById("a-click").onclick = (e) => {
    e.preventDefault(); //not go to the links destination
    e.currentTarget.innerHTML = "Clicked";
};

//start and stop the ball bouncing
document.getElementById("btn-bounce").onclick = (e) => {
    const ball = document.getElementById("ball");

    if(e.currentTarget.innerHTML.toLowerCase() == "start") {
        e.currentTarget.innerHTML = "Stop";
        ball.classList.add("bounce");
    } else {
        e.currentTarget.innerHTML = "Start";
        ball.classList.remove("bounce");
    }
}

//plant health
document.getElementById("txt-num-days").onchange = (e) => {
    const numEntered = parseInt(e.currentTarget.value);
    const p = document.getElementById("p-plant-message");
    
    if(numEntered <=0) {
        p.innerHTML = "Yay! We were fed today!";
    } else if(numEntered <= 2) {
        p.innerHTML = "I'm getting a little thirsty";
    } else if(numEntered <=5) {
        p.innerHTML = "I'm starting to wilt";
    } else {
        p.innerHTML = "You killed me :(";
    }
};

// const countDisplay = document.getElementById("count");
// const startButton = document.getElementById("startBtn");
// const stopButton = document.getElementById("stopBtn");

// let count = 0;
// let intervalId = null;

// startButton.addEventListener("click", () => {
//     if (intervalId) return;
//     intervalId = setInterval(() => {
//         count++;
//         countDisplay.textContent = count;
//     }, 1000);
// });

// stopButton.addEventListener("click", () => {
//     if (intervalId) {
//         clearInterval(intervalId);
//         intervalId = null;
//     }
// });

const p = document.getElementById("count");

let count = 0;
let intervalId;

document.getElementById("startBtn").onclick = () => {
    p.innerHTML = "Start";
    countInterval = setInterval(() =>{
        count++;
        p.innerHTML = count;
    }, 500);
};

document.getElementById("pauseBtn").onclick = () => {
    p.innerHTML = "Pause";
    clearInterval(countInterval);
};

document.getElementById("stopBtn").onclick = () => {
    clearInterval(countInterval);
    count = 0;
}

/* Donations thermometer */
const GOAL = 1000;
let donations = 0;

document.getElementById("goal-display").innerHTML = `Goal $${GOAL}`;

document.getElementById("btn-add-donation").onclick = () => {
    //validate donation amount
    const donation = document.getElementById("txt-donation").value;
    document.getElementById("donation-error").classList.add("hidden");

    if(isNaN(donation) ||donation <= 0){
        document.getElementById("donation-error").classList.remove("hidden");
        return;
    }

    //update donation
    donations += parseFloat(donation);
    donationPercent = donations / GOAL * 100;

    if(donations >= GOAL){
        document.getElementById("donation-message").innerHTML = `Goal Reached!`;
        donationPercent = 100;
    } else {
        //show donation message.
    document.getElementById("donation-message").innerHTML = `$${GOAL - donations} to go!`;
    }

    //update thermometer
    document.getElementById("thermometer").style.setProperty("--donation-percent", donationPercent + "%");
};