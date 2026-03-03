const form = document.getElementById('contact-form');
const result = document.getElementById('contact-result');

const setFeedbackState = (message, state) => {
    result.style.display = "flex";
    result.classList.remove("success", "error", "pending");
    result.classList.add(state);
    result.textContent = message;
};

form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
    setFeedbackState("Please wait...", "pending");

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                setFeedbackState(json.message, "success");
            } else {
                console.log(response);
                setFeedbackState(json.message, "error");
            }
        })
        .catch(error => {
            console.log(error);
            setFeedbackState("Something went wrong!", "error");
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.classList.remove("success", "error", "pending");
                result.style.display = "none";
            }, 3000);
        });
};
