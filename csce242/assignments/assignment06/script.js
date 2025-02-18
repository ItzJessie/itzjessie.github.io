function showSection(sectionId) {
    document.getElementById('traveling').classList.remove('active');
    document.getElementById('color-heart').classList.remove('active');
    document.getElementById(sectionId).classList.add('active');
}

function toggleDropdown() {
    let dropdown = document.getElementById('dropdown-menu');
    let arrow = document.getElementById('arrow');

    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        arrow.innerHTML = "▼";
    } else {
        dropdown.classList.add('show');
        arrow.innerHTML = "▲";
    }
}

function updateTransport() {
    let transport = document.getElementById('transport').value.toLowerCase();
    let img = document.getElementById('transport-img');
    let images = {
        'bike' : "images/bike.png",
        'car': "images/car.png",
        'bus': 'images/bus.png'
    };
    img.src = images[transport] || '';
}

function changeColor(color) {
    document.getElementById('heart').style.background = color;
}

showSection();