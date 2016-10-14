$(document).ready(function(){

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
                    console.log(data);
                    alert('Submitted Search. Look at console.log for JSON results for safezones. Still need to render to html');
                });

            return false;
        });
});
