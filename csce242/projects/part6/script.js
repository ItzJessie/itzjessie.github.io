/*Project Part:3*/
/*Beginning JavaScript*/

document.getElementById("toggle-nav").onclick = () => {
    document.getElementById("nav-items").classList.toggle("hide-small");
}

let countdownInterval;

document.getElementById('startCountdown').addEventListener('click', function() {
    const selectedGame = document.getElementById('games').value;
    const gameReleaseDates = {
        'mk-9': '2023-10-01T00:00:00',
        'gta-6': '2023-11-15T00:00:00',
        'er-2': '2024-03-10T00:00:00',
        'gta-6O': '2024-12-25T00:00:00',
        'bo-3': '2025-10-01T00:00:00'
    }
    
    // Clear any existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    function updateCountdown() {
        const releaseDate = new Date(gameReleaseDates[selectedGame]);
        const currentDate = new Date();
        const timeDifference = releaseDate - currentDate;
        
        if (timeDifference <= 0) {
            document.getElementById('countdown').innerHTML = "Game has been released!";
            clearInterval(countdownInterval);
            return;
        }
        
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    
    // Update immediately and then set interval
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
});

    