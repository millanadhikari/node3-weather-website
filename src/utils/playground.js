const forcast = require('./forcast')



    forcast('-33.868', '151.21', (error, forecastdata) => {
      if (error){
            console.log(error)
       } else{
          console.log(forecastdata)
      
       }})