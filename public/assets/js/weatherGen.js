$(document).ready(function(){

    var srcLat;
    var srcLng;
    var dstLat;
    var dstLng;


    $('.col-xs-3').on('click', '.weather-display', function () {
        var newLocation = {
            lat: $(this).data('lat'),
            lng: $(this).data('lng')
        };
        var currentURL = window.location.origin;
        console.log(newLocation);
        console.log(currentURL);
        $.post('/data/weather', newLocation)
            .done(function (data) {
                $('#weatherCollection').empty();
                var modalHtml = '<div id="weatherModal" class="modal fade" role="dialog">'+
                    '<div class="modal-dialog">'+
                        '<!-- Modal content-->'+
                        '<div class="modal-content mapContent">'+
                            '<div class="modal-header">'+
                                '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                '<h4 class="modal-title">Weather Information</h4>'+
                            '</div>'+
                            '<div id=weatherOutput class="modal-body weatherOutput">'+
                            '</div>'+
                            '<div class="modal-footer">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
                $('#weatherCollection').append(modalHtml);

                $('#weatherModal').modal('show');
            });

        return false;
    });

});
