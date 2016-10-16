var weather = require('weather-js');

var city = process.argv[2];

weather.find({ search: city, degreeType: "F" }, function(err, result) {


    if (err) {
        console.log(err);
    }



    console.log('YESTERDAY: ' + JSON.stringify(result[0].forecast[0].day))
   	console.log('---------------------------')
    console.log(JSON.stringify(result[0].forecast[0], null, 6)); //yesterday full forecast
    console.log(JSON.stringify(result[0].forecast[0].low, null, 6)); //yesterday lowest temp 
    console.log(JSON.stringify(result[0].forecast[0].high, null, 6)); //yesterday highest temp

	console.log('TODAY: ' + JSON.stringify(result[0].forecast[1].day))
   	console.log('---------------------------')
    console.log(JSON.stringify(result[0].forecast[1], null, 6)); //today full forecast
    console.log(JSON.stringify(result[0].forecast[1].low, null, 6)); //today lowest temp 
    console.log(JSON.stringify(result[0].forecast[1].high, null, 6)); //today highest temp

	console.log('TOMORROW: ' + JSON.stringify(result[0].forecast[2].day))
   	console.log('---------------------------')
    console.log(JSON.stringify(result[0].forecast[2], null, 6)); //tomorrow full forecast
    console.log(JSON.stringify(result[0].forecast[2].low, null, 6)); //tomorrow lowest temp 
    console.log(JSON.stringify(result[0].forecast[2].high, null, 6)); //tomorrow highest temp



    // if we want to serve just current conditions:

    console.log(JSON.stringify(result[0].current, null, 6)); //right now full conditions
    console.log(JSON.stringify(result[0].current.imageUrl, null, 6)); //right now icon




})
