// Sources: ChatGPT, Coding ALL-IN-ONE by Chris Minnick, W3Schools

document.addEventListener("DOMContentLoaded", () => {
    // Column 1
    const columnOne = document.querySelector(".col-1");
    const triangle = document.getElementById("triangle");
    const showTriangle = () => {
        triangle.classList.add("is-visible");
    };
    columnOne.addEventListener("click", showTriangle);

    // Column 2
    const datePicker = document.getElementById("datePicker");
    const selectedDate = document.getElementById("selectedDate");
    const updateSelectedDate = (event) => {
        const rawValue = event.target.value;
        if (!rawValue) {
            selectedDate.textContent = "";
            return;
        }

        const date = new Date(`${rawValue}T00:00:00`);
        const formattedDate = new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(date);

        selectedDate.textContent = `Selected Date: ${formattedDate}`;
    };
    datePicker.addEventListener("change", updateSelectedDate);

    // Column 3
    const imagePicker = document.getElementById("imagePicker");
    const sunnyImageSrc = "images/sunny.png";
    const addSunnyFrame = () => {
        if (imagePicker.src.includes(sunnyImageSrc)) {
            imagePicker.classList.add("image-frame");
        }
    };
    imagePicker.addEventListener("click", addSunnyFrame);
});