/*Project Part:3*/
/*Beginning JavaScript*/

document.addEventListener("DOMContentLoaded", function () {
    const toggleNav = document.getElementById("toggle-nav");
    const mainNav = document.getElementById("main-nav");
   
   toggleNav.addEventListener("click", function(event) {
       event.stopPropagation();
       if (mainNav.style.transform === "translateX(0%)") {
           mainNav.style.transform = "translateX(-100%)";
       } else {
           mainNav.style.transform = "translateX(0%)";
       }

   document.addEventListener("click", function (event) {
       if (!toggleNav.contains(event.target) && !mainNav.contains(event.target)) {
           mainNav.style.transform = "translateX(-100%)";  // Close the navigation menu when clicked outside of it.
       }
   });
   });
});



    