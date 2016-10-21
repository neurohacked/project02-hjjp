$(document).ready(function() {

    $('.col-xs-3').on('click', '.overview-display', function () {

        $('.overview-collection').empty();
        var modalHtml = '<div class="modal fade overview-modal" tabindex="-1" role="dialog" aria-labelledby="overview-modal">'+
            '<div class="modal-dialog modal-md" role="document">'+
                '<!-- Modal content-->'+
                '<div class="modal-content">'+
                    '<div class="box-header with-border">'+
                        '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                        '<h4 class="box-title">Risk Overview</h4>'+
                    '</div>'+
                    '<div class="box-body">'+
                        '<div id="risk-data">'+
                        '</div>'+
                    '</div>'+
                    '<div class="box-footer no-padding text-center">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
        $('.overview-collection').append(modalHtml);

        $('.overview-modal').modal('show');
        $('.overview-modal').on('shown.bs.modal', function () {
            Morris.Donut({
                element: 'risk-data',
                data: [
                  {label: 'Crime', value: 25 },
                  {label: 'Weather', value: 40 },
                  {label: 'Safehouses', value: 25 },
                  {label: 'Terrror', value: 10 }
                ],
                formatter: function (y) { return y + "%" },
                colors: ["#dd4b39", "#357ca5", "#00a65a", "#f39c12"]
                });
            })

        return false;
    });
});
