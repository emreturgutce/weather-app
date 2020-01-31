const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode').geocode;
const weather = require('./utils/geocode').weather;

const app = express();

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', name: 'Emre' });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Emre' });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Emre',
    help: 'This is an help message !!'
  });
});
app.get('/help/*', (req, res) => {
  res.render('404', { text: 'Help article not found', name: 'Emre' });
});
app.get('/weather', (req, res) => {
  if (!req.query.adress) {
    res.send({
      error: 'You have to provide an adress.'
    });
  } else {
    geocode(req.query.adress, ({ place, longtitude, latitude }) => {
      weather(latitude, longtitude, response => {
        const { summary, temperature } = response.body.currently;
        res.send({
          place: place,
          forecast: summary,
          temperature: temperature + 'C',
          adress: req.query.adress.toUpperCase()
        });
      });
    });
  }
});
app.get('*', (req, res) => {
  res.render('404', { text: '404 Not Found !', name: 'Emre' });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000 .');
});
