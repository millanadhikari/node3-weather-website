const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

const publicdirectoryfile = path.join(__dirname, '../public')
const viewspaths = path.join(__dirname, '../template/views')
const partialpaths = path.join(__dirname, '../template/partial')
app.use(express.static(publicdirectoryfile))
 
app.set('view engine', 'hbs')
app.set('views', viewspaths)
hbs.registerPartials(partialpaths)

app.get('', function(req, res){
    res.render('index', {
        title: 'Weather',
        name: 'Milan',
    })
})

app.get('/about', function(req, res){
    res.render('about', {
        title: "About Weather",
        name: "Milan",
        age: "29",
        from: "Australia",
        nativeCountry: "Nepal"
    })
})

app.get('/help', function(req, res){
    res.render('help', {
        title: "Wepage help",
        name: "Milan",
        helppage: 'This is some helpful text',
        instakophoto: 'Kali Pd Baskota'
    })
})
app.get('/weather', function(req, res){
    if(!req.query.address){
        return res.send({
            error: "Please provide an address!"
        })
    }
    geocode(req.query.address, (error, {longitude, lattitude, location}= {}) => {
        if (error) {
            return res.send({error})
        } 
               forcast(lattitude, longitude, (error, forcastdata) => {
           if (error){
                return res.send({error})
            } 
           
           
        res.send({
            forecast: forcastdata,
            address: req.query.address,
            location    
        })
           
        })
    })
})



// app.get('/products', function(req, res){
//     if(!req.query.search){
//         return res.send({
//             error: "You must provided a search term."
//         })
//     }
//     res.send({
//         products:[]    

//     })
// })
// app.get('/help/*', function (req, res){
//     res.render('404', {
//         title: '404',
//         body: '404 Error',
//         name: 'Milan',
//         errorMessage: 'Help article not found'
//     })
// })

// app.get('*', function(req, res){
//     res.render('404', {
//         title: '404',
//         body: '404',
//         name: 'Milan',
//         errorMessage: '404 Page not found!'
//     })
// })

app.listen(3000, () =>{
    console.log('Server is up and running in port 3000!')
})
//}
//)