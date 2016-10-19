    var apiKey = '63ff12333f5125605590036f6f111772';
    var lat = '17.3817219'
    var lng = '121.5417694'
    var queryURL = "https://api.darksky.net/forecast/" + apiKey + "/" + lat + "," + lng;

    $.ajax({
        url: queryURL,
        method: 'GET',
        dataType: 'jsonp'
    }).done(function(response) {
        console.log(response); // full response obj
        console.log(response.currently.temperature); // current temp
        console.log(response.daily.data[0].summary); // current description
        
    });