var styledMapType;

function initMap() {
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    styledMapType = new google.maps.StyledMapType(
        [
          {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#c9b2a6'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{color: '#dcd2be'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#ae9e90'}]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#93817c'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#a5b076'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#447530'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#f5f1e6'}]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{color: '#fdfcf8'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#f8c967'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#e9bc62'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{color: '#e98d58'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{color: '#db8555'}]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#806b63'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{color: '#8f7d77'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#ebe3cd'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#dfd2ae'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#b9d3c2'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#92998d'}]
          }
        ],
        {name: 'Styled Map'}
    );

}

function displayRoute(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING',
    avoidTolls: true
  }, function(response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  document.getElementById('total').innerHTML = total + ' km';
}


$(document).ready(function(){

    var srcLat;
    var srcLng;
    var dstLat;
    var dstLng;


    $('.col-xs-4').on('click', '.travel-display', function () {
        var newLocation = {
            address: $(this).data('address')
        };
        var currentURL = window.location.origin;

        $.post('/data/travel', newLocation)
        .done(function (data) {

            for (var i = 0; i < 2; i++) {
              if (i === 0) {
                srcLat = data[i].lat;
                srcLng = data[i].lng;
              } else if (i === 1) {
                dstLat = data[i].lat;
                dstLng = data[i].lng;
              } else {
                dstLat = srcLat;
                dstLng = srcLng;
              }
            }

            $('#travelCollection').empty();
            var modalHtml = '<div id=travelModal class="modal fade" role="dialog">'+
                '<div class="modal-dialog">'+
                    '<!-- Modal content-->'+
                    '<div class="modal-content mapContent">'+
                        '<div class="modal-header">'+
                            '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                            '<h4 class="modal-title">Travel Locations</h4>'+
                              '<li class="travelBooking">'+
                                '<a target="_blank" href="https://www.google.com/flights/?f=0#search;f=LAX;d=2016-11-03;r=2016-11-07;mc=m" alt="Flight Check">'+
                                  '<i class="fa fa-home fa-2x box-icon"></i>'+
                                  '<p>Check Flight Path</p>'+
                                '</a>'+
                                '<a target="_blank" href="https://www.expedia.com/" alt="Travel Booking">'+
                                  '<i class="fa fa-home fa-2x box-icon"></i>'+
                                  '<p>Book Hotel and Flight</p>'+
                                '</a>'+
                              '</li>'+
                        '</div>'+
                        '<div id=travelOutput class="modal-body mapOutput">'+
                        '</div>'+
                        '<div id=rightPanelTravel class="rightPanelTravel">'+
                            '<p>Total Distance: <span id="total"></span></p>'+
                        '</div>'+
                        '<div class="modal-footer">'+
                            '<a href="https://www.google.com/flights/?f=0">Check Travel Bookings</a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
            $('#travelCollection').append(modalHtml);

            // Create a map object, and include the MapTypeId to add
            // to the map type control.
            var map = new google.maps.Map(document.getElementById('travelOutput'), {
              zoom: 11,
              center: {lat: srcLat, lng: srcLng},
              mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                        'styled_map']
              }
            });

            //Associate the styled map with the MapTypeId and set it to display.
            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');

            // Construct the circle for each value in citymap.
            // Note: We scale the area of the circle based on the population.
            // Add the circle for this city to the map.
            var cityCircle = new google.maps.Circle({
              strokeColor: '#7CFC00',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#7CFC00',
              fillOpacity: 0.35,
              map: map,
              center: {lat: srcLat, lng: srcLng},
              radius: 1000
            });
            var cityMiddleCircle = new google.maps.Circle({
              strokeColor: '#00CED1',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#00CED1',
              fillOpacity: 0.10,
              map: map,
              center: {lat: srcLat, lng: srcLng},
              radius: 3000
            });
            var cityOuterCircle = new google.maps.Circle({
              strokeColor: '#FF6347',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF6347',
              fillOpacity: 0.10,
              map: map,
              center: {lat: srcLat, lng: srcLng},
              radius: 5000
            });

            // Draggable directional map icons
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer({
              draggable: true,
              map: map,
              panel: document.getElementById('rightPanelTravel')
            });

            directionsDisplay.addListener('directions_changed', function() {
              computeTotalDistance(directionsDisplay.getDirections());
            });

            displayRoute({lat: srcLat, lng: srcLng}, {lat: dstLat, lng: dstLng}, directionsService, directionsDisplay);


            // Information Window
            for (var i = 0; i < data.length; i++) {
                var address = data[i].address;
                var lat = data[i].lat;
                var lng = data[i].lng;
                var locationType = data[i].locationType;
                var name = data[i].name;
                var choiceHash = data[i].choiceHash;
                contentHtml = '<div id="content">'+
                    '<div id="siteNotice">'+
                    '</div>'+
                    '<h4 id="firstHeading" class="firstHeading">' + name + '</h4>'+
                    '<div id="bodyContent">'+
                    '<p><b>' + address + '</b></p>' +
                    '<p>' + locationType.replace(/_/g, " ") + '</p>' +
                    '</div>'+
                    '</div>';

                marker = new google.maps.Marker({
                  position: {lat: lat, lng: lng},
                  map: map,
                  title: name,
                  icon: '/assets/img/map/' + locationType + '.png',
                  animation: google.maps.Animation.DROP
                });

                marker.content = contentHtml;

                var infoWindow = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.setContent(this.content);
                    infoWindow.open(this.getMap(), this);
                });

            }
            $('#travelModal').modal('show');
            $('#travelModal').on('shown.bs.modal', function() {
              var currentCenter = map.getCenter();  // Get current center before resizing
              google.maps.event.trigger(map, "resize");
              map.setCenter(currentCenter); // Re-set previous center
              map.setZoom(13);
            });
        });

        return false;
    });

});
