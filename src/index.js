
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.Port || 3300

const publicStaticDirPath = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname,'../templates/views')

const partialsPath =   path.join(__dirname,'../templates/partials')


app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('',(req,res) => {
    res.render('index',{
        title:'My Weather App'
    })
})


app.get('/weather',(req,res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error:"You must enter address in the search box mofo"
        })
    }
    weatherData(address,(error,{temperature,description,city} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        //console.log(temperature,description,city);
        res.send({
            temperature,
            description,
            city
        })

    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: 'Page not found'
    })
})

app.listen(port,() => {
    console.log("Server is up and running my man, on the port",port)

})
