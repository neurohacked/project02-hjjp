module.exports = {

    // Get distance between geo coordinates
    getDistance: function(srcLat, srcLng, dstLat, dstLng) {
        var earthRadius = 6371; // Radius of the earth in km
        var radiusLat = module.exports.getRadius(dstLat-srcLat);  // getRadius below
        var radiusLng = module.exports.getRadius(dstLng-srcLng); 
        var area = 
            Math.sin(radiusLat/2) * Math.sin(radiusLat/2) +
            Math.cos(module.exports.getRadius(srcLat)) * Math.cos(module.exports.getRadius(dstLat)) * 
            Math.sin(radiusLng/2) * Math.sin(radiusLng/2)
            ;
        var circumference = 2 * Math.atan2(Math.sqrt(area), Math.sqrt(1-area)); 
        var distance = earthRadius * circumference; // Distance in km
        return distance;
    },

    getRadius: function(degree) {
        return degree * (Math.PI/180)
    }

}