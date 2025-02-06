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

 


