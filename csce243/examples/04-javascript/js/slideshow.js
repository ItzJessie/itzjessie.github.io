document.getElementById("arrow-next").onclick = () => {
    const currentImage = document.querySelector(".slideshow img:not(.hidden)");
    const nextImage = currentImage.nextElementSibling;

    currentImage.classList.add("hidden");

};