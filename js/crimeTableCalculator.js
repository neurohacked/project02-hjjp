module.exports = {
    calculate: function(tableList) {
        var scoreList = [];
        var totalTableScore = 0;
        table.forEach(function(row) {
            var yearPattern = /^\d\d\d\d/g;
            var year = row.disasterID.match(yearPattern);
            var totalDeaths = row.totalDeaths;
            var totalAffected = row.totalAffected;
            var disasterType = row.disasterType;
            var disasterScore;
            if (disasterType === 'Animal Accident') {
                disasterScore = 4;
            }
            if (disasterType === 'Epidemic') {
                disasterScore = 6;
            }
            if (disasterType === 'Insect Infestation') {
                disasterScore = 3;
            }
            if (disasterType === 'Drought') {
                disasterScore = 6;
            }
            if (disasterType === 'Wildfire') {
                disasterScore = 7;
            }
            if (disasterType === 'Earthquake') {
                disasterScore = 8;
            }
            if (disasterType === 'Mass Movement (Dry)') {
                disasterScore = 6;
            }
            if (disasterType === 'Volcanic Activity') {
                disasterScore = 6;
            }
            if (disasterType === 'Flood') {
                disasterScore = 7;
            }
            if (disasterType === 'Landslide') {
                disasterScore = 6;
            }
            var totalAffectedScore = (totalAffected / 100);
            var totalDeathsScore = (totalDeaths / 10);
            var totalRowScore = (totalAffectedScore + totalDeathsScore) * disasterScore;
            scoreList.push(totalRowScore);
        });
        for (var i = 0; i < scoreList.length; i++) {
            totalTableScore += scoreList[i];
        }
        return totalTableScore;
    }
}