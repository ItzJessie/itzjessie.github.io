// window.onload = () => {
//     document.write("hello, world!");
//  };

// Version 2 Execution of anonymous code

document.getElementById("btn-click-one").onclick = () => {
   console.log("hello world!");
   document.getElementById("message-one").innerHTML = "First Hello, world!";
}

// Change color
document.getElementById("btn-click-two").onclick = () => {
   const messageP = document.getElementById("message-two");
   messageP.innerHTML = "Second Hello, world!";
   messageP.classList.toggle("win");

 }

 


