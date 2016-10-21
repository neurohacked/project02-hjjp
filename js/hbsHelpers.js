const hbs = require('handlebars');

module.exports = {

    // box color based on risk
    boxColor: hbs.registerHelper("box-color", function(risk) {
        if (risk >= 80) {
            return "box-danger";
        } else if (risk >= 60) {
            return "box-warning";
        } else if (risk >= 40) {
            return "box-primary";
        } else {
            return "box-success";
        }
    }),
    // btn color based on risk
    btnColor: hbs.registerHelper("btn-color", function(risk) {
        if (risk >= 80) {
            return "bg-red";
        } else if (risk >= 60) {
            return "bg-orange";
        } else if (risk >= 40) {
            return "bg-light-blue";
        } else {
            return "bg-green";
        }
    })
}
