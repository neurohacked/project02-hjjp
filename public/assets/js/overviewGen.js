$(document).ready(function() {

    $('.col-xs-3').on('click', '.overview-display', function () {

        $('.overview-collection').empty();
        var modalHtml = '<div class="modal fade overview-modal" tabindex="-1" role="dialog" aria-labelledby="overview-modal">'+
            '<div class="modal-dialog modal-lg" role="document">'+
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
            Morris.Bar({
                element: 'risk-data',
                data: [
                    {factor: 'Crime', risk: 50},
                    {factor: 'Weather', risk: 20},
                    {factor: 'Safehouses', risk: 10},
                    {factor: 'Terror', risk: 40}
                ],
                xkey: 'factor',
                ykeys: ['risk'],
                labels: ['Risk'],
                barRatio: 0.4,
                xLabelAngle: 35,
                hideHover: 'auto'
            });
        })

        return false;
    });
});
