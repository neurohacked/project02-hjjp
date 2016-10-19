$(document).ready(function(){

    var srcLat;
    var srcLng;
    var dstLat;
    var dstLng;


    $('.col-xs-4').on('click', '.weather-display', function () {
        var newLocation = {
            city: $(this).data('city'),
            state: $(this).data('state')
        };
        var currentURL = window.location.origin;
        console.log(newLocation);
        // $.post('/data/weather', newLocation)
        // .done(function (data) {
        //
        //     for (var i = 0; i < 2; i++) {
        //       if (i === 0) {
        //         srcLat = data[i].lat;
        //         srcLng = data[i].lng;
        //       } else if (i === 1) {
        //         dstLat = data[i].lat;
        //         dstLng = data[i].lng;
        //       } else {
        //         dstLat = srcLat;
        //         dstLng = srcLng;
        //       }
        //     }
        //
        //     $('#modalCollection').empty();
        //     var modalHtml = '<div id=mapModal class="modal fade" role="dialog">'+
        //         '<div class="modal-dialog">'+
        //             '<!-- Modal content-->'+
        //             '<div class="modal-content mapContent">'+
        //                 '<div class="modal-header">'+
        //                     '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
        //                     '<h4 class="modal-title">Safezone Locations</h4>'+
        //                 '</div>'+
        //                 '<div id=mapOutput class="modal-body mapOutput">'+
        //                 '</div>'+
        //                 '<div id=rightPanel class="rightPanel">'+
        //                     '<p>Total Distance: <span id="total"></span></p>'+
        //                 '</div>'+
        //                 '<div class="modal-footer">'+
        //                 '</div>'+
        //             '</div>'+
        //         '</div>'+
        //     '</div>';
        //     $('#modalCollection').append(modalHtml);
        //
        //     $('#mapModal').modal('show');
        //     $('#mapModal').on('shown.bs.modal', function() {
        //       var currentCenter = map.getCenter();  // Get current center before resizing
        //       google.maps.event.trigger(map, "resize");
        //       map.setCenter(currentCenter); // Re-set previous center
        //       map.setZoom(13);
        //     });
        // });

        return false;
    });

});
