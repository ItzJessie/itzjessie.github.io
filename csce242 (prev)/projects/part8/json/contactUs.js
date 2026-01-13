// Project Part 7

document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const statusMessage = document.getElementById('form-status');
    
    try {
        let response = await fetch('send_email.php', {
            method: 'POST',
            body: formData
        });
        
        let result = await response.text();
        statusMessage.innerText = result;
        statusMessage.style.color = 'green';
    } catch (error) {
        statusMessage.innerText = 'Error sending message. Please try again later.';
        statusMessage.style.color = 'red';
    }
    
    setTimeout(() => { statusMessage.innerText = ''; }, 5000);
});
