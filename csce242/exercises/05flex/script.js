// window.onload = () => {
//     document.write("hello, world!");
//  };

// Version 2 Execution of anonymous code

document.getElementById("btn-click-one").onclick = () => {
   document.getElementById("message-one").innerHTML = "be happy";
}

// Change color
document.getElementById("btn-click-two").onclick = () => {
   const messageP = document.getElementById("message-two");
   messageP.innerHTML = "be sad";
   messageP.classList.add("win");
 }

 document.getElementById("btn-click-three").onclick = () => {
   document.getElementById("message-one").innerHTML = "";
 }

 document.getElementById("feeling").onkeydown = (event) => {
      document.getElementById("feeling").innerHTML = 
      "You are feeling: " + event.currentTarget.value;
   
 }

 document.getElementById("toggle-nav").onclick = () => {
  document.getElementById("nav-items").classList.toggle("hide-small");
 }

 document.getElementById("btn-word").onclick = () => {
  const color = document.getElementById("colorP").value.toLowerCase().trim();
  let mood = "Happy";

  if (color == "red") {
    mood = "Rage";
  } else if (color == "green") {
    mood = "bread winner"
  } else {
    mood = "I'm cooling."
  }

  document.getElementById("color-mP").innerHTML = 
  `You choose ${color}. You are feeling ${mood}.`
 }

 


