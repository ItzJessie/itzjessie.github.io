/*Project Part:3*/
/*Beginning JavaScript*/

document.getElementById("toggle-nav").onclick = () => {
    document.getElementById("nav-items").classList.toggle("hide-small");
}

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startCountdown");
    const resetButton = document.getElementById("resetCountdown");

    if (startButton) {
        startButton.addEventListener("click", startCountdown);
    } else {
        console.error("Start button not found!");
    }

    if (resetButton) {
        resetButton.addEventListener("click", resetCountdown);
    } else {
        console.error("Reset button not found!");
    }
});

let countdown;
let countdownTime = 0; // Store countdown time globally

function startCountdown() {
    console.log("Countdown started!");

    // Get the selected game
    const gameSelection = document.getElementById("games").value;

    // Define countdown times for each game (in seconds)
    const countdownTimes = {
        "mk-9": 10, // 10 seconds for testing
        "gta-6": 7776000, // 3 months (assuming 30 days per month)
        "er-2": 5184000,  // 2 months
        "gta-6O": 2592000, // 1 month
        "poe-2": 8640000, // 4 months
        "bo-3": 10368000  // 4 months + 10 days
    };

    // Set countdown time based on selected game
    countdownTime = countdownTimes[gameSelection] || 10; // Default to 10 sec if not found

    console.log(`Selected game: ${gameSelection}, Countdown: ${countdownTime} seconds`);

    updateCountdownDisplay(countdownTime); // Initial update before countdown starts

    clearInterval(countdown); // Clear any existing countdown to prevent duplicates

    countdown = setInterval(() => {
        if (countdownTime <= 0) {
            clearInterval(countdown);
            console.log("Countdown finished!");
        } else {
            countdownTime--;
            updateCountdownDisplay(countdownTime);
        }
    }, 1000);
}

function updateCountdownDisplay(time) {
    let months = Math.floor(time / (30 * 24 * 60 * 60)); // Approximate months (30 days per month)
    let days = Math.floor((time % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
    let hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
    let minutes = Math.floor((time % (60 * 60)) / 60);
    let seconds = time % 60;

    // Debugging
    console.log(`M: ${months}, D: ${days}, H: ${hours}, M: ${minutes}, S: ${seconds}`);

    // Update display elements
    document.getElementById("month01").textContent = Math.floor(months / 10);
    document.getElementById("month02").textContent = months % 10;
    document.getElementById("day01").textContent = Math.floor(days / 10);
    document.getElementById("day02").textContent = days % 10;
    document.getElementById("hour01").textContent = Math.floor(hours / 10);
    document.getElementById("hour02").textContent = hours % 10;
    document.getElementById("min01").textContent = Math.floor(minutes / 10);
    document.getElementById("min02").textContent = minutes % 10;
    document.getElementById("sec01").textContent = Math.floor(seconds / 10);
    document.getElementById("sec02").textContent = seconds % 10;
}

function resetCountdown() {
    console.log("Countdown reset!");
    clearInterval(countdown);
    countdownTime = 0;
    updateCountdownDisplay(countdownTime); // Reset display to 00:00:00:00:00
}
