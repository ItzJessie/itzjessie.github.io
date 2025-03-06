const getShoes = async () => {
    const url = "https://portiaportia.github.io/json/shoes.json";

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }

}

const showShoes = () => {
    let shoes = getShoes();
};

window.onload = () => showShoes();