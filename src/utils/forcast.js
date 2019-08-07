
const request = require('request')
const chalk = require('chalk')


const forCast= (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3a3b41f44d121971c5fa412ec66a482b/'+ lattitude + ',' +  longitude

    request({url, json:true},(error, {body})=>
       {
        if (error){
            callback('Unable to fetch location services !', undefined)
        }else if(body.error){
            callback('Couldnt find the location!', undefined)
        }else {
            callback(undefined, ('It is ' + body.currently.icon + ' which is ' + body.currently.temperature + ' degrees farhenit out there. Its humidity is ' + body.currently.humidity + '.'))
        

        }}) }
    
    module.exports = forCast


    // forCast(-75.7088, 44.1545, (error, forecastdata) => {
    //                 if (error){
    //                       console.log(error)
    //                  } else{
    //                     console.log(forecastdata)
                    
    //                  }})