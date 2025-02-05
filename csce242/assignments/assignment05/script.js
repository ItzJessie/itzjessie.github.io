// Sources: ChatGPT, Coding ALL-IN-ONE by Chris Minnick, W3Schools

// Column 1
document.addEventListener("DOMContentLoaded", function() {
    let messageP = document.getElementById("message");
    
    messageP.addEventListener("click", function(event) {
       let newLine = document.createElement("br");
       let helloText = document.createTextNode("Hello");
       
       messageP.appendChild(newLine);
       messageP.appendChild(helloText);
    });
});

// Column 2
document.getElementById('colorPalette').addEventListener('input', function() {
    let starP = document.getElementById('image-color');
    starP.style.color = this.value;
});


// Column 3
document.addEventListener("DOMContentLoaded", function() {
    const image1 = "images/eye.gif";
    const image2 = "images/star.jpeg";

    let nextImage = 1;

    let imageP = document.getElementById("imagePicker");

    imageP.addEventListener("click", changeImage);

    function changeImage() {
        console.log("Changing image");
        if (nextImage === 1) {
            imageP.src = image1;
            nextImage = 2;
        } else {
            imageP.src = image2;
            nextImage = 1;
        }
    }
});