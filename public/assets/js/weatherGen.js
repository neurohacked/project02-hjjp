$(document).ready(function(){

    $('.col-xs-3').on('click', '.weather-display', function () {
        var newLocation = {
            lat: $(this).data('lat'),
            lng: $(this).data('lng')
        };
        var currentURL = window.location.origin;
        $.post('/data/weather', newLocation)
            .done(function (data) {
                $('.weather-collection').empty();
                var modalHtml = '<div class="modal fade weather-modal" tabindex="-1" role="dialog" aria-labelledby="weather-modal">'+
                    '<div class="modal-dialog modal-lg" role="document">'+
                        '<!-- Modal content-->'+
                        '<div class="modal-content">'+
                            '<div class="box-header with-border">'+
                                '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                '<h4 class="box-title">Weather Information</h4>'+
                            '</div>'+
                            '<div class="box-body weatherOutput">'+
                            '</div>'+
                            '<div class="box-footer no-padding text-center">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
                $('.weather-collection').append(modalHtml);
                // formate unix date
                var convertedDate = function(epoch) {
                    return moment.unix(epoch).format('dddd, MMM Do');
                }
                // if there are weather alerts, asign them
                if (data.alerts) {
                    var alerts = data.alerts;
                }

                // weather variables
                var summary = data.summary;
                var today = data.today;
                var tomorrow = data.tomorrow;
                var day3 = data.day3;
                var day4 = data.day4;
                var day5 = data.day5;
                var contentHtml =
                    '<div class="row">'+
                        '<div class="col-xs-12 text-center">'+
                            '<h3 box-title>Summary</h3>'+
                            '<p class="with-border">'+ summary + '</p>'+
                        '</div>'+
                        '<div class="col-xs-12 text-center with-border">'+
                            '<h4>5 Day Forecast</h4>'+
                            '<div class="forecast row">'+
                                '<div class="col-xs-2 text-center">'+
                                    '<h5>' + convertedDate(today.time) + '</h5>'+
                                    '<canvas class="' + today.icon + '" width="50" height="50"></canvas>'+
                                    '<p><i style="color: DeepSkyBlue;" class="fa fa-arrow-down"></i> ' + today.temperatureMin + '°F | ' + today.temperatureMax + '°F <i style="color: DarkOrange;" class="fa fa-arrow-up"></i></p>'+
                                    '<p>'+ today.summary + '</p>'+
                                    '<p>Precipitation: '+ today.precipProbability + '%</p>'+
                                    '<p>Humidity: '+ today.humidity + '</p>'+
                                    '<p>Ozone: '+ today.ozone + '</p>'+
                                '</div>'+
                                '<div class="col-xs-2 text-center">'+
                                    '<h5>' + convertedDate(tomorrow.time) + '</h5>'+
                                    '<canvas class="' + tomorrow.icon + '" width="50" height="50"></canvas>'+
                                    '<p><i style="color: DeepSkyBlue;" class="fa fa-arrow-down"></i> ' + tomorrow.temperatureMin + '°F | ' + tomorrow.temperatureMax + '°F <i style="color: DarkOrange;" class="fa fa-arrow-up"></i></p>'+
                                    '<p>'+ tomorrow.summary + '</p>'+
                                    '<p>Precipitation: '+ tomorrow.precipProbability + '%</p>'+
                                    '<p>Humidity: '+ tomorrow.humidity + '</p>'+
                                    '<p>Ozone: '+ tomorrow.ozone + '</p>'+
                                '</div>'+
                                '<div class="col-xs-2 text-center">'+
                                    '<h5>' + convertedDate(day3.time) + '</h5>'+
                                    '<canvas class="' + day3.icon + '" width="50" height="50"></canvas>'+
                                    '<p><i style="color: DeepSkyBlue;" class="fa fa-arrow-down"></i> ' + day3.temperatureMin + '°F | ' + day3.temperatureMax + '°F <i style="color: DarkOrange;" class="fa fa-arrow-up"></i></p>'+
                                    '<p>'+ day3.summary + '</p>'+
                                    '<p>Precipitation: '+ day3.precipProbability + '%</p>'+
                                    '<p>Humidity: '+ day3.humidity + '</p>'+
                                    '<p>Ozone: '+ day3.ozone + '</p>'+
                                '</div>'+
                                '<div class="col-xs-2 text-center">'+
                                    '<h5>' + convertedDate(day4.time) + '</h5>'+
                                    '<canvas class="' + day4.icon + '" width="50" height="50"></canvas>'+
                                    '<p><i style="color: DeepSkyBlue;" class="fa fa-arrow-down"></i> ' + day4.temperatureMin + '°F | ' + day4.temperatureMax + '°F <i style="color: DarkOrange;" class="fa fa-arrow-up"></i></p>'+
                                    '<p>'+ day4.summary + '</p>'+
                                    '<p>Precipitation: '+ day4.precipProbability + '%</p>'+
                                    '<p>Humidity: '+ day4.humidity + '</p>'+
                                    '<p>Ozone: '+ day4.ozone + '</p>'+
                                '</div>'+
                                '<div class="col-xs-2 text-center">'+
                                    '<h5>' + convertedDate(day5.time) + '</h5>'+
                                    '<canvas class="' + day5.icon + '" width="50" height="50"></canvas>'+
                                    '<p><i style="color: DeepSkyBlue;" class="fa fa-arrow-down"></i> ' + day5.temperatureMin + '°F | ' + day5.temperatureMax + '°F <i style="color: DarkOrange;" class="fa fa-arrow-up"></i></p>'+
                                    '<p>'+ day5.summary + '</p>'+
                                    '<p>Precipitation: '+ day5.precipProbability + '%</p>'+
                                    '<p>Humidity: '+ day5.humidity + '</p>'+
                                    '<p>Ozone: '+ day5.ozone + '</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

                $('.weatherOutput').append(contentHtml);

                if (data.alerts) {
                    var weatherAlertsBox =
                    '<p class="with-border"></p>'+
                        '<div class="col-xs-12 text-center">'+
                            '<h4><i style="color: red;" class="fa fa-warning fa-fw"></i> Alerts</h4>'+
                            '<div class="forecast row weather-alerts">'+
                            '</div>'+
                        '</div>';
                }
                if (data.alerts) {
                    $('.weatherOutput').append(weatherAlertsBox);
                    // for each weather alert, grab the uri
                    for (var i = 0; i < alerts.length; i++) {
                        currentAlertsTitle = alerts[i].title;
                        var currentAlertsDesc = alerts[i].description;
                        var currentAlertsUri = alerts[i].uri;
                        var weatherAlerts =
                        '<div class="col-xs-12 text-center">'+
                            '<h5><strong>' + currentAlertsTitle + '</strong></h5>'+
                            '<p>' + currentAlertsDesc.slice(3, 200) + ' <a href="' + currentAlertsUri + '" target="_blank">MORE INFO...</a></p>'+
                        '</div>';
                        $('.weather-alerts').append(weatherAlerts);
                        console.log(weatherAlerts);
                    }

                }

                $('.weather-modal').modal('show');
                $('.weather-modal').on('shown.bs.modal', function () {
                    var icons = new Skycons({"color": "#222"}),
                    list  = [
                        "clear-day", "clear-night", "partly-cloudy-day",
                        "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
                        "fog"
                    ],
                    i;

                    for(i = list.length; i--; ) {
                        var weatherType = list[i], elements = document.getElementsByClassName( weatherType );
                          for (e = elements.length; e--;){
                        icons.set( elements[e], weatherType );
                    }
                }

      icons.play();
                })
            });

        return false;
    });

});
