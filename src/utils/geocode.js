const request = require('postman-request');

const geocode = (location, callback) => {
    const geocodingURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    const geocodingApiKey = 'pk.eyJ1Ijoic2hpa2hhcnNyIiwiYSI6ImNrem8wYmNsbzRpcXYydW8xYXp3dXplOTcifQ.lPBDgLvJ6wmBjEjsm2w7cg';

    const query = `/${encodeURIComponent(location)}.json?access_token=${geocodingApiKey}&limit=1`;

    request({ url: (geocodingURL + query), json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geocode service', undefined);
        } else if (response.body.message) {
            callback(response.body.message, undefined);
        } else if (response.body.features.length === 0) { 
            callback('No match found', undefined);
        } else {
            const data = response.body.features[0];

            callback(undefined, {
                name: data.place_name,
                latitude: data.center[1],
                longitude: data.center[0]
            });
        }
    });
};

module.exports = geocode;