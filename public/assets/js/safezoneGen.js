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

    var markerCount = 0;
    var srcLat;
    var srcLng;
    var dstLat;
    var dstLng;

    $('#getSafezoneBtn').on('click', function () {
        var newLocation = {
            address: $('#addressInput').val().trim(),
            city: $('#cityInput').val().trim(),
            state: $('#stateInput').val().trim()
        };
        var currentURL = window.location.origin;

        $('#addressInput').val('');
        $('#cityInput').val('');
        $('#stateInput').val('');

        $.post('http://localhost:3000/map/search', newLocation)
        .done(function (data) {
            // console.log(data);
            alert('Submitted Search. Look at console.log for JSON results for safezones. Still need to render to html');

            srcLat = 34.052234;
            srcLng = -118.243685;
            dstLat = 34.055244;
            dstLng = -118.243785;


            // Create a map object, and include the MapTypeId to add
            // to the map type control.
            var map = new google.maps.Map(document.getElementById('mapOutput'), {
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
              panel: document.getElementById('right-panel')
            });

            directionsDisplay.addListener('directions_changed', function() {
              computeTotalDistance(directionsDisplay.getDirections());
            });

            displayRoute({lat: srcLat, lng: srcLng}, {lat: dstLat, lng: dstLng}, directionsService, directionsDisplay);


            // Information Window
            var contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                '<div id="bodyContent">'+
                '<p><b>Uluru</b>, also referred to as <b>LA</b>, is a large ' +
                'sandstone rock formation in the southern part of the '+
                'Northern Territory, California. It lies 335&#160;km (208&#160;mi) '+
                'south west of the nearest large town, Alice Springs; 450&#160;km '+
                '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                'Aboriginal people of the area. It has many springs, waterholes, '+
                'rock caves and ancient paintings. Uluru is listed as a World '+
                'Heritage Site.</p>'+
                '<p>Attribution: Uluru, <a target="_blank" href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                '(last visited June 22, 2009).</p>'+
                '</div>'+
                '</div>';

            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });

            var marker = new google.maps.Marker({
              position: {lat: srcLat, lng: srcLng},
              map: map,
              title: 'Los Angeles',
              // icon: 'embassy.png',
              animation: google.maps.Animation.DROP
            });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });

            var marker2 = new google.maps.Marker({
              position: {lat: dstLat, lng: dstLng},
              map: map,
              title: 'site2',
              // icon: 'police.png',
              animation: google.maps.Animation.DROP
            });
            marker2.addListener('click', function() {
              infowindow.open(map, marker2);
            });

            // for (var i = 0; i < data.length; i++) {
            //     console.log(data[i]);
            //     var address = data[i].address;
            //     var lat = data[i].lat;
            //     var lng = data[i].lng;
            //     var locationType = data[i].locationType;
            //     var name = data[i].name;
            //     var choiceHash = data[i].choiceHash;
            //     if (i === 0) {
            //         srcLat = lat;
            //         srcLng = lng;
            //     }
            //     if (i === (data.length -1)) {
            //         dstLat = lat;
            //         dstLng = lng;
            //         console.log("Source Lat: " + srcLat);
            //         console.log("Source Lng: " + srcLng);
            //         console.log("Destination Lat: " + dstLat);
            //         console.log("Destination Lng: " + dstLng);
            //     }
            //     var tr = $('<tr>');
            //     tr.addClass('table-row');
            //     tr.append($('<td class="text-center">').text(name));
            //     tr.append($('<td class="text-center">').text(locationType));
            //     tr.append($('<td class="text-center">').text(address));
            //     tr.append($('<td class="text-center">').text(lat));
            //     tr.append($('<td class="text-center">').text(lng));
            //     // tr.append($('<td class="text-center">').text(choiceHash));
            //     $('#mapData').append(tr);
            // }
            $('#mapModal').modal('show');
            $('#mapModal').on('shown.bs.modal', function() {
              var currentCenter = map.getCenter();  // Get current center before resizing
              google.maps.event.trigger(map, "resize");
              map.setCenter(currentCenter); // Re-set previous center
              map.setZoom(13);
            });
        });
        return false;
    });
});
