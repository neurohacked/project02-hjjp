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
    }),
    // risk suggestions
    riskState: hbs.registerHelper("risk-state", function(risk) {
        if (risk >= 80) {
            return "Risk is high.";
        } else if (risk >= 60) {
            return "Risk is moderate.";
        } else if (risk >= 40) {
            return "Risk is average.";
        } else {
            return "Risk is low.";
        }
    }),
    // risk suggestions
    riskSuggest: hbs.registerHelper("risk-suggest", function(risk) {
        if (risk >= 80) {
            return "we suggest using extreme caution if you decide to travel here.";
        } else if (risk >= 60) {
            return "we suggest you be prepared and remain vigilant.";
        } else if (risk >= 40) {
            return "we suggest basic preparedness.";
        } else {
            return "we suggest having a great time.";
        }
    })
}
