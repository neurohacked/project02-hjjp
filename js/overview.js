
module.exports = {
    getRiskCalculation: function(riskObject) {
        /*
         * safetyScore:
         * totally safe: 100pts
         * danger! do not go: 0pts
         * safehouse max pts: 30
         * natural & other db max pts: 50
         * crime max pts: 20
         * weather max pts: 20
         */
        console.log(riskObject);
        // initial declared global variables to be modified later:
        var safetyScore = 100;
        // max pts 30
        var safeHouseScore = 30;
        // max pts 20
        var weatherScore = 0;
        // max pts 20
        var crimeScore = 0;
        // max pts 30
        var naturalScore = 0;
        var safeHouseNum = riskObject.safehouses;
        var currentCondition = riskObject.weather.today.precipProbability;
        var currentTemp = riskObject.weather.today.temperatureMax;
        var crimeIndex = riskObject.crime;
        var naturalIndex = riskObject.natural * 1000;
        console.log(naturalIndex);

        // // calculate risk based on safehouse results:

        var safeFactor = safeHouseNum / 90;
        safeHouseScore = safeHouseScore * safeFactor;
        safetyScore -= safeHouseScore;

        // if (safeHouseNum <= 0) {
        //     safeHouseScore = 30;
        //     safetyScore -= safeHouseScore;
        // } else if (safeHouseNum <= 5) {
        //     safeHouseScore = 20;
        //     safetyScore -= safeHouseScore;
        // } else if (safeHouseNum <= 10) {
        //     safeHouseScore = 10
        //     safetyScore -= safeHouseScore;
        // } else if (safeHouseNum <= 25) {
        //     safeHouseScore = 5
        //     safetyScore -= safeHouseScore;
        // } else if (safeHouseNum >= 50) {
        //     safeHouseScore = 0;
        //     safetyScore -= safeHouseScore;
        // } else {
        //     safeHouseScore = 15
        //     safetyScore -= safeHouseScore;
        // }

        if (currentTemp <= -50 && currentTemp >= 50 && currentCondition >= 0.50) {
            weatherScore = 20;
            safetyScore -= weatherScore;
        } else if (currentTemp < -50 && currentTemp > 50 && currentCondition <= 0.50) {
            weatherScore = 8;
            safetyScore += weatherScore;
        } else if (currentTemp > 51 && currentTemp < 90 && currentCondition >= 0.50) {
            weatherScore = 15;
            safetyScore -= weatherScore;
        } else if (currentTemp > 51 && currentTemp < 90 && currentCondition <= 0.50) {
            weatherScore = 5;
            safetyScore += weatherScore;
        } else {
            weatherScore = 10;
            safetyScore -= weatherScore;
        }


        crimeScore = (crimeIndex * 20) / 100
        safetyScore += crimeScore;

        naturalScore = (naturalIndex * 30) / 100
        safetyScore -= naturalScore;

        return {
            crime: Math.floor(crimeScore),
            weather: Math.floor(weatherScore),
            safehouses: Math.floor(safeHouseScore),
            natural: Math.floor(naturalScore),
            risk: Math.floor(safetyScore)
        }
        // console.log("--- crime: " + crimeScore + " weather: " + weatherScore + " safeHouseScore; " + safeHouseScore + " naturalScore: " + naturalScore + " TOTAL: " + safetyScore);
    }
}
