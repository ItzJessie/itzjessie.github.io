// const bounceBall = () => {
//    const ballElement = document.getElementById("ball");
//    ballElement.classList.add("bounce");
// };

// const writeMessage = () => {
//     const firstName = document.getElementById("txt-first-name").value;
//     const messageP = document.getElementById("message");

//     messageP.innerHTML = "Hello " + firstName;
// };



// // Call the variable when the window loads not the function itself
// window.onload = () => {
//     document.getElementById("bounce-button").onclick = bounceBall;
//     document.getElementById("message-button").onclick = writeMessage;
// }; 


// link click example
document.getElementById("a-click!").onclick = (e) => {
    e.preventDefault();
    e.currentTarget.innerHTML = "Clicked!!!";
};



// First Way with Anonymous Function
// window.onload = () => {
//     document.getElementById("bounce-button").onclick = () => {
//       alert("Button clicked!");
//     };
// }; 

// Second Way with Const Variable
// window.onload = () => {
//     const bounceButton = document.getElementById("bounce-button")
//     bounceButton.onclick = () => {
//       alert("Button clicked!");
//     };
// }; 
