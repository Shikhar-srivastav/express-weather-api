const request = require('postman-request');

const forecast = ({ latitude, longitude }, callback) => {
    const weatherURL = 'http://api.weatherstack.com/current';
    const weatherApiKey = 'b0cafa175c27e91bc5260e528d12e3a2';

    const query = `?access_key=${weatherApiKey}&query=${latitude},${longitude}`;

    request({ url: (weatherURL + query), json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to forecast service', undefined);
        } else if (response.body.error) {
            callback(response.body.error.info, undefined);
        } else {
            const data = response.body.current;
            
            callback(undefined, {
                desc: data.weather_descriptions[0],
                temperature: data.temperature,
                humidity: data.humidity
            });
        }
    });
};

module.exports = forecast;