// safetyScore: 
// totally safe: 100pts
// danger! do not go: 0pts

// safehouse max pts: 30
// terror & other db max pts: 50
// crime max pts: 20
// weather max pts: 20

safezoneNum = require('../js/safezoneCount');
console.log(safezoneNum.getSafezoneCount());

// initial declared global variables to be modified later:
var safetyScore = 0;
// max pts 30
var safeHouseScore = 0;
// max pts 20
var weatherScore = 0;
// max pts 20
var crimeScore = 0;
// max pts 30
var terrorScore = 0;


//grab all the variables:
var currentTemp = 79;

var currentCondition = 0.23;

// var safeHouseNum = 53;

var crimeIndex = 15;

var terrorIndex = 18; 


var overview = function() {
    if (safetyScore <= 0) {
        // console.log('safetyScore ' + safetyScore);
        // console.log('crimeScore ' + crimeScore);
        // console.log('weatherScore ' + weatherScore);
        // console.log('safeHouseScore ' + safeHouseScore);
        // console.log('terrorScore ' + terrorScore);
        console.log('The professionals at Aegis strongly advise you NOT to visit this location. You will not return. Cancel this trip immediately.')
    } else if (safetyScore <= 20) {
        // console.log('safetyScore ' + safetyScore);
        // console.log('crimeScore ' + crimeScore);
        // console.log('weatherScore ' + weatherScore);
        // console.log('safeHouseScore ' + safeHouseScore);
        // console.log('terrorScore ' + terrorScore);
        console.log('Taking this trip will put you at extreme risk. Should you choose to execute your travel plans, please be prepared to encounter a number of dangers, including but not limited to risk of terrorism, biological threats, environmental and weather catastrophes, and little or no access to resources. Be prepared to conduct all daily operations without access to electricity or the Internet. We recommend you travel with extra medicine and have a few safezone locations memorized, especially that of the nearest embassy. It is imperative that you leave a detailed itinerary with a trusted confidante.')
    } else if (safetyScore <= 40) {
        // console.log('safetyScore ' + safetyScore);
        // console.log('crimeScore ' + crimeScore);
        // console.log('weatherScore ' + weatherScore);
        // console.log('safeHouseScore ' + safeHouseScore);
        // console.log('terrorScore ' + terrorScore);
        console.log('Taking this trip is not advised. Should you choose to execute your travel plans, please be extremely vigilant and have an emergency plan in place. It is recommended that you leave a detailed itinerary with a trusted confidante.');
    } else if (safetyScore <= 60) {
        // console.log('safetyScore ' + safetyScore);
        // console.log('crimeScore ' + crimeScore);
        // console.log('weatherScore ' + weatherScore);
        // console.log('safeHouseScore ' + safeHouseScore);
        // console.log('terrorScore ' + terrorScore);
        console.log('Taking this trip presents signficiant risk. We recommend that you ')
    } else if (safetyScore <= 80) {
        // console.log('safetyScore ' + safetyScore);
        // console.log('crimeScore ' + crimeScore);
        // console.log('weatherScore ' + weatherScore);
        // console.log('safeHouseScore ' + safeHouseScore);
        // console.log('terrorScore ' + terrorScore);
        console.log('You are likely to be safe on your trip. You should exercise the same caution you would traveling to any unfamiliar place and be constantly aware of your surroundings.')
    } else if (safetyScore <= 95) {
        // console.log('safetyScore ' + safetyScore);
        // console.log('crimeScore ' + crimeScore);
        // console.log('weatherScore ' + weatherScore);
        // console.log('safeHouseScore ' + safeHouseScore);
        // console.log('terrorScore ' + terrorScore);
        console.log('There are no immediate risks that threaten your overall safety. as with all travel, you should be on the lookout for suspicoius activity.')
    }
};

// // calculate risk based on safehouse results:

var safeHouseRisk = function() {
    if (safeHouseNum <= 0) {
        safeHouseScore += 0;
        safetyScore += safeHouseScore;
        weatherRisk();
    } else if (safeHouseNum <= 5) {
        safeHouseScore += 5;
        safetyScore += safeHouseScore;
        weatherRisk();
    } else if (safeHouseNum <= 10) {
        safeHouseScore += 10
        safetyScore += safeHouseScore;
        weatherRisk();
    } else if (safeHouseNum <= 25) {
        safeHouseScore += 20
        safetyScore += safeHouseScore;
        weatherRisk();
    } else if (safeHouseNum >= 50) {
        safeHouseScore += 30;
        safetyScore += safeHouseScore;
        weatherRisk();
    } else {
        safeHouseScore += 15
        safetyScore += safeHouseScore;
        weatherRisk();
    }
}


var weatherRisk = function() {
    if (currentTemp <= -50 && currentTemp >= 50 && currentCondition >= 0.50) {
        weatherScore +=5;
        safetyScore += weatherScore;
        crimeRisk();
    } else if (currentTemp < -50 && currentTemp > 50 && currentCondition < 0.50) {
        weatherScore += 8;
        safetyScore += weatherScore;
        console.log('weatherScore ' + weatherScore);
        crimeRisk();
    } else if (currentTemp < 90 && currentTemp > 51 && currentCondition > 0.50) {
        weatherScore += 15;
        safetyScore += weatherScore;
        crimeRisk();

    } else if (currentTemp < 90 && currentTemp > 51 && currentCondition < 0.50) {
        weatherScore +=20;
        safetyScore += weatherScore;
        crimeRisk();
    } else {
        weatherScore += 10;
        safetyScore += weatherScore;
        console.log(safetyScore);
        crimeRisk();
    }
};

var crimeRisk = function() {

    crimeScore = (crimeIndex * 20) / 100
    safetyScore += crimeScore;
    terrorRisk();

}

var terrorRisk = function (){
        terrorScore = (terrorIndex * 30) / 100
        safetyScore += terrorScore;
    overview();
}



safeHouseRisk();
