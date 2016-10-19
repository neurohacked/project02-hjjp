$(document).ready(function(){

    $('.col-xs-3').on('click', '.weather-display', function () {
        var newLocation = {
            lat: $(this).data('lat'),
            lng: $(this).data('lng')
        };
        var currentURL = window.location.origin;
        $.post('/data/weather', newLocation)
            .done(function (data) {
                console.log(data.day3);
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

                var convertedDate = function(epoch) {
                    return moment.unix(epoch * 1000).format('dddd');
                }

                var summary = data.summary;
                var today = data.today;
                var tomorrow = data.tomorrow;
                var day3 = data.day3;
                var day4 = data.day4;
                var day5 = data.day5;
                var contentHtml = '<div class="row">'+
                        '<div class="col-xs-12 text-center">'+
                            '<h3 box-title>Summary</h3>'+
                            '<p class="with-border">'+ summary + '</p>'+
                        '</div>'+
                        '<hr>'+
                        '<div class="col-xs-12 text-center">'+
                            '<h4>5 Day Forecast</h4>'+
                            '<div class="forecast row">'+
                                '<div class="col-xs-2 text-center">'+
                                    '<h5>' + convertedDate(today.time) + '</h5>'+
                                    '<p><i style="color: red;" class="fa fa-arrow-down"></i> ' + today.temperatureMin + '°F | ' + today.temperatureMax + '°F <i style="color: green;" class="fa fa-arrow-up"></i></p>'+
                                    '<p>'+ today.summary + '</p>'+
                                '</div>'+
                                '<div class="col-xs-2 text-center">'+
                                    '<h5>' + convertedDate(tomorrow.time) + '</h5>'+
                                    '<p><i style="color: red;" class="fa fa-arrow-down"></i> ' + tomorrow.temperatureMin + '°F | ' + tomorrow.temperatureMax + '°F <i style="color: green;" class="fa fa-arrow-up"></i></p>'+
                                    '<p>'+ tomorrow.summary + '</p>'+
                                '</div>'+
                                '<div class="col-xs-2 text-center">'+
                                    '<h5>' + convertedDate(day3.time) + '</h5>'+
                                    '<p><i style="color: red;" class="fa fa-arrow-down"></i> ' + day3.temperatureMin + '°F | ' + day3.temperatureMax + '°F <i style="color: green;" class="fa fa-arrow-up"></i></p>'+
                                    '<p>'+ day3.summary + '</p>'+
                                '</div>'+
                                '<div class="col-xs-2 text-center">'+
                                    '<h5>' + convertedDate(day4.time) + '</h5>'+
                                    '<p><i style="color: red;" class="fa fa-arrow-down"></i> ' + day4.temperatureMin + '°F | ' + day4.temperatureMax + '°F <i style="color: green;" class="fa fa-arrow-up"></i></p>'+
                                    '<p>'+ day4.summary + '</p>'+
                                '</div>'+
                                '<div class="col-xs-2 text-center">'+
                                    '<h5>' + convertedDate(day5.time) + '</h5>'+
                                    '<p><i style="color: red;" class="fa fa-arrow-down"></i> ' + day5.temperatureMin + '°F | ' + day5.temperatureMax + '°F <i style="color: green;" class="fa fa-arrow-up"></i></p>'+
                                    '<p>'+ day5.summary + '</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>';

                $('.weatherOutput').append(contentHtml);

                $('.weather-modal').modal('show');
            });

        return false;
    });

});
