$(document).ready(function(){

    $('.col-xs-3').on('click', '.overview-display', function () {
        var newLocation = {
            address: $(this).data('address'),
        };

        $.post('/data/news', newLocation)
        .done(function (data) {
          console.log(data);
        });

        return false;
    });

});
