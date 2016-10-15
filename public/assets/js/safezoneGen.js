$(document).ready(function() {



    $('#getSafezoneBtn').on('click', function() {
        $('.locationModal').modal('hide');
        var newLocation = {
            address: $('#addressInput').val().trim(),
            city: $('#cityInput').val().trim(),
            state: $('#stateInput').val().trim()
        };
        var currentURL = window.location.origin;

        $('#addressInput').val('');
        $('#cityInput').val('');
        $('#stateInput').val('');

        $.post('/map/search', newLocation)
            .done(function(data) {
                console.log(data);
                eModal.confirm('Submitted Search. Look at console.log for JSON results for safezones. Still need to render to html')
                .then(confirmCallback, optionalCancelCallback);
            });

        return false;
    });
});
