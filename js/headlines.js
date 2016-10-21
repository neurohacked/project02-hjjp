var apiKey = '4658c5c2746748998e396ef76a83ed64';

var queryTerm 	= "";
var numResults 	= 0;
var startYear 	= 0;
var endYear		= 0;


'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=lebanon&begin_date=20100101&end_date=20160101'

var q = [country serach term]

var end_date = (this.year)

var begin_date = end_date - 5; 

var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931'

var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "4658c5c2746748998e396ef76a83ed64",
  'q': "lebannon",
  'end_date': "20160101"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});