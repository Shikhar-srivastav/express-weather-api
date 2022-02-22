const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Shikhar'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Shikhar'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided to search for the weather'
        }); 
    }

    const address = req.query.address;

    geocode(address, (error, location) => {
        if (error) {
            return res.send({ error });
        }

        forecast(location, (error, weather) => {
            if (error) {
                return res.send({ error });
            }

            return res.send({
                address,
                result: {
                    location,
                    weather
                }
            });
        });
    });
});

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'Must provide a search term'
//         });
//     }
//     console.log(req.query);
        
//     return res.send({
//         products: []
//     });
// });

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Shikhar',
        message: 'Help message'
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        author: 'Shikhar',
        message: 'Help page not found'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        author: 'Shikhar',
        message: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up at port 3000');
});