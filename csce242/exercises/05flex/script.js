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

 let pos = 0;
 const changeCirclePos = (increment) => {
  pos += increment;
  document.getElementById("ball").style.setProperty("top", pos + "px");
 }

 document.getElementById("down-btn").onclick = () => {
  console.log("down button clicked");
  pos++;
  changeCirclePos(10);

 }

 document.getElementById("up-btn").onclick = () => {
  console.log("up button clicked");
  pos--;
  changeCirclePos(-10);

 }

 document.getElementById("pick-btn").onchange = (event) => {
  const color = event.currentTarget.value;
  //document.getElementById("ball").style.setProperty("background-color", color);
  document.getElementById("ball").style.setProperty("--ball-color", color);

 }


 const GOAL = 1000;
 let donations = 0;

 document.getElementById("goal-display").innerHTML = `Goal $${GOAL}`;
    const donation = document.getElementById("donate").value;
    document.getElementById("donation-error").classList.add("hidden");

    if (isNaN(donation) || donation <= 0) {
      document.getElementById("donation-error").classList.remove("hidden");
      return;
    }

    // update donations
    donations += donation;

    // show donation message
    document.getElementById("donation-message").innerHTML = `$${GOAL - donations} to go!`;
    
    // update the progress bar
    document.getElementById("in-box").style.setProperty("--donation-percent", donationPercent + "%");

    // reset the input
   

    // check if the goal is reached
    

 // on page load hide the error
 

 // when add clicked if donation is negative display the error
 // otherwise update the donations and display in console;

 


