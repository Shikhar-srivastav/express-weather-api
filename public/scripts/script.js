const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message = document.querySelector('.result');
const info = document.querySelector('.desc');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    message.textContent = 'Loading...'
    info.textContent = '';

    const location = search.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message.textContent = `Error: ${data.error}`;
            } else {
                const placeName = data.result.location.name;
                const { desc, temperature, humidity } = data.result.weather;

                const formatString = `${desc}. The temperature is ${temperature} deg. celsius & the humidity is ${humidity}%.`;

                message.textContent = placeName;
                info.textContent = formatString;
            }
        });
    });
});