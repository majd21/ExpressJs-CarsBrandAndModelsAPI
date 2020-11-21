const express = require('express');
const exphds = require('express-handlebars')
const cars = require('./database/cars')

const app = express()

app.engine('handlebars', exphds());
app.set('view engine', 'handlebars');

app.get('/' , (req ,res) => {
    res.render('index' , {
        cars
    })
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//* Use api
app.use('/api/cars' , require('./routes/api/cars'))



const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log('Server is running on port ' + PORT);
})