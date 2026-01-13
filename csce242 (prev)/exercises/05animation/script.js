//2-3-25
const bounceBall = () => {
    const ballElement = document.getElementById("ball");
    ballElement.classList.add("bounce");
};
// When the bounce button is clicked, their name should be displayed in the message area.
const message = () => {
    const firstName = document.getElementById("txt-first-name").value;
    const messageP = document.getElementById("message-me");
    
    messageP.innerHTML = "Hello " + firstName;

};

// Execute the code when the document is fully loaded.
window.onload = () => {
    document.getElementById("bounce-button").onclick = bounceBall;
    document.getElementById("message-button").onclick = message;
};

